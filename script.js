// ملف الجافاسكريبت الرئيسي

// كود نافذة قيمي الشخصية
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح!');
    
    // التحقق من وجود العناصر قبل استخدامها
    const myValuesBtn = document.getElementById('myValuesBtn');
    const valuesPage = document.getElementById('valuesPage');
    const closeValuesBtn = document.getElementById('closeValuesBtn');
    const backFromValuesBtn = document.getElementById('backFromValuesBtn');
    
    // إذا كانت النافذة موجودة
    if (myValuesBtn && valuesPage) {
        // فتح نافذة القيم
        myValuesBtn.addEventListener('click', function() {
            valuesPage.style.display = 'flex';
        });
        
        // إغلاق نافذة القيم
        if (closeValuesBtn) {
            closeValuesBtn.addEventListener('click', function() {
                valuesPage.style.display = 'none';
            });
        }
        
        // العودة من نافذة القيم
        if (backFromValuesBtn) {
            backFromValuesBtn.addEventListener('click', function() {
                valuesPage.style.display = 'none';
            });
        }
        
        // إغلاق النافذة بالنقر خارجها
        valuesPage.addEventListener('click', function(e) {
            if (e.target === valuesPage) {
                valuesPage.style.display = 'none';
            }
        });
    }
    
    // تأثيرات التنقل
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إذا كان الرابط يشير إلى صفحة أخرى، لا تمنع السلوك الافتراضي
            if (this.getAttribute('href').includes('.html')) {
                return;
            }
            
            e.preventDefault();
            
            // إزالة النشاط من جميع الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة النشاط للرابط الحالي
            this.classList.add('active');
            
            // التنقل السلس للروابط الداخلية
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // إضافة سنة تلقائية في الفوتر
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});



