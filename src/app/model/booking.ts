export interface booking {
  id: string;
  tripId: string;
  userId: string;
  people: number;
}

export interface BookingDetails {
  booking: booking;
  tripName: string;
  userName: string;
  people: number;
}
