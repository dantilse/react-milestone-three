import React from 'react';

import { titleCase } from './Helpers';

const UserListItem = props => (
  <li>
    <a href="#0" className="media">
      <figure className="media-left">
        <img
          className="media-object"
          src={props.picture.thumbnail}
          alt={`${props.name.first} ${props.name.last}`}
        />
      </figure>
      <div className="media-body">
        <h2>{`${titleCase(props.name.first)} ${titleCase(
          props.name.last
        )}`}</h2>
        <p>{`${titleCase(props.location.city)}, ${titleCase(
          props.location.state
        )}`}</p>
      </div>
    </a>
  </li>
);

export default UserListItem;
