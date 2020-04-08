function init_dimensions() {

    // Main plot margins
    margin = {
        'top': 60,
        'left': 30,
        'right': 30,
        'bottom': 20
    };

    boxDims = {
        'size' : 10,

    }

    // Tooltip dimensions
    tdims = {
        height: 100,
        width: 200,
        vertical_offset:5,
        line_vertical_offset:15,
        margin : {
            'top': 5,
            'left': 5,
            'right': 5,
            'bottom': 5
        },
        bg: {
            rx: 5,
        }
    };

    // Popup dimensions
    pdims = {
        height: 500,
        width: 600,
        line_vertical_offset:15,
        margin : {
            'top': 5,
            'left': 5,
            'right': 5,
            'bottom': 5
        },
        bg: {
            rx: 45,
        }
    };

    // Calculate the dimensions of the boxes based on screen size
    get_box_dimensions();
    // Kick off the drawing (need to draw the background_rect so we can draw everything else on top)
    var base = d3.select('#boxes_svg');
    base.attr('width',window.innerWidth)
        .attr('height',window.innerHeight);
    // Main BG
    var rect_bg = base.append('rect')
                      .attr('id','background_rect')
                      .attr('width',window.innerWidth)
                      .attr('height',window.innerHeight);
}

function draw_boxes() {

    var base = d3.select('#boxes_svg');

    // box_size = 10;
    // box_offset = 5;
    var corner_rad = 2;

    // Group to position the boxes centrally on the page
    var boxes_holder = base.append('g')
                          .attr('id','boxes_holder')
                          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define the div for the tooltip
    tooltip = base.append("g")
                        .attr("class", "tooltip hidden")
                        .style("opacity", 0);
    tooltip.append("rect")
            .attr("id","tooltip-bg")
            .attr("width",tdims.width)
            .attr("height",tdims.height)
            .attr("rx", tdims.bg.rx)
            .attr("fill","rgb(60,60,60)");
    tooltip.append("text")
            .attr("id","tooltip-text-title")
            .attr("fill","rgb(255,255,255)")
            .attr("dominant-baseline","hanging")
            .attr("x",tdims.margin.left)
            .attr("y",tdims.margin.top);

    tooltip.append("text")
            .attr("id","tooltip-text-month")
            .attr("fill","rgb(255,255,255)")
            .attr("dominant-baseline","hanging")
            .attr("x",tdims.margin.left)
            .attr("y",tdims.margin.top + tdims.line_vertical_offset);
    // Actualy draw the boxes
    boxes_holder.selectAll('g')
                .data(boxes)
                .enter()
                .append('rect')
                  .attr('id',function(box,i){
                              return 'rect_' + get_box_id(box);
                            })
                  .attr('class',function (d) {return get_box_class(d) ;})
                  .attr('width', boxDims.size + 'px')
                  .attr('height', boxDims.size + 'px')
                  .attr('rx',corner_rad + 'px')
                  .attr('data-week-date',function(box) {
                                return box.date;
                              })
                  .attr('data-year',function(box) {
                                return box.date.getFullYear();
                              })
                  .attr('transform', function(box, i) {
                                return get_translation(box);
                              })
                  .on('mouseover', handleMouseover)
                  .on('mouseout', handleMouseout)
                  .on('click', handleClick)
                              ;

}

