import React, { Component } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import 'react-toastify/dist/ReactToastify.css';


const API = 'https://image-directory.appspot.com/images';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      images: [],
    }

  }

  componentDidMount() {
    this.getImages()
  }


  getImages() {
    fetch(API)
      .then(response => response.json())
      .then(files => this.setState({ images: files }));
  }

  onChangeHandler = event => {
    let file = event.target.files[0]
    this.setState({
      selectedFile: file,
      loaded: 0
    })
  }

  onClickHandler = () => {
    console.log(this.state)
    const data = new FormData()

    data.append('photo', this.state.selectedFile)
    axios.post("http://localhost:4000/images", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },
    })
      .then(res => { // then print response status
        console.log(res)
        cogoToast.success('Uploaded successfully');
        this.getImages()
      })
      .catch(err => { // then print response status
        cogoToast.error('upload fail', err)
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" onChange={this.onChangeHandler} />
            </div>

            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>
        </div>


        <div>
          {this.state.images.map(image => (
            <img
              style={{ width: 200 }}
              key={image}
              src={`${image}`}
              alt={image}
            />
          ))}
        </div>


      </div>
    );
  }
}
