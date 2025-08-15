# Blog Application

> **Note: This is a practice project created for learning purposes. Also some pages are not responsive yet. **

A full-stack blog application built with React.js, Node.js, Express.js, and MongoDB. Features user authentication, post management, category management, file uploads, and a modern dark/light theme interface.

## 🚀 Features

### Authentication & Authorization
- User registration with email verification
- Secure login/logout system
- JWT-based authentication
- Password reset functionality
- Role-based access control (Admin: 1, Editor: 2, User: 3)

### Post Management
- Create, read, update, delete posts
- Rich text content support
- Image upload for featured images
- Category assignment
- User-specific post filtering
- Search functionality
- Pagination

### Category Management
- Create and manage post categories
- Admin/Editor only access
- Category-based post filtering

### User Interface
- Modern design with Tailwind CSS
- Clean black and white color scheme
- Toast notifications for user feedback

### File Management
- AWS S3 integration for image storage
- Secure file upload with validation
- Image optimization and storage

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **Nodemailer** - Email service

### Cloud Services
- **MongoDB Atlas** - Cloud database
- **AWS S3** - File storage
- **Vercel** - Deployment platform

## 📁 Project Structure

```
blog/
├── Frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React contexts
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   └── validators/      # Form validators
│   ├── public/              # Static assets
│   └── package.json
├── Backend/                 # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middlewares
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── validators/          # Input validators
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- AWS S3 bucket
- Email service (Gmail with app password)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kaival775/blox-blog.git
   cd blog
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the Backend directory:
   ```env
   PORT=8000
   CONNECTION_URL=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-jwt-secret
   SENDER_EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   AWS_ACCESS_KEY=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_BUCKET_NAME=your-s3-bucket-name
   AWS_REGION=your-aws-region
   ```

5. **Start Development Servers**
   
   Backend:
   ```bash
   cd Backend
   npm start
   ```
   
   Frontend:
   ```bash
   cd Frontend
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/verify-user` - Email verification
- `POST /auth/forget-password-code` - Request password reset
- `POST /auth/recover-password` - Reset password
- `PUT /auth/change-password` - Change password
- `PUT /auth/update-user` - Update profile
- `GET /auth/current-user` - Get current user

### Posts
- `GET /posts` - Get all posts
- `GET /posts/my-posts` - Get user's posts
- `GET /posts/:id` - Get single post
- `POST /posts/add-post` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Categories
- `GET /category` - Get all categories
- `GET /category/:id` - Get single category
- `POST /category/add-category` - Create category
- `PUT /category/:id` - Update category
- `DELETE /category/:id` - Delete category

### File Upload
- `POST /file/upload` - Upload file to S3
- `GET /file/signed-url` - Get signed URL
- `DELETE /file/delete` - Delete file

## 🎨 UI Features

### Theme System
- System preference detection
- Persistent theme selection
- Smooth transitions

### User Experience
- Loading states
- Error handling
- Form validation
- Success notifications
- Intuitive navigation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- File upload restrictions
- Environment variable protection
- Role-based access control

## 🤝 Contributing

This is a practice project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is for educational purposes only.

## 🙏 Acknowledgments

- Built as a learning project to understand full-stack development
- Inspired by modern blog platforms
- Uses industry-standard technologies and practices

## 📞 Contact

For any questions about this practice project, feel free to reach out!

---

**Note:** This project was created for learning and practice purposes. It demonstrates various web development concepts including authentication, CRUD operations, file handling, and modern UI/UX design patterns.