import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "../main/Header";
import { Link, useOutletContext, useParams } from "react-router-dom";

// icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// API
import { detailMedicine } from "../../redux/actions/medicine.action";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../redux/actions/category.action";

const MedicineForm = ({ text, handleFormSubmit }) => {
  const { id } = useParams();
  
  const [categories, setCategories] = useState();

  const [role] = useOutletContext();

  const dispatch = useDispatch();

  const medicineDetail = useSelector((state) => {
    if (state.medicineDetail) {
      return state.medicineDetail;
    }
    return null;
  });

  const categoryList = useSelector((state) => state.categoryList);

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList.data.payload);
    }
  }, [categoryList]);

  useEffect(() => {
    if (id) {
      dispatch(detailMedicine(id));
    }
    dispatch(listCategory());
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues =
    id && medicineDetail.data.payload
      ? {
          name: medicineDetail.data.payload.name,
          companyName: medicineDetail.data.payload.companyName,
          price: medicineDetail.data.payload.price,
          stocks: medicineDetail.data.payload.stocks,
          expiredDate: new Date(medicineDetail.data.payload.expiredDate),
          category: medicineDetail.data.payload.categoryId,
          details: medicineDetail.data.payload.details,
        }
      : {
          name: "",
          companyName: "",
          price: "",
          stocks: "",
          expiredDate: new Date(Date.now()),
          category: "",
          details: "",
        };

  let render;
  render = (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={text} subtitle={text} />
        <Link to="/admin/medicines" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="secondary"
          >
            <ArrowBackOutlinedIcon sx={{ mr: "5px" }} /> View Medicines
          </Button>
        </Link>
      </Box>

      <ToastContainer />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Medicine Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Medicine Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Company Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Medicine Price */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Medicine Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Medicine Stocks */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Medicine Stocks"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stocks}
                name="stocks"
                error={!!touched.stocks && !!errors.stocks}
                helperText={touched.stocks && errors.stocks}
                sx={{ gridColumn: "span 2" }}
              />
              {/* date picker */}
              <Box sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Expired Date"
                    inputFormat="MM/DD/YYYY"
                    value={values.expiredDate}
                    onChange={(value) => {
                      setFieldValue("expiredDate", new Date(value));
                    }}
                    onBlur={handleBlur}
                    error={!!touched.expiredDate && !!errors.expiredDate}
                    helperText={touched.expiredDate && errors.expiredDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              {/* Select Category */}
              {!categories ? (
                "Loading"
              ) : (
                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helpertext={touched.category && errors.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {categories.map((category, i) => (
                      <MenuItem value={category._id} key={i}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                id="filled-multiline-flexible"
                label="Medicine Details"
                multiline
                variant="filled"
                fullWidth
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                name="details"
                error={!!touched.details && !!errors.details}
                helperText={touched.details && errors.details}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {text}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );

  return role !== "Superadmin" && role !== "Admin" && role !== "Supervisor" ? (
    <div>not authorized</div>
  ) : (
    render
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  companyName: yup.string().required("required"),
  price: yup.number().positive().required("required"),
  stocks: yup.number().positive().required("required"),
  expiredDate: yup.date().nullable("required"),
  category: yup.string().required("required"),
  details: yup.string().required("required"),
});

export default MedicineForm;
