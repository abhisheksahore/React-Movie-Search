import React, {useState} from 'react';
import MovieCard from './MovieCard';
function SearchForm() {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    let firstSubmit = false;
    const searchMovies = async (e) => {
        e.preventDefault();
    
        const url = `https://api.themoviedb.org/3/search/movie?api_key=36e3543b033b91c3c450ab61ab8ab34b&language=en-US&query=${query}&page=1&include_adult=true`;
        firstSubmit = true;
        console.log(firstSubmit)
        try {
            console.log(query)
            const reg = (/[a-z0-9]/ig).test(query);
            console.log('this is : '+ reg);
            if(reg)
            {const res = await fetch(url);
            const data = await res.json();
            console.log(data)
            setMovies(data.results)}
        } catch(err) {
            console.error(err);
        }
        
    }

    return (
        <div>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name
                </label>
                    <input 
                        type="text" 
                        className="input" 
                        name="query"
                        placeholder='i.e. Jurassic Park'
                        value = {query}
                        onChange={e=>setQuery(e.target.value)}
                    />
                
                <button className="button" type="submit">Search</button>
            </form>
            <div className='card-list'>
                {
                    (movies.length!==0)?
                        (movies.filter(movie=>movie.poster_path).length>0)?
                            movies.filter(movie=>movie.poster_path).map((movie) => (
                                <MovieCard movie={movie} key={movie.id}/>
                            )):
                            (query.length===0 || !firstSubmit)?
                                <p className='emptyMessage'> haha Search for movies you like</p>:
                                <h3>No movie found</h3>
                        :<p className='emptyMessage'>Search for movies you like</p>
                        
                }
            </div>
            
        </div>
    )
}
export default SearchForm;