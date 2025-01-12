import{f as a}from"./chunk-MYATPW36.js";var i={},n={info:a(async()=>{let{createInfoServices:r}=await import("./info-46DW6VJ7-OKG33XIR.js"),e=r().Info.parser.LangiumParser;i.info=e},"info"),packet:a(async()=>{let{createPacketServices:r}=await import("./packet-W2GHVCYJ-2Q35R5XT.js"),e=r().Packet.parser.LangiumParser;i.packet=e},"packet"),pie:a(async()=>{let{createPieServices:r}=await import("./pie-BEWT4RHE-5ZOEIEIW.js"),e=r().Pie.parser.LangiumParser;i.pie=e},"pie"),architecture:a(async()=>{let{createArchitectureServices:r}=await import("./architecture-I3QFYML2-CQVYAQ3T.js"),e=r().Architecture.parser.LangiumParser;i.architecture=e},"architecture"),gitGraph:a(async()=>{let{createGitGraphServices:r}=await import("./gitGraph-YCYPL57B-PW47INTF.js"),e=r().GitGraph.parser.LangiumParser;i.gitGraph=e},"gitGraph")};async function p(r,e){let s=n[r];if(!s)throw new Error(`Unknown diagram type: ${r}`);i[r]||await s();let t=i[r].parse(e);if(t.lexerErrors.length>0||t.parserErrors.length>0)throw new m(t);return t.value}a(p,"parse");var c,m=(c=class extends Error{constructor(e){let s=e.lexerErrors.map(t=>t.message).join(`
`),o=e.parserErrors.map(t=>t.message).join(`
`);super(`Parsing failed: ${s} ${o}`),this.result=e}},a(c,"MermaidParseError"),c);export{p as a};