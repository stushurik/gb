import React from 'react';

export default ({ready, children}) => (
  ready
    ? children
    : (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    )
)