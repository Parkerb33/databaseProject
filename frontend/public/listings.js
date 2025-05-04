
async function filterByCategory(category) {
    console.log("CATEGORY CLICKED:", category); // <== Step 1 check
    try {
      const res = await fetch(`/listings?category=${category}`);
      const data = await res.json();
      console.log("API RESPONSE:", data); // <== Step 2 check
      updateListingsDOM(data);
    } catch (err) {
      console.error("Failed to filter listings:", err);
    }
  }

  window.filterByCategory = filterByCategory;
