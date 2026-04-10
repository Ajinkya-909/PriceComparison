// test-api.js

async function fetchGoogleShoppingResults(searchQuery) {
  // Replace with your actual SearchAPI.io key
  const API_KEY = "GFPL3va5JAf5cjFf2QQHGPg6"; 
  
  // Construct the URL. 'gl=in' sets country to India, 'hl=en' sets language to English
  const url = `https://www.searchapi.io/api/v1/search?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&gl=in&hl=en&api_key=${API_KEY}`;

  // Set up a 10-second timeout to protect the process from hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    console.log(`Fetching data for: "${searchQuery}"...\n`);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); 

    const data = await response.json();

    // Handle HTTP Errors 
    if (!response.ok) {
        throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    // Handle Data Success
    if (data.search_metadata && data.search_metadata.status === "Success") {
        const products = data.shopping_results? data.shopping_results.slice(0, 20) : [];
        return { success: true, data: products };
    } else {
        throw new Error("Failed to parse search results.");
    }

  } catch (error) {
    // Handle Timeouts and Network crashes
    if (error.name === 'AbortError') {
        return { success: false, error: "The search took too long. Please try again." };
    }
    return { success: false, error: error.message };
  }
}

// Execute the function immediately when the file runs
async function runTest() {
  const result = await fetchGoogleShoppingResults("shirts");
  
  if (result.success) {
      console.log("✅ SUCCESS! Here is the data received:\n");
      // JSON.stringify with (null, 2) nicely formats the output in your terminal
      console.log(JSON.stringify(result.data, null, 2));
  } else {
      console.error("❌ ERROR FETCHING DATA:\n");
      console.error(result.error);
  }
}

runTest();