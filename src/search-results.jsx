import React from 'react';
import './search-results.css';

export default ({users, onUserSelect}) => (
  users.length
    ? (
      <table className="search-results">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id} data-test="user" onClick={() => onUserSelect(user.login)}>
                <td><img src={user.avatar_url} alt="avatar"/></td>
                <td>{user.login}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
    : <span className="search-results">No results matching query were found</span>
)
