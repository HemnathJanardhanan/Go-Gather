import icons from "./icons";
import images from "./images";

// All event cards
export const cards = [
  {
    id: "1",
    title: "Pottery Workshop",
    location: "Tokyo, Japan",
    price: "Free",
    rating: 4.8,
    category: "Workshop",
    image: images.japan,
  },
  {
    id: "2",
    title: "Yoga Retreat",
    location: "Bali, Indonesia",
    price: "$200",
    rating: 3,
    category: "Retreat",
    image: images.newYork,
  },
  {
    id: "3",
    title: "Cooking Class",
    location: "Paris, France",
    price: "$300",
    rating: 2,
    category: "Class",
    image: images.japan,
  },
  {
    id: "4",
    title: "Tech Conference",
    location: "San Francisco, USA",
    price: "$400",
    rating: 5,
    category: "Conference",
    image: images.newYork,
  },
];

// Featured event cards (highlighted or promoted events)
export const featuredCards = [
  {
    id: "5",
    title: "Pottery Workshop",
    location: "Tokyo, Japan",
    price: "Free",
    rating: 4.8,
    image: images.japan,
    category: "Workshop",
  },
  {
    id: "6",
    title: "Yoga Retreat",
    location: "Bali, Indonesia",
    price: "$200",
    rating: 4.5,
    image: images.newYork,
    category: "Retreat",
  },
];

// Categories for filtering events
export const categories = [
  { title: "All", category: "All" },
  { title: "Workshops", category: "Workshop" },
  { title: "Retreats", category: "Retreat" },
  { title: "Classes", category: "Class" },
  { title: "Conferences", category: "Conference" },
  { title: "Others", category: "Others" },
];

// User settings options
export const settings = [
  {

    title: "My Bookings",
    icon: icons.calendar,
  },
  {

    title: "My Events",
    icon: icons.calendar,
  },
  {

    title: "Payments",
    icon: icons.wallet,
  },
  {

    title: "Profile",
    icon: icons.person,
  },
  {

    title: "Notifications",
    icon: icons.bell,
  },
  {

    title: "Invite Friends",
    icon: icons.people,
  },
];
