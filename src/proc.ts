const heads = [
  {
    label: "Goods",
    h_id: "h1"
  },
  {
    label: "Civil Works",
    h_id: "h2"
  },
  {
    label: "Consultants",
    h_id: "h3"
  },
  {
    label: "Individual Consultants",
    h_id: "h4"
  }
];

const methods = [
  {
    label: "Shopping via Quotation",
    m_id: "m1",
    h_id: "h1"
  },
  {
    label: "National Competitive Bidding",
    m_id: "m2",
    h_id: "h1"
  },
  {
    label: "International Competititve bidding",
    m_id: "m3",
    h_id: "h1"
  },
  {
    label: "Single Source Selection",
    m_id: "m4",
    h_id: "h1"
  },

  {
    label: "Shopping via Quotation",
    m_id: "m5",
    h_id: "h2"
  },
  {
    label: "National Competitive Bidding",
    m_id: "m6",
    h_id: "h2"
  },
  {
    label: "International Competititve bidding",
    m_id: "m7",
    h_id: "h2"
  },
  {
    label: "Single Source Selection",
    m_id: "m8",
    h_id: "h2"
  },

  {
    label: "Quality and Cost Base Selection",
    m_id: "m9",
    h_id: "h3"
  },
  {
    label: "Quality base selection",
    m_id: "m10",
    h_id: "h3"
  },
  {
    label: "Consultants qualification selection",
    m_id: "m11",
    h_id: "h3"
  },
  {
    label: "Single Source Selection",
    m_id: "m12",
    h_id: "h3"
  },

  {
    label: "Competitive Selection",
    m_id: "m13",
    h_id: "h4"
  },
  {
    label: "CV Based Selection",
    m_id: "m14",
    h_id: "h4"
  },
  {
    label: "Single Source Selection",
    m_id: "m15",
    h_id: "h4"
  },
];

const options = [


  {
    label: "Preparation of Specifications/ BoQs",
    opt_id: 1,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Invitation for Bids/ Quotations",
    opt_id: 2,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Pre-Bid Meeting ",
    opt_id: 3,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Minutes Issued",
    opt_id: 4,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Bids/ Quotations Received",
    opt_id: 5,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Bids/ Quotations Opening",
    opt_id: 6,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Completion of Evaluation ",
    opt_id: 7,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  {
    label: "Contract Award",
    opt_id: 8,
    m_id: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
  },
  
  {
    label: "Preparation of Specifications / BoQs",
    opt_id: 9,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "EOI Advertisement",
    opt_id: 10,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "EOI Submission",
    opt_id: 11,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "EOI Evaluation",
    opt_id: 12,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "RFP Issued",
    opt_id: 13,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Pre - proposal Meeting",
    opt_id: 14,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Minutes Issued",
    opt_id: 15,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Proposals Received",
    opt_id: 16,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Completion of Evaluation(TP)",
    opt_id: 17,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "FP Opening",
    opt_id: 18,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Completion of Combined Evaluation",
    opt_id: 19,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Contract Negotiations",
    opt_id: 20,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Contract Award",
    opt_id: 21,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  {
    label: "Completion",
    opt_id: 22,
    m_id: ["m9", "m10", "m11", "m12"],
  },
  
  {
    label: "Invitations for Applications / EOIs",
    opt_id: 23,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Completion of Evaluation / Shortlisting",
    opt_id: 24,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Interviews ",
    opt_id: 25,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Contract Negotiation",
    opt_id: 26,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Contract Award",
    opt_id: 27,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Initiation of Services Delivery",
    opt_id: 28,
    m_id: ["m13", "m14", "m15"],
  },
  {
    label: "Completion",
    opt_id: 29,
    m_id: ["m13", "m14", "m15"],
  },

];







