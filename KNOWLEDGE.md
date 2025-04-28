# Tuca Journeys Knowledge File

## Project Overview
Tuca Journeys is a travel booking platform focused on Fernando de Noronha, Brazil. It provides a comprehensive solution for managing tours, accommodations, and travel packages. The platform serves both end-users looking to book travel experiences and administrators managing the offerings.

## User Personas
- **Tourists/Travelers:** Users looking to book tours, accommodations, and travel packages in Fernando de Noronha.
- **Administrators:** Team members who manage listings, bookings, and content on the platform.
- **Tour Guides/Partners:** Local service providers who offer tours and experiences listed on the platform.

## Feature Specifications
- **Authentication:** User registration, login, and profile management with Supabase authentication.
- **Tour Booking:** Browse, filter, and book guided tours and experiences.
- **Accommodation Booking:** Search and book places to stay during the trip.
- **Travel Packages:** Combined offerings of tours and accommodations.
- **E-commerce:** Shop for merchandise related to Fernando de Noronha.
- **Admin Dashboard:** Comprehensive tools for managing listings, bookings, and users.
- **Interactive Map:** Explore offerings based on geographical location.
- **Reporting:** Analytics and metrics on bookings and platform performance.

## Design Assets
- All images are stored in the `/public` directory.
- UI components utilize shadcn/ui combined with Tailwind CSS for styling.
- Responsive design for mobile, tablet, and desktop views.

## API Documentation
- **Backend:** Uses Supabase as the backend service with the following main resources:
  - Authentication: `/auth/*`
  - Users: `/user-profiles`
  - Tours: `/tours`
  - Accommodations: `/accommodations`
  - Bookings: `/bookings`
  - Products: `/products`
- Supabase client is initialized in `src/lib/supabase.ts` and `src/integrations/supabase/client.ts`.

## Database Schema
- **user_profiles:** Stores user information beyond authentication data
- **user_roles:** Defines role-based access control
- **tours:** Stores tour listings and details
- **accommodations:** Manages accommodation listings
- **bookings:** Tracks all user bookings
- **products:** E-commerce product listings
- Types are extended in `src/integrations/supabase/types-extensions.ts`

## Environment Setup
1. **Prerequisites:**
   - Node.js and npm installed
   - Supabase account and project setup

2. **Local Development:**
   ```sh
   git clone <repository-url>
   cd tuca-journeys-82
   npm install
   npm run dev
   ```

3. **Environment Variables:**
   - Supabase URL and API keys are required for integration
   - For production, these should be set in environment variables

## Testing Guidelines
- Unit tests should be added for all new functionality
- End-to-end testing can be implemented using Cypress or similar tools

## Deployment Instructions
- **Development:**
  - Via Lovable: Open Lovable and use Share -> Publish
  - Manual: Run `npm run build` and deploy the `dist` directory

- **Production:**
  - Setup proper environment variables for production
  - Ensure database security rules are correctly configured

## Version Control Practices
- Use Git for version control
- Feature branches should be created for new functionality
- Pull requests should be reviewed before merging
- Automated deployments via Lovable platform

## Security Practices
- Authentication is managed through Supabase
- Admin access is restricted based on user roles
- Payment processing should use secure payment gateways
- Database rules should be set up to restrict access to sensitive data

## Compliance Requirements
- Implement GDPR compliance for user data
- Ensure accessibility standards are met (WCAG 2.1)
- Follow Brazilian e-commerce regulations for online bookings
