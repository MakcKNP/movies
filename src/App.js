import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    // console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //    title: "	The Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

    this.performSearch("ant man")
  }

  performSearch(searchTerm) {
    console.log("Moviedb")
    const urlString = "https://api.themoviedb.org/3/movie/popular?api_key=07d0aa4108f13cda5c6eb650e74a9221&language=en-US&page=1" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        
        const results = searchResults.results
        

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.svg"/>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
