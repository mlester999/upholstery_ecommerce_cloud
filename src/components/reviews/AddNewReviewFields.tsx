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

const AddNewReviewFields = () => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { data: shopsData } = useGetShopsQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: customersData } = useGetCustomersQuery();
  const navigate = useNavigate();

  const initialValues = {
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
          shop_id: Yup.string().required("Shop is required"),
          product_id: Yup.string().required("Product is required"),
          customer_id: Yup.string().required("Customer is required"),
          comments: Yup.string().required("Comments is required"),
          ratings: Yup.number().required("Ratings is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
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
                        error={Boolean(touched.shop_id && errors.shop_id)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.shop_id && errors.shop_id)}
                          label="Select Shop"
                          name="shop_id"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("shop_id", e.target.value);

                            const checkProduct = productsData?.find((el) => {
                              return el.shop.id == e.target.value;
                            });

                            if (!checkProduct) {
                              setFieldValue("product_id", "");
                              setFieldError(
                                "product_id",
                                "Product is required"
                              );
                              setFieldTouched("product_id", true);
                            }
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.shop_id}
                        >
                          <option value="" disabled hidden></option>
                          {shopsData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.shop_id && errors.shop_id && (
                          <FormHelperText error id="text-shop-id">
                            {errors.shop_id}
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
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.product_id}
                        >
                          <option value="" disabled hidden></option>
                          {productsData
                            ?.filter((el) => {
                              return el.shop.id == values.shop_id;
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
                        error={Boolean(
                          touched.customer_id && errors.customer_id
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.customer_id && errors.customer_id
                          )}
                          label="Select Customer"
                          name="customer_id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.customer_id}
                        >
                          <option value="" disabled hidden></option>
                          {customersData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.first_name} {el.last_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.customer_id && errors.customer_id && (
                          <FormHelperText error id="text-customer-id">
                            {errors.customer_id}
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
