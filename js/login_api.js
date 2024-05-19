document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Collect the form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Log the collected form data
    console.log("Collected form data:");
    console.log("Email:", email);
    console.log("Password:", password);

    // API URL variables
    const apiBaseUrl = "https://your-deployed-api-url"; // Replace with your actual deployed API base URL
    const userEndpoint = "/user/getbyemail";

    // Constructed API URL
    const apiUrl = `${apiBaseUrl}${userEndpoint}?email=${encodeURIComponent(email)}`;

    // Log the constructed API URL
    console.log("Constructed API URL:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Log the response
        console.log("Response:", response);

        if (response.ok) {
            const user = await response.json();
            console.log("User data:", user);

            // Check if the password matches
            if (user.password === password) {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Incorrect email or password.");
                window.location.reload();
            }
        } else {
            const error = await response.json();
            console.error("Error:", error);
            alert("Error: " + error.detail);
            window.location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging in.");
        window.location.reload();
    }
});
