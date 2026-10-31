document.addEventListener("DOMContentLoaded", function () {
    const cartCountEl = document.getElementById('cart-count');
    const btnCheckout = document.getElementById('btn-checkout');
    const btnAddMore = document.getElementById('btn-add-more');
    const policyLinks = document.querySelectorAll('.policy-link');

    // Lấy danh sách sản phẩm thực tế từ localStorage (nếu chưa có thì trả về mảng rỗng [])
    let cartItems = JSON.parse(localStorage.getItem('cart_products')) || [];

    function updateCartUI() {
        const tbody = document.querySelector('.cart-table tbody');
        const totalPriceEl = document.querySelector('.total-price');
        
        if (!tbody) return;

        let html = '';
        let totalMoney = 0;
        let totalCount = 0;

        if (cartItems.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 25px; color: #888;">Giỏ hàng của bạn đang trống</td></tr>`;
            if (totalPriceEl) totalPriceEl.textContent = '0 VNĐ';
            if (cartCountEl) cartCountEl.textContent = '0';
            localStorage.setItem('cart_count', '0');
            localStorage.setItem('cart_products', JSON.stringify([]));
            return;
        }

        cartItems.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalMoney += itemTotal;
            totalCount += item.quantity;

            html += `
                <tr>
                    <td><img src="${item.img}" alt="${item.name}" class="cart-item-img"></td>
                    <td style="font-weight: bold; text-align: left;">${item.name}</td>
                    <td>${item.price.toLocaleString('vi-VN')} VNĐ</td>
                    <td>
                        <button class="qty-btn-static decrease-btn" data-index="${index}">-</button>
                        <span style="margin: 0 8px; font-weight: bold;">${item.quantity}</span>
                        <button class="qty-btn-static increase-btn" data-index="${index}">+</button>
                    </td>
                    <td style="color: #e74c3c; font-weight: bold;">${itemTotal.toLocaleString('vi-VN')} VNĐ</td>
                    <td><button class="btn-delete-static delete-btn" data-index="${index}">Xóa</button></td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        if (totalPriceEl) totalPriceEl.textContent = totalMoney.toLocaleString('vi-VN') + ' VNĐ';
        if (cartCountEl) cartCountEl.textContent = totalCount;

        // Lưu đồng bộ vào localStorage chung cho toàn bộ website
        localStorage.setItem('cart_products', JSON.stringify(cartItems));
        localStorage.setItem('cart_count', totalCount);
        
        attachEventListeners();
    }

    function attachEventListeners() {
        // Tăng số lượng sản phẩm trong giỏ
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                let idx = this.getAttribute('data-index');
                cartItems[idx].quantity += 1;
                updateCartUI();
            });
        });

        // Giảm số lượng sản phẩm trong giỏ
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                let idx = this.getAttribute('data-index');
                if (cartItems[idx].quantity > 1) {
                    cartItems[idx].quantity -= 1;
                } else {
                    cartItems.splice(idx, 1); // Xóa luôn nếu số lượng giảm về 0
                }
                updateCartUI();
            });
        });

        // Xóa hẳn sản phẩm khỏi giỏ
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                let idx = this.getAttribute('data-index');
                cartItems.splice(idx, 1);
                updateCartUI();
                showToast("Đã xóa sản phẩm khỏi giỏ hàng");
            });
        });
    }

    function showToast(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 2000);
    }

    // Nút "Thêm món khác" -> Quay lại trang thực đơn
    if (btnAddMore) {
        btnAddMore.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'menu.html';
        });
    }

    // Nút "Thanh toán" -> Chuyển sang trang checkout.html
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function (e) {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert("Giỏ hàng của bạn đang trống!");
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    policyLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showToast("Nội dung đang được cập nhật");
        });
    });

    // Khởi chạy khi load trang giỏ hàng
    updateCartUI();
});
