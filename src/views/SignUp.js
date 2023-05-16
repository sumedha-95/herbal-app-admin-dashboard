import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import colors from "../assets/styles/colors";
import signUp from "../models/signUp";
import { popAlert } from "../utils/alerts";
import { register } from "../service/auth.service";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [RegInputs, setRegInputs] = useState(signUp);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await register(RegInputs);

    if (response.success) {
      response?.data &&
        popAlert("Success!", response?.data, "success").then((res) => {
          window.location.replace("/auth/sign-in");
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setRegInputs(signUp);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            my: 6,
            borderRadius: 6,
            backgroundColor: colors.white,
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            p: 5,
            width: 500,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              textAlign={"center"}
              sx={{ mb: 6 }}
            >
              Sign Up
            </Typography>
            <form onSubmit={handleRegisterSubmit}>
              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Name"
                  fullWidth
                  value={RegInputs.name}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      name: e.target.value,
                    })
                  }
                />
                {errors["name"] && (
                  <Typography color="error">{errors["name"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Address"
                  fullWidth
                  value={RegInputs.address}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      address: e.target.value,
                    })
                  }
                />
                {errors["address"] && (
                  <Typography color="error">{errors["address"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Contact Number"
                  fullWidth
                  value={RegInputs.contactNumber}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      contactNumber: e.target.value,
                    })
                  }
                />
                {errors["contactNumber"] && (
                  <Typography color="error">
                    {errors["contactNumber"]}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Role"
                  fullWidth
                  value={RegInputs.role}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      role: e.target.value,
                    })
                  }
                />
                {errors["role"] && (
                  <Typography color="error">{errors["role"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="E-mail"
                  type="email"
                  fullWidth
                  value={RegInputs.email}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      email: e.target.value,
                    })
                  }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                  value={RegInputs.password}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      password: e.target.value,
                    })
                  }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box
                sx={{
                  mb: 2,
                  mr: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
            <Box textAlign={"center"} sx={{ cursor: "pointer" }}>
              <Typography variant="h7" color="primary">
                Already have an account?{" "}
                <span onClick={() => navigate("/auth/sign-in")}>Login</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignUp;
