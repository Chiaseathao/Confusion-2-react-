import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader, ModalBody, Row, Label, Col
} from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";


const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({isModalOpen:!this.state.isModalOpen});
    }

    render() {

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-sm"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}><strong>Rating</strong></Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                                    className="form-control"
                                                    name="rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="yourName" md={12}><strong>Your Name</strong></Label>
                                <Col md={12}>
                                    <Control.text model=".author"
                                                  id="author"
                                                  name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}><strong>Comment</strong></Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment"
                                                      id="comment"
                                                      name="comment"
                                                      className="form-control"
                                                      rows="6"
                                    />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderDish ({dish}) {

    return (
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle style={{fontWeight: "bold"}}>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments ({comments, addComment, dishId}) {

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
        <div>
            <div key={comments.id}>
                {comment}
            </div>
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    )
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
        );
    }

    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 ml-1 mb-2">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-4 ml-2">
                        <h4 style={{fontWeight: "bold"}}>Comments</h4>
                        <RenderComments
                            comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
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