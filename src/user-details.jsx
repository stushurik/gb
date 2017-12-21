import React from 'react';
import UserDetailsLoader from './user-details-loader.container'

export default ({user, repos}) => (
  <UserDetailsLoader>
    <aside>
      <header>
        <img src={user.avatar_url} alt="avatar"/>
        <h2>{user.name}</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>Repo name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {
            repos.map(repo => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </aside>
  </UserDetailsLoader>
)