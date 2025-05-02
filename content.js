console.log("Amazon Tariff Extension: Script loaded.");

// Tariff rules mapping
const tariffRules = [
    // --- Toys (placed first to catch "toy car", "toy truck", etc.) ---
    { keywords: [
        'toy', 'toys', 'doll', 'action figure', 'puzzle', 'board game', 'lego', 'building block', 'playset', 'plush', 'stuffed animal',
        'toy car', 'model car', 'rc car', 'remote control car', 'die-cast car', 'toy truck', 'toy vehicle', 'play vehicle', 'toy train', 'toy plane', 'toy boat', 'toy set', 'toy kit'
      ], percent: 1.45 },
  
    // --- Furniture ---
    { keywords: [
        'furniture', 'chair', 'chairs', 'recliner', 'sofa', 'sofas', 'couch', 'couches', 'table', 'tables', 'desk', 'desks', 'bed', 'beds', 'ottoman', 'ottomans',
        'cabinet', 'cabinets', 'dresser', 'dressers', 'nightstand', 'nightstands', 'bookshelf', 'bookshelves', 'wardrobe', 'wardrobes', 'stool', 'stools', 'bench', 'benches', 'armchair', 'armchairs', 'loveseat', 'sectional', 'sideboard', 'vanity', 'hutch'
      ], percent: 1.45 },
  
    // --- Clothing & Apparel ---
    { keywords: [
        'clothing', 'apparel', 'garment', 'garments', 'shirt', 'shirts', 't-shirt', 't-shirts', 'pants', 'jeans', 'dress', 'dresses', 'jacket', 'jackets', 'coat', 'coats',
        'skirt', 'skirts', 'blouse', 'blouses', 'shorts', 'sweater', 'sweaters', 'suit', 'suits', 'underwear', 'sock', 'socks', 'hat', 'hats', 'cap', 'caps', 'scarf', 'scarves', 'glove', 'gloves', 'outerwear', 'activewear', 'swimsuit', 'swimwear', 'lingerie'
      ], percent: 1.45 },
  
    // --- Footwear ---
    { keywords: [
        'footwear', 'shoe', 'shoes', 'boot', 'boots', 'sandal', 'sandals', 'sneaker', 'sneakers', 'slipper', 'slippers', 'loafer', 'loafers', 'heel', 'heels', 'flip-flop', 'flip-flops', 'cleat', 'cleats', 'athletic shoe', 'running shoe', 'dress shoe'
      ], percent: 1.45 },
  
    // --- Appliances ---
    { keywords: [
        'appliance', 'appliances', 'microwave', 'microwaves', 'refrigerator', 'refrigerators', 'fridge', 'fridges', 'freezer', 'freezers', 'oven', 'ovens', 'stove', 'stoves',
        'range', 'ranges', 'dishwasher', 'dishwashers', 'washer', 'washers', 'dryer', 'dryers', 'blender', 'blenders', 'toaster', 'toasters', 'coffee maker', 'coffee makers', 'mixer', 'mixers', 'vacuum', 'vacuums', 'air conditioner', 'air conditioning', 'fan', 'fans'
      ], percent: 1.45 },
  
    // --- Lighting ---
    { keywords: [
        'lighting', 'lamp', 'lamps', 'light', 'lights', 'chandelier', 'chandeliers', 'bulb', 'bulbs', 'fixture', 'fixtures', 'sconce', 'sconces', 'lantern', 'lanterns', 'ceiling light', 'ceiling lights', 'floor lamp', 'table lamp', 'desk lamp', 'night light', 'string light', 'spotlight', 'track lighting'
      ], percent: 1.45 },
  
    // --- Sports Equipment ---
    { keywords: [
        'sports', 'sport', 'sporting good', 'sporting goods', 'ball', 'balls', 'bat', 'bats', 'racket', 'rackets', 'helmet', 'helmets', 'skate', 'skates', 'ski', 'skis', 'snowboard', 'snowboards', 'bicycle', 'bicycles', 'bike', 'bikes', 'treadmill', 'treadmills', 'dumbbell', 'dumbbells', 'yoga mat', 'yoga mats', 'fitness', 'exercise', 'workout', 'gym equipment', 'tennis racket', 'baseball bat', 'soccer ball', 'basketball', 'football', 'golf club', 'golf clubs'
      ], percent: 1.45 },
  
    // --- Household Goods ---
    { keywords: [
        'household', 'bedding', 'sheet', 'sheets', 'pillow', 'pillows', 'blanket', 'blankets', 'towel', 'towels', 'curtain', 'curtains', 'rug', 'rugs', 'mat', 'mats',
        'clock', 'clocks', 'mirror', 'mirrors', 'picture frame', 'picture frames', 'storage bin', 'storage bins', 'laundry basket', 'laundry baskets', 'trash can', 'trash cans', 'wastebasket', 'wastebaskets', 'organizer', 'organizers', 'hanger', 'hangers'
      ], percent: 1.45 },
  
    // --- Plastics (as products, not just material) ---
    { keywords: [
        'plastic', 'plastics', 'plasticware', 'plastic container', 'plastic containers', 'plastic bottle', 'plastic bottles', 'plastic bag', 'plastic bags', 'plastic cup', 'plastic cups', 'plastic plate', 'plastic plates', 'plastic utensil', 'plastic utensils', 'plastic storage'
      ], percent: 1.45 },
  
    // --- Electronics (Exempt) ---
    { keywords: [
        'electronics', 'electronic', 'electronics device', 'smartphone', 'smartphones', 'cell phone', 'cell phones', 'mobile phone', 'mobile phones', 'computer', 'computers', 'laptop', 'laptops', 'tablet', 'tablets', 'monitor', 'monitors', 'display', 'displays', 'television', 'televisions', 'tv', 'tvs', 'desktop', 'desktops', 'notebook', 'notebooks', 'smartwatch', 'smartwatches', 'e-reader', 'e-readers', 'gaming console', 'gaming consoles', 'headphone', 'headphones', 'earbud', 'earbuds'
      ], percent: 0, exempt: true },
  
    // --- Automobiles & Parts ---
    { keywords: [
        'automobile', 'automobiles', 'vehicle', 'vehicles', 'sedan', 'sedans', 'suv', 'suvs', 'truck', 'trucks', 'van', 'vans', 'pickup', 'pickups', 'minivan', 'minivans', 'convertible', 'convertibles', 'coupe', 'coupes', 'wagon', 'wagons', 'hatchback', 'hatchbacks', 'motorcycle', 'motorcycles',
        'auto part', 'auto parts', 'car part', 'car parts', 'engine', 'engines', 'transmission', 'transmissions', 'brake', 'brakes', 'bumper', 'bumpers', 'mirror', 'mirrors', 'tire', 'tires', 'wheel', 'wheels', 'automotive', 'spark plug', 'spark plugs', 'radiator', 'radiators', 'alternator', 'alternators', 'battery', 'batteries', 'headlight', 'headlights', 'taillight', 'taillights', 'muffler', 'mufflers'
      ], percent: 0.25 },
  
    // --- Materials (for cases not matched above) ---
    { keywords: ['steel', 'stainless steel', 'carbon steel', 'steel bar', 'steel sheet', 'steel rod', 'steel pipe'], percent: 0.25 },
    { keywords: ['aluminum', 'aluminium', 'aluminum bar', 'aluminum sheet', 'aluminum rod', 'aluminum pipe'], percent: 0.25 },
  
    // --- Agricultural Products (threatened, not currently implemented) ---
    { keywords: [
        'food', 'foods', 'beverage', 'beverages', 'fruit', 'fruits', 'vegetable', 'vegetables', 'grain', 'grains', 'meat', 'meats', 'dairy', 'egg', 'eggs', 'seafood', 'nut', 'nuts', 'snack', 'snacks', 'cereal', 'cereals', 'juice', 'juices', 'wine', 'wines', 'beer', 'beers'
      ], percent: 0, threatened: true },
  
    // --- Pharmaceuticals (planned, not currently implemented) ---
    { keywords: [
        'pharmaceutical', 'pharmaceuticals', 'medicine', 'medicines', 'drug', 'drugs', 'pharmaceutical ingredient', 'pharmaceutical ingredients', 'vitamin', 'vitamins', 'supplement', 'supplements'
      ], percent: 0.25, planned: true }
  ];
  
  

