import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/common/SearchBar";
import AddButton from "../components/common/AddButton";
import ReportButton from "../components/common/ReportButton";
import {
  Grid,
  Box,
  Autocomplete,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Popup from "../components/common/Popup";
import ReusableTable from "../components/common/ReusableTable";
import { getOrdersByPharmacy, getOrdersByProducts } from "../service/order.service";
import TableAction from "../components/common/TableActions";

import ApprovedOrder from "../components/orders/ApprovedOrders"
import OrderReport from "../components/orders/OrderReport";
import UnApprovedOrder from "../components/orders/UnApprovedOrder";

const Pharamcies = [
  { label: "Samarasingha Pharamcy", _id: "6312055d361e1bab6496fd32" },
];

const tableColumns = [
  
  // {
  // id: 'image',
  // label: 'Image',
  // minWidth: 100,
  // align: 'center',
  // format: (value) => <img src={value} alt="Product" style={{ width: '100%' }} />,
  // },
  {
    id: "id",
    label: "Order ID",
    align: "left",
  },
  {
    id: "user",
    label: "User ID",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  }, 
  {
    id: "total",
    label: "Total",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "left",
  },
];

const Orders = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(
    Pharamcies[0]?._id
  );
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    orderBy: "desc",
  });
  const [tableRows, setTableRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState([]);
  const [printComponentRef, setPrintComponentRef] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  const handlePrintComponentRef = (ref) => {
    setPrintComponentRef(ref);
  };

  const handlePopupClose = () => setShowPopup(false);

  const handleView = (id) => {
    setSelectedOrderId(id);
    console.log('kooooo',id);
    setShowPopup(true);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page: page });
  };

  const handleLimitChange = (limit) => {
    setPagination({ ...pagination, limit: limit });
  };

  const handleSearch = (input) => {
    setKeyword(input);
  };

  const handleDataUpdate = () => {
    setRefresh(!refresh);
    setShowPopup(false);
  };

  const selectedOrder = useMemo(
  
    () => orders.find((order) => order._id === selectedOrderId),
    [selectedOrderId, orders]
  );
console.log("selectedOrder",selectedOrder);
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const fetchAndSet = async () => {
      const response = await getOrdersByProducts(
        pagination.page,
        pagination.limit,
        pagination.orderBy,
      );

      if (response.success) {
        if (!response.data) return;
        console.log('llllllll',response);
        let tableDataArr = [];
        for (const order of response.data.content) {
            tableDataArr.push({
              id: order._id,
              user: order.user._id,
              status:order.status,
              total: order.total,
            action: <TableAction id={order._id} onView={handleView} />,
          });
          }
        // }

        if (!unmounted) {
          setTotalElements(response.data.totalElements);
          setTableRows(tableDataArr);
          setOrders(response.data.content);
        }
      } else {
        console.error(response?.data);
      }
      if (!unmounted) setIsLoading(false);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [pagination, selectedPharmacyId, refresh]);

  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Orders
      </Typography>
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <SearchBar
            onSearch={handleSearch}
            placeholderText="Search Orders..."
          />
        </Grid>
        
      </Grid>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            mt: "3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ mr: 2 }} />
          Loading...
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            mt: "3%",
          }}
        >
          <ReusableTable
            rows={tableRows}
            columns={tableColumns}
            totalElements={totalElements}
            limit={pagination.limit}
            page={pagination.page}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </Box>
      )}

      {/* custom popup */}
      <Popup
        title={
          selectedOrder?.status === "paid"
            ? `Paid Order - ${selectedOrder?._id}`
            : selectedOrder?.status === "pending"
              ? `Pending Order - ${selectedOrder._id}`
              : selectedOrder?.status === "confirmed"
              ? `Confirmed Order - ${selectedOrder._id}`
            : selectedOrder?._id
        }
        width={"95vw"}
        show={showPopup}
        onClose={handlePopupClose}
      >
        {selectedOrder?.status === "paid" ? (
          <ApprovedOrder
            order={selectedOrder}
            onDataUpdate={handleDataUpdate}
          />
        ) : (
        <UnApprovedOrder
            order={selectedOrder}
            onDataUpdate={handleDataUpdate}
          />
        )}
      </Popup>
    </React.Fragment>
  );
};

export default Orders;
