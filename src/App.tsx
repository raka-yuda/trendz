import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Login from './pages/Authentication/Login';
import Dashboard from './pages/Dashboard';
import Loader from './common/Loader';
import routes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { clearMessage } from './actions/message';
import { logout } from './actions/auth';

import EventBus from "./common/EventBus";


const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// Create a title configuration object
const titleConfig = {
  '/': 'Dashboard',
  '/auth/signin': 'Sign In',
  '/auth/signup': 'Sign Up',
  '/auth/login': 'Login',
  // Add other routes as needed
};

// Create a PageTitle component
interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  const baseTitle = 'Trendz';
  
  return (
    <Helmet>
      <title>{title ? `${title} | ${baseTitle}` : baseTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();

  // const [port, setPort] = useState('')
  // useEffect(() => {
  //   const PORT = (import.meta as any).env.VITE_PORT
  //   // console.log((import.meta as any))
  //   console.log(PORT)
  //   setPort(PORT)
  // })

  useEffect(() => {
    if (["/auth/signin", "/auth/signup", "/auth/login"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout() as any);
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout", () => {});
    };
  }, [currentUser, logOut]);

  return loading ? (
    <Loader />
  ) : (
    <HelmetProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={
          <>
            <PageTitle title={"Register"} />
            <SignUp />
          </>
          } 
        />
        <Route path="/auth/login" element={
          <>
            <PageTitle title={"Login"} />
            <Login />
          </>
          } 
        />
        <Route element={<DefaultLayout />}>
        <Route index element={
          <>
            <PageTitle title={"Dashboard"} />
            <Dashboard />
          </>
          } 
        />
        {routes.map((routes, index) => {
          const { path, component: Component, title} = routes;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense key={index} fallback={<Loader />}>
                  <>
                    <PageTitle title={title} />
                    <Component />
                  </>
                </Suspense>
              }
            />
          );
        })}
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
