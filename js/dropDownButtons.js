document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');
        const list = dropdown.querySelector('.dropdown-list');

        button.addEventListener('click', function () {
            if (list.classList.contains('show')) {
                list.classList.remove('show');
                list.style.maxHeight = '0'; // Скрываем список
                list.style.opacity = '0'; // Убираем непрозрачность
            } else {
                list.classList.add('show');
                list.style.maxHeight = list.scrollHeight + 'px'; // Устанавливаем высоту
                list.style.opacity = '1'; // Убираем непрозрачность
            }
        });

        list.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                button.textContent = event.target.textContent; // Изменяем текст кнопки
                list.classList.remove('show');
                list.style.maxHeight = '0'; // Скрываем список
                list.style.opacity = '0'; // Убираем непрозрачность
            }
        });

        // Закрытие списка по клику вне него
        window.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                list.classList.remove('show');
                list.style.maxHeight = '0'; // Скрываем список
                list.style.opacity = '0'; // Убираем непрозрачность
            }
        });
    });
});