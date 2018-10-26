import React, { Component } from "react";
import axios from "axios";
import Save from "./Save";

const style = {
  float: "right"
}


class Home extends Component {

  state = {
    topic: "",
    start: "20180101",
    end: "20181020",
    apikey: "c29a4057e55d494ca7bcbc74cdf37dbf",
    articles: [],
    savedId: ""
  }


  getArticles = () => {
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.state.apikey}&q=${this.state.topic}&begin_date=${this.state.start}&end_date=${this.state.end}`).then(res => {
      this.setState({ articles: res.data.response.docs.slice(0, 5) }, ()=> {
        console.log(this.state.articles)
      })
    });
  }

  handleInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState({ [name]: value })
  };

  handleFormSubmit = event => {

    event.preventDefault();
    this.getArticles();
  };

  clearResults = (event) => {
    event.preventDefault();
    this.setState({ articles: [] })
  }

  handleSave = (event) => {
    let save = event.target.id

    this.setState({ savedId: save }, ()=>{
      var savedArticle = this.state.articles.filter(article => {
        return article._id === this.state.savedId
      })
      var object = {
        name: savedArticle[0].headline.main,
        url: savedArticle[0].web_url
      }
      this.saveArticle(object);
    });

  }

  saveArticle = (object)=> {
    axios.post("/api/save", object).then( res =>{
      console.log(res);
      axios.get("/api/articles").then(result => {
        console.log(result.data)
      })
    }).catch(err => {
      console.log(err)
    })  
  }

  render() {
    if(this.state.articles.length > 0){
      var savedComponent = <Save saveArticle = {this.saveArticle} savedId={this.state.savedId} articles={this.state.articles} />
    }

    return (

      <div >

        <div className="jumbotron" >
          <h1 className="text-center">
            <strong>
              <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
          </h1>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-list-alt"></i> Search Parameters</strong>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label for="search">Topic</label>
                    <input
                      value={this.state.topic}
                      name="topic"
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="search-term" />
                  </div>
                  <div className="form-group">
                    <label for="start-date">Start Date:</label>
                    <input
                      value={this.state.start}
                      name="start"
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="start-date"
                      placeholder="YYYYMMDD" />
                  </div>
                  <div className="form-group">
                    <label for="end-date">End Date:</label>
                    <input
                      value={this.state.end}
                      name="end"
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="end-date"
                      placeholder="YYYYMMDD" />
                  </div>
                  <button
                    onClick={this.handleFormSubmit}
                    type="submit"
                    className="btn btn-default"
                    id="run-search">
                    <i className="fa fa-search"></i> Search</button>
                  <button className="btn btn-default" id="clear-all" onClick={this.clearResults}>
                    <i className="fa fa-trash"></i> Clear Results</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-table"></i> Results</strong>
              </div>
              <div className="card-body" id="article-results">
                <ul className="list-group">
                  {this.state.articles.map((item) => (
                    <li className="list-group-item"><a href={item.web_url} target="_blank">{item.headline.main}</a><button onClick={this.handleSave} id={item._id} className="btn btn-sm btn-primary" style={style}>Save</button> <br /> <p>{item.snippet}</p>  </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
          {savedComponent}
        

      </div>

    )
  }
}

export default Home;