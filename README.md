# Grand City Management System

A comprehensive building management dashboard for managing bills, owners, rent, and maintenance across multiple properties with Neon PostgreSQL database and Vercel serverless API.

## 🏢 Features

- **Neon PostgreSQL Database**: Cloud-based database with serverless API
- **37 Bills**: Electricity, PTCL, Gas, and Water bills
- **5 Buildings**: Plaza 170, 171, 172, 38 N Cantt View, and 129/7 D
- **4 Owners**: Complete contact information and building assignments
- **Smart Notifications**: 7-day advance alerts and overdue tracking
- **Advanced Filtering**: Filter by building, type, and status
- **Mobile Responsive**: Works perfectly on all devices
- **Vercel Serverless Functions**: Fast, scalable API endpoints

## 📊 Bill Types Covered

- ⚡ **Electricity** - Eurobiz Corporation & Guardian Developer
- 📞 **PTCL** - Telephone and Internet services
- 🔥 **Gas** - Natural gas utility
- 💧 **Water** - Municipal water supply

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Git (optional, for version control)
- Neon PostgreSQL database (free tier available at https://neon.tech)
- Vercel account (for deployment - free at https://vercel.com)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Neon DATABASE_URL:
```env
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"
```

3. **Run Local Development (Frontend Only)**
```bash
npm run dev
```

The app will open at `http://localhost:3000` (API will not work locally)

4. **Run Full Development (Frontend + API)**
```bash
npm run dev:full
```

This runs Vercel dev server with API support at `http://localhost:3000`

5. **Seed Database**
```bash
npm run seed
```

Check database status:
```bash
npm run seed:status
```

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in `dist` folder.

## 🌐 Deployment to Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
vercel --prod
```

## 📁 Project Structure

```
grand-city-dashboard/
├── api/                    # Vercel Serverless Functions
│   ├── bills.js            # Bills CRUD API
│   ├── owners.js           # Owners CRUD API
│   ├── maintenance.js      # Maintenance CRUD API
│   ├── communications.js    # Communications CRUD API
│   ├── rent.js            # Rent tracking CRUD API
│   └── health.js          # Health check endpoint
├── src/
│   ├── components/
│   │   └── GrandCityDashboard.jsx  # Main dashboard component
│   ├── api/
│   │   └── client.js      # API client for serverless functions
│   ├── App.jsx           # App wrapper
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── scripts/
│   ├── seed-database.js   # Database seeding script
│   └── check-db.js        # Database status checker
├── SeedData/              # Seed data JSON files
├── database/
│   └── schema.sql        # Database schema
├── dist/                  # Production build output
├── .env                  # Environment variables (not in git)
├── .env.example           # Environment variable template
├── vercel.json           # Vercel configuration
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend only (no API support) |
| `npm run dev:full` | Full development with API support (uses vercel dev) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run seed` | Seed database with initial data |
| `npm run seed:status` | Check database status |
| `npm run seed:owners` | Seed only owners data |
| `npm run seed:bills` | Seed only bills data |
| `vercel` | Deploy to Vercel preview |
| `vercel --prod` | Deploy to Vercel production |

## 📱 Features Overview

### Bills Management
- Add/Edit/Delete bills
- Track payment status
- Filter by building, type, status
- View complete bill details
- Customer IDs and reference numbers

### Owners Management
- Contact information
- Building assignments
- Bill summaries per owner
- Communication tracking
- Quick contact actions

### Rent Tracking
- Current and previous rent
- Automatic percentage increase calculation
- Security deposit tracking
- Due date notifications
- Tenant information

### Maintenance
- Priority-based tracking (High/Medium/Low)
- Assignment and cost tracking
- Due date management
- Status updates

### Communications
- Log owner communications
- Email, phone, meeting, WhatsApp
- Communication history
- Last contact tracking

## 🎨 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Neon PostgreSQL** - Serverless database
- **Vercel** - Hosting and serverless functions
- **pg (node-postgres)** - PostgreSQL client

## 🐛 Troubleshooting

### Page goes blank when clicking Owners/Bills
- Use `npm run dev:full` instead of `npm run dev` to enable API support locally
- Or deploy to Vercel to test the full application

### API not working locally
- The API endpoints (`/api/*`) only work with `vercel dev` or when deployed to Vercel
- Regular `vite` dev server doesn't support serverless functions

### Database connection issues
- Verify DATABASE_URL in `.env` is correct
- Check Neon database is active in the Neon console
- Try running `npm run seed:status` to test connection
- Make sure `sslmode=require` is included in the connection string

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure you have Node.js 18 or higher

### Owners not displaying buildings
- The buildings field is stored as JSONB in PostgreSQL
- The API automatically parses it to an array
- Check that the owners API returns the correct format

## 📝 License

This project is private and proprietary to Grand City.

## 👨‍💻 Developer

Built for Grand City by Ali
- Email: ali@grandcity.pk
- Version: 2.0.0
- Last Updated: March 2025

## 🔄 Version History

### v2.0.0 (Current)
- Migrated to Neon PostgreSQL database
- Added Vercel serverless functions API
- 37 bills with Electricity, PTCL, Gas, and Water
- Enhanced owner management with building assignments
- Improved mobile responsiveness
- Added rent tracking module
- Communication logging system
- Advanced filtering and search
- Health check endpoint for monitoring

### v1.0.0
- Initial release with localStorage-based bill management
