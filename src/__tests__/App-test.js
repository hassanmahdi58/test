import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import { jsdom } from 'jsdom';

describe('App', () => {

  beforeEach( () => {
    global.window = jsdom(undefined, { url: 'about:blank' }).defaultView;
    global.document = global.window.document;    
  });

  it('renders a initial view', () => {
    const instance = renderer.create(<App />);
    const tree = instance.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
