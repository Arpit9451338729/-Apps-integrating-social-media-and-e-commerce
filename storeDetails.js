document.getElementById('productImages').addEventListener('change', function () {
    const previewContainer = document.getElementById('imagePreview'); 
    previewContainer.innerHTML = ''; 
    const imageFiles = this.files;

    for (let i = 0; i < imageFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.style.width = '150px'; 
            imgElement.style.margin = '10px';
            previewContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(imageFiles[i]);
    }
});


document.getElementById('storeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const imageFiles = document.getElementById('productImages').files;
    const base64Images = [];
    for (let i = 0; i < imageFiles.length; i++) {
        const base64Image = await fileToBase64(imageFiles[i]);
        base64Images.push(base64Image);
    }

    const storeData = {
        storeName: document.getElementById('storeName').value,
        storeDescription: document.getElementById('storeDescription').value,
        contactEmail: document.getElementById('contactEmail').value,
        storePhone: document.getElementById('storePhone').value,
        productName: document.getElementById('productName').value,
        productDescription: document.getElementById('productDescription').value,
        productPrice: document.getElementById('productPrice').value,
        productImages: base64Images,
        stockQuantity: document.getElementById('stockQuantity').value,
        productCategory: document.getElementById('productCategory').value
    };

    const productId = new Date().getTime();
    localStorage.setItem(`product-${productId}`, JSON.stringify(storeData));
    alert('Store and product details submitted successfully!');
    window.location.href = `preview.html?id=${productId}`;
});
