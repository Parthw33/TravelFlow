import { Image } from "./action";
import { Component } from "../typescript/component";

type AdditionalParam = {
  title: {};
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
}

type EntryData = {
  title: string;
  url: string;
  $: AdditionalParam;
}

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $: AdditionalParam;
}

type PageRef = {
  title: string;
  url: string;
  $: AdditionalParam;
}


type Share = {
  link: Links;
  icon: Image;
}

type Social = {
  social_share: [Share];
}

type Navigation = {
  link: [Links];
}

type Author = {
  title: string;
  $: AdditionalParam;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

export type Posts = {
  heading: any;
  characters: any;
  modular_blocks: any;
  locale: string;
  author: [Author];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [Blog];
  seo: {};
  url:string;
  title: string;
  _owner: {}
}

type ButtonConfig = {
  title: string;
  href: string;
  variant: boolean;
  _metadata: {
    uid: string;
  };
};



export type HeaderProps = {
  locale:string;
  logo: Image;
  navigation_menu:[List]
  notification_bar: Announcement;
  title: string;
  uid: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  button: ButtonConfig;
  $: AdditionalParam;
}

export type Entry = [
  entry: EntryData
]

type List = {
  label?: string;
  page_ref: [PageRef];
  $: {};
}

export type NavLinks = {
  label?: string;
}

export type Links = {
  label?: string;
  title: string;
  href: string;
  variant?: boolean;
  $:AdditionalParam;
}

// Comprehensive Type Definitions
interface PageReference {
  uid: string;
  _content_type_uid: string;
}

interface NavigationLinkMetadata {
  uid: string;
}

interface NavigationLink {
  title: string;
  page_reference: PageReference[];
  _metadata: NavigationLinkMetadata;
}

export interface NavigationGroup {
  group_title: string;
  f1_name: NavigationLink[];
  _metadata: NavigationLinkMetadata;
}

export interface FooterProps {
  navigation_menu: NavigationGroup[];
}

export type ChilderenProps = {
  props: {};
  type: Function;
}

// type Cards ={
//   title:string;
//   description: string;
//   cardIcon:Image;
// }

// type CardSection ={
//   cards: Cards[]
// }

// type HeroBanner={
//   title:string;
//   bannerImage:Image;
//   description:string;
//   ctabutton:Links;
// }

// type Steps= {
//   title:string;
//   description:string;
// }

// type WorkSection= {
//   title:string;
//   steps:Steps[];
// }

// export type  HomePage ={
//   cardSection: CardSection;
//   heroBanner: HeroBanner;
//   workSection:WorkSection;
// }
// HeroBanner Interface
export interface Herobanner {
  banner_title: string;
  banner_description: string;
  banner_image: {
    title: string;
    url: string;
    filename?: string;
    content_type?: string;
  };
  cta_button: {
    button_title: string;
    link: string;
  }[];
}

// WorkSection Interface
export interface WorkSection {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
}

export interface CardSection{
  title: string;
    card_section: {
      title: string;
      card_description: string;
      card_icon?: {
        title?: string;
        url?: string;
      };
    }[];
}

export interface Trip {
  uid: string;
  _content_type_uid: string;
}

export interface FeaturedTrip {
  description: string;
  title: string;
  trips: Trip[];
}

// Updated HomePage Interface
export interface HomePage {
  card_section: CardSection;
  featuredtrips: FeaturedTrip;
  featuredtrip: FeaturedTrip[];
  cardSection: CardSection;
  herobanner: Herobanner;
  works_section: WorkSection;
}

// Define the structure for each trip object in the "trips" array
export interface Trip {
  uid: string;
  description: string;
  duration: string;
  groupsize: string;
  image: Image;
  location: string;
  price: number;
  title: string;
  updated_at: string;
  updated_by: string;
  url: string;
}

// Define the structure for the parent object that holds the "trips" array
export interface TripsData {
  uid: string;
  description: string;
  duration: string;
  groupsize: string;
  image: Image;
  location: string;
  price: number;
  title: string;
  updated_at: string;
  updated_by: string;
  url: string;
  tags: string[];
}


interface TripDetails {
  price: number;
  duration: string;
  group_size: string;
}

interface Perks {
  title: string;
  includes: string[];
}

interface ItineraryBlock {
  title: string;
  events: string[];
}

interface Itinerary {
  itineraryblocks: ItineraryBlock[];
}

interface Highlights {
  title: string;
  highlights: string[];
}

interface ModularBlock {
  highlights: Highlights;
  itinerary: Itinerary;
  trip_details: TripDetails;
  perks: Perks;
}

export interface SingleTrip {
  uid: string;
  title: string;
  url: string;
  modular_blocks: ModularBlock[];
  tags: string[];
}
