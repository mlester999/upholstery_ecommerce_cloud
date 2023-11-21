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
import { toast } from "react-toastify";
import { useUpdateSellerWithdrawalMutation } from "../../services/crud-seller-withdrawal";
import { useGetSellersQuery } from "../../services/crud-seller";

const EditSellerWithdrawalFields = (props) => {
  const { sellerWithdrawal } = props;
  const [updateSellerWithdrawal, { isLoading: updateLoading }] =
    useUpdateSellerWithdrawalMutation();
  const { data: sellersData } = useGetSellersQuery();
  const navigate = useNavigate();

  const initialValues = {
    seller_id: sellerWithdrawal?.seller.id,
    amount: sellerWithdrawal?.amount,
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
          seller_id: Yup.string().required("Seller is required"),
          amount: Yup.number().required("Amount is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            sellerWithdrawal?.id
          );

          updateSellerWithdrawal(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate("/portal/seller-withdrawals");

              toast.success("Updated Seller Withdrawal Successfully!", {
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="Please update the input fields to edit the seller withdrawal information."
                title="Update Seller Withdrawal Information"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.seller_id && errors.seller_id)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.seller_id && errors.seller_id)}
                          label="Select Seller"
                          name="seller_id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.seller_id}
                        >
                          <option value="" disabled hidden></option>
                          {sellersData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.first_name} {el.last_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.seller_id && errors.seller_id && (
                          <FormHelperText error id="text-seller-id">
                            {errors.seller_id}
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

export default EditSellerWithdrawalFields;
