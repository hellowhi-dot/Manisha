import { OutfitCard, FriendCard, ConfessionMessage, WheelSection } from '../types';

export const outfits: OutfitCard[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg',
    caption: 'Too hot for January'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg',
    caption: 'Perfect for a rooftop wine'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg',
    caption: 'Made for stealing attention'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    caption: 'You > Trends'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg',
    caption: 'When Kolkata nights call'
  }
];

export const friends: FriendCard[] = [
  {
    id: 1,
    label: 'Partner in crime'
  },
  {
    id: 2,
    label: 'Gossip hotline'
  },
  {
    id: 3,
    label: 'Cheers manager'
  },
  {
    id: 4,
    label: 'Style icon assistant'
  },
  {
    id: 5,
    label: 'The soul sister'
  },
  {
    id: 6,
    label: 'Adventure buddy'
  }
];

export const confessions: ConfessionMessage[] = [
  {
    id: 1,
    text: "That night I couldn't sleep after our convo..."
  },
  {
    id: 2,
    text: "You're like a glitch in my routine — in the best way."
  },
  {
    id: 3,
    text: "The way you just say it all... it's sexy as hell."
  },
  {
    id: 4,
    text: "Your chaos matches my energy in ways I never expected."
  },
  {
    id: 5,
    text: "I've been counting days to June 4th since we first talked."
  }
];

export const wheelSections: WheelSection[] = [
  {
    id: 1,
    text: "Let's get drunk & dance",
    color: "#f472b6" // neon-400
  },
  {
    id: 2,
    text: "Confess something spicy",
    color: "#60a5fa" // electric-400
  },
  {
    id: 3,
    text: "Truth or Dare",
    color: "#9775ff" // midnight-400
  },
  {
    id: 4,
    text: "Rate this memory out of 10",
    color: "#f472b6" // neon-400
  },
  {
    id: 5,
    text: "Pick an outfit for the meet",
    color: "#60a5fa" // electric-400
  },
  {
    id: 6,
    text: "Tell me something you've never said out loud",
    color: "#9775ff" // midnight-400
  }
];