
export * from './tour-service';
export * from './accommodation-service';
export * from './booking-service';
export * from './user-service';
export * from './audit-service';

// For backward compatibility, re-export individual services as a unified API
import { tourService } from './tour-service';
import { accommodationService } from './accommodation-service';
import { bookingService } from './booking-service';
import { userService } from './user-service';
import { auditService } from './audit-service';

/**
 * @deprecated Use individual service modules instead
 */
export const apiService = {
  // Tours
  getTours: tourService.getTours.bind(tourService),
  getTourById: tourService.getTourById.bind(tourService),
  
  // Accommodations
  getAccommodations: accommodationService.getAccommodations.bind(accommodationService),
  getAccommodationById: accommodationService.getAccommodationById.bind(accommodationService),
  
  // Bookings
  getUserBookings: bookingService.getUserBookings.bind(bookingService),
  createBooking: bookingService.createBooking.bind(bookingService),
  cancelBooking: bookingService.cancelBooking.bind(bookingService),
  
  // User profiles
  getUserProfile: userService.getUserProfile.bind(userService),
  createOrUpdateUserProfile: userService.createOrUpdateUserProfile.bind(userService),
  
  // User roles
  getUserRoles: userService.getUserRoles.bind(userService),
  hasRole: userService.hasRole.bind(userService),
  
  // Audit logs
  getAuditLogs: auditService.getAuditLogs.bind(auditService),
  addAuditLog: auditService.addAuditLog.bind(auditService),
};
