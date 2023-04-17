import React, { useState, useEffect } from "react";
import SearchBar from "../components/common/SearchBar";
import AddButton from "../components/common/AddButton";
// import ReportButton from "../components/common/ReportButton";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import Popup from "../components/common/Popup";
import ReusableTable from "../components/common/ReusableTable";
import { createPharmacy, createProduct, getallPharmacies } from "../service/product.service";
import PharmacyModel from "../models/products";
import { popAlert } from "../utils/alerts";
import colors from "../assets/styles/colors";
import TableAction from "../components/common/TableActions";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

//table columns
const tableColumns = [
  {
    id: "registrationNumber",
    label: "Reg Number",
    minWidth: 140,
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "right",
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

const Product = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(PharmacyModel);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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

  const handleSubmit = async (e) => {
    console.log("Hi");
    e.preventDefault();
    setLoading(true);

    const response = await createProduct(inputs);

    if (response.success) {
      setRefresh(!refresh);
      response?.data?.message &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setShowPopup(false);
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setLoading(false);
  };

  const handleMapInput = (input) => {
    setInputs(input);
  };

  const handleClear = () => {
    setInputs(createProduct);
  };

  const handleView = (id) => {
    navigate(`/pharmacy/${id}`);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page: page });
  };

  const handleLimitChange = (limit) => {
    setPagination({ ...pagination, limit: limit });
  };

  const handlePopupClose = () => setShowPopup(false);

  const handleSearch = (input) => {
    setKeyword(input);
  };

  // useEffect(() => {
  //   let unmounted = false;

  //   if (!unmounted) setIsLoading(true);

  //   const fetchAndSet = async () => {
  //     const response = await getallPharmacies(
  //       pagination.page,
  //       pagination.limit,
  //       pagination.orderBy,
  //       keyword
  //     );

  //     if (response.success) {
  //       if (!response.data) return;

  //       let tableDataArr = [];
  //       for (const addPharmacy of response.data.content) {
  //         tableDataArr.push({
  //           name: addPharmacy.name,
  //           registrationNumber: addPharmacy.registrationNumber,
  //           address: addPharmacy.address,
  //           contactNumber: addPharmacy.contactNumber,
  //           action: <TableAction id={addPharmacy._id} onView={handleView} />,
  //         });
  //       }

  //       if (!unmounted) {
  //         setTotalElements(response.data.totalElements);
  //         setTableRows(tableDataArr);
  //       }
  //     } else {
  //       console.error(response?.data);
  //     }
  //     if (!unmounted) setIsLoading(false);
  //   };

  //   fetchAndSet();

  //   return () => {
  //     unmounted = true;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pagination, refresh, keyword]);

  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <SearchBar
            onSearch={handleSearch}
            placeholderText="Search Product..."
          />
        </Grid>
        <Grid item xs={1}>
          <AddButton onClick={() => setShowPopup(true)} />
        </Grid>
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

      {/* custom popup */}
      <Popup
        title="Add Product"
        width={800}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Box sx={{ mb: 1 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 1 }}>
              <TextField
                name="name"
                variant="filled"
                label="Product Name"
                fullWidth
                value={inputs.name}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    name: e.target.value,
                  })
                }
              />
              {errors["name"] && (
                <Typography color="error">{errors["name"]}</Typography>
              )}
            </Box>
            <Box sx={{ mb: 1 }}>
              <TextField
                name="description"
                variant="filled"
                label="Product Description"
                fullWidth
                value={inputs.description}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  })
                }
              />
              {errors["description"] && (
                <Typography color="error">
                  {errors["description"]}
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 1 }}>
              <TextField
                name="price"
                variant="filled"
                label="Product Price"
                fullWidth
                value={inputs.price}
                type="number"
                InputProps={{ inputProps: { min: 0 }, shrink: "true" }}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    price: e.target.value,
                  })
                }
              />
              {errors["price"] && (
                <Typography color="error">{errors["price"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <TextField
                name="unit"
                variant="filled"
                label="Units"
                fullWidth
                value={inputs.unit}
                type="number"
                InputProps={{ inputProps: { min: 0 }, shrink: "true" }}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    unit: e.target.value,
                  })
                }
              />
              {errors["unit"] && (
                <Typography color="error">{errors["unit"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <TextField
                name="unitAmount"
                variant="filled"
                label="Unit Amount"
                fullWidth
                value={inputs.unitAmount}
                type="number"
                InputProps={{ inputProps: { min: 0 }, shrink: "true" }}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    unitAmount: e.target.value,
                  })
                }
              />
              {errors["unitAmount"] && (
                <Typography color="error">{errors["unitAmount"]}</Typography>
              )}
            </Box>
           <Box sx={{ mb: 1 }}>
  <Typography>File</Typography>
  <input
    name="file"
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      setInputs({
        ...inputs,
        file: file,
      });
    }}
  />
  {errors["file"] && (
    <Typography color="error">{errors["file"]}</Typography>
  )}
</Box>

           
            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>
    </React.Fragment>
  );
};

export default Product;