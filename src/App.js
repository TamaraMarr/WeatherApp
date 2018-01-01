import React, { Component } from 'react';

import Header from "./common/Header";
import Search from "./common/Search";

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="container col-12">
        <Header />
        <Search />
      </div>
    );
  }
}