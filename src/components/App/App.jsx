import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import { selectAuthIsRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { Toaster } from "react-hot-toast";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className={css.div}>
      {isRefreshing ? (
        <Loader />
      ) : (
        <>
          <Layout>
            <main>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/contacts"
                    element={<PrivateRoute component={<ContactsPage />} />}
                  />
                  <Route
                    path="/login"
                    element={<RestrictedRoute component={<LoginPage />} />}
                  />
                  <Route
                    path="/register"
                    element={
                      <RestrictedRoute component={<RegistrationPage />} />
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
          </Layout>
        </>
      )}
      <Toaster />
    </div>
  );
};
export default App;
