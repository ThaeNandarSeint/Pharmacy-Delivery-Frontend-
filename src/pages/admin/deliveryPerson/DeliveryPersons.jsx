import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import { tokens } from "../../../utils/theme";

// icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// components
import Header from "../../../components/main/Header";

// api
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listDeliveryPerson } from "../../../redux/actions/deliveryPerson.action";
import { toast } from "react-toastify";

const DeliveryPersons = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(5)

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.deliveryPersonList)

  const { error, data } = payload

    useEffect(() => {

        dispatch(listDeliveryPerson())

    }, [dispatch])

    const toastOptions = {
      position: "top-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    if(error){
      return toast.error(error, toastOptions);
    }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => (params.row.userDetail[0].name),
      // (deliveryPersons.row.userDetail[0].name),
      cellClassName: "name-column--cell"
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      flex: 1,
    },
    {
        field: "vehicleNumber",
        headerName: "Vehicle Number",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
    
  ];

  return (
    <Box m="20px">      
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="DELIVERY PERSONS" subtitle="Managing the Delivery Persons" />
        <Link to="/admin/deliveryPersons/create" style={{ textDecoration: 'none' }}>
          <Button className="no-underline" variant="contained" color="secondary">Create <AddOutlinedIcon sx={{ ml: "5px" }} /></Button>
        </Link>        
      </Box>
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
        {
          !data.payload ? "loading" :
          <DataGrid 
            checkboxSelection rows={data.payload} columns={columns} 
            pageSize={pageSize} rowsPerPageOptions={[5, 10, 20]} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}  
            components={{ Toolbar: GridToolbar }}
          />
        }
      </Box>
    </Box>
  );
};

export default DeliveryPersons;
