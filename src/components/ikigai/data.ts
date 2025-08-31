import { Heart, Globe, Award, Briefcase, Sparkles, Rocket, Zap, type LucideIcon } from 'lucide-react';

export const promptsData: {
    key: 'whatYouLove' | 'whatYouAreGoodAt' | 'whatTheWorldNeeds' | 'whatYouCanBePaidFor';
    title: string;
    icon: LucideIcon;
    questions: string[];
}[] = [
  {
    key: 'whatYouLove',
    title: 'What You Love',
    icon: Heart,
    questions: [
      'What activities make you feel alive and energized?',
      'What could you talk about for hours on end?',
      'What did you enjoy doing as a child?',
      "If you didn't have to worry about money, how would you spend your time?",
    ],
  },
  {
    key: 'whatYouAreGoodAt',
    title: 'What You\'re Good At',
    icon: Award,
    questions: [
      'What skills have you developed throughout your life?',
      'What do people come to you for help with?',
      'What comes naturally to you?',
      'What do you excel at without much effort?',
    ],
  },
  {
    key: 'whatTheWorldNeeds',
    title: 'What The World Needs',
    icon: Globe,
    questions: [
      'What problems in the world do you want to solve?',
      'What causes do you care about deeply?',
      'What change would you like to see in your community or the world?',
      'What can you contribute to others?',
    ],
  },
  {
    key: 'whatYouCanBePaidFor',
    title: 'What You Can Be Paid For',
    icon: Briefcase,
    questions: [
      'What services or products could you offer that people would pay for?',
      'What are your marketable skills?',
      'What careers are in demand that align with your interests?',
      "Are there any problems you can solve for which there's a market?",
    ],
  },
];

export const intersectionData: {
    key: 'passion' | 'mission' | 'vocation' | 'profession';
    title: string;
    icon: LucideIcon;
    description: string;
}[] = [
    { key: 'passion', title: 'Passion', icon: Sparkles, description: "Where what you love intersects with what you're good at." },
    { key: 'mission', title: 'Mission', icon: Rocket, description: "Where what you love intersects with what the world needs." },
    { key: 'vocation', title: 'Vocation', icon: Zap, description: "Where what you're good at intersects with what you can be paid for." },
    { key: 'profession', title: 'Profession', icon: Briefcase, description: "Where what the world needs intersects with what you can be paid for." },
];
