# Margdarshak Frontend - Auth + Layout Module Documentation

## 📋 Overview

This is a production-ready React + Vite frontend with complete authentication and layout system using React Context API, React Router v6, and Tailwind CSS.

---

## 🏗️ Folder Structure

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── api/
│   │   ├── axiosConfig.js          # Axios instance with interceptors
│   │   ├── authApi.js              # Auth API endpoints
│   │   ├── companyApi.js           # (Placeholder)
│   │   ├── alumniApi.js            # (Placeholder)
│   │   └── mentorshipApi.js        # (Placeholder)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Sidebar.jsx         # Left sidebar navigation
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   └── ProtectedRoute.jsx  # Route protection component
│   │   ├── company/                # (Placeholder)
│   │   ├── preparation/            # (Placeholder)
│   │   ├── alumni/                 # (Placeholder)
│   │   └── chatbot/                # (Placeholder)
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── Home.jsx                # Public home page
│   │   ├── Dashboard.jsx           # Protected dashboard
│   │   ├── Profile.jsx             # User profile page
│   │   ├── Settings.jsx            # Settings page
│   │   └── ...                     # Other pages
│   │
│   ├── context/
│   │   └── AuthContext.jsx         # Auth context provider
│   │
│   ├── hooks/
│   │   └── useAuth.js              # Custom auth hook
│   │
│   ├── utils/
│   │   └── constants.js            # App constants
│   │
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind CSS
│
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
├── postcss.config.js               # PostCSS config
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables
├── .gitignore                      # Git ignore rules
└── package.json                    # Dependencies and scripts
```

---

## 🔑 Key Features

### ✅ Authentication System
- **Login & Register**: Complete forms with validation
- **Context API**: Global auth state management
- **Token Persistence**: Automatic token storage in localStorage
- **Auto-login**: User automatically logs in if token exists
- **Error Handling**: Comprehensive error messages

### ✅ Protected Routes
- **ProtectedRoute Component**: Guards routes requiring authentication
- **Automatic Redirect**: Unauthenticated users redirected to login
- **Loading States**: Shows loader while checking auth status

### ✅ Layout System
- **Navbar**: Shows app name, login/logout buttons
- **Sidebar**: Navigation menu with active route highlighting
- **Responsive**: Works on desktop and mobile
- **Dynamic Menu**: Shows different items based on auth status

### ✅ Form Validation
- **Client-side Validation**: Real-time error checking
- **Email Validation**: Proper email format verification
- **Password Rules**: Minimum 6 characters
- **Password Confirmation**: Ensures passwords match (register)
- **Custom Error Messages**: User-friendly feedback

### ✅ API Integration
- **Axios Interceptors**: Auto-adds auth token to requests
- **Error Handling**: Handles 401 and other errors
- **Auto-logout**: Clears data on 401 response
- **Centralized Config**: Single source of truth for API calls

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Update `.env.local` with your API URL:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

---

## 🎯 How to Use

### Using AuthContext

```jsx
import useAuth from '../hooks/useAuth'

export default function MyComponent() {
  const { user, token, loading, isAuthenticated, login, logout } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  if (isAuthenticated) {
    return <p>Hello, {user.name}!</p>
  }
  
  return <p>Please login</p>
}
```

### Creating Protected Pages

```jsx
// In App.jsx
<Route
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Adding API Calls

```jsx
// Create in src/api/myApi.js
import api from './axiosConfig'

export const myApi = {
  fetchData: async () => {
    const response = await api.get('/my-endpoint')
    return response.data
  },
}
```

---

## 📝 Authentication Flow

### Login Flow
1. User enters email & password
2. Form validates input
3. API call to `/auth/login`
4. If successful:
   - Store token in localStorage
   - Store user data in localStorage
   - Update context state
   - Redirect to dashboard
5. If error: Show error message

### Registration Flow
1. User fills name, email, password
2. Form validates all fields
3. API call to `/auth/register`
4. If successful:
   - Auto-login (if backend returns token)
   - Redirect to dashboard
