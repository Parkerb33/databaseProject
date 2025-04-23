//file: loginSatus.js -- used on frontpage.html (can be used elsewhere)
async function checkProfileStatus() {
    try {
        const response = await fetch("/api/session");
        const data = await response.json();
        const userProfile = document.getElementById("user-profile");

        if (data.loggedIn) {
            
            // userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="/api/logout">Logout</a>)`;
            userProfile.innerHTML = `<table border="1">
                    <tr><th>Username</th><th>Email</th><th>Role</th><td></tr>
                    <tr><td>${data.user.username}</td><td>${data.user.email}</td><td>${data.user.role}</td></tr>
                </table>
                <p><a href="logout.html">Logout</a></p>
            `;
        } else {
            userProfile.innerHTML = `<a href="login.html">Login</a> | <a href="register.html">Register</a>`;
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
}

window.onload = checkProfileStatus;
