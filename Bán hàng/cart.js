document.addEventListener("DOMContentLoaded", function () {
    const btnCheckout = document.getElementById('btn-checkout');
    const btnAddMore = document.getElementById('btn-add-more');
    const btnDelete = document.getElementById('btn-delete');
    const btnExplore = document.getElementById('btn-explore');

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

    // 1. Nút "Thêm món khác": Nhấn vào đứng yên tại chỗ, chỉ hiện bảng "Đã thêm món"
    if (btnAddMore) {
        btnAddMore.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã thêm món");
        });
    }

    // 2. Nút "Tiến hành đặt hàng": Nhấn vào đứng yên tại chỗ, hiện bảng "Đã đặt hàng"
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã đặt hàng");
        });
    }

    // 3. Nút "Xóa" sản phẩm: Nhấn vào đứng yên tại chỗ, hiện bảng "Đã xóa món hàng"
    if (btnDelete) {
        btnDelete.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã xóa món hàng");
        });
    }

    // 4. Nút "Khám phá thực đơn ngay" (khi giỏ trống): Nhấn vào hiện bảng "Đã chuyển sang trang chủ"
    if (btnExplore) {
        btnExplore.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Đã chuyển sang trang chủ");
        });
    }
});
