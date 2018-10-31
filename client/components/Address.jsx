import React from 'react';
import styled from 'styled-components';

const AnotherWrapper = styled.div`
  height: 300px;
  width: 300px;
  border: solid lightgray;
  display: flex;
  flex-direction: column;
  background: white;
  img {
    &.address {
      margin-top: 5px;
      align-self: center;
      width: 285px;
      height: 135px;
      object-fit: contain;
    }
  }
  svg {
    height: 18px;
    width: 18px;
  }
  h1 {
    font-size: 1em;
    align-self: center;
  }
`;

const Address = (props) => (

  <AnotherWrapper>
    <img className="address" src='https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/1.png'/>
    <svg>
      <path d="M14 7A5 5 0 0 0 4 7c0 1.97 1.15 3.658 2.806 4.472h-.17L9 16l2.363-4.528h-.17C12.85 10.658 14 8.97 14 7zM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"></path>
    </svg>
    <h1>{props.address}</h1>
  </AnotherWrapper>

);

export default Address;