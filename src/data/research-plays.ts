export interface ResearchPlay {
  id: string;
  title: string;
  scenario: string;
  objective: string;
  timeline: string;
  effort: 'Low' | 'Medium' | 'High';
  outcome: string;
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