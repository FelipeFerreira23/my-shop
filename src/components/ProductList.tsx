import { useState } from "react";
import { useQuery } from "react-query";

import { ProductItem } from "./ProductItem";
import { ProductType } from "../App";
import { Cart } from "./Cart";

import Modal, {
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useModal
} from './Modal';

import '../styles/products.scss';

const getProducts = async (): Promise<ProductType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();
  
export function ProductList() {
  const [cart, setCart] = useState<ProductType[]>([]);

  const { data, isLoading, error } = useQuery<ProductType[]>('products', getProducts);

  const { isShowing, toggle } = useModal();
  
  const addToCart = (clickedItem: ProductType) => {
    setCart(old => {
      const IsItemInCart = old.find(item => item.id === clickedItem.id);

      if (IsItemInCart) {
        return old.map(item => item.id === clickedItem.id ? { ...item, amount: item.amount + 1} : item);
      }

      return [...old, {...clickedItem, amount: 1}]; 
    });
  };

  const removeToCart = (id: number) => {
    setCart(old => 
      old.reduce((acc, item) => {

      if (item.id === id) {
        if (item.amount === 1) return acc;
        return [...acc, {...item, amount: item.amount - 1}];
      } else {
        return [...acc, item];
      }
    }, [] as ProductType[])
    );
  };

  if (isLoading) return <p className="message">Carregando...</p>;
  if (error) return <p className="message">Ops, deu algum erro</p>;

  return (
    <section className="product-list">
      <hr />
      <div className="header">
        <h1>Lista de produtos</h1>
        <button onClick={toggle} className="cart">Carrinho <span>{cart.length}</span></button>
      </div>
      <hr />

      <ul>
        {data?.map(product => (
          <li key={product.id}>
            <ProductItem item={product} addToCart={addToCart} />
          </li>
        ))}
      </ul>

      <div>
      <Modal {...{isShowing, toggle}}>
        <ModalHeader {...{toggle}}>
          Carrinho de compras
        </ModalHeader>
        <ModalBody>
          <Cart cartItems={cart} addToCart={addToCart} removeToCart={removeToCart} />
        </ModalBody>
        <ModalFooter>
        </ModalFooter>        
      </Modal>
    </div>
    </section>
  );
}