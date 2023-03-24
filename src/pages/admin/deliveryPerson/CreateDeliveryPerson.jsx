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
  import axios from "axios";
  import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  
  // components
  import Header from "../../../components/main/Header";
  import { Link } from "react-router-dom";
  
  // icons
  import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
  
  import { deliveryPersonRoute } from "../../../utils/APIRoutes";
  
  const CreateDeliveryPerson = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = async (values) => {
      console.log(values)
  
      const { email, phoneNumber, vehicleType, vehicleNumber, buildingNo, street, quarter, township, city, state } = values;
      try {
        const { data } = await axios.post(deliveryPersonRoute, {
          email, phoneNumber, vehicleType, vehicleNumber, buildingNo, street, quarter, township, city, state
        });
        
        return toast.success(data.msg, toastOptions)
  
      } catch (err) {
        return toast.error(err.response.data.msg, toastOptions)
      }
    };
  
    // validation
    const toastOptions = {
      position: 'top-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
  }
  
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="CREATE DELIVERY PERSON" subtitle="Create a New Delivery Person" />
          <Link to="/admin/deliveryPersons" style={{ textDecoration: "none" }}>
            <Button
              className="no-underline"
              variant="contained"
              color="secondary"
            >
              <ArrowBackOutlinedIcon sx={{ mr: "5px" }} /> View Delivery Persons
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
                {/* email */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Phone Number */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Vehicle Type */}
                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Select Vehicle Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={values.vehicleType}
                    name="vehicleType"
                    error={!!touched.vehicleType && !!errors.vehicleType}
                    helpertext={touched.vehicleType && errors.vehicleType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="car">
                      Car
                    </MenuItem>
                    <MenuItem value="bike">
                      Bike
                    </MenuItem>
                  </Select>
                </FormControl>
                {/* Vehicle Number */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleNumber}
                  name="vehicleNumber"
                  error={!!touched.vehicleNumber && !!errors.vehicleNumber}
                  helperText={touched.vehicleNumber && errors.vehicleNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Building No */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Building No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.buildingNo}
                  name="buildingNo"
                  error={!!touched.buildingNo && !!errors.buildingNo}
                  helperText={touched.buildingNo && errors.buildingNo}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Street */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.street}
                  name="street"
                  error={!!touched.street && !!errors.street}
                  helperText={touched.street && errors.street}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Quarter */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Quarter"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quarter}
                  name="quarter"
                  error={!!touched.quarter && !!errors.quarter}
                  helperText={touched.quarter && errors.quarter}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Township */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Township"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.township}
                  name="township"
                  error={!!touched.township && !!errors.township}
                  helperText={touched.township && errors.township}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* City */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* State */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New Delivery Person
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };

  const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),

    vehicleType: yup.string().required("required"),
    vehicleNumber: yup.string().required("required"),

    buildingNo: yup.string().required("required"),
    street: yup.string().required("required"),
    quarter: yup.string().required("required"),
    township: yup.string().required("required"),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
  });
  
  const initialValues = {
    email: "",
    phoneNumber: "",

    vehicleType: "",
    vehicleNumber: "",

    buildingNo: "",
    street: "",
    quarter: "",
    township: "",
    city: "",
    state: ""
  };
  
  export default CreateDeliveryPerson;
  