import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        console.log('DishDetail Component constructor invoked')
    }

    componentDidMount() {
        console.log('Dishdetail Component componentDidMount invoked')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Dishdetail Component componentDidUpdate invoked')
    }

    renderDetail(dish) {
        if (dish != null) {

            let options = {year: 'numeric', month: 'short', day:'numeric'};

            const comments = dish.comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <p>
                            {comment.comment}
                            <br/>-- {comment.author} , <span>{new Date(comment.date).toLocaleDateString("en-us", options)}</span>
                        </p>
                    </div>
                );
            });

            return (
                <div className="row">
                    <div className="col-12 col-md-5 ml-1 mb-2">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle style={{fontWeight: "bold"}}>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4 ml-2">
                        <h4 style={{fontWeight: "bold"}}>Comments</h4>
                        {comments}
                    </div>
                </div>
            );
        }

        else {
            return (
                <div></div>
            );
        }
    };

    render() {

        console.log('Dishdetail Component componentDidRender invoked')

        return (
        <div className="container">
            {this.renderDetail(this.props.dish)}
        </div>
        )
    }
}


export default DishDetails;