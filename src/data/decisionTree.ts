export interface DecisionOption {
  text: string;
  next?: string;
  method?: string;
  action?: string;
}

export interface DecisionNode {
  question: string;
  options: DecisionOption[];
}

export interface DecisionTree {
  [key: string]: DecisionNode;
}

export const decisionTree: DecisionTree = {
  start: {
    question: "What do you need help with?",
    options: [
      {
        text: "Testing content, language, or instructions to make sure users understand",
        next: "contentTesting"
      },
      {
        text: "Understanding user needs and exploring new ideas (Generative Research)",
        next: "generative"
      },
      {
        text: "Testing and improving existing features or designs (Evaluative Research)",
        next: "evaluative"
      },
      {
        text: "Getting feedback on existing features from current users",
        next: "existingFeatureFeedback"
      }
    ]
  },
  contentTesting: {
    question: "What type of content or language do you need to test?",
    options: [
      {
        text: "Text content - rates, product info, marketing copy, legal terms",
        method: "comprehension-survey"
      },
      {
        text: "Instructions or step-by-step processes",
        method: "usability-testing"
      },
      {
        text: "Error messages or system feedback",
        method: "comprehension-survey"
      },
      {
        text: "Button labels, menu names, or navigation terms",
        next: "namingTesting"
      }
    ]
  },
  namingTesting: {
    question: "For testing names and labels, we recommend starting with Card Sorting to see how users group things, then Tree Testing to validate if they can find them. Would you like to start with Card Sorting?",
    options: [
      {
        text: "Yes, start with Card Sorting",
        method: "card-sorting"
      },
      {
        text: "I just want to test specific labels",
        method: "comprehension-survey"
      }
    ]
  },
  existingFeatureFeedback: {
    question: "What kind of feedback are you looking for?",
    options: [
      {
        text: "Overall satisfaction - how do users feel about this feature?",
        next: "satisfactionFeedback"
      },
      {
        text: "Usage issues - what problems are users having?",
        method: "heuristic-analysis"
      },
      {
        text: "Long-term usage patterns - how do users actually use this over time?",
        method: "diary-study"
      }
    ]
  },
  satisfactionFeedback: {
    question: "How do you want to gather satisfaction feedback?",
    options: [
      {
        text: "Quick survey to many users",
        method: "survey"
      },
      {
        text: "Detailed feedback from fewer users",
        method: "usability-testing"
      }
    ]
  },
  generative: {
    question: "Has any research already been conducted for this project before?",
    options: [
      {
        text: "No",
        next: "generativeNoResearch"
      },
      {
        text: "Yes",
        next: "generativeHasResearch"
      }
    ]
  },
  evaluative: {
    question: "What specifically do you want to test or improve?",
    options: [
      {
        text: "Whether users can complete tasks or find what they need",
        next: "evaluativeTaskCompletion"
      },
      {
        text: "Whether users understand the interface or content",
        next: "evaluativeComprehension"
      },
      {
        text: "Compare two different design options",
        method: "ab-testing"
      },
      {
        text: "Find usability problems in current design",
        method: "heuristic-analysis"
      }
    ]
  },
  generativeNoResearch: {
    question: "What are you trying to explore or understand?",
    options: [
      {
        text: "How users want to organise or group information",
        method: "card-sorting"
      },
      {
        text: "What users need or want from a new feature",
        next: "generativeUserNeeds"
      },
      {
        text: "What to call something or how to label features",
        next: "generativeNaming"
      },
      {
        text: "General user feedback on concepts or ideas",
        method: "survey"
      }
    ]
  },
  generativeHasResearch: {
    question: "Since there's already research available, what would be most helpful?",
    options: [
      {
        text: "Help me find and review existing research",
        action: "reviewResearch"
      },
      {
        text: "I've reviewed it, now I need new research",
        next: "generativeNoResearch"
      }
    ]
  },
  generativeUserNeeds: {
    question: "What's the best way to understand user needs?",
    options: [
      {
        text: "Quick feedback from many users",
        method: "survey"
      },
      {
        text: "Detailed feedback with follow-up questions",
        method: "usability-testing"
      },
      {
        text: "I need help planning this research",
        action: "contactHelp"
      }
    ]
  },
  generativeNaming: {
    question: "For naming and labelling, we recommend starting with Card Sorting to understand how users group things, then Tree Testing to validate navigation. Does this approach work?",
    options: [
      {
        text: "Yes, start with Card Sorting",
        method: "card-sorting"
      },
      {
        text: "I need help planning this research",
        action: "contactHelp"
      }
    ]
  },
  evaluativeTaskCompletion: {
    question: "Do you have baseline data for comparison?",
    options: [
      {
        text: "Yes, I want to compare against existing performance",
        method: "benchmarking-analysis"
      },
      {
        text: "No, this is the first time testing this",
        method: "usability-testing"
      },
      {
        text: "I want to see if users can find specific content",
        method: "tree-testing"
      }
    ]
  },
  evaluativeComprehension: {
    question: "What kind of understanding are you testing?",
    options: [
      {
        text: "Whether users understand text, labels, or content",
        method: "comprehension-survey"
      },
      {
        text: "Whether users understand how to use the interface",
        method: "usability-testing"
      }
    ]
  }
}; 