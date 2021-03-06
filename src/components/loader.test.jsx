import React from 'react';
import { shallow } from 'enzyme';
import Loader from './loader';

describe('loader', () => {
  let sut;
  let Children;

  beforeEach(() => {
    Children = () => null;
  });

  it('should show loader when is not ready', () => {
    sut = shallow(
      <Loader ready={false}>
        <Children />
      </Loader>
    );
    expect(sut.find('[data-test="loader"]').exists()).toBeTruthy();
  });

  it('should not show content when is not ready', () => {
    sut = shallow(
      <Loader ready={false}>
        <Children />
      </Loader>
    );
    expect(sut.find(Children).exists()).toBeFalsy();
  });

  it('should show content when is ready', () => {
    sut = shallow(
      <Loader ready={true}>
        <Children />
      </Loader>
    );
    expect(sut.find(Children).exists()).toBeTruthy();
  });
});
