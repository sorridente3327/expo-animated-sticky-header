export const PROFILE_PICTURES: string[] = [
  "https://i.pinimg.com/1200x/25/21/d0/2521d03fd6606b8792c8acc917558b0a.jpg",
  "https://i.pinimg.com/736x/ab/a0/7b/aba07badaf9c06ef1da30da7656725bc.jpg",
  "https://i.pinimg.com/736x/0b/ce/2a/0bce2aad1cc2e6e65d64e6d5112e05b3.jpg",
];

export const posts = [
  {
    id: 1,
    content:
      "Just finished working on an amazing new project! 🚀 The future of mobile development is looking bright.",
    timestamp: "2h ago",
    likes: 324,
    comments: 45,
    shares: 12,
    isLiked: true,
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    content:
      "Beautiful sunset from my office window today. Sometimes you need to pause and appreciate the simple moments.",
    timestamp: "5h ago",
    likes: 892,
    comments: 67,
    shares: 23,
    isLiked: false,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 3,
    content:
      "Excited to share my latest thoughts on React Native development. The ecosystem keeps evolving!",
    timestamp: "1d ago",
    likes: 156,
    comments: 28,
    shares: 8,
    isLiked: true,
  },
];

export const stories = [
  {
    id: 1,
    name: "Your Story",
    image:
      "https://i.pinimg.com/1200x/25/21/d0/2521d03fd6606b8792c8acc917558b0a.jpg",
    isOwn: true,
  },
  {
    id: 2,
    name: "Sarah",
    image:
      "https://i.pinimg.com/736x/fd/53/81/fd53811402c385c67eea3dd514ccdaca.jpg",
    hasStory: true,
  },
  {
    id: 3,
    name: "Alex",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: 4,
    name: "Emma",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: 5,
    name: "Mike",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    hasStory: true,
  },
];

export const suggestions = [
  {
    id: 1,
    name: "Jessica Chen",
    username: "@jessicac",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    mutualFriends: 12,
  },
  {
    id: 2,
    name: "David Kim",
    username: "@davidk",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    mutualFriends: 8,
  },
  {
    id: 3,
    name: "Rachel Green",
    username: "@rachelg",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    mutualFriends: 15,
  },
];
