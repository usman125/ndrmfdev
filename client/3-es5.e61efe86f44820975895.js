!function(){function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var l=0;l<n.length;l++){var e=n[l];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function l(t,l,e){return l&&n(t.prototype,l),e&&n(t,e),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"+A7Z":function(n,e,a){"use strict";a.d(e,"a",function(){return c});var o=a("IzEk"),i=a("lJxs"),r=a("WBWl"),c=function(){function n(l){t(this,n),this.dialog=l}return l(n,[{key:"open",value:function(t){this.dialogRef=this.dialog.open(r.f,{data:{title:t.title,message:t.message,cancelText:t.cancelText,confirmText:t.confirmText}})}},{key:"confirmed",value:function(){return this.dialogRef.afterClosed().pipe(Object(o.a)(1),Object(i.a)(function(t){return t}))}}]),n}()},"8Pdy":function(t,n,l){"use strict";l.d(n,"a",function(){return a}),l.d(n,"c",function(){return o}),l.d(n,"b",function(){return i}),l.d(n,"d",function(){return r});var e=l("8Y7J"),a=(l("40+f"),l("9gLZ"),l("UhP/"),l("YEUz"),l("SVse"),e.xb({encapsulation:2,styles:[".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}\n"],data:{}}));function o(t){return e.ac(2,[(t()(),e.zb(0,0,null,null,1,"div",[],null,null,null,null,null)),e.Mb(null,0)],null,null)}var i=e.xb({encapsulation:2,styles:[".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}\n"],data:{}});function r(t){return e.ac(2,[(t()(),e.zb(0,0,null,null,1,"figure",[["class","mat-figure"]],null,null,null,null,null)),e.Mb(null,0)],null,null)}},NihL:function(n,l,e){"use strict";e.d(l,"a",function(){return a}),e("WBWl");var a=function n(){t(this,n)}},c3AT:function(n,e,a){"use strict";a.d(e,"a",function(){return c});var o=a("82od"),i=a("IheW"),r=a("8Y7J"),c=function(){var n=function(){function n(l){t(this,n),this._httpClient=l}return l(n,[{key:"getAllProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getPoProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getDmPamProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=PRELIMINARY_APPRAISAL"))}},{key:"getGmProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getGiaProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=GIA"))}},{key:"getCeoProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/"))}},{key:"getExtAppraisalProjects",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/?status=EXTENDED_APPRAISAL"))}},{key:"commenceNewProjects",value:function(t){return console.log("----FINAL API OBJECT:----",{name:t.name,thematicAreaId:t.thematicAreaId,type:t.type,jvUserID:null!==t.jvUser?t.jvUser.id:null}),this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/commence/"),{name:t.name,thematicAreaId:t.thematicAreaId,type:t.type,jvUserID:null!==t.jvUser?t.jvUser.id:null})}},{key:"getSingleProject",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/").concat(t))}},{key:"addProjectRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/section/add?action=SAVE"),t)}},{key:"updateProjectRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/section/add?action=SUBMIT"),t)}},{key:"getPreAppraisalRequests",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/pre-appraisal"))}},{key:"createPreAppraisalRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/pre-appraisal/commence"),n)}},{key:"submitPreAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/pre-appraisal/submit"),n)}},{key:"createExtAppraisalRequest",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/ext-appraisal/commence"),n)}},{key:"submitExtAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/section/submit"),n)}},{key:"assignExtAppraisal",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/section/assign"),n)}},{key:"extendedAppraisalDecisionByDm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/ext-appraisal/").concat(t,"/decisionbydm"),null)}},{key:"assignProposalSectionTasks",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/section/").concat(t,"/task/add"),n)}},{key:"submitProposalSectionReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/section/").concat(t,"/review/add"),n)}},{key:"submitProposalGeneralReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/comment/add"),n)}},{key:"markToGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=MARKED_TO_GM&subStatus=PENDING"),null)}},{key:"markToCeo",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=MARKED_TO_CEO&subStatus=PENDING"),null)}},{key:"setProjectStage",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=").concat(n,"&subStatus=PENDING"),null)}},{key:"approvePreApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=APPROVED&subStatus=PENDING"),null)}},{key:"disapprovePreApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=REJECTED&subStatus=PENDING"),null)}},{key:"approveExtApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=APPROVED&subStatus=PENDING"),null)}},{key:"disapproveExtApparisalByGm",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=REJECTED&subStatus=PENDING"),null)}},{key:"getCostingHeads",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/setting/cost-head"))}},{key:"addCostingHeads",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/setting/cost-head/add"),t)}},{key:"submitPip",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(n,"/pip/submit"),t)}},{key:"submitGia",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia/submit"),n)}},{key:"submitGiaReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia/review/add"),n)}},{key:"submitGiaChecklist",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia-checklist/submit"),n)}},{key:"appriveGia",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/gia?status=APPROVED&checklist-deadline=").concat(n),null)}},{key:"uploadFiles",value:function(t,n,l){var e="".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/attachment/add?stage=").concat(n),a=new i.h;return a.append("Content-Type","multipart/form-data;"),this._httpClient.post(e,l,{headers:a})}},{key:"commenceSubProjectDoc",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/").concat(t,"/sub-proj-doc/commence"),n)}},{key:"getSubProjectDoc",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc"))}},{key:"getPendingSubProjectDoc",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/pending"))}},{key:"singleSubProjectDoc",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t))}},{key:"submitSubProjectDocSection",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/section/submit"),n)}},{key:"requestSubProjectDocReview",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/section/").concat(t,"/request-review"),null)}},{key:"submitSubProjectDocReview",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/section/").concat(t,"/review/add"),n)}},{key:"commenceQPR",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/qpr/commence/?proposalId=").concat(t),n)}},{key:"reassignProposalToFIP",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/reassign"),n)}},{key:"getProposalAttachments",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"/allAttachments"))}},{key:"downloadAttachments",value:function(t,n){var l=new i.h;return l.append("Content-Type","multipart/form-data;"),l.append("responseType","blob"),this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/attachment/download/?fileName=").concat(t,"&filePath=").concat(n),{headers:l})}},{key:"updateProposalOfferLetterStatus",value:function(t,n,l,e){return this._httpClient.put("".concat(o.a.apiUrl,"/project-proposal/").concat(t,"?status=").concat(n,"&subStatus=").concat(l),e)}},{key:"getOfferLetter",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-proposal/offerLetter/").concat(t))}},{key:"commenceGrantDisbursment",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/grant-disbursement/commence/").concat(t),{body:null,amount:null})}},{key:"addSubProjectDmPamTasks",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/assign/dmpam/tasks"),n)}},{key:"getSubProjectDmPamTasks",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/dmpam/tasks"))}},{key:"getSubProjectTasks",value:function(){return this._httpClient.get("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/user/tasks"))}},{key:"assignUsersForReviewsByDmpam",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/dmpam/assign/reviews"),n)}},{key:"submitSubProjectDocumentGeneralReview",value:function(t,n,l){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/comment/add/").concat(n),l)}},{key:"reassignSubProjectDocToFIP",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/").concat(t,"/reassign"),n)}},{key:"changeSubProjectDocDmPamTaskStatus",value:function(t,n,l){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/change-dmpam-task/").concat(t,"/status?status=").concat(n),l)}},{key:"changeSubProjectDocStatus",value:function(t,n){return this._httpClient.put("".concat(o.a.apiUrl,"/implementation/sub-proj-doc/change/").concat(t,"/status?status=").concat(n),null)}},{key:"commenceProjectClosure",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/project-closure/commence"),t)}},{key:"markProjectClosureToCeo",value:function(t){return this._httpClient.put("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/mark-to-ceo"),null)}},{key:"projectClosureCeoApproval",value:function(t,n,l){return this._httpClient.put("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/ceo/approval?status=").concat(n),l)}},{key:"commenceTpv",value:function(t){return this._httpClient.post("".concat(o.a.apiUrl,"/tpv/commence"),t)}},{key:"submitProjectClosureTask",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/submit"),n)}},{key:"getProjectClosureByProposalId",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/project-closure/").concat(t,"/"))}},{key:"getTpvRequestsByProposalId",value:function(t){return this._httpClient.get("".concat(o.a.apiUrl,"/tpv/").concat(t,"/"))}},{key:"submitTpvTask",value:function(t,n){return this._httpClient.post("".concat(o.a.apiUrl,"/tpv/").concat(t,"/submit"),n)}}]),n}();return n.\u0275prov=r.bc({factory:function(){return new n(r.cc(i.c))},token:n,providedIn:"root"}),n}()},l1Fo:function(n,l,e){"use strict";e.d(l,"a",function(){return a});var a=function n(){t(this,n)}},xkOM:function(t,n,l){"use strict";l.d(n,"b",function(){return D}),l.d(n,"c",function(){return O}),l.d(n,"a",function(){return M});var e=l("8Y7J"),a=l("1Xc+"),o=l("Dxy4"),i=l("YEUz"),r=l("omvX"),c=l("XE/z"),u=l("Tj54"),s=l("8Pdy"),p=l("SVse"),d=l("40+f"),m=l("ZFy/"),b=l("1O3W"),g=l("7KAL"),h=l("SCoL"),f=l("9gLZ"),v=l("2Y4n"),y=l("2mes"),_=l("l0rg"),C=l("H3DK"),j=l("Q2Ze"),k=l("UhP/"),P=l("s7LF"),x=l("e6WT"),N=l("8sFK"),w=l("+A7Z"),U=l("iELJ"),S=l("bmmJ"),T=l("6bE9"),A=l("U3bh"),E=l("c3AT"),z=l("iInd"),D=e.xb({encapsulation:0,styles:[[".content[_ngcontent-%COMP%]{height:72px;justify-content:flex-start}.content[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]{align-items:flex-start;display:flex;flex-direction:column}.info[_ngcontent-%COMP%]{justify-content:space-between}.example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.mat-grid-tile[_ngcontent-%COMP%]{display:block;float:left;height:176px!important;left:unset!important;margin-bottom:6px!important;overflow:visible;padding-bottom:0;position:relative;top:unset!important;width:187px!important}.bottom-content[_ngcontent-%COMP%]{align-items:flex-start;display:flex;flex-direction:column;font-size:13px;font-weight:600;height:80px;justify-content:flex-end}.bottom-content[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:40px}.inner-content[_ngcontent-%COMP%]{background:#fff;border:1px solid transparent;border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.15);height:100%;padding:15px;padding-bottom:0!important;width:100%}.searchField[_ngcontent-%COMP%]{margin:0 auto;width:85%}.content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#666;font-size:13px;font-style:italic}.inner-content[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font-size:13px;font-weight:500}.new-tile[_ngcontent-%COMP%]   .inner-content.mat-elevation-z8[_ngcontent-%COMP%]{box-shadow:0 0 0 1px rgb(30 130 76)}"]],data:{}});function I(t){return e.ac(0,[(t()(),e.zb(0,0,null,null,5,"button",[["class","mat-focus-indicator"],["color","primary"],["mat-raised-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null],[2,"mat-button-disabled",null]],[[null,"click"]],function(t,n,l){var e=!0;return"click"===n&&(e=!1!==t.component.addNewProject()&&e),e},a.d,a.b)),e.yb(1,4374528,null,0,o.b,[e.l,i.h,[2,r.a]],{color:[0,"color"]},null),(t()(),e.zb(2,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[1,"data-mat-icon-type",0],[1,"data-mat-icon-name",0],[1,"data-mat-icon-namespace",0],[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,c.b,c.a)),e.yb(3,8634368,null,0,u.b,[e.l,u.d,[8,null],u.a,e.n],null,null),(t()(),e.Xb(-1,0,["add"])),(t()(),e.Xb(-1,0,[" PROJECT "]))],function(t,n){t(n,1,0,"primary"),t(n,3,0)},function(t,n){t(n,0,0,e.Nb(n,1).disabled||null,"NoopAnimations"===e.Nb(n,1)._animationMode,e.Nb(n,1).disabled),t(n,2,0,e.Nb(n,3)._usingFontIcon()?"font":"svg",e.Nb(n,3)._svgName||e.Nb(n,3).fontIcon,e.Nb(n,3)._svgNamespace||e.Nb(n,3).fontSet,e.Nb(n,3).inline,"primary"!==e.Nb(n,3).color&&"accent"!==e.Nb(n,3).color&&"warn"!==e.Nb(n,3).color)})}function R(t){return e.ac(0,[(t()(),e.zb(0,16777216,null,null,20,"mat-grid-tile",[["class","own-tiles mat-grid-tile mat-tooltip-trigger"],["colspan","1"],["rowspan","2"]],[[1,"rowspan",0],[1,"colspan",0]],null,null,s.d,s.b)),e.yb(1,278528,null,0,p.m,[e.u,e.v,e.l,e.G],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Qb(2,{"new-tile":0}),e.yb(3,49152,[[2,4]],0,d.c,[e.l,[2,d.e]],{rowspan:[0,"rowspan"],colspan:[1,"colspan"]},null),e.yb(4,4341760,null,0,m.d,[b.c,e.l,g.c,e.R,e.B,h.a,i.c,i.h,m.b,[2,f.b],[2,m.a]],{message:[0,"message"]},null),(t()(),e.zb(5,0,null,0,15,"div",[["class","inner-content mat-elevation-z8"]],null,[[null,"click"]],function(t,n,l){var e=!0;return"click"===n&&(e=!1!==t.component.goToDetails(t.context.$implicit)&&e),e},null,null)),(t()(),e.zb(6,0,null,null,9,"div",[["class","content"]],null,null,null,null,null)),(t()(),e.zb(7,0,null,null,2,"h6",[],null,null,null,null,null)),(t()(),e.Xb(8,null,["",""])),e.Rb(9,1),(t()(),e.zb(10,0,null,null,2,"span",[["id","comment"]],null,null,null,null,null)),(t()(),e.Xb(11,null,["",""])),e.Rb(12,1),(t()(),e.zb(13,0,null,null,2,"span",[],null,null,null,null,null)),(t()(),e.Xb(14,null,["",""])),e.Rb(15,1),(t()(),e.zb(16,0,null,null,4,"div",[["class","bottom-content"]],null,null,null,null,null)),(t()(),e.zb(17,0,null,null,1,"span",[["class","mb-1"],["id","answer"]],null,null,null,null,null)),(t()(),e.Xb(18,null,[" - ",""])),(t()(),e.zb(19,0,null,null,1,"span",[["class","mb-1"],["id","comment"]],null,null,null,null,null)),(t()(),e.Xb(20,null,["",""])),(t()(),e.ib(0,null,null,0))],function(t,n){var l=t(n,2,0,n.context.$implicit.newEntry);t(n,1,0,"own-tiles",l),t(n,3,0,"2","1"),t(n,4,0,n.context.$implicit.newEntry?"New Project":"")},function(t,n){t(n,0,0,e.Nb(n,3).rowspan,e.Nb(n,3).colspan);var l=e.Yb(n,8,0,t(n,9,0,e.Nb(n.parent,1),null==n.context.$implicit?null:n.context.$implicit.name));t(n,8,0,l);var a=e.Yb(n,11,0,t(n,12,0,e.Nb(n.parent,1),null==n.context.$implicit?null:n.context.$implicit.initiatorFullName));t(n,11,0,a);var o=e.Yb(n,14,0,t(n,15,0,e.Nb(n.parent,1),null==n.context.$implicit?null:n.context.$implicit.thematicAreaName));t(n,14,0,o),t(n,18,0,n.context.$implicit.status),t(n,20,0,n.context.$implicit.subStatus)})}function O(t){return e.ac(0,[e.Pb(0,v.a,[]),e.Pb(0,p.y,[]),(t()(),e.zb(2,0,null,null,44,null,null,null,null,null,null,null)),(t()(),e.zb(3,0,null,null,9,"mat-toolbar",[["class","mat-toolbar"],["color","primary"],["style","margin-top:0px;padding: 15px 0px;"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,y.b,y.a)),e.yb(4,4243456,null,1,_.a,[e.l,h.a,p.d],{color:[0,"color"]},null),e.Tb(603979776,1,{_toolbarRows:1}),(t()(),e.zb(6,0,null,1,6,"mat-toolbar-row",[["class","mat-toolbar-row"]],null,null,null,null,null)),e.yb(7,16384,[[1,4]],0,_.c,[],null,null),(t()(),e.zb(8,0,null,null,1,"span",[],null,null,null,null,null)),(t()(),e.Xb(-1,null,["Projects"])),(t()(),e.zb(10,0,null,null,0,"span",[["class","example-spacer"]],null,null,null,null,null)),(t()(),e.ib(16777216,null,null,1,null,I)),e.yb(12,16384,null,0,p.o,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(t()(),e.zb(13,0,null,null,33,"div",[["class","m-20 custom-card"]],null,null,null,null,null)),(t()(),e.zb(14,0,null,null,32,"mat-grid-list",[["class","mat-grid-list"],["cols","7"],["rowHeight","96px"]],[[1,"cols",0]],null,null,s.c,s.a)),e.yb(15,2211840,null,1,d.a,[e.l,[2,f.b]],{cols:[0,"cols"],rowHeight:[1,"rowHeight"]},null),e.Tb(603979776,2,{_tiles:1}),e.Sb(2048,null,d.e,null,[d.a]),(t()(),e.zb(18,0,null,0,25,"mat-grid-tile",[["class","mat-grid-tile"],["colspan","6"],["rowspan","1"]],[[1,"rowspan",0],[1,"colspan",0]],null,null,s.d,s.b)),e.yb(19,49152,[[2,4]],0,d.c,[e.l,[2,d.e]],{rowspan:[0,"rowspan"],colspan:[1,"colspan"]},null),(t()(),e.zb(20,0,null,0,23,"div",[["class","searchField"]],null,null,null,null,null)),(t()(),e.zb(21,0,null,null,22,"mat-form-field",[["class","mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,C.b,C.a)),e.yb(22,7520256,null,9,j.f,[e.l,e.h,[2,k.h],[2,f.b],[2,j.c],h.a,e.B,[2,r.a]],null,null),e.Tb(603979776,3,{_controlNonStatic:0}),e.Tb(335544320,4,{_controlStatic:0}),e.Tb(603979776,5,{_labelChildNonStatic:0}),e.Tb(335544320,6,{_labelChildStatic:0}),e.Tb(603979776,7,{_placeholderChild:0}),e.Tb(603979776,8,{_errorChildren:1}),e.Tb(603979776,9,{_hintChildren:1}),e.Tb(603979776,10,{_prefixChildren:1}),e.Tb(603979776,11,{_suffixChildren:1}),e.Sb(2048,null,j.b,null,[j.f]),(t()(),e.zb(33,0,null,3,2,"mat-label",[],null,null,null,null,null)),e.yb(34,16384,[[5,4],[6,4]],0,j.i,[],null,null),(t()(),e.Xb(-1,null,["Filter Project"])),(t()(),e.zb(36,0,null,1,7,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["type","text"]],[[2,"mat-input-server",null],[1,"id",0],[1,"data-placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-invalid",0],[1,"aria-required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(t,n,l){var a=!0,o=t.component;return"input"===n&&(a=!1!==e.Nb(t,37)._handleInput(l.target.value)&&a),"blur"===n&&(a=!1!==e.Nb(t,37).onTouched()&&a),"compositionstart"===n&&(a=!1!==e.Nb(t,37)._compositionStart()&&a),"compositionend"===n&&(a=!1!==e.Nb(t,37)._compositionEnd(l.target.value)&&a),"focus"===n&&(a=!1!==e.Nb(t,41)._focusChanged(!0)&&a),"blur"===n&&(a=!1!==e.Nb(t,41)._focusChanged(!1)&&a),"input"===n&&(a=!1!==e.Nb(t,41)._onInput()&&a),"ngModelChange"===n&&(a=!1!==(o.filterQuery=l)&&a),a},null,null)),e.yb(37,16384,null,0,P.d,[e.G,e.l,[2,P.a]],null,null),e.Sb(1024,null,P.n,function(t){return[t]},[P.d]),e.yb(39,671744,null,0,P.s,[[8,null],[8,null],[8,null],[6,P.n]],{model:[0,"model"]},{update:"ngModelChange"}),e.Sb(2048,null,P.o,null,[P.s]),e.yb(41,5128192,null,0,x.b,[e.l,h.a,[6,P.o],[2,P.r],[2,P.j],k.d,[8,null],N.a,e.B,[2,j.b]],{type:[0,"type"]},null),e.yb(42,16384,null,0,P.p,[[4,P.o]],null,null),e.Sb(2048,[[3,4],[4,4]],j.g,null,[x.b]),(t()(),e.ib(16777216,null,0,2,null,R)),e.yb(45,278528,null,0,p.n,[e.R,e.O,e.u],{ngForOf:[0,"ngForOf"]},null),e.Rb(46,2)],function(t,n){var l=n.component;t(n,4,0,"primary"),t(n,12,0,l.showAddBtn),t(n,15,0,"7","96px"),t(n,19,0,"1","6"),t(n,39,0,l.filterQuery),t(n,41,0,"text");var a=e.Yb(n,45,0,t(n,46,0,e.Nb(n,0),l.allProjects,l.filterQuery));t(n,45,0,a)},function(t,n){t(n,3,0,e.Nb(n,4)._toolbarRows.length>0,0===e.Nb(n,4)._toolbarRows.length),t(n,14,0,e.Nb(n,15).cols),t(n,18,0,e.Nb(n,19).rowspan,e.Nb(n,19).colspan),t(n,21,1,["standard"==e.Nb(n,22).appearance,"fill"==e.Nb(n,22).appearance,"outline"==e.Nb(n,22).appearance,"legacy"==e.Nb(n,22).appearance,e.Nb(n,22)._control.errorState,e.Nb(n,22)._canLabelFloat(),e.Nb(n,22)._shouldLabelFloat(),e.Nb(n,22)._hasFloatingLabel(),e.Nb(n,22)._hideControlPlaceholder(),e.Nb(n,22)._control.disabled,e.Nb(n,22)._control.autofilled,e.Nb(n,22)._control.focused,"accent"==e.Nb(n,22).color,"warn"==e.Nb(n,22).color,e.Nb(n,22)._shouldForward("untouched"),e.Nb(n,22)._shouldForward("touched"),e.Nb(n,22)._shouldForward("pristine"),e.Nb(n,22)._shouldForward("dirty"),e.Nb(n,22)._shouldForward("valid"),e.Nb(n,22)._shouldForward("invalid"),e.Nb(n,22)._shouldForward("pending"),!e.Nb(n,22)._animationsEnabled]),t(n,36,1,[e.Nb(n,41)._isServer,e.Nb(n,41).id,e.Nb(n,41).placeholder,e.Nb(n,41).disabled,e.Nb(n,41).required,e.Nb(n,41).readonly&&!e.Nb(n,41)._isNativeSelect||null,e.Nb(n,41).errorState,e.Nb(n,41).required.toString(),e.Nb(n,42).ngClassUntouched,e.Nb(n,42).ngClassTouched,e.Nb(n,42).ngClassPristine,e.Nb(n,42).ngClassDirty,e.Nb(n,42).ngClassValid,e.Nb(n,42).ngClassInvalid,e.Nb(n,42).ngClassPending])})}var M=e.vb("app-projects",T.a,function(t){return e.ac(0,[(t()(),e.zb(0,0,null,null,3,"app-projects",[],null,null,null,O,D)),e.Sb(512,null,w.a,w.a,[U.e]),e.Sb(512,null,S.a,S.a,[U.e]),e.yb(3,245760,null,0,T.a,[A.a,w.a,S.a,E.a,z.n],null,null)],function(t,n){t(n,3,0)},null)},{showAddBtn:"showAddBtn",viewType:"viewType"},{},[])}}])}();