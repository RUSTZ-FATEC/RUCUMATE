export class carouselModel {

    id: number;
    user_id: number;
    temperature: number;
    humidity: number;

    constructor(id: number, user_id: number, temperature: number, humidity: number) {
        this.id = id;
        this.user_id = user_id;
        this.temperature = temperature;
        this.humidity = humidity;
    }
    
}