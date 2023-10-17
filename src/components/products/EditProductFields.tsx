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
import { useUpdateProductMutation } from '../../services/crud-product';
import { useGetCategoriesQuery } from '../../services/crud-category';
import { useGetShopsQuery } from '../../services/crud-shop';
import CloudArrowUpIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';

const EditProductFields = (props) => {
  const { product } = props;
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: shopsData } = useGetShopsQuery();
  const [imagePreview, setImagePreview] = useState(product?.image_file);
  const [imageFileName, setImageFileName] = useState(
    product?.image_name.replace(/^[^-]+-/, '')
  );
  const navigate = useNavigate();

  const initialValues = {
    name: product?.name,
    description: product?.description,
    price: product?.price,
    category_id: product?.category.id,
    shop_id: product?.shop.id,
    image_file: product?.image_file,
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
          name: Yup.string().required('Product Name is required'),
          description: Yup.string().required('Description is required'),
          price: Yup.number().required('Price is required'),
          category_id: Yup.string().required('Category is required'),
          shop_id: Yup.string().required('Seller Name is required'),
          image_file: Yup.string().required('Image is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            product?.id
          );

          updateProduct(updatedValues)
            .unwrap()
            .then((payload) => {
              navigate('/portal/products');

              toast.success('Updated Product Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please update the input fields to edit the product information.'
                title='Update Product Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                          label='Product Name'
                          name='name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.name}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id='text-product-name'>
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
                          multiline
                          rows={3}
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
                          <FormHelperText error id='text-product-description'>
                            {errors.description}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.price && errors.price)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.price && errors.price)}
                          label='Price'
                          name='price'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.price}
                          type='number'
                        />
                        {touched.price && errors.price && (
                          <FormHelperText error id='text-product-price'>
                            {errors.price}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.category_id && errors.category_id
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.category_id && errors.category_id
                          )}
                          label='Select Category'
                          name='category_id'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.category_id}
                        >
                          <option value='' disabled hidden></option>
                          {categoriesData?.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.title}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.category_id && errors.category_id && (
                          <FormHelperText error id='text-category-id'>
                            {errors.category_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.shop_id && errors.shop_id)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.shop_id && errors.shop_id)}
                          label='Select Shop'
                          name='shop_id'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.shop_id}
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
                        {touched.shop_id && errors.shop_id && (
                          <FormHelperText error id='text-seller-id'>
                            {errors.shop_id}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.image_file && errors.image_file)}
                      >
                        <Box
                          display='flex'
                          textAlign='center'
                          alignItems='center'
                          justifyContent='center'
                          flexDirection='column'
                          gap={2}
                          sx={{
                            marginY: '16px',
                          }}
                        >
                          <Box
                            component='img'
                            sx={{
                              height: 300,
                              width: 300,
                            }}
                            alt='Product Image'
                            src={imagePreview}
                          />

                          {imageFileName && (
                            <Typography
                              fontWeight={500}
                              color='text.primary'
                              variant='body1'
                            >
                              File Name: {imageFileName}
                            </Typography>
                          )}
                        </Box>

                        <Button
                          variant='contained'
                          component='label'
                          sx={{ backgroundColor: Colors.primaryColor }}
                        >
                          <SvgIcon fontSize='small' sx={{ marginX: '4px' }}>
                            <CloudArrowUpIcon />
                          </SvgIcon>
                          Upload Product Image
                          <input
                            name='avatar'
                            accept='image/*'
                            id='contained-button-file'
                            type='file'
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview(fileReader.result);
                                  setFieldValue(
                                    'image_file',
                                    e.target.files[0]
                                  );
                                  setImageFileName(e.target.files[0].name);

                                  console.log(values.image_file);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </Button>
                        {touched.image_file && errors.image_file && (
                          <FormHelperText error id='text-product-image-file'>
                            {errors.image_file}
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

export default EditProductFields;
