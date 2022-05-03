export const sumOfNumbers = (items: Array<{ price: number }>): number => {
  return items.reduce((val, product) => val + product.price, 0)
}