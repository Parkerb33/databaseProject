async function createBookmark(event) {
    event.preventDefault();

    const tableName = document.getElementById("tableName").value;
    // const tableSchema = document.getElementById("tableSchema").value;

    try {
        const response = await fetch("/api/create-bookmark", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableName }),
            credentials: "include"
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.error || "Table creation failed.");
        }
    } catch (error) {
        console.error("Error creating table:", error);
        alert("Something went wrong.");
    }
}
  
  async function loadMyListings() { //for mylistings bookmark
    try {
        const response = await fetch("/api/my-listings", { credentials: "include" });
        const listings = await response.json();

        const tableBody = document.getElementById("form-listing");
        tableBody.innerHTML = "";

        listings.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.username}</td><td>${item.email}</td><td>${item.price}</td><td>${item.category}</td>`;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading user listings:", error);
    }
}
if (window.location.pathname.endsWith("bookmark.html")) {
    window.addEventListener("DOMContentLoaded", loadMyListings);
}
