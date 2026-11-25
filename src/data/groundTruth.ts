export interface TokenResult {
  id: number;
  token: string;
  displayToken: string;
  prob: number;
  invProb: number;
}

export interface NextCandidate {
  id: number;
  token: string;
  displayToken: string;
  prob: number;
  isTop1: boolean;
}

export interface AnalysisResult {
  sentence: string;
  tokens: TokenResult[];
  product: number;
  n: number;
  perplexity: number;
  nextCandidates: NextCandidate[];
}

export const PRECOMPUTED_GROUND_TRUTH: Record<string, AnalysisResult> = {
  "I love Python": {
    sentence: "I love Python",
    tokens: [
      { id: 40, token: "I", displayToken: "I", prob: 0.007704, invProb: 129.80 },
      { id: 1842, token: " love", displayToken: "␣love", prob: 0.020450, invProb: 48.90 },
      { id: 11361, token: " Python", displayToken: "␣Python", prob: 0.0000639, invProb: 15641.41 }
    ],
    product: 99313271.86,
    n: 3,
    perplexity: 463.03,
    nextCandidates: [
      { id: 13, token: ".", displayToken: ".", prob: 0.2094, isTop1: true },
      { id: 11, token: ",", displayToken: ",", prob: 0.1728, isTop1: false },
      { id: 290, token: " and", displayToken: "␣and", prob: 0.1488, isTop1: false },
      { id: 0, token: "!", displayToken: "!", prob: 0.0715, isTop1: false },
      { id: 513, token: " 3", displayToken: "␣3", prob: 0.0274, isTop1: false },
      { id: 284, token: " to", displayToken: "␣to", prob: 0.0218, isTop1: false },
      { id: 329, token: " for", displayToken: "␣for", prob: 0.0190, isTop1: false },
      { id: 562, token: " 2", displayToken: "␣2", prob: 0.0170, isTop1: false }
    ]
  },
  "Python love I": {
    sentence: "Python love I",
    tokens: [
      { id: 37906, token: "Python", displayToken: "Python", prob: 0.0000617, invProb: 16208.01 },
      { id: 1842, token: " love", displayToken: "␣love", prob: 0.0000539, invProb: 18548.01 },
      { id: 314, token: " I", displayToken: "␣I", prob: 0.0009741, invProb: 1026.61 }
    ],
    product: 308630713797.74,
    n: 3,
    perplexity: 6757.89,
    nextCandidates: [
      { id: 892, token: " think", displayToken: "␣think", prob: 0.0834, isTop1: true },
      { id: 423, token: " have", displayToken: "␣have", prob: 0.0621, isTop1: false },
      { id: 1842, token: " love", displayToken: "␣love", prob: 0.0613, isTop1: false },
      { id: 760, token: " know", displayToken: "␣know", prob: 0.0607, isTop1: false },
      { id: 284, token: " to", displayToken: "␣to", prob: 0.0576, isTop1: false },
      { id: 1053, token: "'ve", displayToken: "'ve", prob: 0.0391, isTop1: false },
      { id: 588, token: " like", displayToken: "␣like", prob: 0.0270, isTop1: false },
      { id: 712, token: "'m", displayToken: "'m", prob: 0.0259, isTop1: false }
    ]
  },
  "The capital of France is Paris": {
    sentence: "The capital of France is Paris",
    tokens: [
      { id: 464, token: "The", displayToken: "The", prob: 0.009268, invProb: 107.89 },
      { id: 3139, token: " capital", displayToken: "␣capital", prob: 0.000231, invProb: 4322.16 },
      { id: 286, token: " of", displayToken: "␣of", prob: 0.109363, invProb: 9.14 },
      { id: 4881, token: " France", displayToken: "␣France", prob: 0.005477, invProb: 182.58 },
      { id: 318, token: " is", displayToken: "␣is", prob: 0.103482, invProb: 9.66 },
      { id: 6342, token: " Paris", displayToken: "␣Paris", prob: 0.000106, invProb: 9435.44 }
    ],
    product: 71018501625807.5,
    n: 6,
    perplexity: 203.49,
    nextCandidates: [
      { id: 11, token: ",", displayToken: ",", prob: 0.1432, isTop1: true },
      { id: 6, token: "'", displayToken: "'", prob: 0.1116, isTop1: false },
      { id: 82, token: "'s", displayToken: "'s", prob: 0.0819, isTop1: false },
      { id: 12, token: "-", displayToken: "-", prob: 0.0664, isTop1: false },
      { id: 13, token: ".", displayToken: ".", prob: 0.0648, isTop1: false },
      { id: 290, token: " and", displayToken: "␣and", prob: 0.0150, isTop1: false },
      { id: 284, token: " to", displayToken: "␣to", prob: 0.0132, isTop1: false },
      { id: 351, token: " with", displayToken: "␣with", prob: 0.0102, isTop1: false }
    ]
  },
  "The capital of France is Banana": {
    sentence: "The capital of France is Banana",
    tokens: [
      { id: 464, token: "The", displayToken: "The", prob: 0.009268, invProb: 107.89 },
      { id: 3139, token: " capital", displayToken: "␣capital", prob: 0.000231, invProb: 4322.16 },
      { id: 286, token: " of", displayToken: "␣of", prob: 0.109363, invProb: 9.14 },
      { id: 4881, token: " France", displayToken: "␣France", prob: 0.005477, invProb: 182.58 },
      { id: 318, token: " is", displayToken: "␣is", prob: 0.103482, invProb: 9.66 },
      { id: 40058, token: " Banana", displayToken: "␣Banana", prob: 0.0000000875, invProb: 11433416.08 }
    ],
    product: 86071473121588640,
    n: 6,
    perplexity: 664.41,
    nextCandidates: [
      { id: 4851, token: " Republic", displayToken: "␣Republic", prob: 0.4197, isTop1: true },
      { id: 11, token: ",", displayToken: ",", prob: 0.0340, isTop1: false },
      { id: 12, token: "-", displayToken: "-", prob: 0.0287, isTop1: false },
      { id: 8758, token: " republic", displayToken: "␣republic", prob: 0.0244, isTop1: false },
      { id: 2221, token: " City", displayToken: "␣City", prob: 0.0214, isTop1: false },
      { id: 5693, token: " Island", displayToken: "␣Island", prob: 0.0189, isTop1: false },
      { id: 13, token: ".", displayToken: ".", prob: 0.0170, isTop1: false },
      { id: 4339, token: " Town", displayToken: "␣Town", prob: 0.0148, isTop1: false }
    ]
  }
};
