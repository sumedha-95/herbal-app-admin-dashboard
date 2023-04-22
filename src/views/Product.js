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
  Card,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import Popup from "../components/common/Popup";
import ReusableTable from "../components/common/ReusableTable";
import { createPharmacy, createProduct, getPaginatedProducts, getallPharmacies } from "../service/product.service";
import PharmacyModel from "../models/products";
import { popAlert } from "../utils/alerts";
import colors from "../assets/styles/colors";
import TableAction from "../components/common/TableActions";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ReportButton from "../components/common/ReportButton";
import ProductCard from "../components/common/ProductCard";
import ProductDelete from "../components/common/ProductDelete";

//table columns
const tableColumns = [
  {
    id: "image",
    label: "Image",
    minWidth: 40,
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "center",
  },
  {
    id: "unit",
    label: "UoM",
    align: "left",
  },
  {
    id: "unitAmount",
    label: "Units",
    align: "left",
  },
    {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "seller",
    label: "Seller",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "updatedAt",
    label: "Date",
    align: "left",
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
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
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
  const [ProductUpdate, setProductUpdate] = useState([]);

  // const handleSubmit = async (e) => {
  //   console.log("Hi");
  //   e.preventDefault();
  //   setLoading(true);

  //   const response = await createProduct(inputs);

  //   if (response.success) {
  //     setRefresh(!refresh);
  //     console.log('llll',response);
  //     response?.formData?.message &&
  //       popAlert("Success!", response?.formData?.message, "success").then((res) => {
  //         setShowPopup(false);
  //       });
  //   } else {
  //     response?.formData?.message &&
  //       popAlert("Error!", response?.formData?.message, "error");
  //     response?.formData?.formData && setErrors(response.formData.formData);
  //   }
  //   setLoading(false);
  // };

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
    navigate(`/products/${id}`);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page: page });
  };

  const handleLimitChange = (limit) => {
    setPagination({ ...pagination, limit: limit });
  };

  const handlePopupClose = () => setShowPopup(false);
  const handleUpdatePopupClose = () => setShowUpdatePopup(false);
  const handleDeletePopupClose = () => setShowDeletePopup(false);

  const handleSearch = (input) => {
    setKeyword(input);
  };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const fetchAndSet = async () => {
      const response = await getPaginatedProducts(
        pagination.page,
        pagination.limit,
        pagination.orderBy,
      );

      if (response.success) {
        if (!response.data) return;

        let tableDataArr = [];
        for (const addProduct of response.data.content) {
          tableDataArr.push({
            image:addProduct.firebaseStorageRef,
            name: addProduct.name,
            price: addProduct.price,
            description:addProduct.description,
            unit: addProduct.unit,
            unitAmount:addProduct.unitAmount,
            seller: addProduct.seller.name,
            updatedAt:addProduct.updatedAt.substring(0, 10),
            action: <TableAction id={addProduct._id} onEdit={handleView} />,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, refresh, keyword]);

  const handleEdit = (id, image_name, url, title, title_ar, enable) => {
        setProductUpdate({
            id: id,
            image_name: image_name,
            url: url,
            title: title,
            title_ar: title_ar,
            is_enable: enable
        });

        setShowUpdatePopup(true);
  };
  
  const handleDelet = (id, image_name, url, title, title_ar, enable) => {
        setShowDeletePopup({
            id: id,
            image_name: image_name,
            url: url,
            title: title,
            title_ar: title_ar,
            is_enable: enable
        });

        setShowDeletePopup(true);
    };

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
          <ReportButton />
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
          {/* <ReusableTable
            rows={tableRows}
            columns={tableColumns}
            totalElements={totalElements}
            limit={pagination.limit}
            page={pagination.page}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          /> */}
            <Card sx={{ justifyContent: 'center', mt: 3 }}>
                                       <>
                                                        <Paper sx={{ width: '100%', overflowx: 'scroll', overflowY: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead
                                            sx={{
                                                boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.25)'
                                            }}
                                        >
                                            <TableRow>
                                                <TableCell style={{ minWidth: 50 ,textAlign:'center',fontWeight: 'bold'}}>Image</TableCell>
                                                <TableCell style={{ minWidth: 50 ,fontWeight: 'bold'}}>NAME</TableCell>
                                                <TableCell style={{ minWidth: 50 ,textAlign:'center',fontWeight: 'bold'}}>UoM</TableCell>
                                                <TableCell style={{ minWidth: 50 ,textAlign:'center',fontWeight: 'bold'}}>UNITS</TableCell>
                                                <TableCell style={{ minWidth: 50 ,textAlign:'center',fontWeight: 'bold'}}>PRICE</TableCell>
                                                <TableCell style={{ minWidth: 50 ,fontWeight: 'bold'}}>SELLER</TableCell>
                                                <TableCell style={{ minWidth: 50 ,fontWeight: 'bold'}}>DESCRIPTION</TableCell>
                                                <TableCell style={{ minWidth: 50 ,fontWeight: 'bold'}}>DATE</TableCell>
                                                <TableCell style={{ minWidth: 20, textAlign: 'center', fontWeight: 'bold' }}>ACTION</TableCell>
                                                <TableCell style={{ minWidth: 20 ,textAlign:'center',fontWeight: 'bold'}}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                  {tableRows.map((response) => (
                                        <TableRow sx={{ color: 'black' }}>
                                                    <img
                                                      style={{ maxWidth: '250px', maxHeight: '150px', objectFit: 'cover' }}
                                                      src={'./image/88.png'}
                                                      loading="lazy"
                                                      alt="image"
                                                    />

                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 100 }}>
                                                        {response.name}
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 50 }}>
                                                        {response.unit}
                                                    </TableCell>

                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 50 }}>
                                                        {response.unitAmount}
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 50 }}>
                                                        {response.price} 
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 100 }}>
                                                        {response.seller}
                                                     </TableCell>
                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 100 }}>
                                                        {response.description}
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'black' }} style={{ minWidth: 100 }}>
                                                        {response.updatedAt}
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'black', minWidth: 50, alignItems: 'center' }}>
                                                         <TableAction
                                                            id={response.id}
                                                            onEdit={() =>
                                                                handleEdit(
                                                                  response.id,
                                                                  response.name,
                                                                  response.unit,
                                                                  response.unitAmount,
                                                                  response.price,
                                                                  response.seller,
                                                                  response.description,
                                                                )
                                                            }
                                                        /> 
                                      </TableCell>
                                      <TableCell sx={{ color: 'black', minWidth: 50, alignItems: 'center' }}>
                                                         <TableAction
                                                            id={response.id}
                                                            onDelete={() =>
                                                                handleDelet(
                                                                  response.id,
                                                                  response.name,
                                                                  response.unit,
                                                                  response.unitAmount,
                                                                  response.price,
                                                                  response.seller,
                                                                  response.description,
                                                                )
                                                            }
                                                        /> 
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                  </Table>
                                  <TablePagination
                                      rowsPerPageOptions={[10, 25, 50]}
                                      component="div"
                                      count={totalElements}
                                      rowsPerPage={pagination.limit}
                                      page={pagination.page}
                                      onPageChange={handlePageChange}
                                      onRowsPerPageChange={handleLimitChange}
                                    />
                                </TableContainer>
                            </Paper>
                        </>
            </Card>
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

      {/* custom popup */}
            <Popup title='Update Products' width={800} show={showUpdatePopup} onClose={handleUpdatePopupClose}>
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ mt: 2 }}>
                        {loading ? (
                            <Box
                                sx={{
                                    width: '100%',
                                    mt: '3%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CircularProgress sx={{ mr: 5 }} />
                                <Typography sx={{ mb: 2 }} variant="h3">
                                    LOADING
                                </Typography>
                            </Box>
                        ) : (
                            <ProductCard
                            //     id={offerUpdate.id}
                            //     title={offerUpdate.title}
                            //     title_ar={offerUpdate.title_ar}
                            //     url={offerUpdate.url}
                            //     handleSubmit={handleUpdateSubmit}
                            //     enable={offerUpdate.is_enable}
                            //     image={offerUpdate.image_name}
                            />
                        )}
                    </Box>
                </Box>
            </Popup>

      {/* custom popup */}
      <Popup width={700} show={showDeletePopup} onClose={handleDeletePopupClose}>
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ mt: 2 }}>
                        {loading ? (
                            <Box
                                sx={{
                                    width: '100%',
                                    mt: '3%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CircularProgress sx={{ mr: 5 }} />
                                <Typography sx={{ mb: 2 }} variant="h3">
                                    LOADING
                                </Typography>
                            </Box>
                        ) : (
                            <ProductDelete />
                        )}
                    </Box>
                </Box>
            </Popup>

      
    </React.Fragment>
  );
};

export default Product;
