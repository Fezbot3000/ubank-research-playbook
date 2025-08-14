const e="card-sorting",n="Card Sorting",t="1-2 weeks",s="15-30 participants",r="Low",o="Understand how users categorize and organize information to inform navigation and content structure. Card sorting helps you design intuitive information architecture by learning how real customers group and label content.",a=[{name:"Askable",description:"Recruitment & Card Sorting Platform",icon:"fa-users",link:"https://app.askable.com/studies"},{name:"Figma Slides",description:"Insights Deck (Max 3 per piece of research)",icon:"fa-presentation",link:"https://www.figma.com/slides/RodMmoG77vJztZsM6Z3Ean/2025-Research-Playback?node-id=484-8400&t=2tZP1VJliVSeW8i6-1"}],i=[{title:"Understand when to use card sorting",description:`Card sorting is your go-to method when you need to organize content in a way that makes sense to customers, not just to the bank. It's particularly powerful when you're dealing with complex information structures.

Perfect for:
- Organizing product categories (savings, loans, cards, insurance)
- Structuring help content and FAQs
- Designing navigation menus
- Grouping account settings and features
- Organizing financial tools and calculators

There are two types:
1. Open card sort - Participants create their own categories
2. Closed card sort - Participants sort into pre-defined categories

For banking, open sorts work brilliantly when you're starting fresh or redesigning. Closed sorts are great for validating existing structures or adding new features to established categories.

Things to remember:
- Card sorting shows you HOW people group things, not IF they'll find them
- Follow up with tree testing to validate the findability
- Cultural and demographic differences matter - what makes sense to young professionals might confuse retirees`,screenshot:"",screenshots:[]},{title:"Prepare your cards",description:`This is the foundation of your study. Get this wrong and your whole sort will be off.

Start by listing all the content/features you need to organize. For a banking app, this might include:
- Account types (everyday, savings, term deposits)
- Transactions and payments
- Cards and card controls
- Security settings
- Profile information
- Tools (calculators, goal trackers)
- Help topics

Card writing tips:
- Use customer language, not bank jargon ("Send money" not "Initiate transfer")
- Keep cards consistent in detail level (don't mix "Savings account" with "Fixed term deposit with bonus interest rate for balances over $10,000")
- Aim for 30-60 cards max - more becomes overwhelming
- Include a few cards you're unsure about - they often reveal interesting patterns

Things to avoid:
- Don't use current menu names as cards
- Don't include cards that obviously go together ("Username" and "Password")
- Don't write leading cards that suggest their category

Test your cards with a colleague first. If they're confused, customers will be too.`,screenshot:"",screenshots:[]},{title:"Set up your Askable study",description:`1. Log into Askable and look for the card sorting template (it should be one of the study types available). Duplicate it and name your study clearly, like "Ubank Navigation Card Sort - [Date]".

2. Configure your card sort settings:
- Choose Open or Closed sort
- Add all your cards (copy and paste from your prepared list)
- For closed sorts, define your categories
- Set instructions that explain the context

3. Write clear instructions for participants:
"Imagine you're using your banking app. Group these features and tools in a way that makes sense to you. There are no right or wrong answers - we want to understand your mental model."

4. Add screening questions to get the right participants:
- Current banking app usage (daily/weekly/monthly)
- Age range (to ensure diverse perspectives)
- Primary banking activities
- Tech confidence level

Remember:
- Submit before 3pm for same-day approval
- Allow 5-7 days for recruitment and completion
- Consider running separate sorts for different user segments`,screenshot:"",screenshots:[]},{title:"Run the card sort",description:`Once your study is live and approved, monitor it closely for the first few participants.

Early checks:
- Are participants creating sensible groups?
- Is anyone creating too many categories (might indicate cards are too granular)?
- Are there cards everyone struggles to place?

Common issues in banking card sorts:
- "Payments" vs "Transfers" confusion - customers often see these as the same
- Security features scattered across multiple groups
- Tool/calculator cards that don't fit anywhere

If you spot major issues early:
- You can pause and adjust
- Add clarification to problematic cards
- Consider removing truly confusing cards

Let the study run for 5-7 days. You want at least 15 completed sorts for reliable patterns. Askable will handle all the participant management and data collection.

Pro tip: Take notes on interesting category names participants create - these often become great navigation labels.`,screenshot:"",screenshots:[]},{title:"Analyze the results",description:`Askable provides analysis tools, but here's how to make sense of the data:

1. Look for strong agreement:
- Cards that 80%+ participants put in the same category are your anchors
- These form the core of each navigation section

2. Identify problem cards:
- Cards with low agreement (<40%) need special attention
- These might need different labels or multiple access points

3. Analyze category names (for open sorts):
- Look for patterns in what participants call groups
- "Money stuff" might become "Payments & transfers"
- Use their language where possible

4. Check for mental model differences:
- Do younger users group differently than older ones?
- Are there cultural differences in categorization?

For banking specifically, watch for:
- Whether users separate "spending" from "saving" activities
- How they think about security (separate section or integrated?)
- If they distinguish between "managing money" and "help/support"

Document patterns, not just percentages. "Users consistently grouped all card-related features together, including card controls, PIN changes, and replacement requests" is more useful than raw numbers.`,screenshot:"",screenshots:[]},{title:"Create your information architecture",description:`Now comes the art - turning data into design. You're not just copying what users did, you're using their mental models to inform a structure that works for everyone.

Start with the strong patterns:
- Groups with high agreement become main navigation items
- Consistent category names inform your labels
- Problem cards might need multiple entry points

For a banking app, you might see:
- "Accounts" (all account types, balances, statements)
- "Move money" (pay, transfer, scheduled payments)
- "Cards" (physical and digital cards, controls)
- "Help & support" (FAQs, contact, guides)
- "Profile & settings" (personal info, security, preferences)

Handle edge cases:
- Put ambiguous items in multiple places
- Use "See also" links for related features
- Consider progressive disclosure for complex features

Remember:
- Business requirements still matter (regulatory items might need prominence)
- Technical constraints exist (some groupings might not be feasible)
- You're designing for findability, not just logical grouping

Create a simple sitemap showing your proposed structure. This becomes your blueprint for tree testing validation.`,screenshot:"",screenshots:[]},{title:"Document insights",description:`Your insights deck should tell the story of how customers think about your product's organization.

Structure your presentation:

1. Key insight: Start with the big picture
"Customers organize banking features by frequency of use, not by product type. Daily tasks like checking balances and making payments need to be separate from occasional tasks like updating details."

2. Supporting patterns:
- Show the strongest groupings with percentages
- Highlight surprising findings
- Include quotes about category names

3. Recommendations with rationale:
"Combine 'Transfers' and 'Payments' into 'Move money' - 87% of participants grouped these together and couldn't articulate a difference."

Things to include:
- Visual representation of the most common groupings
- Problem cards and how to handle them
- Proposed navigation structure
- Next steps (usually tree testing to validate)

Remember: You're not just reporting what happened, you're translating user mental models into design decisions. Make it clear why each recommendation will improve the customer experience.

Always end with clear next steps - usually validating your new structure with tree testing.`,screenshot:"",screenshots:[]}],c={slug:e,title:n,duration:t,participants:s,complexity:r,purpose:o,tools:a,steps:i};export{r as complexity,c as default,t as duration,s as participants,o as purpose,e as slug,i as steps,n as title,a as tools};
