import React from 'react';
import styled from 'styled-components';
import Pictures from './Pictures.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    }
    this.restaurant = {};
  };

  render() {

    return (

      <div>

        <Pictures />
            
      </div>

    )
  };

};

export default App;