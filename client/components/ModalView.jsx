import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
`;

const CurrImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const ModalView = (props) => (

  <CurrImage src={} />

);
export default ModalView;