import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const defaultStyle = {
  color: '#fff'
};

class Aggregate extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div style={defaultStyle}>
        <p>Números | Texto</p>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input type="text" />
        Filtro
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    return (
      <div
        style={{ ...defaultStyle, display: 'inline-block' }}
        className="playlist"
      >
        <h3>Nombre de la Lista</h3>
        <ul>
          <li>Canción 1</li>
          <li>Canción 2</li>
          <li>Canción 3</li>
        </ul>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <h1 style={{ fontSize: '56px' }}>Título</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
