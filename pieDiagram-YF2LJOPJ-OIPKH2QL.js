import{a as q}from"./chunk-PWSVZSPK.js";import{a as H}from"./chunk-QTRW4TAT.js";import"./chunk-E4JS2JSG.js";import"./chunk-WZ327HTW.js";import"./chunk-BXVLC2RA.js";import{a as j}from"./chunk-SFY74CKZ.js";import{k as V,l as Z}from"./chunk-MGXIVZEI.js";import"./chunk-TSL5KNHW.js";import{Da as D,Ga as U,O as G,S as O,T as W,U as M,V as P,W as R,X as I,Y as L,Z as N,h as i,j as m,ka as B,v as F}from"./chunk-HJPNRYHP.js";import"./chunk-ZD24GIZA.js";import"./chunk-RW2WCYL6.js";import"./chunk-MYATPW36.js";import"./chunk-R77GKUCO.js";import"./chunk-EQENVWAF.js";import"./chunk-FFNH7GCV.js";import"./chunk-OHVK2FCB.js";var J=F.pie,w={sections:new Map,showData:!1,config:J},h=w.sections,y=w.showData,oe=structuredClone(J),ne=i(()=>structuredClone(oe),"getConfig"),se=i(()=>{h=new Map,y=w.showData,O()},"clear"),le=i(({label:e,value:a})=>{h.has(e)||(h.set(e,a),m.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>h,"getSections"),pe=i(e=>{y=e},"setShowData"),de=i(()=>y,"getShowData"),K={getConfig:ne,clear:se,setDiagramTitle:I,getDiagramTitle:L,setAccTitle:W,getAccTitle:M,setAccDescription:P,getAccDescription:R,addSection:le,getSections:ce,setShowData:pe,getShowData:de},ge=i((e,a)=>{q(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),fe={parse:i(async e=>{let a=await H("pie",e);m.debug(a),ge(a,K)},"parse")},ue=i(e=>`
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
`,"getStyles"),me=ue,he=i(e=>{let a=[...e.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,s)=>s.value-o.value);return U().value(o=>o.value)(a)},"createPieArcs"),Se=i((e,a,Q,o)=>{m.debug(`rendering pie chart
`+e);let s=o.db,T=N(),$=Z(s.getConfig(),T.pie),A=40,n=18,d=4,l=450,S=l,v=j(a),c=v.append("g");c.attr("transform","translate("+S/2+","+l/2+")");let{themeVariables:r}=T,[_]=V(r.pieOuterStrokeWidth);_??(_=2);let E=$.textPosition,g=Math.min(S,l)/2-A,X=D().innerRadius(0).outerRadius(g),Y=D().innerRadius(g*E).outerRadius(g*E);c.append("circle").attr("cx",0).attr("cy",0).attr("r",g+_/2).attr("class","pieOuterCircle");let b=s.getSections(),x=he(b),ee=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],p=B(ee);c.selectAll("mySlices").data(x).enter().append("path").attr("d",X).attr("fill",t=>p(t.data.label)).attr("class","pieCircle");let k=0;b.forEach(t=>{k+=t}),c.selectAll("mySlices").data(x).enter().append("text").text(t=>(t.data.value/k*100).toFixed(0)+"%").attr("transform",t=>"translate("+Y.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(l-50)/2).attr("class","pieTitleText");let C=c.selectAll(".legend").data(p.domain()).enter().append("g").attr("class","legend").attr("transform",(t,f)=>{let u=n+d,ae=u*p.domain().length/2,re=12*n,ie=f*u-ae;return"translate("+re+","+ie+")"});C.append("rect").attr("width",n).attr("height",n).style("fill",p).style("stroke",p),C.data(x).append("text").attr("x",n+d).attr("y",n-d).text(t=>{let{label:f,value:u}=t.data;return s.getShowData()?`${f} [${u}]`:f});let te=Math.max(...C.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),z=S+A+n+d+te;v.attr("viewBox",`0 0 ${z} ${l}`),G(v,l,z,$.useMaxWidth)},"draw"),ve={draw:Se},$e={parser:fe,db:K,renderer:ve,styles:me};export{$e as diagram};
