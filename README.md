# 👥 MERN User Management System

A comprehensive full-stack user management application built with the MERN stack featuring a modern admin dashboard, Kanban board workflow, analytics, and complete CRUD operations for managing users.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🌟 Key Features

### User Management
- 📝 **Complete CRUD Operations** - Create, Read, Update, and Delete users
- 🖼️ **Image Upload** - Profile picture upload via Cloudinary
- 👤 **User Profiles** - Detailed user information with avatars
- 🔍 **Search & Filter** - Find users quickly with advanced filtering
- 📊 **User Status** - Track user states (Pending, Active, Inactive)

### Dashboard & Analytics
- 📈 **Statistics Dashboard** - Real-time metrics and analytics
- 📊 **Data Visualization** - Interactive charts using Recharts
- 📱 **Responsive Design** - Modern dark-themed interface
- 🎯 **Quick Actions** - Access frequently used features instantly

### Kanban Board Workflow
- 📋 **Drag & Drop** - Intuitive Kanban board for user workflow management
- 🔄 **Status Tracking** - Move users between Pending, Active, and Inactive columns
- ✨ **Real-time Updates** - Instant status updates with optimistic UI
- 🎨 **Visual Cards** - Rich user cards with avatars and details

### Authentication & Security
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔒 **Protected Routes** - Access control for authenticated users
- 👨‍💼 **Admin System** - Separate admin authentication and management
- 🛡️ **Password Hashing** - bcrypt encryption for user passwords

### User Interface
- 🎨 **Modern Design** - Dark theme with vibrant accent colors
- 📱 **Fully Responsive** - Works seamlessly on all device sizes
- 🎭 **Smooth Animations** - Polished transitions and interactions
- 🖱️ **Grid & List Views** - Multiple view modes for user lists
- 🍞 **Toast Notifications** - Real-time feedback for all operations

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Recharts** - Powerful charting library
- **@hello-pangea/dnd** - Drag and drop functionality
- **PropTypes** - Runtime type checking

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt/bcryptjs** - Password hashing
- **Cloudinary** - Cloud-based image management
- **multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mern-user-app.git
cd mern-user-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Update API endpoint in `frontend/src/config/config.js` if needed:
```javascript
export const API_URL = 'http://localhost:5000/api';
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

---

## ⚙️ Configuration (Environment Variables)

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/userdb` |
| `JWT_SECRET` | Secret key for JWT token signing | `your_very_secure_secret_key_123` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |
| `PORT` | Server port number | `5000` |

⚠️ **SECURITY WARNING**: Never commit your `.env` file to version control. Always use environment variables for sensitive data.

---

## ✅ How to Verify the Project is Working

### Backend Verification
1. **Check Server Status**
   - Open browser and navigate to: `http://localhost:5000`
   - You should see: "Backend API is Running..."
   - Check terminal for: "✅ MongoDB Connected Successfully!"

2. **Test API Endpoints**
   - Test health check: `GET http://localhost:5000/`
   - Test users endpoint: `GET http://localhost:5000/api/users`
   - Should return an empty array `[]` if no users exist

3. **Verify Database Connection**
   - Check MongoDB Compass or Atlas dashboard
   - Confirm `userdb` (or your database name) is created
   - Collections should appear after first user creation

### Frontend Verification
1. **Access the Application**
   - Open `http://localhost:5173` in your browser
   - You should see the login page with a modern dark interface

2. **Test Authentication**
   - **Register New Admin** (if first time):
     - Click "Sign Up" or navigate to registration
     - Fill in admin credentials
     - Click "Register"
   - **Login**:
     - Use test credentials (see below)
     - Click "Login"
     - Should redirect to dashboard

3. **Test Dashboard Features**
   - **View Statistics**: Check stats cards showing user counts
   - **View Charts**: Verify Recharts displays data visualization
   - **Navigate Sidebar**: Click through Dashboard, Users, Settings

4. **Test User Management**
   - **Add User**:
     - Navigate to "Users" page
     - Click "Add User" button
     - Fill in name, email, and optionally upload image
     - Click "Save"
     - User should appear in the list
   
   - **Edit User**:
     - Click "Edit" button on any user card
     - Modify user details
     - Click "Update"
     - Changes should reflect immediately
   
   - **Delete User**:
     - Click "Delete" button on a user card
     - Confirm deletion
     - User should be removed from list
   
   - **Toggle Views**:
     - Switch between Grid View and List View
     - Both views should display users correctly

