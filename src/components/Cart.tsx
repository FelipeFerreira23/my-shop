import { ProductType } from "../App";

type Props = {
  cartItems: ProductType[];
  addToCart: (clikedItem: ProductType) => void;
  removeToCart: (id: number) => void;
}

export const Cart = ({ cartItems, addToCart, removeToCart }:Props) => {
  const cartTotals = (items: ProductType[]) => 
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <div className="product-list cart">
      <ul>
        {cartItems.length === 0 ? <p>Carrinho vazio.</p> : null}
        {cartItems.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <div className="totals">
                <div className="price">Preço: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(product.price)}</div>
                <div className="subtotal">Subtotal: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(product.price * product.amount)}</div>
              </div>  
              <div className="buttons">
                <button onClick={() => removeToCart(product.id)}>-</button>
                <p>{product.amount}</p>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total do carrinho: <strong>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(cartTotals(cartItems))}</strong></div>
    </div>
  );
}