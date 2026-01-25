// security.js - لمنع فحص الكود
(function() {
    'use strict';
    
    // منع النقر الأيمن
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showHackerMessage('❌ غير مسموح بفتح قائمة السياق!');
    });
    
    // منع مفاتيح التطوير (F12, Ctrl+Shift+I, etc)
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            showHackerMessage('❌ تم منع F12!');
            return false;
        }
        
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showHackerMessage('❌ تم منع Ctrl+Shift+I!');
            return false;
        }
        
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showHackerMessage('❌ تم منع Ctrl+Shift+J!');
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showHackerMessage('❌ تم منع عرض المصدر!');
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showHackerMessage('❌ غير مسموح بحفظ الصفحة!');
            return false;
        }
    });
    
    // منع فتح أدوات المطورين عن طريق تغيير الحجم
    let devToolsOpened = false;
    
    // طريقة الكشف عن أدوات المطورين
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if ((widthThreshold || heightThreshold) && !devToolsOpened) {
            devToolsOpened = true;
            showHackerPage();
        }
    }
    
    // فحص مستمر لأدوات المطورين
    setInterval(detectDevTools, 1000);
    
    // إظهار رسالة القرصنة
    function showHackerMessage(message) {
        // إنشاء عنصر الرسالة
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff0000;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 99999;
            font-family: Arial, sans-serif;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(255,0,0,0.5);
            animation: shake 0.5s;
        `;
        
        msgDiv.innerHTML = `<span style="margin-right: 10px;">⚠️</span> ${message}`;
        
        // إضافة تأثير الهز
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(msgDiv);
        
        // إزالة الرسالة بعد 3 ثواني
        setTimeout(() => {
            if (msgDiv.parentNode) {
                msgDiv.parentNode.removeChild(msgDiv);
            }
        }, 3000);
    }
    
    // صفحة القرصنة الكاملة
    function showHackerPage() {
        // حفظ المحتوى الأصلي
        const originalContent = document.body.innerHTML;
        
        // إنشاء صفحة القرصنة
        const hackerPage = `
            <div id="hacker-page" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                color: #00ff00;
                z-index: 999999;
                font-family: 'Courier New', monospace;
                overflow: hidden;
                text-align: center;
                padding-top: 100px;
            ">
                <div style="font-size: 80px; margin-bottom: 30px;">⚠️</div>
                <h1 style="font-size: 48px; color: #ff0000; text-shadow: 0 0 10px #ff0000;">!تم اكتشاف محاولة اختراق</h1>
                <p style="font-size: 24px; margin: 20px 0;">لقد تم كشف محاولة فحص الكود المصدري</p>
                <p style="font-size: 18px; color: #ccc;">IP: <span id="user-ip">جاري الكشف...</span></p>
                <div style="margin: 40px 0;">
                    <div id="matrix-effect" style="
                        color: #0f0;
                        font-size: 20px;
                        line-height: 1.2;
                        height: 200px;
                        overflow: hidden;
                        width: 80%;
                        margin: 0 auto;
                        text-align: left;
                        font-family: monospace;
                    "></div>
                </div>
                <p style="font-size: 16px; color: #999; margin-top: 50px;">
                    سيتم تحويلك خلال: <span id="countdown">10</span> ثانية
                </p>
            </div>
        `;
        
        // استبدال المحتوى
        document.body.innerHTML = hackerPage + originalContent;
        
        // جلب IP المستخدم
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('user-ip').textContent = data.ip;
            })
            .catch(() => {
                document.getElementById('user-ip').textContent = 'غير معروف';
            });
        
        // تأثير المصفوفة
        function createMatrixEffect() {
            const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
            const container = document.getElementById('matrix-effect');
            const columns = Math.floor(container.offsetWidth / 20);
            
            let drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -100);
            }
            
            function draw() {
                let output = '';
                for (let i = 0; i < drops.length; i++) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    output += `<span style="color: ${drops[i] > 0 ? '#0f0' : '#090'}">${char}</span>`;
                    drops[i]++;
                    
                    if (drops[i] > 20) {
                        drops[i] = Math.floor(Math.random() * -100);
                    }
                }
                container.innerHTML = output.replace(/,/g, '');
            }
            
            setInterval(draw, 100);
        }
        
        createMatrixEffect();
        
        // العد التنازلي
        let seconds = 10;
        const countdownElement = document.getElementById('countdown');
        const countdownInterval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                // إعادة التوجيه
                window.location.href = window.location.origin;
            }
        }, 1000);
        
        // محاولة الخروج من صفحة القرصنة
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 27) { // ESC
                showHackerMessage('❌ لا يمكنك الخروج!');
            }
        });
    }
    
    // حماية إضافية: منع فتح إطارات جديدة
    window.addEventListener('blur', function() {
        if (document.activeElement === document.body) {
            showHackerMessage('⚠️ لا تفتح أدوات المطورين!');
        }
    });
    
    console.log('%c ⚠️ تحذير أمني ⚠️', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('%c هذا الموقع محمي من فحص الكود المصدري', 'color: #0f0; font-size: 16px;');
    console.log('%c أي محاولة اختراق سيتم تسجيلها', 'color: #ff0; font-size: 14px;');
    
})();
