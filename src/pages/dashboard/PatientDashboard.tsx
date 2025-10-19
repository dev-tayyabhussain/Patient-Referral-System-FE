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
    Schedule as ScheduleIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    MedicalServices as MedicalServicesIcon,
    Notifications as NotificationsIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Person as PersonIcon,
    LocalHospital as HospitalIcon,
    CalendarToday as CalendarIcon,
    Description as DescriptionIcon,
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
            id={`patient-dashboard-tabpanel-${index}`}
            aria-labelledby={`patient-dashboard-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const PatientDashboard: React.FC = () => {
    const { user } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'appointment' | 'record' | 'referral'>('appointment');

    // Mock data - replace with actual API calls
    const [patientStats, setPatientStats] = useState({
        patientName: 'John Smith',
        age: 45,
        gender: 'Male',
        primaryDoctor: 'Dr. Sarah Johnson',
        nextAppointment: '2024-01-20 10:00 AM',
        totalAppointments: 12,
        upcomingAppointments: 2,
        completedReferrals: 3,
        pendingReferrals: 1,
        medicalRecords: 8,
    });

    const [appointments, setAppointments] = useState([
        {
            id: '1',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            date: '2024-01-20',
            time: '10:00 AM',
            type: 'Follow-up',
            status: 'Scheduled',
            location: 'City General Hospital',
            notes: 'Blood pressure check and medication review',
        },
        {
            id: '2',
            doctor: 'Dr. Michael Chen',
            specialty: 'Neurology',
            date: '2024-01-25',
            time: '02:30 PM',
            type: 'Consultation',
            status: 'Scheduled',
            location: 'City General Hospital',
            notes: 'Neurological assessment',
        },
        {
            id: '3',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            date: '2024-01-10',
            time: '09:00 AM',
            type: 'Follow-up',
            status: 'Completed',
            location: 'City General Hospital',
            notes: 'Routine checkup - all vitals normal',
        },
    ]);

    const [medicalRecords, setMedicalRecords] = useState([
        {
            id: '1',
            date: '2024-01-10',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            diagnosis: 'Hypertension',
            treatment: 'Lisinopril 10mg daily',
            notes: 'Blood pressure well controlled',
            attachments: ['Lab Results', 'ECG Report'],
        },
        {
            id: '2',
            date: '2024-01-05',
            doctor: 'Dr. Michael Chen',
            specialty: 'Neurology',
            diagnosis: 'Migraine',
            treatment: 'Sumatriptan as needed',
            notes: 'Headaches reduced significantly',
            attachments: ['MRI Report'],
        },
        {
            id: '3',
            date: '2023-12-20',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            diagnosis: 'Annual Physical',
            treatment: 'Continue current medication',
            notes: 'Overall health good, continue monitoring',
            attachments: ['Blood Work', 'Chest X-Ray'],
        },
    ]);

    const [referrals, setReferrals] = useState([
        {
            id: '1',
            fromDoctor: 'Dr. Sarah Johnson',
            toHospital: 'Metro Medical Center',
            specialty: 'Cardiac Surgery',
            status: 'Pending',
            date: '2024-01-15',
            reason: 'Requires surgical consultation for valve replacement',
            priority: 'High',
        },
        {
            id: '2',
            fromDoctor: 'Dr. Michael Chen',
            toHospital: 'Regional Health Center',
            specialty: 'Electrophysiology',
            status: 'Approved',
            date: '2024-01-10',
            reason: 'Complex arrhythmia evaluation',
            priority: 'Medium',
        },
        {
            id: '3',
            fromDoctor: 'Dr. Sarah Johnson',
            toHospital: 'City General Hospital',
            specialty: 'Cardiology',
            status: 'Completed',
            date: '2023-12-15',
            reason: 'Stress test and echocardiogram',
            priority: 'Low',
        },
    ]);

    const [recentActivities, setRecentActivities] = useState([
        {
            id: '1',
            type: 'appointment_scheduled',
            message: 'Appointment scheduled with Dr. Sarah Johnson',
            timestamp: '2024-01-15 14:30',
            severity: 'info',
        },
        {
            id: '2',
            type: 'referral_created',
            message: 'Referral created to Metro Medical Center',
            timestamp: '2024-01-15 13:45',
            severity: 'info',
        },
        {
            id: '3',
            type: 'record_updated',
            message: 'Medical record updated with latest lab results',
            timestamp: '2024-01-15 12:20',
            severity: 'success',
        },
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type: 'appointment' | 'record' | 'referral') => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Scheduled':
            case 'Approved':
            case 'Completed':
                return 'success';
            case 'Pending':
                return 'warning';
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
            case 'appointment_scheduled':
                return <ScheduleIcon />;
            case 'referral_created':
                return <AssignmentIcon />;
            case 'record_updated':
                return <DescriptionIcon />;
            default:
                return <NotificationsIcon />;
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Patient Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Welcome back, {user?.firstName} {user?.lastName} • {patientStats.age} years old, {patientStats.gender}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Next Appointment</Typography>
                            </Box>
                            <Typography variant="h6" color="primary">
                                {patientStats.nextAppointment}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                with {patientStats.primaryDoctor}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CalendarIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Upcoming</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {patientStats.upcomingAppointments}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                appointments scheduled
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
                                {patientStats.completedReferrals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {patientStats.pendingReferrals} pending
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Records</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {patientStats.medicalRecords}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                medical records
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Content Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="patient dashboard tabs">
                        <Tab label="Appointments" />
                        <Tab label="Medical Records" />
                        <Tab label="Referrals" />
                        <Tab label="Health Summary" />
                    </Tabs>
                </Box>

                {/* Appointments Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">My Appointments</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('appointment')}
                        >
                            Book Appointment
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date & Time</TableCell>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell>Specialty</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {appointment.date}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {appointment.time}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {appointment.doctor.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {appointment.doctor}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={appointment.specialty} size="small" />
                                        </TableCell>
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
                                        <TableCell>{appointment.location}</TableCell>
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

                {/* Medical Records Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Medical Records</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('record')}
                        >
                            Request Record
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell>Specialty</TableCell>
                                    <TableCell>Diagnosis</TableCell>
                                    <TableCell>Treatment</TableCell>
                                    <TableCell>Attachments</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicalRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {record.doctor.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {record.doctor}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={record.specialty} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {record.diagnosis}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {record.treatment}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {record.attachments.map((attachment, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={attachment}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
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

                {/* Referrals Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">My Referrals</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('referral')}
                        >
                            Request Referral
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>From Doctor</TableCell>
                                    <TableCell>To Hospital</TableCell>
                                    <TableCell>Specialty</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {referrals.map((referral) => (
                                    <TableRow key={referral.id}>
                                        <TableCell>{referral.date}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {referral.fromDoctor.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {referral.fromDoctor}
                                                    </Typography>
                                                </Box>
                                            </Box>
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
                                        <TableCell>
                                            <IconButton size="small" color="primary">
                                                <ViewIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Health Summary Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                        Health Summary
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Current Conditions
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MedicalServicesIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Hypertension"
                                                secondary="Well controlled with medication"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MedicalServicesIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Migraine"
                                                secondary="Occasional episodes, managed with medication"
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
                        </Grid>
                    </Grid>

                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Health Metrics
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Blood Pressure
                                        </Typography>
                                        <Typography variant="h6">
                                            120/80 mmHg
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={75}
                                            color="success"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Heart Rate
                                        </Typography>
                                        <Typography variant="h6">
                                            72 BPM
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={80}
                                            color="success"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Weight
                                        </Typography>
                                        <Typography variant="h6">
                                            75 kg
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={70}
                                            color="success"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {dialogType === 'appointment' && 'Book Appointment'}
                    {dialogType === 'record' && 'Request Medical Record'}
                    {dialogType === 'referral' && 'Request Referral'}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        This dialog will be implemented with proper form fields based on the selected type.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseDialog}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PatientDashboard;
