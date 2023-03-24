import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/category/CategoryForm";
import { categoryRoute } from "../../../utils/APIRoutes";

const CreateMedicine = () => {
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
      const { data } = await axios.post(
        categoryRoute,
        {
          title
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      return toast.success(data.message, toastOptions);
    } catch (err) {
      return toast.error(err.response.data.msg, toastOptions);
    }
  };

  return (
    <CategoryForm
      handleFormSubmit={handleFormSubmit}
      text={"Create Category"}
    />
  );
};

export default CreateMedicine;