function get_box_dimensions() {
    var bgHeight = window.innerHeight;
    var bgWidth = window.innerWidth;
    var plotHeight = bgHeight - margin.top - margin.bottom ;
    var plotWidth = bgWidth - margin.left - margin.right ;
    var totalYears = max_age + extra_age ;
    if (orientation_landscape) {
        console.log("Landscape")
        var boxAndMarginWidthHLimit = plotWidth / totalYears;
        var boxAndMarginWidthVLimit = plotHeight / 52;
    } else {
        var boxAndMarginWidthHLimit = plotWidth / 52;
        var boxAndMarginWidthVLimit = plotHeight / totalYears;
    }
    console.log("bgHeight: " + bgHeight + ', bgWidth: ' + bgWidth);
    console.log("plotHeight: " + plotHeight + ', plotWidth: ' + plotWidth);
    console.log("boxAndMarginWidthHLimit: " + boxAndMarginWidthHLimit + ', boxAndMarginWidthVLimit: ' + boxAndMarginWidthVLimit);
    var boxAndMarginWidth = Math.min(boxAndMarginWidthHLimit, boxAndMarginWidthVLimit);
    var boxWidth = 0.66 * boxAndMarginWidth;
    var boxMargin = 0.34 * boxAndMarginWidth;
    // Assign to the global variables
    boxDims.size = boxWidth;
    boxDims.margin = boxMargin;

    // Adjust the margins so that it's centralised
    if (boxAndMarginWidthHLimit > boxAndMarginWidthVLimit) {
        // Landscape
        var boxesNetWidth = boxAndMarginWidth * totalYears ;
        var boxesNetHeight = boxAndMarginWidth * 52 ;
    } else {
        // Portrait
        boxesNetWidth = boxAndMarginWidth * 52 ;
        boxesNetHeight = boxAndMarginWidth * totalYears ;
    }
    var totalHorzMargin = bgWidth - (boxesNetWidth - boxMargin) ;
    margin.left = totalHorzMargin / 2 ;
    margin.right = margin.left ;
    var totalVertMargin = bgHeight - (boxesNetHeight - boxMargin) ;
    margin.top = totalVertMargin * 0.75 ;
    margin.bottom = totalVertMargin * 0.25 ;

    // Popup box
    pdims.width = 0.6 * bgWidth;
    pdims.height = 0.6 * bgHeight;
    pdims.margin.left = 0.5 * bgWidth;
    pdims.margin.top = 0.5 * bgHeight;
}

function get_box_id(box) {
    return box['year'] + '_' + box['week'] ;
}

function get_translation(box) {
    var week = box['week'];
    var year = box['year'];
    if (orientation_landscape) {
        // Then each column is a year, each row is a week
        h_offset = year * (boxDims.size + boxDims.margin);
        v_offset = week * (boxDims.size + boxDims.margin);
    } else {
        // Then each column is a week, each row is a year
        h_offset = week * (boxDims.size + boxDims.margin);
        v_offset = year * (boxDims.size + boxDims.margin);
    }
    // Compile into the correct string format to go into the translation
    return 'translate(' + h_offset + ', ' + v_offset + ')';
}

function get_box_class(box) {
    var classes = "box " ;
    // Future/past/present
    var date = box['date'];
    var now = new Date();
    if (date < now) {
        classes += 'past ' ;
    } else {
        classes += 'future ' ;
    }
    // stretch_year
    if (box['stretch_year']){
        classes += 'stretch_year ';
    }
    // Unclicked
    if (box['unclicked']) {
        classes += 'unclicked ';
    }
    return classes;
}

function get_box_stroke(box) {
    if (box.stretch_year){
        return 'rgba(40,40,40,0.3)';
    }
    return 'rgb(40, 40, 40)';
}

function handleMouseover(d, i) {
    tooltip.transition()
        .duration(200)
        .style("opacity", .9)
        .attr("transform", "translate(" + (d3.event.pageX) + "," + (d3.event.pageY - (tdims.height + tdims.vertical_offset)) + ")");
    tooltip.select("#tooltip-text-title")
        .text("Age: " + d.year + " Week #" + d.week);
    tooltip.select("#tooltip-text-month")
        .text(d.date.toLocaleDateString('en-GB',{'month':'short','year':'numeric'}));
}

function handleMouseout(d, i) {
    tooltip.transition()
        .duration(200)
        .style("opacity", 0);
}

function handleClick(d, i) {
    if (d.unclicked && d.date < new Date()){
        console.log(d.date + " box clicked, it's previously unclicked, and it's in the past!");
    } else {
        console.log(d.date + " box clicked, but not of interest...");
    }
}
