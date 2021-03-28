import Image from 'react-bootstrap/Image'
import { getPosterImageUrl } from 'app/utils'
import { Movie } from 'app/types'
import { useHistory } from 'react-router'

interface MovieProps {
  movie: Movie
}

const MovieItem = (props: MovieProps) => {
  const { movie } = props
  const history = useHistory()
  const handleClick = () => history.push(`/movie/${movie.id}`)

  return (
    <div className="movie-item m-3" onClick={handleClick} role="button">
      <Image className="img-fluid" src={getPosterImageUrl(movie, 350)} />
      <p className="text-truncate">{movie.title}</p>
    </div>
  )
}

export default MovieItem
