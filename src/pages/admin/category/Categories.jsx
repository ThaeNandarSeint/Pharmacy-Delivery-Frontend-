import {
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import { tokens } from "../../../utils/theme";

// icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// components
import Header from "../../../components/main/Header";

// api
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { listCategory } from "../../../redux/actions/category.action";
import Cookies from "js-cookie";
import axios from "axios";
import { categoryRoute } from "../../../utils/APIRoutes";

// icon
import ActionBtn from "../../../components/buttons/ActionBtn";

const Categories = () => {
  const navigate = useNavigate()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(12);

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.categoryList);

  const { error, data } = payload;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  if (error) {
    return toast.error(error, toastOptions);
  }

  const handleDelete = async (id) => {
    try {
      const accessToken = Cookies.get("accessToken");

      const { data } = await axios.delete(`${categoryRoute}/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      toast.success(data.message, toastOptions);
      dispatch(listCategory());

    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleView = () => {};

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "_id",
      headerName: "Actions",
      renderCell: (params) => (
        <ActionBtn
          params={params}
          handleActions={[handleView, handleEdit, handleDelete]}
          actions={["View", "Edit", "Delete"]}
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CATEGORIES" subtitle="Managing the Categories" />
        <Link to="/admin/categories/create" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="secondary"
          >
            Create <AddOutlinedIcon sx={{ ml: "5px" }} />
          </Button>
        </Link>
      </Box>
      <ToastContainer />
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {!data.payload ? (
          "loading"
        ) : (
          <DataGrid
            checkboxSelection
            rows={data.payload}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[12, 24, 36]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Categories;
