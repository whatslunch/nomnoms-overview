import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import axios  from 'axios';
import ModalView from './ModalView.jsx';

const Image = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  display: flex;
  flex-direction: row;
`;

class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentModalUrl: '',
      showThree: [],
      images: []
    }
    this.showThree = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  };


  showModal(e) {
    let display =e.target.getAttribute('src');
    this.setState({ 
      show: true,
      currentModalUrl: display,
    });
  };

  hideModal() {
    this.setState({ show: false });
  };

  fetchData(id, callback) {
    axios.get(`/${id}`)
      .then((response) => {
        callback(response.data);
      });
  };

  parseData(array) {
    var newArray = [];
    for (var image of array) {
      newArray.push(image.image)
    };
    this.setState({
      images: newArray
    })
  };

  componentWillMount() {
    this.fetchData(1, (data) => {
      this.parseData(data.images);
    });
  }

  render() {
    return (

      <Wrapper>

          <Image onClick={(e) => this.showModal(e)} src={this.state.images[0]} />
          <Image onClick={(e) => this.showModal(e)} src={this.state.images[1]} />
          <Image onClick={(e) => this.showModal(e)} src={this.state.images[2]} />

          <Modal open={this.state.show} onClose={this.hideModal} center>
            <ModalView picture={this.state.currentModalUrl} />
          </Modal>

      </Wrapper>

    )
  };

};

export default Pictures;