package com.ratnesh.Office_booking_system.controller;

import com.ratnesh.Office_booking_system.entity.Booking;
import com.ratnesh.Office_booking_system.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking){

        List<Booking> existingBookings =
                bookingRepository.findByWorkspaceIdAndDate(
                        booking.getWorkspaceId(),
                        booking.getDate()
                );

        for(Booking b : existingBookings){

            boolean overlap =
                    booking.getStartTime().compareTo(b.getEndTime()) < 0 &&
                            booking.getEndTime().compareTo(b.getStartTime()) > 0;

            if(overlap){
                throw new RuntimeException("Time slot already booked!");
            }

        }

        return bookingRepository.save(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id){
        bookingRepository.deleteById(id);
    }
}