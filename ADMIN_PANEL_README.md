# Super Admin Panel - Marketing Hub

A production-ready enterprise administration dashboard for managing organizations, users, plans, subscriptions, and audit logs.

## Features Implemented

### Authentication System
- Login page with email/password validation
- Session management with localStorage
- Protected routes via middleware
- Logout functionality
- Demo credentials: `admin@example.com` / `password`

### Dashboard
- 6 KPI cards showing key metrics (brands, agencies, users, subscriptions, MRR, churn)
- Recent activity widget with latest system actions
- Subscription distribution by plan
- Platform status widget with health metrics

### Organization Management
- **Brands View**: Searchable/filterable table with plan and status filters
  - Columns: Name, Website, Owner Email, Plan, Status, Seats, Actions
  - Quick actions: View, Edit, Delete
- **Agencies View**: Accordion-style cards with nested brand tables
  - Shows agency summary with brand count and seats used
  - Expandable to view all associated brands

### User Management
- Global user list with role-based filtering
- Search by name or email
- Columns: Name, Email, Role, Status, Last Login, Created Date
- Admin user management

### Plans Management
- Complete plan listing with pricing and features
- Plan status tracking (available/deprecated)
- Actions: Edit, Delete
- Feature count display

### Subscriptions Management
- Monitor all active subscriptions
- Billing status tracking (active, past due, suspended, cancelled)
- Seat usage monitoring
- Billing cycle tracking (monthly/yearly)
- Renewal date visibility
- Filters: Organization type, billing status, plan, status

### Audit Logs
- Comprehensive audit trail of all system actions
- Search by actor, entity, or IP address
- Filter by action type, module, and status
- Detailed view of each log entry
- Tracks: timestamp, actor, action, module, target entity, status, IP address

## Architecture

### Technology Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: lucide-react
- **Forms**: React Hook Form (ready for integration)
- **State**: React Context for auth, hooks for local state
- **Data**: Mock data with full TypeScript typing

### Folder Structure
```
app/
├── (auth)/           # Authentication routes (login, etc.)
├── (admin)/          # Admin dashboard routes
│   ├── dashboard/
│   ├── organizations/
│   ├── users/
│   ├── plans/
│   ├── subscriptions/
│   └── logs/
components/
├── auth/             # Auth-related components
├── layout/           # Sidebar, Header, AdminLayout
├── dashboard/        # Dashboard widgets
├── organizations/    # Organizations components
├── users/            # Users components
├── plans/            # Plans components
├── subscriptions/    # Subscriptions components
├── logs/             # Logs components
├── shared/           # Reusable components (StatusBadge, etc.)
└── ui/               # shadcn/ui components
lib/
├── types.ts          # Full TypeScript interfaces
├── constants.ts      # Enums and configuration
├── mock-data.ts      # Typed mock data
├── auth-context.tsx  # Auth provider and hooks
├── formatting.ts     # Utility functions
```

## Authentication

### Login Flow
1. User navigates to `/login`
2. Enters demo credentials: `admin@example.com` / `password`
3. Auth context stores session in localStorage
4. User is redirected to dashboard
5. Sidebar shows user info and logout button

### Protected Routes
- Middleware redirects unauthenticated users to `/login`
- Auth context provides `useAuth()` hook for checking authentication state

## Mock Data

All data is fully typed and structured in `lib/mock-data.ts`:
- 2 mock users (admin and moderator roles)
- 4 mock brands with varying plans and statuses
- 2 mock agencies with nested brands
- 3 subscription plans
- 4 mock subscriptions with different billing statuses
- Sample audit logs

## Styling & Design

### Color Scheme
- Background: Slate-900 (#0f172a)
- Surfaces: Slate-800 (#1e293b)
- Primary: Blue (#3b82f6)
- Text: Slate-100 and Slate-400
- Accents: Emerald, Purple, Cyan for status and plans

### Responsive Design
- Mobile-first Tailwind approach
- Tables convert to stacked cards on mobile
- Sidebar drawer on mobile devices
- Filters wrap naturally on smaller screens
- Tested at: 320px, 768px, 1024px, 1280px+ breakpoints

## How to Use

### Development
```bash
pnpm install
pnpm dev
# Navigate to http://localhost:3000
```

### Building
```bash
pnpm build
pnpm start
```

### Login
- Email: `admin@example.com`
- Password: `password`

## Future Integration Points

### Backend API
1. Replace mock data with real API calls
2. Create `/app/api/*` endpoints for CRUD operations
3. Implement real database queries

### Authentication
1. Replace localStorage with JWT or session cookies
2. Add real password hashing and validation
3. Implement password reset flow

### File Uploads
1. Add brand logos and user avatars
2. Integrate with file storage service

### Real-time Features
1. WebSockets for activity log updates
2. Real-time subscription status changes
3. Notification system

## Components Highlight

### Shared Components
- `StatusBadge`: Status display with color coding
- `PlanBadge`: Plan tier badge with branding colors
- `PageHeader`: Consistent page titles and actions
- `EmptyState`: Standardized empty state displays

### Reusable Tables
- `BrandsTable`: Searchable brands with actions
- `UsersTable`: User management table
- `PlansTable`: Plans display
- `SubscriptionsTable`: Subscription management
- `LogsTable`: Audit logs with filtering

### Layout Components
- `Sidebar`: Navigation with active state tracking
- `Header`: Search, user menu, logout
- `AdminLayout`: Main layout wrapper

## Code Quality

- Full TypeScript typing throughout
- Consistent error handling
- Accessible UI with semantic HTML
- Clean component separation
- Reusable utility functions
- No monolithic files
- Ready for backend integration

## Notes

- All routes are currently static (client-side rendering)
- Mock data updates in-memory only (no persistence)
- Search and filtering happen client-side
- Form validation ready for React Hook Form + Zod integration
- Image placeholders use Tailwind, ready for actual assets
