let currentLanguage = 'pt-br';
let modal;

document.addEventListener("DOMContentLoaded", (event) => {
    searchSubs();

    if (localStorage.getItem('language')) {
        currentLanguage = localStorage.getItem('language');
        loadLanguage(currentLanguage);
    }
});

function changeTheme() {
    let icon_theme = document.getElementById('toggle-button');

    let body = document.querySelector('body');
    let theme = body.getAttribute('data-theme');
    if (theme === 'light') {
        body.setAttribute('data-theme', '');
        icon_theme.src = "assets/sun.png"
    } else {
        body.setAttribute('data-theme', 'light');
        icon_theme.src = "assets/moon.png"
    }
}

function showModal(elementId) {
    modal = document.getElementById(elementId);

    modal.classList.remove('hidden');
    modal.addEventListener('click', e => {
        if (e.target == modal) {
            closeModal(elementId);
        }
    });
}

function closeModal() {
    modal.classList.add('hidden');
}

async function searchSubs() {
    fetch("json/subs.json").then(res => res.json()).then(res => {
        const subDiv = document.getElementById('subs-list');
        
        res.forEach(e => {
            let p = document.createElement("p");
            p.textContent = `Nome: ${e.nome}`;
            subDiv.appendChild(p);
        });
    })
}

function changeLanguage() {
    currentLanguage = currentLanguage === 'pt-br' ? 'en' : 'pt-br';
    loadLanguage(currentLanguage);

    localStorage.setItem('language', currentLanguage);
}

function loadLanguage(language) {
    fetch(`../json/language/${language}.json`).then(res => res.json()).then(res => {
        translatePage(res);
    });
}

function translatePage(language) {
    document.querySelectorAll('[data-i18n]').forEach(e => {
        let item = e.getAttribute('data-i18n');
        
        e.textContent = language[item];
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(e => {
        let item = e.getAttribute('data-i18n-alt');

        e.setAttribute('alt', language.images[item]);
    });
}