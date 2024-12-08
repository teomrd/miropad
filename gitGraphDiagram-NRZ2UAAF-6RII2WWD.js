import{a as ne}from"./chunk-QI5656UK.js";import{a as oe}from"./chunk-PWSVZSPK.js";import{a as ce}from"./chunk-QTRW4TAT.js";import"./chunk-E4JS2JSG.js";import"./chunk-WZ327HTW.js";import"./chunk-BXVLC2RA.js";import{f as re,l as ae,m as se}from"./chunk-MGXIVZEI.js";import"./chunk-TSL5KNHW.js";import{D as K,N as k,S as Y,T as Z,U as V,V as J,W as F,X,Y as Q,Z as U,ba as ee,h,ia as te,j as b,v as j}from"./chunk-HJPNRYHP.js";import"./chunk-ZD24GIZA.js";import"./chunk-RW2WCYL6.js";import"./chunk-MYATPW36.js";import"./chunk-R77GKUCO.js";import"./chunk-EQENVWAF.js";import"./chunk-FFNH7GCV.js";import"./chunk-OHVK2FCB.js";var $={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},fe=j.gitGraph,I=h(()=>ae({...fe,...K().gitGraph}),"getConfig"),i=new ne(()=>{let r=I(),e=r.mainBranchName,a=r.mainBranchOrder;return{mainBranchName:e,commits:new Map,head:null,branchConfig:new Map([[e,{name:e,order:a}]]),branches:new Map([[e,null]]),currBranch:e,direction:"LR",seq:0,options:{}}});function H(){return re({length:7})}h(H,"getID");function de(r,e){let a=Object.create(null);return r.reduce((o,t)=>{let s=e(t);return a[s]||(a[s]=!0,o.push(t)),o},[])}h(de,"uniqBy");var ye=h(function(r){i.records.direction=r},"setDirection"),$e=h(function(r){b.debug("options str",r),r=r==null?void 0:r.trim(),r=r||"{}";try{i.records.options=JSON.parse(r)}catch(e){b.error("error while parsing gitGraph options",e.message)}},"setOptions"),xe=h(function(){return i.records.options},"getOptions"),ue=h(function(r){let e=r.msg,a=r.id,o=r.type,t=r.tags;b.info("commit",e,a,o,t),b.debug("Entering commit:",e,a,o,t);let s=I();a=k.sanitizeText(a,s),e=k.sanitizeText(e,s),t=t==null?void 0:t.map(n=>k.sanitizeText(n,s));let c={id:a||i.records.seq+"-"+H(),message:e,seq:i.records.seq++,type:o??$.NORMAL,tags:t??[],parents:i.records.head==null?[]:[i.records.head.id],branch:i.records.currBranch};i.records.head=c,b.info("main branch",s.mainBranchName),i.records.commits.set(c.id,c),i.records.branches.set(i.records.currBranch,c.id),b.debug("in pushCommit "+c.id)},"commit"),be=h(function(r){let e=r.name,a=r.order;if(e=k.sanitizeText(e,I()),i.records.branches.has(e))throw new Error(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${e}")`);i.records.branches.set(e,i.records.head!=null?i.records.head.id:null),i.records.branchConfig.set(e,{name:e,order:a}),he(e),b.debug("in createBranch")},"branch"),we=h(r=>{let e=r.branch,a=r.id,o=r.type,t=r.tags,s=I();e=k.sanitizeText(e,s),a&&(a=k.sanitizeText(a,s));let c=i.records.branches.get(i.records.currBranch),n=i.records.branches.get(e),m=c?i.records.commits.get(c):void 0,l=n?i.records.commits.get(n):void 0;if(m&&l&&m.branch===e)throw new Error(`Cannot merge branch '${e}' into itself.`);if(i.records.currBranch===e){let d=new Error('Incorrect usage of "merge". Cannot merge a branch to itself');throw d.hash={text:`merge ${e}`,token:`merge ${e}`,expected:["branch abc"]},d}if(m===void 0||!m){let d=new Error(`Incorrect usage of "merge". Current branch (${i.records.currBranch})has no commits`);throw d.hash={text:`merge ${e}`,token:`merge ${e}`,expected:["commit"]},d}if(!i.records.branches.has(e)){let d=new Error('Incorrect usage of "merge". Branch to be merged ('+e+") does not exist");throw d.hash={text:`merge ${e}`,token:`merge ${e}`,expected:[`branch ${e}`]},d}if(l===void 0||!l){let d=new Error('Incorrect usage of "merge". Branch to be merged ('+e+") has no commits");throw d.hash={text:`merge ${e}`,token:`merge ${e}`,expected:['"commit"']},d}if(m===l){let d=new Error('Incorrect usage of "merge". Both branches have same head');throw d.hash={text:`merge ${e}`,token:`merge ${e}`,expected:["branch abc"]},d}if(a&&i.records.commits.has(a)){let d=new Error('Incorrect usage of "merge". Commit with id:'+a+" already exists, use different custom Id");throw d.hash={text:`merge ${e} ${a} ${o} ${t==null?void 0:t.join(" ")}`,token:`merge ${e} ${a} ${o} ${t==null?void 0:t.join(" ")}`,expected:[`merge ${e} ${a}_UNIQUE ${o} ${t==null?void 0:t.join(" ")}`]},d}let p=n||"",g={id:a||`${i.records.seq}-${H()}`,message:`merged branch ${e} into ${i.records.currBranch}`,seq:i.records.seq++,parents:i.records.head==null?[]:[i.records.head.id,p],branch:i.records.currBranch,type:$.MERGE,customType:o,customId:!!a,tags:t??[]};i.records.head=g,i.records.commits.set(g.id,g),i.records.branches.set(i.records.currBranch,g.id),b.debug(i.records.branches),b.debug("in mergeBranch")},"merge"),Be=h(function(r){let e=r.id,a=r.targetId,o=r.tags,t=r.parent;b.debug("Entering cherryPick:",e,a,o);let s=I();if(e=k.sanitizeText(e,s),a=k.sanitizeText(a,s),o=o==null?void 0:o.map(m=>k.sanitizeText(m,s)),t=k.sanitizeText(t,s),!e||!i.records.commits.has(e)){let m=new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');throw m.hash={text:`cherryPick ${e} ${a}`,token:`cherryPick ${e} ${a}`,expected:["cherry-pick abc"]},m}let c=i.records.commits.get(e);if(c===void 0||!c)throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');if(t&&!(Array.isArray(c.parents)&&c.parents.includes(t)))throw new Error("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit.");let n=c.branch;if(c.type===$.MERGE&&!t)throw new Error("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified.");if(!a||!i.records.commits.has(a)){if(n===i.records.currBranch){let g=new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');throw g.hash={text:`cherryPick ${e} ${a}`,token:`cherryPick ${e} ${a}`,expected:["cherry-pick abc"]},g}let m=i.records.branches.get(i.records.currBranch);if(m===void 0||!m){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${i.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${e} ${a}`,token:`cherryPick ${e} ${a}`,expected:["cherry-pick abc"]},g}let l=i.records.commits.get(m);if(l===void 0||!l){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${i.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${e} ${a}`,token:`cherryPick ${e} ${a}`,expected:["cherry-pick abc"]},g}let p={id:i.records.seq+"-"+H(),message:`cherry-picked ${c==null?void 0:c.message} into ${i.records.currBranch}`,seq:i.records.seq++,parents:i.records.head==null?[]:[i.records.head.id,c.id],branch:i.records.currBranch,type:$.CHERRY_PICK,tags:o?o.filter(Boolean):[`cherry-pick:${c.id}${c.type===$.MERGE?`|parent:${t}`:""}`]};i.records.head=p,i.records.commits.set(p.id,p),i.records.branches.set(i.records.currBranch,p.id),b.debug(i.records.branches),b.debug("in cherryPick")}},"cherryPick"),he=h(function(r){if(r=k.sanitizeText(r,I()),i.records.branches.has(r)){i.records.currBranch=r;let e=i.records.branches.get(i.records.currBranch);e===void 0||!e?i.records.head=null:i.records.head=i.records.commits.get(e)??null}else{let e=new Error(`Trying to checkout branch which is not yet created. (Help try using "branch ${r}")`);throw e.hash={text:`checkout ${r}`,token:`checkout ${r}`,expected:[`branch ${r}`]},e}},"checkout");function _(r,e,a){let o=r.indexOf(e);o===-1?r.push(a):r.splice(o,1,a)}h(_,"upsert");function z(r){let e=r.reduce((t,s)=>t.seq>s.seq?t:s,r[0]),a="";r.forEach(function(t){t===e?a+="	*":a+="	|"});let o=[a,e.id,e.seq];for(let t in i.records.branches)i.records.branches.get(t)===e.id&&o.push(t);if(b.debug(o.join(" ")),e.parents&&e.parents.length==2&&e.parents[0]&&e.parents[1]){let t=i.records.commits.get(e.parents[0]);_(r,e,t),e.parents[1]&&r.push(i.records.commits.get(e.parents[1]))}else{if(e.parents.length==0)return;if(e.parents[0]){let t=i.records.commits.get(e.parents[0]);_(r,e,t)}}r=de(r,t=>t.id),z(r)}h(z,"prettyPrintCommitHistory");var ve=h(function(){b.debug(i.records.commits);let r=le()[0];z([r])},"prettyPrint"),Ce=h(function(){i.reset(),Y()},"clear"),ke=h(function(){return[...i.records.branchConfig.values()].map((e,a)=>e.order!==null&&e.order!==void 0?e:{...e,order:parseFloat(`0.${a}`)}).sort((e,a)=>(e.order??0)-(a.order??0)).map(({name:e})=>({name:e}))},"getBranchesAsObjArray"),Ee=h(function(){return i.records.branches},"getBranches"),Te=h(function(){return i.records.commits},"getCommits"),le=h(function(){let r=[...i.records.commits.values()];return r.forEach(function(e){b.debug(e.id)}),r.sort((e,a)=>e.seq-a.seq),r},"getCommitsArray"),Le=h(function(){return i.records.currBranch},"getCurrentBranch"),Me=h(function(){return i.records.direction},"getDirection"),Pe=h(function(){return i.records.head},"getHead"),me={commitType:$,getConfig:I,setDirection:ye,setOptions:$e,getOptions:xe,commit:ue,branch:be,merge:we,cherryPick:Be,checkout:he,prettyPrint:ve,clear:Ce,getBranchesAsObjArray:ke,getBranches:Ee,getCommits:Te,getCommitsArray:le,getCurrentBranch:Le,getDirection:Me,getHead:Pe,setAccTitle:Z,getAccTitle:V,getAccDescription:F,setAccDescription:J,setDiagramTitle:X,getDiagramTitle:Q},Re=h((r,e)=>{oe(r,e),r.dir&&e.setDirection(r.dir);for(let a of r.statements)Oe(a,e)},"populate"),Oe=h((r,e)=>{let o={Commit:h(t=>e.commit(qe(t)),"Commit"),Branch:h(t=>e.branch(Ie(t)),"Branch"),Merge:h(t=>e.merge(We(t)),"Merge"),Checkout:h(t=>e.checkout(Ge(t)),"Checkout"),CherryPicking:h(t=>e.cherryPick(De(t)),"CherryPicking")}[r.$type];o?o(r):b.error(`Unknown statement type: ${r.$type}`)},"parseStatement"),qe=h(r=>({id:r.id,msg:r.message??"",type:r.type!==void 0?$[r.type]:$.NORMAL,tags:r.tags??void 0}),"parseCommit"),Ie=h(r=>({name:r.name,order:r.order??0}),"parseBranch"),We=h(r=>({branch:r.branch,id:r.id??"",type:r.type!==void 0?$[r.type]:void 0,tags:r.tags??void 0}),"parseMerge"),Ge=h(r=>r.branch,"parseCheckout"),De=h(r=>{var a;return{id:r.id,targetId:"",tags:((a=r.tags)==null?void 0:a.length)===0?void 0:r.tags,parent:r.parent}},"parseCherryPicking"),Ae={parse:h(async r=>{let e=await ce("gitGraph",r);b.debug(e),Re(e,me)},"parse")},N=U(),u=N==null?void 0:N.gitGraph,P=10,R=40,E=4,T=2,q=8,v=new Map,C=new Map,D=30,W=new Map,A=[],M=0,y="LR",He=h(()=>{v.clear(),C.clear(),W.clear(),M=0,A=[],y="LR"},"clear"),pe=h(r=>{let e=document.createElementNS("http://www.w3.org/2000/svg","text");return(typeof r=="string"?r.split(/\\n|\n|<br\s*\/?>/gi):r).forEach(o=>{let t=document.createElementNS("http://www.w3.org/2000/svg","tspan");t.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),t.setAttribute("dy","1em"),t.setAttribute("x","0"),t.setAttribute("class","row"),t.textContent=o.trim(),e.appendChild(t)}),e},"drawText"),ge=h(r=>{let e,a,o;return y==="BT"?(a=h((t,s)=>t<=s,"comparisonFunc"),o=1/0):(a=h((t,s)=>t>=s,"comparisonFunc"),o=0),r.forEach(t=>{var c,n;let s=y==="TB"||y=="BT"?(c=C.get(t))==null?void 0:c.y:(n=C.get(t))==null?void 0:n.x;s!==void 0&&a(s,o)&&(e=t,o=s)}),e},"findClosestParent"),Ne=h(r=>{let e="",a=1/0;return r.forEach(o=>{let t=C.get(o).y;t<=a&&(e=o,a=t)}),e||void 0},"findClosestParentBT"),_e=h((r,e,a)=>{let o=a,t=a,s=[];r.forEach(c=>{let n=e.get(c);if(!n)throw new Error(`Commit not found for key ${c}`);n.parents.length?(o=Se(n),t=Math.max(o,t)):s.push(n),je(n,o)}),o=t,s.forEach(c=>{Ke(c,o,a)}),r.forEach(c=>{let n=e.get(c);if(n!=null&&n.parents.length){let m=Ne(n.parents);o=C.get(m).y-R,o<=t&&(t=o);let l=v.get(n.branch).pos,p=o-P;C.set(n.id,{x:l,y:p})}})},"setParallelBTPos"),ze=h(r=>{var o;let e=ge(r.parents.filter(t=>t!==null));if(!e)throw new Error(`Closest parent not found for commit ${r.id}`);let a=(o=C.get(e))==null?void 0:o.y;if(a===void 0)throw new Error(`Closest parent position not found for commit ${r.id}`);return a},"findClosestParentPos"),Se=h(r=>ze(r)+R,"calculateCommitPosition"),je=h((r,e)=>{let a=v.get(r.branch);if(!a)throw new Error(`Branch not found for commit ${r.id}`);let o=a.pos,t=e+P;return C.set(r.id,{x:o,y:t}),{x:o,y:t}},"setCommitPosition"),Ke=h((r,e,a)=>{let o=v.get(r.branch);if(!o)throw new Error(`Branch not found for commit ${r.id}`);let t=e+a,s=o.pos;C.set(r.id,{x:s,y:t})},"setRootPosition"),Ye=h((r,e,a,o,t,s)=>{if(s===$.HIGHLIGHT)r.append("rect").attr("x",a.x-10).attr("y",a.y-10).attr("width",20).attr("height",20).attr("class",`commit ${e.id} commit-highlight${t%q} ${o}-outer`),r.append("rect").attr("x",a.x-6).attr("y",a.y-6).attr("width",12).attr("height",12).attr("class",`commit ${e.id} commit${t%q} ${o}-inner`);else if(s===$.CHERRY_PICK)r.append("circle").attr("cx",a.x).attr("cy",a.y).attr("r",10).attr("class",`commit ${e.id} ${o}`),r.append("circle").attr("cx",a.x-3).attr("cy",a.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${e.id} ${o}`),r.append("circle").attr("cx",a.x+3).attr("cy",a.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${e.id} ${o}`),r.append("line").attr("x1",a.x+3).attr("y1",a.y+1).attr("x2",a.x).attr("y2",a.y-5).attr("stroke","#fff").attr("class",`commit ${e.id} ${o}`),r.append("line").attr("x1",a.x-3).attr("y1",a.y+1).attr("x2",a.x).attr("y2",a.y-5).attr("stroke","#fff").attr("class",`commit ${e.id} ${o}`);else{let c=r.append("circle");if(c.attr("cx",a.x),c.attr("cy",a.y),c.attr("r",e.type===$.MERGE?9:10),c.attr("class",`commit ${e.id} commit${t%q}`),s===$.MERGE){let n=r.append("circle");n.attr("cx",a.x),n.attr("cy",a.y),n.attr("r",6),n.attr("class",`commit ${o} ${e.id} commit${t%q}`)}s===$.REVERSE&&r.append("path").attr("d",`M ${a.x-5},${a.y-5}L${a.x+5},${a.y+5}M${a.x-5},${a.y+5}L${a.x+5},${a.y-5}`).attr("class",`commit ${o} ${e.id} commit${t%q}`)}},"drawCommitBullet"),Ze=h((r,e,a,o)=>{var t;if(e.type!==$.CHERRY_PICK&&(e.customId&&e.type===$.MERGE||e.type!==$.MERGE)&&(u!=null&&u.showCommitLabel)){let s=r.append("g"),c=s.insert("rect").attr("class","commit-label-bkg"),n=s.append("text").attr("x",o).attr("y",a.y+25).attr("class","commit-label").text(e.id),m=(t=n.node())==null?void 0:t.getBBox();if(m&&(c.attr("x",a.posWithOffset-m.width/2-T).attr("y",a.y+13.5).attr("width",m.width+2*T).attr("height",m.height+2*T),y==="TB"||y==="BT"?(c.attr("x",a.x-(m.width+4*E+5)).attr("y",a.y-12),n.attr("x",a.x-(m.width+4*E)).attr("y",a.y+m.height-12)):n.attr("x",a.posWithOffset-m.width/2),u.rotateCommitLabel))if(y==="TB"||y==="BT")n.attr("transform","rotate(-45, "+a.x+", "+a.y+")"),c.attr("transform","rotate(-45, "+a.x+", "+a.y+")");else{let l=-7.5-(m.width+10)/25*9.5,p=10+m.width/25*8.5;s.attr("transform","translate("+l+", "+p+") rotate(-45, "+o+", "+a.y+")")}}},"drawCommitLabel"),Ve=h((r,e,a,o)=>{var t;if(e.tags.length>0){let s=0,c=0,n=0,m=[];for(let l of e.tags.reverse()){let p=r.insert("polygon"),g=r.append("circle"),d=r.append("text").attr("y",a.y-16-s).attr("class","tag-label").text(l),f=(t=d.node())==null?void 0:t.getBBox();if(!f)throw new Error("Tag bbox not found");c=Math.max(c,f.width),n=Math.max(n,f.height),d.attr("x",a.posWithOffset-f.width/2),m.push({tag:d,hole:g,rect:p,yOffset:s}),s+=20}for(let{tag:l,hole:p,rect:g,yOffset:d}of m){let f=n/2,x=a.y-19.2-d;if(g.attr("class","tag-label-bkg").attr("points",`
      ${o-c/2-E/2},${x+T}  
      ${o-c/2-E/2},${x-T}
      ${a.posWithOffset-c/2-E},${x-f-T}
      ${a.posWithOffset+c/2+E},${x-f-T}
      ${a.posWithOffset+c/2+E},${x+f+T}
      ${a.posWithOffset-c/2-E},${x+f+T}`),p.attr("cy",x).attr("cx",o-c/2+E/2).attr("r",1.5).attr("class","tag-hole"),y==="TB"||y==="BT"){let w=o+d;g.attr("class","tag-label-bkg").attr("points",`
        ${a.x},${w+2}
        ${a.x},${w-2}
        ${a.x+P},${w-f-2}
        ${a.x+P+c+4},${w-f-2}
        ${a.x+P+c+4},${w+f+2}
        ${a.x+P},${w+f+2}`).attr("transform","translate(12,12) rotate(45, "+a.x+","+o+")"),p.attr("cx",a.x+E/2).attr("cy",w).attr("transform","translate(12,12) rotate(45, "+a.x+","+o+")"),l.attr("x",a.x+5).attr("y",w+3).attr("transform","translate(14,14) rotate(45, "+a.x+","+o+")")}}}},"drawCommitTags"),Je=h(r=>{switch(r.customType??r.type){case $.NORMAL:return"commit-normal";case $.REVERSE:return"commit-reverse";case $.HIGHLIGHT:return"commit-highlight";case $.MERGE:return"commit-merge";case $.CHERRY_PICK:return"commit-cherry-pick";default:return"commit-normal"}},"getCommitClassType"),Fe=h((r,e,a,o)=>{let t={x:0,y:0};if(r.parents.length>0){let s=ge(r.parents);if(s){let c=o.get(s)??t;return e==="TB"?c.y+R:e==="BT"?(o.get(r.id)??t).y-R:c.x+R}}else return e==="TB"?D:e==="BT"?(o.get(r.id)??t).y-R:0;return 0},"calculatePosition"),Xe=h((r,e,a)=>{var c,n;let o=y==="BT"&&a?e:e+P,t=y==="TB"||y==="BT"?o:(c=v.get(r.branch))==null?void 0:c.pos,s=y==="TB"||y==="BT"?(n=v.get(r.branch))==null?void 0:n.pos:o;if(s===void 0||t===void 0)throw new Error(`Position were undefined for commit ${r.id}`);return{x:s,y:t,posWithOffset:o}},"getCommitPosition"),ie=h((r,e,a)=>{if(!u)throw new Error("GitGraph config not found");let o=r.append("g").attr("class","commit-bullets"),t=r.append("g").attr("class","commit-labels"),s=y==="TB"||y==="BT"?D:0,c=[...e.keys()],n=(u==null?void 0:u.parallelCommits)??!1,m=h((p,g)=>{var x,w;let d=(x=e.get(p))==null?void 0:x.seq,f=(w=e.get(g))==null?void 0:w.seq;return d!==void 0&&f!==void 0?d-f:0},"sortKeys"),l=c.sort(m);y==="BT"&&(n&&_e(l,e,s),l=l.reverse()),l.forEach(p=>{var f;let g=e.get(p);if(!g)throw new Error(`Commit not found for key ${p}`);n&&(s=Fe(g,y,s,C));let d=Xe(g,s,n);if(a){let x=Je(g),w=g.customType??g.type,O=((f=v.get(g.branch))==null?void 0:f.index)??0;Ye(o,g,d,x,O,w),Ze(t,g,d,s),Ve(t,g,d,s)}y==="TB"||y==="BT"?C.set(g.id,{x:d.x,y:d.posWithOffset}):C.set(g.id,{x:d.posWithOffset,y:d.y}),s=y==="BT"&&n?s+R:s+R+P,s>M&&(M=s)})},"drawCommits"),Qe=h((r,e,a,o,t)=>{let c=(y==="TB"||y==="BT"?a.x<o.x:a.y<o.y)?e.branch:r.branch,n=h(l=>l.branch===c,"isOnBranchToGetCurve"),m=h(l=>l.seq>r.seq&&l.seq<e.seq,"isBetweenCommits");return[...t.values()].some(l=>m(l)&&n(l))},"shouldRerouteArrow"),G=h((r,e,a=0)=>{let o=r+Math.abs(r-e)/2;if(a>5)return o;if(A.every(c=>Math.abs(c-o)>=10))return A.push(o),o;let s=Math.abs(r-e);return G(r,e-s/5,a+1)},"findLane"),Ue=h((r,e,a,o)=>{var f,x,w,O,S;let t=C.get(e.id),s=C.get(a.id);if(t===void 0||s===void 0)throw new Error(`Commit positions not found for commits ${e.id} and ${a.id}`);let c=Qe(e,a,t,s,o),n="",m="",l=0,p=0,g=(f=v.get(a.branch))==null?void 0:f.index;a.type===$.MERGE&&e.id!==a.parents[0]&&(g=(x=v.get(e.branch))==null?void 0:x.index);let d;if(c){n="A 10 10, 0, 0, 0,",m="A 10 10, 0, 0, 1,",l=10,p=10;let L=t.y<s.y?G(t.y,s.y):G(s.y,t.y),B=t.x<s.x?G(t.x,s.x):G(s.x,t.x);y==="TB"?t.x<s.x?d=`M ${t.x} ${t.y} L ${B-l} ${t.y} ${m} ${B} ${t.y+p} L ${B} ${s.y-l} ${n} ${B+p} ${s.y} L ${s.x} ${s.y}`:(g=(w=v.get(e.branch))==null?void 0:w.index,d=`M ${t.x} ${t.y} L ${B+l} ${t.y} ${n} ${B} ${t.y+p} L ${B} ${s.y-l} ${m} ${B-p} ${s.y} L ${s.x} ${s.y}`):y==="BT"?t.x<s.x?d=`M ${t.x} ${t.y} L ${B-l} ${t.y} ${n} ${B} ${t.y-p} L ${B} ${s.y+l} ${m} ${B+p} ${s.y} L ${s.x} ${s.y}`:(g=(O=v.get(e.branch))==null?void 0:O.index,d=`M ${t.x} ${t.y} L ${B+l} ${t.y} ${m} ${B} ${t.y-p} L ${B} ${s.y+l} ${n} ${B-p} ${s.y} L ${s.x} ${s.y}`):t.y<s.y?d=`M ${t.x} ${t.y} L ${t.x} ${L-l} ${n} ${t.x+p} ${L} L ${s.x-l} ${L} ${m} ${s.x} ${L+p} L ${s.x} ${s.y}`:(g=(S=v.get(e.branch))==null?void 0:S.index,d=`M ${t.x} ${t.y} L ${t.x} ${L+l} ${m} ${t.x+p} ${L} L ${s.x-l} ${L} ${n} ${s.x} ${L-p} L ${s.x} ${s.y}`)}else n="A 20 20, 0, 0, 0,",m="A 20 20, 0, 0, 1,",l=20,p=20,y==="TB"?(t.x<s.x&&(a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${t.x} ${s.y-l} ${n} ${t.x+p} ${s.y} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${s.x-l} ${t.y} ${m} ${s.x} ${t.y+p} L ${s.x} ${s.y}`),t.x>s.x&&(n="A 20 20, 0, 0, 0,",m="A 20 20, 0, 0, 1,",l=20,p=20,a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${t.x} ${s.y-l} ${m} ${t.x-p} ${s.y} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${s.x+l} ${t.y} ${n} ${s.x} ${t.y+p} L ${s.x} ${s.y}`),t.x===s.x&&(d=`M ${t.x} ${t.y} L ${s.x} ${s.y}`)):y==="BT"?(t.x<s.x&&(a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${t.x} ${s.y+l} ${m} ${t.x+p} ${s.y} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${s.x-l} ${t.y} ${n} ${s.x} ${t.y-p} L ${s.x} ${s.y}`),t.x>s.x&&(n="A 20 20, 0, 0, 0,",m="A 20 20, 0, 0, 1,",l=20,p=20,a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${t.x} ${s.y+l} ${n} ${t.x-p} ${s.y} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${s.x-l} ${t.y} ${n} ${s.x} ${t.y-p} L ${s.x} ${s.y}`),t.x===s.x&&(d=`M ${t.x} ${t.y} L ${s.x} ${s.y}`)):(t.y<s.y&&(a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${s.x-l} ${t.y} ${m} ${s.x} ${t.y+p} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${t.x} ${s.y-l} ${n} ${t.x+p} ${s.y} L ${s.x} ${s.y}`),t.y>s.y&&(a.type===$.MERGE&&e.id!==a.parents[0]?d=`M ${t.x} ${t.y} L ${s.x-l} ${t.y} ${n} ${s.x} ${t.y-p} L ${s.x} ${s.y}`:d=`M ${t.x} ${t.y} L ${t.x} ${s.y+l} ${m} ${t.x+p} ${s.y} L ${s.x} ${s.y}`),t.y===s.y&&(d=`M ${t.x} ${t.y} L ${s.x} ${s.y}`));if(d===void 0)throw new Error("Line definition not found");r.append("path").attr("d",d).attr("class","arrow arrow"+g%q)},"drawArrow"),et=h((r,e)=>{let a=r.append("g").attr("class","commit-arrows");[...e.keys()].forEach(o=>{let t=e.get(o);t.parents&&t.parents.length>0&&t.parents.forEach(s=>{Ue(a,e.get(s),t,e)})})},"drawArrows"),tt=h((r,e)=>{let a=r.append("g");e.forEach((o,t)=>{var x;let s=t%q,c=(x=v.get(o.name))==null?void 0:x.pos;if(c===void 0)throw new Error(`Position not found for branch ${o.name}`);let n=a.append("line");n.attr("x1",0),n.attr("y1",c),n.attr("x2",M),n.attr("y2",c),n.attr("class","branch branch"+s),y==="TB"?(n.attr("y1",D),n.attr("x1",c),n.attr("y2",M),n.attr("x2",c)):y==="BT"&&(n.attr("y1",M),n.attr("x1",c),n.attr("y2",D),n.attr("x2",c)),A.push(c);let m=o.name,l=pe(m),p=a.insert("rect"),d=a.insert("g").attr("class","branchLabel").insert("g").attr("class","label branch-label"+s);d.node().appendChild(l);let f=l.getBBox();p.attr("class","branchLabelBkg label"+s).attr("rx",4).attr("ry",4).attr("x",-f.width-4-((u==null?void 0:u.rotateCommitLabel)===!0?30:0)).attr("y",-f.height/2+8).attr("width",f.width+18).attr("height",f.height+4),d.attr("transform","translate("+(-f.width-14-((u==null?void 0:u.rotateCommitLabel)===!0?30:0))+", "+(c-f.height/2-1)+")"),y==="TB"?(p.attr("x",c-f.width/2-10).attr("y",0),d.attr("transform","translate("+(c-f.width/2-5)+", 0)")):y==="BT"?(p.attr("x",c-f.width/2-10).attr("y",M),d.attr("transform","translate("+(c-f.width/2-5)+", "+M+")")):p.attr("transform","translate(-19, "+(c-f.height/2)+")")})},"drawBranches"),rt=h(function(r,e,a,o,t){return v.set(r,{pos:e,index:a}),e+=50+(t?40:0)+(y==="TB"||y==="BT"?o.width/2:0),e},"setBranchPosition"),at=h(function(r,e,a,o){if(He(),b.debug("in gitgraph renderer",r+`
`,"id:",e,a),!u)throw new Error("GitGraph config not found");let t=u.rotateCommitLabel??!1,s=o.db;W=s.getCommits();let c=s.getBranchesAsObjArray();y=s.getDirection();let n=te(`[id="${e}"]`),m=0;c.forEach((l,p)=>{var O;let g=pe(l.name),d=n.append("g"),f=d.insert("g").attr("class","branchLabel"),x=f.insert("g").attr("class","label branch-label");(O=x.node())==null||O.appendChild(g);let w=g.getBBox();m=rt(l.name,m,p,w,t),x.remove(),f.remove(),d.remove()}),ie(n,W,!1),u.showBranches&&tt(n,c),et(n,W),ie(n,W,!0),se.insertTitle(n,"gitTitleText",u.titleTopMargin??0,s.getDiagramTitle()),ee(void 0,n,u.diagramPadding,u.useMaxWidth)},"draw"),st={draw:at},ot=h(r=>`
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0,1,2,3,4,5,6,7].map(e=>`
        .branch-label${e} { fill: ${r["gitBranchLabel"+e]}; }
        .commit${e} { stroke: ${r["git"+e]}; fill: ${r["git"+e]}; }
        .commit-highlight${e} { stroke: ${r["gitInv"+e]}; fill: ${r["gitInv"+e]}; }
        .label${e}  { fill: ${r["git"+e]}; }
        .arrow${e} { stroke: ${r["git"+e]}; }
        `).join(`
`)}

  .branch {
    stroke-width: 1;
    stroke: ${r.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelColor};}
  .commit-label-bkg { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${r.tagLabelFontSize}; fill: ${r.tagLabelColor};}
  .tag-label-bkg { fill: ${r.tagLabelBackground}; stroke: ${r.tagLabelBorder}; }
  .tag-hole { fill: ${r.textColor}; }

  .commit-merge {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }
  .commit-reverse {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${r.textColor};
  }
`,"getStyles"),nt=ot,pt={parser:Ae,db:me,renderer:st,styles:nt};export{pt as diagram};
