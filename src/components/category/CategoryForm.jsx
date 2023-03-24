import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "../main/Header";
import { Link, useOutletContext, useParams } from "react-router-dom";

// icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// API
import { useDispatch, useSelector } from "react-redux";
import { detailCategory } from "../../redux/actions/category.action";

const CategoryForm = ({ text, handleFormSubmit }) => {
  // 
  const { id } = useParams();

  const [role] = useOutletContext();

  const dispatch = useDispatch();

  const categoryDetail = useSelector((state) => {
    if (state.categoryDetail) {
      return state.categoryDetail;
    }
    return null;
  });

  useEffect(() => {
    if (id) {
      dispatch(detailCategory(id));
    }
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues =
    id && categoryDetail.data.payload
      ? {
          title: categoryDetail.data.payload.title,
        }
      : {
          title: "",
        };

  let render;
  render = (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={text} subtitle={text} />
        <Link to="/admin/categories" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="secondary"
          >
            <ArrowBackOutlinedIcon sx={{ mr: "5px" }} /> View Categories
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
              {/* Category Title */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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
  title: yup.string().required("required"),
});

export default CategoryForm;
