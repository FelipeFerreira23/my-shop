import { ProductType } from "../App";

type Props = {
  item: ProductType;
  addToCart: (clickedItem: ProductType) => void;
}

export const ProductItem = ({ item, addToCart }:Props) => {
  return (
    <div>
      <img src={item.image} alt={item.title} />
      <div className="content">
        <strong>{item.title}</strong>
        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.price)}</p>
        <button onClick={() => addToCart(item)}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}