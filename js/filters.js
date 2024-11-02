import { cards, addCardsInDisplay } from '../main.js';

const applyButton = document.querySelector('.submit-btn');
const resetButton = document.querySelector('.reset-btn');

const sortList = document.getElementById('sort-list');

// Очистка списка карточек перед отображением новых
const clearCards = () => {
    const cardsList = document.getElementById('cards-list');
    cardsList.innerHTML = '';
}

//Функционал кнопки "Применить"
applyButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Получение значений фильтров
    const discountValue = document.querySelector('#discount-list .selected')?.dataset.value || 'Все'; // Получение выбранной скидки

    const brandValue = document.querySelector('#car-brand-list .selected')?.dataset.value || 'Все'; // Получение выбранной марки авто

    const modelValue = document.querySelector('#car-model-list .selected')?.dataset.value || 'Все'; // Получение выбранной модели авто

    const transmissionValue = document.querySelector('#transmission-list .selected')?.dataset.value || 'Все'; // Получение выбранной коробки авто

    const driveWheelsValue = document.querySelector('#drive-wheels-list .selected')?.dataset.value || 'Все'; // Получение выбранной привода авто

    const priceFrom = Number(document.getElementById('price-from').value); // Получение и преобразование к числу введенной цены от
    const priceTo = Number(document.getElementById('price-to').value); // Получение и преобразование к числу введенной цены до

    const yearFrom = Number(document.getElementById('year-from').value); // Получение и преобразование к числу введенного года от
    const yearTo = Number(document.getElementById('year-to').value); // Получение и преобразование к числу введенного года до

    const horsepowerFrom = Number(document.getElementById('horsepower-from').value); // Получение и преобразование к числу введенной мощности от
    const horsepowerTo = Number(document.getElementById('horsepower-to').value); // Получение и преобразование к числу введенной мощности до

    const mileageFrom = Number(document.getElementById('mileage-from').value); // Получение и преобразование к числу введенного пробега от
    const mileageTo = Number(document.getElementById('mileage-to').value); // Получение и преобразование к числу введенного пробега до

    // // Проверка корректности значений (можно улучшить сделав через цикл...)
    // if (priceFrom > priceTo) {
    //     alert('Значение "Цена от" не может быть больше "Цена до"');
    //     return;
    // } else if (yearFrom > yearTo) {
    //     alert('Значение "Год от" не может быть больше "Год до"');
    //     return;
    // } else if (horsepowerFrom > horsepowerTo) {
    //     alert('Значение "Мощность от" не может быть больше "Мощность до"');
    //     return;
    // } else if (mileageFrom > mileageTo) {
    //     alert('Значение "Пробег от" не может быть больше "Пробег до"');
    //     return;
    // }

    // Фильтрация карточек
    const filteredCards = filterCards(cards, {
        discountValue,
        brandValue,
        modelValue,
        driveWheelsValue,
        transmissionValue,
        priceFrom,
        priceTo,
        yearFrom,
        yearTo,
        horsepowerFrom,
        horsepowerTo,
        mileageFrom,
        mileageTo
    });

    // Сортировка
    const sortValue = document.querySelector('#sort-list .selected')?.dataset.value; // Получаем значение сортировки
    const sortedCards = sortCards(filteredCards, sortValue);

    //Очистка
    clearCards();

    // Добавление отфильтрованных и отсортированных карточек на страницу
    addCardsInDisplay(sortedCards);
});

//Функционал кнопки "Сбросить фильтр"
resetButton.addEventListener('click', () => {
    // Сброс всех полей фильтрации
    document.getElementById('price-from').value = '';
    document.getElementById('price-to').value = '';
    document.getElementById('year-from').value = '';
    document.getElementById('year-to').value = '';
    document.getElementById('horsepower-from').value = '';
    document.getElementById('horsepower-to').value = '';

    // Сброс всех выбранных значений в выпадающих списках
    document.querySelectorAll('#discount-list li, #sort-list li, #car-brand-list li, #car-model-list li, #transmission-list li, #drive-wheels-list li').forEach(item => {
        item.classList.remove('selected');
    });



    // Сброс текста везде
    const dropdownButtons = document.querySelectorAll('.dropdown-button');

    dropdownButtons.forEach((button, index) => {
        switch (index) {
            case 0:
                button.textContent = 'Выбрать скидку'; // Для скидки авто
                break;
            case 1:
                button.textContent = 'Выберите сортировку'; // Для сортировки авто
                break;
            case 2:
                button.textContent = 'Выбрать марку'; // Для марки авто
                break;
            case 3:
                button.textContent = 'Выбрать модель'; // Для модели авто
                break;
            case 4:
                button.textContent = 'Выбрать коробку'; // Для коробки
                break;
            case 5:
                button.textContent = 'Выбрать привод'; // Для привода
                break;
            default:
                break;
        }
    });

    clearCards();

    // Отображение всех карточек
    addCardsInDisplay(cards);
});

