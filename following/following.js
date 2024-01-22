$(document).ready(function() {
    let productsData = {};
  
    // Load JSON data
    $.getJSON('search/database/resources.json', function(data) {
        productsData = data;
    });
  });
  
  function searchProducts(searchTerm, data) {
    // Determine the category based on the search term
    const category = data[searchTerm];
    if (!category) {
        // [Need to return an error or find typing-error correction methods]
        return;
    }
  
    // Sort products by price
    const sortedProducts = category.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    
    // Display results
    displayResults(sortedProducts);
  }
  
  function displayResults(products) {
    // Clear existing results
    $('#results-container').empty();

    // Iterate through the first 5 sorted products and append them to the results container
    products.slice(0, 5).forEach(product => {
        const productHTML = `<div class="product-container">
                                <img class="product-image" src="${product.picture}" alt="${product.name}">
                                <div class="product-info">
                                    <h3 class="product-name">${product.name}</h3>
                                    <p class="product-price">Price: $${product.price}</p>
                                    <a class="product-link" href="${product.link}" target="_blank">Buy Now</a>
                                </div>
                             </div>`;
        $('#results-container').append(productHTML);
    });
}