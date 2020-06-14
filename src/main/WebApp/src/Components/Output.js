import React, { Component } from 'react';
import {Card, Form, Table} from 'react-bootstrap';
import axios from 'axios';

class Output extends Component {
    constructor(){
        super();
        this.state = this.initialState;
    }

    componentDidMount(){
        axios.get("/")
        .then((data)=>{
            this.setState({percentile:data});
        });
    }

    initialState={
        percentile:'75'
    }

    render(){
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><b>Percentile for given entered column</b></Card.Header>
                        <Form onReset={this.resetForm} onSubmit={this.submitForm} id="formId">
                            <Card.Body>
                            <Table>
                                <thead>
                                    {this.state.percentile}
                                </thead>
                            </Table>
                            </Card.Body>
                        </Form>
                    </Card>

        )
    }
}
export default Output;