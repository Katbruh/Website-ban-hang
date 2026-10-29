document.addEventListener("DOMContentLoaded", function () {
    const btnCheckout = document.getElementById('btn-checkout');
    const btnAddMore = document.getElementById('btn-add-more');
    const btnDelete = document.getElementById('btn-delete');
    const policyLinks = document.querySelectorAll('.policy-link');

    // Hàm hiển thị bảng thông báo nhỏ (Toast) ngay tại chỗ
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

    // Nút "Thêm món khác"
    if (btnAddMore) {
        btnAddMore.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã thêm món");
        });
    }

    // Nút "Tiến hành đặt hàng"
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã đặt hàng");
        });
    }

    // Nút "Xóa" sản phẩm
    if (btnDelete) {
        btnDelete.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã xóa món hàng");
        });
    }

    // Các liên kết chính sách ở footer
    policyLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Nội dung đang được cập nhật");
        });
    });
});
