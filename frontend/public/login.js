//file: login.js
// used by login.html to log a user in

async function login(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(document.getElementById("login-form"));
    const loginData = {
        username: formData.get("username"),
        password: formData.get("password")
    };
    console.log(loginData);

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect to the frontpage on successful login
            alert("user is logged in");
            window.location.href = "frontpage.html";
        } else {
            // Show an alert box if login fails
            alert(result.error || "Login failed. Please try again." || `${user}`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
}
