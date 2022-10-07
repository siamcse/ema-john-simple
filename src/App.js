import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import Orders from './components/Orders/Orders';
import Shop from './components/shop/Shop';
import Main from './layout/Main';
import { ProductsAndCartLoaders } from './loaders/ProductsAndCartLoaders';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
          path:'/',
          loader: ()=> fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path:'orders',
          loader: ProductsAndCartLoaders,
          element: <Orders></Orders>
        },
        {
          path:'inventory',
          element: <Inventory></Inventory>
        },
        {
          path:'about',
          element: <About></About>
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
