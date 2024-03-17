import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal, Space, Table, Popconfirm, Button } from "antd";
import { deleteProduct, getAllProducts, updateProduct } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateProductModal from "./CreateProductModal";

function ProductTable() {
  const nav = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [title, setTitle] = useState(selectedProduct?.title || "");
  const [price, setPrice] = useState(selectedProduct?.price || 0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      alert("PRoduct was updated successfully");
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleOk = () => {
    updateMutation.mutate({
      id: selectedProduct.id,
      dataToChange: { title: title, price: price },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "age",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "address",
      render: (text) => <p>{text.substring(0, 41)}...</p>,
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (text) => (
        <p>
          {new Intl.DateTimeFormat("en-GB", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(new Date(text))}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              nav("/products-api/" + record.id);
            }}
          >
            Go to product
          </a>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => mutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
          <a
            onClick={() => {
              setSelectedProduct(record);
              setIsModalOpen(true);
            }}
          >
            Update
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setTitle(selectedProduct?.title);
    setPrice(selectedProduct?.price);
  }, [selectedProduct]);

  const [modalOpen, setCreateProductModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setCreateProductModalOpen(true);
        }}
      >
        Create new product
      </Button>
      <Table
        loading={isLoading || mutation.isPending || updateMutation.isPending}
        columns={columns}
        dataSource={data}
      />
      ;
      <Modal
        title={selectedProduct?.title || ""}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
      >
        <label htmlFor="title">Title</label>
        <input
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          id="title"
          style={{ width: "100%" }}
          type="text"
          defaultValue={selectedProduct?.title}
        />
        <label> Price</label>
        <input
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          type="number"
          defaultValue={selectedProduct?.price}
        />
      </Modal>
      <CreateProductModal modalOpen={modalOpen} setCreateProductModalOpen={setCreateProductModalOpen} />
    </>
  );
}
export default ProductTable;
