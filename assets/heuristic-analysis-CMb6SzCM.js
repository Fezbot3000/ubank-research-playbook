const e="heuristic-analysis",s="Heuristic Analysis",t="2-3 days",i="2-3 designers",n="Low",o="Quickly identify usability issues by evaluating your designs against established best practices - like having an experienced designer review your work.",r=[{name:"Figjam",description:"Documenting issues",icon:"fa-sticky-note",logo:"/assets/logos/figma.svg",link:"https://www.figma.com/board/heuristicanalysistemplate"},{name:"Nielsen's 10 Heuristics",description:"Evaluation checklist",icon:"fa-list-check",link:"https://www.nngroup.com/articles/ten-usability-heuristics/"},{name:"Figma Slides",description:"Insights Deck (Max 3 per piece of research)",icon:"fa-presentation",logo:"/assets/logos/figma.svg",link:"https://www.figma.com/slides/RodMmoG77vJztZsM6Z3Ean/2025-Research-Playback?node-id=484-8400&t=2tZP1VJliVSeW8i6-1"}],a=[{title:"Understand when to use heuristic analysis",description:`Think of heuristic analysis as getting a fresh pair of experienced eyes on your design. It's not user testing - you won't learn what real customers think. Instead, you're checking if your design follows proven usability principles.

It's brilliant for:
- Catching obvious issues before user testing
- Getting quick feedback when you're too close to the design
- When you don't have time/budget for user research

It won't tell you:
- If customers will actually use a feature
- If your business logic makes sense
- How real users behave

The beauty? You can do it in a couple of days with just your design team.`,screenshot:"",screenshots:[]},{title:"Set up your review",description:`You'll need 2-3 designers to review independently (fresh eyes spot different issues).

Give reviewers:
- Link to the Figma file
- Brief context about the feature
- The user journey to test
- Access to the Figjam template

Don't:
- Tell them what you think the problems are
- Have the original designer do the review
- Rush them - allow at least half a day`,screenshot:"",screenshots:[]},{title:"Review against Nielsen's heuristics",description:`Each reviewer checks the design against these 10 principles:

1. Visibility of system status - Does the app show what's happening?
2. Match real world - Using plain English or banking jargon?
3. User control - Can customers undo/cancel actions?
4. Consistency - Do similar things work the same way?
5. Error prevention - Stopping mistakes before they happen?
6. Recognition over recall - Can users see their options?
7. Flexibility - Shortcuts for experienced users?
8. Aesthetic design - Clean and focused interface?
9. Error recovery - Helpful error messages?
10. Help & documentation - Easy to find help?

For banking, also check:
- Security visibility - Is data protection clear?
- Financial transparency - Are fees obvious?
- Regulatory compliance - Meeting banking rules?`,screenshot:"",screenshots:[]},{title:"Document issues with severity ratings",description:`In the Figjam template, for each issue note:
- Which heuristic it breaks
- Where it happens (screenshot)
- Why it's a problem
- Severity rating

Severity scale:
1. Cosmetic - fix if time
2. Minor - low priority
3. Major - important but not urgent
4. Severe - must fix before launch
5. Catastrophic - blocks users completely

Example:
"Transfer screen has no back button (breaks User Control). Severity 4 - customers can't fix mistakes. Add 'Edit' button."`,screenshot:"",screenshots:[]},{title:"Consolidate findings and prioritise",description:`Bring reviewers together to merge findings. You'll see overlap - that's good, it confirms real issues.

Create a prioritised list:
- Must fix (severity 4-5)
- Should fix (severity 3)
- Nice to have (severity 1-2)

Turn findings into specific recommendations:
"Problem: No daily limit shown on transfers
Impact: Failed transfers, customer frustration
Solution: Show 'Daily limit: £10,000' below amount field
Effort: Small - data already exists"

Group by:
- Quick wins (high impact, low effort)
- Important fixes (high impact, high effort)
- Nice-to-haves (low impact)`,screenshot:"",screenshots:[]},{title:"Present findings and track fixes",description:`Your presentation should include:
- Top 3 critical issues with screenshots
- Quick wins that make a big difference
- Patterns across the design
- Clear next steps

Don't dump a spreadsheet - tell a story about improving the customer experience.

After presenting:
- Add critical issues to sprint backlog
- Assign owners for each fix
- Track which issues get fixed
- Share learnings with other teams

Remember: The goal is to improve the design, not show how many problems you found.`,screenshot:"",screenshots:[]}],c={slug:e,title:s,duration:t,participants:i,complexity:n,purpose:o,tools:r,steps:a};export{n as complexity,c as default,t as duration,i as participants,o as purpose,e as slug,a as steps,s as title,r as tools};
