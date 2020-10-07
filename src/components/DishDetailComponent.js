import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    renderDetail(details) {
        if (details != null) {

            let options = {year: 'numeric', month: 'short', day:'numeric'};

            const comments = details.comments.map((detail) => {
                return (
                    <div key={detail.id}>
                        <p>
                            {detail.comment}
                            <br/>-- {detail.author} , <span>{new Date(detail.date).toLocaleDateString("en-us", options)}</span>
                        </p>
                    </div>
                );
            });

            return (
                <div className="row">
                    <div className="col-12 col-md-5 ml-1">
                        <Card>
                            <CardImg width="100%" src={details.image} alt={details.name}/>
                            <CardBody>
                                <CardTitle style={{fontWeight: "bold"}}>{details.name}</CardTitle>
                                <CardText>{details.description}</CardText>
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

        return (
        <div className="container">
            {this.renderDetail(this.props.selectedDish)}
        </div>
        )
    }
}


export default DishDetails;