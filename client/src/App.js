import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKeyword: "",
      keywordSubmit: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() })
  };

  handleSubmit(e) {
    e.preventDefault();
    let keywords = `anime%20${this.state.searchKeyword}%20`;
    axios.get(`/api/routes/keyword/${keywords}`)
      .then(result => {
        console.log("RESULT FROM AXIOS", result.data)
        this.setState({ keywordSubmit: result.data.gifArray }, () => {
          console.log("KEYWORD SUBMIT", this.state.keywordSubmit)
        });
      })
      .catch((err) => { return err })
  };

  render() {

    let output = (
      this.state.keywordSubmit.map((value, index) => {
        console.log("value", value);
        return (
          <div className="single-output-wrapper" key={value}>
            <div className="image-wrapper">
              <img src={value} alt={value} />
            </div>
          </div>
        )
      })
    )

    return (
      <div className="App">
        <div className="search-component">
          <form onSubmit={this.handleSubmit}>
            <input name="searchKeyword" type="text" placeholder="Tags" value={this.state.searchKeyword} onChange={this.handleChange} autoComplete="off" />
            <input type="submit" />
          </form>
          <div className="output-wrapper">
            {this.state.keywordSubmit ?
              output
              :
              <div>Test</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
