# MediNet Frontend

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/medinet-frontend)

A modern healthcare management frontend built with React, TypeScript, Vite, and Material-UI for the MediNet platform.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/medinet-frontend)

## 🏗️ Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Yup
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🔧 Environment Variables

| Variable           | Description         | Required | Default       |
| ------------------ | ------------------- | -------- | ------------- |
| `VITE_API_URL`     | Backend API URL     | Yes      | -             |
| `VITE_APP_NAME`    | Application name    | No       | `MediNet`     |
| `VITE_APP_VERSION` | Application version | No       | `1.0.0`       |
| `VITE_NODE_ENV`    | Environment         | No       | `development` |

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/medinet-frontend.git
   cd medinet-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   ├── forms/          # Form components
│   ├── charts/         # Chart components
│   └── layout/         # Layout components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── hospitals/      # Hospital pages
│   ├── patients/       # Patient pages
│   └── referrals/      # Referral pages
├── layouts/            # Page layouts
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   └── PublicLayout.tsx
├── routes/             # Route definitions
│   ├── AppRoutes.tsx
│   ├── AuthRoutes.tsx
│   └── ProtectedRoutes.tsx
├── context/            # React context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── NotificationContext.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useLocalStorage.ts
├── utils/              # Utility functions
│   ├── api.ts          # API client
│   ├── auth.ts         # Authentication utilities
│   ├── validation.ts   # Form validation
│   └── constants.ts    # App constants
├── types/              # TypeScript definitions
│   ├── auth.ts
│   ├── hospital.ts
│   ├── patient.ts
│   └── referral.ts
├── theme/              # MUI theme configuration
│   ├── theme.ts
│   └── palette.ts
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 UI Components

### Material-UI Integration

The project uses Material-UI (MUI) for the component library with:

- **Custom theme** with MediNet branding
- **Responsive design** with breakpoints
- **Dark/Light mode** support
- **Accessibility** features built-in

### Component Structure

```tsx
// Example component structure
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  children,
  onAction,
}) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      {children}
    </Box>
  );
};
```

## 🛣️ Routing

### Route Structure

- **Public Routes**: Landing page, login, register
- **Protected Routes**: Dashboard, hospitals, patients, referrals
- **Role-based Routes**: Different dashboards for different user roles

### Route Configuration

```tsx
// Example route configuration
const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "hospitals", element: <HospitalsPage /> },
      { path: "patients", element: <PatientsPage /> },
    ],
  },
];
```

## 🔐 Authentication

### Auth Context

The authentication is managed through React Context:

```tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

### Protected Routes

```tsx
// Example protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};
```

## 🌐 API Integration

### API Client

```tsx
// Example API client usage
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for utility-first styling:

```tsx
// Example Tailwind usage
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>
```

## 🧪 Testing

### Testing Setup

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Testing Examples

```tsx
// Example test
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

test("renders component with title", () => {
  render(<Component title="Test Title" />);
  expect(screen.getByText("Test Title")).toBeInTheDocument();
});
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**

   - Add `VITE_API_URL` pointing to your backend
   - Add other environment variables as needed

3. **Deploy**
   - Vercel will automatically deploy your application
   - You'll get a URL like `https://medinet-frontend.vercel.app`

### Environment Variables for Production

```env
VITE_API_URL=https://medinet-backend.onrender.com
VITE_APP_NAME=MediNet
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=production
```

### Build Configuration

The project is configured for Vercel with:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📊 Performance

### Optimization Features

- **Code splitting** with React.lazy()
- **Tree shaking** for smaller bundles
- **Image optimization** with Vite
- **Bundle analysis** with rollup-plugin-visualizer
- **Lazy loading** for components and images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [MediNet Backend](https://github.com/your-username/medinet-backend) - Node.js API server
- [MediNet Documentation](https://docs.medinet.com) - Complete documentation

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for better healthcare**
