document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        // Boshlang'ich qiymat
        phoneInput.value = '+998 ';

        phoneInput.addEventListener('keydown', function(e) {
            // Agar kursor +998 (birinchi 5 ta belgi) ichida bo'lsa
            // va foydalanuvchi Backspace yoki Delete bosib o'chirmoqchi bo'lsa - TO'XTATAMIZ
            if (this.selectionStart <= 5 && (e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
            }
        });

        phoneInput.addEventListener('input', function(e) {
            // Faqat raqamlarni ajratib olamiz
            let val = this.value.replace(/\D/g, '');
            
            // Agar foydalanuvchi qanaqadir yo'l bilan 998 ni o'chirib yuborsa, qaytaramiz
            if (!val.startsWith('998')) {
                val = '998' + val;
            }

            // Faqat 12 ta raqamdan oshib ketmasligi uchun (+998 + 9 ta raqam)
            val = val.substring(0, 12);

            // Formatlash: +998 XX XXX XX XX
            let formatted = '+998 ';
            if (val.length > 3) {
                formatted += val.substring(3, 5);
            }
            if (val.length > 5) {
                formatted += ' ' + val.substring(5, 8);
            }
            if (val.length > 8) {
                formatted += ' ' + val.substring(8, 10);
            }
            if (val.length > 10) {
                formatted += ' ' + val.substring(10, 12);
            }

            this.value = formatted;
        });

        // Kursorni boshiga ( +998 ichiga ) qo'yishga yo'l qo'ymaslik
        phoneInput.addEventListener('click', function() {
            if (this.selectionStart < 5) {
                this.setSelectionRange(5, 5);
            }
        });
    }
});


// script.js faylining oxiriga qo'shing

const form = document.getElementById('feedbackForm');
const phoneInput = document.getElementById('phone');

form.addEventListener('submit', function(e) {
    // Agar raqam to'liq yozilmagan bo'lsa (+998 va 9 ta raqam = 17 ta belgi bo'shliqlar bilan)
    if (phoneInput.value.length < 17) {
        e.preventDefault(); // Formani yuborishni to'xtatish
        alert("Write your phone number completely!");
        phoneInput.focus();
    }
});
