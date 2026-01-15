// ================= ДАННЫЕ РЕПЕТИТОРОВ =================
const TUTORS = [
    { 
        id: 1, 
        name: 'Айгерим Нурланова', 
        subject: 'Математика', 
        university: 'КазНУ им. аль-Фараби',
        price: 6000, 
        rating: 4.9, 
        reviews: 48, 
        desc: 'Выпускница КазНУ, красный диплом. Готовлю к ЕНТ и олимпиадам по математике. Объясняю сложные темы простым языком. Средний балл моих учеников на ЕНТ — 28+. Опыт работы 5 лет.', 
        tags: ['алгебра','геометрия','ент','математика','казну'], 
        schedule: 'Пн, Ср, Пт: 15:00 - 20:00; Сб: 10:00 - 18:00'
    },
    { 
        id: 2, 
        name: 'Алмас Сериков', 
        subject: 'Физика', 
        university: 'КИМЭП',
        price: 5500, 
        rating: 4.8, 
        reviews: 35, 
        desc: 'Призёр республиканских олимпиад по физике. Специализируюсь на подготовке к ЕНТ и поступлению в технические вузы. Использую авторские методики и практические примеры из жизни.', 
        tags: ['физика','механика','ент','школа','кимэп'], 
        schedule: 'Вт, Чт: 16:00 - 21:00; Вс: 12:00 - 18:00' 
    },
    { 
        id: 3, 
        name: 'Дарья Петрова', 
        subject: 'Английский', 
        university: 'Абай атындағы ҚазҰПУ',
        price: 5000, 
        rating: 4.9, 
        reviews: 52, 
        desc: 'Сертифицированный преподаватель английского языка (CELTA, IELTS 8.0). Подготовка к IELTS, TOEFL, ЕНТ. Работаю с учениками всех уровней. Индивидуальный подход и гарантированный результат!', 
        tags: ['английский','english','ielts','toefl','ent','казупу'], 
        schedule: 'Пн-Пт: 14:00 - 20:00' 
    },
    { 
        id: 4, 
        name: 'Нұржан Байділдаев', 
        subject: 'Химия', 
        university: 'КазНМУ им. Асфендиярова',
        price: 4500, 
        rating: 4.7, 
        reviews: 28, 
        desc: 'Студент медицинского университета, победитель химических олимпиад. Помогу разобраться в органической и неорганической химии, подготовлю к ЕНТ. Научу решать задачи любой сложности.', 
        tags: ['химия','органика','ент','медицина','казнму'], 
        schedule: 'Ср, Пт, Сб: 17:00 - 21:00' 
    },
    { 
        id: 5, 
        name: 'Мадина Жұмабекова', 
        subject: 'Математика', 
        university: 'КБТУ',
        price: 7000, 
        rating: 5.0, 
        reviews: 41, 
        desc: 'Преподаватель с 8-летним опытом. Специализация: углубленная математика, подготовка к SAT/ЕНТ, олимпиадная математика. Все мои ученики поступили в топовые вузы РК и зарубежья!', 
        tags: ['математика','sat','ент','олимпиады','кбту'], 
        schedule: 'Пн-Чт: 16:00 - 21:00; Вс: 14:00 - 19:00' 
    }
];

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyOuAJ8ChSBsME3E5cP7_H9TSbxz229b';

// ================= ИНИЦИАЛИЗАЦИЯ TELEGRAM WEBAPP =================
const tg = window.Telegram?.WebApp;

if (tg) { 
    tg.ready();
    tg.setHeaderColor('#667eea');
    tg.setBackgroundColor('#667eea');
    tg.expand();
    console.log('✅ Telegram WebApp инициализирован');
    
    // Логируем данные пользователя для отладки
    if (tg.initDataUnsafe?.user) {
        console.log('👤 Пользователь:', tg.initDataUnsafe.user);
    }
}

