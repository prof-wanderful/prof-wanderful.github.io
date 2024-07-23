// Get the image and blog text elements
var img = document.getElementById("photo");
var blogText = document.querySelector(".blog-text");

// Toggle blog text visibility when the image is clicked
img.onclick = function() {
    if (blogText.classList.contains("collapsible")) {
        blogText.classList.remove("collapsible");
    } else {
        blogText.classList.add("collapsible");
    }
}
