import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { toast } from "react-toastify";
import MedicineForm from "../../../components/medicine/MedicineForm";
import { medicineRoute } from "../../../utils/APIRoutes";

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
    const { name, companyName, price, stocks, expiredDate, category, details } =
      values;

    try {
      const { data } = await axios.post(
        medicineRoute,
        {
          name,
          companyName,
          price,
          stocks,
          expiredAt: expiredDate,
          categoryId: category,
          details,
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
    <MedicineForm
      handleFormSubmit={handleFormSubmit}
      text={"Create Medicine"}
    />
  );
};

export default CreateMedicine;