const listenersForAllLists = () => {

    document.querySelectorAll('#sort-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#sort-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Добавление обработчиков на элементы списков
    document.querySelectorAll('#discount-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#discount-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Добавление обработчиков на элементы для марок авто
    document.querySelectorAll('#car-brand-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#bcar-brand-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Добавление обработчиков на элементы для моделей авто
    document.querySelectorAll('#car-model-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#car-model-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Добавление обработчиков на элементы для коробки авто
    document.querySelectorAll('#transmission-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#transmission-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Добавление обработчиков на элементы для привода авто
    document.querySelectorAll('#drive-wheels-list li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('#drive-wheels-list li').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

listenersForAllLists();

// Функция фильтрации карточек
const filterCards = (cards, filters) => {
    return cards.filter(card => {

        //Фильтрация по наличию скидки
        const matchesDiscount = filters.discountValue === 'Все' ||
            (filters.discountValue === 'Нет' && card.isSale) ||
            (filters.discountValue === 'Да' && !card.isSale);

        const matchesBrand = filters.brandValue === 'Все' || card.brand === filters.brandValue; // Фильтрация по марке

        const matchesModel = filters.modelValue === 'Все' || card.model === filters.modelValue; // Фильтрация по модели

        const matchesTransmission = filters.transmissionValue === 'Все' || card.transmission === filters.transmissionValue; // Фильтрация по коробке

        const matchesDriveWheels = filters.driveWheelsValue === 'Все' || card.driveWheels === filters.driveWheelsValue; // Фильтрация по приводу

        // Фильтрация по цене
        const priceNumber = Number(card.priceWithoutSale.replaceAll(' ', ''));
        const matchesPrice = (!filters.priceFrom || priceNumber >= filters.priceFrom) &&
            (!filters.priceTo || priceNumber <= filters.priceTo);

        // Фильтрация по году
        const yearNumber = Number(card.year);
        const matchesYear = (!filters.yearFrom || yearNumber >= filters.yearFrom) &&
            (!filters.yearTo || yearNumber <= filters.yearTo);

        // Фильтрация по мощности
        const horsepowerNumber = Number(card.horsePower);
        const matchesHorsepower = (!filters.horsepowerFrom || horsepowerNumber >= filters.horsepowerFrom) &&
            (!filters.horsepowerTo || horsepowerNumber <= filters.horsepowerTo);

        // Фильтрация по пробегу
        const mileageNumber = Number(card.mileage.replaceAll(' ', ''));
        const matchesMileages = (!filters.mileageFrom || mileageNumber >= filters.mileageFrom) &&
            (!filters.mileageTo || mileageNumber <= filters.mileageTo);

        return matchesDiscount && matchesBrand && matchesPrice && matchesYear && matchesHorsepower && matchesModel && matchesTransmission && matchesDriveWheels && matchesMileages;
    });
};

// Функция сортировки карточек
function sortCards(cards, sortValue) {
    let sortedCards = [...cards]; // Создаем копию массива карточек
    if (sortValue === 'price-up') {
        sortedCards.sort((a, b) => Number(a.priceWithSale.replaceAll(' ', '')) - Number(b.priceWithSale.replaceAll(' ', '')));
    } else if (sortValue === 'price-down') {
        sortedCards.sort((a, b) => Number(b.priceWithSale.replaceAll(' ', '')) - Number(a.priceWithSale.replaceAll(' ', '')));
    } else if (sortValue === 'year-up') {
        sortedCards.sort((a, b) => a.year - b.year);
    } else if (sortValue === 'year-down') {
        sortedCards.sort((a, b) => b.year - a.year);
    } else if (sortValue === 'mileage-up') {
        sortedCards.sort((a, b) => Number(a.mileage.replaceAll(' ', '')) - Number(b.mileage.replaceAll(' ', '')));
    } else if (sortValue === 'mileage-down') {
        sortedCards.sort((a, b) => Number(b.mileage.replaceAll(' ', '')) - Number(a.mileage.replaceAll(' ', '')));
    } else if (sortValue === 'title-up') {
        sortedCards.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    return sortedCards;
}