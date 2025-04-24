async function addUser(event) {
    console.log("here we are in register.js");
    event.preventDefault(); // Prevent default form submission
 
    const formData = new FormData(document.getElementById("admin-form"));
 
    const userData = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role")
    };
 
    const jsonBody = JSON.stringify(userData);
 
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });
 
        const result = await response.json();
 
        if (response.ok) {
            // Show success alert and redirect to frontpage.html
            console.log("Registration OK:");
            console.log(result);
            if(result.success == true){
               alert(`${result.message} for ${result.username}`);
               window.location.href = "dashboard.html";
            } else {
               alert(`${result.message}`);
            }
        } else {
            // Show error alert if registration fails
            console.log("response not OK");
            console.log(result);
            console.log("Failed to register:", response.statusText);
            alert(result.error || "Registration failed. Please try again." || `for User: ${result.name}`);
        }
 
    } catch (error) {
        console.error("... error in registration");
        console.error("Error during registration:", error);
        console.error(`jsonBody: ${jsonBody}`);
        // alert("An error occurred. Please try again.");
        alert(`Error: ${error.message}`); //chat debugging
    }
}
 
async function DisplayRows() {
    const response = await fetch("/api/users", { credentials: "include" });
    const users = await response.json();
 
    if (response.ok) {
        // get HTML table (going to modify this)
        const userTable = document.getElementById("userList");
        userTable.innerHTML = ""; // clear the previous content of the table
 
        const count = parseInt(document.getElementById("rowCount").value);
        const limitedUsers = users.slice(0, count);
 
        // for each user in result, create table row and append to table in DOM
        limitedUsers.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td>`;
            userTable.appendChild(row);
        });
 
    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}
DisplayRows();
 
async function addListing(event) {
    console.log("here we are in register.js");
    event.preventDefault(); // Prevent default form submission
 
    const formData = new FormData(document.getElementById("admin-form-listing"));
 
    const userData = {
        username: formData.get("username"),
        email: formData.get("email"),
        category: formData.get("category"),
        price: formData.get("price")
    };
 
    const jsonBody = JSON.stringify(userData);
 
    try {
        const response = await fetch("/api/listings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });
 
        const result = await response.json();
 
        if (response.ok) {
            // Show success alert and redirect to frontpage.html
            console.log("Registration OK:");
            console.log(result);
            if(result.success == true){
               alert(`${result.message} for ${result.username}`);
               window.location.href = "dashboard.html";
            } else {
               alert(`${result.message}`);
            }
        } else {
            // Show error alert if registration fails
            console.log("response not OK");
            console.log(result);
            console.log("Failed to register:", response.statusText);
            alert(result.error || "Registration failed. Please try again." || `for User: ${result.name}`);
        }
 
    } catch (error) {
        console.error("... error in registration");
        console.error("Error during registration:", error);
        console.error(`jsonBody: ${jsonBody}`);
        // alert("An error occurred. Please try again.");
        alert(`Error: ${error.message}`); //chat debugging
    }
}
 
async function fetchListing() {
    const response = await fetch("/api/listings", { credentials: "include" });
    const users = await response.json();
 
    if (response.ok) {
        // get HTML table (going to modify this)
        const userTable = document.getElementById("form-listing");
        userTable.innerHTML = ""; // clear the previous content of the table
 
        // for each user in result, create table row and append to table in DOM
        users.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.price}</td><td>${user.category}</td>`;
            userTable.appendChild(row);
        });
 
    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}
fetchListing();
 
async function DisplayRowsListings() {
    const response = await fetch("/api/listings", { credentials: "include" });
    const users = await response.json();
 
    if (response.ok) {
        // get HTML table (going to modify this)
        const userTable = document.getElementById("form-listing");
        userTable.innerHTML = ""; // clear the previous content of the table
 
        const count = parseInt(document.getElementById("rowCountlisting").value);
        const limitedUsers = users.slice(0, count);
 
        // for each user in result, create table row and append to table in DOM
        limitedUsers.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.price}</td>`;
            userTable.appendChild(row);
        });
 
    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}
 
async function truncateUsers() {
    if (!confirm("Are you sure you want to delete ALL users? This action cannot be undone.")) {
        return;
    }

    try {
        const response = await fetch("/api/users/truncate", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Users table truncated.");
            DisplayRows(); // refresh the table
        } else {
            alert(result.error || "Failed to truncate users table.");
        }
    } catch (error) {
        console.error("Error truncating users table:", error);
        alert("An error occurred.");
    }
}

async function truncateListings() {
    if (!confirm("Are you sure you want to delete ALL listings? This action cannot be undone.")) {
        return;
    }

    try {
        const response = await fetch("/api/listings/truncate", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Listings table truncated.");
            fetchListing(); // refresh the listings table
        } else {
            alert(result.error || "Failed to truncate listings table.");
        }
    } catch (error) {
        console.error("Error truncating listings table:", error);
        alert("An error occurred.");
    }
}

async function createTable(event) {
    event.preventDefault();

    const tableName = document.getElementById("tableName").value;
    const tableSchema = document.getElementById("tableSchema").value;

    try {
        const response = await fetch("/api/create-table", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableName, tableSchema }),
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

async function loadTables() {
    try {
        const response = await fetch("/api/admin/tables", {
            credentials: "include"
        });
        const tables = await response.json();

        const tableList = document.getElementById("table-list");
        tableList.innerHTML = "";

        tables.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
            li.innerHTML = `${name} <button onclick="dropTable('${name}')">Drop</button>`;
            tableList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tables:", error);
        alert("Could not load tables.");
    }
}

async function dropTable(name) {
    if (!confirm(`Are you sure you want to drop the table '${name}'? This cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/tables/${name}`, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            loadTables(); // Refresh the list
        } else {
            alert(result.error || "Failed to drop table.");
        }
    } catch (error) {
        console.error("Error dropping table:", error);
        alert("Something went wrong.");
    }
}
