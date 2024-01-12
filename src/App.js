// the modules 
import { useState , useEffect } from 'react';

//the style 
import MovieCard from './MovieCard';
import './App.css' ;
import SearchIcon from './search.svg';

const App = () => {
    const [movies , setMovies] = useState([]) ;
    const [searchTerm , setSearchTerm] = useState('') ;
    const API_URL = 'http://www.omdbapi.com?apikey=3e54faf9'
    const searchMovies = async (title) => {
        const respons = await fetch(`${API_URL}&s=${title}`)
        const data = await respons.json()
        setMovies(data.Search) ;
    }
    useEffect (()=>{
        searchMovies('Batman') ;
    },[])

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={ (e) => { setSearchTerm(e.target.value) } }
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={ () => {searchMovies(searchTerm)} }
                />
            </div>
            {
                movies?.length > 0 
                ? (
                    <div className='container'>
                        { movies.map((movie) => (<MovieCard movie={movie} />) )}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App ;