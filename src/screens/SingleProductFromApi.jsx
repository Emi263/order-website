import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api";
import { Spin } from "antd";

function SingleProductFromApi() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  console.log(data);

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  console.log(data?.images);
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <img src={data?.images[0]} />
    </div>
  );
}

export default SingleProductFromApi;
