import React, { Component } from 'react';

const API = 'http://localhost:4000/images';
// const API = 'https://image-directory.appspot.com/images';

export class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(files => this.setState({ files: files }));
  }

  render() {
    
  return (
    <div>
      <form method="POST" action="http://localhost:4000/images"  enctype="multipart/form-data">
  <input type="file" name="photo" />
  <input type="submit" />
</form>

      {this.state.files.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`${x}`}
          alt={x}
        />
      ))}
    </div>
  );
  }

}
