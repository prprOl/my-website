// Зберігаємо інформацію про систему у localStorage
var systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    appVersion: navigator.appVersion,
    vendor: navigator.vendor
};
localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Відображення інформації у футері
var footer = document.getElementById('footer-info');
var storedInfo = localStorage.getItem('systemInfo');

if (storedInfo && footer) {
    var info = JSON.parse(storedInfo);
    footer.innerHTML = `
        <div>
            <p><strong>User Agent:</strong> ${info.userAgent}</p>
            <p><strong>Platform:</strong> ${info.platform}</p>
            <p><strong>Language:</strong> ${info.language}</p>
            <p><strong>App Version:</strong> ${info.appVersion}</p>
            <p><strong>Vendor:</strong> ${info.vendor}</p>
        </div>
    `;
}

// Завантаження коментарів
var variantNumber = 7; // заміни на свій номер
var commentsUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

fetch(commentsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(comments) {
        displayComments(comments);
    })
    .catch(function(error) {
        console.error('Помилка завантаження коментарів:', error);
    });

function displayComments(comments) {
    var commentsSection = document.getElementById('comments-section');
    comments.forEach(function(comment) {
        var commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <h3>${comment.name}</h3>
            <p><strong>Email:</strong> ${comment.email}</p>
            <p>${comment.body}</p>
        `;
        commentsSection.appendChild(commentElement);
    });
}

// Показати форму через 10 секунд
setTimeout(function() {
    var modal = document.getElementById('feedback-modal');
    modal.style.display = 'block';
}, 60000);

// Закриття модального вікна
var closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function() {
    var modal = document.getElementById('feedback-modal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('feedback-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// ====== Перехід на нічний/денний режим ======

// Створення кнопки перемикання теми
var themeButton = document.createElement('button');
themeButton.id = 'theme-toggle-button';
themeButton.textContent = 'Переключити тему';
document.body.appendChild(themeButton);

// Функція встановлення теми
function setTheme(theme) {
    if (theme === 'day') {
        document.body.classList.add('day-theme');
        document.body.classList.remove('night-theme');
        themeButton.textContent = 'Нічний режим';
    } else {
        document.body.classList.add('night-theme');
        document.body.classList.remove('day-theme');
        themeButton.textContent = 'Денний режим';
    }
}

// Визначення теми за часом
function detectThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 21) {
        setTheme('day');
    } else {
        setTheme('night');
    }
}

// Обробник кліку по кнопці
themeButton.addEventListener('click', () => {
    if (document.body.classList.contains('night-theme')) {
        setTheme('day');
        localStorage.setItem('theme', 'day');
    } else {
        setTheme('night');
        localStorage.setItem('theme', 'night');
    }
});

// При завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        detectThemeByTime();
    }
});
