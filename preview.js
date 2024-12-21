document.addEventListener("DOMContentLoaded", () => {
    // Extract the productId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get the product ID from the URL query
    const isCustomerView = urlParams.has('customer'); // Check if 'customer' param is in URL (optional)

    console.log("Product ID from URL:", productId); // Check the product ID in the console

    if (productId) {
        // Retrieve the product data from localStorage using the productId
        const productData = JSON.parse(localStorage.getItem(productId)); // Retrieve the product data using the correct productId

        console.log("Product Data Retrieved:", productData); // Check the product data in the console

        if (productData) {
            // Populate the product details on the page
            document.getElementById('productName').textContent = productData.productName || "N/A";
            document.getElementById('productDescription').textContent = productData.productDescription || "N/A";
            document.getElementById('productPrice').textContent = productData.productPrice || "N/A";
            document.getElementById('stockQuantity').textContent = productData.stockQuantity || "N/A";
            document.getElementById('productCategory').textContent = productData.productCategory || "N/A";
            document.getElementById('contactEmail').textContent = productData.contactEmail || "N/A";
            document.getElementById('storePhone').textContent = productData.storePhone || "N/A";

            // Display product images
            const imageContainer = document.getElementById('productImages');
            if (imageContainer && productData.productImages?.length > 0) {
                productData.productImages.forEach(base64Image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = base64Image;
                    imgElement.style.width = '150px';
                    imgElement.style.margin = '10px';
                    imageContainer.appendChild(imgElement);
                });
            }
        } else {
            alert("No product data found. Please check the product ID.");
        }
    } else {
        alert("No Product ID found in URL.");
    }

    // Hide link generation section i
    if (isCustomerView) {
        const linkSection = document.getElementById('linkSection');
        if (linkSection) linkSection.style.display = 'none';
    }

    // Link Generation Logic
    if (!isCustomerView) {
        const generateLinkButton = document.getElementById('generateLink');
        const copyLinkButton = document.getElementById('copyLink');
        const generatedLinkField = document.getElementById('generatedLink');

        generateLinkButton?.addEventListener('click', () => {
            const link = `${window.location.origin}${window.location.pathname}?id=${productId}&customer`;
            generatedLinkField.textContent = link;
        });

        copyLinkButton?.addEventListener('click', () => {
            const link = `${window.location.origin}${window.location.pathname}?id=${productId}&customer`;
            navigator.clipboard.writeText(link).then(() => alert('Link copied to clipboard!'));
        });
    }
});
