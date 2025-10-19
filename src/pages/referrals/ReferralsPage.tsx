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
    Badge,
} from '@mui/material';
import {
    Assignment,
    Add,
    Search,
    FilterList,
    MoreVert,
    Person,
    LocalHospital,
    Schedule,
    CheckCircle,
    Cancel,
    Pending,
    Visibility,
    Edit,
} from '@mui/icons-material';

const ReferralsPage: React.FC = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedReferral, setSelectedReferral] = useState<number | null>(null);

    const mockReferrals = [
        {
            id: 1,
            referralId: 'REF-001',
            patient: 'John Doe',
            referringDoctor: 'Dr. Smith',
            referringHospital: 'City General Hospital',
            receivingDoctor: 'Dr. Johnson',
            receivingHospital: 'Metro Medical Center',
            specialty: 'Cardiology',
            priority: 'High',
            status: 'Pending',
            createdAt: '2024-01-15',
            reason: 'Chest pain and shortness of breath',
        },
        {
            id: 2,
            referralId: 'REF-002',
            patient: 'Jane Smith',
            referringDoctor: 'Dr. Brown',
            referringHospital: 'Community Health Clinic',
            receivingDoctor: 'Dr. Wilson',
            receivingHospital: 'City General Hospital',
            specialty: 'Neurology',
            priority: 'Medium',
            status: 'Accepted',
            createdAt: '2024-01-14',
            reason: 'Persistent headaches and dizziness',
        },
        {
            id: 3,
            referralId: 'REF-003',
            patient: 'Robert Johnson',
            referringDoctor: 'Dr. Davis',
            referringHospital: 'Metro Medical Center',
            receivingDoctor: 'Dr. Taylor',
            receivingHospital: 'Specialty Care Center',
            specialty: 'Orthopedics',
            priority: 'Low',
            status: 'Completed',
            createdAt: '2024-01-10',
            reason: 'Knee replacement consultation',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'Accepted':
                return 'success';
            case 'Rejected':
                return 'error';
            case 'Completed':
                return 'info';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return <Pending />;
            case 'Accepted':
                return <CheckCircle />;
            case 'Rejected':
                return <Cancel />;
            case 'Completed':
                return <CheckCircle />;
            default:
                return <Assignment />;
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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, referralId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedReferral(referralId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReferral(null);
    };

    const filteredReferrals = mockReferrals.filter(referral =>
        referral.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Referral Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Create, track, and manage patient referrals between healthcare providers
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
                        New Referral
                    </Button>
                </Box>
            </Box>

            {/* Search Bar */}
            <Box mb={4}>
                <TextField
                    fullWidth
                    placeholder="Search referrals by ID, patient, specialty, or reason..."
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
                                        Total Referrals
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockReferrals.length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <Assignment />
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
                                        Pending
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockReferrals.filter(r => r.status === 'Pending').length}
                                    </Typography>
                                </Box>
                                <Badge color="warning" variant="dot">
                                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                                        <Pending />
                                    </Avatar>
                                </Badge>
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
                                        Accepted
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockReferrals.filter(r => r.status === 'Accepted').length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <CheckCircle />
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
                                        Completed
                                    </Typography>
                                    <Typography variant="h4">
                                        {mockReferrals.filter(r => r.status === 'Completed').length}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <CheckCircle />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Referrals Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Referral Directory
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Referral ID</TableCell>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Specialty</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Referring Doctor</TableCell>
                                    <TableCell>Receiving Hospital</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredReferrals.map((referral) => (
                                    <TableRow key={referral.id} hover>
                                        <TableCell>
                                            <Typography variant="subtitle2" color="primary">
                                                {referral.referralId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                    <Person sx={{ fontSize: 16 }} />
                                                </Avatar>
                                                <Typography variant="body2">
                                                    {referral.patient}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={referral.specialty}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={referral.priority}
                                                color={getPriorityColor(referral.priority) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Chip
                                                    icon={getStatusIcon(referral.status)}
                                                    label={referral.status}
                                                    color={getStatusColor(referral.status) as any}
                                                    size="small"
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {referral.referringDoctor}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {referral.referringHospital}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <LocalHospital sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {referral.receivingHospital}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Schedule sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {new Date(referral.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, referral.id)}
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
                    <Visibility sx={{ mr: 1 }} fontSize="small" />
                    View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Edit sx={{ mr: 1 }} fontSize="small" />
                    Edit Referral
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Person sx={{ mr: 1 }} fontSize="small" />
                    View Patient
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <LocalHospital sx={{ mr: 1 }} fontSize="small" />
                    Hospital Info
                </MenuItem>
            </Menu>

            {/* Empty State */}
            {filteredReferrals.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                            <Assignment sx={{ fontSize: 32, color: 'grey.500' }} />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            {searchTerm ? 'No referrals found' : 'No referrals yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {searchTerm
                                ? 'Try adjusting your search criteria.'
                                : 'Get started by creating your first referral.'
                            }
                        </Typography>
                        <Button variant="contained" startIcon={<Add />}>
                            Create Referral
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ReferralsPage;
