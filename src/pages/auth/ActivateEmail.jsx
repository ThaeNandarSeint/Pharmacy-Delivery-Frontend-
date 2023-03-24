import {
    Avatar,
    Box,
    Grid,
    Typography,
    useTheme,
  } from "@mui/material";
  
  // components
  import { tokens } from "../../utils/theme";
  import { useEffect } from "react";
  import axios from "axios";
  import { authRoute } from "../../utils/APIRoutes";
  import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
  
  const ActivateEmail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { activation_token } = useParams()

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const { data } = await axios.post(`${authRoute}/activateEmail`, {activation_token})

                    return toast.success(data.msg, toastOptions);
                    
                } catch (err) {
                    return toast.error(err.response.data.msg, toastOptions);
                }
            }
            activationEmail()
        }
    },[activation_token])
  
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
            Activate Email
          </Typography>
        </Grid>  
        
        <ToastContainer />
        
      </Box>
    );
  };
  
  export default ActivateEmail;
  