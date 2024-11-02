import CardCar from "./js/classCar.js";

//Генерация рандомного числа от и до(оба края вкл)
const generateRandomNum = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min)).toString();
};

//Преобразование цены к красивому виду с ноликами
const transformStrPrice = (str) => {
    if (str.length === 7) return `${str[0]} ${str.slice(1, 4)} 000`;
    return `${str.slice(0, 3)} 000`;
}

//Генерация рандомной карточки
const generateRandomCard = (fullNameCar, images, transmissions, drivesWheels) => {

    //Выборка бренда и модели по бренду
    const brandIndex = generateRandomNum(0, Object.keys(fullNameCar).length - 1);
    const selectedBrand = Object.keys(fullNameCar)[brandIndex];
    const selectedModel = fullNameCar[selectedBrand];

    const mileageValue = generateRandomNum(0, 500000).toString();

    let priceWithoutSaleValue = generateRandomNum(500000, 5000000).toString();

    let priceWithSaleValue = Math.round(Number(priceWithoutSaleValue) * 0.9).toString();

    /* Возвращаем собранный объект со ВСЕМИ полями, даже с ценой со скидкой и без, 
    также есть ли вообще скидка(в будущем будем выбирать какую цену отображать или сразу две), 
    а также проверяем является ли ключ(марка) - массивом, если да, то генерируем и забираем случайную марку, если нет - возвращаем единственную марку. */
    return new CardCar(
        selectedBrand,
        !Array.isArray(selectedModel) ? selectedModel : selectedModel[generateRandomNum(0, selectedModel.length - 1)],
        generateRandomNum(2000, 2024),
        mileageValue.length < 4 ? mileageValue : `${mileageValue.slice(0, -3)} 000`,
        images[generateRandomNum(0, images.length - 1)],
        transmissions[generateRandomNum(0, transmissions.length - 1)],
        drivesWheels[generateRandomNum(0, drivesWheels.length - 1)],
        generateRandomNum(50, 250),
        transformStrPrice(priceWithoutSaleValue),
        transformStrPrice(priceWithSaleValue),
        Math.random() < 0.5
    );
};

//Массив марок и моделей
const fullNameCar = {
    Changan: 'CS35',
    Ford: ['Kuga', 'Fiesta'],
    Opel: 'Astra',
    Citroen: 'C5',
    Lada: 'Vesta',
    Kia: 'Cerato',
    Chery: 'Tiggo 7',
    Exeed: 'RX'
};

//Массив ссылок на фотки
const images = [
    './assets/image_1.jpg', './assets/image_2.jpg',
    './assets/image_3.jpg', './assets/image_4.jpg',
    './assets/image_5.jpg', './assets/image_6.jpg'
];

//Массив видов трансмиссий
const transmissions = ['МКПП', 'АКПП'];

//Массив видов приводов
const drivesWheels = ['Передний', 'Полный', 'Задний'];

//Массив карточек товаров
export let cards = [];

//Добавление карточки на экран и DOM дерево
export const addCardsInDisplay = (cards) => {
    const cardsList = document.getElementById('cards-list');
    cards.forEach(el => {
        const cardElement = document.createElement('li');
        cardElement.className = 'card';
        cardElement.innerHTML = `
        <div class = "card-content">
        <h2 class = "full-name">${el.brand} ${el.model}</h2>
        <p class = "year-and-mileage">${el.year} | ${el.mileage} км</p>
        <img src = "${el.img}" class = "avatar">
        <div class = "features">

            <div class = "feature">
                <img src = "./assets/transmission.svg" class = "feature-img">
                <p>${el.transmission}</p>
            </div>

            <div class = "feature">
                <img src = "./assets/driveWheels.svg" class = "feature-img">
                <p>${el.driveWheels}</p>
            </div>

            <div class = "feature">
                <img src = "./assets/horsePower.svg" class = "feature-img">
                <p>${el.horsePower} л.с.</p>
            </div>

        </div>

        <div class = "more-info"> 
            
            <div class = "prices">
                <p class = "price-with-sale">${el.priceWithSale} Р</p>
                <p class = "price-without-sale">${el.priceWithoutSale} Р</p>
            </div>
            <button class = "read-more-btn">ПОДРОБНЕЕ</button>

        </div>

        </div>`;

        cardsList.appendChild(cardElement);

        //Красивое(плавное) появление карточек
        setTimeout(() => {
            cardElement.classList.add('visible');
        }, 0);

        //Если скидка есть, то меняем местами цены
        if (el.isSale) {
            let currPriceWithSale = cardElement.querySelector('.price-with-sale')
            let currPriceWithoutSale = cardElement.querySelector('.price-without-sale')
            currPriceWithSale.style.display = 'none';
            currPriceWithoutSale.style.color = 'rgb(202, 137, 32)';
            currPriceWithoutSale.style.fontSize = '20px';
            currPriceWithoutSale.style.fontWeight = 'bold';
            currPriceWithoutSale.style.textDecoration = 'none';
        }
    });
}

//Генерация и отображение карточек товаров
const generateAndDisplayCards = (maxCount) => {
    for (let i = 0; i < maxCount; i++) {
        const card = generateRandomCard(fullNameCar, images, transmissions, drivesWheels);
        cards.push(card);
        console.log(card);
    }
    addCardsInDisplay(cards);
};

generateAndDisplayCards(generateRandomNum(3, 9));



