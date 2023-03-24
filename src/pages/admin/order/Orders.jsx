import {
  Box,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import { tokens } from "../../../utils/theme";

// components
import Header from "../../../components/main/Header";

// api
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../../redux/actions/order.action";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { orderRoute } from "../../../utils/APIRoutes";
import Cookies from "js-cookie";
import ActionBtn from "../../../components/buttons/ActionBtn";
import ProductTooltip from "../../../components/ProductTooltip";
import ViewBtn from "../../../components/buttons/ViewBtn";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(12);

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.orderList);

  const { error, data } = payload;

  useEffect(() => {
    dispatch(listOrder());
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

  const handleDeliver = (id) => {
    navigate(`/admin/orders/deliver/${id}`)
  }

  const handleComplete = (id) => {
    
  }

  const handleCancel = async (id) => {
    try {
      const accessToken = Cookies.get("accessToken");

      const { data } = await axios.put(
        `${orderRoute}/cancel/${id}`,
        null,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      toast.success(data.message, toastOptions);

      dispatch(listOrder());

    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      headerName: "Customer Name",
      valueGetter: (orders) => orders.row.userDetail[0].name,
      cellClassName: "name-column--cell",
    },

    {
      field: "address",
      headerName: "Customer Address",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Order Status",
    },

    {
      field: "createdAt",
      headerName: "Date",
      renderCell: (params) => params.value.split("T")[0],
    },

    {
      field: "totalQuantity",
      headerName: "Products",
      renderCell: (params) => (
        <ProductTooltip params={params} />
      ),
    },

    {
      field: "totalPrice",
      headerName: "Total Price",
      renderCell: (params) => "MMK " + params.value,
    },

    {
      field: "orderDetails",
      headerName: "Order Details",
      renderCell: (params) => (
        <ViewBtn to={`/admin/orders/${params.row._id}`} />
      ),
    },

    {
      field: "_id",
      headerName: "Actions",
      renderCell: (params) => (
        <ActionBtn handleActions={[ handleDeliver, handleComplete, handleCancel ]} params={params} actions={[ "Deliver" , "Complete", "Cancel"]} />
      )
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ORDERS" subtitle="Managing the Orders" />
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

export default Orders;
