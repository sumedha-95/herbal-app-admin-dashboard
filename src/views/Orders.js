import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Popup from "../components/common/Popup";
import ReusableTable from "../components/common/ReusableTable";
import { getOrders } from "../service/order.service";
import TableAction from "../components/common/TableActions";
import Order from "../components/orders/Order";

const tableColumns = [
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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    orderBy: "desc",
  });
  const [tableRows, setTableRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState([]);

  const handlePopupClose = () => setShowPopup(false);

  const handleView = (id) => {
    setSelectedOrderId(id);
    setShowPopup(true);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page: page });
  };

  const handleLimitChange = (limit) => {
    setPagination({ ...pagination, limit: limit });
  };

  const handleDataUpdate = () => {
    setRefresh(!refresh);
  };

  const selectedOrder = useMemo(
    () => orders.find((order) => order._id === selectedOrderId),
    [selectedOrderId, orders]
  );

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const fetchAndSet = async () => {
      const response = await getOrders(
        pagination.page,
        pagination.limit,
        pagination.orderBy
      );

      if (response.success) {
        if (!response.data) return;
        let tableDataArr = [];
        for (const order of response.data.content) {
          tableDataArr.push({
            id: order._id,
            user: order.user._id,
            status: order.status,
            total: order.total,
            action: <TableAction id={order._id} onView={handleView} />,
          });
        }

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
  }, [pagination, refresh]);

  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Orders
      </Typography>

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
        <Order order={selectedOrder} onDataUpdate={handleDataUpdate} />
      </Popup>
    </React.Fragment>
  );
};

export default Orders;
