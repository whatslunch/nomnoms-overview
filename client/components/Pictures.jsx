import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import ModalView from './ModalView.jsx';
import Address from './Address.jsx';

const Wrapper = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  height: 480px;
  justify-content: center;
  div {
    &.container {
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    &.buttons {
      display: flex;
      height: 100%;
      flex-direction: row;
      align-self: flex-end;
    }
    &.pictures {
      display: flex;
      flex-direction: row;
      align-self: flex-end;
    }
    &.background {
      position: absolute;
      height: 420px;
      width: 100%;
      z-index: -1000;
      background: #f5f5f5;
    }
  }
  h1 {
    align-self: center;
  }
  img {
    cursor: pointer;
    filter: drop-shadow(5px -0.5px 3px #3f4247);
    align-self: flex-end;
    height: 220px;
    width: 220px;
    object-fit: cover;
    margin-bottom: 60px;
    &.focused {
      margin-bottom: 40px;
      height: 250px;
      width: 250px;
      z-index: 50;
    }
  }
  button {
    display: flex;
    font-weight: bold;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: black;
    align-self: center;
    align-items: center;
    border: 1px solid #e6e6e6;
    background: #FEFEFE;
    font-size: 14px;
    height: 30px;
    border-radius: 3px;
    svg {
      fill: black;
      height: 18px;
      width: 18px;
      padding: 5px 3px 5px 5px;
      margin-right: 10px;
      margin-bottom: 5px;
    }
    &.review {
      background: #d32323;
      color: white;
      height: 38px;
      border: solid 1px black;
      svg {
        fill: white;
      }
    }
  }
  span {
    margin-bottom: 5px;
    margin-right: 10px;
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
    };
    this.name = '';
    this.address = '';
    this.phone = '';
    this.website = '';
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    const id = window.location.pathname.slice(1);
    this.fetchData(id, (data) => {
      this.parseData(data);
    });
  }

  showModal(e) {
    const display = e.target.getAttribute('src');
    const modalId = this.state.images.indexOf(display);
    this.setState({
      show: true,
      currentModalUrl: display,
      currentModalId: modalId,
    });
  }

  hideModal() {
    this.setState({ show: false });
  }

  fetchData(id, callback) {
    axios.get(`/api/${id}`)
      .then((response) => {
        callback(response.data);
      });
  }

  parseData(data) {
    const newArray = [];
    data.images.forEach((image) => {
      newArray.push(image.image);
    });
    this.address = data.restaurant[0].address;
    this.name = data.restaurant[0].name;
    this.phone = data.restaurant[0].phone;
    this.website = data.restaurant[0].website;
    this.setState({
      images: newArray,
    });
  }

  handleNextButton() {
    let nextImageId = this.state.currentModalId + 1;
    const maxLength = this.state.images.length - 1;
    if (nextImageId > maxLength) {
      nextImageId -= 1;
    }
    this.setState({
      currentModalUrl: this.state.images[nextImageId],
      currentModalId: nextImageId
    });
  }

  handleBackButton() {
    let prevImageId = this.state.currentModalId - 1;
    if (prevImageId < 0) {
      prevImageId += 1;
    }
    this.setState({
      currentModalUrl: this.state.images[prevImageId],
      currentModalId: prevImageId
    });
  }

  handlePictureEnter(e) {
    e.target.classList.add('focused');
    // children = [Address, img, img.focused, img]
    // will need to refactor if adding more children to Wrapper
    if (e.target !== e.target.parentNode.children[1]) {
      e.target.parentNode.children[1].classList.remove('focused')
    }
  }

  handlePictureLeave(e) {
    e.target.classList.remove('focused');
    e.target.parentNode.children[1].classList.add('focused')
  }

  render() {
    return (

      <Wrapper>
        <AddressWrapper>
          <h1>{this.name}</h1>
          <div>           
            <Address address={this.address}
              phone={this.phone}
              website={this.website}
            />
          </div>
        </AddressWrapper>
        <div className="container">
        <div className="buttons">
          <button className="review">
            <svg>
              <path d="M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z" />
            </svg>
            Write a Review
          </button>
          <button>
            <svg>
            <path d="M15 15H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2zM9 4.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zM11 10h-1v1a1 1 0 0 1-2 0v-1H7a1 1 0 0 1 0-2h1V7a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2z" />
            </svg>
            <span>Add a Photo</span>
          </button>
          <button>
            <svg>
              <path d="M17.714 6.43L13 10.356v-3.03c-1 0-5.097 1.47-6.286 3.62.274-3.08 4.286-5.5 6.286-5.5V2.5l4.714 3.93zM3 4v10h11v-2.5l1-1V15H2V3h8.5l-1 1H3z" />
            </svg>
            <span>Share</span> 
          </button>
          <button>
            <svg className="save">
              <path d="M9 1H5a2 2 0 0 0-2 2v10l4-3 4 3V3a2 2 0 0 0-2-2z" />
            </svg>
            <span>Save</span>
          </button>
        </div>
        <div className="pictures">
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
        </div>
        </div>
        <div className="background" />
        <Modal open={this.state.show} onClose={this.hideModal} center>
          <ModalView
          picture={this.state.currentModalUrl}
          handleNextButton={this.handleNextButton} 
          handleBackButton={this.handleBackButton}  
          />
        </Modal>
      </Wrapper>

    )
  };

};

export default Pictures;
