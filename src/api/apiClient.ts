import axios from 'axios'
import { store } from 'app/store'
import { getAuth } from 'features/auth/authSlice'

axios.interceptors.request.use((config) => {
  const auth = getAuth(store.getState())

  if (auth) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

const login = async (username: string, password: string) => {
  const response = await axios.post('/api/user/login', {
    username,
    password,
  })

  return response.data
}

const register = async (username: string, password: string) => {
  const response = await axios.post('/api/user/register', {
    username,
    password,
  })

  return response.data
}

const searchMovies = async (query: string) => {
  const response = await axios.get('/api/search', {
    params: {
      q: query,
    },
  })

  return response.data
}

const getCategoryMovies = async (category: string) => {
  const response = await axios.get(`/api/category/${category}`)
  return response.data
}

const getMovie = async (id: string) => {
  const response = await axios.get(`/api/movie/${id}`)
  return response.data
}

const getFavorites = async () => {
  const response = await axios.get(`/api/favorite/all`)
  return response.data
}

const getFavorite = async (id: string) => {
  const response = await axios.get(`/api/favorite/${id}`)
  return response.data
}

const putFavorite = async (id: string) => {
  const response = await axios.put(`/api/favorite/${id}`)
  return response.data
}

const deleteFavorite = async (id: string) => {
  const response = await axios.delete(`/api/favorite/${id}`)
  return response.data
}

const getConfig = async () => {
  const response = await axios.get('/api/configuration')
  return response.data
}

export {
  login,
  register,
  searchMovies,
  getCategoryMovies,
  getMovie,
  getFavorites,
  getFavorite,
  putFavorite,
  deleteFavorite,
  getConfig,
}
