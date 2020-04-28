const ExtendedAppraisalForms = [
  {
    "name": 'Eligibility - Registration',
    "display": "form",
    "smeRef":"extended-reg",
    "formIdentity": "extended-appraisal",
    "page": 0,
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
    "smeRef":"extended-fm",
    "formIdentity": "extended-appraisal",
    "page": 0,
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
]

export class ExtendedAppraisalFormsState {
  extendedAppraisalForms: {
    name: string,
    display: string,
    smeRef: string,
    formIdentity: string,
    page: number,
    numPages: number,
    components: any
  }[] = ExtendedAppraisalForms;
}
