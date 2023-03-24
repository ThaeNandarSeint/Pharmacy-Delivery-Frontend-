import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/category/CategoryForm";
import { categoryRoute } from "../../../utils/APIRoutes";

const EditCategory = () => {
  const { id } = useParams();

  // validation
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const accessToken = Cookies.get("accessToken");

  const handleFormSubmit = async (values) => {
    const { title } = values;

    try {
      const { data } = await axios.put(`${categoryRoute}/${id}`, {
        title
      },{
        headers: {
          Authorization: accessToken,
        },
      });

      return toast.success(data.message, toastOptions);
    } catch (err) {
      return toast.error(err.response.data.msg, toastOptions);
    }
  };

  return (
    <CategoryForm handleFormSubmit={handleFormSubmit} text={"Edit Medicine"} />
  );
};

export default EditCategory;
