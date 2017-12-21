import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Search from './search';

describe('search', () => {
  let sut;
  let props;

  beforeEach(() => {
    props = {
      query: 'Some query',
      onQuerySubmit: jest.fn()
    };
  });

  it('should render input with label', () => {
    const tree = renderer.create(<Search {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should submit changes', () => {
    sut = shallow(<Search {...props} />);

    const value = String(Math.random());

    sut.find('input').simulate('change', { target: { value } });

    expect(props.onQuerySubmit).toHaveBeenCalledWith(value);
  });
});
