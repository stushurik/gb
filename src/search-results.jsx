import React from 'react';
import './search-results.css';

export default ({users}) => (
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
              <tr key={user.id}>
                <td><img src={user.avatar_url}/></td>
                <td>{user.login}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
    : <span className="search-results">No results matching query were found</span>
)
