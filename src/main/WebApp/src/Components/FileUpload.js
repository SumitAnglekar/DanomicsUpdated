import React, { Component } from 'react';
//import {Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';

class FileUpload extends Component {

    constructor() {
        super();
        this.state = this.initialState;
       // this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this); 
    }
    
    state={
    		file: null,
    		setResponseData : null
    }
    
    initialState={
        column:'',
        percentile:'',
        file: null
    }

    resetForm=()=>{
        this.setState(()=>this.initialState);
    }

    submitForm=event=>{
        event.preventDefault();
       
       let file = this.state.file;
       let formData = new FormData();
       
       formData.append('files',file);
       formData.append('column', this.refs.col.value);
       formData.append('percentile', this.refs.per.value);
       
            axios.post("http://localhost:8084/upload",formData).then(res => {
            	console.log(res.data)
            	if(res.data){
            		alert("File uploaded successfully.")
            		this.setState({setResponseData: res.data})
            	}
            	else{
            		this.setState({setResponseData: "Error msg"})
            	}
            }).catch((error) => {
            	this.setState({setResponseData: "Error msg"})
            });

    }
    
    handleFile(e){
    	console.log(e.target.files[0],"############");
    	
    	let file = e.target.files[0];
    	this.setState({file: file});
    }
    
    render(){
        return(
            <div>
            	<h2>Kindly enter the following details:</h2>
            	<p>
            		<label>Column Number:<input type="text" ref="col"></input></label>
            	</p>
            	<p>
        		<label>Percentile Number:<input type="text" ref="per"></input></label>
        		</p>
        		<p>
        		<label>Upload file:<input type="file" ref="file" onChange={(e)=>this.handleFile(e)}></input></label>
        		</p>
        		<p>
        		<label>{this.state.setResponseData}</label>
        		</p>
        		<button onClick={this.submitForm}>Submit</button>
            </div>

        )
    }
}

export default FileUpload;
