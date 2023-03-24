import { Avatar, Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import { tokens } from "../../../utils/theme";

// components
import Header from "../../../components/main/Header";

// api
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../../redux/actions/user.action";
import { toast, ToastContainer } from "react-toastify";
import EditRoleBtn from "../../../components/buttons/EditRoleBtn";
import Cookies from "js-cookie";
import axios from "axios";
import { userRoute } from "../../../utils/APIRoutes";
import ViewBtn from "../../../components/buttons/ViewBtn";

const Users = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(12);

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.userList);

  const { error, data } = payload;

  useEffect(() => {
    dispatch(listUser());
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

  const accessToken = Cookies.get("accessToken");

  const handleEditRole = async ({ id, roleType }) => {
    try {
      const { data } = await axios.put(
        `${userRoute}/grant/${id}`,
        {
          roleType,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      toast.success(data.message, toastOptions);

      dispatch(listUser());

    } catch (err) {

      return toast.error(err.response.data.message, toastOptions);
    }
  };

  const handleView = () => {};

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "pictureUrls",
      headerName: "Profile",
      flex: 1,
      renderCell: ({ value }) => (
        <Avatar alt="User Profile" src={value[0]} variant="rounded" />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "roleType",
      headerName: "Role Type",
      flex: 1,
      renderCell: (params) => (
        <EditRoleBtn
          params={params}
          roleType={params.row.roleType}
          handleEditRole={handleEditRole}
        />
      ),
    },
    {
      field: "_id",
      headerName: "Actions",
      renderCell: (params) => (
        <ViewBtn to={`/admin/users/${params.row._id}`} />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="Managing the Users" />
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

export default Users;
