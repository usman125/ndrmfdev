!function(){function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var a=0;a<n.length;a++){var e=n[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{c3AT:function(a,e,l){"use strict";l.d(e,"a",function(){return i});var o=l("82od"),c=l("IheW"),u=l("8Y7J"),i=function(){var a=function(){function a(n){t(this,a),this._httpClient=n}var e,l,u;return e=a,(l=[{key:"getAllProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getPoProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getDmPamProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=PRELIMINARY_APPRAISAL"))}},{key:"getGmProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getGiaProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=GIA"))}},{key:"getCeoProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getExtAppraisalProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=EXTENDED_APPRAISAL"))}},{key:"commenceNewProjects",value:function(t){return console.log("----FINAL API OBJECT:----",{name:t.name,thematicAreaId:t.thematicAreaId,type:t.type,jvUserID:null!==t.jvUser?t.jvUser.id:null}),this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/commence/"),{name:t.name,thematicAreaId:t.thematicAreaId,type:t.type,jvUserID:null!==t.jvUser?t.jvUser.id:null})}},{key:"getSingleProject",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/").concat(t))}},{key:"addProjectRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/section/add?action=SAVE"),t)}},{key:"updateProjectRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/section/add?action=SUBMIT"),t)}},{key:"getPreAppraisalRequests",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/pre-appraisal"))}},{key:"createPreAppraisalRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/pre-appraisal/commence"),n)}},{key:"submitPreAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/pre-appraisal/submit"),n)}},{key:"createExtAppraisalRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/ext-appraisal/commence"),n)}},{key:"submitExtAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/section/submit"),n)}},{key:"assignExtAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/section/assign"),n)}},{key:"extendedAppraisalDecisionByDm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/decisionbydm"),null)}},{key:"assignProposalSectionTasks",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/section/").concat(t,"/task/add"),n)}},{key:"submitProposalSectionReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/section/").concat(t,"/review/add"),n)}},{key:"submitProposalGeneralReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/comment/add"),n)}},{key:"markToGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=MARKED_TO_GM&subStatus=PENDING"),null)}},{key:"markToCeo",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=MARKED_TO_CEO&subStatus=PENDING"),null)}},{key:"setProjectStage",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=").concat(n,"&subStatus=PENDING"),null)}},{key:"approvePreApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=APPROVED&subStatus=PENDING"),null)}},{key:"disapprovePreApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=REJECTED&subStatus=PENDING"),null)}},{key:"approveExtApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=APPROVED&subStatus=PENDING"),null)}},{key:"disapproveExtApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=REJECTED&subStatus=PENDING"),null)}},{key:"getCostingHeads",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/setting/cost-head"))}},{key:"addCostingHeads",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/setting/cost-head/add"),t)}},{key:"submitPip",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/pip/submit"),t)}},{key:"submitGia",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia/submit"),n)}},{key:"submitGiaReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia/review/add"),n)}},{key:"submitGiaChecklist",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia-checklist/submit"),n)}},{key:"appriveGia",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia?status=APPROVED&checklist-deadline=").concat(n),null)}},{key:"uploadFiles",value:function(t,n,a){var e="".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/attachment/add?stage=").concat(n),l=new c.h;return l.append("Content-Type","multipart/form-data;"),this._httpClient.post(e,a,{headers:l})}},{key:"commenceSubProjectDoc",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/").concat(t,"/sub-proj-doc/commence"),n)}},{key:"getSubProjectDoc",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc"))}},{key:"getPendingSubProjectDoc",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/pending"))}},{key:"singleSubProjectDoc",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t))}},{key:"submitSubProjectDocSection",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/section/submit"),n)}},{key:"requestSubProjectDocReview",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/section/").concat(t,"/request-review"),null)}},{key:"submitSubProjectDocReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/section/").concat(t,"/review/add"),n)}},{key:"commenceQPR",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/qpr/commence/?proposalId=").concat(t),n)}},{key:"reassignProposalToFIP",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/reassign"),n)}},{key:"getProposalAttachments",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/allAttachments"))}},{key:"downloadAttachments",value:function(t,n){var a=new c.h;return a.append("Content-Type","multipart/form-data;"),a.append("responseType","blob"),this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/attachment/download/?fileName=").concat(t,"&filePath=").concat(n),{headers:a})}},{key:"updateProposalOfferLetterStatus",value:function(t,n,a,e){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=").concat(n,"&subStatus=").concat(a),e)}},{key:"getOfferLetter",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/offerLetter/").concat(t))}},{key:"commenceGrantDisbursment",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/grant-disbursement/commence/").concat(t),{body:null,amount:null})}},{key:"addSubProjectDmPamTasks",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/assign/dmpam/tasks"),n)}},{key:"getSubProjectDmPamTasks",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/dmpam/tasks"))}},{key:"getSubProjectTasks",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/user/tasks"))}},{key:"assignUsersForReviewsByDmpam",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/dmpam/assign/reviews"),n)}},{key:"submitSubProjectDocumentGeneralReview",value:function(t,n,a){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/comment/add/").concat(n),a)}},{key:"reassignSubProjectDocToFIP",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/reassign"),n)}},{key:"changeSubProjectDocDmPamTaskStatus",value:function(t,n,a){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/change-dmpam-task/").concat(t,"/status?status=").concat(n),a)}},{key:"changeSubProjectDocStatus",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/change/").concat(t,"/status?status=").concat(n),null)}},{key:"commenceProjectClosure",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/project-closure/commence"),t)}},{key:"markProjectClosureToCeo",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/mark-to-ceo"),null)}},{key:"projectClosureCeoApproval",value:function(t,n,a){return this._httpClient.put("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/ceo/approval?status=").concat(n),a)}},{key:"commenceTpv",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/tpv/commence"),t)}},{key:"submitProjectClosureTask",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/submit"),n)}},{key:"getProjectClosureByProposalId",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/"))}},{key:"getTpvRequestsByProposalId",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/tpv/").concat(t,"/"))}},{key:"submitTpvTask",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/tpv/").concat(t,"/submit"),n)}}])&&n(e.prototype,l),u&&n(e,u),a}();return a.\u0275prov=u.bc({factory:function(){return new a(u.cc(c.c))},token:a,providedIn:"root"}),a}()},sA1n:function(n,a,e){"use strict";e.r(a),e.d(a,"ViewGiaChecklistModuleNgFactory",function(){return H});var l=e("8Y7J"),o=function n(){t(this,n)},c=e("pMnS"),u=e("Yi/Q"),i=e("S8Yu"),r=e("rJcy"),p=e("3CKi"),s=e("SVse"),m=e("oBbD"),b=e("pu8Q"),h=e("SCoL"),d=e("omvX"),f=e("2mes"),v=e("l0rg"),y=e("1Xc+"),g=e("Dxy4"),j=e("YEUz"),k=e("XE/z"),C=e("Tj54"),_=e("YHaq"),P=e("PDjf"),U=e("cwtM"),w=e("iInd"),N=e("6nr9"),A=e("c3AT"),I=e("DbSg"),S=l.xb({encapsulation:0,styles:[[""]],data:{}});function D(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,1,"formio",[],null,[[null,"submit"]],function(t,n,a){var e=!0;return"submit"===n&&(e=!1!==t.component.onSubmit(a)&&e),e},u.c,u.b)),l.yb(1,770048,null,0,i.a,[l.B,[2,r.a],[2,p.a]],{form:[0,"form"]},{submit:"submit"})],function(t,n){t(n,1,0,n.component.selectedRequestTemplate)},null)}function R(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,2,"formio",[["readOnly","true"]],null,[[null,"submit"]],function(t,n,a){var e=!0;return"submit"===n&&(e=!1!==t.component.onSubmit(a)&&e),e},u.c,u.b)),l.yb(1,770048,null,0,i.a,[l.B,[2,r.a],[2,p.a]],{form:[0,"form"],submission:[1,"submission"],readOnly:[2,"readOnly"]},{submit:"submit"}),l.Qb(2,{data:0})],function(t,n){var a=n.component,e=a.selectedRequestTemplate,l=t(n,2,0,a.selectedProject.giaChecklist.data);t(n,1,0,e,l,"true")},null)}function E(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,2,"div",[],null,null,null,null,null)),(t()(),l.zb(1,0,null,null,1,"span",[["id","answer"]],null,null,null,null,null)),(t()(),l.Xb(-1,null,["No entry selected"]))],null,null)}function T(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,6,"div",[],null,null,null,null,null)),(t()(),l.ib(16777216,null,null,1,null,D)),l.yb(2,16384,null,0,s.o,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(t()(),l.ib(16777216,null,null,1,null,R)),l.yb(4,16384,null,0,s.o,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(t()(),l.ib(16777216,null,null,1,null,E)),l.yb(6,16384,null,0,s.o,[l.R,l.O],{ngIf:[0,"ngIf"]},null)],function(t,n){var a=n.component;t(n,2,0,null===(null==a.selectedProject||null==a.selectedProject.giaChecklist?null:a.selectedProject.giaChecklist.data)),t(n,4,0,null!==(null==a.selectedProject||null==a.selectedProject.giaChecklist?null:a.selectedProject.giaChecklist.data)),t(n,6,0,null===a.selectedRequestTemplate)},null)}function L(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,2,"div",[],null,null,null,null,null)),(t()(),l.zb(1,0,null,null,1,"mat-progress-spinner",[["class","mat-progress-spinner"],["diameter","35"],["mode","indeterminate"],["role","progressbar"]],[[2,"_mat-animation-noopable",null],[4,"width","px"],[4,"height","px"],[1,"aria-valuemin",0],[1,"aria-valuemax",0],[1,"aria-valuenow",0],[1,"mode",0]],null,null,m.c,m.a)),l.yb(2,114688,null,0,b.b,[l.l,h.a,[2,s.d],[2,d.a],b.a],{diameter:[0,"diameter"],mode:[1,"mode"]},null)],function(t,n){t(n,2,0,"35","indeterminate")},function(t,n){t(n,1,0,l.Nb(n,2)._noopAnimations,l.Nb(n,2).diameter,l.Nb(n,2).diameter,"determinate"===l.Nb(n,2).mode?0:null,"determinate"===l.Nb(n,2).mode?100:null,"determinate"===l.Nb(n,2).mode?l.Nb(n,2).value:null,l.Nb(n,2).mode)})}function G(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,13,"mat-toolbar",[["class","mat-elevation-z8 mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,f.b,f.a)),l.yb(1,4243456,null,1,v.a,[l.l,h.a,s.d],{color:[0,"color"]},null),l.Tb(603979776,1,{_toolbarRows:1}),(t()(),l.zb(3,0,null,1,10,"mat-toolbar-row",[["class","mat-toolbar-row"]],null,null,null,null,null)),l.yb(4,16384,[[1,4]],0,v.c,[],null,null),(t()(),l.zb(5,0,null,null,1,"span",[],null,null,null,null,null)),(t()(),l.Xb(-1,null,["Fill(ed) GIA Checklist"])),(t()(),l.zb(7,0,null,null,0,"span",[["class","example-spacer"]],null,null,null,null,null)),(t()(),l.zb(8,0,null,null,5,"button",[["class","mat-focus-indicator"],["color","primary"],["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null],[2,"mat-button-disabled",null]],[[null,"click"]],function(t,n,a){var e=!0;return"click"===n&&(e=!1!==t.component.goBack()&&e),e},y.d,y.b)),l.yb(9,4374528,null,0,g.b,[l.l,j.h,[2,d.a]],{color:[0,"color"]},null),(t()(),l.zb(10,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[1,"data-mat-icon-type",0],[1,"data-mat-icon-name",0],[1,"data-mat-icon-namespace",0],[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,k.b,k.a)),l.yb(11,8634368,null,0,C.b,[l.l,C.d,[8,null],C.a,l.n],null,null),(t()(),l.Xb(-1,0,["arrow_back"])),(t()(),l.Xb(-1,0,[" Back "])),(t()(),l.zb(14,0,null,null,7,"mat-card",[["class","m-20 mat-card mat-focus-indicator"]],[[2,"_mat-animation-noopable",null]],null,null,_.d,_.a)),l.yb(15,49152,null,0,P.a,[[2,d.a]],null,null),(t()(),l.zb(16,0,null,0,5,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),l.yb(17,16384,null,0,P.c,[],null,null),(t()(),l.ib(16777216,null,null,1,null,T)),l.yb(19,16384,null,0,s.o,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(t()(),l.ib(16777216,null,null,1,null,L)),l.yb(21,16384,null,0,s.o,[l.R,l.O],{ngIf:[0,"ngIf"]},null)],function(t,n){var a=n.component;t(n,1,0,"primary"),t(n,9,0,"primary"),t(n,11,0),t(n,19,0,!a.apiLoading),t(n,21,0,a.apiLoading)},function(t,n){t(n,0,0,l.Nb(n,1)._toolbarRows.length>0,0===l.Nb(n,1)._toolbarRows.length),t(n,8,0,l.Nb(n,9).disabled||null,"NoopAnimations"===l.Nb(n,9)._animationMode,l.Nb(n,9).disabled),t(n,10,0,l.Nb(n,11)._usingFontIcon()?"font":"svg",l.Nb(n,11)._svgName||l.Nb(n,11).fontIcon,l.Nb(n,11)._svgNamespace||l.Nb(n,11).fontSet,l.Nb(n,11).inline,"primary"!==l.Nb(n,11).color&&"accent"!==l.Nb(n,11).color&&"warn"!==l.Nb(n,11).color),t(n,14,0,"NoopAnimations"===l.Nb(n,15)._animationMode)})}var z=l.vb("app-gia-checklist",U.a,function(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,1,"app-gia-checklist",[],null,null,null,G,S)),l.yb(1,245760,null,0,U.a,[w.a,N.a,A.a,s.k,I.a],null,null)],function(t,n){t(n,1,0)},null)},{},{},[]),x=e("Onhn"),O=l.xb({encapsulation:0,styles:[[""]],data:{}});function B(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,1,"app-gia-checklist",[],null,null,null,G,S)),l.yb(1,245760,null,0,U.a,[w.a,N.a,A.a,s.k,I.a],null,null)],function(t,n){t(n,1,0)},null)}var q=l.vb("app-view-gia-checklist",x.a,function(t){return l.ac(0,[(t()(),l.zb(0,0,null,null,1,"app-view-gia-checklist",[],null,null,null,B,O)),l.yb(1,114688,null,0,x.a,[w.a,A.a,I.a],null,null)],function(t,n){t(n,1,0)},null)},{},{},[]),M=e("rxJI"),J=e("KzPs");e("WBWl");var F=function n(){t(this,n)},X=function n(){t(this,n)},Y=e("9gLZ"),V=e("UhP/"),K=e("ikog"),Q=function n(){t(this,n)},H=l.wb(o,[],function(t){return l.Kb([l.Lb(512,l.j,l.ab,[[8,[c.a,q,z,u.a,M.a]],[3,l.j],l.z]),l.Lb(4608,s.q,s.p,[l.w]),l.Lb(4608,J.a,J.a,[]),l.Lb(4608,p.a,p.a,[]),l.Lb(1073742336,s.c,s.c,[]),l.Lb(1073742336,w.r,w.r,[[2,w.w],[2,w.n]]),l.Lb(1073742336,F,F,[]),l.Lb(1073742336,X,X,[]),l.Lb(1073742336,Y.a,Y.a,[]),l.Lb(1073742336,V.m,V.m,[j.j,[2,V.e],[2,s.d]]),l.Lb(1073742336,P.f,P.f,[]),l.Lb(1073742336,h.b,h.b,[]),l.Lb(1073742336,V.w,V.w,[]),l.Lb(1073742336,g.c,g.c,[]),l.Lb(1073742336,v.b,v.b,[]),l.Lb(1073742336,b.c,b.c,[]),l.Lb(1073742336,C.c,C.c,[]),l.Lb(1073742336,K.a,K.a,[]),l.Lb(1073742336,Q,Q,[]),l.Lb(1073742336,o,o,[]),l.Lb(1024,w.l,function(){return[[{path:"",component:x.a}],[{path:"",component:U.a}]]},[])])})}}])}();