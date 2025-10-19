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
    Alert,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Badge,
    LinearProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Visibility as ViewIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    Schedule as ScheduleIcon,
    Assessment as AssessmentIcon,
    MedicalServices as MedicalServicesIcon,
    Notifications as NotificationsIcon,
    TrendingUp as TrendingUpIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Person as PersonIcon,
    LocalHospital as HospitalIcon,
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
            id={`doctor-dashboard-tabpanel-${index}`}
            aria-labelledby={`doctor-dashboard-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const DoctorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'patient' | 'referral' | 'appointment'>('patient');

    // Mock data - replace with actual API calls
    const [doctorStats, setDoctorStats] = useState({
        doctorName: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        totalPatients: 45,
        todayAppointments: 8,
        pendingReferrals: 3,
        completedReferrals: 12,
        thisMonthReferrals: 15,
        averageRating: 4.8,
    });

    const [patients, setPatients] = useState([
        {
            id: '1',
            name: 'John Smith',
            age: 45,
            gender: 'Male',
            lastVisit: '2024-01-10',
            nextAppointment: '2024-01-20',
            status: 'Active',
            condition: 'Hypertension',
            priority: 'Medium',
        },
        {
            id: '2',
            name: 'Jane Doe',
            age: 38,
            gender: 'Female',
            lastVisit: '2024-01-12',
            nextAppointment: '2024-01-18',
            status: 'Active',
            condition: 'Arrhythmia',
            priority: 'High',
        },
        {
            id: '3',
            name: 'Bob Wilson',
            age: 62,
            gender: 'Male',
            lastVisit: '2024-01-08',
            nextAppointment: null,
            status: 'Discharged',
            condition: 'Heart Attack Recovery',
            priority: 'Low',
        },
    ]);

    const [appointments, setAppointments] = useState([
        {
            id: '1',
            patientName: 'John Smith',
            time: '09:00 AM',
            date: '2024-01-16',
            type: 'Follow-up',
            status: 'Scheduled',
            notes: 'Blood pressure check',
        },
        {
            id: '2',
            patientName: 'Jane Doe',
            time: '10:30 AM',
            date: '2024-01-16',
            type: 'Consultation',
            status: 'Scheduled',
            notes: 'ECG review',
        },
        {
            id: '3',
            patientName: 'Alice Johnson',
            time: '02:00 PM',
            date: '2024-01-16',
            type: 'New Patient',
            status: 'Scheduled',
            notes: 'Initial consultation',
        },
    ]);

    const [referrals, setReferrals] = useState([
        {
            id: '1',
            patientName: 'John Smith',
            toHospital: 'Metro Medical Center',
            specialty: 'Cardiac Surgery',
            priority: 'High',
            status: 'Pending',
            date: '2024-01-15',
            reason: 'Requires surgical intervention for valve replacement',
        },
        {
            id: '2',
            patientName: 'Jane Doe',
            toHospital: 'Regional Health Center',
            specialty: 'Electrophysiology',
            priority: 'Medium',
            status: 'Approved',
            date: '2024-01-14',
            reason: 'Complex arrhythmia requiring specialized treatment',
        },
    ]);

    const [recentActivities, setRecentActivities] = useState([
        {
            id: '1',
            type: 'appointment_completed',
            message: 'Completed appointment with John Smith',
            timestamp: '2024-01-15 14:30',
            severity: 'success',
        },
        {
            id: '2',
            type: 'referral_created',
            message: 'Created referral for Jane Doe to Metro Medical Center',
            timestamp: '2024-01-15 13:45',
            severity: 'info',
        },
        {
            id: '3',
            type: 'patient_added',
            message: 'New patient Alice Johnson registered',
            timestamp: '2024-01-15 12:20',
            severity: 'info',
        },
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type: 'patient' | 'referral' | 'appointment') => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
            case 'Scheduled':
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Discharged':
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
            case 'appointment_completed':
                return <CheckCircleIcon />;
            case 'referral_created':
                return <AssignmentIcon />;
            case 'patient_added':
                return <PersonIcon />;
            default:
                return <NotificationsIcon />;
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Doctor Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {doctorStats.doctorName} • {doctorStats.specialization} • Welcome back, {user?.firstName} {user?.lastName}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">My Patients</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {doctorStats.totalPatients}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {patients.filter(p => p.status === 'Active').length} active
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
                                {doctorStats.todayAppointments}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {appointments.filter(a => a.status === 'Scheduled').length} scheduled
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
                                {doctorStats.thisMonthReferrals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {doctorStats.pendingReferrals} pending
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Rating</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {doctorStats.averageRating}/5
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Patient satisfaction
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Content Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="doctor dashboard tabs">
                        <Tab label="My Patients" />
                        <Tab label="Appointments" />
                        <Tab label="Referrals" />
                        <Tab label="Analytics" />
                    </Tabs>
                </Box>

                {/* Patients Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">My Patients</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('patient')}
                        >
                            Add Patient
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Age/Gender</TableCell>
                                    <TableCell>Condition</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Last Visit</TableCell>
                                    <TableCell>Next Appointment</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {patient.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {patient.age} / {patient.gender}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={patient.condition} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={patient.priority}
                                                color={getPriorityColor(patient.priority) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={patient.status}
                                                color={getStatusColor(patient.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{patient.lastVisit}</TableCell>
                                        <TableCell>
                                            {patient.nextAppointment || 'Not scheduled'}
                                        </TableCell>
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

                {/* Appointments Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Today's Appointments</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('appointment')}
                        >
                            Schedule Appointment
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Notes</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {appointment.time}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{appointment.patientName}</TableCell>
                                        <TableCell>
                                            <Chip label={appointment.type} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={appointment.status}
                                                color={getStatusColor(appointment.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{appointment.notes}</TableCell>
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

                {/* Referrals Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">My Referrals</Typography>
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

                {/* Analytics Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                        My Performance Analytics
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Patient Satisfaction
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        {doctorStats.averageRating}/5
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={doctorStats.averageRating * 20}
                                        sx={{ mt: 1 }}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Based on 45 reviews
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Referral Success Rate
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        92%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {doctorStats.completedReferrals} of {doctorStats.thisMonthReferrals} completed
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Monthly Growth
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        +18%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        New patients this month
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
                    {dialogType === 'patient' && 'Add New Patient'}
                    {dialogType === 'referral' && 'Create New Referral'}
                    {dialogType === 'appointment' && 'Schedule Appointment'}
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

export default DoctorDashboard;
