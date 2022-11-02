import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import Shipping from './components/Shipping/Shipping';
import Shop from './components/shop/Shop';
import SignUp from './components/SignUp/SignUp';
import Main from './layout/Main';
import { ProductsAndCartLoaders } from './loaders/ProductsAndCartLoaders';
import PrivateRouter from './routes/PrivateRouter';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
          path:'/',
          loader: () => fetch('http://localhost:5000/products'),
          element: <Shop></Shop>
        },
        {
          path:'orders',
          loader: ProductsAndCartLoaders,
          element: <Orders></Orders>
        },
        {
          path:'inventory',
          element: <PrivateRouter><Inventory/></PrivateRouter>
        },
        {
          path:'shipping',
          element: <PrivateRouter><Shipping /></PrivateRouter>
        },
        {
          path:'about',
          element: <About></About>
        },
        {
          path:'login',
          element: <Login/>
        },
        {
          path:'signup',
          element: <SignUp/>
        }
      ]
    },
    {
      path:'*',
      element: <h1>Error 404!!!</h1>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
