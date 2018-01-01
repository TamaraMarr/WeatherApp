import React, { Component } from 'react';
import { FormGroup, FormControl, Col, Row } from 'react-bootstrap';

import FetchDataService from "./../services/fetchDataService";
import WeatherInfo from './WeatherInfo';
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
                    this.setState({DTOCities:[singleCity, ...this.state.DTOCities]});

                }, error => {
                    console.log(error);
                });
        this.setState({
            showData: true,
        });
    }

    render() {
        return (
            <Row>
                <FormGroup>
                    <Col sm={12}>
                        <FormControl type="text" placeholder="search..." value={this.state.inputValue} onChange={this.handleChange} />
                        <button onClick={this.handleClick}>Search</button>
                    </Col>
                </FormGroup>
                {this.state.DTOCities.map(city => {
                    console.log(city);
                    return (
                        this.state.showData ? <WeatherInfo key={city.id} singleCity={city} /> : ""
                    );
                })}
            </Row>
        );
    }
}

export default Search;