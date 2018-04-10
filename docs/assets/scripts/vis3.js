// Inspired by http://projects.delimited.io/experiments/force-bubbles

$(function () {
  legend();

  var width = 1500, height = 900;
  var svg = d3.select("#chart").append("svg")
    .attr("id", "vis3-svg")
    .attr("width", width)
    .attr("height", height);

  var padding = 2;
  var getCenters = null;
  var maxRadius = null;
  var nodes = null;
  var mostActiveUsers = [];
  var mostNegativeUsers = [];
  var mostPositiveUsers = [];

  d3.json('data/mostActiveUsers.json', function (error, jsonData) {
    d3.json('data/mostNegativeUsers.json', function (error, jsonData) {
      mostNegativeUsers = jsonData.slice(0, 300);
    });
    d3.json('data/mostPositiveUsers.json', function (error, jsonData) {
      mostPositiveUsers = jsonData.slice(0, 300);
    });

    mostActiveUsers = jsonData.slice(0, 300);

    var color = d3.scale.linear()
      .domain([-1, 0, 1])
      .range([red, yellow, green]);

    function updateData(data) {
      var r = d3.scale.sqrt().range([5, 30]);
      var minCommentCount = d3.min(data, function (d) { return d.commentCount; });
      var maxCommentCount = d3.max(data, function (d) { return d.commentCount; });
      r.domain([minCommentCount, maxCommentCount]);
      
      maxRadius = d3.max(_.pluck(data, 'radius'));

      getCenters = function (vname, size) {
        var centers, map;
        centers = _.uniq(_.pluck(data, vname)).map(function (d) {
          return { name: d, value: 1 };
        });

        map = d3.layout.treemap().size(size).ratio(1 / 1);
        map.nodes({ children: centers });

        return centers;
      };

      for (var j = 0; j < data.length; j++) {
        data[j].radius = r(data[j].commentCount);
        data[j].x = Math.random() * width;
        data[j].y = Math.random() * height;
      }
      nodes = svg.selectAll("circle")
        .data(data);

      nodes.enter().append("circle")
        .attr("class", "node")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", function (d) { return d.radius; })
        .style("fill", function (d) { return color(d.sentimentAverage); })
        .style("stroke-width", function (d) { return getStrokeWidth(d.sentimentStandardDeviation); })
        .on("mouseover", function (d, i) {
          svg.selectAll("circle")
            .classed("fade", function (p) {
              return p.username !== d.username;
            });
        })
        .on("mouseout", function (d, i) {
          svg.selectAll("circle")
            .classed("fade", false);
        })
        .append("title")
        .text(function (d) {
          return "/u/" + d.username + "\n" +
            "Commentaires : " + d.commentCount + "\n" +
            "Sentiment moyen : " + d.sentimentAverage.toFixed(2) + "\n" +
            "Écart type : " + d.sentimentStandardDeviation.toFixed(2);
        });

      draw('subreddit', data, maxRadius, padding);
    }
    updateData(mostActiveUsers);

    $(".btn.active-users").click(function () {
      nodes.remove();
      updateData(mostActiveUsers);
      //draw('', mostActiveUsers);
    });

    $(".btn.negative-users").click(function () {
      nodes.remove();
      updateData(mostNegativeUsers);
    });

    $(".btn.positive-users").click(function () {
      nodes.remove();
      updateData(mostPositiveUsers);
    });
  });

  function tick(centers, varname, data) {
    var foci = {};
    for (var i = 0; i < centers.length; i++) {
      foci[centers[i].name] = centers[i];
    }
    return function (e) {
      for (var i = 0; i < data.length; i++) {
        var o = data[i];
        var f = foci[o[varname]];
        if (f == null) {
          console.log(foci);
          console.log(o[varname]);
        }
        o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
        o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
      }
      svg.selectAll("circle").each(collide(.11, data))
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
    }
  }

  function collide(alpha, data) {
    var quadtree = d3.geom.quadtree(data);
    return function (d) {
      var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  function getStrokeWidth(standardDeviation) {
    if (standardDeviation >= 0 && standardDeviation <= 0.33) {
      return 6;
    }

    if (standardDeviation > 0.33 && standardDeviation <= 0.66) {
      return 3;
    }

    if (standardDeviation > 0.66) {
      return 1;
    }
  }

  function draw(varname, data) {
    var force = d3.layout.force();
    var centers = getCenters(varname, [width, height]);
    force.on("tick", tick(centers, varname, data));
    labels(centers)
    force.start();
  }

  function labels(centers) {
    svg.selectAll(".label").remove();

    svg.selectAll(".label")
      .data(centers)
      .enter()
      .append("text")
      .style("text-anchor", "middle")
      .attr("class", "label")
      .text(function (d) { return "/r/" + d.name })
      .attr("transform", function (d) {
        return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + 20) + ")";
      });
  }

  function legend() {
    var w = 300, h = 50;

    var key = d3.select("#vis3-legend-svg")
      .attr("width", w + 20)
      .attr("height", h);

    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", red)
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", yellow)
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", green)
      .attr("stop-opacity", 1);

    key.append("rect")
      .attr("width", w)
      .attr("height", h - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(10,10)");

    var y = d3.scale.linear()
      .range([300, 0])
      .domain([1, -1]);

    var yAxis = d3.svg.axis()
      .scale(y)
      .ticks(10);

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(10,30)")
      .call(yAxis);

    var svgComment = d3.select("#vis3-comment-svg")
      .attr("width", 320)
      .attr("height", 71)

    svgComment.append("circle")
      .attr("cx", 160)
      .attr("cy", 36)
      .attr("r", 35)
      .style("stroke", "black")
      .style("stroke-width", 2.5)
      .style("fill", "none");

    svgComment.append("circle")
      .attr("cx", 160)
      .attr("cy", 46)
      .attr("r", 25)
      .style("stroke", "black")
      .style("stroke-width", 2.5)
      .style("fill", "none");

    svgComment.append("circle")
      .attr("cx", 160)
      .attr("cy", 56)
      .attr("r", 15)
      .style("stroke", "black")
      .style("stroke-width", 2.5)
      .style("fill", "none");

    var svgLine = d3.select("#vis3-line-svg")
      .attr("width", 320)
      .attr("height", 70)
      .append("g")
      .attr("transform", "translate(" + 110 + "," + "0)");

    svgLine.append('rect')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', 20)
      .attr('height', 1)
      .style('fill', "black");

    svgLine.append('rect')
      .attr('x', 20)
      .attr('y', 40)
      .attr('width', 20)
      .attr('height', 3)
      .style('fill', "black");

    svgLine.append('rect')
      .attr('x', 20)
      .attr('y', 60)
      .attr('width', 20)
      .attr('height', 6)
      .style('fill', "black");

    svgLine.append('text')
      .attr('x', 50)
      .attr('y', 30)
      .style('fill', "white")
      .style("font-size", "2em")
      .text("0.9");

    svgLine.append('text')
      .attr('x', 50)
      .attr('y', 50)
      .style('fill', "white")
      .style("font-size", "2em")
      .text("0.6");

    svgLine.append('text')
      .attr('x', 50)
      .attr('y', 70)
      .style('fill', "white")
      .style("font-size", "2em")
      .text("0.3");
  }
});