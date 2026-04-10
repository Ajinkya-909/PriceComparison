// test-api.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Top 10 Popular E-commerce Categories
const topCategories = [
  "Smartphones",
  "Laptops",
  "Headphones",
  "Shirts",
  "Shoes",
  "Smartwatches",
  "Tablets",
  "Cameras",
  "Kitchen Appliances",
  "Furniture"
];

// Main function to fetch data for all categories and save to files
async function fetchAndSaveAllCategories() {
  console.log("🚀 Starting to fetch data for all categories...\n");
  
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < topCategories.length; i++) {
    const category = topCategories[i];
    const fileNumber = i + 1;
    const fileName = `data${fileNumber}.json`;
    const filePath = path.join(__dirname, fileName);

    console.log(`[${fileNumber}/${topCategories.length}] Processing: ${category}`);

    try {
      // Call the fetch function
      const result = await fetchGoogleShoppingResults(category);

      if (result.success && result.data.length > 0) {
        // Save to file
        fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2));
        console.log(`✅ SUCCESS! Saved ${result.data.length} products to ${fileName}`);
        successCount++;
      } else {
        console.log(`⚠️  No data received for ${category}`);
        failureCount++;
      }
    } catch (error) {
      console.error(`❌ ERROR processing ${category}: ${error.message}`);
      failureCount++;
    }

    // Add a small delay between requests to avoid rate limiting
    if (i < topCategories.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📁 Files created: ${successCount}`);
  console.log("=".repeat(50) + "\n");
}

// Execute the function
fetchAndSaveAllCategories();