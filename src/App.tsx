import { ProductList } from './components/ProductList';

import './styles/global.scss';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
}

function App() {
  return (
      <ProductList />
  );
}

export default App;
