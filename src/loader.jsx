import React from 'react';

export default ({ready, children}) => (
  ready
    ? children
    : (
      <div className="progress" data-test="loader">
        <div className="indeterminate"></div>
      </div>
    )
)