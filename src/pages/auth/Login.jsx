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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import Cookies from 'js-cookie';
// import { AuthContext } from '../../AuthContext';

// components
import { tokens } from "../../utils/theme";
import { useState, useContext } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { authRoute } from "../../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  // const { setAuthToken } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await axios.post(`${authRoute}/login`, {
        email,
        password,
      });

      Cookies.set('accessToken', data.payload.accessToken, { expires: 1 });
      // localStorage.setItem('accessToken', data.payload.accessToken)

      return navigate('/admin/dashboard')  

    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  };

  const handleGoogleLogin = () => {};

  const handleFacebookLogin = () => {};

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
          Login
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
            </Box>

            <Typography textAlign="right" variant="h5" mt='20px'><Link style={{ color: colors.greenAccent[400] }} to="/forgotPassword">Forgot Password?</Link></Typography>

            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                sx={{ width: "400px" }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box display="flex" justifyContent="center" mt="20px">
        <GoogleOAuthProvider clientId="356819593348-ok4dtj9m879qnrs3nlqpvl92ohpkproc.apps.googleusercontent.com">
          <GoogleLogin
            width="400px"
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          {/* One-tap */}
          {/* <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        /> */}
        </GoogleOAuthProvider>
      </Box>
      <FacebookLogin
        buttonStyle={{ width: "100%", marginTop: "20px", height: "50px"}}
        appId="752066422677181"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
      />
      <Typography textAlign="center" variant="h5" mt='20px'>Need an account? <Link style={{ color: colors.greenAccent[400] }} to="/register">Sign up</Link></Typography>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),

  password: yup
    .string()
    .required("required")
    // .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter")
    // .matches(/[A-Z]/, "Password requires an uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
