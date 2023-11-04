import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
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
  Button,
  SvgIcon,
  FormHelperText,
  Unstable_Grid2 as Grid,
  Container,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCustomersQuery } from '../../services/crud-customer';
import { useGetShopsQuery } from '../../services/crud-shop';
import { useCreateOrderMutation } from '../../services/crud-order';
import { useGetProductsQuery } from '../../services/crud-product';

const AddNewOrderFields = () => {
  const [totalOrders, setTotalOrders] = useState(1);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: customersData } = useGetCustomersQuery();
  const { data: shopsData } = useGetShopsQuery();
  const { data: productsData } = useGetProductsQuery();
  const navigate = useNavigate();

  const initialValues = {
    customer_id: '',
    shops: Array(totalOrders).fill(''),
    products: Array(totalOrders).fill(''),
    quantity: Array(totalOrders).fill(''),
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          customer_id: Yup.string().required('Customer Name is required'),
          shops: Yup.array().of(Yup.string().required('Shop Name is required')),
          products: Yup.array().of(
            Yup.string().required('Product is required')
          ),
          quantity: Yup.array().of(
            Yup.string().required('Quantity is required')
          ),
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
        }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <Card>
                <CardHeader
                  subheader='Please fill in the input fields to add a order.'
                  title='Order Information'
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

                    {Array.from({ length: totalOrders }, (_, index) => (
                      <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
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

                        <Grid xs={12} md={4}>
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

                        <Grid xs={12} md={4}>
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
                                <FormHelperText
                                  error
                                  id='text-product-quantity'
                                >
                                  {errors.quantity[index]}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    ))}

                    <Button
                      onClick={() => setTotalOrders((prev) => prev + 1)}
                      startIcon={
                        <SvgIcon fontSize='small'>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      sx={{
                        mt: 2,
                        ml: 'auto',
                        color: Colors.primaryColor,
                      }}
                    >
                      Add More
                    </Button>
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
          );
        }}
      </Formik>
    </>
  );
};

export default AddNewOrderFields;
