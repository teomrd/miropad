import{a as E}from"./chunk-IK46GUPQ.js";import{a as F}from"./chunk-ZRRBPBIX.js";import"./chunk-DPYVL4NA.js";import"./chunk-4BK4DWHS.js";import"./chunk-OYA272LE.js";import"./chunk-THOPA6SY.js";import"./chunk-PNCPETUH.js";import"./chunk-Y4YRJLBO.js";import{a as z}from"./chunk-MKC52KE3.js";import{l as w}from"./chunk-C5V5A4EQ.js";import"./chunk-W2UJOOQ7.js";import{L as y,P as $,Q as B,R as C,S,T as D,U as T,V as P,q as v,y as x}from"./chunk-MBS5FVM4.js";import{b as h,d as u}from"./chunk-RKLTPE72.js";import"./chunk-7NP4XUWF.js";import"./chunk-XDPYRWAS.js";import"./chunk-R77GKUCO.js";import"./chunk-EQENVWAF.js";import"./chunk-FFNH7GCV.js";import"./chunk-IPLMSLEG.js";var L=v.packet,m,A=(m=class{constructor(){this.packet=[],this.setAccTitle=B,this.getAccTitle=C,this.setDiagramTitle=T,this.getDiagramTitle=P,this.getAccDescription=D,this.setAccDescription=S}getConfig(){let t=w({...L,...x().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){$(),this.packet=[]}},h(m,"PacketDB"),m),M=1e4,Y=h((e,t)=>{E(e,t);let o=-1,a=[],n=1,{bitsPerRow:l}=t.getConfig();for(let{start:r,end:s,bits:d,label:c}of e.blocks){if(r!==void 0&&s!==void 0&&s<r)throw new Error(`Packet block ${r} - ${s} is invalid. End must be greater than start.`);if(r??(r=o+1),r!==o+1)throw new Error(`Packet block ${r} - ${s??r} is not contiguous. It should start from ${o+1}.`);if(d===0)throw new Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(s??(s=r+(d??1)-1),d??(d=s-r+1),o=s,u.debug(`Packet block ${r} - ${o} with label ${c}`);a.length<=l+1&&t.getPacket().length<M;){let[p,i]=I({start:r,end:s,bits:d,label:c},n,l);if(a.push(p),p.end+1===n*l&&(t.pushWord(a),a=[],n++),!i)break;({start:r,end:s,bits:d,label:c}=i)}}t.pushWord(a)},"populate"),I=h((e,t,o)=>{if(e.start===void 0)throw new Error("start should have been set during first phase");if(e.end===void 0)throw new Error("end should have been set during first phase");if(e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*o)return[e,void 0];let a=t*o-1,n=t*o;return[{start:e.start,end:a,label:e.label,bits:a-e.start},{start:n,end:e.end,label:e.label,bits:e.end-n}]},"getNextFittingBlock"),W={parser:{yy:void 0},parse:h(async e=>{var a;let t=await F("packet",e),o=(a=W.parser)==null?void 0:a.yy;if(!(o instanceof A))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");u.debug(t),Y(t,o)},"parse")},O=h((e,t,o,a)=>{let n=a.db,l=n.getConfig(),{rowHeight:r,paddingY:s,bitWidth:d,bitsPerRow:c}=l,p=n.getPacket(),i=n.getDiagramTitle(),f=r+s,g=f*(p.length+1)-(i?0:r),k=d*c+2,b=z(t);b.attr("viewbox",`0 0 ${k} ${g}`),y(b,g,k,l.useMaxWidth);for(let[_,N]of p.entries())j(b,N,_,l);b.append("text").text(i).attr("x",k/2).attr("y",g-f/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),j=h((e,t,o,{rowHeight:a,paddingX:n,paddingY:l,bitWidth:r,bitsPerRow:s,showBits:d})=>{let c=e.append("g"),p=o*(a+l)+l;for(let i of t){let f=i.start%s*r+1,g=(i.end-i.start+1)*r-n;if(c.append("rect").attr("x",f).attr("y",p).attr("width",g).attr("height",a).attr("class","packetBlock"),c.append("text").attr("x",f+g/2).attr("y",p+a/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(i.label),!d)continue;let k=i.end===i.start,b=p-2;c.append("text").attr("x",f+(k?g/2:0)).attr("y",b).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(i.start),k||c.append("text").attr("x",f+g).attr("y",b).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(i.end)}},"drawWord"),G={draw:O},H={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},K=h(({packet:e}={})=>{let t=w(H,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},"styles"),V={parser:W,get db(){return new A},renderer:G,styles:K};export{V as diagram};
