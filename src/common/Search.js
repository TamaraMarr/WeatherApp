import React, { Component } from 'react';

import FetchDataService from "./../services/fetchDataService";
import WeatherInfo from '../components/WeatherInfo';
import City from '../entities/City';

import "./Search.css";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchCity: "",
            inputValue: "",
            showData: false,
            cities: [],
            id: 0,
            DTOCities: [],
            noSearchStringError: false,
            noResultsError: false,
            generalError: false
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
                searchCity: this.state.inputValue,
                noSearchStringError: false,
                noResultsError: false,
                generalError: false
            })

            this.fetchDataService.getWeatherData(
                this.state.inputValue, response => {
                    const singleCity = new City(response);
                    this.setState({
                        DTOCities:[singleCity, ...this.state.DTOCities]
                    });
                }, error => {
                    if(error.response.status === 400) {
                        this.setState({
                            noSearchStringError: true
                        })
                    } else if(error.response.status === 404) {
                        this.setState({
                            noResultsError: true
                        })
                    } else {
                        this.setState({
                            generalError: true
                        })
                    }
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
            <div className="row" style={{margin: 0}}>
                <input type="text" placeholder="Enter a city name and press enter" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} className="col-10 offset-1 form-control Search_inputStyle" />
                {this.state.noSearchStringError ? <p className="Search_errorStyle">Please enter a search term, e.g. Belgrade</p> : ""}
                {this.state.noResultsError ? <p className="Search_errorStyle">There are no results for the entered term</p> : ""}
                {this.state.generalError ? <p className="Search_errorStyle">There's been an error. Please reload the page</p> : ""}
                {this.state.DTOCities.map(city => {
                    return (
                        this.state.showData ? <WeatherInfo key={city.id} singleCity={city} /> : ""
                    );
                })}
            </div>
        );
    }
}
