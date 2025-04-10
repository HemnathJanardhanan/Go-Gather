// hooks/useEventForm.ts
import { useState } from "react";

export type EventData = {
    title: string;
    description: string;
    location: {
        venue: string;
        area: string;
        city: string;
        state: string;
        pincode: number;
        mapLink: string;
    };
    date: string;
    image: string;
    noOfSeats: number;
    price: number;
    category: string;
};

const initialEventData: EventData = {
    title: "",
    description: "",
    location: {
        venue: "",
        area: "",
        city: "",
        state: "",
        pincode: 0,
        mapLink: "",
    },
    date: "",
    image: "",
    noOfSeats: 1,
    price: 0,
    category: "",
};

export const useEventForm = () => {
    const [eventData, setEventData] = useState<EventData>(initialEventData);

    const handleChange = <K extends keyof EventData>(key: K, value: EventData[K]) => {
        setEventData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNestedChange = <K extends keyof EventData["location"]>(
        key: K,
        value: EventData["location"][K]
    ) => {
        setEventData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                [key]: value,
            },
        }));
    };

    const resetForm = () => setEventData(initialEventData);

    return { eventData, handleChange, handleNestedChange, resetForm };
};
