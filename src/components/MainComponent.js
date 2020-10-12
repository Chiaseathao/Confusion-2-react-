import React, { Component } from 'react';
import Home from "./HomeComponent";
import Menu from "./MenuComponent"
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetails from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { DISHES } from '../shared/dishes'
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotion";
import { LEADERS } from "../shared/leaders";
import { Switch, Route, Redirect } from "react-router-dom";
import DishDetail from "./DishDetailComponent";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }

    onSelectedDish = (dishId) => {
        this.setState({selectedDish: dishId})
    }


    render() {

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />
            );
        }

        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    leaders={this.state.leaders.filter((leader) => leader.featured)[0]}
                    promotions={this.state.promotions.filter((promo) => promo.featured)[0]}
                />
            )

        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/aboutus" component={() => <About leaders={this.state.leaders}/>}/>
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home"/>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
