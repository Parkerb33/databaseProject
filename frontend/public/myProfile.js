document.addEventListener("DOMContentLoaded", function () {
    const updateButton = document.getElementById("update-profile-button");
    if (updateButton) {
        updateButton.addEventListener("click", function () {
            console.log("Update Profile button clicked");
            const updateForm = document.getElementById("update-form");
            updateForm.style.display = (updateForm.style.display === "none" || updateForm.style.display === "") ? "block" : "none";
        });
    }
});

document.getElementById("update-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent default form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare the data for the request
    const updatedData = {
        username,
        email,
        password: password || undefined // Don't send empty password if not provided
    };

    try {
        const response = await fetch("/api/update-profile", {
            method: "PUT", // Use PUT for updating
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Profile updated successfully!");
            window.location.reload();  // Reload to reflect the updated profile
        } else {
            alert(result.message || "Failed to update profile.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred. Please try again.");
    }
});