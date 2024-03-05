import{P as u,w as J,a as r,n as D,S as f,h as R,x as fe,D as ve,c as he,y as Se,i as l,f as K,g as be,F as me,E as O,G as b,d as xe,t as s,U as $,H as Ce,B as ke}from"./index-Bsu4zmON.js";import{f as ye}from"./util-Dh_741V6.js";var we=s("<span>Loading.."),Pe=s('<div class=dashboard><div class=puzzle-list><h2>Puzzle Sets</h2><ul></ul></div><div class=settings><h2>Settings</h2><div class=links><span class=link></span><div class=volume><label>Volume</label><input min=0 max=1 step=0.1 type=range></div><span class="link red">Clear Statistics</span><span class="link red">Delete Profile</span></div></div><div class=stats><div class=header><span> Statistics</span></div><div class=body>'),Re=s("<span> active "),De=s("<li><span></span>"),ze=s("<span class=link> <!> "),Ee=s("<span>"),Fe=s("<span> There are no runs on this set. "),Te=s("<div class=buttons><button>Start a New Run"),Ve=s("<button>Set Active"),Ae=s("<div class=buttons><button>Start Solving"),Ne=s("<div class=title><span> Total Runs: <!> </span><div class=runs><span> Run #<!> "),Be=s("<div class=progress>Progress Bar"),Le=s("<div class=info><span>Attempted: <!>/</span><div class=out><span class=solved>Solved: <!>/</span><span class=failed>Failed: <!>/</span><span class=skipped>Skipped: <!>/<!> </span></div><span>Time Spent: <!> "),Ue=s('<div class=buttons><span class="link red">Clear Statistics');const qe=()=>{let v=u.active_user??u.anonymous_user,[a]=J(()=>ke.get_list_of_studies());const[_]=J(()=>$.get_or_create_active_config_for_user(v));return r(f,{get when(){return D(()=>!!(!(a.loading||_.loading)&&a()))()&&!!_()},get fallback(){return we()},get children(){return r(Ge,{get config(){return _()},get studies(){return a()}})}})},Ge=v=>{const a=()=>u.active_user??u.anonymous_user,[_,z]=R(v.config.active_set),E=()=>v.studies,[d,Q]=R(_()),F=D(()=>E().find(n=>n.id===d())),T=()=>$.get_runs_for_user(a(),d()),[V,He]=R(0),W=D(()=>{let n=T();return n[n.length-1-V()]}),m=fe(),x=ve();he(Se(_,n=>{$.set_active_config_for_user(a(),n)}));const X=()=>{x("/profile")},Y=()=>{$.clear_all_runs(a())},Z=()=>{window.confirm("Do you want to delete your profile?")&&(u.delete_active_profile(),x("/profile"))},ee=Ce(150,n=>{m.setVolume(n),m.play("move")}),A=()=>{z(d())},te=()=>{z(d()),$.get_or_create_active_run_for_user(a())},le=()=>{$.clear_runs(a(),d())};return(()=>{var n=Pe(),N=n.firstChild,ie=N.firstChild,se=ie.nextSibling,B=N.nextSibling,ne=B.firstChild,ae=ne.nextSibling,C=ae.firstChild,L=C.nextSibling,re=L.firstChild,U=re.nextSibling,G=L.nextSibling,_e=G.nextSibling,ce=B.nextSibling,k=ce.firstChild,y=k.firstChild,de=y.firstChild,oe=k.nextSibling;return l(se,r(me,{get each(){return E()},children:e=>(()=>{var t=De(),i=t.firstChild;return t.$$click=()=>Q(e.id),l(i,()=>e.name),l(t,r(f,{get when(){return e.id===_()},get children(){return Re()}}),null),K(()=>be(t,d()===e.id?"active":"")),t})()})),C.$$click=()=>X(),l(C,r(O,{href:"/profile",children:"Change Profile"})),U.$$input=e=>ee(parseFloat(e.currentTarget.value)),G.$$click=()=>Y(),_e.$$click=()=>Z(),l(k,r(f,{get when(){return u.active_user},get fallback(){return(()=>{var e=ze(),t=e.firstChild,i=t.nextSibling;return i.nextSibling,l(e,r(O,{href:"/profile",children:"Save Profile"}),i),e})()},children:e=>(()=>{var t=Ee();return l(t,e),t})()}),y),l(y,()=>F().name,de),l(oe,r(f,{get when(){return W()},keyed:!0,get fallback(){return[Fe(),(()=>{var e=Te(),t=e.firstChild;return t.$$click=()=>te(),e})()]},children:e=>[(()=>{var t=Ae(),i=t.firstChild;return l(t,r(f,{get when(){return F().id!==_()},get children(){var o=Ve();return o.$$click=()=>A(),o}}),i),i.$$click=()=>{A(),x("/")},t})(),(()=>{var t=Ne(),i=t.firstChild,o=i.firstChild,g=o.nextSibling;g.nextSibling;var h=i.nextSibling,c=h.firstChild,w=c.firstChild,p=w.nextSibling;return p.nextSibling,l(i,()=>T().length,g),l(c,()=>V()+1,p),t})(),Be(),(()=>{var t=Le(),i=t.firstChild,o=i.firstChild,g=o.nextSibling;g.nextSibling;var h=i.nextSibling,c=h.firstChild,w=c.firstChild,p=w.nextSibling;p.nextSibling;var S=c.nextSibling,$e=S.firstChild,H=$e.nextSibling;H.nextSibling;var P=S.nextSibling,ue=P.firstChild,M=ue.nextSibling,ge=M.nextSibling,j=ge.nextSibling;j.nextSibling;var q=h.nextSibling,pe=q.firstChild,I=pe.nextSibling;return I.nextSibling,l(i,()=>b(e),g),l(i,()=>e.total,null),l(c,()=>e.solved.length,p),l(c,()=>b(e),null),l(S,()=>e.failed.length,H),l(S,()=>b(e),null),l(P,()=>e.skipped.length,M),l(P,()=>b(e),j),l(q,()=>ye(e.elapsed_ms),I),t})(),(()=>{var t=Ue(),i=t.firstChild;return i.$$click=()=>le(),t})()]})),K(()=>U.value=m.getVolume()),n})()};xe(["click","input"]);export{qe as default};
