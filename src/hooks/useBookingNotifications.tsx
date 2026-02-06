import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type BookingStatus = Database['public']['Enums']['booking_status'];

const getStatusMessage = (status: BookingStatus | null, isProvider: boolean): { title: string; description: string } => {
  const messages: Record<string, { title: string; description: string }> = {
    pending: {
      title: isProvider ? 'New Booking Request' : 'Booking Submitted',
      description: isProvider ? 'You have a new booking request to review.' : 'Your booking has been submitted successfully.',
    },
    confirmed: {
      title: 'Booking Confirmed',
      description: isProvider ? 'You have confirmed a booking.' : 'Great news! Your booking has been confirmed.',
    },
    in_progress: {
      title: 'Service In Progress',
      description: isProvider ? 'The service has started.' : 'Your service is now in progress.',
    },
    completed: {
      title: 'Service Completed',
      description: isProvider ? 'You have completed a service.' : 'Your service has been completed. Please leave a review!',
    },
    cancelled: {
      title: 'Booking Cancelled',
      description: isProvider ? 'A booking has been cancelled.' : 'Your booking has been cancelled.',
    },
    disputed: {
      title: 'Dispute Raised',
      description: 'A dispute has been raised for this booking.',
    },
  };

  return messages[status || 'pending'] || messages.pending;
};

export function useBookingNotifications() {
  const { user, isProvider } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          const newBooking = payload.new as Database['public']['Tables']['bookings']['Row'];
          
          // Only notify if user is involved
          if (newBooking.customer_id === user.id || (isProvider && newBooking.provider_id)) {
            const message = getStatusMessage(newBooking.status, isProvider);
            toast({
              title: message.title,
              description: message.description,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          const updatedBooking = payload.new as Database['public']['Tables']['bookings']['Row'];
          const oldBooking = payload.old as Database['public']['Tables']['bookings']['Row'];
          
          // Only notify if status changed and user is involved
          if (
            updatedBooking.status !== oldBooking.status &&
            (updatedBooking.customer_id === user.id || isProvider)
          ) {
            const message = getStatusMessage(updatedBooking.status, isProvider);
            toast({
              title: message.title,
              description: message.description,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isProvider]);
}
