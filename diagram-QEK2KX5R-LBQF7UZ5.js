import{a as E}from"./chunk-IK46GUPQ.js";import{a as F}from"./chunk-ZRRBPBIX.js";import"./chunk-DPYVL4NA.js";import"./chunk-4BK4DWHS.js";import"./chunk-OYA272LE.js";import"./chunk-THOPA6SY.js";import"./chunk-PNCPETUH.js";import"./chunk-Y4YRJLBO.js";import{a as I}from"./chunk-MKC52KE3.js";import{l as y}from"./chunk-C5V5A4EQ.js";import"./chunk-W2UJOOQ7.js";import{P as A,Q as L,R as T,S as O,T as S,U as k,V as R,o as b,q as M,y as C}from"./chunk-MBS5FVM4.js";import{b as l,d as w}from"./chunk-RKLTPE72.js";import"./chunk-7NP4XUWF.js";import"./chunk-XDPYRWAS.js";import"./chunk-R77GKUCO.js";import"./chunk-EQENVWAF.js";import"./chunk-FFNH7GCV.js";import"./chunk-IPLMSLEG.js";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},_={axes:[],curves:[],options:h},m=structuredClone(_),H=M.radar,j=l(()=>y({...H,...C().radar}),"getConfig"),D=l(()=>m.axes,"getAxes"),N=l(()=>m.curves,"getCurves"),U=l(()=>m.options,"getOptions"),X=l(a=>{m.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),Y=l(a=>{m.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:Z(t.entries)}))},"setCurves"),Z=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);let t=D();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{let r=a.find(n=>{var o;return((o=n.axis)==null?void 0:o.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),q=l(a=>{var e,r,n,o,i;let t=a.reduce((s,c)=>(s[c.name]=c,s),{});m.options={showLegend:((e=t.showLegend)==null?void 0:e.value)??h.showLegend,ticks:((r=t.ticks)==null?void 0:r.value)??h.ticks,max:((n=t.max)==null?void 0:n.value)??h.max,min:((o=t.min)==null?void 0:o.value)??h.min,graticule:((i=t.graticule)==null?void 0:i.value)??h.graticule}},"setOptions"),J=l(()=>{A(),m=structuredClone(_)},"clear"),$={getAxes:D,getCurves:N,getOptions:U,setAxes:X,setCurves:Y,setOptions:q,getConfig:j,clear:J,setAccTitle:L,getAccTitle:T,setDiagramTitle:k,getDiagramTitle:R,getAccDescription:S,setAccDescription:O},K=l(a=>{E(a,$);let{axes:t,curves:e,options:r}=a;$.setAxes(t),$.setCurves(e),$.setOptions(r)},"populate"),Q={parse:l(async a=>{let t=await F("radar",a);w.debug(t),K(t)},"parse")},tt=l((a,t,e,r)=>{let n=r.db,o=n.getAxes(),i=n.getCurves(),s=n.getOptions(),c=n.getConfig(),d=n.getDiagramTitle(),p=I(t),u=et(p,c),g=s.max??Math.max(...i.map(f=>Math.max(...f.entries))),x=s.min,v=Math.min(c.width,c.height)/2;at(u,o,v,s.ticks,s.graticule),rt(u,o,v,c),G(u,o,i,x,g,s.graticule,c),V(u,i,s.showLegend,c),u.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{let e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,n={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${n.x}, ${n.y})`)},"drawFrame"),at=l((a,t,e,r,n)=>{if(n==="circle")for(let o=0;o<r;o++){let i=e*(o+1)/r;a.append("circle").attr("r",i).attr("class","radarGraticule")}else if(n==="polygon"){let o=t.length;for(let i=0;i<r;i++){let s=e*(i+1)/r,c=t.map((d,p)=>{let u=2*p*Math.PI/o-Math.PI/2,g=s*Math.cos(u),x=s*Math.sin(u);return`${g},${x}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{let n=t.length;for(let o=0;o<n;o++){let i=t[o].label,s=2*o*Math.PI/n-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(i).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function G(a,t,e,r,n,o,i){let s=t.length,c=Math.min(i.width,i.height)/2;e.forEach((d,p)=>{if(d.entries.length!==s)return;let u=d.entries.map((g,x)=>{let v=2*Math.PI*x/s-Math.PI/2,f=P(g,r,n,c),W=f*Math.cos(v),B=f*Math.sin(v);return{x:W,y:B}});o==="circle"?a.append("path").attr("d",z(u,i.curveTension)).attr("class",`radarCurve-${p}`):o==="polygon"&&a.append("polygon").attr("points",u.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${p}`)})}l(G,"drawCurves");function P(a,t,e,r){let n=Math.min(Math.max(a,t),e);return r*(n-t)/(e-t)}l(P,"relativeRadius");function z(a,t){let e=a.length,r=`M${a[0].x},${a[0].y}`;for(let n=0;n<e;n++){let o=a[(n-1+e)%e],i=a[n],s=a[(n+1)%e],c=a[(n+2)%e],d={x:i.x+(s.x-o.x)*t,y:i.y+(s.y-o.y)*t},p={x:s.x-(c.x-i.x)*t,y:s.y-(c.y-i.y)*t};r+=` C${d.x},${d.y} ${p.x},${p.y} ${s.x},${s.y}`}return`${r} Z`}l(z,"closedRoundCurve");function V(a,t,e,r){if(!e)return;let n=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,i=20;t.forEach((s,c)=>{let d=a.append("g").attr("transform",`translate(${n}, ${o+c*i})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(V,"drawLegend");var nt={draw:tt},st=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){let n=a[`cScale${r}`];e+=`
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
		`}return e},"genIndexStyles"),ot=l(a=>{let t=b(),e=C(),r=y(t,e.themeVariables),n=y(r.radar,a);return{themeVariables:r,radarOptions:n}},"buildRadarStyleOptions"),it=l(({radar:a}={})=>{let{themeVariables:t,radarOptions:e}=ot(a);return`
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
	${st(t,e)}
	`},"styles"),mt={parser:Q,db:$,renderer:nt,styles:it};export{mt as diagram};
