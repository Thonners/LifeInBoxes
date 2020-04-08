function add_class(element, className) {
    // Gets the old classes string and appends the new className (with a space)
    element.attr("class", element.attr("class") + " " + className) ;
}

function remove_class(element, className) {
    // Get the old classes, will be separated by a space
    var newClasses = element.attr("class") ;
    // Remove the one we're intereseted in
    newClasses = newClasses.replace(className,'');
    // Also remove any extra whitespace (basically replaces all long whitespaces with just a single space), but also trim to remove any leading/trailing whitespace
    newClasses = newClasses.replace(/ +/g, " ").trim()
    // Finally, set the class(es)
    element.attr("class", newClasses) ;
}