export default class City {
    constructor(response) {
        this.lat = response.city.coord.lat;    
        this.long= response.city.coord.lon;
        this.weatherDataArray = response.list;
        this.id = response.city.id;
    }

    getTemp() {
        let tempInTown = this.weatherDataArray.map(temp => temp.main.temp);

        return tempInTown;
    }

    getHumidity() {
        let humidityInTown = this.weatherDataArray.map(humidity => humidity.main.humidity);

        return humidityInTown;
    }
}