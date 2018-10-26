import React from 'react';
import styled from 'styled-components';
import Pictures from './Pictures.jsx';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  display: flex;
  flex-direction: row;
`;


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