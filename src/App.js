import React, {useState} from 'react';
import {  QueryClient, QueryClientProvider, useQuery } from 'react-query';
import './App.css';

const API_KEY = '42ffbe2e';
const queryClient = new QueryClient();

function MovieSearch({ movie }) {
  const queryInfo = useQuery(
    ['movie', movie],
    async () => {
      const result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&type=movie&s=${movie}`, {method: 'GET'});
      console.log(result);
      return result.json();
    },
    {
      enabled: !!movie,
    }
  )

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo?.data?.Search?.length > 0 ? (
        queryInfo.data.Search.map(movie => (<div>{movie.Title}</div>))
      ) : (
        'Movie not found.'
      )}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}


export default function App() {
  const [movie, setMovie] = useState('');
  console.log(movie);
  return(
    <QueryClientProvider client={queryClient}>
      <div className="appContainer">
        <h1>Popcorn Playlist</h1>
        <input type="text" value={movie} onChange={(e) => setMovie(e.target.value)} placeholder="Search..."/>
        <MovieSearch movie={movie} />
      </div>
    </QueryClientProvider>
  );
}