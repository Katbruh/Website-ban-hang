// JavaScript source code/
// Khởi tạo Mock Data cho website Quán Ăn Phát Đạt
function initializeData() {
    // 1. Khởi tạo mảng Sản phẩm (products)
    if (!localStorage.getItem('products')) {
        const mockProducts = [
            {
                id: "SP_HU_TIEU_NAM_VANG",
                name: "Hủ Tiếu Nam Vang Thượng Hạng",
                categoryId: "Mon nuoc",
                price: 55000,
                imageBase64: "...", // (Để trống chuỗi Base64 hoặc cho link ảnh nhẹ)
                description: "Sợi hủ tiếu dai ngon ngập tràn trong nước dùng đậm đà, ăn kèm tôm tươi, thịt heo.",
                status: "active",
                isSold: true // Đã có người mua (test chức năng ẩn của Admin)
            },
            {
                id: "SP_BANH_MI_CHAO",
                name: "Bánh Mì Chảo Đặc Biệt",
                categoryId: "Khai vi",
                price: 45000,
                imageBase64: "...",
                description: "Chảo gang nóng hổi kết hợp trứng ốp la lòng đào, thịt bò mềm thơm, xíu mại.",
                status: "active",
                isSold: false // Chưa có người mua (Admin có thể xóa hẳn)
            }
            // (Bạn dùng AI sinh thêm khoảng 30 món nữa theo mẫu này)
        ];
        localStorage.setItem('products', JSON.stringify(mockProducts));
    }

    // 2. Khởi tạo mảng Users
    if (!localStorage.getItem('users')) {
        const mockUsers = [
            {
                id: "ADMIN_01",
                username: "admin",
                password: "123", // Làm đồ án nên để mật khẩu cơ bản
                fullName: "Quản trị viên Phát Đạt",
                phone: "0999999999",
                address: { city: "TP HCM", district: "Quận 5", street: "273 Kinh Dương Vương" },
                role: "admin",
                isLocked: false
            },
            {
                id: "CUST_01",
                username: "khachhang1",
                password: "123",
                fullName: "Nguyễn Văn A",
                phone: "0901234567",
                address: { city: "TP HCM", district: "Quận 1", street: "123 Lê Lợi" },
                role: "customer",
                isLocked: false
            }
        ];
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }

    // 3. Khởi tạo mảng Giỏ hàng (cart) & Đơn hàng (orders) rỗng nếu chưa có
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));
    if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify([]));
    if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', JSON.stringify(null));
}

// Chạy hàm nạp dữ liệu khi load web
initializeData();