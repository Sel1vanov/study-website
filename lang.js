//лист с переводами -Бодя

const translations = {
    ru: {
        // шапка
        title: "Добро пожаловать в школу иностранных языков",
        contact: "Контакты +8 (800)-555-35-35",
        main: "Главная",
        courses: "Курсы",
        teach: "Преподаватели",
        // главная
        course_but: "Записаться",
        eng:"Курс Английского языка",
        ger:"Курс Немецкого языка",
        spa:"Курс Испанского языка",
        pol:"Курс Польского языка",
        jap:"Курс Японского языка",
        fra:"Курс Французского языка",
        ser:"Курс Сербского языка",
        ita:"Курс Итальянского языка",
        level:"От A1 до C1",
        // преподаватели
        our_teach:"Наши преподаватели:",
        // курсы
        our_course:"Наши курсы:",
        eng_c:"Английский",
        ger_c:"Немецкий",
        spa_c:"Испанский",
        pol_c:"Польский",
        jap_c:"Японский",
        fra_c:"Французский",
        ser_c:"Сербский",
        ita_c:"Итальянский",
    },
    en: {
        // шапка
        title: "Welcome to foreing languages school",
        contact: "Contacts +8 (800)-555-35-35",
        main: "Main",
        courses: "Courses",
        teach: "Teachers",
        // главная
        course_but: "Sign up",
        eng:"Adv. English course",
        ger:"German course",
        spa:"Spanish course",
        pol:"Polish course",
        jap:"Japanese course",
        fra:"French course",
        ser:"Serbian course",
        ita:"Italian course",
        level:"From A1 till C1",
        // преподаватели
        our_teach:"Our teachers:",
        // курсы
        our_course:"Our courses:",
        eng_c:"Advanced English",
        ger_c:"German",
        spa_c:"Spanish",
        pol_c:"Polish",
        jap_c:"Japanese",
        fra_c:"French",
        ser_c:"Serbian",
        ita_c:"Italian",
    },
    lv: {
        // шапка
        title: "Laipni lūdzam svešvalodu skolā",
        contact: "Kontakti +8 (800)-555-35-35",
        main: "Galvena",
        courses: "Kursi",
        teach: "Skolotāji",
        // главная
        course_but: "Pierakstīties",
        eng:"Angļu valoda kurss",
        ger:"Vācu valoda kurss",
        spa:"Spāņu valoda kurss",
        pol:"Poļu valoda kurss",
        jap:"Japāņu valoda kurss",
        fra:"Franču valoda kurss",
        ser:"Serbu valoda kurss",
        ita:"Itāļu valoda kurss",
        level:"No A1 līdz C1",
        // преподаватели
        our_teach:"Mūsu skolotāji:",
        // курсы
        our_course:"Mūsu kursi:",
        eng_c:"Angļu",
        ger_c:"Vācu",
        spa_c:"Spāņu",
        pol_c:"Poļu",
        jap_c:"Japāņu",
        fra_c:"Franču",
        ser_c:"Serbu",
        ita_c:"Itāļu",
    }
};

function changeLanguage(lang) {
    // 1. Меняем атрибут lang у тега <html> (полезно для SEO и скринридеров)
    document.documentElement.lang = lang;

    // 2. Находим все элементы с атрибутом data-lang-key
    const elements = document.querySelectorAll('[data-lang-key]');

    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        // 3. Заменяем текст на перевод из словаря
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Обновляем активный язык в выпадающем списке
    updateLangDropdown(lang);
    
    // Опционально: сохраняем выбор в браузере
    localStorage.setItem('selectedLanguage', lang);
}

// Обновление активного языка в выпадающем списке
function updateLangDropdown(currentLang) {
    // Обновляем текст кнопки
    const currentLangSpan = document.getElementById('currentLang');
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLang.toUpperCase();
    }
    
    // Обновляем активный класс в меню
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        if (option.dataset.lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Переключение выпадающего списка
function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.classList.toggle('active');
}

// Закрытие dropdown при клике вне его
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// При загрузке страницы проверяем сохраненный язык
window.onload = () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    changeLanguage(savedLang);
};
