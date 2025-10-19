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
    Security as SecurityIcon,
    Notifications as NotificationsIcon,
    TrendingUp as TrendingUpIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
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
            id={`dashboard-tabpanel-${index}`}
            aria-labelledby={`dashboard-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const SuperAdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'hospital' | 'user' | 'system'>('hospital');

    // Mock data - replace with actual API calls
    const [stats, setStats] = useState({
        totalHospitals: 24,
        totalUsers: 1250,
        totalReferrals: 3400,
        activeReferrals: 180,
        systemHealth: 'Healthy',
        lastBackup: '2024-01-15 14:30:00',
    });

    const [hospitals, setHospitals] = useState([
        {
            id: '1',
            name: 'City General Hospital',
            location: 'New York, NY',
            status: 'Active',
            users: 45,
            referrals: 120,
            lastActivity: '2024-01-15 10:30',
        },
        {
            id: '2',
            name: 'Metro Medical Center',
            location: 'Los Angeles, CA',
            status: 'Active',
            users: 32,
            referrals: 85,
            lastActivity: '2024-01-15 09:15',
        },
        {
            id: '3',
            name: 'Regional Health Center',
            location: 'Chicago, IL',
            status: 'Maintenance',
            users: 28,
            referrals: 65,
            lastActivity: '2024-01-14 16:45',
        },
    ]);

    const [recentActivities, setRecentActivities] = useState([
        {
            id: '1',
            type: 'hospital_registered',
            message: 'New hospital "Sunset Medical" registered',
            timestamp: '2024-01-15 14:30',
            severity: 'info',
        },
        {
            id: '2',
            type: 'system_alert',
            message: 'High referral volume detected in Region 3',
            timestamp: '2024-01-15 13:45',
            severity: 'warning',
        },
        {
            id: '3',
            type: 'user_created',
            message: 'Dr. Sarah Johnson added to Metro Medical Center',
            timestamp: '2024-01-15 12:20',
            severity: 'success',
        },
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type: 'hospital' | 'user' | 'system') => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Maintenance':
                return 'warning';
            case 'Inactive':
                return 'error';
            default:
                return 'default';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'hospital_registered':
                return <HospitalIcon />;
            case 'system_alert':
                return <WarningIcon />;
            case 'user_created':
                return <PeopleIcon />;
            default:
                return <NotificationsIcon />;
        }
    };

    const getActivityColor = (severity: string) => {
        switch (severity) {
            case 'success':
                return 'success.main';
            case 'warning':
                return 'warning.main';
            case 'error':
                return 'error.main';
            default:
                return 'info.main';
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Super Admin Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Welcome back, {user?.firstName} {user?.lastName}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <HospitalIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Hospitals</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {stats.totalHospitals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                +2 this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Users</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {stats.totalUsers}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                +45 this week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Referrals</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">
                                {stats.totalReferrals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                +{stats.activeReferrals} active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">System Health</Typography>
                            </Box>
                            <Chip
                                label={stats.systemHealth}
                                color="success"
                                size="small"
                                icon={<CheckCircleIcon />}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Last backup: {stats.lastBackup}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Content Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
                        <Tab label="Hospitals" />
                        <Tab label="Users" />
                        <Tab label="System" />
                        <Tab label="Analytics" />
                    </Tabs>
                </Box>

                {/* Hospitals Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Hospital Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('hospital')}
                        >
                            Add Hospital
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Hospital Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Users</TableCell>
                                    <TableCell>Referrals</TableCell>
                                    <TableCell>Last Activity</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hospitals.map((hospital) => (
                                    <TableRow key={hospital.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {hospital.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{hospital.location}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={hospital.status}
                                                color={getStatusColor(hospital.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{hospital.users}</TableCell>
                                        <TableCell>{hospital.referrals}</TableCell>
                                        <TableCell>{hospital.lastActivity}</TableCell>
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

                {/* Users Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">User Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('user')}
                        >
                            Add User
                        </Button>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3 }}>
                        User management features will be implemented here. This includes creating, editing, and managing user accounts across all hospitals.
                    </Alert>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        User Statistics
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Total Users"
                                                secondary={stats.totalUsers}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SecurityIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Active Sessions"
                                                secondary="23"
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
                                        Recent User Activity
                                    </Typography>
                                    <List>
                                        {recentActivities
                                            .filter(activity => activity.type.includes('user'))
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

                {/* System Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" gutterBottom>
                        System Administration
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        System Health
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Database Status
                                        </Typography>
                                        <Chip label="Connected" color="success" size="small" />
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            API Status
                                        </Typography>
                                        <Chip label="Operational" color="success" size="small" />
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Storage Usage
                                        </Typography>
                                        <Typography variant="body1">2.4 GB / 10 GB</Typography>
                                    </Box>
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
                </TabPanel>

                {/* Analytics Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                        System Analytics
                    </Typography>

                    <Alert severity="info">
                        Advanced analytics and reporting features will be implemented here. This includes referral trends, user activity patterns, and system performance metrics.
                    </Alert>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Referral Trends
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        +12%
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
                                        User Growth
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        +8%
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
                                        System Uptime
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        99.9%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        last 30 days
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {dialogType === 'hospital' && 'Add New Hospital'}
                    {dialogType === 'user' && 'Add New User'}
                    {dialogType === 'system' && 'System Configuration'}
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

export default SuperAdminDashboard;
