import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCustomersQuery } from '../../services/crud-customer';
import { useGetSellersQuery } from '../../services/crud-seller';
import { useCreateOrderMutation } from '../../services/crud-order';
import { useGetProductsQuery } from '../../services/crud-product';

const AddNewOrderFields = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: customersData } = useGetCustomersQuery();
  const { data: sellersData } = useGetSellersQuery();
  const { data: productsData } = useGetProductsQuery();
  const navigate = useNavigate();

  const initialValues = {
    customer_id: '',
    seller_id: '',
    product_id: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          customer_id: Yup.string().required('Customer Name is required'),
          seller_id: Yup.string().required('Seller Name is required'),
          product_id: Yup.string().required('Product Name is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          createOrder(values)
            .unwrap()
            .then((payload) => {
              navigate('/portal/orders');
              toast.success('Added Order Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
              });
            })
            .catch((error) => setErrors({ email: error.data?.message }));
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
          dirty,
          isValid,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please fill in the input fields to add a order.'
                title='Order Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.customer_id && errors.customer_id
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.customer_id && errors.customer_id
                          )}
                          label='Select Customer'
                          name='customer_id'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.customer_id}
                        >
                          <option value='' disabled hidden></option>
                          {customersData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.first_name} {el.last_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.customer_id && errors.customer_id && (
                          <FormHelperText error id='text-customer-id'>
                            {errors.customer_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.seller_id && errors.seller_id)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.seller_id && errors.seller_id)}
                          label='Select Seller'
                          name='seller_id'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.seller_id}
                        >
                          <option value='' disabled hidden></option>
                          {sellersData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.first_name} {el.last_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.seller_id && errors.seller_id && (
                          <FormHelperText error id='text-seller-id'>
                            {errors.seller_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.product_id && errors.product_id)}
                      >
                        <TextField
                          disabled={!values.seller_id}
                          fullWidth
                          error={Boolean(
                            touched.product_id && errors.product_id
                          )}
                          label='Select Product'
                          name='product_id'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.product_id}
                        >
                          <option value='' disabled hidden></option>
                          {productsData
                            ?.filter((el) => el.seller.id == values.seller_id)
                            .map((el) => {
                              return (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              );
                            })}
                        </TextField>
                        {touched.product_id && errors.product_id && (
                          <FormHelperText error id='text-product-id'>
                            {errors.product_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LoadingButton
                  loading={isLoading}
                  disableElevation
                  disabled={isSubmitting || !dirty || !isValid}
                  type='submit'
                  variant='contained'
                  sx={{ backgroundColor: Colors.primaryColor }}
                >
                  Save details
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddNewOrderFields;
