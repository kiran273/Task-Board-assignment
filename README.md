# Task Board Application

A modern, feature-rich task management application built with React, featuring drag-and-drop functionality, activity tracking, and persistent local storage.

- Framer Motion for beautiful animations
- @dnd-kit for accessible drag and drop

## Live Demo

**Deployed Application**: https://task-board-app.vercel.app

**Login Credentials:**
- Email: intern@demo.com
- Password: intern123


##  Features

### Authentication
- **Static Login Flow** with hardcoded credentials
- Email: `intern@demo.com`
- Password: `intern123`
- "Remember me" functionality using localStorage
- Protected routes with authentication guard
- Secure logout functionality

### Task Management
- **Three Fixed Columns**: Todo, Doing, Done
- **Comprehensive Task Properties**:
  - Title (required)
  - Description
  - Priority (Low, Medium, High)
  - Due Date
  - Tags (multiple, comma-separated)
  - Created timestamp (auto-generated)
- Full CRUD operations (Create, Read, Update, Delete)
- Form validation with error messages
- Modal-based task creation and editing

### Drag & Drop
- Smooth drag-and-drop functionality using @dnd-kit
- Visual feedback during drag operations
- Move tasks between columns effortlessly
- Touch-friendly for mobile devices

### Search & Filters
- **Search**: Find tasks by title
- **Filter by Priority**: All, Low, Medium, High
- **Sort Options**:
  - By Created Date (default)
  - By Due Date (empty values last)
- Real-time filtering and sorting

### Activity Log
- Track all task operations:
  - Task created
  - Task edited
  - Task moved between columns
  - Task deleted
- Displays relative timestamps (e.g., "2 minutes ago")
- Sliding panel with activity history
- Color-coded activity types

### Data Persistence
- All data persists in localStorage
- Automatic save on every change
- Graceful handling of missing or corrupted data
- Reset board option with confirmation dialog
- Session persistence with "Remember me"

### Design & UX
- **Modern Dark Theme** with gradient accents
- **Smooth Animations** using Framer Motion
- **Responsive Design** - works on desktop, tablet, and mobile
- **Custom Font Pairing**: DM Sans + JetBrains Mono
- **Accessible** with proper ARIA labels and keyboard navigation
- **Glass-morphism** effects and floating gradients

##  Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Extract the ZIP file**
   ```bash
   unzip task-board-app.zip
   cd task-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Login with credentials**
   - Email: `intern@demo.com`
   - Password: `intern123`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

##  Testing

Run the test suite:

```bash
npm test
```

### Test Coverage
- **Authentication Tests**: Login validation, error handling, empty field checks
- **Task Management Tests**: CRUD operations, form validation, task editing
- **Persistence Tests**: localStorage operations, data loading, state recovery

##  Project Structure

```
task-board/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx       # App header with search & filters
│   │   ├── Column.jsx       # Kanban column component
│   │   ├── TaskCard.jsx     # Individual task card
│   │   ├── TaskModal.jsx    # Task create/edit modal
│   │   ├── ActivityLog.jsx  # Activity history panel
│   │   └── ProtectedRoute.jsx # Auth route guard
│   ├── contexts/            # React Context for state
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── TaskContext.jsx  # Task management state
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Login page
│   │   └── Board.jsx        # Main task board
│   ├── test/                # Test files
│   │   ├── Auth.test.jsx
│   │   ├── Task.test.jsx
│   │   └── Persistence.test.jsx
│   ├── App.jsx              # Root component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

##  Technology Stack

### Core
- **React 18.3.1** - UI library
- **React Router DOM 6.22.0** - Client-side routing
- **Vite 5.1.0** - Build tool and dev server

### State Management
- **React Context API** - Global state management
- **localStorage** - Client-side data persistence

### UI & Animations
- **Framer Motion 11.0.0** - Animation library
- **@dnd-kit** - Drag and drop functionality
- **Lucide React** - Icon library
- **Custom CSS** - Styled with CSS variables

### Date Handling
- **date-fns 3.3.1** - Date formatting and manipulation

### Testing
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing

##  Design Philosophy

The application features a distinctive dark theme with:
- **Color Palette**: Deep blacks with vibrant accent colors
- **Typography**: DM Sans for UI, JetBrains Mono for code elements
- **Animations**: Smooth, purposeful transitions
- **Gradients**: Floating orb backgrounds and button effects
- **Accessibility**: High contrast ratios, keyboard navigation

##  Key Implementation Details

### State Management
Uses React Context API with two providers:
- **AuthContext**: Manages user authentication and sessions
- **TaskContext**: Handles all task CRUD operations and activity tracking

### Data Flow
1. User actions trigger context methods
2. Context updates state and localStorage simultaneously
3. UI re-renders with updated state
4. Activity log tracks all mutations

### Form Validation
- Client-side validation with real-time feedback
- Title: Required, max 100 characters
- Description: Optional, max 500 characters
- Priority: Enum validation (low/medium/high)
- Due Date: Future dates only

### Persistence Strategy
- **Auto-save**: Every state change writes to localStorage
- **Error Recovery**: Try-catch blocks handle corrupted data
- **Session Management**: JWT-style timestamp validation

##  Security Considerations

This is a frontend-only demo application with:
- Hardcoded credentials (not for production use)
- Client-side only authentication
- No backend API integration
- localStorage for session management

**For production**, would need:
- Backend authentication service
- Secure token management
- Database integration
- Proper password hashing

##  Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Deployment

### Vercel (Recommended)

Vercel provides the simplest deployment process for React applications.

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git or upload the project folder
4. Vercel will auto-detect Vite and configure build settings
5. Click "Deploy"



**Note**: This application uses localStorage for data persistence. Data is stored in your browser and will be lost if you clear browser data. Use the "Reset Board" feature to clear all data.


