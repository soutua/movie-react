import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { getMovie } from 'api/apiClient'
import { Movie } from 'app/types'
import { getPosterImageUrl, getBackdropImageUrl } from 'app/utils'
import { Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getAuth } from 'features/auth/authSlice'
import {
  deleteFavorite,
  getFavorite,
  putFavorite,
  selectFavoriteById,
} from 'features/favorites/favoritesSlice'

interface DetailsProps {
  movieId: string
}

const backgroundStyle = (backgroundUrl: string) => {
  return {
    width: '100%',
    height: '100%',
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundSize: 'cover',
  }
}

const Details = () => {
  const { movieId } = useParams<DetailsProps>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuth)
  const favorite = useAppSelector((state) => selectFavoriteById(state, movieId))

  useEffect(() => {
    const movieFetch = async () => {
      const movie = await getMovie(movieId)
      setMovie(movie)
    }

    movieFetch()
    dispatch(getFavorite(movieId))
  }, [])

  if (movie) {
    return (
      <div
        className="p-3"
        style={backgroundStyle(getBackdropImageUrl(movie, 1920))}
      >
        <Container className="text-light p-4 overflow-auto">
          <Image
            className="float-left mr-5 mb-3"
            src={getPosterImageUrl(movie, 350)}
          />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          {auth &&
            (favorite ? (
              <Button onClick={() => dispatch(deleteFavorite(movieId))}>
                Remove favorite
              </Button>
            ) : (
              <Button onClick={() => dispatch(putFavorite(movieId))}>
                Add favorite
              </Button>
            ))}
        </Container>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Details
