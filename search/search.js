function findProducts(products, category) {
    if (!products) return [];

    const productAttribute = (category === 'batteries' || category === 'tide') ? 'type' : 'name';

    const groupedProducts = products.reduce((group, product) => {
        const key = product[productAttribute];
        if (!group[key]) {
            group[key] = [];
        }
        group[key].push(product);
        return group;
    }, {});

    return Object.entries(groupedProducts).map(([_, group]) =>
        group.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    );
}

$(document).ready(function() {
    // Load JSON data
    $.getJSON('database/resources.json', function(data) {
        // Search functionality
        $('#search-button').click(function() {
            const searchTerm = $('#search-input').val().toLowerCase();
            displayResults(findProducts(data[searchTerm], searchTerm));
        });
    });
});

function displayResults(groups) {
    $('#results-container').empty();
    groups.forEach(products => {
        const groupContainer = $('<div class="product-group"></div>');
        products.forEach((product, index) => {
            const sourceImagePath = `../resources/${product.source}.png`;
            const priceClass = index === 0 ? "product-price cheapest" : "product-price"; // Cheapest product is at index 0
            groupContainer.append(
                `<div class="product-item">
                    <img class="product-image" src="${product.picture}" alt="${product.name}">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="${priceClass}">Price: $${product.price}</p>
                        
                        <p class="product-source"><img class="source-image" src="${sourceImagePath}" alt="${product.source}"></p>
                        <a class="product-link" href="${product.link}" target="_blank">Buy Now</a>
                    </div>
                </div>`
            );
        });
        $('#results-container').append(groupContainer);
    });
  }  