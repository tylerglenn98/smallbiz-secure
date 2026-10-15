
/* SmallBiz Secure - Cybersecurity Assessment */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("securityAssessment");
    const results = document.getElementById("assessmentResults");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Questions and recommendations
        const questions = {
            passwords: "Use strong, unique passwords for every business account.",
            mfa: "Enable multi-factor authentication on business accounts.",
            payments: "Limit payment system access to authorized employees.",
            phishing: "Train employees to recognize phishing emails and messages.",
            wifi: "Secure business Wi-Fi with a strong password.",
            backups: "Back up important business data regularly.",
            access: "Give employees individual accounts instead of shared logins."
        };

        let score = 0;
        let recommendations = [];

        // Check each answer
        for (const question in questions) {
            const answer = form.elements[question].value;

            if (answer === "yes") {
                score++;
            } else {
                recommendations.push(questions[question]);
            }
        }

        // Calculate percentage
        const percentage = Math.round((score / 7) * 100);

        // Determine risk level
        let riskLevel;

        if (percentage >= 80) {
            riskLevel = "Low Risk";
        } else if (percentage >= 50) {
            riskLevel = "Moderate Risk";
        } else {
            riskLevel = "High Risk";
        }

        // Display results
        results.innerHTML = "";

        const heading = document.createElement("h2");
        heading.textContent = "Your Cybersecurity Results";

        const scoreText = document.createElement("p");
        scoreText.textContent = "Security Score: " + percentage + "%";

        const riskText = document.createElement("p");
        riskText.textContent = "Risk Level: " + riskLevel;

        results.append(heading, scoreText, riskText);

        const subheading = document.createElement("h3");
        subheading.textContent = "Recommended Improvements";
        results.appendChild(subheading);

        if (recommendations.length === 0) {
            const message = document.createElement("p");
            message.textContent = "Great job! Continue following cybersecurity best practices.";
            results.appendChild(message);
        } else {
            const list = document.createElement("ul");

            recommendations.forEach(function (recommendation) {
                const item = document.createElement("li");
                item.textContent = recommendation;
                list.appendChild(item);
            });

            results.appendChild(list);
        }

        results.scrollIntoView({ behavior: "smooth" });
    });

});
