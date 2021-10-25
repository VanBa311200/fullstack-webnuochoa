import { useEffect } from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import uploadFile from './components/admin/uploadFile';
import NavbarContextProvider from './context/NavbarContext';
import DetailProduct from './Pages/DetailProduct';
import Home from './Pages/Home'
import UploadProduct from './components/admin/uploadProduct';
import Master1 from './views/Master1';
import Auth from './views/Auth';
import { useDispatch } from 'react-redux'
import { setAuth } from './store/auth/authSlice'
import { getItemCart } from './store/cart/cartSlice'
import User from './Pages/User';
import Perfume from './Pages/Perfume';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Page404 from './components/404';

function App() {
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuth())
    dispatch(getItemCart())
  }, [dispatch])

  return (
    <NavbarContextProvider>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path='/'
              render={props =>
                <Master1 {...props}>
                  <Home {...props} />
                </Master1>
              }
            />
            <Route
              exact
              path='/register'
              render={props =>
                <Master1 {...props}>
                  <Auth {...props} redirect='register' />
                </Master1>
              }
            />
            <Route
              exact
              path='/login'
              render={props =>
                <Master1 {...props}>
                  <Auth {...props} redirect='login' />
                </Master1>
              }
            />
            <ProtectedRoute exact path='/account' component={User} />
            <Route
              exact
              path='/product/:productId'
              render={props =>
                <Master1 {...props}>
                  <DetailProduct {...props} />
                </Master1>
              }
            />
            <Route
              exact
              path='/perfume'
              render={props =>
                <Master1 {...props}>
                  <Perfume {...props} />
                </Master1>
              }
            />
            <Route
              path='/page404'
              render={props =>
                <Page404 />
              }
            />
            <Route
              path='/admin/manager/banner'
              component={uploadFile}
            />
            <Route
              path='/admin/manager/product'
              component={UploadProduct}
            />
            <Route
              render={props =>
                <Page404 />
              }
            />
          </Switch>
        </ScrollToTop>
        <ToastContainer
          hideProgressBar={true}
          position='top-center'
          pauseOnHover={false}
          transition={bounce}
          autoClose={2000}
        />
      </Router>
    </NavbarContextProvider>
  );
}

export default App;
