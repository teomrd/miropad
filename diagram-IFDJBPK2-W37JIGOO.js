import{a as F}from"./chunk-23QAAC7L.js";import{a as _}from"./chunk-I2YXLRRQ.js";import"./chunk-LYZZOZUX.js";import"./chunk-42RFUPSW.js";import"./chunk-Z33UE4NQ.js";import"./chunk-4OZ6P3SF.js";import"./chunk-EKZ37VO3.js";import"./chunk-262NY26K.js";import{a as E}from"./chunk-OJKXVG7M.js";import{l as y}from"./chunk-XN4MGD5H.js";import"./chunk-D4YYYJBQ.js";import{A as C,N as A,R as L,S as T,T as S,U as O,V as k,W as R,X as I,p as b,r as M}from"./chunk-FMVEHQKI.js";import{b as l,d as w}from"./chunk-X6Z2QEFE.js";import"./chunk-7PVFIGWJ.js";import"./chunk-6Y6ZFVLJ.js";import"./chunk-P6AGGJGB.js";import"./chunk-H65FXATI.js";import"./chunk-HIVBJXE7.js";import"./chunk-WIER4IGQ.js";var x={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},D={axes:[],curves:[],options:x},g=structuredClone(D),j=M.radar,N=l(()=>y({...j,...C().radar}),"getConfig"),z=l(()=>g.axes,"getAxes"),U=l(()=>g.curves,"getCurves"),X=l(()=>g.options,"getOptions"),Y=l(a=>{g.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),Z=l(a=>{g.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:q(t.entries)}))},"setCurves"),q=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);let t=z();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{let r=a.find(n=>{var o;return((o=n.axis)==null?void 0:o.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),J=l(a=>{var e,r,n,o,i;let t=a.reduce((s,c)=>(s[c.name]=c,s),{});g.options={showLegend:((e=t.showLegend)==null?void 0:e.value)??x.showLegend,ticks:((r=t.ticks)==null?void 0:r.value)??x.ticks,max:((n=t.max)==null?void 0:n.value)??x.max,min:((o=t.min)==null?void 0:o.value)??x.min,graticule:((i=t.graticule)==null?void 0:i.value)??x.graticule}},"setOptions"),K=l(()=>{L(),g=structuredClone(D)},"clear"),$={getAxes:z,getCurves:U,getOptions:X,setAxes:Y,setCurves:Z,setOptions:J,getConfig:N,clear:K,setAccTitle:T,getAccTitle:S,setDiagramTitle:R,getDiagramTitle:I,getAccDescription:k,setAccDescription:O},Q=l(a=>{F(a,$);let{axes:t,curves:e,options:r}=a;$.setAxes(t),$.setCurves(e),$.setOptions(r)},"populate"),tt={parse:l(async a=>{let t=await _("radar",a);w.debug(t),Q(t)},"parse")},et=l((a,t,e,r)=>{let n=r.db,o=n.getAxes(),i=n.getCurves(),s=n.getOptions(),c=n.getConfig(),d=n.getDiagramTitle(),p=E(t),u=at(p,c),m=s.max??Math.max(...i.map(f=>Math.max(...f.entries))),h=s.min,v=Math.min(c.width,c.height)/2;rt(u,o,v,s.ticks,s.graticule),nt(u,o,v,c),G(u,o,i,h,m,s.graticule,c),B(u,i,s.showLegend,c),u.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),at=l((a,t)=>{let e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,n={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return A(a,r,e,t.useMaxWidth??!0),a.attr("viewBox",`0 0 ${e} ${r}`),a.append("g").attr("transform",`translate(${n.x}, ${n.y})`)},"drawFrame"),rt=l((a,t,e,r,n)=>{if(n==="circle")for(let o=0;o<r;o++){let i=e*(o+1)/r;a.append("circle").attr("r",i).attr("class","radarGraticule")}else if(n==="polygon"){let o=t.length;for(let i=0;i<r;i++){let s=e*(i+1)/r,c=t.map((d,p)=>{let u=2*p*Math.PI/o-Math.PI/2,m=s*Math.cos(u),h=s*Math.sin(u);return`${m},${h}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),nt=l((a,t,e,r)=>{let n=t.length;for(let o=0;o<n;o++){let i=t[o].label,s=2*o*Math.PI/n-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(i).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function G(a,t,e,r,n,o,i){let s=t.length,c=Math.min(i.width,i.height)/2;e.forEach((d,p)=>{if(d.entries.length!==s)return;let u=d.entries.map((m,h)=>{let v=2*Math.PI*h/s-Math.PI/2,f=P(m,r,n,c),V=f*Math.cos(v),H=f*Math.sin(v);return{x:V,y:H}});o==="circle"?a.append("path").attr("d",W(u,i.curveTension)).attr("class",`radarCurve-${p}`):o==="polygon"&&a.append("polygon").attr("points",u.map(m=>`${m.x},${m.y}`).join(" ")).attr("class",`radarCurve-${p}`)})}l(G,"drawCurves");function P(a,t,e,r){let n=Math.min(Math.max(a,t),e);return r*(n-t)/(e-t)}l(P,"relativeRadius");function W(a,t){let e=a.length,r=`M${a[0].x},${a[0].y}`;for(let n=0;n<e;n++){let o=a[(n-1+e)%e],i=a[n],s=a[(n+1)%e],c=a[(n+2)%e],d={x:i.x+(s.x-o.x)*t,y:i.y+(s.y-o.y)*t},p={x:s.x-(c.x-i.x)*t,y:s.y-(c.y-i.y)*t};r+=` C${d.x},${d.y} ${p.x},${p.y} ${s.x},${s.y}`}return`${r} Z`}l(W,"closedRoundCurve");function B(a,t,e,r){if(!e)return;let n=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,i=20;t.forEach((s,c)=>{let d=a.append("g").attr("transform",`translate(${n}, ${o+c*i})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(B,"drawLegend");var st={draw:et},ot=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){let n=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${n};
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
		}
		`}return e},"genIndexStyles"),it=l(a=>{let t=b(),e=C(),r=y(t,e.themeVariables),n=y(r.radar,a);return{themeVariables:r,radarOptions:n}},"buildRadarStyleOptions"),lt=l(({radar:a}={})=>{let{themeVariables:t,radarOptions:e}=it(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${ot(t,e)}
	`},"styles"),xt={parser:tt,db:$,renderer:st,styles:lt};export{xt as diagram};
