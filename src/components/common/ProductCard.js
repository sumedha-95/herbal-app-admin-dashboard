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

const ProductCard = ({ id, title, title_ar, url, image, enable, handleSubmit }) => {
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
                <Box>
                    <form onSubmit={(e) => handleSubmit(e, inputs)}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                      
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                ENGLISH TITLE
                                            </Typography>
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                  
                                            {' '}
                                            <TextField
                                                error={errors['title'] ? true : false}
                                                required
                                                name="title"
                                                variant="filled"
                                                label='ENGLISH TITLE'
                                                defaultValue={title}
                                                fullWidth
                                                // multiline
                                                // rows={4}
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        title: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>

                                    <Grid item xs={6}>
                                       
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                ARABIC TITLE
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            {' '}
                                            <TextField
                                                error={errors['title_ar'] ? true : false}
                                                required
                                                name="title_ar"
                                                variant="filled"
                                                label='ARABIC TITLE'
                                                // multiline
                                                // rows={4}
                                                defaultValue={title_ar}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        title_ar: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                      
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                URL
                                            </Typography>
                                      
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            {' '}
                                            <TextField
                                                error={errors['url'] ? true : false}
                                                required
                                                name="url"
                                                variant="filled"
                                                label='URL'
                                                // multiline
                                                // rows={4}
                                                defaultValue={url}
                                                fullWidth
                                                onChange={(e) => {
                                                    setInputs({
                                                        ...inputs,
                                                        url: e.target.value
                                                    });
                                                }}
                                            />
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                     
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                ENABLE/DISABLE STATUS
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                <Switch
                                                    sx={{ m: 1 }}
                                                    defaultChecked={enable}
                                                    onChange={(e) => {
                                                        setInputs({
                                                            ...inputs,
                                                            enable: e.target.checked
                                                        });
                                                    }}
                                                />
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                     
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                BANNER
                                            </Typography>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                            <Typography variant="h7" sx={{ textAlign: 'left' }}>
                                                <img
                                                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                                                    src={inputs.image}
                                                    loading="lazy"
                                                    alt='BANNER'
                                                />
                                            </Typography>
                                        
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={(e) => {
                                                    // setImage(window.URL.createObjectURL(e.target.files[0]));
                                                    if (e.target.files[0].size < 15000000) {
                                                        setInputs({
                                                            ...inputs,
                                                            file: e.target.files[0],
                                                            image: window.URL.createObjectURL(e.target.files[0])
                                                        });
                                                    } else {
                                                        console.log('errors');
                                                    }
                                                }}
                                            />
                                            <Typography variant="h7" sx={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>
                                                The maximum allowable size for file uploads is 2MB and the dimensions must not exceed 320 x
                                                240 pixels.
                                            </Typography>                                       
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
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
