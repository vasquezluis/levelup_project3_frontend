import { useQuery, useMutation, useQueryClient } from "react-query";
import { getItems } from "../api/productsAPI.js";

function ProductsList() {
  //* get al variables of react-query
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    //* data from react-query

    queryKey: ["products"], ///* name of query

    queryFn: getItems, //* execute function

    // select: (products) => products.sort((a,b) => ) //* can use for sort items (optional)
  });

  const queryClient = useQueryClient(); //* method for reload items

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return products.map((product) => (
    <div key={product._id}>
      <h1>{product.name}</h1>
    </div>
  ));
}

export default ProductsList;
