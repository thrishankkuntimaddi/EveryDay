/**
 * data.js — Client-side data definitions.
 * Blocks and phases are defined on the client — they are structural config,
 * not user data, so they live here and stay in sync with the server's phase names.
 */

export const BLOCKS = [
  {
    id: 'morning',
    name: 'Morning Block',
    icon: '🌅',
    time: '05:30 – 08:00',
    color: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    tasks: [
      { id: 'morning-1', label: 'Meditation (10 min)', isCore: true },
      { id: 'morning-2', label: 'Workout / Physical Movement', isCore: true },
      { id: 'morning-3', label: 'Cold shower & grooming', isCore: false },
      { id: 'morning-4', label: 'Morning walk / Sunlight', isCore: false },
      { id: 'morning-5', label: 'Plan the day (top 3 priorities)', isCore: true },
    ]
  },
  {
    id: 'work1',
    name: 'Work Block 1 — Resume & Job',
    icon: '💼',
    time: '09:00 – 12:00',
    color: 'linear-gradient(90deg, #7c3aed, #9d64f8)',
    tasks: [
      { id: 'work1-1', label: 'Resume update / polish', isCore: true },
      { id: 'work1-2', label: 'Apply to 5+ jobs', isCore: true },
      { id: 'work1-3', label: 'Network / LinkedIn outreach', isCore: false },
      { id: 'work1-4', label: 'Interview prep (1 mock Q)', isCore: false },
    ]
  },
  {
    id: 'work2',
    name: 'Work Block 2 — Chttrix',
    icon: '🚀',
    time: '13:00 – 16:00',
    color: 'linear-gradient(90deg, #06b6d4, #22d3ee)',
    tasks: [
      { id: 'work2-1', label: 'Implement planned feature', isCore: true },
      { id: 'work2-2', label: 'Fix known bugs / issues', isCore: false },
      { id: 'work2-3', label: 'Code review & clean-up', isCore: false },
      { id: 'work2-4', label: 'Document progress', isCore: false },
    ]
  },
  {
    id: 'work3',
    name: 'Work Block 3 — DSA / CS',
    icon: '🧩',
    time: '16:00 – 18:00',
    color: 'linear-gradient(90deg, #10b981, #34d399)',
    tasks: [
      { id: 'work3-1', label: 'Solve 1 DSA problem (LeetCode)', isCore: true },
      { id: 'work3-2', label: 'CS fundamentals study (30 min)', isCore: false },
      { id: 'work3-3', label: "Review yesterday's solution", isCore: false },
    ]
  },
  {
    id: 'evening',
    name: 'Evening Block',
    icon: '🌆',
    time: '18:00 – 20:00',
    color: 'linear-gradient(90deg, #f43f5e, #fb7185)',
    tasks: [
      { id: 'evening-1', label: 'Communication practice (spoken)', isCore: true },
      { id: 'evening-2', label: 'Reading (20 min)', isCore: true },
      { id: 'evening-3', label: 'Walk / low-intensity movement', isCore: false },
    ]
  },
  {
    id: 'night',
    name: 'Night Block — AI / Deep Work',
    icon: '🌙',
    time: '20:00 – 22:00',
    color: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
    tasks: [
      { id: 'night-1', label: 'AI / LLM project exploration', isCore: true },
      { id: 'night-2', label: 'Deep reading / research', isCore: false },
      { id: 'night-3', label: 'Journal / reflection (5 min)', isCore: true },
    ]
  }
];

export const PHASES = [
  {
    id: 'stabilization',
    name: 'Stabilization',
    emoji: '🌱',
    number: 'Phase 1',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    intensity: 40,
    description: "You're building the foundation. Consistency is more important than volume. Show up every single day, even imperfectly. The goal is to make execution a reflex.",
    hints: [
      'Focus on core tasks only — don\'t overload',
      'Missing a day is okay. Two in a row is the enemy.',
      'Effort matters more than output right now',
      'Morning routine is non-negotiable'
    ]
  },
  {
    id: 'control',
    name: 'Control',
    emoji: '🎯',
    number: 'Phase 2',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    intensity: 60,
    description: "You have the habit. Now sharpen the execution. You're in control of your blocks — no longer reactive. Track quality, not just completion.",
    hints: [
      'Start eliminating low-impact tasks',
      'Block external distractions during work blocks',
      'Push your DSA difficulty one level up',
      'Begin tracking your productivity patterns'
    ]
  },
  {
    id: 'intensity',
    name: 'Intensity',
    emoji: '⚡',
    number: 'Phase 3',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    intensity: 85,
    description: "You're no longer building discipline — you're deploying it. This phase is about maximum output, deliberate practice, and pushing hard every single day.",
    hints: [
      'All tasks, no excuses — minimum mode rarely used',
      'Increase workout intensity significantly',
      'Apply to more jobs, build in public',
      'Deep work blocks are sacred — protect them'
    ]
  },
  {
    id: 'expansion',
    name: 'Expansion',
    emoji: '🌊',
    number: 'Phase 4',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    intensity: 100,
    description: "You've earned this. Your system is solid. Now you expand — new domains, higher standards, compound growth. This isn't about survival anymore. It's about dominance.",
    hints: [
      'Add new learning tracks beyond current blocks',
      'Mentor others or build in public consistently',
      'Chttrix should be shipping features weekly',
      'Your morning block should feel automatic'
    ]
  }
];
