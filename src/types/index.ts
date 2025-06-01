export interface OutfitCard {
  id: number;
  image: string;
  caption: string;
}

export interface FriendCard {
  id: number;
  label: string;
  sound?: string;
}

export interface ConfessionMessage {
  id: number;
  text: string;
  audio?: string;
}

export interface WheelSection {
  id: number;
  text: string;
  color: string;
}