// --- Debounce Helper ---
let debounceTimer;
function debounce(func, delay) {
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
// --- End Debounce Helper ---


// Helper to find the price element
function getPriceElement() {
  // More robust selectors for price
  const selectors = [
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '#priceblock_saleprice',
    '.a-price .a-offscreen', // Common price format
    '#corePrice_feature_div .a-offscreen', // Another common location
    '#corePriceDisplay_desktop_feature_div .a-offscreen'
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) {
      console.log("Amazon Tariff Extension: Found price element with selector:", sel);
      return el;
    }
  }
  console.log("Amazon Tariff Extension: Price element not found.");
  return null;
}

// Helper to get product title
function getProductTitle() {
  const el = document.getElementById('productTitle');
  const title = el ? el.innerText.trim() : '';
  console.log("Amazon Tariff Extension: Product title:", title || "Not found");
  return title;
}

// Helper to get "Ships from" info - More robust check
function getShipsFrom() {
  console.log("Amazon Tariff Extension: Checking 'Ships from' / 'Country of Origin' info...");
  const selectors = [
    '#tabular-buybox-truncate-1 span', // Ships from
    '#tabular-buybox-truncate-0 span', // Sold by (sometimes indicates origin)
    '#merchant-info', // Seller info block
    '#tabular-buybox .tabular-buybox-text', // General buybox text
    '#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE span', // Delivery message
    '#delivery-message span' // Another potential delivery message location
  ];

  // Helper function to clean text from control characters and extra whitespace
  const cleanText = (text) => {
    if (!text) return '';
    // Remove common Unicode control characters (LRM, RLM, ZWJ, ZWNJ)
    let cleaned = text.replace(/[\u200E\u200F\u200D\u200C]/g, '');
    // Replace multiple whitespace chars (including non-breaking space \u00A0) with a single space and trim
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  };
  // --- End Updated cleanText ---


  // Check standard selectors first
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) {
        const cleanedContent = cleanText(el.textContent); // Use textContent and clean
        if (/china/i.test(cleanedContent)) {
          console.log("Amazon Tariff Extension: Found 'Ships from China' in selector:", sel, "Cleaned Text:", cleanedContent);
          return cleanedContent; // Return cleaned text
        }
    }
  }

  // Check for "Country of Origin" in product details tables (<th> approach)
  try {
    const thElements = document.querySelectorAll('th.prodDetSectionEntry, th.a-color-secondary'); // Find potential header cells
    for (const th of thElements) {
      const cleanedThText = cleanText(th.textContent); // Use textContent and clean
      if (cleanedThText.toLowerCase().includes('country of origin')) {
        const td = th.nextElementSibling; // Get the next element (should be the <td>)
        if (td) {
            const cleanedTdText = cleanText(td.textContent); // Use textContent and clean
            if (/china/i.test(cleanedTdText)) {
              console.log("Amazon Tariff Extension: Found 'Country of Origin: China' in product details table (th/td). Cleaned Text:", cleanedTdText);
              return cleanedTdText; // Return the cleaned content of the <td>
            }
        }
      }
    }
  } catch (e) {
    console.error("Amazon Tariff Extension: Error checking product details table (th/td):", e);
  }

  // Check for "Country of Origin" in list items (<span> approach) - ADDED DETAILED LOGGING
  try {
      const listItems = document.querySelectorAll('span.a-list-item');
      console.log(`Amazon Tariff Extension: Found ${listItems.length} elements matching 'span.a-list-item'.`); // Log count
  
      for (const item of listItems) {
          const boldSpan = item.querySelector('span.a-text-bold');
          if (boldSpan) {
              const rawLabel = boldSpan.textContent; // Get raw text first
              const cleanedLabel = cleanText(rawLabel);
              console.log(`Amazon Tariff Extension: Checking list item. Raw Label: "${rawLabel}", Cleaned Label: "${cleanedLabel}"`); // Log label
  
              if (cleanedLabel.toLowerCase().includes('country of origin')) {
                  console.log("Amazon Tariff Extension: Label 'country of origin' matched.");
                  let currentNode = boldSpan.nextSibling;
                  let siblingIndex = 0;
                  while (currentNode) {
                      console.log(`Amazon Tariff Extension: Sibling ${siblingIndex}: Node Type: ${currentNode.nodeType}, Node Name: ${currentNode.nodeName}, Raw Text: "${currentNode.textContent}"`); // Log each sibling
  
                      // Check if it's an element node (type 1) and a SPAN
                      if (currentNode.nodeType === 1 && currentNode.tagName === 'SPAN') {
                          const rawValue = currentNode.textContent;
                          const cleanedValue = cleanText(rawValue);
                          console.log(`Amazon Tariff Extension: Found SPAN sibling. Raw Value: "${rawValue}", Cleaned Value: "${cleanedValue}"`); // Log value span
  
                          if (/china/i.test(cleanedValue)) {
                              console.log("Amazon Tariff Extension: 'China' matched in SPAN sibling. Returning value.");
                              return cleanedValue; // Return cleaned "China"
                          }
                          console.log("Amazon Tariff Extension: SPAN sibling found, but value is not 'China'. Breaking sibling search for this label.");
                          break; // Found the value span, stop searching siblings
                      }
                      // Check if it's just a text node (type 3) containing only whitespace
                      else if (currentNode.nodeType === 3 && /^\s*$/.test(currentNode.textContent)) {
                          console.log("Amazon Tariff Extension: Skipping whitespace text node sibling.");
                          currentNode = currentNode.nextSibling;
                      } else {
                          console.log("Amazon Tariff Extension: Found non-SPAN, non-whitespace sibling. Breaking sibling search.");
                          break; // Unexpected node
                      }
                      siblingIndex++; // Increment index for logging
                  }
              } else {
                   // console.log("Amazon Tariff Extension: Label did not match 'country of origin'."); // Optional: Log non-matches
              }
          } else {
               console.log("Amazon Tariff Extension: No 'span.a-text-bold' found in this list item.");
          }
      }
  } catch(e) {
      console.error("Amazon Tariff Extension: Error checking list item span structure:", e);
  }
  // --- END DETAILED LOGGING ---


  // Fallback: Check the entire body text (less reliable)
  const cleanedBodyText = cleanText(document.body.textContent);
  if (cleanedBodyText.match(/ships from.*china/i)) {
    console.log("Amazon Tariff Extension: Found 'Ships from China' in cleaned body text.");
    return 'China (found in body)';
  }

  console.log("Amazon Tariff Extension: 'Ships from China' or 'Country of Origin: China' not found in common locations.");
  return '';
}

