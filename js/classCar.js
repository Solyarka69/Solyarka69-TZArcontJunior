export default class CardCar {
    constructor(brand, model, year, mileage, img, transmission, driveWheels, horsePower, priceWithoutSale, priceWithSale, isSale) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.img = img;
        this.transmission = transmission;
        this.driveWheels = driveWheels;
        this.horsePower = horsePower;
        this.priceWithoutSale = priceWithoutSale;
        this.priceWithSale = priceWithSale;
        this.isSale = isSale;
    }
}
