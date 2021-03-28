import MovieItem from 'components/MovieItem'
import { Movie } from 'app/types'

interface MovieListProps {
  movies: Array<Movie>
}

const MovieList = (props: MovieListProps) => {
  const { movies } = props

  if (movies) {
    return (
      <div className="container-fluid d-flex flex-wrap justify-content-center">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}

export default MovieList
