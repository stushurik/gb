import React from 'react';
import UserDetailsLoader from './user-details-loader.container'

export default ({user, repos, issuesByRepos}) => (
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
            <td>Number of issues</td>
          </tr>
        </thead>
        <tbody>
          {
            repos.map(repo => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td>{issuesByRepos[repo.name] ? issuesByRepos[repo.name].length : '-'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </aside>
  </UserDetailsLoader>
)