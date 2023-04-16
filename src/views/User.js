import React, { useState, useEffect } from "react";
import SearchBar from "../components/common/SearchBar";
import AddButton from "../components/common/AddButton";
// import ReportButton from "../components/common/ReportButton";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";

import globalMedicine from "../models/globalMedicine";
import {
  createGlobalMedicine,
  getGlobalMedicines,
} from "../service/globalMedicines.service";
import { popAlert } from "../utils/alerts";
import colors from "../assets/styles/colors";
import ReusableTable from "../components/common/ReusableTable";
import TableAction from "../components/common/TableActions";

//table columns
const tableColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 140,
    align: "left",
  },
  {
    id: "brand",
    label: "address",
    align: "right",
  },
  {
    id: "strength",
    label: "birthday",
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

const GlobalMedicens = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    orderBy: "desc",
  });
  const [tableRows, setTableRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
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

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const fetchAndSet = async () => {
      const response = await getGlobalMedicines(
        pagination.page,
        pagination.limit,
        pagination.orderBy,
        keyword
      );

      if (response.success) {
        if (!response.data) return;

        let tableDataArr = [];
        for (const globalMedicine of response.data.content) {
          tableDataArr.push({
            name: globalMedicine.name,
            brand: globalMedicine.brand,
            strength: globalMedicine.strength,
            action: (
              <TableAction
                id={globalMedicine._id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ),
          });
        }

        if (!unmounted) {
          setTotalElements(response.data.totalElements);
          setTableRows(tableDataArr);
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
  }, [pagination, refresh, keyword]);

  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <SearchBar
            onSearch={handleSearch}
            placeholderText="Search Users..."
          />
        </Grid>
        {/* <Grid item xs={1}>
          <AddButton onClick={() => setShowPopup(true)} />
        </Grid> */}
        <Grid item xs={1}>
          {/* <ReportButton /> */}
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
    </React.Fragment>
  );
};

export default GlobalMedicens;
