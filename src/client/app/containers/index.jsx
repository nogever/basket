import React from 'react';
import { render } from 'react-dom';
import Item from '../components/item';
import './styles.scss';

let id = 5;

const items = [
  { id: '1', name: 'Apple', count: 4, location: 'basket', done: false },
  { id: '2', name: 'Milk', count: 1, location: 'basket', done: false },
  { id: '3', name: 'Cheese', count: 4, location: 'basket', done: false },
  { id: '4', name: 'Chips', count: 1, location: 'basket', done: false },
];

class RootContainer extends React.Component {

  onBasketItemClick(id) {
    this.setState({ items: this.state.items.map(item => 
      item.id === id ? Object.assign(item, { location: 'shop' }) : item
    )});
  }

  onBasketAddClick() {
    const { name, count } = this.state.newItem;
console.log('state', this.state)
    this.setState({ items: this.state.items.concat([{
      id: '' + id++,
      name,
      count: Number(count),
      location: 'basket',
      done: false,
    }])}, () => console.log('this.state', this.state))
  }

  onShopItemClick(id) {
    this.setState({ items: this.state.items.map(item =>
      item.id === id ? Object.assign(item, { done: !item.done }) : item
    )});
  }

  onShopRemoveClick() {
    this.setState({ items: this.state.items.filter(item => !item.done) })
  }

  onInputChange(e) {
    const name = e.target.name;
    this.setState({ newItem: Object.assign(this.state.newItem, { [name]: e.target.value }) });
  }

  constructor(props) {
    super(props);
    this.state = {items: items, newItem: {}};
    this.onBasketAddClick = this.onBasketAddClick.bind(this);
    this.onBasketItemClick = this.onBasketItemClick.bind(this);
    this.onShopItemClick = this.onShopItemClick.bind(this);
    this.onShopRemoveClick = this.onShopRemoveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="baskets">
          <h2>
            Family Basket
            <div className="form">
              <label >Item name
                <input type="text" name="name" onChange={this.onInputChange} />
              </label>  
              <label htmlFor="count">Quantity
                <input type="number" name="count" onChange={this.onInputChange} />
              </label>
              <button onClick={e => this.onBasketAddClick()}>Add item</button>
            </div>
          </h2>
          <div className="items">
            {this.state.items.filter(item => item.location === 'basket').map(item => (
              <Item
                  key={item.id}
                  item={item}
                  handleClick={this.onBasketItemClick}
              />
            ))}
          </div>
        </div>
        <div className="shop">
          <h2>
            Shopping List
            <button
                type="button"
                onClick={this.onShopRemoveClick}
            >
              Remove marked
            </button>
          </h2>
          {this.state.items.filter(item => item.location !== 'basket').map(item => (
            <Item
                key={item.id}
                item={item}
                handleClick={this.onShopItemClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RootContainer;
