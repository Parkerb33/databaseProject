

let currentCategory = ""; 


async function filterByCategory(category) {
    console.log("CATEGORY CLICKED:", category); // <== Step 1 check
    try {
      const res = await fetch(`/api/listings?category=${category}`);
      const data = await res.json();
      console.log("API RESPONSE:", data); // <== Step 2 check
      updateListingsDOM(data);
    } catch (err) {
      console.error("Failed to filter listings:", err);
    }
  }

  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/api/listings");
      const listings = await response.json();
  
      if (!Array.isArray(listings) || listings.length === 0) {
        document.getElementById("instructions").innerText = "No listings found.";
        return;
      }
  
      let html = "";
  
      listings.forEach(item => {
        html += `
          <div class="listing-row">
            <img src="images/textbooks.jpg" alt="item image">
            <div class="listing-info">
              <h3>${item.username}</h3>
              <p><strong>Category:</strong> ${item.category}</p>
              <p><strong>Price:</strong> $${item.price}</p>
              <p><strong>Seller:</strong> ${item.email}</p>
              <p><strong>Description:</strong> ${item.desci}</p>
            </div>
          </div>
        `;
      });
  
      document.getElementById("instructions").innerHTML = html;
  
    } catch (error) {
      console.error("Error loading listings:", error);
      document.getElementById("instructions").innerText = "Error loading listings.";
    }
  });

function updateListingsDOM(listings) {
  const container = document.getElementById("instructions");
  if (!container) {
    console.error("No container element with ID 'instructions' found.");
    return;
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    container.innerHTML = "<p>No matching listings found.</p>";
    return;
  }

  let html = "";
  listings.forEach(item => {
    html += `
      <div class="listing-row">
        <img src="images/textbooks.jpg" alt="item image">
        <div class="listing-info">
          <h3>${item.username}</h3>
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <p><strong>Seller:</strong> ${item.email}</p>
          <p><strong>Description:</strong> ${item.desci}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

async function sortListings(order) {
    console.log("SORTING:", order, "for category:", currentCategory || "All");
  
    let url = `/api/listings?sort=${order}`;
    if (currentCategory) {
      url += `&category=${currentCategory}`;
    }
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      updateListingsDOM(data);
    } catch (err) {
      console.error("Error fetching sorted listings:", err);
    }
  }

window.filterByCategory = filterByCategory;

