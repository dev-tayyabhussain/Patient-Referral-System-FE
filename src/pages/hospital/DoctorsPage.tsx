import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Grid,
    Avatar,
    Menu,
    ListItemIcon,
    ListItemText,
    Badge,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    MedicalServices as MedicalIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Schedule as ScheduleIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

const DoctorsPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');

    // Mock data
    const [doctors, setDoctors] = useState([
        {
            id: '1',
            firstName: 'Dr. Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@hospital.com',
            specialty: 'Cardiology',
            licenseNumber: 'MD12345',
            phone: '+1-555-0123',
            status: 'Active',
            patients: 45,
            experience: 8,
            lastActivity: '2024-01-15 10:30',
            nextAppointment: '2024-01-16 09:00',
        },
        {
            id: '2',
            firstName: 'Dr. Michael',
            lastName: 'Chen',
            email: 'michael.chen@hospital.com',
            specialty: 'Neurology',
            licenseNumber: 'MD67890',
            phone: '+1-555-0124',
            status: 'Active',
            patients: 32,
            experience: 12,
            lastActivity: '2024-01-15 09:15',
            nextAppointment: '2024-01-16 10:30',
        },
        {
            id: '3',
            firstName: 'Dr. Emily',
            lastName: 'Rodriguez',
            email: 'emily.rodriguez@hospital.com',
            specialty: 'Pediatrics',
            licenseNumber: 'MD54321',
            phone: '+1-555-0125',
            status: 'On Leave',
            patients: 28,
            experience: 6,
            lastActivity: '2024-01-14 16:45',
            nextAppointment: null,
        },
        {
            id: '4',
            firstName: 'Dr. David',
            lastName: 'Kim',
            email: 'david.kim@hospital.com',
            specialty: 'Orthopedics',
            licenseNumber: 'MD98765',
            phone: '+1-555-0126',
            status: 'Active',
            patients: 38,
            experience: 15,
            lastActivity: '2024-01-15 08:30',
            nextAppointment: '2024-01-16 14:00',
        },
    ]);

    const specialties = [
        'Cardiology',
        'Neurology',
        'Pediatrics',
        'Orthopedics',
        'Dermatology',
        'Oncology',
        'Psychiatry',
        'Surgery',
        'Internal Medicine',
        'Emergency Medicine',
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'On Leave':
                return 'warning';
            case 'Inactive':
                return 'error';
            default:
                return 'default';
        }
    };

    const getSpecialtyColor = (specialty: string) => {
        const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
        const index = specialties.indexOf(specialty) % colors.length;
        return colors[index];
    };

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
        return matchesSearch && matchesSpecialty;
    });

    const handleOpenDialog = (type: 'add' | 'edit', doctor?: any) => {
        setDialogType(type);
        setSelectedDoctor(doctor || null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDoctor(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, doctor: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedDoctor(doctor);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDoctor(null);
    };

    const handleDeleteDoctor = (doctorId: string) => {
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
        handleMenuClose();
    };

    const handleToggleStatus = (doctorId: string) => {
        setDoctors(doctors.map(doctor =>
            doctor.id === doctorId
                ? { ...doctor, status: doctor.status === 'Active' ? 'Inactive' : 'Active' }
                : doctor
        ));
        handleMenuClose();
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Doctor Management
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Manage doctors and their schedules in your hospital
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MedicalIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Doctors</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {doctors.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {doctors.filter(d => d.status === 'Active').length} active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PersonIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Patients</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {doctors.reduce((sum, doctor) => sum + doctor.patients, 0)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Under care
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Today's Appointments</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {doctors.filter(d => d.nextAppointment).length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Scheduled
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Specialties</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {new Set(doctors.map(d => d.specialty)).size}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Different specialties
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters and Actions */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                            sx={{ minWidth: 250 }}
                        />
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Filter by Specialty</InputLabel>
                            <Select
                                value={specialtyFilter}
                                onChange={(e) => setSpecialtyFilter(e.target.value)}
                                label="Filter by Specialty"
                            >
                                <MenuItem value="all">All Specialties</MenuItem>
                                {specialties.map(specialty => (
                                    <MenuItem key={specialty} value={specialty}>
                                        {specialty}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('add')}
                        >
                            Add Doctor
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Doctors Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Doctor</TableCell>
                                <TableCell>Specialty</TableCell>
                                <TableCell>License</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Patients</TableCell>
                                <TableCell>Experience</TableCell>
                                <TableCell>Last Activity</TableCell>
                                <TableCell>Next Appointment</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDoctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                <MedicalIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2">
                                                    {doctor.firstName} {doctor.lastName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {doctor.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={doctor.specialty}
                                            color={getSpecialtyColor(doctor.specialty) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{doctor.licenseNumber}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={doctor.status}
                                            color={getStatusColor(doctor.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Badge badgeContent={doctor.patients} color="primary">
                                            <PersonIcon />
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{doctor.experience} years</TableCell>
                                    <TableCell>{doctor.lastActivity}</TableCell>
                                    <TableCell>
                                        {doctor.nextAppointment ? (
                                            <Chip
                                                label={doctor.nextAppointment}
                                                color="info"
                                                size="small"
                                                icon={<ScheduleIcon />}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No appointments
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, doctor)}
                                            size="small"
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleOpenDialog('edit', selectedDoctor)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Doctor</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleToggleStatus(selectedDoctor?.id)}>
                    <ListItemIcon>
                        <MoreVertIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        {selectedDoctor?.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteDoctor(selectedDoctor?.id)}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove Doctor</ListItemText>
                </MenuItem>
            </Menu>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {dialogType === 'add' ? 'Add New Doctor' : 'Edit Doctor'}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Doctor management form will be implemented here with proper validation and API integration.
                    </Alert>
                    <Typography variant="body2" color="text.secondary">
                        This dialog will include fields for:
                    </Typography>
                    <ul>
                        <li>Personal information (name, email, phone)</li>
                        <li>Medical license number and verification</li>
                        <li>Specialization and experience</li>
                        <li>Hospital department assignment</li>
                        <li>Schedule and availability settings</li>
                        <li>Access permissions and roles</li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseDialog}>
                        {dialogType === 'add' ? 'Add Doctor' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DoctorsPage;
