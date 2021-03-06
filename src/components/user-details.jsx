import React from 'react';
import { UserDetailsLoader } from '../containers';
import './user-details.css';

export default ({ user, repos, issuesByRepos }) => (
  <UserDetailsLoader>
    <aside>
      <header>
        <img className="userDetails__avatar" src={user.avatar_url} alt='avatar' />
        <h2>{user.name}</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>Repo name</th>
            <th>description</th>
            <th>Number of issues</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(repo => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>
                {
                  issuesByRepos[repo.name]
                    ? issuesByRepos[repo.name].length
                    : '-'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  </UserDetailsLoader>
);
