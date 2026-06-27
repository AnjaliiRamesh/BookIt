import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import prisma from '../config/db';

export const createBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { eventId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User identity missing' });
      return;
    }

    // EXECUTE AN ISOLATED DATABASE TRANSACTION
    const bookingResult = await prisma.$transaction(async (tx) => {
      
      // 1. Lock the explicit event row using PostgreSQL's SELECT FOR UPDATE
      const currentEvent: any[] = await tx.$queryRaw`
        SELECT id, "availableSeats", capacity, title 
        FROM events 
        WHERE id = ${eventId} 
        FOR UPDATE
      `;

      // Security Check: Does the event exist?
      if (!currentEvent || currentEvent.length === 0) {
        throw new Error('NOT_FOUND');
      }

      const event = currentEvent[0];

      // 2. CRITICAL CONCURRENCY GUARD: Check if seats are completely sold out
      if (event.availableSeats <= 0) {
        throw new Error('SOLD_OUT');
      }

      // 3. Decrement the available seat inventory balance by 1 row
      await tx.$executeRaw`
        UPDATE events 
        SET "availableSeats" = "availableSeats" - 1 
        WHERE id = ${eventId}
      `;

      // 4. Generate the official confirmed booking history item
      const newBooking = await tx.booking.create({
        data: {
          userId: userId,
          eventId: eventId,
          status: 'CONFIRMED'
        }
      });

      // 5. ASYNC BACKGROUND LOG: Record the booking metric log row
      tx.activityLog.create({
        data: {
          eventId: eventId,
          action: 'BOOKING_CONFIRMED',
          metadata: { userId }
        }
      }).catch(err => console.error('Log sync failed:', err));

      return newBooking;
    });

    // If transaction finishes smoothly without throwing errors, return 201 Success!
    res.status(201).json({
      message: 'Booking confirmed successfully!',
      booking: bookingResult
    });

  } catch (error: any) {
    // Catch thrown errors from inside the transaction blocks
    if (error.message === 'SOLD_OUT') {
      res.status(409).json({ message: 'Sold Out' });
      return;
    }
    if (error.message === 'NOT_FOUND') {
      res.status(404).json({ message: 'Target event not found' });
      return;
    }

    res.status(500).json({ 
      message: 'Internal server error while processing booking request', 
      error: error instanceof Error ? error.message : error 
    });
  }
};