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

// وظائف فتح الألعاب - مضافة من index.html
function openGameInFrame(gameUrl, gameTitle) {
    const gameWindow = document.getElementById('gameWindow');
    const gameFrame = document.getElementById('gameFrame');
    const gameWindowTitle = document.getElementById('gameWindowTitle');
    
    // ضبط العنوان
    gameWindowTitle.textContent = `🎮 ${gameTitle}`;
    
    // إعداد iframe
    gameFrame.sandbox = "allow-scripts allow-same-origin";
    gameFrame.allow = "autoplay; fullscreen";
    
    // تحميل اللعبة في الإطار
    gameFrame.src = gameUrl;
    
    // إظهار النافذة
    gameWindow.style.display = 'flex';
    
    // منع التمرير في الصفحة الرئيسية
    document.body.style.overflow = 'hidden';
}

function closeGameWindow() {
    const gameWindow = document.getElementById('gameWindow');
    const gameFrame = document.getElementById('gameFrame');
    
    // إغلاق النافذة
    gameWindow.style.display = 'none';
    
    // إوقف اللعبة
    gameFrame.src = 'about:blank';
    
    // إعادة التمرير في الصفحة الرئيسية
    document.body.style.overflow = 'auto';
}

// أضف هذا المستمع للرسائل
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'closeGame') {
        closeGameWindow();
    }
});
// مؤشرات الجوال
const mobileMoves = document.getElementById('mobileMoves');
const mobileTimer = document.getElementById('mobileTimer');
const mobileMatches = document.getElementById('mobileMatches');
const mobileLoader = document.getElementById('mobileLoader');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');

// مؤثرات صوتية
let soundEnabled = true;
const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const winSound = document.getElementById('winSound');
const clickSound = document.getElementById('clickSound');

// دالة تحديث إحصائيات الجوال
function updateMobileStats() {
    mobileMoves.textContent = moves;
    mobileTimer.textContent = timer;
    mobileMatches.textContent = matches;
}

// دالة التحكم في الصوت
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundBtn = document.getElementById('soundToggle');
    
    if (soundEnabled) {
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> صوت';
        soundBtn.classList.remove('muted');
        mobileSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        mobileSoundBtn.classList.remove('muted');
    } else {
        soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> صامت';
        soundBtn.classList.add('muted');
        mobileSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        mobileSoundBtn.classList.add('muted');
    }
    
    playSound(clickSound);
}

// دالة تشغيل الصوت
function playSound(audioElement) {
    if (!soundEnabled) return;
    
    try {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log("لم يتم تشغيل الصوت:", e));
    } catch (e) {
        console.log("خطأ في تشغيل الصوت:", e);
    }
}

// اهتزاز على الجوال
function vibrate(pattern = 50) {
    if ("vibrate" in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            // تجاهل الخطأ إذا لم يدعم الجهاز
        }
    }
}

// دالة تحسين البطاقات للجوال
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // تقليل حجم الخط للبطاقات على الجوال
        document.querySelectorAll('.card-front, .card-back').forEach(card => {
            card.style.fontSize = boardSize <= 4 ? '1.8rem' : '1.5rem';
        });
        
        // زيادة حجم البطاقات قليلاً للجوال
        document.querySelectorAll('.card').forEach(card => {
            card.style.height = boardSize <= 4 ? '85px' : '75px';
        });
    }
}

// دالة تعيين الصعوبة (محدثة)
function setDifficulty(size) {
    boardSize = size;
    
    // تحديث الأزرار النشطة
    document.querySelectorAll('.difficulty button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // تمييز الزر النشط
    if (size === 4) {
        document.getElementById('easyBtn').classList.add('active');
        totalPairs = 8;
    } else if (size === 6) {
        document.getElementById('mediumBtn').classList.add('active');
        totalPairs = 18;
    } else if (size === 8) {
        document.getElementById('hardBtn').classList.add('active');
        totalPairs = 32;
    }
    
    // إظهار مؤشر التحميل للجوال
    if (window.innerWidth <= 768) {
        mobileLoader.classList.add('active');
        setTimeout(() => {
            mobileLoader.classList.remove('active');
        }, 800);
    }
    
    restartGame();
}

// دالة قلب البطاقة (محدثة بالمؤثرات)
function flipCard(card) {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    if (card.classList.contains('flipped') || 
        card.classList.contains('matched') || 
        flippedCards.length >= 2) {
        return;
    }
    
    // مؤثرات
    playSound(flipSound);
    vibrate(30);
    card.style.transform = 'rotateY(180deg) scale(1.05)';
    setTimeout(() => {
        card.style.transform = 'rotateY(180deg) scale(1)';
    }, 150);
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesElement.textContent = moves;
        updateMobileStats();
        
        setTimeout(checkForMatch, 500);
    }
}

