import React, { Component } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from 'react-grid-gallery';
import BeatLoader from 'react-spinners/BeatLoader';


const API = 'https://image-directory.appspot.com/images';
// const API = 'http://localhost:4000/images';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loading: false,
      images: [],
    }

  }

  componentDidMount() {
    this.setState({});
    this.getImages()
  }


  getImages() {
    this.setState({ loading: true})
    axios.get(API)
      .then(response => this.setState({ images: response.data, loading: false }));
  }

  onChangeHandler = event => {
    let file = event.target.files[0]
    this.setState({
      selectedFile: file,
      loaded: 0
    })
  }

  onClickHandler = () => {
    if (!this.state.selectedFile) {
      return
    }
    console.log(this.state)
    const data = new FormData()

    data.append('photo', this.state.selectedFile)
    axios.post(API, data)
      .then(res => {
        console.log(res)
        cogoToast.success('Uploaded successfully');
        this.getImages()
      })
      .catch(err => {
        cogoToast.error('upload fail', err)
      })
  }

  render() {
    return (
      <div className="container">
        <center>

          <BeatLoader
            size={18}
            color={'rgb(54, 215, 183)'}
            loading={this.state.loading}
          />
          
          <div>
            <input type="file" onChange={this.onChangeHandler} />
            { !this.state.loading && 
            <button type="button" onClick={this.onClickHandler}>Upload</button>
            
        }
          </div>

        </center>

        <br />
        <Gallery images={this.state.images} />


      </div>
    );
  }
}
