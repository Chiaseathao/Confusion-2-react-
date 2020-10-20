import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

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
        console.log("Current State is: " + JSON.stringify(values));

        alert("Current State is: " + JSON.stringify(values));
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

export default CommentForm;