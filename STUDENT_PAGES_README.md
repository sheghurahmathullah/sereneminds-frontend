# Student Pages Documentation

## Overview
A comprehensive student-facing dashboard system with mood tracking, community features, rewards, and more. All pages use static data (no backend integration) and match the existing design system.

## Pages Created

### 1. **StudentDashboard** (`StudentDashboard.jsx`)
- Welcome greeting with current mood zone
- Quick stats cards (login streak, mood logs, rewards)
- Quick action shortcuts to all features
- Recent notifications panel
- **Route**: `/student/dashboard`

### 2. **StudentProfile** (`StudentProfile.jsx`)
- Personal information display and editing
- Student details (name, DOB, gender, contact info, address)
- Primary and secondary guardian/parent contact info
- Edit mode with form validation
- **Route**: `/student/profile`

### 3. **LogMood** (`LogMood.jsx`)
- Multi-step mood logging flow:
  - Step 1: Select emotion category (Happy, Sad, Angry, Anxious, Surprised, Calm)
  - Step 2: Choose subcategory, set impact/joyfulness sliders (1-7), add notes
  - Confirmation modal before submission
- Real-time zone calculation (Green/Yellow/Orange/Red)
- Date and time selection
- **Route**: `/student/log-mood`

### 4. **MoodHistory** (`MoodHistory.jsx`)
- Chronological list of mood logs
- Advanced filtering:
  - Date range (from/to)
  - Category selection
  - Impact level (min/max)
  - Joyfulness level (min/max)
- Detailed view modal for each entry
- Color-coded zones and emotions
- **Route**: `/student/mood-history`

### 5. **Calendar** (`Calendar.jsx`)
- Month view with mood indicators
- Color-coded dots for each day with mood logs
- Navigation between months
- Click day to view all mood entries for that day
- Today highlighting
- Multiple moods per day support
- **Route**: `/student/calendar`

### 6. **StreaksRewards** (`StreaksRewards.jsx`)
- Visual streak cards:
  - Login streak with progress bar
  - Mood log streak with progress bar
- Rewards grid with status (Claimed/Pending/Expired)
- Reward details include:
  - Points earned
  - Start/expiry dates
  - Type and description
- Claim reward functionality
- Filter by status
- **Route**: `/student/streaks-rewards`

### 7. **Referrals** (`Referrals.jsx`)
- Personal referral code and link with copy functionality
- Invite friends via:
  - Email
  - WhatsApp
  - SMS
- Stats dashboard (sent, accepted, pending, points earned)
- Sent invitations list with status tracking
- Invite form modal
- **Route**: `/student/referrals`

### 8. **Community** (`Community.jsx`)
- Two views:
  - Communities list (join/exit, view details)
  - Posts feed from joined communities
- Community features:
  - Join/exit communities
  - View member count and post count
- Post features:
  - Create posts
  - Like/unlike posts
  - Comment count display
  - Share functionality
  - Pin posts (for own posts)
  - Report inappropriate content
- Report modal with multiple reason options
- **Route**: `/student/community`

### 9. **Notifications** (`Notifications.jsx`)
- Comprehensive notification feed
- Filter by:
  - All
  - Unread
  - Rewards
  - System notifications
- Bulk actions:
  - Mark all as read
  - Select multiple for deletion
  - Select/deselect all
- Notification types:
  - Rewards
  - System updates
  - Account changes
  - Community activity
  - Reminders
- Unread indicator and count
- **Route**: `/student/notifications`

## Design System

### Colors
- **Primary**: `#00c7b7` / `#1cc5b7` (Teal/Turquoise)
- **Secondary Text**: `#b0b0b0` (Gray)
- **Background**: `#fafbfc` (Light Gray)
- **Text Dark**: `#222` / `#444`
- **Text Light**: `#888` / `#999`

### Zone Colors
- **Green Zone**: `#2ecc71`
- **Yellow Zone**: `#f39c12`
- **Orange Zone**: `#e67e22`
- **Red Zone**: `#e74c3c`

### Typography
- **Font Family**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Border Radius**: 12px-14px for cards, 8px-10px for inputs
- **Box Shadow**: `0 2px 8px rgba(0,0,0,0.03)` for cards
- **Transitions**: `all 0.2s` for smooth interactions

