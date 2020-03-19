const SURVEYS = [
  {
    name: 'form1',
    display: "form",
    smeRef: "form",
    page: 0,
    refreshOn: "submit",
    "passScore": '120',
    "totalScore": '200',
    numPages: 2,
    components: [{
      "label": "Text Field",
      "spellcheck": true,
      "tableView": true,
      "key": "textField",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Text Area",
      "autoExpand": false,
      "spellcheck": true,
      "tableView": true,
      "key": "textArea",
      "type": "textarea",
      "input": true
    }]
  },
  {
    name: 'form2',
    display: "form",
    smeRef: "form",
    "passScore": '120',
    "totalScore": '200',
    page: 0,
    refreshOn: "submit",
    numPages: 2,
    components: [{
      "label": "Text Field",
      "spellcheck": true,
      "tableView": true,
      "key": "textField",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Text Area",
      "autoExpand": false,
      "spellcheck": true,
      "tableView": true,
      "key": "textArea",
      "type": "textarea",
      "input": true
    }]
  },
  {
    "name": 'Eligibility - Registration',
    "display": "form",
    "formIdentity": "eligibility-registartion",
    "smeRef": "",
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "label": "Table",
        "cellAlignment": "left",
        "tableView": false,
        "key": "table",
        "type": "table",
        "numRows": 6,
        "input": false,
        "rows": [
          [
            {
              "components": [
                {
                  "html": "<p>Companies Ordinance 1984 or Companies Act 2017</p>",
                  "label": "CO1984CA2017",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "CO1984CA2017",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "CO1984CA2017",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "CO1984CA2017-status",
                  "conditional": {
                    "show": true,
                    "when": "CO1984CA2017",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Societies Registration Act 1860</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "SRA1860",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "SRA1860",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "SRA1860-status",
                  "conditional": {
                    "show": true,
                    "when": "SRA1860",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Voluntary Social Welfare Organizations Ordinance 1961</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "VSWOO1961",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "VSWOO1961",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "VSWOO1961-status",
                  "conditional": {
                    "show": true,
                    "when": "VSWOO1961",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Trusts Act 1882</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "TA1882",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "TA1882",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "TA1882-status",
                  "conditional": {
                    "show": true,
                    "when": "TA1882",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Economic Affairs Division, Government of Pakistan</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "EADGOP",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "EADGOP",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "EADGOP-status",
                  "conditional": {
                    "show": true,
                    "when": "EADGOP",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>By means of treaty or other agreement that acts as a charter with Government of Pakistan [for UN Agencies]</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "BTUN",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "tableView": false,
                  "defaultValue": false,
                  "key": "BTUN",
                  "type": "checkbox",
                  "input": true
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "active",
                        "label": "Active"
                      },
                      {
                        "label": "Suspended",
                        "value": "suspended"
                      },
                      {
                        "label": "Inactive",
                        "value": "inactive"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "validate": {
                    "required": true
                  },
                  "key": "BTUN-status",
                  "conditional": {
                    "show": true,
                    "when": "BTUN",
                    "eq": "true"
                  },
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            }
          ]
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Eligibility - Financial Management",
    "display": "form",
    "formIdentity": "eligibility-financial",
    "smeRef": "eligibility-financial",
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "label": "Financial Management Table",
        "cellAlignment": "left",
        "tableView": false,
        "key": "table",
        "type": "table",
        "numRows": 4,
        "input": false,
        "rows": [
          [
            {
              "components": [
                {
                  "label": "Table",
                  "cellAlignment": "left",
                  "tableView": false,
                  "key": "table1",
                  "type": "table",
                  "numRows": 2,
                  "numCols": 1,
                  "input": false,
                  "rows": [
                    [
                      {
                        "components": [
                          {
                            "html": "<p>Registered with Taxation Department</p>",
                            "label": "&nbsp;",
                            "refreshOnChange": false,
                            "tableView": false,
                            "key": "rwtd",
                            "type": "content",
                            "input": false
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "components": [
                          {
                            "html": "<p>Exemption for Tax(es)</p>",
                            "label": "&nbsp;",
                            "refreshOnChange": false,
                            "tableView": false,
                            "key": "examptiontaxes",
                            "type": "content",
                            "input": false
                          }
                        ]
                      }
                    ]
                  ]
                }
              ]
            },
            {
              "components": [
                {
                  "label": "Table",
                  "cellAlignment": "left",
                  "tableView": false,
                  "key": "table2",
                  "type": "table",
                  "numRows": 2,
                  "numCols": 1,
                  "input": false,
                  "rows": [
                    [
                      {
                        "components": [
                          {
                            "label": "&nbsp;",
                            "widget": "choicesjs",
                            "tableView": true,
                            "data": {
                              "values": [
                                {
                                  "value": "yes",
                                  "label": "Yes"
                                },
                                {
                                  "label": "No",
                                  "value": "no"
                                }
                              ]
                            },
                            "selectThreshold": 0.3,
                            "key": "rwtd",
                            "type": "select",
                            "indexeddb": {
                              "filter": {}
                            },
                            "input": true
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "components": [
                          {
                            "label": "&nbsp;",
                            "widget": "choicesjs",
                            "tableView": true,
                            "data": {
                              "values": [
                                {
                                  "value": "yes",
                                  "label": "Yes"
                                },
                                {
                                  "label": "No",
                                  "value": "no"
                                }
                              ]
                            },
                            "selectThreshold": 0.3,
                            "key": "examptiontaxes",
                            "type": "select",
                            "indexeddb": {
                              "filter": {}
                            },
                            "input": true
                          }
                        ]
                      }
                    ]
                  ]
                }
              ]
            },
            {
              "components": [
                {
                  "label": "Table",
                  "cellAlignment": "left",
                  "tableView": false,
                  "key": "table3",
                  "type": "table",
                  "numRows": 2,
                  "numCols": 1,
                  "input": false,
                  "rows": [
                    [
                      {
                        "components": [
                          {
                            "label": "NTN#",
                            "spellcheck": true,
                            "tableView": true,
                            "key": "rwtd-number",
                            "type": "textfield",
                            "input": true
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "components": []
                      }
                    ]
                  ]
                }
              ]
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Last three (03) years audited financial statements</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "lastyearsfs",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "yes",
                        "label": "Yes"
                      },
                      {
                        "label": "No",
                        "value": "no"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "key": "lastyearsfs",
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            },
            {
              "components": []
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Audit was carried out by a Chartered Accountancy Firm from State Bank of&nbsp;</p><p>Pakistan’s Panel of Auditors under Category ‘A’ and having ‘Satisfactory’&nbsp;</p><p>rating under the Quality Control Review Programme managed by the Institute&nbsp;</p><p>of Chartered Accountants of Pakistan.</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "didaudit",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "yes",
                        "label": "Yes"
                      },
                      {
                        "label": "No",
                        "value": "no"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "key": "didaudit",
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            },
            {
              "components": []
            }
          ],
          [
            {
              "components": [
                {
                  "html": "<p>Commitment of availability of counterpart financing i.e. 30% (in cash) for the proposed project</p>",
                  "label": "&nbsp;",
                  "refreshOnChange": false,
                  "tableView": false,
                  "key": "counterpartfinance",
                  "type": "content",
                  "input": false
                }
              ]
            },
            {
              "components": [
                {
                  "label": "&nbsp;",
                  "widget": "choicesjs",
                  "tableView": true,
                  "data": {
                    "values": [
                      {
                        "value": "yes",
                        "label": "Yes"
                      },
                      {
                        "label": "No",
                        "value": "no"
                      }
                    ]
                  },
                  "selectThreshold": 0.3,
                  "key": "counterpartfinance",
                  "type": "select",
                  "indexeddb": {
                    "filter": {}
                  },
                  "input": true
                }
              ]
            },
            {
              "components": []
            }
          ]
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Qualification - Organizational Structure",
    "display": "form",
    "formIdentity": "qualification-os",
    "smeRef": "quali-os",
    "passScore": '200',
    "totalScore": '400',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "html": "<p>A. Organizational Structure</p>",
        "label": "Content",
        "refreshOnChange": false,
        "tableView": false,
        "key": "content",
        "type": "content",
        "input": false
      },
      {
        "label": "Do the organizational & reporting structures exist?",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radioa",
        "type": "radio",
        "input": true
      },
      {
        "label": "Are those structures clearly documented and disseminated? ",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radiob",
        "type": "radio",
        "input": true
      },
      {
        "label": "Is there a document that outlines the supervisory and staff responsibilities?",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radioc",
        "type": "radio",
        "input": true
      },
      {
        "label": "Does the organization have defined internal communication mechanisms? ",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radiod",
        "type": "radio",
        "input": true
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Qualification - Regulatory and legal regimes",
    "display": "form",
    "formIdentity": "qualification-ralg",
    "smeRef": "quali-rlr",
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "html": "<p>B. Regulatory and Legal Regimes</p>",
        "label": "Content",
        "refreshOnChange": false,
        "tableView": false,
        "key": "content",
        "type": "content",
        "input": false
      },
      {
        "title": "1. Vision, Mission, and Values",
        "collapsible": false,
        "tableView": false,
        "key": "1VisionMissionAndValues",
        "type": "panel",
        "label": "1. Vision, Mission, and Values",
        "input": false,
        "components": [
          {
            "label": "Does the organization have vision statement, mission statement and statement of values?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob1a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are the vision and mission statements used to set priorities?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob1b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are these statements posted openly in the office or somewhere visible for staff & visitors to see them?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob1c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are the statements being used in human resource materials (i.e., staff handbooks, orientation materials, job descriptions, etc.), organizational brochures, reports, and proposals?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob1d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization regularly review the vision and mission statements (for example, in conjunction with strategic and/or operational planning)?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob1e",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "2. Legal Adherence",
        "collapsible": false,
        "tableView": false,
        "key": "1VisionMissionAndValues1",
        "type": "panel",
        "label": "2. Legal Adherence",
        "input": false,
        "components": [
          {
            "label": "Is the documentation of current legal registration(s) readily available (or posted) in the office or available on internet on the organization’s website?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob2a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are country’s labor laws being adhered to and their references are duly documented in human resource policies?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob2b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization comply with the taxation regime in its all financial affairs?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob2c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization comply with annual statutory requirements, such as audits and other reporting?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob2d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are audit and other statutory reports, reviewed and approved by the Board/Council/Governing Management? ",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob2e",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "3. Governing or Advisory Structure",
        "collapsible": false,
        "tableView": false,
        "key": "1VisionMissionAndValues2",
        "type": "panel",
        "label": "3. Governing or Advisory Structure",
        "input": false,
        "components": [
          {
            "label": "Does the organization have any governing and/or advisory Board/Council//Body/Management?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the Governing Board/Council//Body/Management have clearly defined Terms of Reference (TOR) that details its primary duties",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are the roles of Governing Board/Council//Body/ Management and Organizational Management clearly differentiated from each other?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does clearly documented system & criteria exist for electing/selecting or replacing a member of Governing Board/Council//Body/ Management?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does any term limit exist for a person to complete/remain as member of the Governing Board/Council/ Body/Management? ",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the Governing Board/Council//Body/Management meet regularly, agenda is pre-circulated and its decisions are documented in the form of minutes?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3f",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is the Governing Board/Council//Body/Management involved in strategic planning, resource mobilization, developing & approving organizational policies, approval of budget and audited annual financial statements",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3g",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is the Governing Board/Council//Body/Management involved in strategic planning, resource mobilization, developing & approving organizational policies, approval of budget and audited annual financial statements",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiob3e",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Qualification - Procurement",
    "display": "form",
    "formIdentity": "qualification-proc",
    "smeRef": 'quali-proc',
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "html": "<p>D. Procurement Management</p>",
        "label": "Content",
        "refreshOnChange": false,
        "tableView": false,
        "key": "content",
        "type": "content",
        "input": false
      },
      {
        "title": "1. Regulatory Framework ",
        "collapsible": false,
        "tableView": false,
        "key": "1RegulatoryFramework",
        "type": "panel",
        "label": "1. Regulatory Framework ",
        "input": false,
        "components": [
          {
            "label": "Are separate & exclusive policies, rules, regulations, procedures, guidelines that govern the procurement processes & responsibilities in place? Is precedence clearly established?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are they adequately recorded/documented in the form of Manual detailing all procedures for the correct administration of procurement policies, rules, regulations, procedures or guideline besides organizing the hierarchy?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are all policies, rules, regulations, procedures or guidelines easily accessible to everyone including general public, at no cost?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the Framework adequately cover to carry out procurement of Goods, Works, and Services (including consulting services) using guidelines/rules/processes of more than one sources of funds/donors?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules promote fair competition and extend level playing field to all the prospective bidders?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the policies, rules, regulations, procedures, guidelines or Manual regularly reviewed and updated?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1f",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the Organization have dedicated procurement expertise available?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod1g",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "2. Bidding Processes",
        "collapsible": false,
        "tableView": false,
        "key": "1RegulatoryFramework1",
        "type": "panel",
        "label": "2. Bidding Processes",
        "input": false,
        "components": [
          {
            "label": "Is open competitive bidding a default method of procurement?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are other methods of procurement also allowed/adopted under given conditions as an alternate to competitive bidding process and an unambiguous level of hierarchy is given in the procurement framework?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are appropriate standards for resorting to international competitive bidding, if mandated, provided?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is invitation for bids properly advertised in newspaper and uploaded on organization’s website/international website/business magazines etc.?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is sufficient time [such as 15 days for national competitive bidding and/or 30 days for international competitive bidding], provided for the bidders to respond?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the bidding documents contain necessary information such as name & address of official for obtaining bidding documents & clarifications by prospective, eligibility criteria, nature of procurement activity, date, time & place for pre-bid meetings, bid submission & opening?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2f",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization require bidders, including international, to get themselves registered with it through a defined mechanism for taking part in a bidding process?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2g",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is the registration criteria objectively defined and nondiscretionary for measuring the capacity, capability and competence to execute a contract?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod2h",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "3. Participation Processes",
        "collapsible": false,
        "tableView": false,
        "key": "1RegulatoryFramework2",
        "type": "panel",
        "label": "3. Participation Processes",
        "input": false,
        "components": [
          {
            "label": "Do the rules require incorporation of sufficient information in tender documents to enable the submission of responsive bids/proposals and to establish the basis for a transparent evaluation & award process?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization have prescribed Standard bidding documents for procurement of goods, works and services?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are standard and mandatory set of clauses or templates that are reflective of the legal framework, used in bidding documents?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules advocate/encourage development of generic specifications (which are not restrictive in nature, like use of brand names in specifications) and refer to international standards where possible?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are bids publically opened immediately after the closing time for the receipt of bids, on the same date?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules sufficiently cover the maintenance of records of proceedings of bids openings and their availability for review?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3f",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are bids invited in sealed envelopes and are appropriate security measures in place for safe custody & controlled access to bids?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3g",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do electronic bidding processes exist? If yes, are the processes or systems highly secured with respect to access control. Does the system provides long term record-keeping and auditing functionality?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod3h",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "4. Evaluation and Award Criteria",
        "collapsible": false,
        "tableView": false,
        "key": "1RegulatoryFramework3",
        "type": "panel",
        "label": "4. Evaluation and Award Criteria",
        "input": false,
        "components": [
          {
            "label": "Does the regulatory framework prohibit the use of evaluation criterion(s) that is not prescribed in the bidding documents?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod4a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules stress upon devising an objective criteria in quantifiable terms?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod4b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules give adequate importance to the quality and regulate how price and quality are to be considered to achieve value for money?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod4c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules allow seeking clarifications which should not change the substance of bid, from the bidders for making an objective evaluation of the bids?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod4d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules require dissemination of evaluation results to public?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod4e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization have standard contract agreement(s) for goods, works and services?",
            "spellcheck": true,
            "tableView": true,
            "key": "textd4f",
            "type": "textfield",
            "input": true
          },
          {
            "label": "Does the contract agreement template(s) adequately cover the legal as well as regulatory framework?",
            "spellcheck": true,
            "tableView": true,
            "key": "textd4g",
            "type": "textfield",
            "input": true
          },
          {
            "label": "Are the conditions of contract generally consistent with internationally acceptable practices?",
            "spellcheck": true,
            "tableView": true,
            "key": "textd4h",
            "type": "textfield",
            "input": true
          }
        ]
      },
      {
        "title": "5. Complaints Management",
        "collapsible": false,
        "tableView": false,
        "key": "1RegulatoryFramework4",
        "type": "panel",
        "label": "5. Complaints Management",
        "input": false,
        "components": [
          {
            "label": "Do the organization’s rule acknowledge bidders’ right to lodge compliant/grievance?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod5a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is there a well-defined mechanism for handling of compliant by a body/committee that is independent of procurement committee and do that body/committee have an authority to grant remedies?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod5b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules provide chance of representation to a complainant?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod5c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules establish timeframes for issuance of decisions by the organization and the administrative review body?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod5d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do the rules require proper dissemination of the Complaint/Grievance Management mechanism for public awareness?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiod5e",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Qualification - Environment & Social Safeguards",
    "display": "form",
    "formIdentity": "qualification-ess",
    "smeRef": "quali-ess",
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "html": "<p>E. Environment &amp; Social Safeguards</p>",
        "label": "Content",
        "refreshOnChange": false,
        "tableView": false,
        "key": "content",
        "type": "content",
        "input": false
      },
      {
        "label": "Does the organization have a policy with regards to Environment and Social Safeguards?",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radioea",
        "type": "radio",
        "input": true
      },
      {
        "label": "Is Environment & Social Management (ESM) Policy approved by the Governing Board/Council//Body/ Management and communicated to all levels of staff and publically disclosed?",
        "optionsLabelPosition": "right",
        "inline": false,
        "tableView": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "shortcut": ""
          },
          {
            "label": "No",
            "value": "no",
            "shortcut": ""
          }
        ],
        "key": "radioeb",
        "type": "radio",
        "input": true
      },
      {
        "title": "Is the Environment & Social Management System (ESMS) being fully implemented and being used for:",
        "collapsible": false,
        "tableView": false,
        "key": "projectScreeningAndCategorization",
        "type": "panel",
        "label": "Is the Environment & Social Management System (ESMS) being fully implemented and being used for:",
        "input": false,
        "components": [
          {
            "label": " Project screening and categorization?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec1",
            "type": "radio",
            "input": true
          },
          {
            "label": "Assessment of impacts?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec2",
            "type": "radio",
            "input": true
          },
          {
            "label": "Development of measures to mitigate adverse environment and social impacts and enhancement of positive impacts?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec3",
            "type": "radio",
            "input": true
          },
          {
            "label": "Capacity development of staff",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec4",
            "type": "radio",
            "input": true
          },
          {
            "label": " Implementation of grievance redressal mechanism",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec5",
            "type": "radio",
            "input": true
          },
          {
            "label": "Monitoring of mitigation measures implementation",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radioec6",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  },
  {
    "name": "Qualification - Gender and Inclusion",
    "display": "form",
    "formIdentity": "qualification-gai",
    "smeRef": "quali-gia",
    "passScore": '120',
    "totalScore": '200',
    "page": 0,
    "refreshOn": "submit",
    "numPages": 2,
    "components": [
      {
        "html": "<p>F. Gender and Inclusion</p>",
        "label": "Content",
        "refreshOnChange": false,
        "tableView": false,
        "key": "content",
        "type": "content",
        "input": false
      },
      {
        "title": "1. Policies",
        "collapsible": false,
        "tableView": false,
        "key": "1Policies",
        "type": "panel",
        "label": "1. Policies",
        "input": false,
        "components": [
          {
            "label": "Does the organization have a gender policy or strategy?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is gender policy or strategy approved by the Governing Board/Council//Body/ Management and communicated to all levels of staff?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization have designated or dedicated staff to take gender agenda forward with well-defined role?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are gender and development training mandatory for all staff members?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization comply with the Protection against Harassment of Women at the Workplace Act?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1e",
            "type": "radio",
            "input": true
          },
          {
            "label": "Does the organization comply with the National Policy for Persons with Disabilities?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1f",
            "type": "radio",
            "input": true
          },
          {
            "label": "What is the percentage of women staff of the organization with respect to the total number of staff?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof1g",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "title": "2. Gender and Inclusive Programming",
        "collapsible": false,
        "tableView": false,
        "key": "1Policies1",
        "type": "panel",
        "label": "2. Gender and Inclusive Programming",
        "input": false,
        "components": [
          {
            "label": "Is gender disaggregated qualitative and quantitative data collected, analyzed and used? ",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof2a",
            "type": "radio",
            "input": true
          },
          {
            "label": "Is socio-economic and gender analysis2 conducted to assess differential needs of diverse women and men?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof2b",
            "type": "radio",
            "input": true
          },
          {
            "label": "Do projects respond to differential needs of diverse women and men identified during the socio-economic and gender analysis?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof2c",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are specific gender elements spelled out at activities, outputs, outcomes and impact levels? ",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof2d",
            "type": "radio",
            "input": true
          },
          {
            "label": "Are gender specific risk and mitigation strategies developed to avoid, minimize and/or mitigate adverse gender impacts?",
            "optionsLabelPosition": "right",
            "inline": false,
            "tableView": false,
            "values": [
              {
                "label": "Yes",
                "value": "yes",
                "shortcut": ""
              },
              {
                "label": "No",
                "value": "no",
                "shortcut": ""
              }
            ],
            "key": "radiof2e",
            "type": "radio",
            "input": true
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  }
]

export class SurveysState {
  surveys: {
    name: string,
    smeRef: string,
    passScore: string,
    totalScore: string,
    display: string,
    page: number,
    refreshOn: string,
    numPages: number,
    components: any
  }[] = SURVEYS;
}
