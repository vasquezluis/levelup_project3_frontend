import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "../api/productsAPI.js";

function ProductsForm() {
  // * client to update data on change
  const queryClient = useQueryClient();

  // * reference to form for clear data fields
  const formRef = useRef();

  //* mutation config
  const addProductMutation = useMutation({
    //? function to use in API
    mutationFn: createItem,

    onSuccess: () => {
      console.log("Product added");
      //* invalidate data (show updated data to user)
      queryClient.invalidateQueries("products"); //? from querykey in productsList.jsx
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); //? prevent de page reload

    const formData = new FormData(e.target); // ? getting form data
    const product = Object.fromEntries(formData); // ? creatind product object from formData

    addProductMutation.mutate({
      // ? using mutation to send data to backend
      ...product,
      price: parseInt(product.price),
    });

    formRef.current.reset(); // * reset data on fields after post data
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" id="name" />

      <label htmlFor="description">Description: </label>
      <input type="text" name="description" id="description" />

      <label htmlFor="price">Price: </label>
      <input type="number" name="price" id="price" />

      <label htmlFor="brand">Brand: </label>
      <input type="text" name="brand" id="brand" />

      <button>Add product</button>
    </form>
  );
}

export default ProductsForm;
