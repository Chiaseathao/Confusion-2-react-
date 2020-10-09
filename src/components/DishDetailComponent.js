import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish ({dish}) {

    return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle style={{fontWeight: "bold"}}>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    );
}

function RenderComments ({comments}) {

    let options = {year: 'numeric', month: 'short', day: 'numeric'};

    const comment = comments.map((comment) => {
        return (
            <div>
                <p>
                    {comment.comment}
                    <br/>-- {comment.author} , <span>{new Date(comment.date).toLocaleDateString("en-us", options)}</span>
                </p>
            </div>
        );
    })

    return (
        <div key={comments.id}>
            {comment}
        </div>
    )
}

const DishDetail = (props) => {

    if (props.dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 ml-1 mb-2">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-4 ml-2">
                        <h4 style={{fontWeight: "bold"}}>Comments</h4>
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
        )
    }

    else
        return (
            <div></div>
        )
}

export default DishDetail;
