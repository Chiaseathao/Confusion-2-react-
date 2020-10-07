import React, { Component } from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from "reactstrap";
import Menu from "./components/MenuComponent"
import DishDetails from "./components/DishDetailComponent";
import './App.css';
import { DISHES } from './shared/dishes'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    selectedDishCallback = (menuData) => {
        this.setState({selectedDish: menuData})
    }


    render() {
        return (
            <div>
                <Navbar dark color={"primary"}>
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} selectedDish={this.selectedDishCallback}/>
                <DishDetails selectedDish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default App;
