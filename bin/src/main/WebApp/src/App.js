import React, { Component } from 'react';

import './App.css';
import FileUpload from "./Components/FileUpload";
import Output from "./Components/Output";

class App extends Component {
render(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <FileUpload/>
                </div>
            </div>
        </div>
    )
  }
}

export default App;
