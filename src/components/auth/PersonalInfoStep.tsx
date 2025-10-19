import React from 'react';
import {
    Box,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface PersonalInfoStepProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    selectedRole: string;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
    control,
    errors,
    selectedRole,
}) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="First Name"
                                required
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Last Name"
                                required
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Email Address"
                                type="email"
                                required
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Phone Number"
                                required
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                required
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth?.message}
                            />
                        )}
                    />
                </Grid>
                {selectedRole !== 'hospital_admin' && (
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth required error={!!errors.gender}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select {...field} label="Gender">
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                    {errors.gender && (
                                        <FormHelperText>{errors.gender.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Address"
                                multiline
                                rows={3}
                                required
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfoStep;
