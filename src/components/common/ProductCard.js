import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Switch, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ProductCard = ({ id, name, description, price, unit, unitAmount, handleSubmit }) => {
    const theme = useTheme();
    const [inputs, setInputs] = useState([]);
    const [errors, setErrors] = useState([]);
 

    useEffect(() => {
        setInputs({
            id:id,
            name: name,
            description: description,
            price: price,
            unit: unit,
            unitAmount: unitAmount,
        });
    }, []);

    return (
       
            
            <CardActions>
                <Box>
                    <form onSubmit={(e) => handleSubmit(e, inputs)}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                      
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                Product Name
                                            </Typography>
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                  
                                            {' '}
                                            <TextField
                                                error={errors['name'] ? true : false}
                                                required
                                                name="name"
                                                variant="filled"
                                                label='Product Name'
                                                defaultValue={name}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        name: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>

                                    <Grid item xs={6}>
                                       
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                Product Description
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            {' '}
                                            <TextField
                                                error={errors['description'] ? true : false}
                                                required
                                                name="description"
                                                variant="filled"
                                                label='Product Description'
                                                // multiline
                                                // rows={4}
                                                defaultValue={description}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        description: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                      
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                Price
                                            </Typography>
                                      
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            {' '}
                                            <TextField
                                                error={errors['price'] ? true : false}
                                                required
                                                name="price"
                                                variant="filled"
                                                label='price'
                                                // multiline
                                                // rows={4}
                                                defaultValue={price}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        price: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                     
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                Units
                                            </Typography>
                                        
                                    </Grid>
                                     <Grid item xs={6}>
                                        
                                            {' '}
                                            <TextField
                                                error={errors['unit'] ? true : false}
                                                required
                                                name="unit"
                                                variant="filled"
                                                label='unit'
                                                // multiline
                                                // rows={4}
                                                defaultValue={unit}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        unit: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>
                                     <Grid item xs={6}>
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                Unit Amount
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                         <TextField
                                                error={errors['unitAmount'] ? true : false}
                                                required
                                                name="unitAmount"
                                                variant="filled"
                                                label='unitAmount'
                                                // multiline
                                                // rows={4}
                                                defaultValue={unitAmount}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        unitAmount: e.target.value
                                                    });
                                                }}
                                            />
                                                                               
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ mt:5, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="reset" variant="contained" sx={{ py: 1, px: 5, mr: 2, ml: 2 }}>
                                    CLEAR
                                </Button>
                                <Button type="submit" variant="contained" sx={{ py: 1, px: 5 }}>
                                    SUBMIT
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </CardActions>
    );
};
export default ProductCard;
