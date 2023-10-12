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
  Typography,
  Button,
  SvgIcon,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../../services/crud-product';
import { useGetSellersQuery } from '../../services/crud-seller';
import CloudArrowUpIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';
import { useGetCustomersQuery } from '../../services/crud-customer';
import { useUpdateOrderMutation } from '../../services/crud-order';

const EditOrderFields = (props) => {
  const { order } = props;
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const { data: customersData } = useGetCustomersQuery();
  const { data: sellersData } = useGetSellersQuery();
  const { data: productsData } = useGetProductsQuery();
  const navigate = useNavigate();

  const initialValues = {
    customer_id: order?.customer.id,
    seller_id: order?.seller.id,
    product_id: order?.product.id,
    status: order?.status,
  };

  function findChangedProperties(oldObj, newObj, id: number | undefined) {
    const changedProperties = {};

    // Iterate through the keys of newObj
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        // Check if the key exists in oldObj and the values are different
        if (oldObj[key] !== newObj[key]) {
          changedProperties[key] = newObj[key];
        }
      }
    }

    changedProperties.id = id;

    return changedProperties;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          customer_id: Yup.string().required('Customer Name is required'),
          seller_id: Yup.string().required('Seller Name is required'),
          product_id: Yup.string().required('Product Name is required'),
          status: Yup.string().required('Delivery Status is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            order?.id
          );

          updateOrder(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate('/portal/orders');

              toast.success('Updated Order Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
              });
            })
            .catch((error) => setErrors({ customer_id: error.data?.message }));
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
                subheader='Please update the input fields to edit the order information.'
                title='Update Order Information'
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

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.status && errors.status)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.status && errors.status)}
                          label='Select Delivery Status'
                          name='status'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.status}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Processing'>Processing</option>
                          <option value='Packed'>Packed</option>
                          <option value='Shipped'>Shipped</option>
                          <option value='Out For Delivery'>
                            Out For Delivery
                          </option>
                          <option value='Delivered'>Delivered</option>
                        </TextField>
                        {touched.status && errors.status && (
                          <FormHelperText error id='text-order-id'>
                            {errors.status}
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
                  loading={updateLoading}
                  disableElevation
                  disabled={isSubmitting || !dirty || !isValid}
                  type='submit'
                  variant='contained'
                  sx={{ backgroundColor: Colors.primaryColor }}
                >
                  Update details
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditOrderFields;
