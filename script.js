// Variables for drag functionality
let startX, startY;
let translateX = 0, translateY = 0;
let isDragging = false; // Tracks whether dragging is active

// Open the modal and display the image
function openModal() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const flowchartImage = document.querySelector(".flowchart");

    modal.style.display = "flex";
    modalImage.src = flowchartImage.src;
    modalImage.style.transform = "translate(0px, 0px) scale(1)"; // Reset position and zoom
    translateX = 0;
    translateY = 0;
    isDragging = false; // Reset dragging state
}

// Close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Zoom functionality for the modal image with scroll
const modalImage = document.getElementById("modalImage");
let scale = 1; // Initial zoom level

modalImage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    if (e.deltaY < 0) {
        scale += zoomSpeed; // Zoom in
    } else {
        scale = Math.max(1, scale - zoomSpeed); // Zoom out, minimum scale is 1
    }
    modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Start dragging on mousedown with left mouse button
modalImage.addEventListener("mousedown", (e) => {
    if (e.button === 0) { // Ensure it's the left mouse button
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImage.style.cursor = "grabbing";
    }
});

// Function to handle dragging, only moves if isDragging is true
function onDrag(e) {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
}

// Stop dragging on mouseup
document.addEventListener("mouseup", () => {
    isDragging = false; // Disable dragging immediately
    modalImage.style.cursor = "grab";
});

// Listen for mousemove on the document
document.addEventListener("mousemove", onDrag);

// Back to Dashboard function
function goBack() {
    window.location.href = "../index.html";
}
