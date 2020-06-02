const PrimaryAppraisals = [
  // {
  //   "name": "Eligibility - Financial Management",
  //   "display": "form",
  //   "formIdentity": "primary-appraisal",
  //   "page": 0,
  //   "numPages": 2,
  //   "components": [
  //     {
  //       "label": "Financial Management Table",
  //       "cellAlignment": "left",
  //       "tableView": false,
  //       "key": "table",
  //       "type": "table",
  //       "numRows": 4,
  //       "input": false,
  //       "rows": [
  //         [
  //           {
  //             "components": [
  //               {
  //                 "label": "Table",
  //                 "cellAlignment": "left",
  //                 "tableView": false,
  //                 "key": "table1",
  //                 "type": "table",
  //                 "numRows": 2,
  //                 "numCols": 1,
  //                 "input": false,
  //                 "rows": [
  //                   [
  //                     {
  //                       "components": [
  //                         {
  //                           "html": "<p>Registered with Taxation Department</p>",
  //                           "label": "&nbsp;",
  //                           "refreshOnChange": false,
  //                           "tableView": false,
  //                           "key": "rwtd",
  //                           "type": "content",
  //                           "input": false
  //                         }
  //                       ]
  //                     }
  //                   ],
  //                   [
  //                     {
  //                       "components": [
  //                         {
  //                           "html": "<p>Exemption for Tax(es)</p>",
  //                           "label": "&nbsp;",
  //                           "refreshOnChange": false,
  //                           "tableView": false,
  //                           "key": "examptiontaxes",
  //                           "type": "content",
  //                           "input": false
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 ]
  //               }
  //             ]
  //           },
  //           {
  //             "components": [
  //               {
  //                 "label": "Table",
  //                 "cellAlignment": "left",
  //                 "tableView": false,
  //                 "key": "table2",
  //                 "type": "table",
  //                 "numRows": 2,
  //                 "numCols": 1,
  //                 "input": false,
  //                 "rows": [
  //                   [
  //                     {
  //                       "components": [
  //                         {
  //                           "label": "&nbsp;",
  //                           "widget": "choicesjs",
  //                           "tableView": true,
  //                           "data": {
  //                             "values": [
  //                               {
  //                                 "value": "yes",
  //                                 "label": "Yes"
  //                               },
  //                               {
  //                                 "label": "No",
  //                                 "value": "no"
  //                               }
  //                             ]
  //                           },
  //                           "selectThreshold": 0.3,
  //                           "key": "rwtd",
  //                           "type": "select",
  //                           "indexeddb": {
  //                             "filter": {}
  //                           },
  //                           "input": true
  //                         }
  //                       ]
  //                     }
  //                   ],
  //                   [
  //                     {
  //                       "components": [
  //                         {
  //                           "label": "&nbsp;",
  //                           "widget": "choicesjs",
  //                           "tableView": true,
  //                           "data": {
  //                             "values": [
  //                               {
  //                                 "value": "yes",
  //                                 "label": "Yes"
  //                               },
  //                               {
  //                                 "label": "No",
  //                                 "value": "no"
  //                               }
  //                             ]
  //                           },
  //                           "selectThreshold": 0.3,
  //                           "key": "examptiontaxes",
  //                           "type": "select",
  //                           "indexeddb": {
  //                             "filter": {}
  //                           },
  //                           "input": true
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 ]
  //               }
  //             ]
  //           },
  //           {
  //             "components": [
  //               {
  //                 "label": "Table",
  //                 "cellAlignment": "left",
  //                 "tableView": false,
  //                 "key": "table3",
  //                 "type": "table",
  //                 "numRows": 2,
  //                 "numCols": 1,
  //                 "input": false,
  //                 "rows": [
  //                   [
  //                     {
  //                       "components": [
  //                         {
  //                           "label": "NTN#",
  //                           "spellcheck": true,
  //                           "tableView": true,
  //                           "key": "rwtd-number",
  //                           "type": "textfield",
  //                           "input": true
  //                         }
  //                       ]
  //                     }
  //                   ],
  //                   [
  //                     {
  //                       "components": []
  //                     }
  //                   ]
  //                 ]
  //               }
  //             ]
  //           }
  //         ],
  //         [
  //           {
  //             "components": [
  //               {
  //                 "html": "<p>Last three (03) years audited financial statements</p>",
  //                 "label": "&nbsp;",
  //                 "refreshOnChange": false,
  //                 "tableView": false,
  //                 "key": "lastyearsfs",
  //                 "type": "content",
  //                 "input": false
  //               }
  //             ]
  //           },
  //           {
  //             "components": [
  //               {
  //                 "label": "&nbsp;",
  //                 "widget": "choicesjs",
  //                 "tableView": true,
  //                 "data": {
  //                   "values": [
  //                     {
  //                       "value": "yes",
  //                       "label": "Yes"
  //                     },
  //                     {
  //                       "label": "No",
  //                       "value": "no"
  //                     }
  //                   ]
  //                 },
  //                 "selectThreshold": 0.3,
  //                 "key": "lastyearsfs",
  //                 "type": "select",
  //                 "indexeddb": {
  //                   "filter": {}
  //                 },
  //                 "input": true
  //               }
  //             ]
  //           },
  //           {
  //             "components": []
  //           }
  //         ],
  //         [
  //           {
  //             "components": [
  //               {
  //                 "html": "<p>Audit was carried out by a Chartered Accountancy Firm from State Bank of&nbsp;</p><p>Pakistan’s Panel of Auditors under Category ‘A’ and having ‘Satisfactory’&nbsp;</p><p>rating under the Quality Control Review Programme managed by the Institute&nbsp;</p><p>of Chartered Accountants of Pakistan.</p>",
  //                 "label": "&nbsp;",
  //                 "refreshOnChange": false,
  //                 "tableView": false,
  //                 "key": "didaudit",
  //                 "type": "content",
  //                 "input": false
  //               }
  //             ]
  //           },
  //           {
  //             "components": [
  //               {
  //                 "label": "&nbsp;",
  //                 "widget": "choicesjs",
  //                 "tableView": true,
  //                 "data": {
  //                   "values": [
  //                     {
  //                       "value": "yes",
  //                       "label": "Yes"
  //                     },
  //                     {
  //                       "label": "No",
  //                       "value": "no"
  //                     }
  //                   ]
  //                 },
  //                 "selectThreshold": 0.3,
  //                 "key": "didaudit",
  //                 "type": "select",
  //                 "indexeddb": {
  //                   "filter": {}
  //                 },
  //                 "input": true
  //               }
  //             ]
  //           },
  //           {
  //             "components": []
  //           }
  //         ],
  //         [
  //           {
  //             "components": [
  //               {
  //                 "html": "<p>Commitment of availability of counterpart financing i.e. 30% (in cash) for the proposed project</p>",
  //                 "label": "&nbsp;",
  //                 "refreshOnChange": false,
  //                 "tableView": false,
  //                 "key": "counterpartfinance",
  //                 "type": "content",
  //                 "input": false
  //               }
  //             ]
  //           },
  //           {
  //             "components": [
  //               {
  //                 "label": "&nbsp;",
  //                 "widget": "choicesjs",
  //                 "tableView": true,
  //                 "data": {
  //                   "values": [
  //                     {
  //                       "value": "yes",
  //                       "label": "Yes"
  //                     },
  //                     {
  //                       "label": "No",
  //                       "value": "no"
  //                     }
  //                   ]
  //                 },
  //                 "selectThreshold": 0.3,
  //                 "key": "counterpartfinance",
  //                 "type": "select",
  //                 "indexeddb": {
  //                   "filter": {}
  //                 },
  //                 "input": true
  //               }
  //             ]
  //           },
  //           {
  //             "components": []
  //           }
  //         ]
  //       ]
  //     },
  //     {
  //       "type": "button",
  //       "label": "Submit",
  //       "key": "submit",
  //       "disableOnInvalid": true,
  //       "input": true,
  //       "tableView": false
  //     }
  //   ]
  // },
]

export class PrimaryAppraisalFormsState {
  selectedProject: {
    initiatedBy: any,
    owner: any,
    preAppraisal: any,
    extendedAppraisal: any,
    commentsMatrix: any,
    processOwner: any,
    reassignmentTask: any,
    sections: any,
    status: any,
    subStatus: any,
    submittedAt: any,
    id: any,
  } = null;
}

