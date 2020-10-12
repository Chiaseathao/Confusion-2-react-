import React from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, CardSubtitle} from 'reactstrap'



function RenderCard({item}) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle style={{fontWeight: 'bold'}}>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle style={{fontWeight: 'bold'}}>{item.designation}</CardSubtitle> : null}
                <CardText>
                    {item.description}
                </CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotions}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leaders}/>
                </div>
            </div>
        </div>
    );
}

export default Home;