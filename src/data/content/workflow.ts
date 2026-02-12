export interface WorkflowPhase {
  step: string;
  title: string;
  description: string;
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export const workflowPhases: WorkflowPhase[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Research users, audit existing solutions, and identify core problems through interviews and data analysis.',
  },
  {
    step: '02',
    title: 'Define',
    description: 'Synthesize findings into clear problem statements, user personas, and strategic design principles.',
  },
  {
    step: '03',
    title: 'Design',
    description: 'Create solutions through iterative prototyping, testing concepts with users, and refining based on feedback.',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Partner with engineering for implementation, measure impact, and continuously optimize based on data.',
  },
];

export const designPrinciples: DesignPrinciple[] = [
  {
    title: 'User-First:',
    description: 'Design for real people with real needs',
  },
  {
    title: 'Data-Informed:',
    description: 'Let metrics guide decisions, not dictate them',
  },
  {
    title: 'Systems Thinking:',
    description: 'Build scalable, maintainable solutions',
  },
  {
    title: 'Iterate Fast:',
    description: 'Perfect is the enemy of progress',
  },
];
