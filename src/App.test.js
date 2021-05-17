import React from 'react';
// import { expect } from 'chai';
import { shallow,configure } from 'enzyme';
// import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({adapter: new Adapter()});

describe('<App component />', () => {
  it('renders learn react link', () => {
       const wrapper = shallow(<App />);
       
  });
});
