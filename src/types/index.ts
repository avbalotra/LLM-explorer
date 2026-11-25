export interface CandidateToken {
  id: number;
  token: string;
  prob: number;
  isActual?: boolean;
}

export interface AnalyzedToken {
  id: number;
  token: string;
  cleanToken: string;
  prob: number;
  invProb: number;
  logProb: number;
  surprisalBits: number;
  rank: number;
  topCandidates: CandidateToken[];
}

export interface SequenceAnalysis {
  text: string;
  tokens: AnalyzedToken[];
  ppl: number;
  avgLossNats: number;
  avgSurprisalBits: number;
  logProbSum: number;
  tokenCount: number;
  latencyMs?: number;
  isCached?: boolean;
}

export type ModelStatus = 'STANDBY' | 'DOWNLOADING' | 'ONLINE' | 'ERROR';

export interface SandboxToken {
  id: string;
  text: string;
  prob: number;
}

export interface GenerationStep {
  step: number;
  token: string;
  id: number;
  prob: number;
  invProb: number;
  topChoices: CandidateToken[];
  temperature: number;
}
