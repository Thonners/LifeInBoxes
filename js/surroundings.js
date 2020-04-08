function draw_title() {

    var base = d3.select('#boxes_svg');

    // Add a title Group
    var titleGroup = base.append("g")
                            .attr("id","title-group")
                            .attr("transform", "translate(" + (window.innerWidth/2) + "," + (margin.top/2) + ")");
    titleGroup.append("text")
                .text("My life in boxes...")
                .attr("font-size","30px")
                .attr("text-anchor","middle")
                .attr("dominant-baseline","central");
    titleGroup.append("text")
                .text("Make every box count!")
                .attr("font-size","10px")
                .attr("transform", "translate(0,15)")
                .attr("text-anchor","middle")
                .attr("dominant-baseline","hanging");
}

function draw_popup() {
    console.log();

    var base = d3.select('#boxes_svg');

    var popupGroup = base.append("g")
                            .attr("id","popup-group")
                            .attr("transform","translate(" + pdims.margin.left + "," + pdims.margin.top + ")");
    // Background
    popupGroup.append("rect")
                .attr("height",pdims.height)
                .attr("width",pdims.width)
                .attr("rx",pdims.rx)
                .attr("class","onclick-popup")
                .attr("x",-pdims.width/2)
                .attr("y",-pdims.height/2);
    // Title text
    popupGroup.append("text")
                .text("Another week has passed...")
                .attr("class","popup title")

}
