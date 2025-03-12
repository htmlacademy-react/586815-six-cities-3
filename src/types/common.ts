export type CityType = {
  name: string;
  location: LocationType;
}

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

type UserType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ReviewType = ReviewContentType & {
  id: string;
  date: string;
  user: UserType;
};

export type ReviewContentType = {
  comment: string;
  rating: number;
};

export type HostType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type DetailedOfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
};


