import React, { Component } from 'react';

import FetchDataService from "./../services/fetchDataService";
import WeatherInfo from '../components/WeatherInfo';
import City from '../entities/City';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchCity: "",
            inputValue: "",
            showData: false,
            cities: [],
            id: 0,
            DTOCities: []
        };

        this.fetchDataService = new FetchDataService();

        this.bindInit();
    }

    bindInit() {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleClick = () => {
            this.setState({
                searchCity: this.state.inputValue
            })
            this.fetchDataService.get(
                this.state.inputValue, response => {
                    const singleCity = new City(response);
                    this.setState({
                        DTOCities:[singleCity, ...this.state.DTOCities]
                    });
                }, error => {
                    console.log(error);
                });
        this.setState({
            showData: true,
            inputValue: ""
        });
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="row">
                    <input type="text" placeholder="search..." value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <button onClick={this.handleClick}>Search</button>
                    {this.state.DTOCities.map(city => {
                        return (
                            this.state.showData ? <WeatherInfo key={city.id} singleCity={city} /> : ""
                        );
                    })}
            </div>
        );
    }
}

export default Search;