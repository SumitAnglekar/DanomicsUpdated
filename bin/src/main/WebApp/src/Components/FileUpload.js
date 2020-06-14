import React, { Component } from 'react';
import {Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';

class FileUpload extends Component {

    constructor() {
        super();
        this.state = this.initialState;
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    initialState={
        column:'',
        percentile:'',
        files: null
    }

    resetForm=()=>{
        this.setState(()=>this.initialState);
    }

    submitForm=event=>{
        event.preventDefault();
        const form = {
            files: this.state.file
        };
        alert(form);
        console.log(form);
        const col ={column: this.state.column};
        alert(col);
        const per={percentile: this.state.percentile};
        alert(col);
        const data = new FormData();
        data.append("files", form);
        data.append("col",col);
        data.append("per",per);
        console.log(data);
            axios.post("http://localhost:8084/upload", data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            alert("File uploaded successfully.")});

    }

    onFileChangeHandler=event=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render(){
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><b>Danommics Task</b></Card.Header>
                        <Form onReset={this.resetForm} onSubmit={this.submitForm} id="formId">
                            <Card.Body>
                                    <Form.Group controlId="formGridCol">
                                        <Form.Label>Column Name</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="column" name="column"
                                            value={this.state.column}
                                            onChange={this.onFileChangeHandler}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter column name" />
                                    </Form.Group>

                                    <Form.Group controlId="formGridPer">
                                        <Form.Label>Percentile</Form.Label>
                                        <Form.Control required autoComplete="off"
                                                      type="percentile" name="percentile"
                                                      value={this.state.percentile}
                                                      onChange={this.onFileChangeHandler}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Percentile Here" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>File Upload</Form.Label>
                                        <Form.File required autoComplete="off"
                                                    id="exampleFormControlFile1"
                                                      type="file" name="file"
                                                      value={this.state.file}
                                                   onChange={this.onFileChangeHandler}
                                        />
                                    </Form.Group>
                                    {/*<label>Upload Your File </label>*/}
                                    {/*<input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>*/}
                            </Card.Body>
                            <Card.Footer>
                                <Button size="sm" variant="success" type="submit">
                                    Submit
                                </Button>
                                <Button size="sm" variant="info" type="reset">
                                    Reset
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>

        )
    }
}

export default FileUpload;
