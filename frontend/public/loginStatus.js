//file: loginSatus.js -- used on frontpage.html (can be used elsewhere)
async function checkLoginStatus() {
    try {
        const response = await fetch("/api/session", { credentials: "include" });
        const data = await response.json();

        const userStatus = document.getElementById("user-status");
        const adminLink = document.getElementById("admin-link");
        const userProfile = document.getElementById("user-profile");

        if (data.loggedIn) {
            const role = data.user.role;

            // Show admin link only if the user is an admin
            if (adminLink) {
                adminLink.style.display = (role === "admin") ? "inline" : "none";
            }

            if (userStatus) {
                userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="logout.html">Logout</a>) 
                    <p><a href="listings.html">Listings</a> | <a href="sell.html">Sell</a> | <a href="myProfile.html">My Profile</a></p>`;
            }
            if (userProfile) {
                const { username, email, role } = data.user;
                userProfile.innerHTML = `
                    <table border="1">
                        <tr><th>Username</th><th>Email</th><th>Role</th></tr>
                        <tr><td>${username}</td><td>${email}</td><td>${role}</td></tr>
                    </table>
                    <p><a href="logout.html">Logout</a></p>
                `;
            }

        } else {
            if (userStatus) {
                userStatus.innerHTML = `<a href="login.html">Login</a> | <a href="register.html">Register</a>`;
            }
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
}
window.onload = checkLoginStatus;
