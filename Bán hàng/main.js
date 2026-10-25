document.addEventListener("DOMContentLoaded", function () {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productList = document.getElementById('product-list');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const btnSearch = document.getElementById('btn-search');
    const cartCountSpan = document.getElementById('cart-count');

    // Hàm render danh sách sản phẩm
    function renderProducts(list) {
        if (!productList) return;
        productList.innerHTML = '';

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

    // Hàm tự động cách 3 chữ số khi nhập (từ file gốc của bạn)[cite: 5]
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

    // Xử lý nút tìm kiếm tĩnh: Khi ấn hiển thị thông báo "Đã áp dụng bộ lọc"
    if (btnSearch) {
        btnSearch.addEventListener('click', function () {
            showToast("Đã áp dụng");
        });
    }

    // Hàm hiển thị hộp thông báo pop-up (Toast)
    function showToast(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');

        // Tự động ẩn sau 2 giây
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Xử lý giỏ hàng cơ bản
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
