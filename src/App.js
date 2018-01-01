import React, { Component } from 'react';
import './App.css';
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Grid } from "react-bootstrap";
import Search from "./common/Search";

class App extends Component {
  render() {
    return (
      <Grid>
        <Header />
        <Search />
        <Footer />
      </Grid>
    );
  }
}

export default App;
