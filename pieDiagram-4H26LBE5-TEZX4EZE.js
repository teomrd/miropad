import{a as Q}from"./chunk-ZBLHENYM.js";import{a as Y}from"./chunk-7PW546UH.js";import"./chunk-7UOSIG2A.js";import"./chunk-EWVP74XA.js";import"./chunk-S6D6ESSN.js";import"./chunk-WJWX2NGG.js";import"./chunk-6FWKRXLW.js";import"./chunk-SKTRQOCB.js";import"./chunk-43DYGINW.js";import"./chunk-JE5BDALK.js";import"./chunk-WKEEQPPD.js";import{a as H}from"./chunk-UUEI6HFM.js";import{n as J,o as K}from"./chunk-EO7JUGGV.js";import"./chunk-CUKP4ZJF.js";import{O,T as B,U as P,V as I,W as N,X as U,Y as V,Z as X,_ as Z,r as L}from"./chunk-6M25QXGX.js";import{H as C,K as q,b as o,d as h,o as j}from"./chunk-IF3APW4J.js";import"./chunk-W2AX7VSJ.js";import"./chunk-UTVFIANT.js";import"./chunk-JC2BH436.js";var tt=L.pie,D={sections:new Map,showData:!1,config:tt},u=D.sections,y=D.showData,ht=structuredClone(tt),ut=o(()=>structuredClone(ht),"getConfig"),mt=o(()=>{u=new Map,y=D.showData,B()},"clear"),vt=o(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);u.has(t)||(u.set(t,a),h.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),xt=o(()=>u,"getSections"),St=o(t=>{y=t},"setShowData"),wt=o(()=>y,"getShowData"),et={getConfig:ut,clear:mt,setDiagramTitle:V,getDiagramTitle:X,setAccTitle:P,getAccTitle:I,setAccDescription:N,getAccDescription:U,addSection:vt,getSections:xt,setShowData:St,getShowData:wt},Ct=o((t,a)=>{Q(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),Dt={parse:o(async t=>{let a=await Y("pie",t);h.debug(a),Ct(a,et)},"parse")},yt=o(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),$t=yt,Tt=o(t=>{let a=[...t.values()].reduce((r,l)=>r+l,0),$=[...t.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1);return q().value(r=>r.value).sort(null)($)},"createPieArcs"),At=o((t,a,$,T)=>{var M;h.debug(`rendering pie chart
`+t);let r=T.db,l=Z(),A=K(r.getConfig(),l.pie),b=40,n=18,p=4,s=450,d=s,m=H(a),c=m.append("g");c.attr("transform","translate("+d/2+","+s/2+")");let{themeVariables:i}=l,[E]=J(i.pieOuterStrokeWidth);E??(E=2);let _=A.textPosition,g=Math.min(d,s)/2-b,at=C().innerRadius(0).outerRadius(g),it=C().innerRadius(g*_).outerRadius(g*_);c.append("circle").attr("cx",0).attr("cy",0).attr("r",g+E/2).attr("class","pieOuterCircle");let f=r.getSections(),rt=Tt(f),ot=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12],v=0;f.forEach(e=>{v+=e});let k=rt.filter(e=>(e.data.value/v*100).toFixed(0)!=="0"),x=j(ot).domain([...f.keys()]);c.selectAll("mySlices").data(k).enter().append("path").attr("d",at).attr("fill",e=>x(e.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(k).enter().append("text").text(e=>(e.data.value/v*100).toFixed(0)+"%").attr("transform",e=>"translate("+it.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let nt=c.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-(s-50)/2).attr("class","pieTitleText"),R=[...f.entries()].map(([e,w])=>({label:e,value:w})),S=c.selectAll(".legend").data(R).enter().append("g").attr("class","legend").attr("transform",(e,w)=>{let G=n+p,pt=G*R.length/2,gt=12*n,ft=w*G-pt;return"translate("+gt+","+ft+")"});S.append("rect").attr("width",n).attr("height",n).style("fill",e=>x(e.label)).style("stroke",e=>x(e.label)),S.append("text").attr("x",n+p).attr("y",n-p).text(e=>r.getShowData()?`${e.label} [${e.value}]`:e.label);let lt=Math.max(...S.selectAll("text").nodes().map(e=>(e==null?void 0:e.getBoundingClientRect().width)??0)),st=d+b+n+p+lt,W=((M=nt.node())==null?void 0:M.getBoundingClientRect().width)??0,ct=d/2-W/2,dt=d/2+W/2,z=Math.min(0,ct),F=Math.max(st,dt)-z;m.attr("viewBox",`${z} 0 ${F} ${s}`),O(m,s,F,A.useMaxWidth)},"draw"),bt={draw:At},Gt={parser:Dt,db:et,renderer:bt,styles:$t};export{Gt as diagram};
