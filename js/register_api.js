document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Collect the form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
    const termsAccepted = document.getElementById("terms").checked;

    // Log the collected form data
    console.log("Collected form data:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Repeat Password:", repeatPassword);
    console.log("Terms Accepted:", termsAccepted);

    // Simple validation
    if (!termsAccepted) {
        alert("You must accept the terms of service.");
        return;
    }

    if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Data to be sent to the API
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Log the user data
    console.log("User data to be sent:", userData);

    // API URL variables
    const apiBaseUrl = "https://your-deployed-api-url"; // Replace with your actual deployed API base URL
    const userEndpoint = "/user";

    // Constructed API URL
    const apiUrl = `${apiBaseUrl}${userEndpoint}`;

    // Log the constructed API URL
    console.log("Constructed API URL:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Log the response
        console.log("Response:", response);

        if (response.ok) {
            const result = await response.json();
            console.log("Result:", result);
            alert("User registered successfully!");
            // Handle successful registration (e.g., redirect to another page)
        } else {
            const error = await response.json();
            console.error("Error:", error);
            alert("Error: " + error.detail);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering the user.");
    }
});
