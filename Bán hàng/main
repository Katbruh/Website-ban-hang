document.addEventListener("DOMContentLoaded", function () {
    // Hàm tự động cách 3 chữ số khi nhập (ví dụ: 100000 -> 100.000)
    function formatCurrencyInput(inputElement) {
        inputElement.addEventListener('input', function (e) {
            // Lọc bỏ tất cả các ký tự không phải là số
            let value = this.value.replace(/\D/g, '');
            
            if (value !== '') {
                // Định dạng lại thành chuỗi có dấu chấm phân cách
                value = Number(value).toLocaleString('vi-VN');
            }
            
            this.value = value;
        });
    }

    // Áp dụng cho 2 ô "Giá từ" và "Đến giá"
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (minPriceInput) formatCurrencyInput(minPriceInput);
    if (maxPriceInput) formatCurrencyInput(maxPriceInput);
});
