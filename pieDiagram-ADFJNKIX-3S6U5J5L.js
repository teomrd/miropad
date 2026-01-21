import{a as J}from"./chunk-IK46GUPQ.js";import{a as K}from"./chunk-ZRRBPBIX.js";import"./chunk-DPYVL4NA.js";import"./chunk-4BK4DWHS.js";import"./chunk-OYA272LE.js";import"./chunk-THOPA6SY.js";import"./chunk-PNCPETUH.js";import"./chunk-Y4YRJLBO.js";import{a as j}from"./chunk-MKC52KE3.js";import{k as q,l as H}from"./chunk-C5V5A4EQ.js";import"./chunk-W2UJOOQ7.js";import{L as W,P as M,Q as P,R,S as I,T as L,U as N,V as B,W as U,q as O}from"./chunk-MBS5FVM4.js";import{H as C,K as Z,b as l,d as g,o as V}from"./chunk-RKLTPE72.js";import"./chunk-7NP4XUWF.js";import"./chunk-XDPYRWAS.js";import"./chunk-R77GKUCO.js";import"./chunk-EQENVWAF.js";import"./chunk-FFNH7GCV.js";import"./chunk-IPLMSLEG.js";var Q=O.pie,D={sections:new Map,showData:!1,config:Q},f=D.sections,y=D.showData,se=structuredClone(Q),ne=l(()=>structuredClone(se),"getConfig"),ce=l(()=>{f=new Map,y=D.showData,M()},"clear"),pe=l(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);f.has(e)||(f.set(e,a),g.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=l(()=>f,"getSections"),ge=l(e=>{y=e},"setShowData"),fe=l(()=>y,"getShowData"),X={getConfig:ne,clear:ce,setDiagramTitle:N,getDiagramTitle:B,setAccTitle:P,getAccTitle:R,setAccDescription:I,getAccDescription:L,addSection:pe,getSections:de,setShowData:ge,getShowData:fe},ue=l((e,a)=>{J(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),me={parse:l(async e=>{let a=await K("pie",e);g.debug(a),ue(a,X)},"parse")},he=l(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=he,Se=l(e=>{let a=[...e.values()].reduce((r,o)=>r+o,0),$=[...e.entries()].map(([r,o])=>({label:r,value:o})).filter(r=>r.value/a*100>=1).sort((r,o)=>o.value-r.value);return Z().value(r=>r.value)($)},"createPieArcs"),xe=l((e,a,$,T)=>{g.debug(`rendering pie chart
`+e);let r=T.db,o=U(),A=H(r.getConfig(),o.pie),b=40,s=18,p=4,n=450,u=n,m=j(a),c=m.append("g");c.attr("transform","translate("+u/2+","+n/2+")");let{themeVariables:i}=o,[E]=q(i.pieOuterStrokeWidth);E??(E=2);let _=A.textPosition,d=Math.min(u,n)/2-b,Y=C().innerRadius(0).outerRadius(d),ee=C().innerRadius(d*_).outerRadius(d*_);c.append("circle").attr("cx",0).attr("cy",0).attr("r",d+E/2).attr("class","pieOuterCircle");let h=r.getSections(),te=Se(h),ae=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12],v=0;h.forEach(t=>{v+=t});let k=te.filter(t=>(t.data.value/v*100).toFixed(0)!=="0"),S=V(ae);c.selectAll("mySlices").data(k).enter().append("path").attr("d",Y).attr("fill",t=>S(t.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(k).enter().append("text").text(t=>(t.data.value/v*100).toFixed(0)+"%").attr("transform",t=>"translate("+ee.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-(n-50)/2).attr("class","pieTitleText");let z=[...h.entries()].map(([t,w])=>({label:t,value:w})),x=c.selectAll(".legend").data(z).enter().append("g").attr("class","legend").attr("transform",(t,w)=>{let G=s+p,ie=G*z.length/2,le=12*s,oe=w*G-ie;return"translate("+le+","+oe+")"});x.append("rect").attr("width",s).attr("height",s).style("fill",t=>S(t.label)).style("stroke",t=>S(t.label)),x.append("text").attr("x",s+p).attr("y",s-p).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);let re=Math.max(...x.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),F=u+b+s+p+re;m.attr("viewBox",`0 0 ${F} ${n}`),W(m,n,F,A.useMaxWidth)},"draw"),we={draw:xe},Ee={parser:me,db:X,renderer:we,styles:ve};export{Ee as diagram};
