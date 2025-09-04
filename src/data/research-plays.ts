export interface ResearchPlay {
  id: string;
  title: string;
  scenario: string;
  objective: string;
  timeline: string;
  effort: 'Low' | 'Medium' | 'High';
  outcome: string;
  sequenceRationale: string;
  steps: PlayStep[];
  tags: string[];
}

export interface PlayStep {
  stepNumber: number;
  title: string;
  method: string; // corresponds to method slug
  description: string;
  duration: string;
  deliverable: string;
  dependencies?: string[];
}

export const researchPlays: ResearchPlay[] = [
  {
    id: "new-feature-launch",
    title: "New Feature Launch Play",
    scenario: "You're launching a completely new feature or product",
    objective: "Validate the feature concept, optimise the design, and ensure successful launch",
    timeline: "6-8 weeks",
    effort: "High",
    outcome: "Confidence in feature design and user adoption strategy",
    sequenceRationale: "You'll want to start with Benchmarking Analysis because you need to know where you're starting from - what's the current performance before you make any changes? This gives you the baseline to measure against later.\n\nNext, run a Comprehension Survey to quickly test if people actually understand your new feature concept. There's no point building something complex if users don't get the basic idea. This is fast and cheap validation before you invest in detailed design work.\n\nOnce you know people understand it, do Moderated Usability Testing to watch real users try to use your design. You'll see exactly where they get stuck and why. This gives you the rich insights to fix the problems.\n\nThen scale up with Unmoderated Usability Testing - now you can test your improved design with more people to get statistical confidence in your changes.\n\nFinally, A/B Testing in the live environment tells you if your feature actually works in the real world with real user behaviour. This is where you optimise based on what people actually do, not what they say they'll do.",
    steps: [
      {
        stepNumber: 1,
        title: "Benchmarking Analysis",
        method: "benchmarking-analysis",
        description: "Establish baseline metrics and understand current user behaviour",
        duration: "1-2 days",
        deliverable: "Baseline metrics report and current state insights"
      },
      {
        stepNumber: 2,
        title: "Comprehension Survey",
        method: "comprehension-survey",
        description: "Test if users understand the feature concept and value proposition",
        duration: "1-2 hours",
        deliverable: "Concept validation results and comprehension scores"
      },
      {
        stepNumber: 3,
        title: "Moderated Usability Testing",
        method: "moderated-usability-testing",
        description: "Deep dive into usability issues with 1:1 sessions",
        duration: "1 day",
        deliverable: "Usability insights and design recommendations"
      },
      {
        stepNumber: 4,
        title: "Unmoderated Usability Testing",
        method: "usability-testing",
        description: "Test refined design with larger sample for statistical confidence",
        duration: "2 days",
        deliverable: "Statistical validation of design performance"
      },
      {
        stepNumber: 5,
        title: "A/B Testing",
        method: "ab-testing",
        description: "Test feature performance in live environment",
        duration: "2-4 weeks",
        deliverable: "Performance metrics and optimisation recommendations"
      }
    ],
    tags: ["new-feature", "product-launch", "validation", "comprehensive"]
  },
  {
    id: "feature-improvement",
    title: "Feature Improvement Play",
    scenario: "You want to improve an existing feature that's underperforming",
    objective: "Identify issues, optimise performance, and increase user satisfaction",
    timeline: "3-4 weeks",
    effort: "Medium",
    outcome: "Improved feature performance and user experience",
    sequenceRationale: "Start with Heuristic Analysis because it's the fastest way to spot obvious problems. An expert can review your feature in a few hours and catch the low-hanging fruit - stuff that's clearly broken or confusing. This is way cheaper than testing with users first.\n\nNext, do Moderated Usability Testing to understand the 'why' behind the issues. Users will show you problems that expert reviews miss, and you'll see exactly how they struggle with your feature. This tells you what's really causing pain points.\n\nFinally, A/B Testing measures whether your improvements actually work in the real world. You can compare your updated version against the current one and see if users actually perform better with your changes. This gives you the proof that your improvements were worth it.",
    steps: [
      {
        stepNumber: 1,
        title: "Heuristic Analysis",
        method: "heuristic-analysis",
        description: "Expert review to quickly identify obvious usability problems",
        duration: "2-3 days",
        deliverable: "Prioritised list of usability issues"
      },
      {
        stepNumber: 2,
        title: "Moderated Usability Testing",
        method: "moderated-usability-testing",
        description: "Watch users interact with current feature to understand pain points",
        duration: "1 day",
        deliverable: "User behaviour insights and pain point identification"
      },
      {
        stepNumber: 3,
        title: "A/B Testing",
        method: "ab-testing",
        description: "Compare current vs improved design performance",
        duration: "2-4 weeks",
        deliverable: "Performance improvement metrics and recommendations"
      }
    ],
    tags: ["optimisation", "existing-feature", "performance", "quick-win"]
  },
  {
    id: "content-optimisation",
    title: "Content & Messaging Play",
    scenario: "You need to improve copy, instructions, or messaging for better comprehension",
    objective: "Ensure users understand content and can act on it successfully",
    timeline: "1-2 weeks",
    effort: "Low",
    outcome: "Clear, comprehensible content that drives user action",
    sequenceRationale: "Start with a Comprehension Survey to find out exactly where users are getting confused with your current content. You'll get scores showing which parts are clear and which parts are confusing. This tells you what needs fixing and gives you a baseline to improve from.\n\nThen run A/B Testing to prove your new content actually works better. Test your original content against your improved version to see if more people understand it and take action. This shows you whether your content changes actually make a difference in the real world.",
    steps: [
      {
        stepNumber: 1,
        title: "Comprehension Survey",
        method: "comprehension-survey",
        description: "Measure baseline comprehension of existing content",
        duration: "1-2 hours",
        deliverable: "Comprehension scores and confusion points"
      },
      {
        stepNumber: 2,
        title: "A/B Testing",
        method: "ab-testing",
        description: "Test original vs improved content performance",
        duration: "1-2 weeks",
        deliverable: "Content performance metrics and recommendations"
      }
    ],
    tags: ["content", "copy", "messaging", "quick-win", "low-effort"]
  },
  {
    id: "user-research-discovery",
    title: "User Needs Discovery Play",
    scenario: "You're exploring a new problem space or user segment",
    objective: "Understand user needs, behaviours, and pain points in depth",
    timeline: "4-6 weeks",
    effort: "High",
    outcome: "Deep user insights and opportunity identification",
    sequenceRationale: "You'll want to start with a Diary Study because it captures what users actually do in their normal life, not what they say they do in interviews. Users document their real behaviour over weeks, which reveals patterns and needs they might not even realise they have.\n\nAfter you've got all those diary insights, use Moderated Usability Testing to dig deeper into the interesting stuff you found. You can ask targeted questions about specific behaviours that came up in the diary study and really understand what's driving those patterns.",
    steps: [
      {
        stepNumber: 1,
        title: "Diary Study",
        method: "diary-study",
        description: "Understand user behaviour and needs over time in natural context",
        duration: "2-4 weeks",
        deliverable: "User journey insights and behavioural patterns"
      },
      {
        stepNumber: 2,
        title: "Moderated Usability Testing",
        method: "moderated-usability-testing",
        description: "Deep dive into specific findings with targeted sessions",
        duration: "1 day",
        deliverable: "Validated insights and design recommendations"
      }
    ],
    tags: ["discovery", "user-research", "insights", "strategic"]
  },
  {
    id: "quick-validation",
    title: "Quick Validation Play",
    scenario: "You have a simple design question that needs fast answers",
    objective: "Get quick feedback on a specific design or concept",
    timeline: "3-5 days",
    effort: "Low",
    outcome: "Fast, actionable insights for design decisions",
    sequenceRationale: "Start with Heuristic Analysis because you can get answers in hours, not days. An expert can spot the obvious issues without needing to recruit any users. It's the fastest way to catch problems before you spend time and money on user testing.\n\nThen run a quick Comprehension Survey to check if real users agree with what the expert found. Focus on the specific areas the expert flagged to make sure you're not missing anything important. This gives you user validation of the expert assumptions in just a few hours.",
    steps: [
      {
        stepNumber: 1,
        title: "Heuristic Analysis",
        method: "heuristic-analysis",
        description: "Get expert eyes on the design to catch obvious issues",
        duration: "2-3 days",
        deliverable: "Expert recommendations and issue identification"
      },
      {
        stepNumber: 2,
        title: "Comprehension Survey",
        method: "comprehension-survey",
        description: "Fast user feedback on specific elements",
        duration: "1-2 hours",
        deliverable: "User feedback and preference data"
      }
    ],
    tags: ["quick", "validation", "fast-feedback", "low-effort"]
  },
  {
    id: "information-architecture",
    title: "Information Architecture Play",
    scenario: "You're organising content or designing navigation structures",
    objective: "Create intuitive information organisation that users can navigate easily",
    timeline: "2-3 weeks",
    effort: "Medium",
    outcome: "Validated information architecture and navigation structure",
    sequenceRationale: "Start with Card Sorting to understand how users naturally think about organising your content. They'll group things in ways that make sense to them, which shows you how to structure your information architecture. Don't guess - let users show you their mental models.\n\nOnce you know how they think about grouping, use Tree Testing to check if they can actually find things in your proposed structure. This tests the navigation without any visual design getting in the way - just pure structure and labelling.\n\nFinally, run Unmoderated Usability Testing to see how the complete navigation experience works with real tasks. This makes sure your structure actually works when people are trying to accomplish something, not just browsing around.",
    steps: [
      {
        stepNumber: 1,
        title: "Card Sorting",
        method: "card-sorting",
        description: "Learn how users naturally group and categorise information",
        duration: "3-5 days",
        deliverable: "Information grouping insights and mental models"
      },
      {
        stepNumber: 2,
        title: "Tree Testing",
        method: "tree-testing",
        description: "Test if users can find information in your proposed structure",
        duration: "3-5 days",
        deliverable: "Navigation performance metrics and optimisation recommendations"
      },
      {
        stepNumber: 3,
        title: "Unmoderated Usability Testing",
        method: "usability-testing",
        description: "Validate the full navigation experience with real tasks",
        duration: "2 days",
        deliverable: "End-to-end navigation validation and user experience insights"
      }
    ],
    tags: ["information-architecture", "navigation", "content-organisation", "structure"]
  },
  {
    id: "user-satisfaction-measurement",
    title: "User Satisfaction & Feedback Play",
    scenario: "You need to measure user satisfaction and gather quantitative feedback on your product or feature",
    objective: "Understand user satisfaction levels, identify improvement areas, and track changes over time",
    timeline: "3-4 weeks", 
    effort: "Medium",
    outcome: "Quantitative satisfaction metrics and prioritised improvement areas",
    sequenceRationale: "Start with Survey Research to get satisfaction scores from lots of users - you need a big sample size to get reliable data and spot patterns. The survey will tell you which issues are affecting the most people and help you prioritise what to fix first.\n\nOnce you know the main satisfaction problems from the survey, use Moderated Usability Testing to understand why those problems are happening. You'll watch users hit the pain points and see exactly what's causing the frustration. This gives you the insights to actually fix the issues, not just measure them.",
    steps: [
      {
        stepNumber: 1,
        title: "Survey Research",
        method: "survey",
        description: "Gather quantitative data and opinions from a large number of users about satisfaction and attitudes",
        duration: "2-3 weeks",
        deliverable: "User satisfaction scores, demographic insights, and feedback themes"
      },
      {
        stepNumber: 2,
        title: "Moderated Usability Testing", 
        method: "moderated-usability-testing",
        description: "Dive deeper into specific pain points identified in survey responses",
        duration: "1 day",
        deliverable: "Detailed insights into satisfaction drivers and specific improvement recommendations"
      }
    ],
    tags: ["satisfaction", "feedback", "quantitative", "measurement", "tracking"]
  }
];

// Helper function to get play by ID
export function getPlayById(id: string): ResearchPlay | undefined {
  return researchPlays.find(play => play.id === id);
}

// Helper function to get plays by tag
export function getPlaysByTag(tag: string): ResearchPlay[] {
  return researchPlays.filter(play => play.tags.includes(tag));
}

// Helper function to get plays by effort level
export function getPlaysByEffort(effort: 'Low' | 'Medium' | 'High'): ResearchPlay[] {
  return researchPlays.filter(play => play.effort === effort);
} 