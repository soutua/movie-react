import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { search, selectAllMovies } from './searchSlice'
import MovieList from 'components/MovieList'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const Search = () => {
  const dispatch = useAppDispatch()
  const searchResults = useAppSelector(selectAllMovies)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(search(event.currentTarget.value))
    }
  }

  return (
    <div>
      <Container className="p-4">
        <Form.Control
          type="text"
          size="lg"
          placeholder="Search movies..."
          onKeyDown={handleKeyDown}
        />
      </Container>
      <MovieList movies={searchResults} />
    </div>
  )
}

export default Search
