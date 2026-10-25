function initializeData() {
    if (!localStorage.getItem('products')) {
        const mockProducts = [
            {
                id: "SP_01",
                name: "Bánh Tráng Trộn Sẵn 8 Ghiền",
                categoryId: "Khai vi",
                price: 25000,
                image: "img/1.jpg",
                description: "Bánh tráng trộn đậm vị, đầy đủ topping khô bò, trứng cút, mỡ hành.",
                status: "active"
            },
            {
                id: "SP_02",
                name: "Cá Viên Chiên (1 Xiên / 4 Viên)",
                categoryId: "Khai vi",
                price: 5000,
                image: "2.jpg",
                description: "Cá viên chiên vàng giòn rụm, 1 xiên gồm 4 viên hấp dẫn.",
                status: "active"
            },
            {
                id: "SP_03",
                name: "Kẹo Nhai Dynamite Chews (Gói)",
                categoryId: "Khai vi",
                price: 25000,
                image: "3.jpg",
                description: "Kẹo nhai Sô-cô-la hương bạc hà, đóng gói tiện lợi.",
                status: "active"
            },
            {
                id: "SP_04",
                name: "Que Cây Vfoods Hot Chilli (Gói)",
                categoryId: "Khai vi",
                price: 15000,
                image: "img/4.jpg",
                description: "Bánh snack que cay Vfoods giòn rụm, vị cay ngọt hấp dẫn.",
                status: "active"
            },
            {
                id: "SP_05",
                name: "Xúc Xích Chiên (1 Cây)",
                categoryId: "Khai vi",
                price: 6000,
                image: "5.jpg",
                description: "Xúc xích chiên thơm ngon đậm đà, ăn kèm rau sống và tương ớt.",
                status: "active"
            },
        ];
        localStorage.setItem('products', JSON.stringify(mockProducts));
    }

    if (!localStorage.getItem('users')) {
        const mockUsers = [
            {
                id: "ADMIN_01",
                username: "admin",
                password: "123",
                fullName: "Quản trị viên Phát Đạt",
                phone: "0999999999",
                address: { city: "TP HCM", district: "Quận 5", street: "273 Kinh Dương Vương" },
                role: "admin",
                isLocked: false
            }
        ];
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }

    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));
    if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify([]));
    if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', JSON.stringify(null));
}

initializeData();
