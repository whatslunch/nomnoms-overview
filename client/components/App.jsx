import React from 'react';


var faker = require('faker');


var randomtest = faker.date.recent(); // Rowan Nikolaus

console.log(randomtest);


class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (

      <div>

        <h2>WE'RE CONNECTED BABY</h2>

      </div>

    )
  }

}

export default App;