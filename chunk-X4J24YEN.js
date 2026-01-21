import{a as Mt}from"./chunk-7MFX7BTG.js";import{a as Ut}from"./chunk-T5KD3OBV.js";import{b as Vt}from"./chunk-JOIT3OGZ.js";import{e as Gt,m as Bt}from"./chunk-C5V5A4EQ.js";import{K as M,P as It,Q as Nt,R as wt,S as $t,T as Pt,U as Ft,V as Yt,W as F}from"./chunk-MBS5FVM4.js";import{b as f,d as k}from"./chunk-RKLTPE72.js";var Ct=function(){var e=f(function(V,o,h,n){for(h=h||{},n=V.length;n--;h[V[n]]=o);return h},"o"),t=[1,2],s=[1,3],a=[1,4],i=[2,4],l=[1,9],d=[1,11],S=[1,16],p=[1,17],T=[1,18],_=[1,19],b=[1,33],D=[1,20],A=[1,21],$=[1,22],x=[1,23],R=[1,24],u=[1,26],L=[1,27],I=[1,28],N=[1,29],G=[1,30],P=[1,31],B=[1,32],at=[1,35],nt=[1,36],ot=[1,37],lt=[1,38],K=[1,34],y=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ct=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],Lt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],Tt={trace:f(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:f(function(o,h,n,g,E,r,Z){var c=r.length-1;switch(E){case 3:return g.setRootDoc(r[c]),r[c];break;case 4:this.$=[];break;case 5:r[c]!="nl"&&(r[c-1].push(r[c]),this.$=r[c-1]);break;case 6:case 7:this.$=r[c];break;case 8:this.$="nl";break;case 12:this.$=r[c];break;case 13:let ut=r[c-1];ut.description=g.trimColon(r[c]),this.$=ut;break;case 14:this.$={stmt:"relation",state1:r[c-2],state2:r[c]};break;case 15:let dt=g.trimColon(r[c]);this.$={stmt:"relation",state1:r[c-3],state2:r[c-1],description:dt};break;case 19:this.$={stmt:"state",id:r[c-3],type:"default",description:"",doc:r[c-1]};break;case 20:var j=r[c],X=r[c-2].trim();if(r[c].match(":")){var tt=r[c].split(":");j=tt[0],X=[X,tt[1]]}this.$={stmt:"state",id:j,type:"default",description:X};break;case 21:this.$={stmt:"state",id:r[c-3],type:"default",description:r[c-5],doc:r[c-1]};break;case 22:this.$={stmt:"state",id:r[c],type:"fork"};break;case 23:this.$={stmt:"state",id:r[c],type:"join"};break;case 24:this.$={stmt:"state",id:r[c],type:"choice"};break;case 25:this.$={stmt:"state",id:g.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:r[c-1].trim(),note:{position:r[c-2].trim(),text:r[c].trim()}};break;case 29:this.$=r[c].trim(),g.setAccTitle(this.$);break;case 30:case 31:this.$=r[c].trim(),g.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:r[c-3],url:r[c-2],tooltip:r[c-1]};break;case 33:this.$={stmt:"click",id:r[c-3],url:r[c-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:r[c-1].trim(),classes:r[c].trim()};break;case 36:this.$={stmt:"style",id:r[c-1].trim(),styleClass:r[c].trim()};break;case 37:this.$={stmt:"applyClass",id:r[c-1].trim(),styleClass:r[c].trim()};break;case 38:g.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:g.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:g.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:g.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:r[c].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:r[c-2].trim(),classes:[r[c].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:r[c-2].trim(),classes:[r[c].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:t,5:s,6:a},{1:[3]},{3:5,4:t,5:s,6:a},{3:6,4:t,5:s,6:a},e([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],i,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:l,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:p,19:T,22:_,24:b,25:D,26:A,27:$,28:x,29:R,32:25,33:u,35:L,37:I,38:N,41:G,45:P,48:B,51:at,52:nt,53:ot,54:lt,57:K},e(y,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:S,17:p,19:T,22:_,24:b,25:D,26:A,27:$,28:x,29:R,32:25,33:u,35:L,37:I,38:N,41:G,45:P,48:B,51:at,52:nt,53:ot,54:lt,57:K},e(y,[2,7]),e(y,[2,8]),e(y,[2,9]),e(y,[2,10]),e(y,[2,11]),e(y,[2,12],{14:[1,40],15:[1,41]}),e(y,[2,16]),{18:[1,42]},e(y,[2,18],{20:[1,43]}),{23:[1,44]},e(y,[2,22]),e(y,[2,23]),e(y,[2,24]),e(y,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},e(y,[2,28]),{34:[1,49]},{36:[1,50]},e(y,[2,31]),{13:51,24:b,57:K},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},e(ct,[2,44],{58:[1,56]}),e(ct,[2,45],{58:[1,57]}),e(y,[2,38]),e(y,[2,39]),e(y,[2,40]),e(y,[2,41]),e(y,[2,6]),e(y,[2,13]),{13:58,24:b,57:K},e(y,[2,17]),e(Lt,i,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},e(y,[2,29]),e(y,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},e(y,[2,14],{14:[1,71]}),{4:l,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:p,19:T,21:[1,72],22:_,24:b,25:D,26:A,27:$,28:x,29:R,32:25,33:u,35:L,37:I,38:N,41:G,45:P,48:B,51:at,52:nt,53:ot,54:lt,57:K},e(y,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},e(y,[2,34]),e(y,[2,35]),e(y,[2,36]),e(y,[2,37]),e(ct,[2,46]),e(ct,[2,47]),e(y,[2,15]),e(y,[2,19]),e(Lt,i,{7:78}),e(y,[2,26]),e(y,[2,27]),{5:[1,79]},{5:[1,80]},{4:l,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:p,19:T,21:[1,81],22:_,24:b,25:D,26:A,27:$,28:x,29:R,32:25,33:u,35:L,37:I,38:N,41:G,45:P,48:B,51:at,52:nt,53:ot,54:lt,57:K},e(y,[2,32]),e(y,[2,33]),e(y,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:f(function(o,h){if(h.recoverable)this.trace(o);else{var n=new Error(o);throw n.hash=h,n}},"parseError"),parse:f(function(o){var h=this,n=[0],g=[],E=[null],r=[],Z=this.table,c="",j=0,X=0,tt=0,ut=2,dt=1,ue=r.slice.call(arguments,1),m=Object.create(this.lexer),H={yy:{}};for(var Et in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Et)&&(H.yy[Et]=this.yy[Et]);m.setInput(o,H.yy),H.yy.lexer=m,H.yy.parser=this,typeof m.yylloc>"u"&&(m.yylloc={});var _t=m.yylloc;r.push(_t);var de=m.options&&m.options.ranges;typeof H.yy.parseError=="function"?this.parseError=H.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function fe(O){n.length=n.length-2*O,E.length=E.length-O,r.length=r.length-O}f(fe,"popStack");function Ot(){var O;return O=g.pop()||m.lex()||dt,typeof O!="number"&&(O instanceof Array&&(g=O,O=g.pop()),O=h.symbols_[O]||O),O}f(Ot,"lex");for(var v,bt,W,w,Ge,kt,J={},ft,Y,Rt,pt;;){if(W=n[n.length-1],this.defaultActions[W]?w=this.defaultActions[W]:((v===null||typeof v>"u")&&(v=Ot()),w=Z[W]&&Z[W][v]),typeof w>"u"||!w.length||!w[0]){var mt="";pt=[];for(ft in Z[W])this.terminals_[ft]&&ft>ut&&pt.push("'"+this.terminals_[ft]+"'");m.showPosition?mt="Parse error on line "+(j+1)+`:
`+m.showPosition()+`
Expecting `+pt.join(", ")+", got '"+(this.terminals_[v]||v)+"'":mt="Parse error on line "+(j+1)+": Unexpected "+(v==dt?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(mt,{text:m.match,token:this.terminals_[v]||v,line:m.yylineno,loc:_t,expected:pt})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+W+", token: "+v);switch(w[0]){case 1:n.push(v),E.push(m.yytext),r.push(m.yylloc),n.push(w[1]),v=null,bt?(v=bt,bt=null):(X=m.yyleng,c=m.yytext,j=m.yylineno,_t=m.yylloc,tt>0&&tt--);break;case 2:if(Y=this.productions_[w[1]][1],J.$=E[E.length-Y],J._$={first_line:r[r.length-(Y||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(Y||1)].first_column,last_column:r[r.length-1].last_column},de&&(J._$.range=[r[r.length-(Y||1)].range[0],r[r.length-1].range[1]]),kt=this.performAction.apply(J,[c,X,j,H.yy,w[1],E,r].concat(ue)),typeof kt<"u")return kt;Y&&(n=n.slice(0,-1*Y*2),E=E.slice(0,-1*Y),r=r.slice(0,-1*Y)),n.push(this.productions_[w[1]][0]),E.push(J.$),r.push(J._$),Rt=Z[n[n.length-2]][n[n.length-1]],n.push(Rt);break;case 3:return!0}}return!0},"parse")},he=function(){var V={EOF:1,parseError:f(function(h,n){if(this.yy.parser)this.yy.parser.parseError(h,n);else throw new Error(h)},"parseError"),setInput:f(function(o,h){return this.yy=h||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:f(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var h=o.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:f(function(o){var h=o.length,n=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var E=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===g.length?this.yylloc.first_column:0)+g[g.length-n.length].length-n[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[E[0],E[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},"unput"),more:f(function(){return this._more=!0,this},"more"),reject:f(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:f(function(o){this.unput(this.match.slice(o))},"less"),pastInput:f(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:f(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:f(function(){var o=this.pastInput(),h=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+h+"^"},"showPosition"),test_match:f(function(o,h){var n,g,E;if(this.options.backtrack_lexer&&(E={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(E.yylloc.range=this.yylloc.range.slice(0))),g=o[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],n=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in E)this[r]=E[r];return!1}return!1},"test_match"),next:f(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,h,n,g;this._more||(this.yytext="",this.match="");for(var E=this._currentRules(),r=0;r<E.length;r++)if(n=this._input.match(this.rules[E[r]]),n&&(!h||n[0].length>h[0].length)){if(h=n,g=r,this.options.backtrack_lexer){if(o=this.test_match(n,E[r]),o!==!1)return o;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(o=this.test_match(h,E[g]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:f(function(){var h=this.next();return h||this.lex()},"lex"),begin:f(function(h){this.conditionStack.push(h)},"begin"),popState:f(function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:f(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:f(function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},"topState"),pushState:f(function(h){this.begin(h)},"pushState"),stateStackSize:f(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:f(function(h,n,g,E){var r=E;switch(g){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:break;case 9:break;case 10:return 5;case 11:break;case 12:break;case 13:break;case 14:break;case 15:return this.pushState("SCALE"),17;break;case 16:return 18;case 17:this.popState();break;case 18:return this.begin("acc_title"),33;break;case 19:return this.popState(),"acc_title_value";break;case 20:return this.begin("acc_descr"),35;break;case 21:return this.popState(),"acc_descr_value";break;case 22:this.begin("acc_descr_multiline");break;case 23:this.popState();break;case 24:return"acc_descr_multiline_value";case 25:return this.pushState("CLASSDEF"),41;break;case 26:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 27:return this.popState(),this.pushState("CLASSDEFID"),42;break;case 28:return this.popState(),43;break;case 29:return this.pushState("CLASS"),48;break;case 30:return this.popState(),this.pushState("CLASS_STYLE"),49;break;case 31:return this.popState(),50;break;case 32:return this.pushState("STYLE"),45;break;case 33:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;break;case 34:return this.popState(),47;break;case 35:return this.pushState("SCALE"),17;break;case 36:return 18;case 37:this.popState();break;case 38:this.pushState("STATE");break;case 39:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;break;case 40:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;break;case 41:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;break;case 42:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;break;case 43:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;break;case 44:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;break;case 45:return 51;case 46:return 52;case 47:return 53;case 48:return 54;case 49:this.pushState("STATE_STRING");break;case 50:return this.pushState("STATE_ID"),"AS";break;case 51:return this.popState(),"ID";break;case 52:this.popState();break;case 53:return"STATE_DESCR";case 54:return 19;case 55:this.popState();break;case 56:return this.popState(),this.pushState("struct"),20;break;case 57:break;case 58:return this.popState(),21;break;case 59:break;case 60:return this.begin("NOTE"),29;break;case 61:return this.popState(),this.pushState("NOTE_ID"),59;break;case 62:return this.popState(),this.pushState("NOTE_ID"),60;break;case 63:this.popState(),this.pushState("FLOATING_NOTE");break;case 64:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 65:break;case 66:return"NOTE_TEXT";case 67:return this.popState(),"ID";break;case 68:return this.popState(),this.pushState("NOTE_TEXT"),24;break;case 69:return this.popState(),n.yytext=n.yytext.substr(2).trim(),31;break;case 70:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),31;break;case 71:return 6;case 72:return 6;case 73:return 16;case 74:return 57;case 75:return 24;case 76:return n.yytext=n.yytext.trim(),14;break;case 77:return 15;case 78:return 28;case 79:return 58;case 80:return 5;case 81:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[12,13],inclusive:!1},struct:{rules:[12,13,25,29,32,38,45,46,47,48,57,58,59,60,74,75,76,77,78],inclusive:!1},FLOATING_NOTE_ID:{rules:[67],inclusive:!1},FLOATING_NOTE:{rules:[64,65,66],inclusive:!1},NOTE_TEXT:{rules:[69,70],inclusive:!1},NOTE_ID:{rules:[68],inclusive:!1},NOTE:{rules:[61,62,63],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[34],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[33],inclusive:!1},CLASS_STYLE:{rules:[31],inclusive:!1},CLASS:{rules:[30],inclusive:!1},CLASSDEFID:{rules:[28],inclusive:!1},CLASSDEF:{rules:[26,27],inclusive:!1},acc_descr_multiline:{rules:[23,24],inclusive:!1},acc_descr:{rules:[21],inclusive:!1},acc_title:{rules:[19],inclusive:!1},SCALE:{rules:[16,17,36,37],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[51],inclusive:!1},STATE_STRING:{rules:[52,53],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[12,13,39,40,41,42,43,44,49,50,54,55,56],inclusive:!1},ID:{rules:[12,13],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,18,20,22,25,29,32,35,38,56,60,71,72,73,74,75,76,77,79,80,81],inclusive:!0}}};return V}();Tt.lexer=he;function ht(){this.yy={}}return f(ht,"Parser"),ht.prototype=Tt,Tt.Parser=ht,new ht}();Ct.parser=Ct;var We=Ct,pe="TB",qt="TB",jt="dir",Q="state",q="root",At="relation",Se="classDef",ye="style",ge="applyClass",it="default",Qt="divider",Zt="fill:none",te="fill: #333",ee="c",se="text",ie="normal",Dt="rect",vt="rectWithTitle",Te="stateStart",Ee="stateEnd",Ht="divider",Wt="roundedWithTitle",_e="note",be="noteGroup",rt="statediagram",ke="state",me=`${rt}-${ke}`,re="transition",De="note",ve="note-edge",Ce=`${re} ${ve}`,Ae=`${rt}-${De}`,xe="cluster",Le=`${rt}-${xe}`,Oe="cluster-alt",Re=`${rt}-${Oe}`,ae="parent",ne="note",Ie="state",xt="----",Ne=`${xt}${ne}`,zt=`${xt}${ae}`,oe=f((e,t=qt)=>{if(!e.doc)return t;let s=t;for(let a of e.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir"),we=f(function(e,t){return t.db.getClasses()},"getClasses"),$e=f(async function(e,t,s,a){k.info("REF0:"),k.info("Drawing state diagram (v2)",t);let{securityLevel:i,state:l,layout:d}=F();a.db.extract(a.db.getRootDocV2());let S=a.db.getData(),p=Mt(t,i);S.type=a.type,S.layoutAlgorithm=d,S.nodeSpacing=(l==null?void 0:l.nodeSpacing)||50,S.rankSpacing=(l==null?void 0:l.rankSpacing)||50,S.markers=["barb"],S.diagramId=t,await Vt(S,p);let T=8;try{(typeof a.db.getLinks=="function"?a.db.getLinks():new Map).forEach((b,D)=>{var I;let A=typeof D=="string"?D:typeof(D==null?void 0:D.id)=="string"?D.id:"";if(!A){k.warn("\u26A0\uFE0F Invalid or missing stateId from key:",JSON.stringify(D));return}let $=(I=p.node())==null?void 0:I.querySelectorAll("g"),x;if($==null||$.forEach(N=>{var P;((P=N.textContent)==null?void 0:P.trim())===A&&(x=N)}),!x){k.warn("\u26A0\uFE0F Could not find node matching text:",A);return}let R=x.parentNode;if(!R){k.warn("\u26A0\uFE0F Node has no parent, cannot wrap:",A);return}let u=document.createElementNS("http://www.w3.org/2000/svg","a"),L=b.url.replace(/^"+|"+$/g,"");if(u.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",L),u.setAttribute("target","_blank"),b.tooltip){let N=b.tooltip.replace(/^"+|"+$/g,"");u.setAttribute("title",N)}R.replaceChild(u,x),u.appendChild(x),k.info("\u{1F517} Wrapped node in <a> tag for:",A,b.url)})}catch(_){k.error("\u274C Error injecting clickable links:",_)}Bt.insertTitle(p,"statediagramTitleText",(l==null?void 0:l.titleTopMargin)??25,a.db.getDiagramTitle()),Ut(p,T,rt,(l==null?void 0:l.useMaxWidth)??!0)},"draw"),ze={getClasses:we,draw:$e,getDir:oe},yt=new Map,U=0;function gt(e="",t=0,s="",a=xt){let i=s!==null&&s.length>0?`${a}${s}`:"";return`${Ie}-${e}${i}-${t}`}f(gt,"stateDomId");var Pe=f((e,t,s,a,i,l,d,S)=>{k.trace("items",t),t.forEach(p=>{switch(p.stmt){case Q:st(e,p,s,a,i,l,d,S);break;case it:st(e,p,s,a,i,l,d,S);break;case At:{st(e,p.state1,s,a,i,l,d,S),st(e,p.state2,s,a,i,l,d,S);let T={id:"edge"+U,start:p.state1.id,end:p.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:Zt,labelStyle:"",label:M.sanitizeText(p.description??"",F()),arrowheadStyle:te,labelpos:ee,labelType:se,thickness:ie,classes:re,look:d};i.push(T),U++}break}})},"setupDoc"),Kt=f((e,t=qt)=>{let s=t;if(e.doc)for(let a of e.doc)a.stmt==="dir"&&(s=a.value);return s},"getDir");function et(e,t,s){if(!t.id||t.id==="</join></fork>"||t.id==="</choice>")return;t.cssClasses&&(Array.isArray(t.cssCompiledStyles)||(t.cssCompiledStyles=[]),t.cssClasses.split(" ").forEach(i=>{let l=s.get(i);l&&(t.cssCompiledStyles=[...t.cssCompiledStyles??[],...l.styles])}));let a=e.find(i=>i.id===t.id);a?Object.assign(a,t):e.push(t)}f(et,"insertOrUpdateNode");function le(e){var t;return((t=e==null?void 0:e.classes)==null?void 0:t.join(" "))??""}f(le,"getClassesFromDbInfo");function ce(e){return(e==null?void 0:e.styles)??[]}f(ce,"getStylesFromDbInfo");var st=f((e,t,s,a,i,l,d,S)=>{var A,$,x;let p=t.id,T=s.get(p),_=le(T),b=ce(T),D=F();if(k.info("dataFetcher parsedItem",t,T,b),p!=="root"){let R=Dt;t.start===!0?R=Te:t.start===!1&&(R=Ee),t.type!==it&&(R=t.type),yt.get(p)||yt.set(p,{id:p,shape:R,description:M.sanitizeText(p,D),cssClasses:`${_} ${me}`,cssStyles:b});let u=yt.get(p);t.description&&(Array.isArray(u.description)?(u.shape=vt,u.description.push(t.description)):(A=u.description)!=null&&A.length&&u.description.length>0?(u.shape=vt,u.description===p?u.description=[t.description]:u.description=[u.description,t.description]):(u.shape=Dt,u.description=t.description),u.description=M.sanitizeTextOrArray(u.description,D)),(($=u.description)==null?void 0:$.length)===1&&u.shape===vt&&(u.type==="group"?u.shape=Wt:u.shape=Dt),!u.type&&t.doc&&(k.info("Setting cluster for XCX",p,Kt(t)),u.type="group",u.isGroup=!0,u.dir=Kt(t),u.shape=t.type===Qt?Ht:Wt,u.cssClasses=`${u.cssClasses} ${Le} ${l?Re:""}`);let L={labelStyle:"",shape:u.shape,label:u.description,cssClasses:u.cssClasses,cssCompiledStyles:[],cssStyles:u.cssStyles,id:p,dir:u.dir,domId:gt(p,U),type:u.type,isGroup:u.type==="group",padding:8,rx:10,ry:10,look:d};if(L.shape===Ht&&(L.label=""),e&&e.id!=="root"&&(k.trace("Setting node ",p," to be child of its parent ",e.id),L.parentId=e.id),L.centerLabel=!0,t.note){let I={labelStyle:"",shape:_e,label:t.note.text,cssClasses:Ae,cssStyles:[],cssCompiledStyles:[],id:p+Ne+"-"+U,domId:gt(p,U,ne),type:u.type,isGroup:u.type==="group",padding:(x=D.flowchart)==null?void 0:x.padding,look:d,position:t.note.position},N=p+zt,G={labelStyle:"",shape:be,label:t.note.text,cssClasses:u.cssClasses,cssStyles:[],id:p+zt,domId:gt(p,U,ae),type:"group",isGroup:!0,padding:16,look:d,position:t.note.position};U++,G.id=N,I.parentId=N,et(a,G,S),et(a,I,S),et(a,L,S);let P=p,B=I.id;t.note.position==="left of"&&(P=I.id,B=p),i.push({id:P+"-"+B,start:P,end:B,arrowhead:"none",arrowTypeEnd:"",style:Zt,labelStyle:"",classes:Ce,arrowheadStyle:te,labelpos:ee,labelType:se,thickness:ie,look:d})}else et(a,L,S)}t.doc&&(k.trace("Adding nodes children "),Pe(t,t.doc,s,a,i,!l,d,S))},"dataFetcher"),Fe=f(()=>{yt.clear(),U=0},"reset"),C={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Xt=f(()=>new Map,"newClassesList"),Jt=f(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),St=f(e=>JSON.parse(JSON.stringify(e)),"clone"),z,Ke=(z=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Xt(),this.documents={root:Jt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=wt,this.setAccTitle=Nt,this.getAccDescription=Pt,this.setAccDescription=$t,this.setDiagramTitle=Ft,this.getDiagramTitle=Yt,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}extract(t){this.clear(!0);for(let i of Array.isArray(t)?t:t.doc)switch(i.stmt){case Q:this.addState(i.id.trim(),i.type,i.doc,i.description,i.note);break;case At:this.addRelation(i.state1,i.state2,i.description);break;case Se:this.addStyleClass(i.id.trim(),i.classes);break;case ye:this.handleStyleDef(i);break;case ge:this.setCssClass(i.id.trim(),i.styleClass);break;case"click":this.addLink(i.id,i.url,i.tooltip);break}let s=this.getStates(),a=F();Fe(),st(void 0,this.getRootDocV2(),s,this.nodes,this.edges,!0,a.look,this.classes);for(let i of this.nodes)if(Array.isArray(i.label)){if(i.description=i.label.slice(1),i.isGroup&&i.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${i.id}]`);i.label=i.label[0]}}handleStyleDef(t){let s=t.id.trim().split(","),a=t.styleClass.split(",");for(let i of s){let l=this.getState(i);if(!l){let d=i.trim();this.addState(d),l=this.getState(d)}l&&(l.styles=a.map(d=>{var S;return(S=d.replace(/;/g,""))==null?void 0:S.trim()}))}}setRootDoc(t){k.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,s,a){if(s.stmt===At){this.docTranslator(t,s.state1,!0),this.docTranslator(t,s.state2,!1);return}if(s.stmt===Q&&(s.id===C.START_NODE?(s.id=t.id+(a?"_start":"_end"),s.start=a):s.id=s.id.trim()),s.stmt!==q&&s.stmt!==Q||!s.doc)return;let i=[],l=[];for(let d of s.doc)if(d.type===Qt){let S=St(d);S.doc=St(l),i.push(S),l=[]}else l.push(d);if(i.length>0&&l.length>0){let d={stmt:Q,id:Gt(),type:"divider",doc:St(l)};i.push(St(d)),s.doc=i}s.doc.forEach(d=>this.docTranslator(s,d,!0))}getRootDocV2(){return this.docTranslator({id:q,stmt:q},{id:q,stmt:q,doc:this.rootDoc},!0),{id:q,doc:this.rootDoc}}addState(t,s=it,a=void 0,i=void 0,l=void 0,d=void 0,S=void 0,p=void 0){let T=t==null?void 0:t.trim();if(!this.currentDocument.states.has(T))k.info("Adding state ",T,i),this.currentDocument.states.set(T,{stmt:Q,id:T,descriptions:[],type:s,doc:a,note:l,classes:[],styles:[],textStyles:[]});else{let _=this.currentDocument.states.get(T);if(!_)throw new Error(`State not found: ${T}`);_.doc||(_.doc=a),_.type||(_.type=s)}if(i&&(k.info("Setting state description",T,i),(Array.isArray(i)?i:[i]).forEach(b=>this.addDescription(T,b.trim()))),l){let _=this.currentDocument.states.get(T);if(!_)throw new Error(`State not found: ${T}`);_.note=l,_.note.text=M.sanitizeText(_.note.text,F())}d&&(k.info("Setting state classes",T,d),(Array.isArray(d)?d:[d]).forEach(b=>this.setCssClass(T,b.trim()))),S&&(k.info("Setting state styles",T,S),(Array.isArray(S)?S:[S]).forEach(b=>this.setStyle(T,b.trim()))),p&&(k.info("Setting state styles",T,S),(Array.isArray(p)?p:[p]).forEach(b=>this.setTextStyle(T,b.trim())))}clear(t){this.nodes=[],this.edges=[],this.documents={root:Jt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Xt(),t||(this.links=new Map,It())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){k.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,s,a){this.links.set(t,{url:s,tooltip:a}),k.warn("Adding link",t,s,a)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===C.START_NODE?(this.startEndCount++,`${C.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",s=it){return t===C.START_NODE?C.START_TYPE:s}endIdIfNeeded(t=""){return t===C.END_NODE?(this.startEndCount++,`${C.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",s=it){return t===C.END_NODE?C.END_TYPE:s}addRelationObjs(t,s,a=""){let i=this.startIdIfNeeded(t.id.trim()),l=this.startTypeIfNeeded(t.id.trim(),t.type),d=this.startIdIfNeeded(s.id.trim()),S=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(i,l,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(d,S,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:i,id2:d,relationTitle:M.sanitizeText(a,F())})}addRelation(t,s,a){if(typeof t=="object"&&typeof s=="object")this.addRelationObjs(t,s,a);else if(typeof t=="string"&&typeof s=="string"){let i=this.startIdIfNeeded(t.trim()),l=this.startTypeIfNeeded(t),d=this.endIdIfNeeded(s.trim()),S=this.endTypeIfNeeded(s);this.addState(i,l),this.addState(d,S),this.currentDocument.relations.push({id1:i,id2:d,relationTitle:a?M.sanitizeText(a,F()):void 0})}}addDescription(t,s){var l;let a=this.currentDocument.states.get(t),i=s.startsWith(":")?s.replace(":","").trim():s;(l=a==null?void 0:a.descriptions)==null||l.push(M.sanitizeText(i,F()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,s=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});let a=this.classes.get(t);s&&a&&s.split(C.STYLECLASS_SEP).forEach(i=>{let l=i.replace(/([^;]*);/,"$1").trim();if(RegExp(C.COLOR_KEYWORD).exec(i)){let S=l.replace(C.FILL_KEYWORD,C.BG_FILL).replace(C.COLOR_KEYWORD,C.FILL_KEYWORD);a.textStyles.push(S)}a.styles.push(l)})}getClasses(){return this.classes}setCssClass(t,s){t.split(",").forEach(a=>{var l;let i=this.getState(a);if(!i){let d=a.trim();this.addState(d),i=this.getState(d)}(l=i==null?void 0:i.classes)==null||l.push(s)})}setStyle(t,s){var a,i;(i=(a=this.getState(t))==null?void 0:a.styles)==null||i.push(s)}setTextStyle(t,s){var a,i;(i=(a=this.getState(t))==null?void 0:a.textStyles)==null||i.push(s)}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===jt)}getDirection(){var t;return((t=this.getDirectionStatement())==null?void 0:t.value)??pe}setDirection(t){let s=this.getDirectionStatement();s?s.value=t:this.rootDoc.unshift({stmt:jt,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){let t=F();return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:oe(this.getRootDocV2())}}getConfig(){return F().state}},f(z,"StateDB"),z.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},z),Ye=f(e=>`
defs #statediagram-barbEnd {
    fill: ${e.transitionColor};
    stroke: ${e.transitionColor};
  }
g.stateGroup text {
  fill: ${e.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${e.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${e.stateLabelColor};
}

g.stateGroup rect {
  fill: ${e.mainBkg};
  stroke: ${e.nodeBorder};
}

g.stateGroup line {
  stroke: ${e.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${e.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${e.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${e.noteBorderColor};
  fill: ${e.noteBkgColor};

  text {
    fill: ${e.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${e.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${e.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${e.edgeLabelBackground};
  p {
    background-color: ${e.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${e.edgeLabelBackground};
    fill: ${e.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${e.transitionLabelColor||e.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${e.transitionLabelColor||e.tertiaryTextColor};
}

.stateLabel text {
  fill: ${e.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${e.specialStateColor};
  stroke: ${e.specialStateColor};
}

.node .fork-join {
  fill: ${e.specialStateColor};
  stroke: ${e.specialStateColor};
}

.node circle.state-end {
  fill: ${e.innerEndBackground};
  stroke: ${e.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${e.compositeBackground||e.background};
  // stroke: ${e.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${e.stateBkg||e.mainBkg};
  stroke: ${e.stateBorder||e.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${e.mainBkg};
  stroke: ${e.stateBorder||e.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${e.lineColor};
}

.statediagram-cluster rect {
  fill: ${e.compositeTitleBackground};
  stroke: ${e.stateBorder||e.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${e.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${e.stateBorder||e.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${e.compositeBackground||e.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${e.altBackground?e.altBackground:"#efefef"};
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
  fill: ${e.altBackground?e.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${e.noteBkgColor};
  stroke: ${e.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${e.noteBkgColor};
  stroke: ${e.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${e.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${e.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${e.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${e.lineColor};
  stroke: ${e.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${e.textColor};
}
`,"getStyles"),Xe=Ye;export{We as a,ze as b,Ke as c,Xe as d};
