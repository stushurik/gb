import React from 'react';

export default ({ users, onUserSelect }) =>
  users.length ? (
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr
            key={user.id}
            data-test='user'
            onClick={() => onUserSelect(user.login)}
          >
            <td>
              <img src={user.avatar_url} alt='avatar' />
            </td>
            <td>{user.login}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <span>No results matching query were found</span>
  );