## Installation & Setup

### Step 1: Add Routes to App.js
Add these imports at the top of your `App.js`:

```javascript
import {
  StudentDashboard,
  StudentProfile,
  LogMood,
  MoodHistory,
  Calendar,
  StreaksRewards,
  Referrals,
  Community,
  Notifications,
} from './pages/Student';
```

### Step 2: Add Routes
Add these routes inside your `<Routes>` component:

```javascript
{/* Student Pages */}
<Route path="/student/dashboard" element={<StudentDashboard />} />
<Route path="/student/profile" element={<StudentProfile />} />
<Route path="/student/log-mood" element={<LogMood />} />
<Route path="/student/mood-history" element={<MoodHistory />} />
<Route path="/student/calendar" element={<Calendar />} />
<Route path="/student/streaks-rewards" element={<StreaksRewards />} />
<Route path="/student/referrals" element={<Referrals />} />
<Route path="/student/community" element={<Community />} />
<Route path="/student/notifications" element={<Notifications />} />
```

### Step 3: Update Sidebar (Optional)
If you want to add student navigation to your sidebar, add these menu items:

```javascript
const studentMenuItems = [
  { path: '/student/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { path: '/student/profile', icon: <FiUser />, label: 'Profile' },
  { path: '/student/log-mood', icon: <FiHeart />, label: 'Log Mood' },
  { path: '/student/mood-history', icon: <FiTrendingUp />, label: 'Mood History' },
  { path: '/student/calendar', icon: <FiCalendar />, label: 'Calendar' },
  { path: '/student/streaks-rewards', icon: <FiAward />, label: 'Rewards' },
  { path: '/student/referrals', icon: <FiSend />, label: 'Referrals' },
  { path: '/student/community', icon: <FiUsers />, label: 'Community' },
  { path: '/student/notifications', icon: <FiBell />, label: 'Notifications' },
];
```

## Features Implemented

### ✅ All Required Features
- [x] Home/Overview Dashboard with greeting, stats, shortcuts
- [x] Student Profile with personal & guardian info
- [x] Log Mood with category/subcategory, impact/joyfulness sliders
- [x] Mood History with filters and detail view
- [x] Calendar with mood indicators
- [x] Streaks & Rewards with progress tracking
- [x] Referrals/Invite with multiple sharing methods
- [x] Community with join/exit, posts, likes, report
- [x] Notifications with filtering and bulk actions

### 🎨 Design Features
- Premium, modern UI matching masterdata design
- Consistent color scheme and typography
- Smooth transitions and hover effects
- Responsive design for mobile/tablet/desktop
- Emoji icons for visual appeal
- Card-based layouts
- Modal dialogs for actions
- Interactive components (sliders, toggles, etc.)

### 📊 Static Data
All pages use realistic static data:
- 50+ mood log entries
- 6 communities with posts
- 12 notifications
- 8 sent referrals
- 6 rewards
- Complete profile information

## File Structure
```
src/pages/Student/
├── Student.css              # Shared styles for all student pages
├── StudentDashboard.jsx     # Main dashboard/home
├── StudentProfile.jsx       # Profile management
├── LogMood.jsx             # Mood logging flow
├── MoodHistory.jsx         # Mood logs history
├── Calendar.jsx            # Calendar view
├── StreaksRewards.jsx      # Streaks and rewards
├── Referrals.jsx           # Invite friends
├── Community.jsx           # Community features
├── Notifications.jsx       # Activity feed
└── index.js                # Export file for easy imports
```

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes for Backend Integration
When ready to connect to backend:

1. Replace static data arrays with API calls
2. Add loading states and error handling
3. Implement form submission logic
4. Add authentication checks
5. Update state management (consider Redux/Context)
6. Add real-time updates (WebSockets for notifications)

## Demo Credentials (Static Data)
- Student Name: Sarah Johnson
- Student ID: STU-2024-0156
- Email: sarah.johnson@email.com
- Current Streak: 15 days
- Total Moods: 45

## Support
For any issues or questions about the student pages, please refer to the individual component files. Each component is well-documented with comments explaining the functionality.

---

**Created**: January 2024  
**Version**: 1.0.0  
**Status**: Ready for Integration ✨


