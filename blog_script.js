// Get the modal
var modal = document.getElementById("modal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.querySelector(".blog-photo");
var modalImg = document.getElementById("modal-img");

img.onclick = function() {
    var collapsibleText = document.querySelector(".collapsible");
    if (collapsibleText.style.display === "none" || collapsibleText.style.display === "") {
        collapsibleText.style.display = "block";
        modal.style.display = "block";
        modalImg.src = this.src;
    } else {
        collapsibleText.style.display = "none";
        modal.style.display = "none";
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    var collapsibleText = document.querySelector(".collapsible");
    collapsibleText.style.display = "none";
    modal.style.display = "none";
}
