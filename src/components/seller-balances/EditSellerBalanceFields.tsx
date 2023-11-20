import { Formik } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Colors from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { useUpdateSellerBalanceMutation } from "../../services/crud-seller-balance";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../services/crud-product";
import { useGetShopsQuery } from "../../services/crud-shop";

const EditSellerBalanceFields = (props) => {
  const { sellerBalance } = props;
  const [updateSellerBalance, { isLoading: updateLoading }] =
    useUpdateSellerBalanceMutation();
  const { data: shopsData } = useGetShopsQuery();
  const { data: productsData } = useGetProductsQuery();
  const navigate = useNavigate();

  const initialValues = {
    shop_id: sellerBalance?.shop.id,
    product_id: sellerBalance?.product.id,
    amount: sellerBalance?.amount,
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
          shop_id: Yup.string().required("Shop is required"),
          product_id: Yup.string().required("Product is required"),
          amount: Yup.number().required("Amount is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            sellerBalance?.id
          );

          updateSellerBalance(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate("/portal/seller-balances");

              toast.success("Updated Seller Balance Successfully!", {
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
          isValid,
          isSubmitting,
          touched,
          values,
          dirty,
          setFieldValue,
          setFieldError,
          setFieldTouched,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="Please update the input fields to edit the seller balance information."
                title="Update Seller Balance Information"
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
                            } else {
                              setFieldValue("product_id", "1");
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
                        error={Boolean(touched.amount && errors.amount)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.amount && errors.amount)}
                          label="Amount"
                          name="amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.amount}
                        />
                        {touched.amount && errors.amount && (
                          <FormHelperText error id="text-amount">
                            {errors.amount}
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
                  loading={updateLoading}
                  disableElevation
                  disabled={isSubmitting || !dirty || !isValid}
                  type="submit"
                  variant="contained"
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

export default EditSellerBalanceFields;
