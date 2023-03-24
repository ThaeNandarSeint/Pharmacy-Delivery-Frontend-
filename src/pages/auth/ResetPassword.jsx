import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  
  // components
  import { tokens } from "../../utils/theme";
  import { useState } from "react";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import axios from "axios";
  import { authRoute } from "../../utils/APIRoutes";
  import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
  
  const ResetPassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const [showPassword, setShowPassword] = useState(false);
  
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { token } = useParams()

    const handleFormSubmit = async (values) => {     

      const { password } = values;
      try {
            
        const { data } = await axios.post(`${authRoute}/resetPassword`, {
          password,
        }, {
            headers: { Authorization: token }
        });
  
        return toast.success(data.message, toastOptions);
  
      } catch (err) {
        return toast.error(err.response.data.message, toastOptions);
  
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
            Reset Password
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
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button sx={{ width: "400px" }} type="submit" color="secondary" variant="contained">
                    Reset Password
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const checkoutSchema = yup.object().shape({  
    password: yup
      .string()
      .required("required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  
    confirmPassword: yup
      .string()
      .required("required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
  });
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  
  export default ResetPassword;
  