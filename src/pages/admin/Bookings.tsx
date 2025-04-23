
import React, { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import BookingFilters from "@/components/admin/bookings/BookingFilters";
import BookingsTable from "@/components/admin/bookings/BookingsTable";
import BookingDetailDrawer from "@/components/admin/bookings/BookingDetailDrawer";
import { Booking } from "@/types/bookings";

// Dummy bookings data
const dummyBookings = [
  {
    id: "B1234",
    user_name: "Maria Silva",
    user_email: "maria@example.com",
    item_type: "tour" as const,
    item_name: "Mergulho em Noronha",
    start_date: "2023-09-10",
    end_date: "2023-09-10",
    guests: 2,
    total_price: 450.0,
    status: "confirmed" as const,
    payment_status: "paid" as const,
    created_at: "2023-08-25T14:30:00",
  },
  {
    id: "B1235",
    user_name: "João Oliveira",
    user_email: "joao@example.com",
    item_type: "accommodation" as const,
    item_name: "Pousada Vista Mar",
    start_date: "2023-10-15",
    end_date: "2023-10-20",
    guests: 3,
    total_price: 2500.0,
    status: "pending" as const,
    payment_status: "pending" as const,
    created_at: "2023-08-28T09:15:00",
  },
  {
    id: "B1236",
    user_name: "Ana Santos",
    user_email: "ana@example.com",
    item_type: "package" as const,
    item_name: "Noronha Completo",
    start_date: "2023-11-05",
    end_date: "2023-11-12",
    guests: 2,
    total_price: 5800.0,
    status: "confirmed" as const,
    payment_status: "paid" as const,
    created_at: "2023-08-30T16:45:00",
  },
  {
    id: "B1237",
    user_name: "Carlos Pereira",
    user_email: "carlos@example.com",
    item_type: "tour" as const,
    item_name: "Passeio de Buggy",
    start_date: "2023-09-05",
    end_date: "2023-09-05",
    guests: 4,
    total_price: 600.0,
    status: "cancelled" as const,
    payment_status: "refunded" as const,
    created_at: "2023-08-20T11:30:00",
  },
];

// Generate more dummy bookings for pagination demo
const generateMoreBookings = () => {
  const additionalBookings: Booking[] = [];
  
  // Generate 30 more bookings with slightly modified data
  for (let i = 0; i < 30; i++) {
    const baseBooking = dummyBookings[i % dummyBookings.length];
    additionalBookings.push({
      ...baseBooking,
      id: `B${5000 + i}`,
      user_name: `${baseBooking.user_name} ${i + 1}`,
      user_email: `user${i + 1}@example.com`,
      created_at: new Date(new Date(baseBooking.created_at).getTime() + i * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return [...dummyBookings, ...additionalBookings];
};

const Bookings = () => {
  const [allBookings] = useState<Booking[]>(generateMoreBookings());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Handle booking view
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  // Filter bookings based on search query and status
  const filteredBookings = useMemo(() => {
    return allBookings.filter((booking) => {
      const matchesSearch = 
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.item_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [allBookings, searchQuery, statusFilter]);

  // Calculate pagination values
  const totalBookings = filteredBookings.length;
  const totalPages = Math.ceil(totalBookings / itemsPerPage);
  
  // Get current page of bookings
  const currentBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-green-500 text-green-600";
      case "pending":
        return "border-yellow-500 text-yellow-600";
      case "cancelled":
        return "border-red-500 text-red-600";
      default:
        return "border-gray-500 text-gray-600";
    }
  };

  // Get payment badge color based on payment status
  const getPaymentBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <AdminLayout pageTitle="Gerenciar Reservas">
      <BookingFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <BookingsTable
        bookings={currentBookings}
        onViewBooking={handleViewBooking}
        getStatusBadgeColor={getStatusBadgeColor}
        getPaymentBadgeColor={getPaymentBadgeColor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalBookings={totalBookings}
      />

      <BookingDetailDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        booking={selectedBooking}
        getStatusBadgeColor={getStatusBadgeColor}
        getPaymentBadgeColor={getPaymentBadgeColor}
      />
    </AdminLayout>
  );
};

export default Bookings;
