import React, { useState } from 'react';
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
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material';
import {
    People,
    Add,
    Search,
    FilterList,
    MoreVert,
    Person,
    LocalHospital,
    Assignment,
    Phone,
    Email,
} from '@mui/icons-material';

const PatientsPage: React.FC = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

    const mockPatients = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            age: 45,
            gender: 'Male',
            phone: '+1 (555) 123-4567',
            email: 'john.doe@email.com',
            bloodType: 'O+',
            lastVisit: '2024-01-15',
            status: 'Active',
            hospital: 'City General Hospital',
            conditions: ['Hypertension', 'Diabetes'],
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            age: 32,
            gender: 'Female',
            phone: '+1 (555) 987-6543',
            email: 'jane.smith@email.com',
            bloodType: 'A-',
            lastVisit: '2024-01-10',
            status: 'Active',
            hospital: 'Metro Medical Center',
            conditions: ['Asthma'],
        },
        {
            id: 3,
            firstName: 'Robert',
            lastName: 'Johnson',
            age: 67,
            gender: 'Male',
            phone: '+1 (555) 456-7890',
            email: 'robert.j@email.com',
            bloodType: 'B+',
            lastVisit: '2024-01-05',
            status: 'Inactive',
            hospital: 'Community Health Clinic',
            conditions: ['Arthritis', 'Heart Disease'],
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Inactive':
                return 'error';
            case 'Pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getGenderIcon = (gender: string) => {
        return <Person sx={{ fontSize: 20 }} />;
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, patientId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedPatient(patientId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPatient(null);
    };

    const filteredPatients = mockPatients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    );

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Patient Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage patient records, view medical history, and track referrals
                    </Typography>
                </Box>
                <Box display="flex" gap={2}>
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
                        Add Patient
                    </Button>
                </Box>
            </Box>

            {/* Search Bar */}
            <Box mb={4}>
                <TextField
                    fullWidth
                    placeholder="Search patients by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 600 }}
                />
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        Total Patients
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockPatients.length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <People />
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
                                        Active Patients
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockPatients.filter(p => p.status === 'Active').length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <People />
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
                                        New This Month
                                    </Typography>
                                    <Typography variant="h4">
                                        12
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <People />
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
                                        Pending Referrals
                                    </Typography>
                                    <Typography variant="h4">
                                        8
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <Assignment />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Patients Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Patient Directory
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Contact</TableCell>
                                    <TableCell>Age/Gender</TableCell>
                                    <TableCell>Blood Type</TableCell>
                                    <TableCell>Hospital</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Last Visit</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id} hover>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {patient.firstName} {patient.lastName}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        ID: {patient.id.toString().padStart(6, '0')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Box display="flex" alignItems="center" mb={0.5}>
                                                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                    <Typography variant="body2">
                                                        {patient.phone}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" alignItems="center">
                                                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                    <Typography variant="body2">
                                                        {patient.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                {getGenderIcon(patient.gender)}
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    {patient.age} / {patient.gender}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={patient.bloodType}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <LocalHospital sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {patient.hospital}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={patient.status}
                                                color={getStatusColor(patient.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {new Date(patient.lastVisit).toLocaleDateString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, patient.id)}
                                                size="small"
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <Person sx={{ mr: 1 }} fontSize="small" />
                    View Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Assignment sx={{ mr: 1 }} fontSize="small" />
                    View Referrals
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <LocalHospital sx={{ mr: 1 }} fontSize="small" />
                    Medical History
                </MenuItem>
            </Menu>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                            <People sx={{ fontSize: 32, color: 'grey.500' }} />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            {searchTerm ? 'No patients found' : 'No patients yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {searchTerm
                                ? 'Try adjusting your search criteria.'
                                : 'Get started by adding your first patient to the system.'
                            }
                        </Typography>
                        <Button variant="contained" startIcon={<Add />}>
                            Add Patient
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default PatientsPage;
