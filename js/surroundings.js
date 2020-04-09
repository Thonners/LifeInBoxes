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

function draw_popups() {
    console.log();

    var base = d3.select('#boxes_svg');

    var popupGroup = base.append("g")
                            .attr("id","week-passed-popup-group")
                            .attr("class","popup hidden")
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
                .attr("id","week-passed-popup-title")
                .text("Another week has passed!")
                .attr("class","text title");
    // Title text
    popupGroup.append("text")
                .attr("id","week-passed-popup-text-1")
                .text("Click on its box to acknowledge its passing...")
                .attr("class","text")
                .attr("y", "2rem")

}