5. If error: Show error message

### Auto-login Flow
1. App loads
2. AuthProvider checks localStorage for token
3. If token exists:
   - Set user and token in state
   - User remains logged in
4. If no token:
   - User sees login/register options

### Logout Flow
1. User clicks logout button
2. Clear localStorage
3. Clear context state
4. Redirect to login page

---

## 🛡️ Protected Route Behavior

- ✅ **Authenticated**: Shows protected content + sidebar
- ❌ **Not Authenticated**: Redirects to /login
- ⏳ **Loading**: Shows loading spinner

---

## 🎨 Styling

Uses **Tailwind CSS** for all styling:
- Pre-configured breakpoints
- Utility-first approach
- Custom colors and themes
- Responsive design

### Key Classes Used:
- `bg-blue-600` - Primary color
- `text-gray-800` - Text color
- `rounded-lg` - Border radius
- `shadow` - Drop shadow
- `hover:` - Hover states
- `disabled:` - Disabled states

---

## ⚙️ Configuration

### Vite Config (`vite.config.js`)
- React plugin for JSX
- Development server on port 5173
- Auto-open browser

### Tailwind Config (`tailwind.config.js`)
- Template file paths configured
- Default theme
- Custom plugins (if needed)

### Environment Variables (`.env.local`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - React support
- `tailwindcss` - Utility CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

---

## 🔄 API Integration

### Expected Backend Endpoints

1. **POST `/auth/register`**
   ```json
   Request: { name, email, password }
   Response: { user: { id, name, email }, token }
   ```

2. **POST `/auth/login`**
   ```json
   Request: { email, password }
   Response: { user: { id, name, email }, token }
   ```

3. **POST `/auth/logout`**
   ```json
   Response: { message: "Logged out" }
   ```

4. **GET `/auth/profile`** (Protected)
   ```json
   Response: { user: { id, name, email } }
   ```

---

## 🐛 Troubleshooting

### "useAuth must be used within AuthProvider"
- Make sure your component is wrapped inside `<AuthProvider>`

### Token not persisting
- Check localStorage is not disabled
- Verify `.env.local` has correct API URL

### Routes not working
- Ensure `BrowserRouter` wraps all routes
- Check route paths are correct

### Styles not applying
- Run `npm install` to install Tailwind dependencies
- Restart dev server after installing packages

---

## 📚 Best Practices Implemented

✅ Custom hooks for context access  
✅ Error boundary considered  
✅ Loading states for async operations  
✅ Input validation before API calls  
✅ Secure token storage  
✅ Automatic token injection in requests  
✅ Proper error handling and user feedback  
✅ Clean code with comments  
✅ Scalable folder structure  
✅ Reusable components  

---

## 🚀 Next Steps

1. **Connect to Backend**: Update API endpoints
2. **Add More Pages**: Implement company, alumni, etc.
3. **Add State Management**: Redux/Zustand (optional)
4. **Add Tests**: Jest + React Testing Library
5. **Styling Improvements**: Custom theme, dark mode
6. **Security**: Add CSRF protection, sanitization

---

## 📄 Git Commit Message

```
Added AuthContext and Login/Register UI with static layout

- Implemented AuthContext with localStorage persistence
- Created useAuth custom hook
- Added Login page with email/password validation
- Added Register page with name/email/password validation
- Created Navbar with dynamic auth buttons
- Created Sidebar with active route highlighting
- Added Layout wrapper component
- Implemented ProtectedRoute for auth-required pages
- Added complete routing setup in App.jsx
- Integrated Tailwind CSS for styling
- Added Axios config with interceptors
- Created auth API service

Features:
- Auto-login with stored token
- Form validation with error messages
- Loading states
- Responsive design
- Clean, scalable architecture
```

---

## 📧 Support

For issues or questions, check:
- Console errors (F12)
- Network tab for API errors
- localStorage for token persistence
- Component props and state

---

**Happy Coding! 🎉**
