import React from 'react';
import List from '../List';
import renderer from 'react-test-renderer';

describe('List', () => {

  const data = [
  {
    artistName    : 'x',
    collectionName: 'y',
    wrapperType   : 'u',
    collectionType: 'i',
    kind          : 'o',
  },

  {
    artistName    : 'q',
    collectionName: 'w',
    wrapperType   : 'e',
    collectionType: 'r',
    kind          : 'ty',
  },

  ];

  it('renders complex list', () => {
    const instance = renderer.create(<List data={data} toggles={{}} onToggle={ () => false } />);
    const tree = instance.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders simple list', () => {
    const instance = renderer.create(<List data={data} toggles={{0:true}} />);
    const tree = instance.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
