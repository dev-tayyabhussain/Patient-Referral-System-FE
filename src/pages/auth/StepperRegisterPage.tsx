import React, { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import RoleSelectionStep from '../../components/auth/RoleSelectionStep';
import PersonalInfoStep from '../../components/auth/PersonalInfoStep';
import ProfessionalInfoStep from '../../components/auth/ProfessionalInfoStep';
import PasswordStep from '../../components/auth/PasswordStep';
import { authAPI } from '../../utils/api';
import { RegisterData } from '../../types/auth';

const steps = ['Role', 'Personal Info', 'Professional Info', 'Password'];

const createValidationSchema = (selectedRole: string) => {
    const baseSchema = {
        role: yup.string().required('Please select a role'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string().required('Phone number is required'),
        dateOfBirth: yup.string().required('Date of birth is required'),
        address: yup.string().required('Address is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    };

    // Add role-specific validations
    if (selectedRole === 'doctor') {
        return yup.object({
            ...baseSchema,
            gender: yup.string().required('Gender is required'),
            hospitalId: yup.string().required('Hospital selection is required'),
            specialization: yup.string().required('Specialization is required'),
            licenseNumber: yup.string().required('Medical license number is required'),
            experience: yup.number().required('Experience is required'),
            qualification: yup.string().required('Qualification is required'),
        });
    }

    if (selectedRole === 'hospital_admin') {
        return yup.object({
            ...baseSchema,
            hospitalId: yup.string().required('Hospital selection is required'),
            department: yup.string().required('Department is required'),
            position: yup.string().required('Position is required'),
        });
    }

    if (selectedRole === 'patient') {
        return yup.object({
            ...baseSchema,
            gender: yup.string().required('Gender is required'),
        });
    }

    return yup.object(baseSchema);
};

const StepperRegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = useMemo(() => createValidationSchema(selectedRole), [selectedRole]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

    const handleNext = async () => {
        const fieldsToValidate = getFieldsForStep(activeStep);
        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getFieldsForStep = (step: number): string[] => {
        switch (step) {
            case 0:
                return ['role'];
            case 1:
                const personalFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address'];
                if (selectedRole !== 'hospital_admin') {
                    personalFields.push('gender');
                }
                return personalFields;
            case 2:
                if (selectedRole === 'doctor') {
                    return ['hospitalId', 'specialization', 'licenseNumber', 'experience', 'qualification'];
                }
                if (selectedRole === 'hospital_admin') {
                    return ['hospitalId', 'department', 'position'];
                }
                return [];
            case 3:
                return ['password', 'confirmPassword'];
            default:
                return [];
        }
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const registerData: RegisterData = {
                ...data,
                role: selectedRole as 'patient' | 'doctor' | 'hospital_admin' | 'super_admin',
            };

            await authAPI.register(registerData);
            toast.success('Registration successful! Please check your email for verification.');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <RoleSelectionStep
                        selectedRole={selectedRole}
                        onRoleChange={(role) => {
                            setSelectedRole(role);
                            reset({ role });
                        }}
                        error={errors.role?.message}
                    />
                );
            case 1:
                return (
                    <PersonalInfoStep
                        control={control}
                        errors={errors}
                        selectedRole={selectedRole}
                    />
                );
            case 2:
                return (
                    <ProfessionalInfoStep
                        control={control}
                        errors={errors}
                        selectedRole={selectedRole}
                    />
                );
            case 3:
                return (
                    <PasswordStep
                        control={control}
                        errors={errors}
                        showPassword={showPassword}
                        showConfirmPassword={showConfirmPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                );
            default:
                return null;
        }
    };

    const isStepOptional = (step: number) => {
        return step === 2 && (selectedRole === 'patient' || selectedRole === 'super_admin');
    };

    const canProceed = () => {
        if (activeStep === 0) return selectedRole !== '';
        if (activeStep === 2 && (selectedRole === 'patient' || selectedRole === 'super_admin')) return true;
        return true;
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1988C8 0%, #339164 100%)',
                p: 2,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 4,
                    maxWidth: 800,
                    width: '100%',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#1988C8' }}>
                    Create Account
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel optional={isStepOptional(index) && <Typography variant="caption">Optional</Typography>}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mb: 4 }}>
                    {renderStepContent(activeStep)}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#1988C8',
                                '&:hover': { backgroundColor: '#1976D2' },
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={!canProceed()}
                            sx={{
                                backgroundColor: '#1988C8',
                                '&:hover': { backgroundColor: '#1976D2' },
                            }}
                        >
                            Next
                        </Button>
                    )}
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Button
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ color: '#1988C8', textTransform: 'none' }}
                        >
                            Sign In
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default StepperRegisterPage;
