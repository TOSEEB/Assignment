# Teknorix Jobs App

A React.js application to display active job openings with search and filter functionality.

## Features

- **Job Listings**: Display all active job openings grouped by department
- **Search & Filter**: Search jobs by title and filter by department, location, and function
- **Job Details**: Detailed view of each job opening with related jobs
- **Social Sharing**: Share job postings on Facebook, LinkedIn, and Twitter
- **Responsive Design**: Mobile-friendly interface
- **URL Persistence**: Filters are retained on page refresh and navigation

## Technologies Used

- React.js   the repo name not the foler name of my current
- React Router for navigation
- Axios for API calls
- CSS3 for styling
- HTML5

## API Integration

The app integrates with the Teknorix Jobsoid API:
- Base URL: `https://teknorix.jobsoid.com/`
- Jobs endpoint: `/api/v1/jobs`
- Job details: `/api/v1/jobs/{id}`
- Lookups: `/api/v1/lookups/departments`, `/api/v1/lookups/locations`, `/api/v1/lookups/functions`

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

```
src/
├── components/
│   ├── JobList.js          # Main jobs listing page
│   ├── JobList.css
│   ├── JobDetails.js       # Individual job details page
│   ├── JobDetails.css
│   ├── SearchFilters.js    # Search and filter component
│   ├── SearchFilters.css
│   ├── SocialShare.js      # Social sharing component
│   └── SocialShare.css
├── api.js                  # API service functions
├── App.js                  # Main app component with routing
├── App.css                 # Global styles
└── index.js                # App entry point
```

## Features Implementation

### Search & Filter
- Real-time search by job title
- Filter by department, location, and function
- Applied filters are displayed with remove option
- Server-side filtering through API parameters

### Job Listings
- Jobs grouped by department
- Card-based layout with job information
- View Details and Apply Now buttons
- Responsive grid layout

### Job Details
- Complete job information display
- Related jobs from the same department
- Social sharing functionality
- Back navigation to job list

### Social Sharing
- Share to Facebook, LinkedIn, Twitter
- Copy link to clipboard
- Share current job URL with title

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Teknorix job application test.