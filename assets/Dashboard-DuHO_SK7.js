import{P as g,y as B,a as _,h as w,S as h,l as E,z as ke,J as Ce,c as Z,i as l,b as L,f as we,F as ye,K as ee,e as j,E as F,A as G,G as te,d as ze,t as n,U as S,L as Pe,H as Re}from"./index-tb-9K08U.js";import{S as le,f as Ee}from"./session_store-CjgTReIv.js";var Fe=n("<span>Loading.."),Le=n('<div class=dashboard><div class=puzzle-list><h2>Puzzle Sets</h2><ul></ul></div><div class=settings><h2>Settings</h2><div class=links><span class=link></span><div class=volume><label>Volume</label><input min=0 max=1 step=0.1 type=range></div><span class="link red">Clear Statistics</span><span class="link red">Delete Profile</span></div></div><div class=stats><div class=header><span> Statistics</span></div><div class=body>'),Ae=n("<span> active "),De=n("<li><span></span>"),Te=n("<span class=link> <!> "),Ue=n("<span>"),Ve=n("<span> There are no runs on this set. "),Ne=n("<div class=buttons><button>Start a New Run"),je=n("<button>Set Active"),Be=n("<div class=buttons><button>Start Solving"),Ge=n("<div class=title><span> Total Runs: <!> </span><div class=runs><span> Run #<!> "),He=n("<div class=progress><div class=progress-bar><span class=solved> </span><span class=failed> </span><span class=skipped> "),Je=n("<div class=info><span>Attempted: <!>/</span><div class=out><span class=solved>Solved: <!>/</span><span class=failed>Failed: <!>/</span><span class=skipped>Skipped: <!>/<!> </span></div><span>Time Spent: <!> "),Ke=n('<div class=buttons><span class="link red">Clear Statistics'),Me=n("<span class=link>Export Failed Puzzles"),Oe=n("<a>Click to download failed puzzles");const Ye=()=>{let v=g.active_user??g.anonymous_user,[o]=B(()=>Re.get_list_of_studies());const[c]=B(()=>S.get_or_create_active_config_for_user(v));return _(h,{get when(){return w(()=>!!(!(o.loading||c.loading)&&o()))()&&!!c()},get fallback(){return Fe()},get children(){return _(qe,{get config(){return c()},get studies(){return o()}})}})},qe=v=>{const o=()=>g.active_user??g.anonymous_user,[c,y]=E(v.config.active_set),z=()=>v.studies,[r,m]=E(c()),$=w(()=>z().find(a=>a.id===r())),x=()=>S.get_runs_for_user(o(),r()),[k,Qe]=E(0),ie=w(()=>{let a=x();return a[a.length-1-k()]}),A=ke(),P=Ce();Z(G(c,a=>{S.set_active_config_for_user(o(),a)}));const se=()=>{P("/profile")},ne=()=>{S.clear_all_runs(o())},ae=()=>{window.confirm("Do you want to delete your profile?")&&(g.delete_active_profile(),P("/profile"))},re=Pe(150,a=>{A.setVolume(a),A.play("move")}),H=()=>{y(r())},de=()=>{y(r()),S.get_or_create_active_run_for_user(o())},_e=()=>{S.clear_runs(o(),r())},D=E(!1);Z(G(r,()=>{D[1](!1)})),le.navigate_filter=void 0;const T=a=>{le.navigate_filter=a,P("/")};return(()=>{var a=Le(),J=a.firstChild,oe=J.firstChild,ce=oe.nextSibling,K=J.nextSibling,$e=K.firstChild,ue=$e.nextSibling,U=ue.firstChild,M=U.nextSibling,ge=M.firstChild,O=ge.nextSibling,q=M.nextSibling,ve=q.nextSibling,fe=K.nextSibling,V=fe.firstChild,N=V.firstChild,pe=N.firstChild,he=V.nextSibling;return l(ce,_(ye,{get each(){return z()},children:e=>(()=>{var t=De(),i=t.firstChild;return t.$$click=()=>m(e.id),l(i,()=>e.name),l(t,_(h,{get when(){return e.id===c()},get children(){return Ae()}}),null),L(()=>we(t,r()===e.id?"active":"")),t})()})),U.$$click=()=>se(),l(U,_(ee,{href:"/profile",children:"Change Profile"})),O.$$input=e=>re(parseFloat(e.currentTarget.value)),q.$$click=()=>ne(),ve.$$click=()=>ae(),l(V,_(h,{get when(){return g.active_user},get fallback(){return(()=>{var e=Te(),t=e.firstChild,i=t.nextSibling;return i.nextSibling,l(e,_(ee,{href:"/profile",children:"Save Profile"}),i),e})()},children:e=>(()=>{var t=Ue();return l(t,e),t})()}),N),l(N,()=>$().name,pe),l(he,_(h,{get when(){return ie()},keyed:!0,get fallback(){return[Ve(),(()=>{var e=Ne(),t=e.firstChild;return t.$$click=()=>de(),e})()]},children:e=>[(()=>{var t=Be(),i=t.firstChild;return l(t,_(h,{get when(){return $().id!==c()},get children(){var d=je();return d.$$click=()=>H(),d}}),i),i.$$click=()=>{H(),P("/")},t})(),(()=>{var t=Ge(),i=t.firstChild,d=i.firstChild,u=d.nextSibling;u.nextSibling;var b=i.nextSibling,s=b.firstChild,C=s.firstChild,f=C.nextSibling;return f.nextSibling,l(i,()=>x().length,u),l(s,()=>k()+1,f),t})(),(()=>{var t=He(),i=t.firstChild,d=i.firstChild,u=d.nextSibling,b=u.nextSibling;return L(s=>{var C=`width: ${e.solved.length/e.total*100}%;`,f=`width: ${e.failed.length/e.total*100}%;`,p=`width: ${e.skipped.length/e.total*100}%;`;return s.e=j(d,C,s.e),s.t=j(u,f,s.t),s.a=j(b,p,s.a),s},{e:void 0,t:void 0,a:void 0}),t})(),(()=>{var t=Je(),i=t.firstChild,d=i.firstChild,u=d.nextSibling;u.nextSibling;var b=i.nextSibling,s=b.firstChild,C=s.firstChild,f=C.nextSibling;f.nextSibling;var p=s.nextSibling,Se=p.firstChild,I=Se.nextSibling;I.nextSibling;var R=p.nextSibling,be=R.firstChild,Q=be.nextSibling,me=Q.nextSibling,W=me.nextSibling;W.nextSibling;var X=b.nextSibling,xe=X.firstChild,Y=xe.nextSibling;return Y.nextSibling,l(i,()=>F(e),u),l(i,()=>e.total,null),s.$$click=()=>T("solved"),l(s,()=>e.solved.length,f),l(s,()=>F(e),null),p.$$click=()=>T("failed"),l(p,()=>e.failed.length,I),l(p,()=>F(e),null),R.$$click=()=>T("skipped"),l(R,()=>e.skipped.length,Q),l(R,()=>F(e),W),l(X,()=>Ee(e.elapsed_ms),Y),t})(),(()=>{var t=Ke(),i=t.firstChild;return l(t,_(h,{get fallback(){return(()=>{var d=Me();return d.$$click=()=>D[1](!0),d})()},get when(){return D[0]()},get children(){return _(Ie,{get selected_study(){return $()}})}}),i),i.$$click=()=>_e(),t})()]})),L(()=>O.value=A.getVolume()),a})()},Ie=v=>{const o=()=>g.active_user??g.anonymous_user;let[c]=B(()=>S.get_failed_puzzles_for_selected_study_in_pgn_for_user(o(),v.selected_study.id)),y=w(G(c,r=>{if(r!==void 0)return URL.createObjectURL(new Blob([r],{type:"text/plain"}))})),z=w(()=>`${v.selected_study.name}-failed.pgn`);return _(h,{fallback:"Composing pgns..",get when(){return y()},children:r=>(()=>{var m=Oe();return L($=>{var x=r(),k=z();return x!==$.e&&te(m,"href",$.e=x),k!==$.t&&te(m,"download",$.t=k),$},{e:void 0,t:void 0}),m})()})};ze(["click","input"]);export{Ye as default};