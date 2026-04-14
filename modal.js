// Модальное окно авторизации/регистрации
let currentModalMode = 'login'; // 'login' или 'register'

// Открыть модальное окно
function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userInfo = document.getElementById('userInfo');
    
    currentModalMode = mode;
    
    if (isLoggedIn()) {
        // Пользователь авторизован - показываем информацию
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        userInfo.classList.add('active');
        updateUserInfo();
    } else {
        // Показываем форму в зависимости от режима
        userInfo.classList.remove('active');
        if (mode === 'login') {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
            document.getElementById('modalTitle').textContent = 'Вход';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
            document.getElementById('modalTitle').textContent = 'Регистрация';
        }
    }
    
    modal.classList.add('active');
    hideMessages();
}

// Закрыть модальное окно
function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
    hideMessages();
}

// Переключиться на регистрацию
function showRegister() {
    currentModalMode = 'register';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Регистрация';
    hideMessages();
}

// Переключиться на вход
function showLogin() {
    currentModalMode = 'login';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Вход';
    hideMessages();
}

// Обработка формы входа
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    const result = loginUser(email, password);
    
    if (result.success) {
        hideMessages();
        updateUserInfo();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('userInfo').classList.add('active');
        showMessage('success', result.message);
    } else {
        showMessage('error', result.message);
    }
}

// Обработка формы регистрации
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('error', 'Пароли не совпадают');
        return;
    }
    
    const result = registerUser(email, password, name);
    
    if (result.success) {
        hideMessages();
        // Автоматический вход после регистрации
        loginUser(email, password);
        updateUserInfo();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('userInfo').classList.add('active');
        showMessage('success', result.message);
    } else {
        showMessage('error', result.message);
    }
}

// Выход из системы
function handleLogout() {
    logoutUser();
    document.getElementById('userInfo').classList.remove('active');
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    hideMessages();
}

// Обновление информации о пользователе
function updateUserInfo() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.name || user.email;
        document.getElementById('userEmail').textContent = user.email;
    }
}

// Показать сообщение
function showMessage(type, text) {
    hideMessages();
    const messageEl = type === 'error' 
        ? document.getElementById('errorMessage') 
        : document.getElementById('successMessage');
    messageEl.textContent = text;
    messageEl.classList.add('visible');
}

// Скрыть все сообщения
function hideMessages() {
    document.getElementById('errorMessage').classList.remove('visible');
    document.getElementById('successMessage').classList.remove('visible');
}

// Закрытие по клику вне окна
function handleModalClick(event) {
    if (event.target.id === 'authModal') {
        closeAuthModal();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Навешиваем обработчики на все кнопки "Записаться"
    const courseButtons = document.querySelectorAll('.course-button');
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isLoggedIn()) {
                const user = getCurrentUser();
                alert(`Спасибо за интерес, ${user.name || user.email}! Мы свяжемся с вами.`);
            } else {
                openAuthModal('register');
            }
        });
    });
    
    // Добавляем кнопку входа/профиля в шапку
    updateHeaderAuth();
});

// Обновление шапки с кнопкой авторизации
function updateHeaderAuth() {
    const header = document.querySelector('header');
    let authButton = document.getElementById('headerAuthBtn');
    
    if (!authButton) {
        authButton = document.createElement('button');
        authButton.id = 'headerAuthBtn';
        authButton.style.cssText = 'margin-left: 20px; padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;';
        header.appendChild(authButton);
    }
    
    const user = getCurrentUser();
    if (user) {
        authButton.textContent = user.name || user.email;
        authButton.onclick = () => openAuthModal('login');
    } else {
        authButton.textContent = 'Войти';
        authButton.onclick = () => openAuthModal('login');
    }
}
