import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Colors from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../../services/crud-review";
import { useGetShopsQuery } from "../../services/crud-shop";
import { useGetProductsQuery } from "../../services/crud-product";
import { useGetCustomersQuery } from "../../services/crud-customer";
import { useGetOrdersQuery } from "../../services/crud-order";

const AddNewReviewFields = () => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { data: ordersData } = useGetOrdersQuery();
  const { data: shopsData } = useGetShopsQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: customersData } = useGetCustomersQuery();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    order_id: "",
    shop_id: "",
    product_id: "",
    customer_id: "",
    comments: "",
    ratings: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          order_id: Yup.string().required("Order is required"),
          shop_id: Yup.string().required("Shop is required"),
          product_id: Yup.string().required("Product is required"),
          customer_id: Yup.string().required("Customer is required"),
          comments: Yup.string().required("Comments is required"),
          ratings: Yup.number()
            .required("Ratings is required")
            .oneOf([1, 2, 3, 4, 5], "Ratings must be 1, 2, 3, 4, or 5"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          createReview(values)
            .unwrap()
            .then((payload) => {
              navigate("/portal/reviews");

              toast.success("Added Review Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((error) => console.log(error));
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
          setFieldError,
          setFieldTouched,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="Please fill in the input fields to add a review."
                title="Review Information"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.order_id && errors.order_id)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.order_id && errors.order_id)}
                          label="Select Order"
                          name="order_id"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("order_id", e.target.value);

                            const findOrder = ordersData?.find((el) => {
                              return el.order_id == e.target.value;
                            });

                            setFieldValue("customer_id", findOrder.customer.id);

                            setOrderedProducts(JSON.parse(findOrder.products));
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.order_id}
                        >
                          <option value="" disabled hidden></option>
                          {ordersData?.map((el) => {
                            return (
                              <option key={el.id} value={el.order_id}>
                                {el.order_id}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.order_id && errors.order_id && (
                          <FormHelperText error id="text-order-id">
                            {errors.order_id}
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
                          label="Select Product"
                          name="product_id"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("product_id", e.target.value);

                            const findProduct = productsData?.find((el) => {
                              return el.id == e.target.value;
                            });

                            setFieldValue("shop_id", findProduct.shop.id);
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.product_id}
                          disabled={!values.order_id}
                        >
                          <option value="" disabled hidden></option>
                          {orderedProducts
                            ?.filter((el) => {
                              console.log(el);
                              return (
                                el.status == "Delivered" && el.order_received
                              );
                            })
                            .map((el) => {
                              return (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              );
                            })}
                        </TextField>
                        {touched.product_id && errors.product_id && (
                          <FormHelperText error id="text-product-id">
                            {errors.product_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.comments && errors.comments)}
                      >
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          error={Boolean(touched.comments && errors.comments)}
                          label="Comments"
                          name="comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.comments}
                        />
                        {touched.comments && errors.comments && (
                          <FormHelperText error id="text-comments">
                            {errors.comments}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.ratings && errors.ratings)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.ratings && errors.ratings)}
                          label="Ratings (1 to 5)"
                          name="ratings"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.ratings}
                          type="number"
                          inputProps={{ min: 1, max: 5 }}
                        />
                        {touched.ratings && errors.ratings && (
                          <FormHelperText error id="text-product-ratings">
                            {errors.ratings}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <LoadingButton
                  loading={isLoading}
                  disableElevation
                  disabled={isSubmitting || !dirty || !isValid}
                  type="submit"
                  variant="contained"
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

export default AddNewReviewFields;
