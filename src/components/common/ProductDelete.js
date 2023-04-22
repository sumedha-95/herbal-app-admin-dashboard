import React, { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ProductDelete = ({ id, title, title_ar, url, image, enable, handleSubmit }) => {
    const theme = useTheme();
    const [inputs, setInputs] = useState([]);
    const [errors, setErrors] = useState([]);
 

    useEffect(() => {
        setInputs({
            id: id,
            title: title,
            title_ar: title_ar,
            url: url,
            image: image,
            enable: enable
        });
    }, []);

    return (
            <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" fontWeight="bold" sx={{mb:2}} >
                                <DeleteIcon style={{ fontSize: 40,color:'red' }} />
                        </Typography>
                        <Typography variant="h5" align="center" fontWeight="bold" color="red">
                            Delete Products
                        </Typography>     
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" fontWeight="bold" >
                                Are you sure delete this product?
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={6} sx={{textAlign:'center',mt:5}}>
                        <Button variant="contained">No</Button>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'center', mt: 5 }}>
                        <Button variant="contained" style={{ backgroundColor: 'red', color: '#fff' }}>Yes</Button>
                    </Grid>
                  </Grid>
                </Box>
                </Box>
            </CardActions>
    );
};
export default ProductDelete;
