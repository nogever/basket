import React from 'react';
import './styles.scss';

const Item = ({ item: { id, name, count, location, done }, handleClick}) => (
  <div
      className={`item ${done ? 'done' : ''}`}
      onClick={() => handleClick(id)}
  >
    <div>{name}</div>
    <div>{count}</div>
  </div>
);

export default Item;
