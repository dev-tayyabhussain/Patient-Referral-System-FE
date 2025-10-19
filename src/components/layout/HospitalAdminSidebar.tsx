import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box,
    Avatar,
    Chip,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    LocalHospital as HospitalIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    PersonAdd as PersonAddIcon,
    Group as GroupIcon,
    Schedule as ScheduleIcon,
    MedicalServices as MedicalServicesIcon,
    Analytics as AnalyticsIcon,
    Report as ReportIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    AdminPanelSettings as AdminIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface HospitalAdminSidebarProps {
    open: boolean;
    onClose: () => void;
    variant?: 'temporary' | 'permanent';
}

const HospitalAdminSidebar: React.FC<HospitalAdminSidebarProps> = ({ open, onClose, variant = 'temporary' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <DashboardIcon />,
            description: 'Hospital overview',
        },
        {
            title: 'Doctors',
            path: '/dashboard/doctors',
            icon: <PersonAddIcon />,
            description: 'Manage doctors',
        },
        {
            title: 'Doctor Approvals',
            path: '/dashboard/doctor-approvals',
            icon: <AdminIcon />,
            description: 'Approve doctors',
        },
        {
            title: 'Patients',
            path: '/dashboard/patients',
            icon: <GroupIcon />,
            description: 'Patient management',
        },
        {
            title: 'Referrals',
            path: '/dashboard/referrals',
            icon: <AssignmentIcon />,
            description: 'Referral management',
        },
        {
            title: 'Appointments',
            path: '/dashboard/appointments',
            icon: <ScheduleIcon />,
            description: 'Appointment scheduling',
        },
        {
            title: 'Medical Records',
            path: '/dashboard/records',
            icon: <AssessmentIcon />,
            description: 'Medical records',
        },
        {
            title: 'Departments',
            path: '/dashboard/departments',
            icon: <MedicalServicesIcon />,
            description: 'Department management',
        },
        {
            title: 'Analytics',
            path: '/dashboard/analytics',
            icon: <AnalyticsIcon />,
            description: 'Hospital analytics',
        },
        {
            title: 'Reports',
            path: '/dashboard/reports',
            icon: <ReportIcon />,
            description: 'Generate reports',
        },
        {
            title: 'Settings',
            path: '/dashboard/settings',
            icon: <SettingsIcon />,
            description: 'Hospital settings',
        },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <HospitalIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="div">
                            Hospital Admin
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Hospital Administrator
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label={`Welcome, ${user?.firstName}`}
                    color="primary"
                    size="small"
                    variant="outlined"
                />
            </Box>

            <List sx={{ px: 1, py: 2 }}>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => handleNavigation(item.path)}
                            selected={isActive(item.path)}
                            sx={{
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                secondary={item.description}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: isActive(item.path) ? 600 : 400,
                                }}
                                secondaryTypographyProps={{
                                    fontSize: '0.75rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    Hospital Status: <Chip label="Operational" color="success" size="small" />
                </Typography>
            </Box>
        </Drawer>
    );
};

export default HospitalAdminSidebar;
