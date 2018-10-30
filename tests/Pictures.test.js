import React from 'react';
import Pictures from '../client/components/Pictures.jsx';
import { shallow } from 'enzyme';

describe('ModalView Component', () => {
  it('should have a modal state', () => {
    const wrapper = shallow(<Pictures />);
    const showState = wrapper.state().show;
    expect(showState).toEqual(false);
  })
})




