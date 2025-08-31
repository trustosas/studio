
import { Heart, Globe, Award, Briefcase, Sparkles, Rocket, Zap, type LucideIcon } from 'lucide-react';

export interface Prompt {
    key: 'whatYouLove' | 'whatYouAreGoodAt' | 'whatTheWorldNeeds' | 'whatYouCanBePaidFor';
    title: string;
    icon: LucideIcon;
    question: string;
}

export const allQuestions: Prompt[] = [
  {
    key: 'whatYouLove',
    title: 'What You Love',
    icon: Heart,
    question: 'What activities make you feel alive and energized?',
  },
  {
    key: 'whatYouLove',
    title: 'What You Love',
    icon: Heart,
    question: 'What could you talk about for hours on end?',
  },
  {
    key: 'whatYouLove',
    title: 'What You Love',
    icon: Heart,
    question: 'What did you enjoy doing as a child?',
  },
  {
    key: 'whatYouLove',
    title: 'What You Love',
    icon: Heart,
    question: "If you didn't have to worry about money, how would you spend your time?",
  },
  {
    key: 'whatYouAreGoodAt',
    title: 'What You\'re Good At',
    icon: Award,
    question: 'What skills have you developed throughout your life?',
  },
  {
    key: 'whatYouAreGoodAt',
    title: 'What You\'re Good At',
    icon: Award,
    question: 'What do people come to you for help with?',
  },
  {
    key: 'whatYouAreGoodAt',
    title: 'What You\'re Good At',
    icon: Award,
    question: 'What comes naturally to you?',
  },
  {
    key: 'whatYouAreGoodAt',
    title: 'What You\'re Good At',
    icon: Award,
    question: 'What do you excel at without much effort?',
  },
  {
    key: 'whatTheWorldNeeds',
    title: 'What The World Needs',
    icon: Globe,
    question: 'What problems in the world do you want to solve?',
  },
  {
    key: 'whatTheWorldNeeds',
    title: 'What The World Needs',
    icon: Globe,
    question: 'What causes do you care about deeply?',
  },
  {
    key: 'whatTheWorldNeeds',
    title: 'What The World Needs',
    icon: Globe,
    question: 'What change would you like to see in your community or the world?',
  },
  {
    key: 'whatTheWorldNeeds',
    title: 'What The World Needs',
    icon: Globe,
    question: 'What can you contribute to others?',
  },
  {
    key: 'whatYouCanBePaidFor',
    title: 'What You Can Be Paid For',
    icon: Briefcase,
    question: 'What services or products could you offer that people would pay for?',
  },
  {
    key: 'whatYouCanBePaidFor',
    title: 'What You Can Be Paid For',
    icon: Briefcase,
    question: 'What are your marketable skills?',
  },
  {
    key: 'whatYouCanBePaidFor',
    title: 'What You Can Be Paid For',
    icon: Briefcase,
    question: 'What careers are in demand that align with your interests?',
  },
  {
    key: 'whatYouCanBePaidFor',
    title: 'What You Can Be Paid For',
    icon: Briefcase,
    question: "Are there any problems you can solve for which there's a market?",
  },
];

export const promptsData: {
    key: 'whatYouLove' | 'whatYouAreGoodAt' | 'whatTheWorldNeeds' | 'whatYouCanBePaidFor';
    title: string;
    icon: LucideIcon;
}[] = [
  { key: 'whatYouLove', title: 'What You Love', icon: Heart },
  { key: 'whatYouAreGoodAt', title: 'What You\'re Good At', icon: Award },
  { key: 'whatTheWorldNeeds', title: 'What The World Needs', icon: Globe },
  { key: 'whatYouCanBePaidFor', title: 'What You Can Be Paid For', icon: Briefcase },
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
