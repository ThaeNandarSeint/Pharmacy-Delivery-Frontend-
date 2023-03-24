import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link, useParams } from "react-router-dom";
import { detailOrder } from "../../../redux/actions/order.action";
import { tokens } from "../../../utils/theme";
import { useState } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const OrderDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.orderDetail);

  const { loading, error, data } = payload;

  const { id } = useParams();

  useEffect(() => {
    dispatch(detailOrder(id));
  }, [dispatch]);

  const steps = [
    "Select master blaster campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  return (
    <>
      {!data.payload ? (
        <div>Loading</div>
      ) : (
        <>
          <Card sx={{ mb: 2, p: 3, backgroundColor: colors.primary[700] }}>
            <Box sx={{ width: "100%" }}>
              <Box display="flex" justifyContent="space-between">
                <IconButton aria-label="back" color="secondary">
                  <ArrowBackIcon />
                </IconButton>
                <div>
                  <IconButton
                    color="secondary"
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleClose}>Deliver</MenuItem>
                    <MenuItem onClick={handleClose}>Complete</MenuItem>
                    <MenuItem onClick={handleClose}>Cancel</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              mb: 5,
              height: 120,
              backgroundColor: colors.primary[700],
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://res.cloudinary.com/dm5vsvaq3/image/upload/v1676883888/PharmacyDelivery/Medicines/Sitaglit%20100/aqziwj9vhh673g6d6ul5.webp"
                alt="Live from space album cover"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h2">{data.payload.user.name}</Typography>
                <Typography variant="h5">{data.payload.user.email}</Typography>
                <Link style={{ textDecoration: "none" }} to="/">
                  <Typography color={colors.greenAccent[300]}>
                    View Profile
                  </Typography>
                </Link>
              </CardContent>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Paper
                  sx={{
                    backgroundColor: colors.greenAccent[400],
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[900]}
                  >
                    Phone
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    {data.payload.user.phoneNumber}
                  </Typography>
                </Paper>
                {data.payload.status === "deliver" && (
                  <Paper
                    sx={{
                      backgroundColor: colors.greenAccent[400],
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      padding: 3,
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[900]}
                    >
                      Delivery Time
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color={colors.blueAccent[500]}
                    >
                      15 h 30 m
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </Box>
          </Card>
          <TableContainer
            sx={{ backgroundColor: colors.primary[700] }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Medicine ID</TableCell>
                  <TableCell>Medicine Image</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.payload.orderDetails.map((orderDetail) => (
                  <TableRow
                    key={orderDetail._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {orderDetail.medicine.id}
                    </TableCell>
                    <TableCell>
                      <img
                        src={orderDetail.medicine.pictureUrls}
                        alt=""
                        width="100"
                        height="100"
                      />
                    </TableCell>
                    <TableCell>{orderDetail.medicine.name}</TableCell>

                    <TableCell>MMK {orderDetail.medicine.price}</TableCell>
                    <TableCell>{orderDetail.quantity} x</TableCell>
                    <TableCell>
                      MMK {orderDetail.medicine.price * orderDetail.quantity}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="right" colSpan={5}>
                    Main Total
                  </TableCell>
                  <TableCell>MMK {data.payload.totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default OrderDetails;
