import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Chip,
    Avatar,
    useTheme,
} from '@mui/material';
import {
    LocalHospital,
    Add,
    Search,
    FilterList,
    MoreVert,
} from '@mui/icons-material';

const HospitalsPage: React.FC = () => {
    const theme = useTheme();

    const mockHospitals = [
        {
            id: 1,
            name: 'City General Hospital',
            type: 'Public',
            level: 'Tertiary',
            status: 'Active',
            patients: 1250,
            specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
        },
        {
            id: 2,
            name: 'Metro Medical Center',
            type: 'Private',
            level: 'Secondary',
            status: 'Active',
            patients: 890,
            specialties: ['Pediatrics', 'Gynecology'],
        },
        {
            id: 3,
            name: 'Community Health Clinic',
            type: 'Clinic',
            level: 'Primary',
            status: 'Pending',
            patients: 340,
            specialties: ['General Medicine'],
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Inactive':
                return 'error';
            default:
                return 'default';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Public':
                return 'primary';
            case 'Private':
                return 'secondary';
            case 'Clinic':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Hospital Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage hospitals, view statistics, and oversee operations
                    </Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Search />}
                        sx={{ minWidth: 120 }}
                    >
                        Search
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        sx={{ minWidth: 120 }}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ minWidth: 140 }}
                    >
                        Add Hospital
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        Total Hospitals
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockHospitals.length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <LocalHospital />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        Active Hospitals
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockHospitals.filter(h => h.status === 'Active').length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <LocalHospital />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        Total Patients
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockHospitals.reduce((sum, h) => sum + h.patients, 0).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <LocalHospital />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        Pending Approval
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockHospitals.filter(h => h.status === 'Pending').length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <LocalHospital />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Hospitals List */}
            <Typography variant="h5" component="h2" gutterBottom mb={3}>
                Hospital Directory
            </Typography>
            <Grid container spacing={3}>
                {mockHospitals.map((hospital) => (
                    <Grid item xs={12} md={6} lg={4} key={hospital.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: theme.shadows[8],
                                },
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                        <LocalHospital />
                                    </Avatar>
                                    <Box flexGrow={1}>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {hospital.name}
                                        </Typography>
                                        <Box display="flex" gap={1} mb={1}>
                                            <Chip
                                                label={hospital.type}
                                                color={getTypeColor(hospital.type) as any}
                                                size="small"
                                            />
                                            <Chip
                                                label={hospital.level}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Box>
                                        <Chip
                                            label={hospital.status}
                                            color={getStatusColor(hospital.status) as any}
                                            size="small"
                                        />
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Patients:</strong> {hospital.patients.toLocaleString()}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Specialties:</strong>
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                                    {hospital.specialties.map((specialty, index) => (
                                        <Chip
                                            key={index}
                                            label={specialty}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Details
                                </Button>
                                <Button size="small" color="secondary">
                                    Edit
                                </Button>
                                <Button size="small">
                                    <MoreVert />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Empty State */}
            {mockHospitals.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                            <LocalHospital sx={{ fontSize: 32, color: 'grey.500' }} />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            No hospitals found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Get started by adding your first hospital to the system.
                        </Typography>
                        <Button variant="contained" startIcon={<Add />}>
                            Add Hospital
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default HospitalsPage;
