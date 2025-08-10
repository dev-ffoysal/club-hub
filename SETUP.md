# Club Management Hub - Setup Guide

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clubhub?retryWrites=true&w=majority

# Authentication
NEXTAUTH_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Club Management Hub"
```

### 3. Install Additional UI Dependencies

```bash
# Install Lucide React for icons
npm install lucide-react

# Install additional Radix UI components if needed
npm install @radix-ui/react-icons
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
club-management-hub/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── clubs/              # Club pages
│   │   ├── events/             # Event pages
│   │   ├── apply/              # Application form
│   │   ├── dashboard/          # Member dashboard
│   │   ├── admin/              # Club admin pages
│   │   └── super-admin/        # Super admin pages
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   └── constants.ts        # App constants
│   └── types/
│       └── index.ts            # TypeScript definitions
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Public Pages
- **Homepage** (`/`) - Landing page with features
- **Clubs** (`/clubs`) - Browse all clubs
- **Events** (`/events`) - Browse all events
- **Club Details** (`/clubs/[slug]`) - Individual club pages
- **Apply** (`/apply`) - Club application form

### Member Dashboard
- **Dashboard** (`/dashboard`) - Personal overview
- **My Clubs** - Joined clubs management
- **Events** - Personal event calendar
- **Notifications** - Real-time updates

### Club Admin Dashboard
- **Dashboard** (`/admin/dashboard`) - Club overview
- **Members** (`/admin/members`) - Member management
- **Events** (`/admin/events`) - Event management
- **Communications** (`/admin/communications`) - Chat & notifications
- **Finances** (`/admin/finances`) - Financial management

### Super Admin Dashboard
- **Dashboard** (`/super-admin/dashboard`) - Platform overview
- **Applications** - Review club applications
- **Clubs** - Manage all clubs
- **Analytics** - Platform analytics

## Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   npm install
   ```

2. **TypeScript errors**
   ```bash
   npm run build
   ```

3. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check `globals.css` imports

4. **Component errors**
   - Install missing Radix UI components
   - Check import paths

### Development Tips

1. **Hot Reload**: The development server supports hot reload
2. **TypeScript**: All components are fully typed
3. **Responsive**: All pages are mobile-responsive
4. **Accessibility**: Components follow WCAG guidelines

## Next Steps

1. **Database Setup**: Configure MongoDB Atlas connection
2. **Authentication**: Implement NextAuth.js
3. **Email Service**: Configure email provider
4. **File Upload**: Set up Cloudinary or similar
5. **Deployment**: Deploy to Vercel or similar platform

## Support

For issues and questions:
- Check the troubleshooting section
- Review the component documentation
- Check Next.js 14 documentation
- Review Tailwind CSS documentation