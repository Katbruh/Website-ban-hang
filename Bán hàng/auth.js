// JavaScript source code
// ====== CHUYỂN ĐỔI TAB ĐĂNG NHẬP / ĐĂNG KÝ ======
function switchTab(tab) {
    document.getElementById('form-login').classList.remove('active');
    document.getElementById('form-register').classList.remove('active');
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('tab-register').classList.remove('active');

    document.getElementById('form-' + tab).classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
}

// ====== XỬ LÝ ĐĂNG KÝ (END-USER) ======
function handleRegister(event) {
    event.preventDefault(); // Chặn trang tải lại

    // 1. Lấy dữ liệu từ form
    const fullname = document.getElementById('reg-fullname').value;
    const phone = document.getElementById('reg-phone').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const errorDiv = document.getElementById('register-error');

    // 2. Lấy danh sách users từ localStorage (giả lập DB)
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 3. Kiểm tra xem tên đăng nhập đã tồn tại chưa
    const isExist = users.some(user => user.username === username);
    if (isExist) {
        errorDiv.innerText = "Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.";
        errorDiv.style.display = "block";
        return;
    }

    // 4. Tạo object tài khoản mới (mặc định role là customer)
    const newUser = {
        id: "CUST_" + new Date().getTime(), // Tạo ID ngẫu nhiên bằng thời gian
        username: username,
        password: password,
        fullName: fullname,
        phone: phone,
        address: { city: "", district: "", street: "" },
        role: "customer",
        isLocked: false // Mặc định không bị khóa
    };

    // 5. Thêm vào mảng và lưu lại xuống localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    switchTab('login'); // Chuyển sang tab đăng nhập
    document.getElementById('form-register').reset(); // Xóa trắng form
}

// ====== XỬ LÝ ĐĂNG NHẬP ======
function handleLogin(event) {
    event.preventDefault(); // Chặn trang tải lại

    const usernameInput = document.getElementById('login-username').value;
    const passwordInput = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    // 1. Lấy danh sách users từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Tìm tài khoản trùng khớp user & pass
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (!user) {
        errorDiv.innerText = "Sai tên đăng nhập hoặc mật khẩu!";
        errorDiv.style.display = "block";
        return;
    }

    // 3. Kiểm tra tài khoản có bị Admin khóa không? (Yêu cầu của đồ án)
    if (user.isLocked === true) {
        errorDiv.innerText = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin!";
        errorDiv.style.display = "block";
        return;
    }

    // 4. Đăng nhập thành công -> Lưu vào currentUser
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert("Đăng nhập thành công! Xin chào " + user.fullName);

    // 5. Chuyển hướng dựa theo Role (Phân quyền)
    if (user.role === 'admin') {
        window.location.href = "admin_index.html"; // Trỏ qua trang quản trị Admin
    } else {
        window.location.href = "index.html"; // Trỏ về trang chủ người dùng
    }
}

// ====== HÀM ĐĂNG XUẤT (Có thể gọi ở bất kỳ trang nào) ======
function handleLogout() {
    localStorage.removeItem('currentUser'); // Xóa phiên đăng nhập
    alert("Đã đăng xuất thành công!");
    window.location.href = "index.html";
}