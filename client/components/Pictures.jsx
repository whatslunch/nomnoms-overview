import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import axios  from 'axios';
import ModalView from './ModalView.jsx';
import Address from './Address.jsx';

const Wrapper = styled.div`
  background: #efefef;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 420px;
  h1 {
    align-self: center;
  }
  img {
    align-self: flex-end;
    height: 220px;
    width: 220px;
    object-fit: cover;
    &.focused {
      height: 250px;
      width: 250px;
      z-index: 50;
    }
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentModalUrl: '',
      currentModalId: 0,
      images: [],
    }
    this.name;
    this.address;
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
    axios.get(`/api/${id}`)
      .then((response) => {
        callback(response.data);
      });
  };

  parseData(data) {
    var newArray = [];
    for (var image of data.images) {
      newArray.push(image.image)
    };
    this.address = data.restaurant[0].address;
    this.name = data.restaurant[0].name;
    this.setState({
      images: newArray
    })
  };

  componentDidMount() {
    let id = window.location.pathname.slice(1);
    this.fetchData(id, (data) => {
      this.parseData(data);
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

  handlePictureEnter(e) {
    e.target.classList.add('focused');
    // children = [Address, img, img.focused, img]
    // will need to refactor if adding more children to Wrapper
    if (e.target !== e.target.parentNode.children[2]) {
      e.target.parentNode.children[2].classList.remove('focused')
    }
  }

  handlePictureLeave(e) {
    e.target.classList.remove('focused');
    e.target.parentNode.children[2].classList.add('focused')
  }

  render() {
    return (

      <Wrapper>
          <AddressWrapper>
            <h1>{this.name}</h1>
            <div>           
              <Address address={this.address}/>
            </div>
          </AddressWrapper>
          {this.state.images.slice(0, 3).map((image, i) => {
            if (i === 1) {
              return <img className='focused' onClick={(e) => this.showModal(e)} src={image} 
              onMouseOver={(e) => this.handlePictureEnter(e)}
              onMouseLeave={(e) => this.handlePictureLeave(e)}
            />
            } else {
              return <img onClick={(e) => this.showModal(e)} src={image} 
                onMouseOver={(e) => this.handlePictureEnter(e)}
                onMouseLeave={(e) => this.handlePictureLeave(e)}
              />
            }
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
