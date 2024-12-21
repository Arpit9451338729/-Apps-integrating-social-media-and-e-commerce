// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const isCustomerView = urlParams.has('customer');

// Hide link generation section if in customer view
if (isCustomerView) {
    const linkSection = document.getElementById('linkSection');
    if (linkSection) linkSection.style.display = 'none';
}

// Retrieve product data
const productData = JSON.parse(localStorage.getItem(`product-${productId}`));

if (productData) {
    document.getElementById('productName').textContent = productData.productName;
    document.getElementById('productDescription').textContent = productData.productDescription;
    document.getElementById('productPrice').textContent = productData.productPrice;
    document.getElementById('stockQuantity').textContent = productData.stockQuantity;
    document.getElementById('productCategory').textContent = productData.productCategory;
    document.getElementById('contactEmail').textContent = productData.contactEmail;
    document.getElementById('storePhone').textContent = productData.storePhone;

    const imageContainer = document.getElementById('productImages');
    if (imageContainer && productData.productImages && productData.productImages.length > 0) {
        productData.productImages.forEach(base64Image => {
            const imgElement = document.createElement('img');
            imgElement.src = base64Image;
            imgElement.style.width = '150px';
            imgElement.style.margin = '10px';
            imageContainer.appendChild(imgElement);
        });
    }
}

// Link Generation ka mera Logic
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
