
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

        results.className = "results-dashboard";

        const heading = document.createElement("h2");
        heading.textContent = "Your Cybersecurity Results";

        const scoreCard = document.createElement("div");
        scoreCard.className = "score-card";

        const scoreText = document.createElement("h3");
        scoreText.textContent = percentage + "%";

        const scoreLabel = document.createElement("p");
        scoreLabel.textContent = "Security Score";

        const riskText = document.createElement("p");
        riskText.textContent = "Risk Level: " + riskLevel;

        const riskClass =
            riskLevel === "Low Risk" ? "low-risk" :
            riskLevel === "Moderate Risk" ? "moderate-risk" :
            "high-risk";

        riskText.className = riskClass;

        scoreCard.append(scoreLabel, scoreText, riskText);

        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";

        const progressFill = document.createElement("div");
        progressFill.className = "progress-fill " + riskClass;
        progressFill.style.width = percentage + "%";

        progressBar.appendChild(progressFill);

        const explanation = document.createElement("p");
        explanation.className = "risk-explanation";

        if (riskLevel === "Low Risk") {
            explanation.textContent =
                "Your business has several good security practices in place. Continue reviewing and improving them.";
        } else if (riskLevel === "Moderate Risk") {
            explanation.textContent =
                "Your business has some security measures in place, but there are areas that need improvement.";
        } else {
            explanation.textContent =
                "Your answers suggest important cybersecurity weaknesses that should be addressed.";
        }

        results.append(heading, scoreCard, progressBar, explanation);

        const subheading = document.createElement("h3");
        subheading.textContent = "Recommended Improvements";
        results.appendChild(subheading);

        if (recommendations.length === 0) {
            const message = document.createElement("p");
            message.textContent =
                "Great job! Continue following cybersecurity best practices.";
            results.appendChild(message);
        } else {
            const list = document.createElement("ul");
            list.className = "recommendations-list";

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
