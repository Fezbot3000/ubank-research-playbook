const e="ab-testing",t="A/B Testing",n="2-4 weeks",s="1000+ users",o="High",i="Compare two versions of a design or feature to determine which performs better based on real user behaviour and statistical evidence.",r=[{name:"Optimal Workshop",description:"Running preference tests",icon:"fa-chart-bar",link:"https://app.optimalworkshop.com/"},{name:"Google Analytics",description:"Live environment testing",icon:"fa-vial"},{name:"Figma Slides",description:"Insights Deck (Max 3 per piece of research)",icon:"fa-presentation",link:"https://www.figma.com/slides/RodMmoG77vJztZsM6Z3Ean/2025-Research-Playback?node-id=484-8400&t=2tZP1VJliVSeW8i6-1"}],a=[{title:"Define Your Hypothesis",description:`Before you even think about creating variations, you need to be crystal clear about what you're trying to learn. A good hypothesis follows this structure: "If we [make this change], then [this metric] will [increase/decrease] because [reason based on user behaviour]."

For example: "If we add a self-service option for balance enquiries, then call centre volume will decrease by 20% because customers prefer immediate access to their information."

Things to do:
- Base your hypothesis on real customer feedback or observed behaviour
- Pick ONE thing to test at a time (don't change the button colour AND the text)
- Make sure you can actually measure the outcome

Things not to do:
- Don't test multiple changes at once - you won't know what caused the difference
- Don't test tiny changes that won't meaningfully impact the customer experience`,screenshot:"",screenshots:[]},{title:"Choose Your Testing Method",description:`You've got two main options for A/B testing, and picking the right one depends on what you're testing and where you are in the design process.

Option 1: Preference Testing (Design Phase)
Use Optimal Workshop when you're still in Figma and want to test design variations before they're built. This is perfect for testing visual changes, copy variations, or layout differences. You'll get quick feedback on which version users prefer and why.

Option 2: Live A/B Testing (Post-Launch)
Using analytics when you need to test with real user behaviour in the actual product. This gives you hard data on what users do (not just what they say they prefer). Often this is the only way of knowing for sure which of two designs will be more successful. 

The key difference? Preference testing tells you what users think they'll do. Live testing shows you what they actually do. Both are valuable at different stages.`,screenshot:"",screenshots:[]},{title:"Create Your Variations",description:`It's essential when creating the variant that the page or the design isn't too different from the control; your goal is to gain certainty and understanding of what impact specific changes make to a design. If you change too much, you might definitely see that the new version is better, but you aren't sure exactly what improved things.  

Version A (Control): This is your current design or the baseline version. Don't change anything here - this is what you're comparing against.

Version B (Variant): This is where you make your ONE change based on your hypothesis. Maybe it's a different button colour, new copy, or a relocated element. 

Things to do:
- Make the difference noticeable enough that it could actually impact behaviour
- Document exactly what's different between the versions

Things not to do:
- Don't make the versions so different that they're essentially different designs
- Don't forget to check both versions work across different screen sizes
- Don't use Lorem ipsum or fake data - test with real content`,screenshot:"",screenshots:[]},{title:"Calculate Your Sample Size",description:`This is where A/B testing gets a bit maths-heavy, but don't worry - we've built a calculator below to help. You need to know how many customers to test with before you can trust your results.

For preference testing in Optimal Workshop, aim for at least 30-50 responses per variation. This gives you enough data to see clear patterns.

For live testing in your banking app or website, you'll need to consider:
- How many customers currently use this feature
- The minimum difference you want to detect (usually 5-10%)
- Your confidence level (typically 95%)

A typical banking feature might need 1000-2000 users per variation to detect meaningful changes. If you're testing something with lower usage, you might need to run the test longer.

Pro tip: If the calculator says you need 10,000 users per variation and you only get 100 per week, maybe reconsider if A/B testing is the right method. You might be better off with qualitative testing methods.`,screenshot:"",screenshots:[]},{title:"Set Up Your Test",description:`The setup is crucial - mess this up and your whole test is compromised.

**For Optimal Workshop:**
1. Upload both design variations as images
2. Randomise which version participants see first
3. Ask the same questions for both versions
4. Include a question about which they prefer and why

**For Live Testing:**
1. Use your testing tool to split traffic 50/50
2. Make sure customers stay in the same group throughout their session
3. Set up event tracking for your key metrics
4. Test the setup with your team before going live

Critical things to check:
- Both versions load properly
- Tracking is firing correctly
- Customers can't accidentally see both versions
- The test works on mobile (unless desktop-only)`,screenshot:"",screenshots:[]},{title:"Monitor and Measure",description:`Once your test is live, resist the urge to peek at results every hour. Early results can be misleading due to small sample sizes.

**Week 1:** Check that data is coming through correctly. Look for any technical issues but don't make decisions yet.

**Week 2:** Start to see trends emerging. Still don't make decisions - you need statistical significance.

**Week 3-4:** Usually when you'll hit statistical significance. Now you can start drawing conclusions.

What to measure:
- Primary metric (the one in your hypothesis)
- Secondary metrics (other things that might be affected)
- Segments (does it work differently for different customer groups?)

Red flags to watch for:
- One version has way more traffic (technical issue)
- Metrics are wildly different from normal (tracking issue)
- Results flip-flop daily (need more time)
- Unexpected increase in call centre volume (something might be broken)`,screenshot:"",screenshots:[]},{title:"Analyse Your Results",description:`This is the moment of truth. But remember - statistical significance doesn't always mean practical significance.

**Reading Preference Test Results:**
In Optimal Workshop, look for:
- Which version had higher preference (aim for 60%+ for a clear winner)
- The reasons people gave for their preference
- Any patterns in the comments

**Reading Live Test Results:**
You need THREE things for a valid result:
1. Statistical significance (95% confidence)
2. Enough sample size (hit your calculated number)
3. Test ran for at least 2 weeks (to account for day-of-week effects)

What the results mean:
- Version B wins by 10%+ : Strong winner, implement it
- Version B wins by 3-5%: Marginal winner, consider if it's worth the effort
- No significant difference: Both versions are equally effective
- Version B loses: Stick with version A (this is still valuable learning!)

Remember: Not finding a difference is still a valid result. It means your change didn't impact customer behaviour, which is important to know.`,screenshot:"",screenshots:[]},{title:"Document and Share Insights",description:`Don't let your hard work disappear into the void. Document your findings properly so the whole team learns from the test.

Your insights deck should include:
1. What you tested and why (hypothesis)
2. What you found (results with numbers)
3. What it means (implications for customers and business)

To write an effective insight from A/B testing:
Good insight: "Customers are 15% more likely to complete a transfer when the confirmation details are shown upfront, suggesting transparency reduces anxiety about sending money."

Not so good insight: "Version B had a 67% preference rate compared to Version A's 33% rate, with statistical significance at p<0.05."

The good insight tells a story about customer behaviour. The not-so-good one just reports numbers without meaning.

Always include:
- Screenshots of both versions
- The specific metrics and results
- Recommendations for next steps
- What you learned about customer behaviour (not just which won)

Remember to add your results to the design file too, so future designers understand why decisions were made.`,screenshot:"",screenshots:[]}],c={slug:e,title:t,duration:n,participants:s,complexity:o,purpose:i,tools:r,steps:a};export{o as complexity,c as default,n as duration,s as participants,i as purpose,e as slug,a as steps,t as title,r as tools};
