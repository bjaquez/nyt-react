import React, { Component } from "react";
import axios from "axios";

class Save extends Component {
  state = {
    saved: []
  }
  
  componentDidMount(){
    axios.get("/api/articles").then(result => {
      this.setState({saved: result.data})
      
    });
    
  }

    render(){
      var saved = this.state.saved.map(item => {
        
        return (<ul>
        <li>{item.name}</li>
        <li>{item.url}</li>
        </ul>
        )
      })
        return (
            <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-table"></i> Saved</strong>
              </div>
              <div className="card-body" id="saved-articles">
            
            {saved}
              </div>
            </div>
          </div>
        </div>
        )
    }
}
export default Save;