// Helper to get price as number
function parsePrice(text) {
  if (!text) return null;
  // Handle price ranges like "$19.99 - $25.99" - take the first number
  const cleanedText = text.replace(/,/g, '').split('-')[0];
  const match = cleanedText.match(/(\d+(\.\d+)?)/);
  const price = match ? parseFloat(match[1]) : null;
  console.log("Amazon Tariff Extension: Parsed price:", price);
  return price;
}

// Helper to determine tariff percent
function getTariffPercent(title, price) {
  if (!title || price === null) return null;

  const lowerTitle = title.toLowerCase();

  // --- Check specific category rules FIRST ---
  for (const rule of tariffRules) {
    if (rule.keywords.some(k => lowerTitle.includes(k))) {
      if (rule.exempt) {
        console.log("Amazon Tariff Extension: Matched exempt category:", rule.keywords[0]);
        return 0; // Exempt
      } else {
        console.log("Amazon Tariff Extension: Matched specific tariff category:", rule.keywords[0], "Percent:", rule.percent);
        return rule.percent; // Return the category-specific percent
      }
    }
  }
  // --- End specific category check ---


  // --- Apply Low-value import rule ONLY if no category matched ---
  // Note: The $800 threshold rule is complex and date-dependent.
  // This is a simplified check based on current value.
  if (price <= 800) {
    console.log("Amazon Tariff Extension: No specific category matched. Price <= $800, applying potential low-value tariff (90%).");
    // You might want to add a date check here for May 2, 2025 / June 1, 2025
    return 0.9; // 90%
  }
  // --- End low-value check ---


  console.log("Amazon Tariff Extension: No specific tariff category matched and price > $800.");
  return null; // No matching category found, and price > $800
}

