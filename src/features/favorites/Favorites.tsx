import { getFavorites, selectAllFavorites } from './favoritesSlice'
import MovieList from 'components/MovieList'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { getAuth } from 'features/auth/authSlice'

const Favorites = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getFavorites())
  }, [])

  const auth = useAppSelector(getAuth)

  if (auth) {
    const favorites = useAppSelector(selectAllFavorites)
    return <MovieList movies={favorites} />
  } else {
    return (
      <div className="p-5 d-flex justify-content-center">
        <h2>Login to add some favorites!</h2>
      </div>
    )
  }
}

export default Favorites