// ================= РЕНДЕР РЕПЕТИТОРОВ =================
function renderTutors(list) {
    const container = document.getElementById('tutorList');
    const emptyState = document.getElementById('emptyState');
    
    container.innerHTML = '';
    
    if (list.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        container.classList.add('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    container.classList.remove('hidden');

    list.forEach(tutor => {
        const card = document.createElement('div');
        card.className = 'tutor-card';
        card.onclick = () => openModal(tutor);
        
        card.innerHTML = `
            <div class="card-header">
                <div class="tutor-info">
                    <div class="tutor-name">${tutor.name}</div>
                    <div class="tutor-subject">${tutor.subject}</div>
                    <div class="tutor-university">🎓 ${tutor.university}</div>
                </div>
                <div class="rating-badge">⭐ ${tutor.rating}</div>
            </div>
            <div class="card-footer">
                <span class="tutor-price">${tutor.price.toLocaleString()} ₸/час</span>
                <small style="color:#7f8c8d; font-size: 14px; font-weight: 600;">${tutor.reviews} отзывов</small>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ================= ФИЛЬТРАЦИЯ ПО ПРЕДМЕТАМ =================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        e.target.classList.add('active');
        
        const filter = e.target.dataset.subject;
        
        if (filter === 'all') {
            renderTutors(TUTORS);
        } else {
            const filtered = TUTORS.filter(t => t.subject === filter);
            renderTutors(filtered);
        }
    });
});

// ================= ПОИСК =================
const searchInput = document.getElementById('searchInput');
let searchTimeout;

searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        const val = e.target.value.toLowerCase().trim();
        
        if (val === '') {
            renderTutors(TUTORS);
            return;
        }
        
        const filtered = TUTORS.filter(t => 
            t.name.toLowerCase().includes(val) || 
            t.subject.toLowerCase().includes(val) ||
            t.university.toLowerCase().includes(val) ||
            t.tags.some(tag => tag.includes(val))
        );
        
        renderTutors(filtered);
    }, 300); // Debounce 300ms
});

// ================= МОДАЛЬНЫЕ ОКНА =================
const modal = document.getElementById('tutorModal');
const aiModal = document.getElementById('aiModal');

function openModal(tutor) {
    document.getElementById('modalTitle').textContent = tutor.name;
    
    document.getElementById('modalBody').innerHTML = `
        <p><strong>Предмет:</strong> ${tutor.subject}</p>
        <p><strong>Университет:</strong> 🎓 ${tutor.university}</p>
        <p><strong>Рейтинг:</strong> ⭐ ${tutor.rating} из 5.0 (${tutor.reviews} отзывов)</p>
        <p><strong>Стоимость:</strong> ${tutor.price.toLocaleString()} ₸ за час занятия</p>
        <hr>
        <p><strong>О преподавателе:</strong><br>${tutor.desc}</p>
        <p style="margin-top:18px"><strong>📅 Расписание занятий:</strong><br>${tutor.schedule}</p>
    `;
    
    const btn = document.getElementById('contactTutorBtn');
    btn.onclick = () => contactTutor(tutor);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalElement) {
    modalElement.classList.remove('active');
    document.body.style.overflow = '';
}

// Закрытие модалок
document.getElementById('closeModal').onclick = () => closeModal(modal);
document.getElementById('closeAiModal').onclick = () => closeModal(aiModal);

// Закрытие по клику на оверлей
document.querySelectorAll('.modal').forEach(el => {
    el.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-overlay')) {
            closeModal(this);
        }
    });
});

// Открытие AI чата
document.getElementById('aiAssistantBtn').onclick = () => {
    aiModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ================= ЗАПИСЬ К РЕПЕТИТОРУ =================
function contactTutor(tutor) {
    // Получаем данные пользователя из Telegram WebApp
    const userId = tg?.initDataUnsafe?.user?.id || 'unknown';
    const userFirstName = tg?.initDataUnsafe?.user?.first_name || '';
    const userLastName = tg?.initDataUnsafe?.user?.last_name || '';
    const username = tg?.initDataUnsafe?.user?.username || '';
    const fullName = `${userFirstName} ${userLastName}`.trim() || 'Пользователь';
    
    // Формируем данные для отправки в Google Sheets
    const payload = {
        action: 'booking',
        timestamp: new Date().toISOString(),
        userId: userId,
        userName: fullName,
        username: username,
        tutorId: tutor.id,
        tutorName: tutor.name,
        subject: tutor.subject,
        university: tutor.university,
        price: tutor.price,
        schedule: tutor.schedule
    };
    
    console.log('📤 Отправка заявки:', payload);
    
    // Отправка в Google Sheets через webhook
    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('✅ Заявка успешно отправлена');
        closeModal(modal);
        
        // Показываем уведомление
        if (tg?.showAlert) {
            tg.showAlert('✅ Ваша заявка успешно отправлена!\n\nРепетитор свяжется с вами в ближайшее время.');
        } else {
            alert('✅ Ваша заявка успешно отправлена!\n\nРепетитор свяжется с вами в ближайшее время.');
        }
        
        // Вибрация (если поддерживается)
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('success');
        }
    })
    .catch(error => {
        console.error('❌ Ошибка отправки заявки:', error);
        
        if (tg?.showAlert) {
            tg.showAlert('❌ Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        } else {
            alert('❌ Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        }
    });
}

// ================= AI ЧАТ =================
const chatContainer = document.getElementById('aiChat');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');

// Обработка отправки сообщения
aiSendBtn.onclick = handleAiMessage;
aiInput.addEventListener('keypress', e => { 
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAiMessage();
    }
});

function handleAiMessage() {
    const text = aiInput.value.trim();
    
    if (!text) return;
    
    // Добавляем сообщение пользователя
    addMessage(text, 'user');
    aiInput.value = '';
    
    // Показываем индикатор "печатает..."
    const loadingId = addMessage('Печатаю...', 'assistant', true);
    
    // Отключаем кнопку отправки
    aiSendBtn.disabled = true;
    aiSendBtn.style.opacity = '0.6';
    
    // Отправляем запрос к AI через webhook
    const payload = {
        action: 'ai_chat',
        message: text,
        userId: tg?.initDataUnsafe?.user?.id || 'unknown',
        userName: tg?.initDataUnsafe?.user?.first_name || 'Пользователь'
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        // Удаляем индикатор загрузки
        const loadingMsg = document.getElementById(loadingId);
        if (loadingMsg) loadingMsg.remove();
        
        // Добавляем ответ AI
        const reply = data.reply || 'Извините, не могу ответить на ваш вопрос.';
        addMessage(reply, 'assistant');
    })
    .catch(error => {
        console.error('❌ Ошибка AI чата:', error);
        
        // Удаляем индикатор загрузки
        const loadingMsg = document.getElementById(loadingId);
        if (loadingMsg) loadingMsg.remove();
        
        // Показываем сообщение об ошибке
        addMessage('Извините, произошла ошибка. Попробуйте еще раз.', 'assistant');
    })
    .finally(() => {
        // Включаем кнопку отправки
        aiSendBtn.disabled = false;
        aiSendBtn.style.opacity = '1';
    });
}

function addMessage(text, sender, isLoading = false) {
    const div = document.createElement('div');
    const messageId = 'msg-' + Date.now();
    div.id = messageId;
    div.className = `ai-message ${sender}`;
    
    if (isLoading) {
        div.classList.add('loading');
    }
    
    div.textContent = text;
    chatContainer.appendChild(div);
    
    // Прокручиваем чат вниз
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageId;
}

// ================= ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Приложение запущено');
    renderTutors(TUTORS);
});

// Рендерим сразу после загрузки скрипта
renderTutors(TUTORS);