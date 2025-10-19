import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
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
    CircularProgress,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Avatar,
    Badge,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    People as PeopleIcon,
    LocalHospital as HospitalIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    PersonAdd as PersonAddIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
    Person as PersonIcon,
    MedicalServices as MedicalServicesIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`hospital-dashboard-tabpanel-${index}`}
            aria-labelledby={`hospital-dashboard-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const HospitalAdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'doctor' | 'referral' | 'patient'>('doctor');

    // Mock data - replace with actual API calls
    const [hospitalStats, setHospitalStats] = useState({
        hospitalName: 'City General Hospital',
        totalDoctors: 24,
        totalPatients: 1250,
        totalReferrals: 340,
        pendingReferrals: 18,
        completedReferrals: 322,
        todayAppointments: 45,
        systemStatus: 'Operational',
    });

    const [doctors, setDoctors] = useState([
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            specialization: 'Cardiology',
            licenseNumber: 'MD12345',
            email: 'sarah.johnson@hospital.com',
            phone: '+1-555-0123',
            status: 'Active',
            patients: 45,
            experience: 8,
            lastActivity: '2024-01-15 10:30',
        },
        {
            id: '2',
            name: 'Dr. Michael Chen',
            specialization: 'Neurology',
            licenseNumber: 'MD67890',
            email: 'michael.chen@hospital.com',
            phone: '+1-555-0124',
            status: 'Active',
            patients: 32,
            experience: 12,
            lastActivity: '2024-01-15 09:15',
        },
        {
            id: '3',
            name: 'Dr. Emily Rodriguez',
            specialization: 'Pediatrics',
            licenseNumber: 'MD54321',
            email: 'emily.rodriguez@hospital.com',
            phone: '+1-555-0125',
            status: 'On Leave',
            patients: 28,
            experience: 6,
            lastActivity: '2024-01-14 16:45',
        },
    ]);

    const [referrals, setReferrals] = useState([
        {
            id: '1',
            patientName: 'John Smith',
            fromDoctor: 'Dr. Sarah Johnson',
            toHospital: 'Metro Medical Center',
            specialty: 'Cardiology',
            priority: 'High',
            status: 'Pending',
            date: '2024-01-15',
            reason: 'Complex heart condition requiring specialized treatment',
        },
        {
            id: '2',
            patientName: 'Jane Doe',
            fromDoctor: 'Dr. Michael Chen',
            toHospital: 'Regional Health Center',
            specialty: 'Neurology',
            priority: 'Medium',
            status: 'In Progress',
            date: '2024-01-14',
            reason: 'Neurological assessment needed',
        },
        {
            id: '3',
            patientName: 'Bob Wilson',
            fromDoctor: 'Dr. Emily Rodriguez',
            toHospital: 'Children\'s Hospital',
            specialty: 'Pediatrics',
            priority: 'Low',
            status: 'Completed',
            date: '2024-01-13',
            reason: 'Routine pediatric consultation',
        },
    ]);

    const [recentActivities, setRecentActivities] = useState([
        {
            id: '1',
            type: 'doctor_added',
            message: 'Dr. David Kim added to Cardiology department',
            timestamp: '2024-01-15 14:30',
            severity: 'success',
        },
        {
            id: '2',
            type: 'referral_received',
            message: 'New referral received from Metro Medical Center',
            timestamp: '2024-01-15 13:45',
            severity: 'info',
        },
        {
            id: '3',
            type: 'appointment_scheduled',
            message: '15 new appointments scheduled for tomorrow',
            timestamp: '2024-01-15 12:20',
            severity: 'info',
        },
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type: 'doctor' | 'referral' | 'patient') => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
            case 'Completed':
                return 'success';
            case 'Pending':
            case 'In Progress':
                return 'warning';
            case 'On Leave':
            case 'Cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'error';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'success';
            default:
                return 'default';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'doctor_added':
                return <PersonAddIcon />;
            case 'referral_received':
                return <AssignmentIcon />;
            case 'appointment_scheduled':
                return <ScheduleIcon />;
            default:
                return <NotificationsIcon />;
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Hospital Admin Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {hospitalStats.hospitalName} • Welcome back, {user?.firstName} {user?.lastName}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MedicalServicesIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Doctors</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {hospitalStats.totalDoctors}
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
                                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Patients</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {hospitalStats.totalPatients}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                +{hospitalStats.todayAppointments} today
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Referrals</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {hospitalStats.totalReferrals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {hospitalStats.pendingReferrals} pending
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <HospitalIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">System Status</Typography>
                            </Box>
                            <Chip
                                label={hospitalStats.systemStatus}
                                color="success"
                                size="small"
                                icon={<CheckCircleIcon />}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                All systems operational
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Content Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="hospital dashboard tabs">
                        <Tab label="Doctors" />
                        <Tab label="Referrals" />
                        <Tab label="Patients" />
                        <Tab label="Analytics" />
                    </Tabs>
                </Box>

                {/* Doctors Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Doctor Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('doctor')}
                        >
                            Add Doctor
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell>Specialization</TableCell>
                                    <TableCell>License</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Patients</TableCell>
                                    <TableCell>Experience</TableCell>
                                    <TableCell>Last Activity</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctors.map((doctor) => (
                                    <TableRow key={doctor.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {doctor.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {doctor.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {doctor.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={doctor.specialization} size="small" />
                                        </TableCell>
                                        <TableCell>{doctor.licenseNumber}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={doctor.status}
                                                color={getStatusColor(doctor.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{doctor.patients}</TableCell>
                                        <TableCell>{doctor.experience} years</TableCell>
                                        <TableCell>{doctor.lastActivity}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="primary">
                                                <ViewIcon />
                                            </IconButton>
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Referrals Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Referral Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('referral')}
                        >
                            Create Referral
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>From Doctor</TableCell>
                                    <TableCell>To Hospital</TableCell>
                                    <TableCell>Specialty</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {referrals.map((referral) => (
                                    <TableRow key={referral.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {referral.patientName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{referral.fromDoctor}</TableCell>
                                        <TableCell>{referral.toHospital}</TableCell>
                                        <TableCell>
                                            <Chip label={referral.specialty} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={referral.priority}
                                                color={getPriorityColor(referral.priority) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={referral.status}
                                                color={getStatusColor(referral.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{referral.date}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="primary">
                                                <ViewIcon />
                                            </IconButton>
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Patients Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Patient Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('patient')}
                        >
                            Add Patient
                        </Button>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3 }}>
                        Patient management features will be implemented here. This includes patient registration, medical records, and appointment scheduling.
                    </Alert>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Patient Statistics
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Total Patients"
                                                secondary={hospitalStats.totalPatients}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScheduleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Today's Appointments"
                                                secondary={hospitalStats.todayAppointments}
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Recent Patient Activity
                                    </Typography>
                                    <List>
                                        {recentActivities
                                            .filter(activity => activity.type.includes('appointment'))
                                            .map((activity) => (
                                                <ListItem key={activity.id}>
                                                    <ListItemIcon>
                                                        {getActivityIcon(activity.type)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={activity.message}
                                                        secondary={activity.timestamp}
                                                    />
                                                </ListItem>
                                            ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Analytics Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                        Hospital Analytics
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Referral Trends
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        +15%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        vs last month
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Patient Satisfaction
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        4.8/5
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        average rating
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Efficiency Rate
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        94%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        referral completion
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Activities
                            </Typography>
                            <List>
                                {recentActivities.map((activity) => (
                                    <ListItem key={activity.id}>
                                        <ListItemIcon>
                                            {getActivityIcon(activity.type)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={activity.message}
                                            secondary={activity.timestamp}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {dialogType === 'doctor' && 'Add New Doctor'}
                    {dialogType === 'referral' && 'Create New Referral'}
                    {dialogType === 'patient' && 'Add New Patient'}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        This dialog will be implemented with proper form fields based on the selected type.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseDialog}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default HospitalAdminDashboard;
