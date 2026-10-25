document.addEventListener("DOMContentLoaded", function () {
    // 1. Lấy dữ liệu sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productList = document.getElementById('product-list');
    const searchNameInput = document.getElementById('search-name');
    const filterCategory = document.getElementById('filter-category');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const btnSearch = document.getElementById('btn-search');
    const cartCountSpan = document.getElementById('cart-count');

    // Hàm render danh sách sản phẩm
    function renderProducts(list) {
        if (!productList) return;
        productList.innerHTML = '';

        if (list.length === 0) {
            productList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #aaa; padding: 20px;">Không tìm thấy món ăn phù hợp!</p>';
            return;
        }

        list.forEach(product => {
            const formattedPrice = Number(product.price).toLocaleString('vi-VN') + " VNĐ";

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">${formattedPrice}</p>
                    <button class="btn-add-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
            productList.appendChild(card);
        });

        attachAddToCartEvents();
    }

    renderProducts(products);

    // 2. Hàm tự động cách 3 chữ số khi nhập (từ file gốc của bạn)[cite: 5]
    function formatCurrencyInput(inputElement) {
        inputElement.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value !== '') {
                value = Number(value).toLocaleString('vi-VN');
            }
            this.value = value;
        });
    }

    if (minPriceInput) formatCurrencyInput(minPriceInput);
    if (maxPriceInput) formatCurrencyInput(maxPriceInput);

    // 3. Xử lý chức năng Tìm kiếm & Lọc
    function handleSearchAndFilter() {
        const keyword = searchNameInput.value.toLowerCase().trim();
        const selectedCategory = filterCategory.value;

        const minPriceVal = minPriceInput.value.replace(/\D/g, '');
        const maxPriceVal = maxPriceInput.value.replace(/\D/g, '');

        const minPrice = minPriceVal !== '' ? Number(minPriceVal) : 0;
        const maxPrice = maxPriceVal !== '' ? Number(maxPriceVal) : Infinity;

        const filtered = products.filter(p => {
            const matchName = p.name.toLowerCase().includes(keyword);
            const matchCategory = (selectedCategory === 'all' || p.categoryId === selectedCategory);
            const matchPrice = (p.price >= minPrice && p.price <= maxPrice);
            return matchName && matchCategory && matchPrice;
        });

        renderProducts(filtered);
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', handleSearchAndFilter);
    }
    if (searchNameInput) searchNameInput.addEventListener('input', handleSearchAndFilter);
    if (filterCategory) filterCategory.addEventListener('change', handleSearchAndFilter);

    // 4. Xử lý giỏ hàng
    function attachAddToCartEvents() {
        const addButtons = document.querySelectorAll('.btn-add-cart');
        addButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                const product = products.find(p => p.id === productId);
                if (!product) return;

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
            });
        });
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalCount;
        }
    }

    updateCartCount();
});
