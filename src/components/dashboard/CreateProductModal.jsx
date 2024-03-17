import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import React, { useState } from "react";
import { createNewProduct } from "../../api";
import { getBase64 } from "../../helper";

function CreateProductModal(props) {
  const createMutation = useMutation({
    mutationFn: createNewProduct,
    onSuccess: () => {
      alert("Product was create successfully");
    },
    onError: (e) => {
      console.log(e);
      alert("Product was not created");
    },
  });

  const [productData, setProductData] = useState({
    title: "",
    price: 1,
    images: "",
    description: "",
    categoryId: 3,
  });

  const handleOk = () => {
    createMutation.mutate(productData);
  };

  const handleCancel = () => {
    props.setCreateProductModalOpen(false);
  };
  return (
    <div>
      <Modal title="Create New Product" okText="Create" open={props.modalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input
          onChange={(e) => {
            setProductData({ ...productData, title: e.target.value });
          }}
          className="w-100"
          type="text"
          placeholder="Product Name"
        />
        <input
          onChange={(e) => {
            setProductData({ ...productData, description: e.target.value });
          }}
          className="w-100"
          type="text"
          placeholder="Product Description"
        />
        <input
          onChange={(e) => {
            setProductData({ ...productData, price: e.target.value });
          }}
          className="w-100"
          type="number"
          placeholder="Product Price"
        />
        <input
          onChange={(e) => {
            setProductData({ ...productData, images: [e.target.value] });
          }}
          className="w-100"
          type="text"
          placeholder="Image URL"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const result = getBase64(e.target.files[0]);

            fetch("/", {
              method: "POST",
              body: JSON.stringify({
                data: result,
              }),
            });
          }}
        />
      </Modal>
    </div>
  );
}

export default CreateProductModal;
