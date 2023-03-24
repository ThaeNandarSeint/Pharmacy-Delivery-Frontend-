import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMedicine } from "../../../redux/actions/medicine.action";
import { toast, ToastContainer } from "react-toastify";

import { tokens } from "../../../utils/theme";

// icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// components
import Header from "../../../components/main/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { medicineRoute } from "../../../utils/APIRoutes";
import ActionBtn from "../../../components/buttons/ActionBtn";

const Medicines = () => {
  const navigate = useNavigate()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(12);

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.medicineList);

  const { error, data } = payload;

  useEffect(() => {
    dispatch(listMedicine());
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
    try{

      const accessToken = Cookies.get('accessToken')

      const { data } = await axios.delete(`${medicineRoute}/${id}`, {
        headers: {
          Authorization: accessToken
        }
      })

      toast.success(data.message, toastOptions);

      dispatch(listMedicine());

    }catch(err){
      return toast.error(err.response.data.message, toastOptions);
    }
  }  

  const handleEdit = (id) => {
    navigate(`/admin/medicines/edit/${id}`)
  }

  const handleView = () => {

  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "stocks",
      headerName: "Stocks",
      flex: 1,
    },
    {
      field: "orderCount",
      headerName: "Order Counts",
      flex: 1,
    },
    {
      field: "avgRating",
      headerName: "Avg Ratings",
      flex: 1,
    },
    {
      field: "expiredDate",
      headerName: "Expired Date",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Category Title",
      flex: 1,
      valueGetter: (medicines) => medicines.row.categoryDetail.title,
    },

    {
      field: "_id",
      headerName: "Actions",
      renderCell: (params) => 
      (
        <ActionBtn params={params} handleActions={[ handleView, handleEdit, handleDelete ]} actions={[ "View" , "Edit", "Delete"]} />
      ),
    },

  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="MEDICINES" subtitle="Managing the Medicines" />
        <Link to="/admin/medicines/create" style={{ textDecoration: "none" }}>
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

export default Medicines;
