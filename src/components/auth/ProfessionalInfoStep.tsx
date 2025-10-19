import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { hospitalApi } from '../../utils/approvalApi';
import { Hospital } from '../../types/hospital';

interface ProfessionalInfoStepProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  selectedRole: string;
}

const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
  control,
  errors,
  selectedRole,
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  useEffect(() => {
    if (selectedRole === 'doctor' || selectedRole === 'hospital_admin') {
      loadHospitals();
    }
  }, [selectedRole]);

  const loadHospitals = async () => {
    try {
      setLoadingHospitals(true);
      const response = await hospitalApi.getApprovedHospitals();
      setHospitals(response.data);
    } catch (error) {
      console.error('Error loading hospitals:', error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  if (selectedRole === 'patient' || selectedRole === 'super_admin') {
    return null;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {(selectedRole === 'doctor' || selectedRole === 'hospital_admin') && (
          <Grid item xs={12}>
            <Controller
              name="hospitalId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={hospitals}
                  getOptionLabel={(option) =>
                    typeof option === 'string' ? option : `${option.name} - ${option.address.city}, ${option.address.state}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    typeof option === 'string' ? option === value : option._id === value?._id
                  }
                  loading={loadingHospitals}
                  value={hospitals.find(h => h._id === field.value) || null}
                  onChange={(_, value) => {
                    field.onChange(value?._id || '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      label="Select Hospital"
                      error={!!errors.hospitalId}
                      helperText={errors.hospitalId?.message || "Select the hospital you'll be associated with"}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingHospitals ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        )}

        {selectedRole === 'doctor' && (
          <>
            <Grid item xs={12} sm={6}>
              <Controller
                name="specialization"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Specialization"
                    required
                    error={!!errors.specialization}
                    helperText={errors.specialization?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="licenseNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Medical License Number"
                    required
                    error={!!errors.licenseNumber}
                    helperText={errors.licenseNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.experience}>
                    <InputLabel>Years of Experience</InputLabel>
                    <Select {...field} label="Years of Experience">
                      {Array.from({ length: 50 }, (_, i) => i + 1).map((year) => (
                        <MenuItem key={year} value={year}>
                          {year} {year === 1 ? 'year' : 'years'}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.experience && (
                      <FormHelperText>{errors.experience.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Qualification"
                    required
                    error={!!errors.qualification}
                    helperText={errors.qualification?.message}
                  />
                )}
              />
            </Grid>
          </>
        )}

        {selectedRole === 'hospital_admin' && (
          <>
            <Grid item xs={12} sm={6}>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Department"
                    required
                    error={!!errors.department}
                    helperText={errors.department?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Position"
                    required
                    error={!!errors.position}
                    helperText={errors.position?.message}
                  />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProfessionalInfoStep;
