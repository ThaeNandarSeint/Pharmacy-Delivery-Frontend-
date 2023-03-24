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
  import { useState, useEffect } from "react";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  // components
  import Header from "../../../components/main/Header";
  import { Link, useOutletContext, useParams } from "react-router-dom";
  
  // icons
  import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
  
  // API
  import { detailMedicine } from "../../../redux/actions/medicine.action";
  import { useDispatch, useSelector } from "react-redux";
  import { listCategory } from "../../../redux/actions/category.action";
  
  const DeliverOrder = ({ text, handleFormSubmit }) => {
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
            deliveryFee: medicineDetail.data.payload.deliveryFee,
            deliveryPerson: medicineDetail.data.payload.deliveryPerson,
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
                {/* Delivery Fee */}
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
                {/* Select Delivery Person */}
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
  
  export default DeliverOrder;
  