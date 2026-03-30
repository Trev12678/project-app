import { enhanceResume } from "./js/api.js";

function generateResume() {
    document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
    document.getElementById("previewTitle").innerText = document.getElementById("title").value || "Your Title";
    document.getElementById("previewEmail").innerText = document.getElementById("email").value || "your.email@example.com";
    document.getElementById("previewPhone").innerText = document.getElementById("phone").value || "+123 456 7890";
    document.getElementById("previewSummary").innerText = document.getElementById("summary").value || "Your summary will appear here...";
    document.getElementById("previewExperience").innerText = document.getElementById("experience").value || "Your experience will appear here...";
    document.getElementById("previewEducation").innerText = document.getElementById("education").value || "Your education details will appear here...";
}

function downloadResume() {
    const element = document.getElementById("resumePreview");
    html2pdf().from(element).save("Creative_Resume.pdf");
}

async function enhanceWithAI() {
    try {
        const enhancedBox = document.querySelector(".enhanced-resume-box");
        const enhancedDiv = document.getElementById("enhancedResume");

        // Gather user inputs
        const name = document.getElementById("name").value.trim() || "No Name";
        const title = document.getElementById("title").value.trim() || "No Title";
        const email = document.getElementById("email").value.trim() || "No Email";
        const phone = document.getElementById("phone").value.trim() || "No Phone";
        const summary = document.getElementById("summary").value.trim() || "No Summary";
        const experience = document.getElementById("experience").value.trim() || "No Experience";
        const education = document.getElementById("education").value.trim() || "No Education";

        const userResumeText = `
            Full Name: ${name}
            Title: ${title}
            Email: ${email}
            Phone: ${phone}
            Summary: ${summary}
            Experience: ${experience}
            Education: ${education}
        `;
        enhancedBox.style.display = "block";
        enhancedDiv.innerHTML = "<em>Enhancing resume... please wait.</em>";
        const data = await enhanceResume(userResumeText);
        let improvedText = "No enhanced text returned.";
        if (data.conversation && Array.isArray(data.conversation)) {
            const assistantMsg = data.conversation.find(msg => msg.role === "assistant");
            if (assistantMsg && assistantMsg.content) {
                improvedText = assistantMsg.content;
            }
        }
        const htmlOutput = marked.parse(improvedText);
        enhancedDiv.innerHTML = htmlOutput;

    } catch (error) {
        console.error("Enhance error:", error);
        alert(error.message || "Could not enhance resume");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("name").addEventListener("input", generateResume);
    document.getElementById("title").addEventListener("input", generateResume);
    document.getElementById("email").addEventListener("input", generateResume);
    document.getElementById("phone").addEventListener("input", generateResume);
    document.getElementById("summary").addEventListener("input", generateResume);
    document.getElementById("experience").addEventListener("input", generateResume);
    document.getElementById("education").addEventListener("input", generateResume);

    document.getElementById("downloadBtn").addEventListener("click", downloadResume);
});
window.generateResume = generateResume;
window.enhanceWithAI = enhanceWithAI;
window.downloadResume = downloadResume;