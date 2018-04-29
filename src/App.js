import React, { Component } from 'react';
import './App.css';

const defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Carlos',
    playlists: [
      {
        name: 'Mis favoritas',
        songs: [
          { name: 'Tiny Dancer', duration: 3000 },
          { name: 'We are the champions', duration: 1000 },
          { name: 'I will survive', duration: 2000 },
          { name: 'Finesse', duration: 3000 }
        ]
      },
      {
        name: 'Descubrimiento de la semana',
        songs: [
          { name: 'IDAF', duration: 1000 },
          { name: 'Your Song', duration: 3000 },
          { name: 'Shake it up', duration: 2000 },
          { name: 'Insurrección', duration: 3000 }
        ]
      },

      {
        name: 'Italianas',
        songs: [
          { name: 'Abrozantissima', duration: 3000 },
          { name: 'Volare', duration: 2000 },
          { name: 'Vivimi', duration: 3000 },
          { name: 'Stella Gemmella', duration: 1000 }
        ]
      },
      {
        name: 'Rock',
        songs: [
          { name: 'Immigrant Song', duration: 3000 },
          { name: 'Whole lotta love', duration: 4000 },
          { name: 'Under Pressure', duration: 3000 },
          { name: 'Time', duration: 1000 }
        ]
      },
      {
        name: 'Relax',
        songs: [
          { name: 'Blackbird', duration: 1000 },
          { name: 'Not even the king', duration: 3000 },
          { name: 'Here comes the sun', duration: 3000 },
          { name: 'Only time', duration: 1000 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={defaultStyle} className="aggregate">
        <p>{this.props.playlists.length} Listas</p>
      </div>
    );
  }
}
class HoursCounter extends Component {
  render() {
    /* Reduce es un método de listas que en este caso permite crear una nueva lista sólo con las canciones de la lista original (playlists) */
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);

    /* Al visualizar la nueva lista en la consola, éste sería el resultado:
    0: {name: "Tiny Dancer", duration: 3000}
    1: {name: "We are the champions", duration: 1000}
    2: {name: "I will survive", duration: 2000}
    3: {name: "Finesse", duration: 3000}
    4: {name: "IDAF", duration: 1000}
    5: {name: "Your Song", duration: 3000}
    6: {name: "Shake it up", duration: 2000}
    7: {name: "Insurrección", duration: 3000}
    8: {name: "Abrozantissima", duration: 3000}
    9: {name: "Volare", duration: 2000}
    10: {name: "Vivimi", duration: 3000}
    11: {name: "Stella Gemmella", duration: 1000}
    12: {name: "Immigrant Song", duration: 3000}
    13: {name: "Whole lotta love", duration: 4000}
    14: {name: "Under Pressure", duration: 3000}
    15: {name: "Time", duration: 1000}
    16: {name: "Blackbird", duration: 1000}
    17: {name: "Not even the king", duration: 3000}
    18: {name: "Here comes the sun", duration: 3000}
    19: {name: "Only time", duration: 1000}

    console.log(allSongs); */
    //Si quisiéramos hacer una lista con los nombres de las playlists:
    /* let playlistsNames = this.props.playlists.reduce((names, eachPlaylist) => {
      return names.concat(eachPlaylist.name);
    }, []);
    console.log(playlistsNames);
    [
      'Mis favoritas',
      'Descubrimiento de la semana',
      'Italianas',
      'Rock',
      'Relax'
    ]; */
    let totalDuration = allSongs.reduce((sum, eachPlaylist) => {
      return sum + eachPlaylist.duration;
    }, 0);
    // console.log(totalDuration);
    // 46000;

    return (
      <div style={defaultStyle} className="aggregate">
        <p>{Math.floor(totalDuration / 60)} Horas</p>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input
          type="text"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
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
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map((song, i) => (
            <li key={i}> {song.name} </li>
          ))}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000);
  }
  render() {
    let playlistsToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(this.state.filterString)
        )
      : [];
    return (
      <div style={defaultStyle}>
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ fontSize: '56px' }}>
              Lista de {this.state.serverData.user.name}
            </h1>

            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />

            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {playlistsToRender.map((playlist, i) => (
              <Playlist key={i} playlist={playlist} />
            ))}
          </div>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
    );
  }
}

export default App;
