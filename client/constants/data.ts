// import icons from "./icons";
// import images from "./images";

// export const cards = [
//   {
//     title: "Card 1",
//     location: "Location 1",
//     price: "$100",
//     rating: 4.8,
//     category: "house",
//     image: images.newYork,
//   },
//   {
//     title: "Card 2",
//     location: "Location 2",
//     price: "$200",
//     rating: 3,
//     category: "house",
//     image: images.japan,
//   },
//   {
//     title: "Card 3",
//     location: "Location 3",
//     price: "$300",
//     rating: 2,
//     category: "flat",
//     image: images.newYork,
//   },
//   {
//     title: "Card 4",
//     location: "Location 4",
//     price: "$400",
//     rating: 5,
//     category: "villa",
//     image: images.japan,
//   },
// ];

// export const featuredCards = [
//   {
//     title: "Featured 1",
//     location: "Location 1",
//     price: "$100",
//     rating: 4.8,
//     image: images.newYork,
//     category: "house",
//   },
//   {
//     title: "Featured 2",
//     location: "Location 2",
//     price: "$200",
//     rating: 3,
//     image: images.japan,
//     category: "flat",
//   },
// ];

// export const categories = [
//   { title: "All", category: "All" },
//   { title: "Houses", category: "House" },
//   { title: "Condos", category: "Condos" },
//   { title: "Duplexes", category: "Duplexes" },
//   { title: "Studios", category: "Studios" },
//   { title: "Villas", category: "Villa" },
//   { title: "Apartments", category: "Apartments" },
//   { title: "Townhomes", category: "Townhomes" },
//   { title: "Others", category: "Others" },
// ];


// export const facilities = [
//   {
//     title: "Laundry",
//     icon: icons.laundry,
//   },
//   {
//     title: "Car Parking",
//     icon: icons.carPark,
//   },
//   {
//     title: "Sports Center",
//     icon: icons.run,
//   },
//   {
//     title: "Cutlery",
//     icon: icons.cutlery,
//   },
//   {
//     title: "Gym",
//     icon: icons.dumbell,
//   },
//   {
//     title: "Swimming pool",
//     icon: icons.swim,
//   },
//   {
//     title: "Wifi",
//     icon: icons.wifi,
//   },
//   {
//     title: "Pet Center",
//     icon: icons.dog,
//   },
// ];

// export const gallery = [
//   {
//     id: 1,
//     image: images.newYork,
//   },
//   {
//     id: 2,
//     image: images.japan,
//   },
//   {
//     id: 3,
//     image: images.newYork,
//   },
//   {
//     id: 4,
//     image: images.japan,
//   },
//   {
//     id: 5,
//     image: images.newYork,
//   },
//   {
//     id: 6,
//     image: images.japan,
//   },
// ];
import icons from "./icons";
import images from "./images";

// All event cards
export const cards = [
  {
    title: "Pottery Workshop",
    location: "Tokyo, Japan",
    price: "Free",
    rating: 4.8,
    category: "Workshop",
    image: images.japan,  // Image relevant to the event (e.g., pottery workshop image)
  },
  {
    title: "Yoga Retreat",
    location: "Bali, Indonesia",
    price: "$200",
    rating: 3,
    category: "Retreat",
    image: images.newYork, // Image relevant to the event (e.g., yoga retreat)
  },
  {
    title: "Cooking Class",
    location: "Paris, France",
    price: "$300",
    rating: 2,
    category: "Class",
    image: images.japan, // Image relevant to the event (e.g., cooking class)
  },
  {
    title: "Tech Conference",
    location: "San Francisco, USA",
    price: "$400",
    rating: 5,
    category: "Conference",
    image: images.newYork, // Image relevant to the event (e.g., tech conference)
  },
];

// Featured event cards (highlighted or promoted events)
export const featuredCards = [
  {
    title: "Pottery Workshop",
    location: "Tokyo, Japan",
    price: "Free",
    rating: 4.8,
    image: images.japan,
    category: "Workshop",
  },
  {
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