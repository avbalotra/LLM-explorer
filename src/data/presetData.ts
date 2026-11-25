import { SequenceAnalysis } from '../types';

export const PRESET_ANALYSES: Record<string, SequenceAnalysis> = {
  "I love Python": {
    text: "I love Python",
    ppl: 463.57,
    avgLossNats: 6.139,
    avgSurprisalBits: 8.857,
    logProbSum: -18.417,
    tokenCount: 3,
    isCached: true,
    tokens: [
      {
        id: 40,
        token: "I",
        cleanToken: "I",
        prob: 0.009201,
        invProb: 108.68,
        logProb: -4.6884,
        surprisalBits: 6.76,
        rank: 6,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02867 },
          { id: 198, token: "\\n", prob: 0.02545 },
          { id: 13, token: ".", prob: 0.02005 },
          { id: 40, token: "I", prob: 0.00920, isActual: true },
          { id: 464, token: "The", prob: 0.00891 },
          { id: 284, token: " to", prob: 0.00782 },
          { id: 257, token: " a", prob: 0.00741 },
          { id: 314, token: " I", prob: 0.00695 }
        ]
      },
      {
        id: 1842,
        token: " love",
        cleanToken: "love",
        prob: 0.013181,
        invProb: 75.87,
        logProb: -4.3290,
        surprisalBits: 6.25,
        rank: 13,
        topCandidates: [
          { id: 447, token: " don't", prob: 0.11563 },
          { id: 423, token: " have", prob: 0.05573 },
          { id: 1101, token: "'m", prob: 0.04494 },
          { id: 550, token: " was", prob: 0.03812 },
          { id: 1842, token: " love", prob: 0.01318, isActual: true },
          { id: 764, token: " know", prob: 0.01289 },
          { id: 2067, token: " like", prob: 0.01124 },
          { id: 588, token: " can", prob: 0.01004 }
        ]
      },
      {
        id: 11361,
        token: " Python",
        cleanToken: "Python",
        prob: 0.000083,
        invProb: 12081.86,
        logProb: -9.3995,
        surprisalBits: 13.56,
        rank: 807,
        topCandidates: [
          { id: 284, token: " to", prob: 0.13674 },
          { id: 262, token: " the", prob: 0.12985 },
          { id: 428, token: " this", prob: 0.06103 },
          { id: 673, token: " it", prob: 0.04891 },
          { id: 373, token: " that", prob: 0.04112 },
          { id: 257, token: " a", prob: 0.03824 },
          { id: 318, token: " is", prob: 0.02119 },
          { id: 11361, token: " Python", prob: 0.000083, isActual: true }
        ]
      }
    ]
  },
  "Python love I": {
    text: "Python love I",
    ppl: 10186.57,
    avgLossNats: 9.229,
    avgSurprisalBits: 13.315,
    logProbSum: -27.687,
    tokenCount: 3,
    isCached: true,
    tokens: [
      {
        id: 37906,
        token: "Python",
        cleanToken: "Python",
        prob: 0.000026,
        invProb: 37991.58,
        logProb: -10.5451,
        surprisalBits: 15.21,
        rank: 4319,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02766 },
          { id: 198, token: "\\n", prob: 0.02343 },
          { id: 13, token: ".", prob: 0.01902 },
          { id: 464, token: "The", prob: 0.01521 },
          { id: 40, token: "I", prob: 0.01211 },
          { id: 37906, token: "Python", prob: 0.000026, isActual: true },
          { id: 314, token: " I", prob: 0.00892 },
          { id: 11, token: ",", prob: 0.00762 }
        ]
      },
      {
        id: 1842,
        token: " love",
        cleanToken: "love",
        prob: 0.000047,
        invProb: 21484.30,
        logProb: -9.9751,
        surprisalBits: 14.39,
        rank: 1871,
        topCandidates: [
          { id: 513, token: " 3", prob: 0.09505 },
          { id: 362, token: " 2", prob: 0.04132 },
          { id: 318, token: " is", prob: 0.03452 },
          { id: 284, token: " to", prob: 0.02891 },
          { id: 262, token: " the", prob: 0.02511 },
          { id: 1842, token: " love", prob: 0.000047, isActual: true },
          { id: 11, token: ",", prob: 0.01891 },
          { id: 13, token: ".", prob: 0.01755 }
        ]
      },
      {
        id: 314,
        token: " I",
        cleanToken: "I",
        prob: 0.000772,
        invProb: 1295.02,
        logProb: -7.1663,
        surprisalBits: 10.34,
        rank: 125,
        topCandidates: [
          { id: 284, token: " to", prob: 0.06219 },
          { id: 318, token: " is", prob: 0.03943 },
          { id: 11, token: ",", prob: 0.03665 },
          { id: 262, token: " the", prob: 0.03102 },
          { id: 314, token: " I", prob: 0.000772, isActual: true },
          { id: 428, token: " this", prob: 0.01824 },
          { id: 502, token: " with", prob: 0.01719 },
          { id: 373, token: " that", prob: 0.01602 }
        ]
      }
    ]
  },
  "The capital of France is Paris": {
    text: "The capital of France is Paris",
    ppl: 250.49,
    avgLossNats: 5.524,
    avgSurprisalBits: 7.969,
    logProbSum: -33.141,
    tokenCount: 6,
    isCached: true,
    tokens: [
      {
        id: 464,
        token: "The",
        cleanToken: "The",
        prob: 0.005994,
        invProb: 166.83,
        logProb: -5.1170,
        surprisalBits: 7.38,
        rank: 11,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02889 },
          { id: 198, token: "\\n", prob: 0.02460 },
          { id: 13, token: ".", prob: 0.01886 },
          { id: 464, token: "The", prob: 0.005994, isActual: true },
          { id: 40, token: "I", prob: 0.00512 },
          { id: 262, token: " the", prob: 0.00491 },
          { id: 257, token: " a", prob: 0.00421 },
          { id: 314, token: " I", prob: 0.00388 }
        ]
      },
      {
        id: 3139,
        token: " capital",
        cleanToken: "capital",
        prob: 0.000260,
        invProb: 3841.70,
        logProb: -8.2537,
        surprisalBits: 11.91,
        rank: 590,
        topCandidates: [
          { id: 717, token: " first", prob: 0.01021 },
          { id: 2506, token: " latest", prob: 0.00643 },
          { id: 2201, token: " National", prob: 0.00612 },
          { id: 1650, token: " company", prob: 0.00589 },
          { id: 1549, token: " world", prob: 0.00512 },
          { id: 3139, token: " capital", prob: 0.000260, isActual: true },
          { id: 1359, token: " government", prob: 0.00481 },
          { id: 1748, token: " city", prob: 0.00422 }
        ]
      },
      {
        id: 286,
        token: " of",
        cleanToken: "of",
        prob: 0.103282,
        invProb: 9.68,
        logProb: -2.2703,
        surprisalBits: 3.28,
        rank: 2,
        topCandidates: [
          { id: 1748, token: " city", prob: 0.22684 },
          { id: 286, token: " of", prob: 0.103282, isActual: true },
          { id: 338, token: "'s", prob: 0.09104 },
          { id: 318, token: " is", prob: 0.05412 },
          { id: 284, token: " to", prob: 0.04123 },
          { id: 11, token: ",", prob: 0.03891 },
          { id: 502, token: " with", prob: 0.02104 },
          { id: 287, token: " in", prob: 0.01891 }
        ]
      },
      {
        id: 4881,
        token: " France",
        cleanToken: "France",
        prob: 0.004732,
        invProb: 211.33,
        logProb: -5.3534,
        surprisalBits: 7.72,
        rank: 24,
        topCandidates: [
          { id: 262, token: " the", prob: 0.15421 },
          { id: 968, token: " New", prob: 0.03014 },
          { id: 3991, token: " India", prob: 0.02985 },
          { id: 4881, token: " France", prob: 0.004732, isActual: true },
          { id: 2045, token: " China", prob: 0.02114 },
          { id: 2284, token: " Japan", prob: 0.01982 },
          { id: 2167, token: " England", prob: 0.01755 },
          { id: 257, token: " a", prob: 0.01423 }
        ]
      },
      {
        id: 318,
        token: " is",
        cleanToken: "is",
        prob: 0.092784,
        invProb: 10.78,
        logProb: -2.3775,
        surprisalBits: 3.43,
        rank: 2,
        topCandidates: [
          { id: 11, token: ",", prob: 0.31024 },
          { id: 318, token: " is", prob: 0.092784, isActual: true },
          { id: 468, token: " has", prob: 0.08215 },
          { id: 550, token: " was", prob: 0.06124 },
          { id: 290, token: " and", prob: 0.04891 },
          { id: 326, token: " will", prob: 0.03102 },
          { id: 13, token: ".", prob: 0.02941 },
          { id: 284, token: " to", prob: 0.01988 }
        ]
      },
      {
        id: 6342,
        token: " Paris",
        cleanToken: "Paris",
        prob: 0.000104,
        invProb: 9615.38,
        logProb: -9.7693,
        surprisalBits: 14.10,
        rank: 1340,
        topCandidates: [
          { id: 284, token: " to", prob: 0.04712 },
          { id: 262, token: " the", prob: 0.04321 },
          { id: 257, token: " a", prob: 0.03541 },
          { id: 407, token: " not", prob: 0.02891 },
          { id: 1492, token: " located", prob: 0.02419 },
          { id: 6342, token: " Paris", prob: 0.000104, isActual: true },
          { id: 584, token: " also", prob: 0.01923 },
          { id: 1049, token: " expected", prob: 0.01655 }
        ]
      }
    ]
  },
  "The capital of France is potato": {
    text: "The capital of France is potato",
    ppl: 3559.42,
    avgLossNats: 8.177,
    avgSurprisalBits: 11.797,
    logProbSum: -49.064,
    tokenCount: 6,
    isCached: true,
    tokens: [
      {
        id: 464,
        token: "The",
        cleanToken: "The",
        prob: 0.005994,
        invProb: 166.83,
        logProb: -5.1170,
        surprisalBits: 7.38,
        rank: 11,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02889 },
          { id: 198, token: "\\n", prob: 0.02460 },
          { id: 13, token: ".", prob: 0.01886 },
          { id: 464, token: "The", prob: 0.005994, isActual: true }
        ]
      },
      {
        id: 3139,
        token: " capital",
        cleanToken: "capital",
        prob: 0.000260,
        invProb: 3841.70,
        logProb: -8.2537,
        surprisalBits: 11.91,
        rank: 590,
        topCandidates: [
          { id: 717, token: " first", prob: 0.01021 },
          { id: 3139, token: " capital", prob: 0.000260, isActual: true }
        ]
      },
      {
        id: 286,
        token: " of",
        cleanToken: "of",
        prob: 0.103282,
        invProb: 9.68,
        logProb: -2.2703,
        surprisalBits: 3.28,
        rank: 2,
        topCandidates: [
          { id: 1748, token: " city", prob: 0.22684 },
          { id: 286, token: " of", prob: 0.103282, isActual: true }
        ]
      },
      {
        id: 4881,
        token: " France",
        cleanToken: "France",
        prob: 0.004732,
        invProb: 211.33,
        logProb: -5.3534,
        surprisalBits: 7.72,
        rank: 24,
        topCandidates: [
          { id: 262, token: " the", prob: 0.15421 },
          { id: 4881, token: " France", prob: 0.004732, isActual: true }
        ]
      },
      {
        id: 318,
        token: " is",
        cleanToken: "is",
        prob: 0.092784,
        invProb: 10.78,
        logProb: -2.3775,
        surprisalBits: 3.43,
        rank: 2,
        topCandidates: [
          { id: 11, token: ",", prob: 0.31024 },
          { id: 318, token: " is", prob: 0.092784, isActual: true }
        ]
      },
      {
        id: 29314,
        token: " potato",
        cleanToken: "potato",
        prob: 0.000000073,
        invProb: 13698630.13,
        logProb: -16.432,
        surprisalBits: 23.71,
        rank: 48210,
        topCandidates: [
          { id: 284, token: " to", prob: 0.04712 },
          { id: 262, token: " the", prob: 0.04321 },
          { id: 6342, token: " Paris", prob: 0.000104 },
          { id: 29314, token: " potato", prob: 0.000000073, isActual: true }
        ]
      }
    ]
  },
  "The orbital thrusters ignited in silent vacuum": {
    text: "The orbital thrusters ignited in silent vacuum",
    ppl: 986.93,
    avgLossNats: 6.895,
    avgSurprisalBits: 9.947,
    logProbSum: -55.157,
    tokenCount: 8,
    isCached: true,
    tokens: [
      {
        id: 464,
        token: "The",
        cleanToken: "The",
        prob: 0.005918,
        invProb: 168.98,
        logProb: -5.1298,
        surprisalBits: 7.40,
        rank: 11,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02871 },
          { id: 198, token: "\\n", prob: 0.02451 },
          { id: 13, token: ".", prob: 0.01891 },
          { id: 464, token: "The", prob: 0.005918, isActual: true },
          { id: 40, token: "I", prob: 0.00511 },
          { id: 262, token: " the", prob: 0.00488 },
          { id: 257, token: " a", prob: 0.00412 },
          { id: 314, token: " I", prob: 0.00390 }
        ]
      },
      {
        id: 32362,
        token: " orbital",
        cleanToken: "orbital",
        prob: 0.000006,
        invProb: 166666.67,
        logProb: -12.0239,
        surprisalBits: 17.35,
        rank: 18240,
        topCandidates: [
          { id: 717, token: " first", prob: 0.01019 },
          { id: 2201, token: " National", prob: 0.00624 },
          { id: 2506, token: " latest", prob: 0.00608 },
          { id: 32362, token: " orbital", prob: 0.000006, isActual: true },
          { id: 1650, token: " company", prob: 0.00581 },
          { id: 1549, token: " world", prob: 0.00508 },
          { id: 1359, token: " government", prob: 0.00478 },
          { id: 1748, token: " city", prob: 0.00419 }
        ]
      },
      {
        id: 5636,
        token: " thr",
        cleanToken: "thr",
        prob: 0.000643,
        invProb: 1555.21,
        logProb: -7.3496,
        surprisalBits: 10.60,
        rank: 186,
        topCandidates: [
          { id: 2459, token: " path", prob: 0.04812 },
          { id: 1082, token: " system", prob: 0.04105 },
          { id: 286, token: " of", prob: 0.03874 },
          { id: 5636, token: " thr", prob: 0.000643, isActual: true },
          { id: 1782, token: " flight", prob: 0.03512 },
          { id: 3881, token: " station", prob: 0.03104 },
          { id: 2272, token: " space", prob: 0.02988 },
          { id: 1478, token: " mission", prob: 0.02419 }
        ]
      },
      {
        id: 13654,
        token: "usters",
        cleanToken: "usters",
        prob: 0.473462,
        invProb: 2.11,
        logProb: -0.7477,
        surprisalBits: 1.08,
        rank: 2,
        topCandidates: [
          { id: 31804, token: "uster", prob: 0.48120 },
          { id: 13654, token: "usters", prob: 0.473462, isActual: true },
          { id: 35142, token: "ashing", prob: 0.00841 },
          { id: 2841, token: "ust", prob: 0.00712 },
          { id: 9812, token: "usts", prob: 0.00491 },
          { id: 1421, token: "ow", prob: 0.00312 },
          { id: 1821, token: "eat", prob: 0.00289 },
          { id: 2311, token: "ill", prob: 0.00201 }
        ]
      },
      {
        id: 40442,
        token: " ignited",
        cleanToken: "ignited",
        prob: 0.000153,
        invProb: 6535.95,
        logProb: -8.7857,
        surprisalBits: 12.68,
        rank: 752,
        topCandidates: [
          { id: 389, token: " are", prob: 0.08124 },
          { id: 423, token: " have", prob: 0.06412 },
          { id: 11, token: ",", prob: 0.05219 },
          { id: 550, token: " was", prob: 0.04891 },
          { id: 290, token: " and", prob: 0.04102 },
          { id: 40442, token: " ignited", prob: 0.000153, isActual: true },
          { id: 284, token: " to", prob: 0.03819 },
          { id: 326, token: " will", prob: 0.03104 }
        ]
      },
      {
        id: 287,
        token: " in",
        cleanToken: "in",
        prob: 0.030232,
        invProb: 33.08,
        logProb: -3.4989,
        surprisalBits: 5.05,
        rank: 5,
        topCandidates: [
          { id: 416, token: " by", prob: 0.16241 },
          { id: 257, token: " a", prob: 0.14102 },
          { id: 262, token: " the", prob: 0.13840 },
          { id: 502, token: " with", prob: 0.08412 },
          { id: 287, token: " in", prob: 0.030232, isActual: true },
          { id: 11, token: ",", prob: 0.02981 },
          { id: 13, token: ".", prob: 0.02766 },
          { id: 284, token: " to", prob: 0.02109 }
        ]
      },
      {
        id: 10574,
        token: " silent",
        cleanToken: "silent",
        prob: 0.000026,
        invProb: 38461.54,
        logProb: -10.5574,
        surprisalBits: 15.23,
        rank: 3810,
        topCandidates: [
          { id: 262, token: " the", prob: 0.23887 },
          { id: 257, token: " a", prob: 0.09447 },
          { id: 2272, token: " space", prob: 0.03187 },
          { id: 757, token: " an", prob: 0.02891 },
          { id: 10574, token: " silent", prob: 0.000026, isActual: true },
          { id: 1082, token: " system", prob: 0.01982 },
          { id: 1549, token: " world", prob: 0.01811 },
          { id: 1912, token: " order", prob: 0.01624 }
        ]
      },
      {
        id: 17076,
        token: " vacuum",
        cleanToken: "vacuum",
        prob: 0.000833,
        invProb: 1200.56,
        logProb: -7.0905,
        surprisalBits: 10.23,
        rank: 141,
        topCandidates: [
          { id: 11, token: ",", prob: 0.08788 },
          { id: 4235, token: " mode", prob: 0.07371 },
          { id: 6268, token: " motion", prob: 0.05330 },
          { id: 2272, token: " space", prob: 0.04891 },
          { id: 17076, token: " vacuum", prob: 0.000833, isActual: true },
          { id: 13, token: ".", prob: 0.04102 },
          { id: 4944, token: " night", prob: 0.03819 },
          { id: 4891, token: " darkness", prob: 0.03124 }
        ]
      }
    ]
  },
  "Quantum bananas negotiated the treaty": {
    text: "Quantum bananas negotiated the treaty",
    ppl: 6954.73,
    avgLossNats: 8.847,
    avgSurprisalBits: 12.765,
    logProbSum: -53.083,
    tokenCount: 6,
    isCached: true,
    tokens: [
      {
        id: 24915,
        token: "Quant",
        cleanToken: "Quant",
        prob: 0.000014,
        invProb: 70340.58,
        logProb: -11.1611,
        surprisalBits: 16.10,
        rank: 6171,
        topCandidates: [
          { id: 383, token: " The", prob: 0.02879 },
          { id: 198, token: "\\n", prob: 0.02366 },
          { id: 13, token: ".", prob: 0.01906 },
          { id: 464, token: "The", prob: 0.01511 },
          { id: 40, token: "I", prob: 0.01204 },
          { id: 24915, token: "Quant", prob: 0.000014, isActual: true },
          { id: 314, token: " I", prob: 0.00889 },
          { id: 11, token: ",", prob: 0.00755 }
        ]
      },
      {
        id: 388,
        token: "um",
        cleanToken: "um",
        prob: 0.745763,
        invProb: 1.34,
        logProb: -0.2933,
        surprisalBits: 0.42,
        rank: 1,
        topCandidates: [
          { id: 388, token: "um", prob: 0.745763, isActual: true },
          { id: 3713, token: "ico", prob: 0.01720 },
          { id: 385, token: "us", prob: 0.01671 },
          { id: 1841, token: "as", prob: 0.01124 },
          { id: 2941, token: "ic", prob: 0.00891 },
          { id: 4121, token: "ity", prob: 0.00711 },
          { id: 5012, token: "ar", prob: 0.00542 },
          { id: 6112, token: "al", prob: 0.00481 }
        ]
      },
      {
        id: 35484,
        token: " bananas",
        cleanToken: "bananas",
        prob: 0.00000038,
        invProb: 2631578.95,
        logProb: -14.7842,
        surprisalBits: 21.33,
        rank: 37118,
        topCandidates: [
          { id: 318, token: " is", prob: 0.02783 },
          { id: 13, token: ".", prob: 0.01846 },
          { id: 25, token: ":", prob: 0.01748 },
          { id: 11, token: ",", prob: 0.01624 },
          { id: 284, token: " to", prob: 0.01511 },
          { id: 35484, token: " bananas", prob: 0.00000038, isActual: true },
          { id: 262, token: " the", prob: 0.01423 },
          { id: 389, token: " are", prob: 0.01291 }
        ]
      },
      {
        id: 22368,
        token: " negotiated",
        cleanToken: "negotiated",
        prob: 0.00000057,
        invProb: 1754385.96,
        logProb: -14.3721,
        surprisalBits: 20.73,
        rank: 13803,
        topCandidates: [
          { id: 389, token: " are", prob: 0.19856 },
          { id: 11, token: ",", prob: 0.16754 },
          { id: 290, token: " and", prob: 0.05631 },
          { id: 318, token: " is", prob: 0.04891 },
          { id: 423, token: " have", prob: 0.04123 },
          { id: 22368, token: " negotiated", prob: 0.00000057, isActual: true },
          { id: 284, token: " to", prob: 0.03812 },
          { id: 550, token: " was", prob: 0.02988 }
        ]
      },
      {
        id: 262,
        token: " the",
        cleanToken: "the",
        prob: 0.008022,
        invProb: 124.66,
        logProb: -4.8256,
        surprisalBits: 6.96,
        rank: 10,
        topCandidates: [
          { id: 351, token: " with", prob: 0.35734 },
          { id: 416, token: " by", prob: 0.26395 },
          { id: 287, token: " in", prob: 0.08911 },
          { id: 262, token: " the", prob: 0.008022, isActual: true },
          { id: 257, token: " a", prob: 0.04891 },
          { id: 284, token: " to", prob: 0.03812 },
          { id: 502, token: " with", prob: 0.02911 },
          { id: 11, token: ",", prob: 0.01988 }
        ]
      },
      {
        id: 15775,
        token: " treaty",
        cleanToken: "treaty",
        prob: 0.000483,
        invProb: 2072.50,
        logProb: -7.6365,
        surprisalBits: 11.02,
        rank: 302,
        topCandidates: [
          { id: 2756, token: " price", prob: 0.02319 },
          { id: 835, token: " way", prob: 0.01709 },
          { id: 5466, token: " sale", prob: 0.01698 },
          { id: 15775, token: " treaty", prob: 0.000483, isActual: true },
          { id: 1359, token: " government", prob: 0.01421 },
          { id: 2154, token: " terms", prob: 0.01389 },
          { id: 2459, token: " deal", prob: 0.01284 },
          { id: 3102, token: " agreement", prob: 0.01191 }
        ]
      }
    ]
  }
};
