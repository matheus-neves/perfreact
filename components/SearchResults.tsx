import { List, ListRowRenderer } from 'react-virtualized'
import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {

  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => total + product.price, 0)
  }, [results])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          onAddToWishlist={onAddToWishlist}
          product={results[index]}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={700}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map(product => (
        <ProductItem
          onAddToWishlist={onAddToWishlist}
          key={product.id}
          product={product}
        />
      ))} */}
    </div>
  )
}

/**
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando se repassa uma informação a um componente filho)
 *    ex: <Component totalPrice={totalPrice} />
 */