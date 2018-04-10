$(function() {

    // Source: https://bl.ocks.org/d3noob/814a2bcb3e7d8d8db74f36f77c8e6b7f

    // https://stackoverflow.com/questions/34886070/multiseries-line-chart-with-mouseover-tooltip/34887578#34887578

    // https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91

    // set the dimensions and margins of the graph
    var marginVis1 = {top: 50, right: 90, bottom: 50, left: 90},
    width = 1000 - marginVis1.left - marginVis1.right,
    height = 600 - marginVis1.top - marginVis1.bottom;

    // set the ranges
    var xVis1 = d3.time.scale().range([0, width]);
    var y0Vis1 = d3.scale.linear().range([height, 0]);
    var y1Vis1 = d3.scale.linear().range([height, 0]);

    // define the 1st line
    var valueline = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xVis1(d.date); })
    .y(function(d) { return y0Vis1(d.price); });

    // define the 2nd line
    var valueline2 = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xVis1(d.date); })
    .y(function(d) { return y1Vis1(d.positiveCommentCount); });

    // define the 3nd line
    var valueline3 = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xVis1(d.date); })
    .y(function(d) { return y1Vis1(d.negativeCommentCount); });

    // select svg of vis 1
    var svgVis1 = d3.select("#vis1-svg")
    .attr("width", width + marginVis1.left + marginVis1.right)
    .attr("height", height + marginVis1.top + marginVis1.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginVis1.left + "," + marginVis1.top + ")");

    /***************************************************** Start Mini-Svgs *************************************************************************/

    var marginMiniVis = {top: 40, right: 2, bottom: 0, left: 2},
    widthMini = 263 - marginMiniVis.left - marginMiniVis.right,
    heightMini = 120 - marginMiniVis.top - marginMiniVis.bottom;

    // set the ranges
    var xMini1Vis = d3.time.scale().range([0, widthMini]);
    var y0Mini1Vis = d3.scale.linear().range([heightMini, 0]);
    var y1Mini1Vis = d3.scale.linear().range([heightMini, 0]);

    // define the 1st line
    var valuelineMini = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xMini1Vis(d.date); })
    .y(function(d) { return y0Mini1Vis(d.price); });

    // define the 2nd line
    var valuelineMini2 = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xMini1Vis(d.date); })
    .y(function(d) { return y1Mini1Vis(d.positiveCommentCount); });

    // define the 3nd line
    var valuelineMini3 = d3.svg.line()
    .interpolate("basis")  
    .x(function(d) { return xMini1Vis(d.date); })
    .y(function(d) { return y1Mini1Vis(d.negativeCommentCount); });

    /**************************** Mini-1 ****************************************/

    var svgMini1Vis1 = d3.select("#vis1-mini1-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini1Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("ETH");


    /**************************** Mini-2 ****************************************/

    var svgMini2Vis1 = d3.select("#vis1-mini2-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini2Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("XRP");

    /**************************** Mini-3 ****************************************/

    var svgMini3Vis1 = d3.select("#vis1-mini3-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini3Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("BTC");

    /**************************** Mini-4 ****************************************/

    var svgMini4Vis1 = d3.select("#vis1-mini4-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");


    svgMini4Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("ADA");

    /**************************** Mini-5 ****************************************/

    var svgMini5Vis1 = d3.select("#vis1-mini5-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini5Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("XLM");

    /**************************** Mini-6 ****************************************/

    var svgMini6Vis1 = d3.select("#vis1-mini6-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini6Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("XMR");

    /**************************** Mini-7 ****************************************/

    var svgMini7Vis1 = d3.select("#vis1-mini7-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini7Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("BCH");

    /**************************** Mini-8 ****************************************/

    var svgMini8Vis1 = d3.select("#vis1-mini8-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini8Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("LTC");

    /**************************** Mini-9 ****************************************/

    var svgMini9Vis1 = d3.select("#vis1-mini9-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini9Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("NEO");

    /**************************** Mini-10 ****************************************/

    var svgMini10Vis1 = d3.select("#vis1-mini10-svg")
    .attr("width", widthMini + marginMiniVis.left + marginMiniVis.right)
    .attr("height", heightMini + marginMiniVis.top + marginMiniVis.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginMiniVis.left + "," + marginMiniVis.top + ")");

    svgMini10Vis1.append("text")
    .attr("x", (widthMini / 2))             
    .attr("y", 0 - (marginMiniVis.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style('fill', 'white')
    .style("font-weight", "bold")
    .text("EOS");

    /***************************************************** End Mini-Svgs *************************************************************************/

    //load feelings
    d3.json("./data/coinsDailyAverages.json", function(error, data) {
        // console.log(data);

        // 10 biggest coins
        data = data.filter(function(coin) {
            return coin.symbol == "BTC" ||
            coin.symbol == "ETH" ||
            coin.symbol == "XRP" ||
            coin.symbol == "BCH" ||
            coin.symbol == "LTC" ||
            coin.symbol == "EOS" ||
            coin.symbol == "ADA" ||
            coin.symbol == "XLM" ||
            coin.symbol == "NEO" ||
            coin.symbol == "XMR";
        });

        // format date
        data.forEach(coin => {
            coin.dailyAverages.forEach(daily => {
                daily.date = new Date(daily.date);
            });
        });

        // load CSVs
        var q = d3.queue();
        q.defer(d3.csv, "./data/coinsPrice/ada.csv")
        .defer(d3.csv, "./data/coinsPrice/bch.csv")
        .defer(d3.csv, "./data/coinsPrice/btc.csv")
        .defer(d3.csv, "./data/coinsPrice/eos.csv")
        .defer(d3.csv, "./data/coinsPrice/eth.csv")
        .defer(d3.csv, "./data/coinsPrice/ltc.csv")
        .defer(d3.csv, "./data/coinsPrice/neo.csv")
        .defer(d3.csv, "./data/coinsPrice/xlm.csv")
        .defer(d3.csv, "./data/coinsPrice/xmr.csv")
        .defer(d3.csv, "./data/coinsPrice/xrp.csv")
        .await(processData);

        function processData(nothing, ada, bch, btc, eos, eth, ltc, neo, xlm, xmr, xrp) {
            // console.log(ada);
            // console.log(bch);
            // console.log(btc);
            // console.log(eos);
            // console.log(eth);
            // console.log(ltc);
            // console.log(neo);
            // console.log(xlm);
            // console.log(xmr);
            // console.log(xrp);

            var loadedCSVs = [eth, xrp, btc, ada, xlm, xmr, bch, ltc, neo, eos];

            // format date
            loadedCSVs.forEach(coin => {
                coin.forEach(day => {
                    day.date = new Date(day.date);
                })
            });

            // console.log(loadedCSVs);

            // load first coin
            var currentCoin = data[0].symbol;
            var currentData = data[0].dailyAverages;
            var currentPrice = eth;
            var comments = 1851; // for eth

            // console.log(currentCoin);
            // console.log(currentData);
            // console.log(currentPrice);

            clearSelected();

            var selectedSVG = d3.select("#vis1-mini1-svg");

            selectedSVG.classed('selected', true);

            /******** Legend ***************/

            var legend = svgVis1.selectAll('g')
            .data([currentData[0], currentData[0], currentData[0]])
            .enter()
            .append('g')
            .attr('class', 'legend');

            legend.append('rect')
            .attr('x', width - 80)
            .attr('y', 0)
            .attr('width', 15)
            .attr('height', 15)
            .style('fill', green);

            legend.append('rect')
            .attr('x', width - 80)
            .attr('y', 20)
            .attr('width', 15)
            .attr('height', 15)
            .style('fill', red);

            legend.append('rect')
            .attr('x', width - 80)
            .attr('y', 40)
            .attr('width', 15)
            .attr('height', 15)
            .style('fill', "white");

            legend.append('text')
            .attr('x', width - 60)
            .attr('y', 12)
            .style('fill', "white")
            .style("font-size", "15px")
            .text("Positif");

            legend.append('text')
            .attr('x', width - 60)
            .attr('y', 32)
            .style('fill', "white")
            .style("font-size", "15px")
            .text("Négatif");

            legend.append('text')
            .attr('x', width - 60)
            .attr('y', 52)
            .style('fill', "white")
            .style("font-size", "15px")
            .text("Valeur");

            // Scale the range of the data
            xVis1.domain(d3.extent(currentData, function(d) { return d.date; }));
            y0Vis1.domain([d3.min(currentPrice, function(d) {return Math.min(d.price);}), d3.max(currentPrice, function(d) {return Math.max(d.price);})]);
            y1Vis1.domain([0, comments]);

            // Add the valueline path.
            svgVis1.append("path")
                .data([currentPrice])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valueline);

            // Add the valueline2 path.
            svgVis1.append("path")
                .data([currentData])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valueline2);

            // Add the valueline3 path.
            svgVis1.append("path")
                .data([currentData])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valueline3);

            // Add the X Axis
            svgVis1.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xVis1).orient("bottom"));

            // Add the Y0 Axis
            svgVis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Vis1).orient("left"))
                .append("text")
                .text("Valeur (USD)")
                .attr("x", -60)
                .attr("y", -10);

            // Add the Y1 Axis
            svgVis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + width + ", 0 )")
                .call(d3.svg.axis().scale(y1Vis1).orient("right"))
                .append("text")
                .text("Nombre de commentaires")
                .attr("x", -135)
                .attr("y", -10);

            /***************************************************** Start Mini-Svgs *************************************************************************/

            /***************************** Mini-1 *********************************************/

            var currentDataMini = data[0].dailyAverages;
            var currentPriceMini = eth;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 1851]);

            // Add the valueline path.
            svgMini1Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini1Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini1Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini1Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini1Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini1Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-2 *********************************************/

            currentDataMini = data[1].dailyAverages;
            currentPriceMini = xrp;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 1795]);

            // Add the valueline path.
            svgMini2Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini2Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini2Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini2Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini2Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini2Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-3 *********************************************/

            currentDataMini = data[2].dailyAverages;
            currentPriceMini = btc;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 5139]);

            // Add the valueline path.
            svgMini3Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini3Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini3Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini3Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini3Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini3Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-4 *********************************************/

            currentDataMini = data[3].dailyAverages;
            currentPriceMini = ada;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 404]);

            // Add the valueline path.
            svgMini4Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini4Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini4Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini4Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini4Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini4Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-5 *********************************************/

            currentDataMini = data[4].dailyAverages;
            currentPriceMini = xlm;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 708]);

            // Add the valueline path.
            svgMini5Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini5Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini5Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini5Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini5Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini5Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-6 *********************************************/

            currentDataMini = data[5].dailyAverages;
            currentPriceMini = xmr;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 422]);

            // Add the valueline path.
            svgMini6Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini6Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini6Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini6Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini6Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini6Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-7 *********************************************/

            currentDataMini = data[6].dailyAverages;
            currentPriceMini = bch;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 2274]);

            // Add the valueline path.
            svgMini7Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini7Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini7Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini7Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini7Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini7Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();


            /***************************** Mini-8 *********************************************/

            currentDataMini = data[7].dailyAverages;
            currentPriceMini = ltc;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 1928]);

            // Add the valueline path.
            svgMini8Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini8Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini8Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini8Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini8Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini8Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-9 *********************************************/

            currentDataMini = data[8].dailyAverages;
            currentPriceMini = neo;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 708]);

            // Add the valueline path.
            svgMini9Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini9Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini9Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini9Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini9Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini9Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************** Mini-10 *********************************************/

            currentDataMini = data[9].dailyAverages;
            currentPriceMini = eos;

            xMini1Vis.domain(d3.extent(currentDataMini, function(d) { return d.date; }));
            y0Mini1Vis.domain([d3.min(currentPriceMini, function(d) {return Math.min(d.price);}), d3.max(currentPriceMini, function(d) {return Math.max(d.price);})]);
            y1Mini1Vis.domain([0, 179]);

            // Add the valueline path.
            svgMini10Vis1.append("path")
                .data([currentPriceMini])
                .attr("class", "line1")
                .style("stroke", "white")
                .attr("d", valuelineMini);

            // Add the valueline2 path.
            svgMini10Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line2")
                .style("stroke", green)
                .attr("d", valuelineMini2);

            // Add the valueline3 path.
            svgMini10Vis1.append("path")
                .data([currentDataMini])
                .attr("class", "line3")
                .style("stroke", red)
                .attr("d", valuelineMini3);

            // Add the X Axis
            svgMini10Vis1.append("g")
                .attr("transform", "translate(0," + heightMini + ")")
                .attr("class", "axisBlack")
                .call(d3.svg.axis().scale(xMini1Vis).orient("bottom"))
                .selectAll("text").remove();

            // Add the Y0 Axis
            svgMini10Vis1.append("g")
                .attr("class", "axisYellow")
                .call(d3.svg.axis().scale(y0Mini1Vis).orient("left"))
                .selectAll("text").remove();

            // Add the Y1 Axis
            svgMini10Vis1.append("g")
                .attr("class", "axisWhite")
                .attr("transform", "translate( " + widthMini + ", 0 )")
                .call(d3.svg.axis().scale(y1Mini1Vis).orient("right"))
                .selectAll("text").remove();

            /***************************************************** End Mini-Svgs *************************************************************************/

            var clickedSVG = d3.selectAll(".mini").on("click", function(){
                
                clearSelected();

                selectedSVG = d3.select("#" + this.id);

                selectedSVG.classed('selected', true);

                var selectedIndex = this.id;
                selectedIndex = selectedIndex.replace('vis1-mini','');
                selectedIndex = selectedIndex.replace('-svg','');
                selectedIndex = selectedIndex - 1;

                $("select").val(selectedIndex);

                currentCoin = data[selectedIndex].symbol;
                currentData = data[selectedIndex].dailyAverages;
                currentPrice = loadedCSVs[selectedIndex];

                d3.select(".title").text(currentCoin);

                comments = 0;

                // format comments
                currentData.forEach(daily => {
                        
                        if (daily.positiveCommentCount > comments)
                        {
                            comments = daily.positiveCommentCount;
                        }
                        else if (daily.negativeCommentCount > comments)
                        {
                            comments = daily.negativeCommentCount;
                        }

                });

                // update domain
                y0Vis1.domain([d3.min(currentPrice, function(d) {return Math.min(d.price);}), d3.max(currentPrice, function(d) {return Math.max(d.price);})]);
                y1Vis1.domain([0, comments]);

                // update valueline
                svgVis1.selectAll(".line1")
                    .data([currentPrice])
                    .transition()
                    .duration(1000)
                    .attr("d", valueline);

                // update valueline2
                svgVis1.selectAll(".line2")
                    .data([currentData])
                    .transition()
                    .duration(1000)
                    .attr("d", valueline2);

                // update valueline3
                svgVis1.selectAll(".line3")
                    .data([currentData])
                    .transition()
                    .duration(1000)
                    .attr("d", valueline3);

                // update y0 axis
                svgVis1.select(".axisYellow")
                    .transition()
                    .duration(1000)
                    .call(d3.svg.axis().scale(y0Vis1).orient("left"));

                // update y1 axis
                svgVis1.select(".axisWhite")
                    .attr("transform", "translate( " + width + ", 0 )")
                    .transition()
                    .duration(1000)
                    .call(d3.svg.axis().scale(y1Vis1).orient("right"));
                
            });

            // append a g for all the mouse over nonsense
            var mouseG = svgVis1.append("g")
            .attr("class", "mouse-over-effects");

            // this is the vertical line
            mouseG.append("path")
            .attr("class", "mouse-line")
            .style("stroke", "white")
            .style("stroke-width", "1px")
            .style("opacity", "0");

            // keep a reference to all our lines
            var lines = document.querySelectorAll('.line1, .line2, .line3'); 

            // here's a g for each circle and text on the line
            var mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data([currentData[0], currentData[0], currentData[0]])
            .enter()
            .append("g")
            .attr("class", "mouse-per-line");

            var getMouseOverColor = function(d, i) {
                if (i == 0)
                {
                    return "white";
                }
                else if (i == 1)
                {
                    return green;
                }
                else if (i == 2)
                {
                    return red;
                }
            }

            // the circle
            mousePerLine.append("circle")
            .attr("r", 7)
            .style("stroke", getMouseOverColor)
            .style("fill", getMouseOverColor)
            .style("stroke-width", "1px")
            .style("opacity", "0");

            // the text
            mousePerLine.append("text")
            .style("stroke", getMouseOverColor)
            .attr("transform", "translate(10,3)");

            // rect to capture mouse movements
            mouseG.append('svgVis1:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function() { // on mouse out hide line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "0");
            })
            .on('mouseover', function() { // on mouse in show line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "1");
            })
            .on('mousemove', function() { // mouse moving over canvas
                var mouse = d3.mouse(this);

                // move the vertical line
                d3.select(".mouse-line")
                    .attr("d", function() {
                    var d = "M" + mouse[0] + "," + height;
                    d += " " + mouse[0] + "," + 0;
                    return d;
                    });

                // position the circle and text
                d3.selectAll(".mouse-per-line")
                    .attr("transform", function(d, i) {

                    var xDate = xVis1.invert(mouse[0]),
                        bisect = d3.bisector(function(d) { return d.date.toString(); }).right;
                        idx = bisect(d.sentimentAverage, xDate);

                    // since we are use curve fitting we can't relay on finding the points like I had done in my last answer
                    // this conducts a search using some SVG path functions
                    // to find the correct position on the line
                    // from http://bl.ocks.org/duopixel/3824661

                    var beginning = 0,
                        end = lines[i].getTotalLength(),
                        target = null;

                    while (true){
                        target = Math.floor((beginning + end) / 2);
                        pos = lines[i].getPointAtLength(target);
                        if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                            break;
                        }
                        if (pos.x > mouse[0])      end = target;
                        else if (pos.x < mouse[0]) beginning = target;
                        else break; //position found
                    }

                    // update the text with y value
                    d3.select(this).select('text')
                        .attr("dy", "0em")
                        .style("font-size", "20px")
                        .style("font-weight", "bold")
                        .text(() => (i === 0) ? formatDate(xDate) + ": " + y0Vis1.invert(pos.y).toFixed(2) : formatDate(xDate) + ": " + y1Vis1.invert(pos.y).toFixed(2))
                    
                    // return position
                    return "translate(" + mouse[0] + "," + pos.y +")";
                    });
            });
        }
    });
});

function formatDate(date){
    return date.toString().slice(0, -47).substring(4);
}

function clearSelected() {
    d3.selectAll("svg").classed('selected', false);
}