import { BASE_API_URL} from "./../constants";
import axios from "axios";

class FetchDataService {

    getWeatherData(searchString, callback, errorHandler) {
        axios({
            method: "GET",
            url: `${BASE_API_URL}${searchString}`,
        })
            .then(response => callback(response.data))
            
            .catch(error => errorHandler(error));
        ;
    }
}
export default FetchDataService;