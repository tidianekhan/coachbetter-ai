const MOCK_REPORT = {
  session: {
    assessor: "CoachBetter.ai",
    generated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    client: "Not specified",
    session_length: "~90 minutes",
  },
  executive_summary: {
    overall_level: "Practitioner",
    confidence: "Moderate-High",
    key_outcome:
      "Client moved from decision paralysis (0.8 vs 0.9 FTE) to a clear commitment to try 0.9 FTE, with a reframe that 'making the best of a choice' matters more than the 'perfect choice.'",
    major_insights: [
      "Client identified energy-giving vs. energy-draining activities",
      "Recognized a pattern of saying yes to too many responsibilities",
      "Acknowledged overthinking as a barrier to decision-making",
    ],
    top_priorities: [
      "Strengthen session-level contracting and success criteria",
      "Deepen pattern exploration to belief-level",
      "Build structured evaluation and accountability practices",
    ],
    key_risk:
      "Over-exploration without explicit contracting — the session moved organically but lacked structural anchors, risking drift and making impact harder to measure.",
    high_leverage_change:
      "Open every session with: 'What would make this session most valuable for you, and how will we know we've achieved it?'",
  },
  competencies: [
    {
      id: 1,
      name: "Understanding Self",
      level: "No Violation Detected",
      levelShort: "✓ Good",
      confidence: "High",
      summary:
        "The coach demonstrated appropriate self-awareness throughout the session without concerning behaviors. They maintained professional boundaries while showing genuine interest in the client's situation. The coach appeared comfortable with the client's indecision and processing style, allowing space for exploration without rushing to solutions.",
      development_suggestions: [],
    },
    {
      id: 2,
      name: "Commitment to Self-Development",
      level: "Foundation",
      levelShort: "Foundation",
      confidence: "Moderate",
      summary:
        "The coach mentioned the session was being recorded for accreditation purposes, indicating engagement with professional development. They showed some reflective capacity when acknowledging client feedback, but there was limited evidence of deeper self-evaluation or systematic reflection.",
      development_suggestions: [
        {
          title: "Structured Self-Reflection Practice",
          description:
            "Implement a post-session reflection protocol: 'What patterns did I notice in my questioning today? Which interventions felt most natural versus challenging? What would I do differently?'",
          expected_impact:
            "Builds the muscle of critical self-observation, accelerating growth and making supervision conversations richer.",
        },
        {
          title: "Active Supervision Engagement",
          description:
            "Bring specific moments from sessions to supervision — e.g., 'When the client was stuck in overthinking, I chose the activity cards. Was there a more direct intervention I missed?'",
          expected_impact:
            "Transforms supervision from a compliance exercise into a genuine learning partnership.",
        },
      ],
    },
    {
      id: 3,
      name: "Managing the Contract",
      level: "Foundation",
      levelShort: "Foundation",
      confidence: "Moderate-High",
      summary:
        "The coach appropriately managed recording consent and demonstrated awareness of session boundaries by checking time periodically. However, there was limited evidence of explicit contract management. The coach didn't clearly establish session objectives, success measures, or explicitly check if the client's needs were being met.",
      development_suggestions: [
        {
          title: "Explicit Session Contracting",
          description:
            "Open with: 'What would make this session most valuable for you today? How will we know we've been successful?' This creates a shared anchor to return to.",
          expected_impact:
            "Gives both coach and client a reference point, reducing drift and increasing the client's ownership of outcomes.",
        },
        {
          title: "Mid-Session Check-In",
          description:
            "At the halfway point, pause to ask: 'We've been exploring X — is this the most useful direction, or is there something else we should focus on?'",
          expected_impact:
            "Prevents over-exploration of comfortable topics at the expense of the client's core need.",
        },
      ],
    },
    {
      id: 4,
      name: "Building the Relationship",
      level: "Practitioner",
      levelShort: "Practitioner",
      confidence: "High",
      summary:
        "The coach demonstrated strong relationship-building skills, creating a warm and supportive atmosphere. They showed genuine interest, maintained consistent empathy, and adapted their communication style to the client's processing needs. The client's positive feedback about feeling heard and not pressured confirms the coach successfully established psychological safety.",
      development_suggestions: [
        {
          title: "Emotional Attunement Enhancement",
          description:
            "When the client expresses frustration, go beyond acknowledgment to explicit emotional reflection: 'I can hear some frustration — what's that like for you right now?'",
          expected_impact:
            "Deepens the client's felt sense of being understood and can unlock emotional material that drives the presenting issue.",
        },
        {
          title: "Relationship Process Checks",
          description:
            "Periodically check in on the coaching dynamic itself: 'How is this exploration feeling for you right now?'",
          expected_impact:
            "Catches misalignments early and models reflective communication for the client.",
        },
      ],
    },
    {
      id: 5,
      name: "Enabling Insight and Learning",
      level: "Practitioner",
      levelShort: "Practitioner",
      confidence: "High",
      summary:
        "The coach effectively used open-ended questions to help the client explore their situation. They demonstrated good listening skills and helped the client make connections between values, energy patterns, and work preferences. The session resulted in clear insights and a concrete decision.",
      development_suggestions: [
        {
          title: "Deeper Pattern Exploration",
          description:
            "When the client mentions always saying yes, explore the belief system beneath: 'What do you imagine might happen if you said no? What does saying yes protect you from?'",
          expected_impact:
            "Creates more durable behavioral change because the client understands the 'why' behind their pattern, not just the 'what.'",
        },
        {
          title: "Insight Integration",
          description:
            "After a key insight surfaces, help the client connect it forward: 'How does this realization about saying no change how you'll approach your first month at 0.9 FTE?'",
          expected_impact:
            "Bridges the gap between session-level awareness and real-world behavioral change.",
        },
      ],
    },
    {
      id: 6,
      name: "Outcome and Action Orientation",
      level: "Practitioner",
      levelShort: "Practitioner",
      confidence: "Moderate-High",
      summary:
        "The coach maintained clear focus on the client's stated goal and helped them systematically explore options. They supported the client in moving from analysis paralysis to decision-making. The session resulted in a clear outcome — the client decided to try 0.9 FTE.",
      development_suggestions: [
        {
          title: "Specific Action Planning",
          description:
            "After the decision, develop concrete implementation steps: 'What specific steps will you take in your first month to monitor how this feels? What will be your early warning signs?'",
          expected_impact:
            "Increases the likelihood the client will follow through and builds their capacity for self-directed monitoring.",
        },
        {
          title: "Accountability Structures",
          description:
            "Help the client establish support: 'Who in your life could help you maintain boundaries around saying no? What would you like to commit to trying differently this month?'",
          expected_impact:
            "Translates coaching insights into sustainable behavioral change beyond the session.",
        },
      ],
    },
    {
      id: 7,
      name: "Use of Models and Techniques",
      level: "Practitioner",
      levelShort: "Practitioner",
      confidence: "Moderate-High",
      summary:
        "The coach effectively utilized multiple tools including a talent passport and activity cards, well-integrated into the conversation. They showed good timing judgment and demonstrated familiarity with strengths-based approaches. Techniques were used to support the client's process rather than driving it.",
      development_suggestions: [
        {
          title: "Model Integration and Transparency",
          description:
            "When introducing a tool, briefly share the rationale: 'This exercise helps us get past analytical thinking and tap into what naturally energizes you.'",
          expected_impact:
            "Elevates tool use from 'activity' to 'intentional intervention,' strengthening both coach credibility and client learning.",
        },
        {
          title: "Technique Customization for Client Pattern",
          description:
            "For an analytical overthinker, consider introducing a somatic or future-self visualization: 'Imagine yourself one year from now, having chosen each option. What do you notice in your body?'",
          expected_impact:
            "Breaks the cognitive loop by engaging a different way of knowing.",
        },
      ],
    },
    {
      id: 8,
      name: "Evaluation",
      level: "Foundation",
      levelShort: "Foundation",
      confidence: "Moderate",
      summary:
        "The coach demonstrated basic evaluation practices by seeking feedback. The client provided positive feedback about feeling heard and not rushed. However, the evaluation approach was primarily informal and reactive rather than systematic. The coach didn't use structured evaluation methods or establish clear success criteria.",
      development_suggestions: [
        {
          title: "Systematic Outcome Measurement",
          description:
            "Establish criteria at the start and measure at the close: 'On a scale of 1-10, how clear do you feel about your decision now compared to when we started?'",
          expected_impact:
            "Creates a feedback loop that identifies which interventions are most valuable.",
        },
        {
          title: "Multi-Level Evaluation",
          description:
            "Implement a brief structured close: 'What will you do differently as a result of our conversation today? What was most and least useful in our process?'",
          expected_impact:
            "Generates richer data about both immediate and longer-term coaching impact.",
        },
      ],
    },
  ],
  interventions: [
    {
      name: "Reflective Summarizing",
      client_response: "Client moved from scattered, circular thinking to consolidated statements.",
      observed_shift: "Language evolved from expressions of confusion toward clearer preference statements.",
      assessment: "Effective",
    },
    {
      name: "Talent Passport Review",
      client_response: "Client engaged actively, connecting strengths to current work context.",
      observed_shift: "Increased self-awareness about what energizes vs. drains; linked findings to schedule decision.",
      assessment: "Effective",
    },
    {
      name: "Activity Cards Exercise",
      client_response: "Client sorted activities with visible engagement; generated 'aha' moments about patterns.",
      observed_shift: "Recognized tendency to say yes to energy-draining tasks; connected this to boundary-setting needs.",
      assessment: "Highly Effective",
    },
    {
      name: "Reframing ('best of choice' vs. 'perfect choice')",
      client_response: "Client visibly relaxed; accepted that both options were viable.",
      observed_shift: "Shifted from paralysis to forward motion, committing to 0.9 FTE.",
      assessment: "Effective",
    },
  ],
  turning_points: [
    {
      title: "Recognition of Overthinking Pattern",
      description:
        "The client acknowledged they were going in circles. The coach allowed this moment to land rather than rushing past it, creating space for self-awareness. This marked the shift from problem-cycling to self-reflection.",
    },
    {
      title: "Activity Cards: Energy Insight",
      description:
        "During the activity cards exercise, the client discovered that their most draining activities were ones they habitually agreed to take on. This connected the FTE decision to a deeper pattern around boundary-setting and people-pleasing.",
    },
    {
      title: "Reframe to 'Good Enough' Decision-Making",
      description:
        "The coach helped the client see that making the best of either option mattered more than finding the perfect answer. This broke the analytical loop and enabled the client to commit to 0.9 FTE with confidence.",
    },
  ],
  development_levers: [
    {
      rank: 1,
      title: "Explicit Session Contracting",
      pattern: "Sessions begin without clearly agreed objectives or success criteria, leading to organic but unanchored exploration.",
      why_it_matters:
        "Without a contract, it is impossible to evaluate success meaningfully. This single change elevates performance across contracting, evaluation, and outcome orientation simultaneously.",
      what_to_do:
        "Open every session with: 'What would make this session most valuable for you? How will we know we've succeeded?' Return to this contract at mid-point and close.",
      expected_client_impact:
        "The client gains clarity on what they're working toward, feels more ownership of the process, and leaves with a measurable sense of progress.",
    },
    {
      rank: 2,
      title: "Belief-Level Pattern Exploration",
      pattern: "The coach identifies surface patterns (overthinking, saying yes too much) but does not explore the beliefs, fears, or identity structures underneath them.",
      why_it_matters:
        "Surface-level pattern recognition leads to short-term behavioral changes that don't stick. Exploring 'What does saying yes protect you from?' accesses the material that drives lasting transformation.",
      what_to_do:
        "When a pattern is named, ask one 'What's underneath that?' question before moving on. Practice staying with discomfort rather than resolving it prematurely.",
      expected_client_impact:
        "Clients experience deeper self-understanding and make changes that are internally motivated rather than coach-prompted.",
    },
    {
      rank: 3,
      title: "Structured Evaluation Practice",
      pattern: "Evaluation relies on informal, end-of-session client feedback rather than systematic measurement.",
      why_it_matters:
        "Without structured evaluation, the coach cannot identify which interventions are most effective or track development over time.",
      what_to_do:
        "Implement a simple opening/closing scale (e.g., clarity 1-10) and a structured close: 'What was most useful? What will you do differently? What should I adjust next time?'",
      expected_client_impact:
        "The client consolidates learning in the final minutes, increasing retention and follow-through.",
    },
  ],
  risks: [
    {
      title: "Over-Exploration Without Contracting",
      severity: "Medium-High",
      evidence:
        "The session covered financial implications, values, energy patterns, and boundary-setting without an explicit agreement on what the client most needed. The coach allowed extended exploration without checking alignment with the client's priority.",
      why_it_matters:
        "Without a contract, the coach cannot distinguish between productive exploration and comfortable drift.",
      monitor:
        "Check whether a clear session goal is established in the first 5 minutes of the next session.",
    },
    {
      title: "Surface Insight Without Belief-Level Exploration",
      severity: "Medium",
      evidence:
        "The client identified patterns of overthinking and saying yes to too much, but neither was explored to the level of underlying beliefs, fears, or identity.",
      why_it_matters:
        "Surface insights feel satisfying in the moment but rarely produce lasting change.",
      monitor:
        "Track whether the coach asks at least one belief-level question per session when a pattern is identified.",
    },
    {
      title: "Excessive Summarizing as Comfort Strategy",
      severity: "Low-Medium",
      evidence:
        "The client praised the coach's summarizing, and the coach received this positively. There is a risk that summarizing becomes the coach's default intervention when the client is stuck.",
      why_it_matters:
        "Summarizing consolidates but does not deepen. Over-reliance can create a comfortable loop where the client feels heard but is not challenged.",
      monitor:
        "Notice if summarizing is being used to resolve tension rather than to launch into deeper questioning.",
    },
    {
      title: "Weak Accountability Structure",
      severity: "Medium",
      evidence:
        "The session ended with a decision (0.9 FTE) and general awareness about saying no, but no specific commitments, timelines, or support structures were established.",
      why_it_matters:
        "Decisions without implementation plans have a high attrition rate.",
      monitor:
        "Ensure every session ends with at least one specific, time-bound action step and an identified accountability mechanism.",
    },
  ],
  gold_standard_questions: [
    {
      pattern: "Analytical Overthinking",
      questions: [
        "What belief about making the wrong choice is operating here?",
        "If no one judged this decision, what would you choose?",
        "Where do you feel the tension in your body when you imagine each option?",
      ],
    },
    {
      pattern: "Difficulty Saying No / Boundary Weakness",
      questions: [
        "What do you imagine would happen if you said no next time?",
        "What does being the person who always says yes give you? What does it cost you?",
        "If you fully trusted that saying no was safe, what would change in your life?",
      ],
    },
    {
      pattern: "Perfectionism in Decision-Making",
      questions: [
        "What would 'good enough' look like — and what makes that feel insufficient?",
        "What are you afraid of losing by committing to one option?",
        "If you knew you could change course in six months, what would you choose right now?",
      ],
    },
  ],
};

export default MOCK_REPORT;
