import { getAllProducts } from "@/data/products";
import Link from "next/link";

const ProductList = () => {
  const products = getAllProducts();
  return (
    <div className="flex flex-col justify-center items-center p-8">
    <h1 className="text-3xl pb-4">Products</h1>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <div className="text-2xl underline hover:text-green-400">
            <p>
              {product.image} - {product.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
