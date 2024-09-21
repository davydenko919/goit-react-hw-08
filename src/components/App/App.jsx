import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshUser } from '../../redux/auth/operations'
import HomePage from '../../pages/HomePage/HomePage'
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ContactsPage from '../../pages/ContactsPage/ContactsPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import Layout from '../../components/Layout/Layout'
import PrivateRoute from '../../components/PrivateRoute'
import RestrictedRoute from '../../components/RestrictedRoute'
import css from './App.module.css'

const App = () => {
  const dispatch = useDispatch()
  const isRefreshing = useSelector((state) => state.auth.isRefreshing)

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  if (isRefreshing) {
    return <div>Loading...</div>
  }

  return (
    <div className={css.div}>
      <Layout/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/contacts"
              element={<PrivateRoute component={<ContactsPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      
    </div>
  )
}

export default App