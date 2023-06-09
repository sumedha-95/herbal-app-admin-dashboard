import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReusableTable from "../common/ReusableTable";
import { confirmOrder } from "../../service/order.service";
import { popAlert } from "../../utils/alerts";

const tableColumns = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
    align: "right",
  },
  {
    id: "quantity",
    label: "Quantity",
    align: "right",
  },
  {
    id: "subTotal",
    label: "SubTotal",
    align: "right",
  },
];

const boxStyles = {
  borderRadius: 5,
  boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
  p: 3,
};

const Order = ({ order, onDataUpdate }) => {
  const [tableRows, setTableRows] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleConfirmOrder = async (orderId) => {
    setIsSaving(true);
    const response = await confirmOrder(orderId);
    setIsSaving(false);

    if (response.success) {
      popAlert("Success!", response?.data?.message, "success");
      onDataUpdate();
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
    }
  };

  useEffect(() => {
    let unmounted = false;

    if (order?.items) {
      console.log("oooo", order);
      let preparedArr = [];
      for (const items of order.items) {
        preparedArr.push({
          id: items.product._id,
          name: items.product.name,
          quantity: items.quantity,
          subTotal: items.total,
        });
      }
      if (!unmounted) setTableRows(preparedArr);
    }

    return () => {
      unmounted = true;
    };
  }, [order]);

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"bold"} sx={{ mb: 1 }}>
                Products
              </Typography>
              <ReusableTable rows={tableRows} columns={tableColumns} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ ...boxStyles }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Order Status
                </Typography>
                {order?.status}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ ...boxStyles }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Order Summary
                </Typography>
                <Typography>
                  Created At - {new Date(order?.createdAt).toDateString()}
                </Typography>
                <Typography>Sub Total - Rs.{order?.subTotal}</Typography>
                <Typography>
                  Shipping Charges - Rs.{order?.shippingCharge}
                </Typography>
                <Typography>
                  Service Charges - Rs.{order?.serviceCharge}
                </Typography>
                <Typography>Total - Rs.{order?.total}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ ...boxStyles }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Customer Details
                </Typography>
                <Typography>Name - {order?.shipping?.name}</Typography>
                <Typography>Address - {order?.shipping?.address}</Typography>
                <Typography>
                  Contact Number - {order?.shipping?.contactNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ ...boxStyles }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Delivery Details
                </Typography>
                <Typography>Address - {order?.shipping?.address}</Typography>
              </Box>
            </Grid>
            {order.status === "paid" && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => handleConfirmOrder(order._id)}
                  sx={{
                    height: 56,
                    borderRadius: "8px",
                    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
                  }}
                  disabled={isSaving}
                >
                  Confirm Order
                  {isSaving && (
                    <>
                      &nbsp;&nbsp;
                      <CircularProgress size={"24px"} />
                    </>
                  )}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Order;
