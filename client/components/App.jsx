import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }

    this.restaurant = {};
    this.images = [];
  };

  fetchData(id, callback) {
    $.ajax({
      method: 'GET',
      url: `/${id}`,
      success: (data) => {
        callback(data);
      }
    })
  };

  parseData(array) {
    var newArray = [];
    for (var image of array) {
      newArray.push(image.image)
    };
    this.setState({
      images: newArray
    })
  }

  componentWillMount() {
    this.fetchData(1, (data) => {
      this.parseData(data);
    });
  }


  render() {
    return (

      <div>

        <h2>WE'RE CONNECTED BABY</h2>
        {this.state.images.map(image => {
          return <img src={image}/>
        })}

      </div>

    )
  };

}

export default App;