// Function to inject the surcharge element - UPDATED PARAMETERS AND TEXT
function displaySurcharge(priceEl, originalPrice, tariffAmount, tariffPercent) {
  // --- More Robust Removal ---
  const container = priceEl.closest('#centerCol, #rightCol, #buyBoxInner') || document.body;
  const existingSurcharges = container.querySelectorAll('.tariff-surcharge-display');
  existingSurcharges.forEach(el => {
      console.log("Amazon Tariff Extension: Removing existing surcharge element.");
      el.remove();
  });
  // --- End Robust Removal ---


  const surchargeEl = document.createElement('div');
  surchargeEl.className = 'tariff-surcharge-display'; // Add a class for easy removal/check
  surchargeEl.style.color = 'red'; // Changed color slightly to differentiate
  surchargeEl.style.fontWeight = 'bold';
  surchargeEl.style.marginTop = '4px';
  surchargeEl.style.fontSize = '14px'; // Adjust size if needed

  // --- UPDATED TEXT ---
  surchargeEl.innerText = `Pre-Tariff Price (est.): $${originalPrice.toFixed(2)} | Tariff Amount: $${tariffAmount.toFixed(2)} (${(tariffPercent * 100).toFixed(0)}%)`;
  // --- END UPDATED TEXT ---


  // Try inserting after the price element's parent if it's a simple span
  let insertAfter = priceEl;
   // Try to find a more stable insertion point, like the whole price block container
  const priceBlock = priceEl.closest('#corePrice_feature_div, #unifiedPrice_feature_div, .a-section.a-spacing-small.aok-align-center');
  if (priceBlock) {
      insertAfter = priceBlock;
       console.log("Amazon Tariff Extension: Inserting surcharge after price block:", priceBlock.id || priceBlock.className);
  } else if (priceEl.tagName === 'SPAN' && priceEl.parentNode.classList.contains('a-price')) {
      insertAfter = priceEl.closest('.a-price') || priceEl;
      console.log("Amazon Tariff Extension: Inserting surcharge after a-price span.");
  } else {
       console.log("Amazon Tariff Extension: Inserting surcharge after price element itself.");
  }


  // Insert after the determined element
  insertAfter.parentNode.insertBefore(surchargeEl, insertAfter.nextSibling);
  console.log("Amazon Tariff Extension: Surcharge displayed.");
}

