import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  
  // components
  import { tokens } from "../../utils/theme";
  import axios from "axios";
  import { authRoute } from "../../utils/APIRoutes";
  import { toast, ToastContainer } from "react-toastify";
  
  const ForgotPassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = async (values) => {
      const { email } = values;
      try {
        const { data } = await axios.post(`${authRoute}/forgotPassword`, {
          email,
        });
  
        return toast.success(data.msg, toastOptions);

      } catch (err) {

        return toast.error(err.response.data.msg, toastOptions);

      }
    };
  
    // validation
    const toastOptions = {
      position: "top-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
  
    return (
      <Box mt="50px" mx="auto" width="400px">
        <Grid align="center" mb="20px">
          <Avatar sx={{ width: 56, height: 56 }}></Avatar>
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
            Forgot Password
          </Typography>
        </Grid>
  
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
  
              <Box display="flex" justifyContent="center" mt="20px">
                <Button
                  sx={{ width: "400px" }}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Verify your email
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),

  });
  const initialValues = {
    email: "",
  };
  
  export default ForgotPassword;
  