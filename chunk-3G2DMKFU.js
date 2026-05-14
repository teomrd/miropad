import{a as Mt}from"./chunk-YENXIWDG.js";import{a as Ut}from"./chunk-E5A77IR6.js";import{b as Vt}from"./chunk-WWQJHRV4.js";import{g as Gt,p as Yt}from"./chunk-EO7JUGGV.js";import{N as W,T as Rt,U as Nt,V as wt,W as $t,X as Pt,Y as Ft,Z as Bt,_ as w}from"./chunk-6M25QXGX.js";import{b as d,d as _}from"./chunk-IF3APW4J.js";var Ct=(function(){var t=d(function(U,o,h,n){for(h=h||{},n=U.length;n--;h[U[n]]=o);return h},"o"),e=[1,2],s=[1,3],a=[1,4],i=[2,4],c=[1,9],u=[1,11],p=[1,16],S=[1,17],T=[1,18],b=[1,19],k=[1,33],L=[1,20],v=[1,21],O=[1,22],$=[1,23],C=[1,24],f=[1,26],D=[1,27],P=[1,28],B=[1,29],R=[1,30],G=[1,31],F=[1,32],at=[1,35],nt=[1,36],ot=[1,37],lt=[1,38],X=[1,34],y=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ct=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],Lt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],Tt={trace:d(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:d(function(o,h,n,g,E,r,J){var l=r.length-1;switch(E){case 3:return g.setRootDoc(r[l]),r[l];break;case 4:this.$=[];break;case 5:r[l]!="nl"&&(r[l-1].push(r[l]),this.$=r[l-1]);break;case 6:case 7:this.$=r[l];break;case 8:this.$="nl";break;case 12:this.$=r[l];break;case 13:let ut=r[l-1];ut.description=g.trimColon(r[l]),this.$=ut;break;case 14:this.$={stmt:"relation",state1:r[l-2],state2:r[l]};break;case 15:let dt=g.trimColon(r[l]);this.$={stmt:"relation",state1:r[l-3],state2:r[l-1],description:dt};break;case 19:this.$={stmt:"state",id:r[l-3],type:"default",description:"",doc:r[l-1]};break;case 20:var Y=r[l],V=r[l-2].trim();if(r[l].match(":")){var tt=r[l].split(":");Y=tt[0],V=[V,tt[1]]}this.$={stmt:"state",id:Y,type:"default",description:V};break;case 21:this.$={stmt:"state",id:r[l-3],type:"default",description:r[l-5],doc:r[l-1]};break;case 22:this.$={stmt:"state",id:r[l],type:"fork"};break;case 23:this.$={stmt:"state",id:r[l],type:"join"};break;case 24:this.$={stmt:"state",id:r[l],type:"choice"};break;case 25:this.$={stmt:"state",id:g.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:r[l-1].trim(),note:{position:r[l-2].trim(),text:r[l].trim()}};break;case 29:this.$=r[l].trim(),g.setAccTitle(this.$);break;case 30:case 31:this.$=r[l].trim(),g.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:r[l-3],url:r[l-2],tooltip:r[l-1]};break;case 33:this.$={stmt:"click",id:r[l-3],url:r[l-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:r[l-1].trim(),classes:r[l].trim()};break;case 36:this.$={stmt:"style",id:r[l-1].trim(),styleClass:r[l].trim()};break;case 37:this.$={stmt:"applyClass",id:r[l-1].trim(),styleClass:r[l].trim()};break;case 38:g.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:g.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:g.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:g.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:r[l].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:r[l-2].trim(),classes:[r[l].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:r[l-2].trim(),classes:[r[l].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:s,6:a},{1:[3]},{3:5,4:e,5:s,6:a},{3:6,4:e,5:s,6:a},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],i,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:c,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:p,17:S,19:T,22:b,24:k,25:L,26:v,27:O,28:$,29:C,32:25,33:f,35:D,37:P,38:B,41:R,45:G,48:F,51:at,52:nt,53:ot,54:lt,57:X},t(y,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:p,17:S,19:T,22:b,24:k,25:L,26:v,27:O,28:$,29:C,32:25,33:f,35:D,37:P,38:B,41:R,45:G,48:F,51:at,52:nt,53:ot,54:lt,57:X},t(y,[2,7]),t(y,[2,8]),t(y,[2,9]),t(y,[2,10]),t(y,[2,11]),t(y,[2,12],{14:[1,40],15:[1,41]}),t(y,[2,16]),{18:[1,42]},t(y,[2,18],{20:[1,43]}),{23:[1,44]},t(y,[2,22]),t(y,[2,23]),t(y,[2,24]),t(y,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(y,[2,28]),{34:[1,49]},{36:[1,50]},t(y,[2,31]),{13:51,24:k,57:X},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(ct,[2,44],{58:[1,56]}),t(ct,[2,45],{58:[1,57]}),t(y,[2,38]),t(y,[2,39]),t(y,[2,40]),t(y,[2,41]),t(y,[2,6]),t(y,[2,13]),{13:58,24:k,57:X},t(y,[2,17]),t(Lt,i,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(y,[2,29]),t(y,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(y,[2,14],{14:[1,71]}),{4:c,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:p,17:S,19:T,21:[1,72],22:b,24:k,25:L,26:v,27:O,28:$,29:C,32:25,33:f,35:D,37:P,38:B,41:R,45:G,48:F,51:at,52:nt,53:ot,54:lt,57:X},t(y,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(y,[2,34]),t(y,[2,35]),t(y,[2,36]),t(y,[2,37]),t(ct,[2,46]),t(ct,[2,47]),t(y,[2,15]),t(y,[2,19]),t(Lt,i,{7:78}),t(y,[2,26]),t(y,[2,27]),{5:[1,79]},{5:[1,80]},{4:c,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:p,17:S,19:T,21:[1,81],22:b,24:k,25:L,26:v,27:O,28:$,29:C,32:25,33:f,35:D,37:P,38:B,41:R,45:G,48:F,51:at,52:nt,53:ot,54:lt,57:X},t(y,[2,32]),t(y,[2,33]),t(y,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:d(function(o,h){if(h.recoverable)this.trace(o);else{var n=new Error(o);throw n.hash=h,n}},"parseError"),parse:d(function(o){var h=this,n=[0],g=[],E=[null],r=[],J=this.table,l="",Y=0,V=0,tt=0,ut=2,dt=1,ue=r.slice.call(arguments,1),m=Object.create(this.lexer),H={yy:{}};for(var Et in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Et)&&(H.yy[Et]=this.yy[Et]);m.setInput(o,H.yy),H.yy.lexer=m,H.yy.parser=this,typeof m.yylloc>"u"&&(m.yylloc={});var bt=m.yylloc;r.push(bt);var de=m.options&&m.options.ranges;typeof H.yy.parseError=="function"?this.parseError=H.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function fe(I){n.length=n.length-2*I,E.length=E.length-I,r.length=r.length-I}d(fe,"popStack");function Ot(){var I;return I=g.pop()||m.lex()||dt,typeof I!="number"&&(I instanceof Array&&(g=I,I=g.pop()),I=h.symbols_[I]||I),I}d(Ot,"lex");for(var A,_t,z,N,Ge,kt,q={},ft,M,It,pt;;){if(z=n[n.length-1],this.defaultActions[z]?N=this.defaultActions[z]:((A===null||typeof A>"u")&&(A=Ot()),N=J[z]&&J[z][A]),typeof N>"u"||!N.length||!N[0]){var mt="";pt=[];for(ft in J[z])this.terminals_[ft]&&ft>ut&&pt.push("'"+this.terminals_[ft]+"'");m.showPosition?mt="Parse error on line "+(Y+1)+`:
`+m.showPosition()+`
Expecting `+pt.join(", ")+", got '"+(this.terminals_[A]||A)+"'":mt="Parse error on line "+(Y+1)+": Unexpected "+(A==dt?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(mt,{text:m.match,token:this.terminals_[A]||A,line:m.yylineno,loc:bt,expected:pt})}if(N[0]instanceof Array&&N.length>1)throw new Error("Parse Error: multiple actions possible at state: "+z+", token: "+A);switch(N[0]){case 1:n.push(A),E.push(m.yytext),r.push(m.yylloc),n.push(N[1]),A=null,_t?(A=_t,_t=null):(V=m.yyleng,l=m.yytext,Y=m.yylineno,bt=m.yylloc,tt>0&&tt--);break;case 2:if(M=this.productions_[N[1]][1],q.$=E[E.length-M],q._$={first_line:r[r.length-(M||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(M||1)].first_column,last_column:r[r.length-1].last_column},de&&(q._$.range=[r[r.length-(M||1)].range[0],r[r.length-1].range[1]]),kt=this.performAction.apply(q,[l,V,Y,H.yy,N[1],E,r].concat(ue)),typeof kt<"u")return kt;M&&(n=n.slice(0,-1*M*2),E=E.slice(0,-1*M),r=r.slice(0,-1*M)),n.push(this.productions_[N[1]][0]),E.push(q.$),r.push(q._$),It=J[n[n.length-2]][n[n.length-1]],n.push(It);break;case 3:return!0}}return!0},"parse")},he=(function(){var U={EOF:1,parseError:d(function(h,n){if(this.yy.parser)this.yy.parser.parseError(h,n);else throw new Error(h)},"parseError"),setInput:d(function(o,h){return this.yy=h||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:d(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var h=o.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:d(function(o){var h=o.length,n=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var E=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===g.length?this.yylloc.first_column:0)+g[g.length-n.length].length-n[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[E[0],E[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},"unput"),more:d(function(){return this._more=!0,this},"more"),reject:d(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:d(function(o){this.unput(this.match.slice(o))},"less"),pastInput:d(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:d(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:d(function(){var o=this.pastInput(),h=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+h+"^"},"showPosition"),test_match:d(function(o,h){var n,g,E;if(this.options.backtrack_lexer&&(E={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(E.yylloc.range=this.yylloc.range.slice(0))),g=o[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],n=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in E)this[r]=E[r];return!1}return!1},"test_match"),next:d(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,h,n,g;this._more||(this.yytext="",this.match="");for(var E=this._currentRules(),r=0;r<E.length;r++)if(n=this._input.match(this.rules[E[r]]),n&&(!h||n[0].length>h[0].length)){if(h=n,g=r,this.options.backtrack_lexer){if(o=this.test_match(n,E[r]),o!==!1)return o;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(o=this.test_match(h,E[g]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:d(function(){var h=this.next();return h||this.lex()},"lex"),begin:d(function(h){this.conditionStack.push(h)},"begin"),popState:d(function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:d(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:d(function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},"topState"),pushState:d(function(h){this.begin(h)},"pushState"),stateStackSize:d(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:d(function(h,n,g,E){function r(){let l=n.yytext.indexOf("%%");if(l===0)return!1;if(l>0){let Y=n.yytext.slice(0,l),V=n.yytext.slice(l);V&&h.lexer.unput(V),n.yytext=Y}return!0}d(r,"processId");var J=E;switch(g){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;break;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;break;case 17:return this.popState(),"acc_title_value";break;case 18:return this.begin("acc_descr"),35;break;case 19:return this.popState(),"acc_descr_value";break;case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;break;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 25:return this.popState(),this.pushState("CLASSDEFID"),42;break;case 26:return this.popState(),43;break;case 27:return this.pushState("CLASS"),48;break;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;break;case 29:return this.popState(),50;break;case 30:return this.pushState("STYLE"),45;break;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;break;case 32:return this.popState(),47;break;case 33:return this.pushState("SCALE"),17;break;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;break;case 38:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;break;case 39:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;break;case 40:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;break;case 41:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;break;case 42:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;break;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";break;case 49:if(!r())return;return this.popState(),"ID";break;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:return 19;case 53:this.popState();break;case 54:return this.popState(),this.pushState("struct"),20;break;case 55:return this.popState(),21;break;case 56:break;case 57:return this.begin("NOTE"),29;break;case 58:return this.popState(),this.pushState("NOTE_ID"),59;break;case 59:return this.popState(),this.pushState("NOTE_ID"),60;break;case 60:this.popState(),this.pushState("FLOATING_NOTE");break;case 61:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 62:break;case 63:return"NOTE_TEXT";case 64:if(!r())return;return this.popState(),"ID";break;case 65:if(!r())return;return this.popState(),this.pushState("NOTE_TEXT"),24;break;case 66:return this.popState(),n.yytext=n.yytext.substr(2).trim(),31;break;case 67:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),31;break;case 68:return 6;case 69:return 6;case 70:return 16;case 71:return 57;case 72:return r()?24:void 0;case 73:return n.yytext=n.yytext.trim(),14;break;case 74:return 15;case 75:return 28;case 76:return 58;case 77:return 5;case 78:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,55,56,57,71,72,73,74,75,76],inclusive:!1},FLOATING_NOTE_ID:{rules:[64],inclusive:!1},FLOATING_NOTE:{rules:[61,62,63],inclusive:!1},NOTE_TEXT:{rules:[66,67],inclusive:!1},NOTE_ID:{rules:[65],inclusive:!1},NOTE:{rules:[58,59,60],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,54,57,68,69,70,71,72,73,74,76,77,78],inclusive:!0}}};return U})();Tt.lexer=he;function ht(){this.yy={}}return d(ht,"Parser"),ht.prototype=Tt,Tt.Parser=ht,new ht})();Ct.parser=Ct;var He=Ct,pe="TB",qt="TB",Wt="dir",Z="state",Q="root",At="relation",Se="classDef",ye="style",ge="applyClass",rt="default",Qt="divider",Zt="fill:none",te="fill: #333",ee="c",se="markdown",re="normal",Dt="rect",vt="rectWithTitle",Te="stateStart",Ee="stateEnd",jt="divider",Ht="roundedWithTitle",be="note",_e="noteGroup",it="statediagram",ke="state",me=`${it}-${ke}`,ie="transition",De="note",ve="note-edge",Ce=`${ie} ${ve}`,Ae=`${it}-${De}`,xe="cluster",Le=`${it}-${xe}`,Oe="cluster-alt",Ie=`${it}-${Oe}`,ae="parent",ne="note",Re="state",xt="----",Ne=`${xt}${ne}`,zt=`${xt}${ae}`,oe=d((t,e=qt)=>{if(!t.doc)return e;let s=e;for(let a of t.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir"),we=d(function(t,e){return e.db.getClasses()},"getClasses"),$e=d(async function(t,e,s,a){_.info("REF0:"),_.info("Drawing state diagram (v2)",e);let{securityLevel:i,state:c,layout:u}=w();a.db.extract(a.db.getRootDocV2());let p=a.db.getData(),S=Mt(e,i);p.type=a.type,p.layoutAlgorithm=u,p.nodeSpacing=(c==null?void 0:c.nodeSpacing)||50,p.rankSpacing=(c==null?void 0:c.rankSpacing)||50,w().look==="neo"?p.markers=["barbNeo"]:p.markers=["barb"],p.diagramId=e,await Vt(p,S);let b=8;try{(typeof a.db.getLinks=="function"?a.db.getLinks():new Map).forEach((L,v)=>{var B;let O=typeof v=="string"?v:typeof(v==null?void 0:v.id)=="string"?v.id:"";if(!O){_.warn("\u26A0\uFE0F Invalid or missing stateId from key:",JSON.stringify(v));return}let $=(B=S.node())==null?void 0:B.querySelectorAll("g"),C;if($==null||$.forEach(R=>{var F;((F=R.textContent)==null?void 0:F.trim())===O&&(C=R)}),!C){_.warn("\u26A0\uFE0F Could not find node matching text:",O);return}let f=C.parentNode;if(!f){_.warn("\u26A0\uFE0F Node has no parent, cannot wrap:",O);return}let D=document.createElementNS("http://www.w3.org/2000/svg","a"),P=L.url.replace(/^"+|"+$/g,"");if(D.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",P),D.setAttribute("target","_blank"),L.tooltip){let R=L.tooltip.replace(/^"+|"+$/g,"");D.setAttribute("title",R)}f.replaceChild(D,C),D.appendChild(C),_.info("\u{1F517} Wrapped node in <a> tag for:",O,L.url)})}catch(k){_.error("\u274C Error injecting clickable links:",k)}Yt.insertTitle(S,"statediagramTitleText",(c==null?void 0:c.titleTopMargin)??25,a.db.getDiagramTitle()),Ut(S,b,it,(c==null?void 0:c.useMaxWidth)??!0)},"draw"),ze={getClasses:we,draw:$e,getDir:oe},yt=new Map,j=0;function gt(t="",e=0,s="",a=xt){let i=s!==null&&s.length>0?`${a}${s}`:"";return`${Re}-${t}${i}-${e}`}d(gt,"stateDomId");var Pe=d((t,e,s,a,i,c,u,p)=>{_.trace("items",e),e.forEach(S=>{switch(S.stmt){case Z:st(t,S,s,a,i,c,u,p);break;case rt:st(t,S,s,a,i,c,u,p);break;case At:{st(t,S.state1,s,a,i,c,u,p),st(t,S.state2,s,a,i,c,u,p);let T=u==="neo",b={id:"edge"+j,start:S.state1.id,end:S.state2.id,arrowhead:"normal",arrowTypeEnd:T?"arrow_barb_neo":"arrow_barb",style:Zt,labelStyle:"",label:W.sanitizeText(S.description??"",w()),arrowheadStyle:te,labelpos:ee,labelType:se,thickness:re,classes:ie,look:u};i.push(b),j++}break}})},"setupDoc"),Kt=d((t,e=qt)=>{let s=e;if(t.doc)for(let a of t.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir");function et(t,e,s){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(i=>{let c=s.get(i);c&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...c.styles])}));let a=t.find(i=>i.id===e.id);a?Object.assign(a,e):t.push(e)}d(et,"insertOrUpdateNode");function le(t){var e;return((e=t==null?void 0:t.classes)==null?void 0:e.join(" "))??""}d(le,"getClassesFromDbInfo");function ce(t){return(t==null?void 0:t.styles)??[]}d(ce,"getStylesFromDbInfo");var st=d((t,e,s,a,i,c,u,p)=>{var v,O,$;let S=e.id,T=s.get(S),b=le(T),k=ce(T),L=w();if(_.info("dataFetcher parsedItem",e,T,k),S!=="root"){let C=Dt;e.start===!0?C=Te:e.start===!1&&(C=Ee),e.type!==rt&&(C=e.type),yt.get(S)||yt.set(S,{id:S,shape:C,description:W.sanitizeText(S,L),cssClasses:`${b} ${me}`,cssStyles:k});let f=yt.get(S);e.description&&(Array.isArray(f.description)?(f.shape=vt,f.description.push(e.description)):(v=f.description)!=null&&v.length&&f.description.length>0?(f.shape=vt,f.description===S?f.description=[e.description]:f.description=[f.description,e.description]):(f.shape=Dt,f.description=e.description),f.description=W.sanitizeTextOrArray(f.description,L)),((O=f.description)==null?void 0:O.length)===1&&f.shape===vt&&(f.type==="group"?f.shape=Ht:f.shape=Dt),!f.type&&e.doc&&(_.info("Setting cluster for XCX",S,Kt(e)),f.type="group",f.isGroup=!0,f.dir=Kt(e),f.shape=e.type===Qt?jt:Ht,f.cssClasses=`${f.cssClasses} ${Le} ${c?Ie:""}`);let D={labelStyle:"",shape:f.shape,label:f.description,cssClasses:f.cssClasses,cssCompiledStyles:[],cssStyles:f.cssStyles,id:S,dir:f.dir,domId:gt(S,j),type:f.type,isGroup:f.type==="group",padding:8,rx:10,ry:10,look:u,labelType:"markdown"};if(D.shape===jt&&(D.label=""),t&&t.id!=="root"&&(_.trace("Setting node ",S," to be child of its parent ",t.id),D.parentId=t.id),D.centerLabel=!0,e.note){let P={labelStyle:"",shape:be,label:e.note.text,labelType:"markdown",cssClasses:Ae,cssStyles:[],cssCompiledStyles:[],id:S+Ne+"-"+j,domId:gt(S,j,ne),type:f.type,isGroup:f.type==="group",padding:($=L.flowchart)==null?void 0:$.padding,look:u,position:e.note.position},B=S+zt,R={labelStyle:"",shape:_e,label:e.note.text,cssClasses:f.cssClasses,cssStyles:[],id:S+zt,domId:gt(S,j,ae),type:"group",isGroup:!0,padding:16,look:u,position:e.note.position};j++,R.id=B,P.parentId=B,et(a,R,p),et(a,P,p),et(a,D,p);let G=S,F=P.id;e.note.position==="left of"&&(G=P.id,F=S),i.push({id:G+"-"+F,start:G,end:F,arrowhead:"none",arrowTypeEnd:"",style:Zt,labelStyle:"",classes:Ce,arrowheadStyle:te,labelpos:ee,labelType:se,thickness:re,look:u})}else et(a,D,p)}e.doc&&(_.trace("Adding nodes children "),Pe(e,e.doc,s,a,i,!c,u,p))},"dataFetcher"),Fe=d(()=>{yt.clear(),j=0},"reset"),x={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Xt=d(()=>new Map,"newClassesList"),Jt=d(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),St=d(t=>JSON.parse(JSON.stringify(t)),"clone"),K,Ke=(K=class{constructor(e){this.version=e,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Xt(),this.documents={root:Jt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=wt,this.setAccTitle=Nt,this.getAccDescription=Pt,this.setAccDescription=$t,this.setDiagramTitle=Ft,this.getDiagramTitle=Bt,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}extract(e){this.clear(!0);for(let i of Array.isArray(e)?e:e.doc)switch(i.stmt){case Z:this.addState(i.id.trim(),i.type,i.doc,i.description,i.note);break;case At:this.addRelation(i.state1,i.state2,i.description);break;case Se:this.addStyleClass(i.id.trim(),i.classes);break;case ye:this.handleStyleDef(i);break;case ge:this.setCssClass(i.id.trim(),i.styleClass);break;case"click":this.addLink(i.id,i.url,i.tooltip);break}let s=this.getStates(),a=w();Fe(),st(void 0,this.getRootDocV2(),s,this.nodes,this.edges,!0,a.look,this.classes);for(let i of this.nodes)if(Array.isArray(i.label)){if(i.description=i.label.slice(1),i.isGroup&&i.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${i.id}]`);i.label=i.label[0]}}handleStyleDef(e){let s=e.id.trim().split(","),a=e.styleClass.split(",");for(let i of s){let c=this.getState(i);if(!c){let u=i.trim();this.addState(u),c=this.getState(u)}c&&(c.styles=a.map(u=>{var p;return(p=u.replace(/;/g,""))==null?void 0:p.trim()}))}}setRootDoc(e){_.info("Setting root doc",e),this.rootDoc=e,this.version===1?this.extract(e):this.extract(this.getRootDocV2())}docTranslator(e,s,a){if(s.stmt===At){this.docTranslator(e,s.state1,!0),this.docTranslator(e,s.state2,!1);return}if(s.stmt===Z&&(s.id===x.START_NODE?(s.id=e.id+(a?"_start":"_end"),s.start=a):s.id=s.id.trim()),s.stmt!==Q&&s.stmt!==Z||!s.doc)return;let i=[],c=[];for(let u of s.doc)if(u.type===Qt){let p=St(u);p.doc=St(c),i.push(p),c=[]}else c.push(u);if(i.length>0&&c.length>0){let u={stmt:Z,id:Gt(),type:"divider",doc:St(c)};i.push(St(u)),s.doc=i}s.doc.forEach(u=>this.docTranslator(s,u,!0))}getRootDocV2(){return this.docTranslator({id:Q,stmt:Q},{id:Q,stmt:Q,doc:this.rootDoc},!0),{id:Q,doc:this.rootDoc}}addState(e,s=rt,a=void 0,i=void 0,c=void 0,u=void 0,p=void 0,S=void 0){let T=e==null?void 0:e.trim();if(!this.currentDocument.states.has(T))_.info("Adding state ",T,i),this.currentDocument.states.set(T,{stmt:Z,id:T,descriptions:[],type:s,doc:a,note:c,classes:[],styles:[],textStyles:[]});else{let b=this.currentDocument.states.get(T);if(!b)throw new Error(`State not found: ${T}`);b.doc||(b.doc=a),b.type||(b.type=s)}if(i&&(_.info("Setting state description",T,i),(Array.isArray(i)?i:[i]).forEach(k=>this.addDescription(T,k.trim()))),c){let b=this.currentDocument.states.get(T);if(!b)throw new Error(`State not found: ${T}`);b.note=c,b.note.text=W.sanitizeText(b.note.text,w())}u&&(_.info("Setting state classes",T,u),(Array.isArray(u)?u:[u]).forEach(k=>this.setCssClass(T,k.trim()))),p&&(_.info("Setting state styles",T,p),(Array.isArray(p)?p:[p]).forEach(k=>this.setStyle(T,k.trim()))),S&&(_.info("Setting state styles",T,p),(Array.isArray(S)?S:[S]).forEach(k=>this.setTextStyle(T,k.trim())))}clear(e){this.nodes=[],this.edges=[],this.documents={root:Jt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Xt(),e||(this.links=new Map,Rt())}getState(e){return this.currentDocument.states.get(e)}getStates(){return this.currentDocument.states}logDocuments(){_.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(e,s,a){this.links.set(e,{url:s,tooltip:a}),_.warn("Adding link",e,s,a)}getLinks(){return this.links}startIdIfNeeded(e=""){return e===x.START_NODE?(this.startEndCount++,`${x.START_TYPE}${this.startEndCount}`):e}startTypeIfNeeded(e="",s=rt){return e===x.START_NODE?x.START_TYPE:s}endIdIfNeeded(e=""){return e===x.END_NODE?(this.startEndCount++,`${x.END_TYPE}${this.startEndCount}`):e}endTypeIfNeeded(e="",s=rt){return e===x.END_NODE?x.END_TYPE:s}addRelationObjs(e,s,a=""){let i=this.startIdIfNeeded(e.id.trim()),c=this.startTypeIfNeeded(e.id.trim(),e.type),u=this.startIdIfNeeded(s.id.trim()),p=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(i,c,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.addState(u,p,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:i,id2:u,relationTitle:W.sanitizeText(a,w())})}addRelation(e,s,a){if(typeof e=="object"&&typeof s=="object")this.addRelationObjs(e,s,a);else if(typeof e=="string"&&typeof s=="string"){let i=this.startIdIfNeeded(e.trim()),c=this.startTypeIfNeeded(e),u=this.endIdIfNeeded(s.trim()),p=this.endTypeIfNeeded(s);this.addState(i,c),this.addState(u,p),this.currentDocument.relations.push({id1:i,id2:u,relationTitle:a?W.sanitizeText(a,w()):void 0})}}addDescription(e,s){var c;let a=this.currentDocument.states.get(e),i=s.startsWith(":")?s.replace(":","").trim():s;(c=a==null?void 0:a.descriptions)==null||c.push(W.sanitizeText(i,w()))}cleanupLabel(e){return e.startsWith(":")?e.slice(2).trim():e.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(e,s=""){this.classes.has(e)||this.classes.set(e,{id:e,styles:[],textStyles:[]});let a=this.classes.get(e);s&&a&&s.split(x.STYLECLASS_SEP).forEach(i=>{let c=i.replace(/([^;]*);/,"$1").trim();if(RegExp(x.COLOR_KEYWORD).exec(i)){let p=c.replace(x.FILL_KEYWORD,x.BG_FILL).replace(x.COLOR_KEYWORD,x.FILL_KEYWORD);a.textStyles.push(p)}a.styles.push(c)})}getClasses(){return this.classes}setCssClass(e,s){e.split(",").forEach(a=>{var c;let i=this.getState(a);if(!i){let u=a.trim();this.addState(u),i=this.getState(u)}(c=i==null?void 0:i.classes)==null||c.push(s)})}setStyle(e,s){var a,i;(i=(a=this.getState(e))==null?void 0:a.styles)==null||i.push(s)}setTextStyle(e,s){var a,i;(i=(a=this.getState(e))==null?void 0:a.textStyles)==null||i.push(s)}getDirectionStatement(){return this.rootDoc.find(e=>e.stmt===Wt)}getDirection(){var e;return((e=this.getDirectionStatement())==null?void 0:e.value)??pe}setDirection(e){let s=this.getDirectionStatement();s?s.value=e:this.rootDoc.unshift({stmt:Wt,value:e})}trimColon(e){return e.startsWith(":")?e.slice(1).trim():e.trim()}getData(){let e=w();return{nodes:this.nodes,edges:this.edges,other:{},config:e,direction:oe(this.getRootDocV2())}}getConfig(){return w().state}},d(K,"StateDB"),K.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},K),Be=d(t=>`
defs [id$="-barbEnd"] {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: ${t.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: ${t.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${t.mainBkg};
  stroke: ${t.useGradient?"url("+t.svgId+"-gradient)":t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${t.radius}px;
  ry: ${t.radius}px;
  filter: ${t.dropShadow?t.dropShadow.replace("url(#drop-shadow)",`url(${t.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),Xe=Be;export{He as a,ze as b,Ke as c,Xe as d};
