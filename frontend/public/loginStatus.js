//file: loginSatus.js -- used on frontpage.html (can be used elsewhere)
async function checkLoginStatus() {
    try {
        const response = await fetch("/api/session");
        const data = await response.json();
        const userStatus = document.getElementById("user-status");
        const userProfile = document.getElementById("user-profile");

        if (data.loggedIn) {
            if (userStatus) {
                // userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="/api/logout">Logout</a>)`;
                userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="logout.html">Logout</a>)
             <p> <a href="listings.html">Listings</a> | <a href="sell.html">Sell </a> |  <a href="myProfile.html">My Profile </a></p>`;
            }
            // PROFILE PAGE ONLY
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
            if (userProfile) {
                userProfile.innerHTML = `<a href="login.html">Login</a> | <a href="register.html">Register</a>`;
            }}
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }

window.onload = checkLoginStatus;
