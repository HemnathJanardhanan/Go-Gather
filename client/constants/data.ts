import icons from "./icons";
import images from "./images";
import {useState} from "react";

export const categories= [
  { title: "All", category: "All" },
  { title: 'Guest Lecture', category: 'guest_lecture' },
  { title: 'Workshop', category: 'workshop' },
  { title: 'Hackathon', category: 'hackathon' },
  { title: 'Career Fair', category: 'career_fair' },
  { title: 'Cultural Fest', category: 'cultural_fest' },
  { title: 'Sports Tournament', category: 'sports_tournament' },
  { title: 'Webinar', category: 'webinar' },
  { title: 'Placement Drive', category: 'placement_drive' },
  { title: 'Club Meeting', category: 'club_meeting' },
  { title: 'Tech Talk', category: 'tech_talk' }];

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

    title: "Profile",
    icon: icons.person,
  },
  // {
  //
  //   title: "Notifications",
  //   icon: icons.bell,
  // },
  //
];
