import{P as u,w as Q,a as d,f as F,S,j as D,x as Se,D as be,c as me,y as xe,i as t,g as z,h as Ce,F as ke,E as W,G as E,H as C,d as we,t as a,U as f,J as ye,B as Pe}from"./index-BPXqazD4.js";import{S as X,f as Re}from"./session_store-CgU1Qj2R.js";var De=a("<span>Loading.."),ze=a('<div class=dashboard><div class=puzzle-list><h2>Puzzle Sets</h2><ul></ul></div><div class=settings><h2>Settings</h2><div class=links><span class=link></span><div class=volume><label>Volume</label><input min=0 max=1 step=0.1 type=range></div><span class="link red">Clear Statistics</span><span class="link red">Delete Profile</span></div></div><div class=stats><div class=header><span> Statistics</span></div><div class=body>'),Ee=a("<span> active "),Fe=a("<li><span></span>"),Te=a("<span class=link> <!> "),Ve=a("<span>"),Ae=a("<span> There are no runs on this set. "),Ne=a("<div class=buttons><button>Start a New Run"),Le=a("<button>Set Active"),Ue=a("<div class=buttons><button>Start Solving"),je=a("<div class=title><span> Total Runs: <!> </span><div class=runs><span> Run #<!> "),Be=a("<div class=progress><div class=progress-bar><span class=solved> </span><span class=failed> </span><span class=skipped> "),Ge=a("<div class=info><span>Attempted: <!>/</span><div class=out><span class=solved>Solved: <!>/</span><span class=failed>Failed: <!>/</span><span class=skipped>Skipped: <!>/<!> </span></div><span>Time Spent: <!> "),He=a('<div class=buttons><span class="link red">Clear Statistics');const Ke=()=>{let b=u.active_user??u.anonymous_user,[r]=Q(()=>Pe.get_list_of_studies());const[c]=Q(()=>f.get_or_create_active_config_for_user(b));return d(S,{get when(){return F(()=>!!(!(r.loading||c.loading)&&r()))()&&!!c()},get fallback(){return De()},get children(){return d(Je,{get config(){return c()},get studies(){return r()}})}})},Je=b=>{const r=()=>u.active_user??u.anonymous_user,[c,T]=D(b.config.active_set),V=()=>b.studies,[v,Y]=D(c()),A=F(()=>V().find(n=>n.id===v())),N=()=>f.get_runs_for_user(r(),v()),[L,Me]=D(0),Z=F(()=>{let n=N();return n[n.length-1-L()]}),k=Se(),m=be();me(xe(c,n=>{f.set_active_config_for_user(r(),n)}));const ee=()=>{m("/profile")},le=()=>{f.clear_all_runs(r())},te=()=>{window.confirm("Do you want to delete your profile?")&&(u.delete_active_profile(),m("/profile"))},ie=ye(150,n=>{k.setVolume(n),k.play("move")}),U=()=>{T(v())},se=()=>{T(v()),f.get_or_create_active_run_for_user(r())},ne=()=>{f.clear_runs(r(),v())};X.navigate_filter=void 0;const w=n=>{X.navigate_filter=n,m("/")};return(()=>{var n=ze(),j=n.firstChild,ae=j.firstChild,re=ae.nextSibling,B=j.nextSibling,_e=B.firstChild,de=_e.nextSibling,y=de.firstChild,G=y.nextSibling,ce=G.firstChild,H=ce.nextSibling,J=G.nextSibling,oe=J.nextSibling,$e=B.nextSibling,P=$e.firstChild,R=P.firstChild,ge=R.firstChild,ve=P.nextSibling;return t(re,d(ke,{get each(){return V()},children:e=>(()=>{var l=Fe(),i=l.firstChild;return l.$$click=()=>Y(e.id),t(i,()=>e.name),t(l,d(S,{get when(){return e.id===c()},get children(){return Ee()}}),null),z(()=>Ce(l,v()===e.id?"active":"")),l})()})),y.$$click=()=>ee(),t(y,d(W,{href:"/profile",children:"Change Profile"})),H.$$input=e=>ie(parseFloat(e.currentTarget.value)),J.$$click=()=>le(),oe.$$click=()=>te(),t(P,d(S,{get when(){return u.active_user},get fallback(){return(()=>{var e=Te(),l=e.firstChild,i=l.nextSibling;return i.nextSibling,t(e,d(W,{href:"/profile",children:"Save Profile"}),i),e})()},children:e=>(()=>{var l=Ve();return t(l,e),l})()}),R),t(R,()=>A().name,ge),t(ve,d(S,{get when(){return Z()},keyed:!0,get fallback(){return[Ae(),(()=>{var e=Ne(),l=e.firstChild;return l.$$click=()=>se(),e})()]},children:e=>[(()=>{var l=Ue(),i=l.firstChild;return t(l,d(S,{get when(){return A().id!==c()},get children(){var _=Le();return _.$$click=()=>U(),_}}),i),i.$$click=()=>{U(),m("/")},l})(),(()=>{var l=je(),i=l.firstChild,_=i.firstChild,o=_.nextSibling;o.nextSibling;var p=i.nextSibling,s=p.firstChild,h=s.firstChild,$=h.nextSibling;return $.nextSibling,t(i,()=>N().length,o),t(s,()=>L()+1,$),l})(),(()=>{var l=Be(),i=l.firstChild,_=i.firstChild,o=_.nextSibling,p=o.nextSibling;return z(s=>{var h=`width: ${e.solved.length/e.total*100}%;`,$=`width: ${e.failed.length/e.total*100}%;`,g=`width: ${e.skipped.length/e.total*100}%;`;return s.e=E(_,h,s.e),s.t=E(o,$,s.t),s.a=E(p,g,s.a),s},{e:void 0,t:void 0,a:void 0}),l})(),(()=>{var l=Ge(),i=l.firstChild,_=i.firstChild,o=_.nextSibling;o.nextSibling;var p=i.nextSibling,s=p.firstChild,h=s.firstChild,$=h.nextSibling;$.nextSibling;var g=s.nextSibling,pe=g.firstChild,M=pe.nextSibling;M.nextSibling;var x=g.nextSibling,fe=x.firstChild,q=fe.nextSibling,ue=q.nextSibling,I=ue.nextSibling;I.nextSibling;var K=p.nextSibling,he=K.firstChild,O=he.nextSibling;return O.nextSibling,t(i,()=>C(e),o),t(i,()=>e.total,null),s.$$click=()=>w("solved"),t(s,()=>e.solved.length,$),t(s,()=>C(e),null),g.$$click=()=>w("failed"),t(g,()=>e.failed.length,M),t(g,()=>C(e),null),x.$$click=()=>w("skipped"),t(x,()=>e.skipped.length,q),t(x,()=>C(e),I),t(K,()=>Re(e.elapsed_ms),O),l})(),(()=>{var l=He(),i=l.firstChild;return i.$$click=()=>ne(),l})()]})),z(()=>H.value=k.getVolume()),n})()};we(["click","input"]);export{Ke as default};