// Main logic wrapped in a function - UPDATED CALCULATION
function runTariffCheck() {
  console.log("Amazon Tariff Extension: Running tariff check...");
  const priceEl = getPriceElement();
  if (!priceEl) return;

  const title = getProductTitle();
  const shipsFrom = getShipsFrom();

  // Find a common ancestor element that likely contains both price and surcharge
  const container = priceEl.closest('#centerCol, #rightCol, #buyBoxInner') || document.body;
  const existingSurchargeElement = container.querySelector('.tariff-surcharge-display');


  // Only proceed if shipped from China
  if (!/china/i.test(shipsFrom)) {
    console.log("Amazon Tariff Extension: Product not shipped from China.");
    if (existingSurchargeElement) {
        console.log("Amazon Tariff Extension: Removing existing surcharge as origin is not China.");
        existingSurchargeElement.remove();
    }
    return;
  }

  const displayedPrice = parsePrice(priceEl.innerText); // Renamed for clarity
  if (displayedPrice === null) {
     console.log("Amazon Tariff Extension: Could not parse price.");
     if (existingSurchargeElement) {
        console.log("Amazon Tariff Extension: Removing existing surcharge as price is unparsable.");
        existingSurchargeElement.remove();
     }
     return;
  }

  const tariffPercent = getTariffPercent(title, displayedPrice);

  if (tariffPercent !== null && tariffPercent > 0) {
    // --- NEW CALCULATION LOGIC ---
    // displayedPrice = originalPrice * (1 + tariffPercent)
    // originalPrice = displayedPrice / (1 + tariffPercent)
    const originalPrice = displayedPrice / (1 + tariffPercent);
    const tariffAmount = displayedPrice - originalPrice;
    // --- END NEW CALCULATION LOGIC ---

    // Pass the new values to the display function
    displaySurcharge(priceEl, originalPrice, tariffAmount, tariffPercent);

  } else {
     // If tariff is 0 or null, remove any existing surcharge display
     if (existingSurchargeElement) {
        console.log("Amazon Tariff Extension: Removing existing surcharge as tariff is 0 or not applicable.");
        existingSurchargeElement.remove();
     }
     if (tariffPercent === 0) {
        console.log("Amazon Tariff Extension: Product is exempt from tariff.");
     } else {
        console.log("Amazon Tariff Extension: No applicable tariff found for this category.");
     }
  }
}

