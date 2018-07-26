import React, { Component } from 'react';
import Header from './components/Header';
import UserListItem from './components/UserListItem';
import axios from 'axios';
import './App.css';

// defaultChecked worked for checkbox inputs

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  state = {
    users: [],
    searchTerm: '',
    activeGender: ['female', 'male'],
    male: true,
    female: true
  };

  componentDidMount() {
    axios
      .get(`https://randomuser.me/api/?results=24&nat=us`)
      .then(res => {
        console.log(res.data.results);
        this.setState({ users: res.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSearchTerm(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleCheckboxChange(e) {
    const target = e.target;
    const value = target.checked ? true : false;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className="container">
          <div className="row" style={{ paddingTop: 40, paddingBottom: 40 }}>
            <div className="col-sm-6">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  id="searchTerm"
                  placeholder="Search for a user"
                  value={this.state.searchTerm}
                  onChange={this.handleSearchTerm}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <ul
                className="list-inline"
                style={{ marginBottom: 0, marginTop: 7 }}
              >
                <li className="checkbox" style={{ margin: 0 }}>
                  <label>
                    <input
                      type="checkbox"
                      name="male"
                      defaultChecked
                      onChange={this.handleCheckboxChange}
                    />{' '}
                    Men
                  </label>
                </li>
                <li className="checkbox" style={{ margin: 0 }}>
                  <label>
                    <input
                      type="checkbox"
                      name="female"
                      defaultChecked
                      onChange={this.handleCheckboxChange}
                    />{' '}
                    Women
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <ul className="list-unstyled user-list">
            {this.state.users
              .filter(
                user =>
                  `${user.name.first} ${user.name.last}`
                    .toLowerCase()
                    .indexOf(this.state.searchTerm.toLowerCase()) >= 0 &&
                  this.state[user.gender]
              )
              .map(user => <UserListItem key={user.id.value} {...user} />)}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
