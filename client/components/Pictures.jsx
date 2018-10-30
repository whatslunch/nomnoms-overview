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
      currentModalId: 0,
      images: []
    }
    this.showThree = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  };


  showModal(e) {
    let display = e.target.getAttribute('src');
    let modalId = this.state.images.indexOf(display);
    this.setState({ 
      show: true,
      currentModalUrl: display,
      currentModalId: modalId,
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

  componentDidMount() {
    this.fetchData(1, (data) => {
      this.parseData(data.images);
    });
  }

  handleNextButton() {
    let nextImageId = this.state.currentModalId + 1;
    let maxLength = this.state.images.length - 1;
    if (nextImageId > maxLength) {
      nextImageId -= 1;
    };
    this.setState({
      currentModalUrl: this.state.images[nextImageId],
      currentModalId: nextImageId
    });
  }

  handleBackButton() {
    let prevImageId = this.state.currentModalId - 1;
    if (prevImageId < 0) {
      prevImageId += 1;
    };
    this.setState({
      currentModalUrl: this.state.images[prevImageId],
      currentModalId: prevImageId
    });
  }

  render() {
    return (

      <Wrapper>
          {this.state.images.slice(0, 3).map(image => {
            return <Image onClick={(e) => this.showModal(e)} src={image} />
          })}

          <Modal open={this.state.show} onClose={this.hideModal} center>
            <ModalView picture={this.state.currentModalUrl} 
            handleNextButton={this.handleNextButton} 
            handleBackButton={this.handleBackButton}  
            />
          </Modal>

      </Wrapper>

    )
  };

};

export default Pictures;

{/* <Image onClick={(e) => this.showModal(e)} src={this.state.images[0]} />
<Image onClick={(e) => this.showModal(e)} src={this.state.images[1]} />
<Image onClick={(e) => this.showModal(e)} src={this.state.images[2]} /> */}