5. **Test Kanban Board**
   - Navigate to Dashboard
   - Locate Kanban Board section
   - **Drag and Drop**:
     - Drag a user card from "Pending" to "Active"
     - Card should move smoothly
     - Status should update in database
     - Toast notification should appear
   - **Verify Persistence**:
     - Refresh the page
     - User should remain in the new column

6. **Test Image Upload**
   - Create or edit a user
   - Click "Choose File" or "Upload Image"
   - Select an image from your computer
   - Submit form
   - User avatar should display the uploaded image

### Mobile/Responsive Testing
1. **Resize Browser Window**
   - Dashboard should adapt to smaller screens
   - Sidebar should become collapsible
   - Cards should reflow appropriately

2. **Use Browser DevTools**
   - Open DevTools (F12)
   - Toggle device toolbar
   - Test on various device sizes (mobile, tablet)

---

## 🔐 Default Login Credentials

**(For testing purposes only - do not use in production)**

### Admin User
- **Email**: `-` *(Create your own admin account)*
- **Password**: `-`

### Standard Users
- **Email**: `admin@gmail.com`
- **Password**: `12345678`

**Note**: For security, please create your own admin account through the registration page with a strong password.

---

## 📁 Project Structure

```
mern-user-app/
├── backend/
│   ├── controllers/
│   │   └── [Controller files]
│   ├── models/
│   │   ├── UserModel.js          # User schema definition
│   │   └── Admin.js              # Admin schema definition
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── dashboard.js          # Dashboard analytics
│   │   ├── workflow.js           # Workflow/Kanban routes
│   │   ├── userRoutes.js         # User management routes
│   │   └── VerifyToken.js        # JWT middleware
│   ├── cloudinaryConfig.js       # Cloudinary setup
│   ├── index.js                  # Express app entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx     # Dashboard component
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── KanbanBoard.jsx   # Drag & drop board
│   │   │   ├── UserList.jsx      # User list display
│   │   │   ├── UserForm.jsx      # User creation form
│   │   │   ├── EditUserModal.jsx # User editing modal
│   │   │   ├── StatsCard.jsx     # Statistics card
│   │   │   ├── StatusBadge.jsx   # Status indicator
│   │   │   ├── Toast.jsx         # Notification toasts
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Dashboard page
│   │   │   ├── Users.jsx         # Users management page
│   │   │   └── Settings.jsx      # Settings page
│   │   ├── context/
│   │   │   └── [Context providers]
│   │   ├── config/
│   │   │   └── config.js         # API configuration
│   │   ├── hooks/
│   │   │   └── [Custom hooks]
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # Global styles
│   │   └── main.jsx              # Entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verify JWT token

### Users (Protected)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user (with image upload)
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete user
- `PUT /api/users/update-status` - Update user status (Kanban)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/analytics` - Get analytics data

### Workflow
- `GET /api/workflow/tasks` - Get workflow tasks
- `PUT /api/workflow/move` - Move task between columns

**Note**: All routes except `/api/auth/register` and `/api/auth/login` require JWT authentication via `Authorization: Bearer <token>` header.

---

## 🚀 Deployment

### Deploying Backend

**Option 1: Render**
1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start` or `node index.js`
4. Add environment variables from `.env`
5. Deploy

**Option 2: Heroku**
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your_uri JWT_SECRET=your_secret
git push heroku main
```

### Deploying Frontend

**Option 1: Vercel**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**Option 2: Netlify**
```bash
cd frontend
npm run build
# Upload dist folder to Netlify or use Netlify CLI
```

### Important Post-Deployment Steps
1. Update CORS in `backend/index.js` with your frontend URL
2. Update API URL in `frontend/src/config/config.js`
3. Verify MongoDB is accessible from deployment server
4. Test all features in production environment

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication**
- [ ] Admin registration works
- [ ] Admin login works with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] JWT token is stored in localStorage
- [ ] Protected routes redirect to login when not authenticated

