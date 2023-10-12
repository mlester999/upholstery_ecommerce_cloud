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
import { useUpdateShopMutation } from '../../services/crud-shop';
import { useGetSellersQuery } from '../../services/crud-seller';
import { toast } from 'react-toastify';

const EditShopFields = (props) => {
  const { shop } = props;
  const [updateShop, { isLoading: updateLoading }] = useUpdateShopMutation();
  const { data: sellersData } = useGetSellersQuery();
  const navigate = useNavigate();

  const initialValues = {
    seller_id: shop?.seller.id,
    name: shop?.name,
    description: shop?.description,
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
          seller_id: Yup.string().required('Seller is required'),
          name: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            shop?.id
          );

          updateShop(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate('/portal/shops');

              toast.success('Updated Shop Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
              });
            })
            .catch((error) => setErrors({ seller_id: error.data?.message }));
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
                subheader='Please update the input fields to edit the shop information.'
                title='Update Shop Information'
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
                        error={Boolean(touched.name && errors.name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                          label='Shop Name'
                          name='name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.name}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id='text-name'>
                            {errors.name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.description && errors.description
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          label='Description'
                          name='description'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.description}
                        />
                        {touched.description && errors.description && (
                          <FormHelperText error id='text-description'>
                            {errors.description}
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

export default EditShopFields;
