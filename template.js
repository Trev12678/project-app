let selectedTemplate = "";

// Function to handle template selection
function selectTemplate(template) {
    selectedTemplate = template;

    // Highlight selected template
    document.querySelectorAll(".template").forEach((t) => t.classList.remove("selected"));
    document.querySelector(`[onclick="selectTemplate('${template}')"]`).classList.add("selected");

    // Enable the proceed button
    document.getElementById("proceedButton").disabled = false;
}
function proceedToResume() {
    if (!selectedTemplate) return;
    
        // Redirect based on selected template
        let templatePages = {
            "template1": "modern.html",
            "template2": "classic.html",
            "template3": "creative.html"
        };
    
        window.location.href = templatePages[selectedTemplate] || "homepage.html";
    }
    
    // Ensure proceed button starts as disabled
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("proceedButton").disabled = true;
    });