**User CRUD**
- [ ] Create user with all fields
- [ ] Create user with image upload
- [ ] View all users in grid and list views
- [ ] Edit user details
- [ ] Edit user image
- [ ] Delete user
- [ ] Verify database updates after each operation

**Kanban Board**
- [ ] Users display in correct status columns
- [ ] Drag user from Pending to Active
- [ ] Drag user from Active to Inactive
- [ ] Status updates in database
- [ ] Changes persist after page refresh
- [ ] Toast notifications appear for status changes

**Dashboard**
- [ ] Statistics cards show correct counts
- [ ] Charts display data correctly
- [ ] Real-time updates when users are added/deleted

**UI/UX**
- [ ] Responsive design works on mobile
- [ ] All buttons and links are functional
- [ ] Forms validate input correctly
- [ ] Error messages display appropriately
- [ ] Success toasts appear for completed actions

---

## 🎨 Features in Detail

### Kanban Board System
- **Three Status Columns**: Pending, Active, Inactive
- **Drag & Drop Interface**: Using @hello-pangea/dnd library
- **Optimistic UI Updates**: Instant feedback before API confirmation
- **User Cards**: Display name, email, avatar, and status
- **Status Badge**: Color-coded indicators (yellow, green, red)
- **Real-time Sync**: Database updates immediately on drop

### Dashboard Analytics
- **Stats Cards**: 
  - Total Users
  - Active Users
  - Pending Users
  - Inactive Users
- **Charts**: Line charts showing user growth and distribution
- **Quick Actions**: Shortcuts to common tasks
- **Recent Activity**: Latest user additions and updates

### User Management
- **List View**: Compact table format
- **Grid View**: Card-based layout with avatars
- **Search Functionality**: Filter users by name or email
- **Bulk Actions**: Select multiple users for operations
- **Profile Modal**: Detailed view with all user information

---

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
- Verify `MONGO_URI` in `.env` is correct
- Check MongoDB Atlas network access allows your IP
- Ensure MongoDB service is running (if local)

**2. Cloudinary Upload Failing**
- Verify all three Cloudinary env variables are set
- Check Cloudinary dashboard for API key validity
- Ensure multer middleware is properly configured

**3. JWT Token Errors**
- Clear localStorage and login again
- Verify `JWT_SECRET` matches in backend
- Check token expiration settings

**4. CORS Errors**
- Update CORS origin in `backend/index.js`
- Ensure frontend URL is whitelisted
- Check for trailing slashes in URLs

**5. Drag & Drop Not Working**
- Clear browser cache
- Check browser console for errors
- Verify @hello-pangea/dnd is installed
- Ensure status values match backend (case-sensitive)

**6. Images Not Displaying**
- Verify Cloudinary URLs are accessible
- Check browser console for CORS or 404 errors
- Ensure image upload completed successfully

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

**Please ensure**:
- Code follows existing style guidelines
- All tests pass
- Documentation is updated if needed

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@benjamind111](https://github.com/benjamind111)
- Email: benjamindanieljr11@gmail.com

---

## 🙏 Acknowledgments

- MERN Stack community for excellent documentation
- Cloudinary for image hosting services
- MongoDB Atlas for cloud database
- Recharts for beautiful data visualization
- @hello-pangea/dnd for drag and drop functionality

---

## 📸 Screenshots

*(Add screenshots of your application here)*

### Dashboard
*[Screenshot of main dashboard with stats and charts]*

### User Management
*[Screenshot of user list in grid/list view]*

### Kanban Board
*[Screenshot of drag & drop workflow board]*

---

## 🔮 Future Enhancements

- [ ] Email notifications for user actions
- [ ] Advanced user filtering and sorting
- [ ] User import/export (CSV, Excel)
- [ ] Audit logs and activity history
- [ ] Role-based access control (RBAC)
- [ ] Multi-language support (i18n)
- [ ] Dark/Light theme toggle
- [ ] Advanced analytics and reporting
- [ ] Batch user operations
- [ ] User profile customization
- [ ] Real-time WebSocket updates
- [ ] Two-factor authentication (2FA)

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

---

**Built with ❤️ using the MERN Stack**
