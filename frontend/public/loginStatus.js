//file: loginSatus.js -- used on frontpage.html (can be used elsewhere)
async function checkLoginStatus() {
    try {
        const response = await fetch("/api/session");
        const data = await response.json();
        const userStatus = document.getElementById("user-status");

        if (data.loggedIn) {
            // userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="/api/logout">Logout</a>)`;
            userStatus.innerHTML = `Logged in as: <strong>${data.user.username}</strong> (<a href="logout.html">Logout</a>)
             <p> <a href="listings.html">Listings</a> | <a href="sell.html">Sell </a> |  <a href="myProfile.html">My Profile </a></p>`;
        } else {
            userStatus.innerHTML = `<a href="login.html">Login</a> | <a href="register.html">Register</a>`;
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
}

window.onload = checkLoginStatus;
