import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/productList';
import AddEditProduct from './components/addEditProduct';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/add-edit' element={<AddEditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
