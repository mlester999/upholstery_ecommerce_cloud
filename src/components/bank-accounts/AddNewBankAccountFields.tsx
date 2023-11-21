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
import { useCreateBankAccountMutation } from "../../services/crud-bank-account";
import { useGetSellersQuery } from "../../services/crud-seller";

const AddNewBankAccountFields = () => {
  const [createBankAccount, { isLoading }] = useCreateBankAccountMutation();
  const { data: sellersData } = useGetSellersQuery();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    contact_number: "",
    seller_id: "",
  };

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
          createBankAccount(values)
            .unwrap()
            .then((payload) => {
              navigate("/portal/bank-accounts");

              toast.success("Added Bank Account Successfully!", {
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
                subheader="Please fill in the input fields to add a bank account."
                title="Bank Account Information"
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

export default AddNewBankAccountFields;
