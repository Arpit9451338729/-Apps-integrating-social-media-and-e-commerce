form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Convert images to Base64
    const imageFiles = imageInput.files;
    const base64Images = [];
    for (let i = 0; i < imageFiles.length; i++) {
        const base64Image = await fileToBase64(imageFiles[i]);
        base64Images.push(base64Image);
    }

    // Gather form data
    const storeData = {
        storeName: document.getElementById("storeName").value,
        storeDescription: document.getElementById("storeDescription").value,
        contactEmail: document.getElementById("contactEmail").value,
        storePhone: document.getElementById("storePhone").value,
        productName: document.getElementById("productName").value,
        productDescription: document.getElementById("productDescription").value,
        productPrice: document.getElementById("productPrice").value,
        stockQuantity: document.getElementById("stockQuantity").value,
        productCategory: document.getElementById("productCategory").value,
        productImages: base64Images,
    };

    // Generate a unique product ID
    const productId = `product-${new Date().getTime()}`;
    
    // Store data in localStorage using the productId
    localStorage.setItem(productId, JSON.stringify(storeData));

    alert("Store and product details submitted successfully!");

    // Redirect to preview.html with the correct product ID in the URL
    window.location.href = `preview.html?id=${productId}`;
});
