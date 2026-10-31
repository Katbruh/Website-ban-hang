document.addEventListener("DOMContentLoaded", function () {
    // 1. Danh sách sản phẩm mẫu hiển thị ra trang chủ / menu
    const products = [
        { id: 1, name: 'Bánh Tráng Trộn Sẵn 8 Ghiền', price: 25000, img: 'img/1.jpg', category: 'M01' },
        { id: 2, name: 'Cá Viên Chiên (1 Xiên / 4 Viên)', price: 5000, img: 'img/2.jpg', category: 'M02' },
        { id: 3, name: 'Kẹo Nhai Dynamite Chews', price: 25000, img: 'img/3.jpg', category: 'M04' },
        { id: 4, name: 'Que Cây Vfoods Hot Chilli (Gói)', price: 15000, img: 'img/4.jpg', category: 'M03' },
        { id: 5, name: 'Xúc Xích Chiên (1 Cây)', price: 6000, img: 'img/5.jpg', category: 'M02' }
    ];

    // Render sản phẩm ra danh sách nếu tồn tại thẻ #product-list
    const productListEl = document.getElementById('product-list');
    if (productListEl) {
        let html = '';
        products.forEach(p => {
            // Đảm bảo nút có sẵn inline style màu xanh lá chuẩn hoặc dùng class sẵn có của giao diện bạn
            html += `
                <div class="product-card" data-id="${p.id}">
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString('vi-VN')} VNĐ</p>
                    <button style="background-color: #27ae60; color: white; border: none; padding: 10px; width: 100%; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 10px;" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">Thêm vào giỏ</button>
                </div>
            `;
        });
        productListEl.innerHTML = html;
    }

    // 2. Cập nhật số lượng giỏ hàng trên Header ngay khi load trang
    updateHeaderCartCount();

    // 3. Xử lý sự kiện bấm nút "Thêm vào giỏ"
    document.addEventListener('click', function (e) {
        // Bắt sự kiện click vào nút thêm vào giỏ dựa trên nội dung hoặc thuộc tính
        if (e.target && (e.target.textContent.trim() === 'Thêm vào giỏ' || e.target.hasAttribute('data-name'))) {
            const btn = e.target;
            if (!btn.hasAttribute('data-name')) return;
            
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');

            // Lấy giỏ hàng hiện tại từ localStorage
            let cartItems = JSON.parse(localStorage.getItem('cart_products')) || [];

            // Kiểm tra xem sản phẩm đã có trong giỏ chưa
            let existingIndex = cartItems.findIndex(item => item.name === name);
            if (existingIndex > -1) {
                cartItems[existingIndex].quantity += 1; // Đã có thì tăng số lượng lên 1
            } else {
                // Chưa có thì thêm mới vào mảng
                cartItems.push({
                    id: id,
                    name: name,
                    price: price,
                    img: img,
                    quantity: 1
                });
            }

            // Tính tổng số lượng thực tế
            let totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

            // Lưu vào localStorage chung cho toàn bộ website
            localStorage.setItem('cart_products', JSON.stringify(cartItems));
            localStorage.setItem('cart_count', totalCount);

            // Cập nhật ngay lập tức con số trên Header
            updateHeaderCartCount();

            // Hiển thị thông báo Toast
            showToast("Đã thêm sản phẩm vào giỏ hàng!");
        }
    });

    function updateHeaderCartCount() {
        let count = localStorage.getItem('cart_count') || '0';
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = count;
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
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});
