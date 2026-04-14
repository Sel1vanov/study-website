// База данных пользователей в JSON формате (localStorage)
const DB_KEY = 'users_db';

// Инициализация базы данных
function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify([]));
    }
}

// Получить всех пользователей
function getUsers() {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
}

// Найти пользователя по email
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// Регистрация нового пользователя
function registerUser(email, password, name) {
    if (!email || !password || !name) {
        return { success: false, message: 'Все поля обязательны для заполнения' };
    }
    
    if (password.length < 6) {
        return { success: false, message: 'Пароль должен быть не менее 6 символов' };
    }
    
    const existingUser = findUserByEmail(email);
    if (existingUser) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now(),
        email: email,
        password: password, // В реальном проекте пароли нужно хешировать!
        name: name,
        createdAt: new Date().toISOString()
    };
    
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Регистрация успешна!' };
}

// Авторизация пользователя
function loginUser(email, password) {
    if (!email || !password) {
        return { success: false, message: 'Введите email и пароль' };
    }
    
    const user = findUserByEmail(email);
    if (!user) {
        return { success: false, message: 'Пользователь не найден' };
    }
    
    if (user.password !== password) {
        return { success: false, message: 'Неверный пароль' };
    }
    
    // Сохраняем текущую сессию
    localStorage.setItem('current_user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name
    }));
    
    return { success: true, message: 'Вход выполнен успешно!', user: { id: user.id, email: user.email, name: user.name } };
}

// Выход из системы
function logoutUser() {
    localStorage.removeItem('current_user');
}

// Получить текущего пользователя
function getCurrentUser() {
    const currentUser = localStorage.getItem('current_user');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Проверка, авторизован ли пользователь
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Инициализация БД при загрузке скрипта
initDB();
