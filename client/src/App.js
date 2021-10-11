import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "animate.css"

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
import { getProducts } from './store/product/productReducer'

function App() {
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuth())
    dispatch(getItemCart())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <NavbarContextProvider>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={props =>
              <Master1>
                <Home {...props} />
              </Master1>
            }
          />
          <Route
            path='/register'
            render={props =>
              <Master1>
                <Auth {...props} redirect='register' />
              </Master1>}
          />
          <Route
            path='/login'
            render={props =>
              <Master1>
                <Auth {...props} redirect='login' />
              </Master1>}
          />
          <Route
            path='/product/:productId'
            render={props =>
              <Master1>
                <DetailProduct {...props} />
              </Master1>
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

        </Switch>
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
