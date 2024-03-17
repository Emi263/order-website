import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts, updateProduct } from "../../api";
import { Spin } from "antd";

function ProductsFromApi() {
  //useQuery, fetch data -> GET data

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  // useMutation -> POST, PUT, DELETE
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
      alert("Something went wrong");
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      {isLoading && <Spin size="large" />}
      {data?.map((prod) => {
        return <li key={prod.id}>{prod.title}</li>;
      })}
      {isError && <p>Somethig went wrong</p>}
      <button onClick={() => refetch()}>Retry</button>
      <button
        onClick={() => {
          mutation.mutate({ id: 11, dataToChange: { title: "Blue hat 4", price: 100 } });
        }}
      >
        Update first product title
      </button>
    </div>
  );
}

export default ProductsFromApi;