// دالة التحقق من المطابقة (محدثة)
function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        // تطابق ناجح
        playSound(matchSound);
        vibrate([100, 50, 100]);
        
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        matchesElement.textContent = matches;
        updateMobileStats();
        
        // تأثير المطابقة
        card1.style.animation = 'pulse 0.5s';
        card2.style.animation = 'pulse 0.5s';
        
        // فوز؟
        if (matches === totalPairs) {
            endGame();
        }
    } else {
        // لا يوجد تطابق
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            // تأثير الارتداد
            card1.style.transform = 'rotateY(0deg)';
            card2.style.transform = 'rotateY(0deg)';
        }, 300);
    }
    
    flippedCards = [];
}

// بدء المؤقت (محدث)
function startTimer() {
    timer = 0;
    timerElement.textContent = timer;
    updateMobileStats();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
        updateMobileStats();
    }, 1000);
}

// نهاية اللعبة (محدثة)
function endGame() {
    clearInterval(timerInterval);
    
    finalTimeElement.textContent = timer;
    finalMovesElement.textContent = moves;
    
    setTimeout(() => {
        playSound(winSound);
        vibrate([200, 100, 200]);
        winMessage.classList.add('active');
    }, 500);
}

// إعادة تعليمات المحاولات
function resetGameStats() {
    moves = 0;
    matches = 0;
    gameStarted = false;
    
    movesElement.textContent = moves;
    matchesElement.textContent = matches;
    timerElement.textContent = timer;
    updateMobileStats();
    
    clearInterval(timerInterval);
    winMessage.classList.remove('active');
}

// إعادة بدء اللعبة (محدثة)
function restartGame() {
    resetGameStats();
    createCards();
    optimizeForMobile();
}

// بدء لعبة جديدة (محدثة)
function startGame() {
    resetGameStats();
    createCards();
    startTimer();
    gameStarted = true;
    optimizeForMobile();
    
    playSound(clickSound);
}

// إنشاء البطاقات (محدثة)
function createCards() {
    gameBoard.innerHTML = '';
    cards = [];
    
    // إظهار مؤشر التحميل للجوال
    if (window.innerWidth <= 768) {
        mobileLoader.classList.add('active');
    }
    
    // إنشاء مجموعة الرموز
    const selectedSymbols = symbols.slice(0, totalPairs);
    const cardSymbols = [...selectedSymbols, ...selectedSymbols];
    
    // خلط الرموز
    shuffleArray(cardSymbols);
    
    // تحديث تخطيط الشبكة
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.style.gap = boardSize <= 4 ? '12px' : '8px';
    
    // إنشاء البطاقات
    cardSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        // حجم الخط حسب الصعوبة
        const fontSize = boardSize <= 4 ? '2rem' : 
                        boardSize === 6 ? '1.5rem' : '1.2rem';
        
        card.innerHTML = `
            <div class="card-front" style="font-size: ${fontSize}">${symbol}</div>
            <div class="card-back" style="font-size: ${fontSize}">?</div>
        `;
        
        // إضافة تأثير النقر للجوال
        card.addEventListener('click', () => flipCard(card));
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        card.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        gameBoard.appendChild(card);
        cards.push(card);
    });
    
    // إخفاء مؤشر التحميل
    setTimeout(() => {
        mobileLoader.classList.remove('active');
    }, 300);
    
    // إعادة تعليمات المحاولات
    resetGameStats();
}

// دالة الكشف عن جميع البطاقات مؤقتاً (مساعدة)
function showAllCardsTemporarily() {
    if (!gameStarted) return;
    
    cards.forEach(card => {
        if (!card.classList.contains('matched')) {
            card.classList.add('flipped');
        }
    });
    
    setTimeout(() => {
        cards.forEach(card => {
            if (!card.classList.contains('matched')) {
                card.classList.remove('flipped');
            }
        });
    }, 1500);
}

// إضافة مستمعي الأحداث للجوال
document.addEventListener('DOMContentLoaded', function() {
    // تحديث حجم الشاشة عند التكبير/التصغير
    window.addEventListener('resize', optimizeForMobile);
    
    // منع التمرير المزدوج للزيادة
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // تحديث إحصائيات الجوال أول مرة
    updateMobileStats();
    
    // بدء اللعبة عند تحميل الصفحة
    setTimeout(() => {
        createCards();
        optimizeForMobile();
    }, 100);
});

// إضافة مؤثرات للأزرار
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => playSound(clickSound));
    btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});
// مشاركة النتيجة
function shareResult() {
    const time = document.getElementById('finalTime').textContent;
    const moves = document.getElementById('finalMoves').textContent;
    const level = document.getElementById('finalLevel').textContent;
    
    const shareText = `🎮 فزت بلعبة الذاكرة!
⏱️ الوقت: ${time} ثانية
🏃 الحركات: ${moves}
🎯 المستوى: ${level}
🌟 TseYFZ`;
    
    if (navigator.share) {
        navigator.share({
            title: 'نتيجة لعبة الذاكرة',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('✅ تم نسخ النتيجة إلى الحافظة!');
        });
    }
}


