import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelectRegion } from '../../hooks/useSelectRegion';
import { useSelectProvince } from '../../hooks/useSelectProvince';
import { useSelectCity } from '../../hooks/useSelectCity';
import { useSelectBarangay } from '../../hooks/useSelectBarangay';
import SkeletonEditCustomerFields from './SkeletonEditCustomerFields';
import dayjs from 'dayjs';
import { useUpdateCustomerMutation } from '../../services/crud-customer';

const EditCustomerFields = (props) => {
  const { customer } = props;
  const [updateCustomer, { isLoading: updateLoading }] =
    useUpdateCustomerMutation();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const regions = useSelectRegion();
  const [provinces, setRegionCode] = useSelectProvince();
  const [cities, setProvinceCode] = useSelectCity();
  const [barangays, setCityCode] = useSelectBarangay();

  const initialValues = {
    first_name: customer?.first_name,
    middle_name: customer?.middle_name,
    last_name: customer?.last_name,
    email: customer?.user.email,
    contact_number: customer?.contact_number,
    gender: customer?.gender,
    birth_date: dayjs(customer?.birth_date),
    region: customer?.region,
    province: customer?.province,
    city: customer?.city,
    barangay: customer?.barangay,
    zip_code: customer?.zip_code,
    street_address: customer?.street_address,
  };

  const selectedRegion = regions?.find(
    (el) => el.region_name === initialValues.region
  );
  const selectedProvince = provinces?.find(
    (el) => el.province_name === initialValues.province
  );
  const selectedCity = cities?.find(
    (el) => el.city_name === initialValues.city
  );

  function findChangedProperties(
    oldObj,
    newObj,
    id: number | undefined,
    userId: number | undefined
  ) {
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
    changedProperties.user_id = userId;

    return changedProperties;
  }

  useEffect(() => {
    if (regions?.length > 0) {
      setRegionCode(selectedRegion?.region_code);
    }
  }, [regions]);

  useEffect(() => {
    if (provinces?.length > 0) {
      setProvinceCode(selectedProvince?.province_code);
    }
  }, [provinces]);

  useEffect(() => {
    if (cities?.length > 0) {
      setCityCode(selectedCity?.city_code);
    }
  }, [cities]);

  useEffect(() => {
    if (barangays?.length > 0) {
      setIsLoading(false);
    }
  }, [barangays]);

  if (isLoading) {
    return <SkeletonEditCustomerFields />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('First Name is required'),
          middle_name: Yup.string().notRequired(),
          last_name: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email Address is required'),
          contact_number: Yup.string()
            .matches(/^(09\d{9})?$/, 'Invalid Contact Number')
            .required('Contact Number is required'),
          gender: Yup.string()
            .oneOf(['Male', 'Female'], 'Invalid gender')
            .required('Gender is required'),
          birth_date: Yup.date()
            .required('Birth Date is required')
            .max(new Date(), 'Birth Date cannot be in the future'),
          region: Yup.string().required('Region is required'),
          province: Yup.string().required('Province is required'),
          city: Yup.string().required('City is required'),
          barangay: Yup.string().required('Barangay is required'),
          zip_code: Yup.string().required('Zip Code is required'),
          street_address: Yup.string().required('Street Address is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            customer?.id,
            customer?.user.id
          );

          updateCustomer(updatedValues)
            .unwrap()
            .then((payload) => navigate('/portal/customers'))
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please update the input fields to edit the customer information.'
                title='Update Customer Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.first_name && errors.first_name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.first_name && errors.first_name
                          )}
                          label='First Name'
                          name='first_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.first_name}
                        />
                        {touched.first_name && errors.first_name && (
                          <FormHelperText error id='text-first-name'>
                            {errors.first_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.middle_name && errors.middle_name
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.middle_name && errors.middle_name
                          )}
                          label='Middle Name (Optional)'
                          name='middle_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.middle_name}
                        />
                        {touched.middle_name && errors.middle_name && (
                          <FormHelperText error id='text-middle-name'>
                            {errors.middle_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.last_name && errors.last_name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.last_name && errors.last_name)}
                          label='Last Name'
                          name='last_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.last_name}
                        />
                        {touched.last_name && errors.last_name && (
                          <FormHelperText error id='text-last-name'>
                            {errors.last_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.gender && errors.gender)}
                          label='Select Gender'
                          name='gender'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.gender}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                        </TextField>
                        {touched.gender && errors.gender && (
                          <FormHelperText error id='text-gender'>
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.birth_date && errors.birth_date)}
                      >
                        <DatePicker
                          disableFuture
                          label='Select a Birth Date'
                          name='birth_date'
                          onBlur={handleBlur}
                          onChange={(value) =>
                            setFieldValue('birth_date', value, true)
                          }
                          required
                          value={values.birth_date}
                          slotProps={{
                            textField: {
                              error: Boolean(
                                touched.birth_date && errors.birth_date
                              ),
                            },
                          }}
                        />
                        {touched.birth_date && errors.birth_date && (
                          <FormHelperText error id='text-birth-date'>
                            {errors.birth_date}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          label='Email Address'
                          name='email'
                          type='email'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id='text-email-address'>
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
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
                          label='Contact Number'
                          name='contact_number'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.contact_number}
                        />
                        {touched.contact_number && errors.contact_number && (
                          <FormHelperText error id='text-contact-number'>
                            {errors.contact_number}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.region && errors.region)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.region && errors.region)}
                          label='Select Region'
                          name='region'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedRegion = regions?.find(
                              (el) => el.region_name === e.target.value
                            );

                            setRegionCode(selectedRegion.region_code);

                            setFieldValue('region', e.target.value);
                            setFieldValue('province', '');
                            setFieldValue('city', '');
                            setFieldValue('barangay', '');
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.region}
                        >
                          <option value='' disabled hidden></option>
                          {regions?.map((el) => {
                            return (
                              <option key={el.id} value={el.region_name}>
                                {el.region_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.region && errors.region && (
                          <FormHelperText error id='text-region'>
                            {errors.region}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.province && errors.province)}
                      >
                        <TextField
                          disabled={
                            Boolean(provinces?.length === 0) ||
                            Boolean(!values.region)
                          }
                          fullWidth
                          error={Boolean(touched.province && errors.province)}
                          label='Select Province'
                          name='province'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedProvince = provinces?.find(
                              (el) => el.province_name === e.target.value
                            );

                            setProvinceCode(selectedProvince.province_code);
                            setFieldValue('province', e.target.value);
                            setFieldValue('city', '');
                            setFieldValue('barangay', '');
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.province}
                        >
                          <option value='' disabled hidden></option>
                          {provinces?.map((el) => {
                            return (
                              <option key={el.id} value={el.province_name}>
                                {el.province_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.province && errors.province && (
                          <FormHelperText error id='text-province'>
                            {errors.province}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.city && errors.city)}
                      >
                        <TextField
                          disabled={
                            Boolean(cities?.length === 0) ||
                            Boolean(!values.province)
                          }
                          fullWidth
                          error={Boolean(touched.city && errors.city)}
                          label='Select City'
                          name='city'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedCity = cities?.find(
                              (el) => el.city_name === e.target.value
                            );

                            setCityCode(selectedCity.city_code);
                            setFieldValue('city', e.target.value);
                            setFieldValue('barangay', '');
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.city}
                        >
                          <option value='' disabled hidden></option>
                          {cities?.map((el) => {
                            return (
                              <option key={el.id} value={el.city_name}>
                                {el.city_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.city && errors.city && (
                          <FormHelperText error id='text-city'>
                            {errors.city}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.barangay && errors.barangay)}
                      >
                        <TextField
                          disabled={
                            Boolean(barangays?.length === 0) ||
                            Boolean(!values.city)
                          }
                          fullWidth
                          error={Boolean(touched.barangay && errors.barangay)}
                          label='Select Barangay'
                          name='barangay'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.barangay}
                        >
                          <option value='' disabled hidden></option>
                          {barangays?.map((el) => {
                            return (
                              <option key={el.id} value={el.brgy_name}>
                                {el.brgy_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.barangay && errors.barangay && (
                          <FormHelperText error id='text-barangay'>
                            {errors.barangay}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.zip_code && errors.zip_code)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.zip_code && errors.zip_code)}
                          label='Zip Code'
                          name='zip_code'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.zip_code}
                        />
                        {touched.zip_code && errors.zip_code && (
                          <FormHelperText error id='text-zip-code'>
                            {errors.zip_code}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.street_address && errors.street_address
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.street_address && errors.street_address
                          )}
                          label='Street Address'
                          name='street_address'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.street_address}
                        />
                        {touched.street_address && errors.street_address && (
                          <FormHelperText error id='text-street-address'>
                            {errors.street_address}
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
                  disabled={isSubmitting || !dirty}
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

export default EditCustomerFields;
