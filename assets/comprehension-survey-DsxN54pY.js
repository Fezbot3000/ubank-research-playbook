const e="comprehension-survey",t="Comprehension Survey",o="1 -2 hours",s="25 Participants",n="Low",i="A tool used to assess how well individuals understand written or spoken information",a=[{name:"Optimal Workshop",description:"Hosting your survey",icon:"fa-clipboard-list"},{name:"Askable",description:"Recruiting your participants",icon:"fa-video"},{name:"Figma Slides",description:"Insights Deck (Max 3 per piece of research)",icon:"fa-presentation",link:"https://www.figma.com/slides/RodMmoG77vJztZsM6Z3Ean/2025-Research-Playback?node-id=484-8400&t=2tZP1VJliVSeW8i6-1"}],r=[{title:"Set Up Askable Study",description:`1. I have created some templates for you to duplicate for your studies, for a comprehension study, this one will be the third one in the list. 
Press the three dots on the right side of the screen and then press duplicate, name your study appropriately and you can get started.

2. I have added some default questions that will get you started, but your goal here is to add custom screening questions that target the specific people you want to test with. 

Considerations
 - Askable mandates that you need to have at least a few screener questions, they don't like it when we leave these blank and will block your study from going live. 
 - If you want to go live with your study that day, make sure you go live with it at the latest before 3 pm, to have a chance for Askable to approve it before the end of the day. I will have a guide on what kind of screener questions you can ask. `,screenshot:"",screenshots:["Screenshot 2025-08-13 at 3.49.47â¯pm-1755064192134-667380268.png"],link:""},{title:"Assess the screen",description:`Work out what it is that you want to test, it could be any of the following;

- Copy
- Icons or something visual
- It could be a collection of items on a page that builds the overall comprehension of a page that you are looking to test

In the example below, you can see a screenshot of the rate breakdown page. In this example, the comprehension test that was run was to understand if users could piece all the information on the page together and recite back to us what they understood. We were looking to measure if they could replay back to us accurately what the page was trying to communicate, just with the information on the page.  `,screenshot:"",screenshots:["Screenshot 2025-08-11 at 2.17.13pm-1754885835699-758013025.png"]},{title:"Start building your study in optimal workshop",description:"Open up Optimal workshop (Link above) and duplicate the comprehension study that will already be in there. This will set up the foundations of the study so all you will need to do is add your specific questions.",screenshot:"",screenshots:["Screenshot 2025-08-11 at 3.12.26pm-1754889150852-893255842.png"]},{title:"Writing questions ",description:`Once you have duplicated your study, you will need to add questions specific to your comprehension test.

When writing questions for this type of study, you need to write them with the outcome of the users answering your questions with a multiple-choice question. Doing this will allow you to quickly review the result and estimate comprehension based on the number of people who select the correct answer. 
This is in comparison to asking users to give you verbatim feedback and having to process the results, which can lead you down the path of subjectivity when reading the results. You might think it was a pass, but your colleague thought it was a fail. 

Things to do: 
 - Keep it simple for your user 
 - Keep your multiple choice answers to a max of 5, and a minimum of 3. (We don't want there to be too many options, but also we don't want it to be a 50/50 chance of getting the answer correct.) 
 - Asking users how they felt about the question before can also be a useful metric to use to guage either how something made them feel or even how confident the user is in their answer.  

Things not to do: 
 - Like other studies, leading questions are important to be careful of, as they can skew a result to look more favourable when in reality the page didnt perform as well. 
 -  `,screenshot:"",screenshots:[]},{title:"Reading and interpreting the results ",description:`Often, with comprehension studies, you might need to run the test a few times, which would involve repeating the steps above. 

To determine this, you will need to assess if the result of your test got a result of 85% - 90% or above for each of the questions you asked. If it did, you can safely say that based on the results, participants comprehend what you are presenting. If it got a lower result, it's worth making changes to your design and rerunning it to see if you can improve the result. 

Additionally, combining both the result of the individual questions and the confidence level can give you a strong indication of what is going on. 

For example, users might get a strong comprehension result, but their confidence level was low, which rarely happens, but this does mean that users could probably guess the answer, or they knew the answer but just weren't really confident. 

A design that achieves a high confidence level and also a high correct answer response is the desired outcome here. 

The two screenshots below show you two tests that were run at the same time in the form of an A/B test. You can see it in the first screenshot, version A had 30% of people who didn't understand or were confused, but in the B test, the percentage of people who were confused decreased to only 7.1%. 
The second test also had a successful answer rate of 90%, vs 72% on test A. This is the sort of result you need to aim for when reviewing your results. Anything less than this could result in unnecessary calls to the call centre from confused individuals. 
`,screenshot:"",screenshots:["Screenshot 2025-08-11 at 3.29.06pm-1754890151158-953673132.png","Screenshot 2025-08-11 at 3.29.42pm-1754890186235-55322304.png"]},{title:"The power of comprehension testing",description:`As you saw in the example above, the results from a comprehension test could mean the difference in high call volumes about a design to the call centre or low calls. 
It is expected that there will always be a small percentage of people who just can't understand this maths context, but your goal is to aim for as high a result as possible. The cost of a comprehension test is far less than a 30-minute call to the call centre. `,screenshot:"",screenshots:[]},{title:"Document Insights",description:`Arguably one of the most important steps of the entire process, producing your presentation at the end of your study is the vessel to help your stakeholders understand where you are at with the design, concept, etc etc. The goal of this presentation is to share insights, not present raw data about pass and fail.

To write an effective insight, you will need to process your testing results, consider their implications, and then think through how to communicate this to your stakeholders. 
An example of a good insight: "People want to see the details of their payment immediately after making the payment." 
An example of a not so good insight: "Of the 100 people surveyed, 94% had used a rewards or loyalty offer in the past 6 months. Interestingly 45% of participants said the rewards offers made them spend more than they normally would."

You can see in the "not so good" insight that it requires the reader to process the result and discover meaning from that result. This is the job of your insights, to have done that processing for the reader and be able to share the "so what" so they can take your insight and be able to make a decision based on it. 

Please aim for no more than 3 insights per slide deck, you want to summarise the test into a maximum of 3 key takeaways that your audience can take and action. `,screenshot:"",screenshots:["Screenshot 2025-08-11 at 3.40.45pm-1754890849186-730909855.png"]}],h={slug:e,title:t,duration:o,participants:s,complexity:n,purpose:i,tools:a,steps:r};export{n as complexity,h as default,o as duration,s as participants,i as purpose,e as slug,r as steps,t as title,a as tools};
