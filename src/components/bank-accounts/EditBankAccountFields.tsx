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
import { useUpdateBankAccountMutation } from "../../services/crud-bank-account";
import { toast } from "react-toastify";
import { useGetSellersQuery } from "../../services/crud-seller";

const EditBankAccountFields = (props) => {
  const { bankAccount } = props;
  const [updateBankAccount, { isLoading: updateLoading }] =
    useUpdateBankAccountMutation();
  const { data: sellersData } = useGetSellersQuery();
  const navigate = useNavigate();

  const initialValues = {
    name: bankAccount?.name,
    contact_number: bankAccount?.contact_number,
    seller_id: bankAccount?.seller.id,
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
          name: Yup.string().required("Name is required"),
          contact_number: Yup.string()
            .matches(/^(09\d{9})?$/, "Invalid Contact Number")
            .required("Contact Number is required"),
          seller_id: Yup.string().required("Seller is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            bankAccount?.id
          );

          updateBankAccount(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate("/portal/bank-accounts");

              toast.success("Updated Bank Account Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((error) => setErrors({ name: error.data?.message }));
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
                subheader="Please update the input fields to edit the bankAccount information."
                title="Update BankAccount Information"
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
                        error={Boolean(touched.name && errors.name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                          label="Select Bank Account"
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.name}
                        >
                          <option value="" disabled hidden></option>
                          <option value="GCash">GCash</option>
                          <option value="Grab Pay">Grab Pay</option>
                        </TextField>
                        {touched.name && errors.name && (
                          <FormHelperText error id="text-name">
                            {errors.name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.contact_number && errors.contact_number
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.contact_number && errors.contact_number
                          )}
                          label="Account Number"
                          name="contact_number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.contact_number}
                        />
                        {touched.contact_number && errors.contact_number && (
                          <FormHelperText error id="text-contact-number">
                            {errors.contact_number}
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

export default EditBankAccountFields;
