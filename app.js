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
    const phoneValue = phoneInput.value.trim();
    
    // Agar input bo'sh bo'lmasa VA raqam to'liq bo'lmasa
    // (Faqat "+998 " bo'lsa ham bo'sh deb hisoblaymiz)
    if (phoneValue !== "" && phoneValue !== "+998" && phoneValue !== "+998 " && phoneValue.length < 17) {
        e.preventDefault(); 
        alert("Agar telefon raqam kiritmoqchi bo'lsangiz, iltimos uni to'liq yozing. Bo'sh qoldirsangiz ham bo'ladi.");
        phoneInput.focus();
    }
});

// Telefon inputidan chiqib ketganda, agar ichida faqat "+998 " bo'lsa, uni tozalab qo'yish
phoneInput.addEventListener('blur', function() {
    if (this.value === "+998 " || this.value === "+998") {
        this.value = "";
    }
});