// --- Updated Execution Logic ---

// Declare observer variable here so it's accessible in listeners/callbacks
let observer;

// 1. Create a debounced version of the check function
// REMOVED passing observer instance
const debouncedRunTariffCheck = debounce(() => {
    runTariffCheck(); // Call without observer instance
}, 500); // Wait 500ms after last change

// 2. Run the check once the initial DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Amazon Tariff Extension: DOMContentLoaded event fired. Running initial check.");
    runTariffCheck(); // Run initially
});


// 3. Set up the MutationObserver to use the debounced function
observer = new MutationObserver((mutationsList) => { // Assign to the outer 'observer' variable
  // Check if relevant nodes were added or attributes changed
  let relevantChange = false;
  for (const mutation of mutationsList) {

      // --- Improved Self-Mutation Check ---
      // Check if the mutation target itself is the surcharge or if added/removed nodes are the surcharge
      let isSurchargeMutation = false;
      if (mutation.target && mutation.target.matches && mutation.target.matches('.tariff-surcharge-display')) {
          isSurchargeMutation = true;
      } else {
          mutation.addedNodes.forEach(node => {
              if (node.matches && node.matches('.tariff-surcharge-display')) {
                  isSurchargeMutation = true;
              }
          });
          mutation.removedNodes.forEach(node => {
              if (node.matches && node.matches('.tariff-surcharge-display')) {
                  isSurchargeMutation = true;
              }
          });
      }

      if (isSurchargeMutation) {
          // console.log("Amazon Tariff Extension: Ignoring mutation related to surcharge display.");
          continue; // Skip this mutation if it's related to our element
      }
      // --- End Improved Self-Mutation Check ---


      // Check for other relevant changes (structure, price-related attributes)
      if (mutation.type === 'childList' || (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'id' || mutation.attributeName === 'style'))) {
          // Could add more specific checks here, e.g., if mutation affects price elements
          relevantChange = true;
          break; // No need to check further mutations in this batch
      }
  }

  if (relevantChange) {
      console.log("Amazon Tariff Extension: Relevant DOM change detected, scheduling debounced check.");
      debouncedRunTariffCheck(); // This will call runTariffCheck()
  }
});

// Observe changes in the body and its subtree
// Start observing slightly later to avoid initial load chaos if DOMContentLoaded isn't enough
window.addEventListener('load', () => {
    console.log("Amazon Tariff Extension: Window load event fired. Starting MutationObserver.");
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    // Optional: Run one more check after full load, just in case
    runTariffCheck(); // Run check again
});


// Optional helper to display status messages (uncomment if needed)
/*
function displayMessage(priceEl, message) {
  const existingMsg = priceEl.parentNode.querySelector('.tariff-status-message');
  if (existingMsg) existingMsg.remove();

  const msgEl = document.createElement('div');
  msgEl.className = 'tariff-status-message';
  msgEl.style.color = 'gray';
  msgEl.style.fontSize = '12px';
  msgEl.style.marginTop = '4px';
  msgEl.innerText = `Tariff Info: ${message}`;

  let insertAfter = priceEl;
  if (priceEl.tagName === 'SPAN' && priceEl.parentNode.classList.contains('a-price')) {
      insertAfter = priceEl.closest('.a-price') || priceEl;
  }
  insertAfter.parentNode.insertBefore(msgEl, insertAfter.nextSibling);
  console.log("Amazon Tariff Extension: Displayed status message:", message);
}
*/