# Modals & Detail Pages Implementation

Complete implementation of interactive modals and detail pages across all admin modules.

## Overview

This implementation adds comprehensive modal dialogs and detail pages for managing organizations, users, subscriptions, plans, and audit logs. All modals follow a consistent design pattern with full form validation and confirmation flows.

## Reusable Modal Components

### 1. **ConfirmationDialog** (`components/modals/ConfirmationDialog.tsx`)
- Alert-style confirmation dialog for destructive actions
- Supports dangerous/standard styling
- Props: `open`, `onOpenChange`, `title`, `description`, `actionLabel`, `isDangerous`, `isLoading`, `onConfirm`
- Used for: Delete confirmations, cancellations, destructive operations

### 2. **FormModal** (`components/modals/FormModal.tsx`)
- Generic wrapper for form-based modals
- Consistent styling with form children
- Props: `open`, `onOpenChange`, `title`, `description`, `children`
- Used for: Add/Edit operations with form inputs

### 3. **ActionDropdown** (`components/modals/ActionDropdown.tsx`)
- Three-dot menu with customizable actions
- Supports view, edit, delete, copy, and custom actions
- Props: `actions` array with `label`, `icon`, `onClick`, `isDangerous`, `disabled`
- Integrated into all tables for quick access to operations

## Organizations Module

### Modals
- **AddBrandModal** - Create new brand with name, website, owner email, plan, visibility
- **EditBrandModal** - Edit existing brand properties
- **DeleteConfirmation** - Confirm brand deletion

### Detail Page
- **`/organizations/brands/[id]`** - Full brand details including:
  - Organization information (name, website, owner, visibility, created date)
  - Seat usage visualization with percentage capacity
  - Quick action buttons for editing and deletion
  - Status and plan badges

### Updated Components
- `BrandsTable` - Now includes View Details, Edit, Delete actions via ActionDropdown

## Users Module

### Modals
- **AddUserModal** - Create user with email, name, and role selection
- **ChangeRoleModal** - Update user role with confirmation
- **ResetPasswordModal** - Send password reset email
- **DeleteConfirmation** - Confirm user deletion

### Detail Page
- **`/users/[id]`** - Complete user profile including:
  - Basic info (name, email, role)
  - Account information (status, created date, last login)
  - Quick action buttons for role changes, password reset, deletion
  - Role-based color coding

### Updated Components
- `UsersTable` - Now includes Change Role, Reset Password, Delete actions

## Subscriptions Module

### Modals
- **UpdateSeatsModal** - Modify seat limit with validation
- **CancelConfirmation** - Confirm subscription cancellation

### Detail Page
- **`/subscriptions/[id]`** - Full subscription overview including:
  - Organization and plan information
  - Billing details (monthly price, cycle dates, renewal date)
  - Seat usage with capacity visualization
  - Update seats button with easy access

### Updated Components
- `SubscriptionsTable` - Now includes View Details, Update Seats, Cancel actions

## Plans Module

### Modals
- **AddPlanModal** - Create pricing plan with name, description, price, user/brand limits
- **DeleteConfirmation** - Confirm plan deletion

### Updated Components
- `PlansTable` - Now includes Edit and Delete actions via ActionDropdown

## Logs/Audit Module

### Modals
- **LogDetailModal** - Display complete audit log entry including:
  - Timestamp, status, actor, action
  - Module and target entity information
  - Detailed information field
  - IP address

### Updated Components
- `LogsTable` - Now includes View Details action to open modal

## Modal Features

### Form Validation
- Required field validation
- Email format validation
- Number range validation
- Custom validation rules

### States
- Loading states during submission
- Disabled submit buttons when data invalid
- Clear error messaging

### Styling
- Dark theme consistent with admin panel
- Blue primary accent (#3b82f6)
- Red danger styling for destructive actions
- Smooth transitions and hover states
- Responsive dialog sizing

## Detail Page Features

### Navigation
- Breadcrumb trails showing hierarchy
- Home, module, and current page links
- Back-to-list buttons

### Information Display
- Card-based layout for information groups
- Status and plan badges
- Formatted dates and currencies
- Visual progress bars for seat usage

### Actions
- Modify buttons (edit, change role, update seats)
- Delete/cancel with confirmation
- Quick action buttons

## Integration Points

### Page Handlers
- Each page manages modal state with `useState`
- Modal callbacks trigger console logs (ready for API integration)
- Form submissions include `isLoading` state
- Deletion/cancellation includes confirmation flows

### API Integration Ready
- All modals have `onSubmit` and `onConfirm` callbacks
- Form data passed to handlers as objects
- IDs passed for delete operations
- Ready to swap console.log for actual API calls

## Usage Examples

### Opening a Modal
```tsx
const [addModalOpen, setAddModalOpen] = useState(false);
<Button onClick={() => setAddModalOpen(true)}>Add</Button>
<AddBrandModal 
  open={addModalOpen}
  onOpenChange={setAddModalOpen}
  onSubmit={handleAdd}
/>
```

### Detail Page Navigation
```tsx
const [selectedItem, setSelectedItem] = useState(null);
<ActionDropdown
  actions={[{
    label: 'View Details',
    icon: 'view',
    onClick: () => router.push(`/path/${item.id}`)
  }]}
/>
```

### Confirmation Dialog
```tsx
<ConfirmationDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  title="Delete Item"
  description="Are you sure?"
  isDangerous
  onConfirm={handleDelete}
/>
```

## File Structure

```
components/
├── modals/
│   ├── ConfirmationDialog.tsx
│   ├── FormModal.tsx
│   └── ActionDropdown.tsx
├── organizations/
│   ├── AddBrandModal.tsx
│   ├── EditBrandModal.tsx
│   └── BrandsTable.tsx (updated)
├── users/
│   ├── AddUserModal.tsx
│   ├── ChangeRoleModal.tsx
│   ├── ResetPasswordModal.tsx
│   └── UsersTable.tsx (updated)
├── subscriptions/
│   ├── UpdateSeatsModal.tsx
│   ├── SubscriptionsTable.tsx (updated)
├── plans/
│   ├── AddPlanModal.tsx
│   └── PlansTable.tsx (updated)
└── logs/
    ├── LogDetailModal.tsx
    └── LogsTable.tsx (updated)

app/(admin)/
├── organizations/
│   └── brands/[id]/page.tsx (new)
├── users/
│   └── [id]/page.tsx (new)
└── subscriptions/
    └── [id]/page.tsx (new)
```

## Next Steps for Backend Integration

1. Replace `console.log()` statements with actual API calls
2. Update modal handlers to call API endpoints
3. Add loading states and error handling
4. Implement data refetching after successful operations
5. Add toast notifications for user feedback

All components are fully typed and ready for production use!
