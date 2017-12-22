jest.mock('./search-results-loader.container', () => ({children}) => childrenu)

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SearchResults from './search-results';

describe('search results', () => {
  let props;

  beforeEach(() => {
    props = {
      users: []
    };
  });

  it('should show that no results were found', () => {
    const tree = renderer.create(<SearchResults {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show users if they were found', () => {
    props.users = [
      {
        id: '1',
        login: 'John Doe',
        avatar_url: 'http://example.com/fancy_kitten.png'
      },
      {
        id: '2',
        login: 'Darth Weider',
        avatar_url: 'http://example.com/death_start.png'
      },
      {
        id: '3',
        login: 'Bill Gates',
        avatar_url: 'http://example.com/windows.png'
      }
    ];
    const tree = renderer.create(<SearchResults {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('user selection', () => {
    let sut;

    beforeEach(() => {
      props.onUserSelect = jest.fn();
      props.users = [
        {
          id: '1',
          login: 'John Doe',
          avatar_url: 'http://example.com/fancy_kitten.png'
        },
        {
          id: '2',
          login: 'Darth Weider',
          avatar_url: 'http://example.com/death_start.png'
        },
        {
          id: '3',
          login: 'Bill Gates',
          avatar_url: 'http://example.com/windows.png'
        }
      ];

      sut = shallow(<SearchResults {...props} />);
    });

    it('should notify about user selection', () => {
      sut
        .find('[data-test="user"]')
        .first()
        .simulate('click');
      expect(props.onUserSelect).toHaveBeenCalledWith(props.users[0].login);
    });
  });
});
