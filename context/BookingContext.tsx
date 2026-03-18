"use client";

import { createContext, useContext, useEffect, useState } from "react";

type BookingDataType = {
    doctorId: string;
    slotId: string;
    appointmentType: string;
    date: string;
    startTime: string;
    endTime: string;
    consultationFee: number;
} | null;

const BookingContext = createContext<{
    bookingData: BookingDataType;
    setBookingData: (data: BookingDataType) => void;
}>({
    bookingData: null,
    setBookingData: () => {},
});

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {

    const [bookingData, setBookingDataState] = useState<BookingDataType>(null);

    // Load from sessionStorage on first render
    useEffect(() => {
        const stored = sessionStorage.getItem("bookingData");
        if (stored) {
            setBookingDataState(JSON.parse(stored));
        }
    }, []);

    // Custom setter (sync with sessionStorage)
    const setBookingData = (data: BookingDataType) => {
        setBookingDataState(data);
        if (data) {
            sessionStorage.setItem("bookingData", JSON.stringify(data));
        } else {
            sessionStorage.removeItem("bookingData");
        }
    };

    return (
        <BookingContext.Provider value={{ bookingData, setBookingData }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);