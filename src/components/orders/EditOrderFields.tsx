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
import { useGetShopsQuery } from '../../services/crud-shop';
import CloudArrowUpIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';
import { useGetCustomersQuery } from '../../services/crud-customer';
import { useUpdateOrderMutation } from '../../services/crud-order';

const EditOrderFields = (props) => {
  const {
    orderId,
    orderCustomer,
    orderShops,
    orderProducts,
    orderStatus,
    orderQuantity,
  } = props;
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const { data: customersData } = useGetCustomersQuery();
  const { data: shopsData } = useGetShopsQuery();
  const { data: productsData } = useGetProductsQuery();
  const navigate = useNavigate();

  const initialValues = {
    customer_id: orderCustomer,
    shops: orderShops,
    products: orderProducts,
    status: orderStatus,
    quantity: orderQuantity,
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
          shops: Yup.array().of(Yup.string().required('Shop Name is required')),
          products: Yup.array().of(
            Yup.string().required('Product is required')
          ),
          quantity: Yup.array().of(
            Yup.string().required('Quantity is required')
          ),
          status: Yup.array().of(
            Yup.string().required('Delivery Status is required')
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            orderId
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
                    <Grid xs={12} md={12}>
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
                          <FormHelperText error id={`text-customer-id`}>
                            {errors.customer_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  {Array.from({ length: orderProducts.length }, (_, index) => (
                    <Grid container spacing={3}>
                      <Grid xs={12} md={3}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched?.shops &&
                              errors?.shops &&
                              touched.shops[index] &&
                              errors.shops[index]
                          )}
                        >
                          <TextField
                            fullWidth
                            error={Boolean(
                              touched?.shops &&
                                errors?.shops &&
                                touched.shops[index] &&
                                errors.shops[index]
                            )}
                            label='Select Shop'
                            name={`shops[${index}]`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.shops[index] || ''}
                          >
                            <option value='' disabled hidden></option>
                            {shopsData?.map((el) => {
                              return (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              );
                            })}
                          </TextField>
                          {touched?.shops &&
                            errors?.shops &&
                            touched.shops[index] &&
                            errors.shops[index] && (
                              <FormHelperText error id='text-shop-id'>
                                {errors.shops[index]}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={3}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched?.products &&
                              errors?.products &&
                              touched.products[index] &&
                              errors.products[index]
                          )}
                        >
                          <TextField
                            disabled={!values.shops[index]}
                            fullWidth
                            error={Boolean(
                              touched?.products &&
                                errors?.products &&
                                touched.products[index] &&
                                errors.products[index]
                            )}
                            label='Select Product'
                            name={`products[${index}]`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.products[index] || ''}
                          >
                            <option value='' disabled hidden></option>
                            {productsData
                              ?.filter(
                                (el) => el.shop.id == values.shops[index]
                              )
                              .map((el) => {
                                return (
                                  <option key={el.id} value={el.id}>
                                    {el.name}
                                  </option>
                                );
                              })}
                          </TextField>
                          {touched?.products &&
                            errors?.products &&
                            touched.products[index] &&
                            errors.products[index] && (
                              <FormHelperText error id='text-product-id'>
                                {errors.products[index]}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={3}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched?.quantity &&
                              errors?.quantity &&
                              touched.quantity[index] &&
                              errors.quantity[index]
                          )}
                        >
                          <TextField
                            fullWidth
                            error={Boolean(
                              touched?.quantity &&
                                errors?.quantity &&
                                touched.quantity[index] &&
                                errors.quantity[index]
                            )}
                            label='Quantity'
                            name={`quantity[${index}]`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            value={values.quantity[index] || ''}
                            type='number'
                          />
                          {touched?.quantity &&
                            errors?.quantity &&
                            touched.quantity[index] &&
                            errors.quantity[index] && (
                              <FormHelperText error id='text-product-quantity'>
                                {errors.quantity[index]}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={3}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched?.status &&
                              errors?.status &&
                              touched.status[index] &&
                              errors.status[index]
                          )}
                        >
                          <TextField
                            fullWidth
                            error={Boolean(
                              touched?.status &&
                                errors?.status &&
                                touched.status[index] &&
                                errors.status[index]
                            )}
                            label='Select Delivery Status'
                            name={`status[${index}]`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.status[index] || ''}
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
                          {touched?.status &&
                            errors?.status &&
                            touched.status[index] &&
                            errors.status[index] && (
                              <FormHelperText error id='text-order-id'>
                                {errors.status}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  ))}
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
