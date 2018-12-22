import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slugNameInput: "",
      categoryNameInput: "",
      outputVal: [],
      searchValName: [],
      searchValImage: [],
      outputObject: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase()});
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.slugNameInput) {
      this.setState({
        outputVal: document.getElementById('slug-form').value
      }, () => {
        axios.get(`/api/routes/slug/${this.state.outputVal.toLowerCase()}`).then(result => {
          let image = result.data.animeName.posterImage.original;
          let name = "";

          if (result.data.animeName.titles.en) {
              name = result.data.animeName.titles.en
            } else if (result.data.animeName.titles.en_us) {
              name = result.data.animeName.titles.en_us
            } else {
              name = result.data.animeName.titles.en_jp
          }

          let object = {
            name: name,
            image: image
          }

          // Resetting State from other searches
          this.setState({slugNameInput: ""});

          // Pushing Values to State
          this.setState({searchValName: [name]});
          this.setState({searchValImage: [image]});
          this.setState({outputObject: [object]}, ()=> {
            console.log("Name Search Output", this.state.outputObject
              )})
        }).catch(err => {
          console.log(err);
        })
      });
    };

    if (this.state.categoryNameInput) {
      this.setState({
        outputVal: document.getElementById('category-form').value
      }, () => {
        // Initialize Image Array outside of the axios call

        // Making axios call with user input conditional variable
        axios.get(`/api/routes/categories/${this.state.outputVal.toLowerCase()}`).then(result => {
        let nameArray = [];
        let imgArray = [];

        // Mapping through result.data.categoryResult (categoryResult is the name of the object I gave the return object during the backend Axios call) using Object.Entries
        result.data.rawData.data.map((value, index) => {

          let name = "";

          if (value.attributes.titles.en) {
            name = value.attributes.titles.en
          } else if (value.attributes.titles.en_us) {
            name = value.attributes.titles.en_us
          } else {
            name = value.attributes.titles.en_jp
        }

        return nameArray.push(name);
        });

        result.data.categoryResult.animePosters.map((value, index) => {
          return imgArray.push(value);
        });

        // Resetting State from other searches
        this.setState({categoryNameInput: ""});

        // Pushing Values to State
        this.setState({searchValName: nameArray});
        this.setState({searchValImage: imgArray});

        let arrOfObjects = [];

        nameArray.map((value, index, array) => {
          let newObject = {};
          newObject.name = value;
          newObject.img = imgArray[index];
          arrOfObjects.push(newObject)
          return newObject
        });
        return this.setState({outputObject: arrOfObjects}, ()=> {
          console.log("Category Search Output", this.state.outputObject)
        });

        }).catch(err => {
          console.log(err);
        })
      });
    };
  };

  render() {

    let output = (
      this.state.outputObject.map((value, index) => {
        return (
          <div className="anime-wrapper" key={value.name}>
            <div className="anime-name" >
              <p>{value.name}</p>
            </div>
            <div className="anime-poster-wrapper">
            {/* Replace PLACEHOLDER src with "value.img" */}
              <img className="anime-poster" src={`https://sspride.org/wp-content/uploads/2017/03/image-placeholder-500x500.jpg`} alt={value.name}/>
            </div>
          </div>
        )
      })
    );

    
    return (
      <div className="App">
        <header className="App-header">
          <p>
            ENTER SEARCH
          </p>
          <form onSubmit={this.handleSubmit}>
            <input id="slug-form" name="slugNameInput" placeholder="Slug" value={this.state.slugNameInput} type="text" onChange={this.handleChange} autoComplete="off"></input>
            <input type="submit"></input>
          </form>
          <form onSubmit={this.handleSubmit}>
            <input id="category-form" name="categoryNameInput" placeholder="Category" value={this.state.categoryNameInput} type="text" onChange={this.handleChange} autoComplete="off"></input>
            <input type="submit"></input>
          </form>
        </header>
        <div className="anime-output-container">
          {output}
        </div>
     
      </div>
    );
  }
}

export default App;
