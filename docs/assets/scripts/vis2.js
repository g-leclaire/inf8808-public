// Inspired from https://bl.ocks.org/mbostock/ca9a0bb7ba204d12974bca90acc507c0
// and http://bl.ocks.org/tomshanley/11097618

$(function() {
    $('#reset').css('visibility','hidden');

    var svg = d3.select("#vis2-svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        /*var margin = {top: 1, right: 1, bottom: 6, left: 1},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;*/
    
    var formatNumber = d3.format(",.0f"),
        nodeColor = d3.scale.category20();
        
    var color = d3.scale.ordinal()
        .domain(["negative", "neutral", "positive"])
        //.range(colorbrewer.BuGn[4])
        .range([red, yellow, green]);
    
    var svg = svg
      .append("g")

    var legend = d3.select("#vis2-legend-svg")
      .attr("width", 115)
      .attr("height", 71)

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 40)
        .attr('height', 20)
        .style('fill', green);

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 25)
        .attr('width', 40)
        .attr('height', 20)
        .style('fill', red);

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 50)
        .attr('width', 40)
        .attr('height', 20)
        .style('fill', yellow);

    legend.append('text')
        .attr('x', 50)
        .attr('y', 15)
        .style('fill', "white")
        .style("font-size", "15px")
        .text("Positifs");

    legend.append('text')
        .attr('x', 50)
        .attr('y', 40)
        .style('fill', "white")
        .style("font-size", "15px")
        .text("Négatifs");

    legend.append('text')
        .attr('x', 50)
        .attr('y', 65)
        .style('fill', "white")
        .style("font-size", "15px")
        .text("Neutres");

    var coins = [];
    
    function buildSankey(nodes, links) {
        var sankey = d3.sankey()
            .nodeWidth(16)
            .nodePadding(10)
            .layout(1)
            .size([width, height]);
    
        var path = sankey.link();
        
        
        sankey
            .nodes(nodes)
            .links(links)
            .layout(32);
        
        var link = svg.append("g").selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", function(d) { return "vis2-link link-" + d.sentiment;} )
            .attr("d", path)
            .attr("stroke", function(d) { return color(d.sentiment);} )
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            .sort(function(a, b) { return b.dy - a.dy; });
        
        link.append("title")
            .text(function(d) {
                let sentiment = '';
                if (d.sentiment === 'negative') {
                    sentiment = 'négatifs';
                } else if (d.sentiment === 'neutral') {
                    sentiment = 'neutres';
                } else if (d.sentiment === 'positive') {
                    sentiment = 'positifs';
                }
                return d.source.name + " → " + d.target.name + "\n" + d.value + ' commentaires ' + sentiment;
                });
        
        var node = svg.append("g").selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        
        node.append("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) { return nodeColor(d.name); })
            .on("click", function(d) {
                var linksCopy = [];
                links.forEach(link => linksCopy.push( Object.assign({}, link) ));
                //var linksCopy = JSON.parse(JSON.stringify(links))
                linksCopy.forEach(link => {
                    if (link.source.index !== d.index && link.target.index !== d.index) {
                        link.value = 0;
                    }
                });

                svg.selectAll("g")
                    .remove();

                buildSankey(nodes, linksCopy);

                $('#reset').css('visibility','visible');
            })
            .append("title")
            .text(function(d) {
                negativeCommentCount = 0;
                neutralCommentCount = 0;
                positiveCommentCount = 0;
                d.sourceLinks.forEach(link => {
                    if (link.sentiment === 'negative') {
                        negativeCommentCount += link.value;
                    } else if (link.sentiment === 'neutral') {
                        neutralCommentCount += link.value;
                    } else if (link.sentiment === 'positive') {
                        positiveCommentCount += link.value;
                    }
                    });
                    d.targetLinks.forEach(link => {
                        if (link.sentiment === 'negative') {
                            negativeCommentCount += link.value;
                        } else if (link.sentiment === 'neutral') {
                            neutralCommentCount += link.value;
                        } else if (link.sentiment === 'positive') {
                            positiveCommentCount += link.value;
                        }
                        });
                return d.name + "\n" + negativeCommentCount + ' commentaires négatifs' + "\n" + 
                    neutralCommentCount + ' commentaires neutres' + "\n" +
                    positiveCommentCount + ' commentaires positifs' + "\n";
                });
        
        node.append("text")
            .style('fill', 'white')
            .style('font-size', '2em')
            .attr("x", -6)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) {return generateLabel(d, links)})
            .filter(function(d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        svg.selectAll(".node")
            .on("mouseover", function(d, i) {
            
                svg.selectAll(".vis2-link")
                    .classed("fade", true)
                    .classed("highlight", function(p) {
                        return p.source.index == i || p.target.index == i;
                    });
            });
        
    }

    function generateLabel(d, links) {
        valueTotal = 0;
        links.forEach(link => {
            if (link.target.index === d.index || link.source.index === d.index) {
                valueTotal += link.value;
            }
        })
        if (valueTotal <= 0) {
            return '';
        }

        if (d.type === "subreddit") {
            return d.type === "subreddit" ? "/r/" + d.name : d.name;
        } else {
            var symbol = findSymbol(d.name, coins);
            return symbol.length > 0 ? symbol : d.name;
        }
    }

    function findSymbol(name, coins) {
        var coin = coins.find(coin => coin.name.toLowerCase() === name.toLowerCase());
        return coin != null ? coin.symbol : '';
    }

    d3.json('data/coinmarketcap_100.json', function (error, jsonData) {
        coins = jsonData;
    
        d3.json("data/subredditsNodeLink.json", function(data) {
            buildSankey(data.nodes, data.links);

            $('#reset').click(function() {
                svg.selectAll("g")
                    .remove();
        
                buildSankey(data.nodes, data.links);

                $('#reset').css('visibility','hidden');
            });
        });
    });
});