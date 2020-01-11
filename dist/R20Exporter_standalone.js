/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */
;
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
;var saveAs=saveAs||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(h){if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var r=h.document,l=function(){return h.URL||h.webkitURL||h},e=h.URL||h.webkitURL||h,n=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g=!h.externalHost&&"download" in n,j=function(t){var s=r.createEvent("MouseEvents");s.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);t.dispatchEvent(s)},o=h.webkitRequestFileSystem,p=h.requestFileSystem||o||h.mozRequestFileSystem,m=function(s){(h.setImmediate||h.setTimeout)(function(){throw s},0)},c="application/octet-stream",k=0,b=[],i=function(){var t=b.length;while(t--){var s=b[t];if(typeof s==="string"){e.revokeObjectURL(s)}else{s.remove()}}b.length=0},q=function(t,s,w){s=[].concat(s);var v=s.length;while(v--){var x=t["on"+s[v]];if(typeof x==="function"){try{x.call(t,w||t)}catch(u){m(u)}}}},f=function(t,v){var w=this,C=t.type,F=false,y,x,s=function(){var G=l().createObjectURL(t);b.push(G);return G},B=function(){q(w,"writestart progress write writeend".split(" "))},E=function(){if(F||!y){y=s(t)}if(x){x.location.href=y}else{window.open(y,"_blank")}w.readyState=w.DONE;B()},A=function(G){return function(){if(w.readyState!==w.DONE){return G.apply(this,arguments)}}},z={create:true,exclusive:false},D;w.readyState=w.INIT;if(!v){v="download"}if(g){y=s(t);r=h.document;n=r.createElementNS("http://www.w3.org/1999/xhtml","a");n.href=y;n.download=v;var u=r.createEvent("MouseEvents");u.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);n.dispatchEvent(u);w.readyState=w.DONE;B();return}if(h.chrome&&C&&C!==c){D=t.slice||t.webkitSlice;t=D.call(t,0,t.size,c);F=true}if(o&&v!=="download"){v+=".download"}if(C===c||o){x=h}if(!p){E();return}k+=t.size;p(h.TEMPORARY,k,A(function(G){G.root.getDirectory("saved",z,A(function(H){var I=function(){H.getFile(v,z,A(function(J){J.createWriter(A(function(K){K.onwriteend=function(L){x.location.href=J.toURL();b.push(J);w.readyState=w.DONE;q(w,"writeend",L)};K.onerror=function(){var L=K.error;if(L.code!==L.ABORT_ERR){E()}};"writestart progress write abort".split(" ").forEach(function(L){K["on"+L]=w["on"+L]});K.write(t);w.abort=function(){K.abort();w.readyState=w.DONE};w.readyState=w.WRITING}),E)}),E)};H.getFile(v,{create:false},A(function(J){J.remove();I()}),A(function(J){if(J.code===J.NOT_FOUND_ERR){I()}else{E()}}))}),E)}),E)},d=f.prototype,a=function(s,t){return new f(s,t)};d.abort=function(){var s=this;s.readyState=s.DONE;q(s,"abort")};d.readyState=d.INIT=0;d.WRITING=1;d.DONE=2;d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null;h.addEventListener("unload",i,false);a.unload=function(){i();h.removeEventListener("unload",i,false)};return a}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"){module.exports=saveAs};(function(a){var z="File format is not recognized.";var K="CRC failed.";var A="File contains encrypted entry.";var S="File is using Zip64 (4gb+ file size).";var D="Error while reading zip file.";var n="Error while writing zip file.";var k="Error while writing file data.";var T="Error while reading file data.";var g="File already exists.";var C=512*1024;var c="text/plain";var H;try{H=new Blob([new DataView(new ArrayBuffer(0))]).size===0}catch(R){}function M(){this.crc=-1}M.prototype.append=function E(Y){var X=this.crc|0,W=this.table;for(var Z=0,e=Y.length|0;Z<e;Z++){X=(X>>>8)^W[(X^Y[Z])&255]}this.crc=X};M.prototype.get=function P(){return ~this.crc};M.prototype.table=(function(){var X,e,W,Y=[];for(X=0;X<256;X++){W=X;for(e=0;e<8;e++){if(W&1){W=(W>>>1)^3988292384}else{W=W>>>1}}Y[X]=W}return Y})();function j(){}j.prototype.append=function E(e,W){return e};j.prototype.flush=function i(){};function d(e,W,X){if(W<0||X<0||W+X>e.size){throw new RangeError("offset:"+W+", length:"+X+", size:"+e.size)}if(e.slice){return e.slice(W,W+X)}else{if(e.webkitSlice){return e.webkitSlice(W,W+X)}else{if(e.mozSlice){return e.mozSlice(W,W+X)}else{if(e.msSlice){return e.msSlice(W,W+X)}}}}}function I(X,W){var Y,e;Y=new ArrayBuffer(X);e=new Uint8Array(Y);if(W){e.set(W,0)}return{buffer:Y,array:e,view:new DataView(Y)}}function G(){}function Q(Z){var e=this,X;function Y(ac,aa){var ab=new Blob([Z],{type:c});X=new t(ab);X.init(function(){e.size=X.size;ac()},aa)}function W(ab,ac,ad,aa){X.readUint8Array(ab,ac,ad,aa)}e.size=0;e.init=Y;e.readUint8Array=W}Q.prototype=new G();Q.prototype.constructor=Q;function O(W){var X=this,e;function Z(ab){var aa=W.length;while(W.charAt(aa-1)=="="){aa--}e=W.indexOf(",")+1;X.size=Math.floor((aa-e)*0.75);ab()}function Y(af,ab,ah){var ae,ad=I(ab);var aa=Math.floor(af/3)*4;var ac=Math.ceil((af+ab)/3)*4;var ai=a.atob(W.substring(aa+e,ac+e));var ag=af-Math.floor(aa/4)*3;for(ae=ag;ae<ag+ab;ae++){ad.array[ae-ag]=ai.charCodeAt(ae)}ah(ad.array)}X.size=0;X.init=Z;X.readUint8Array=Y}O.prototype=new G();O.prototype.constructor=O;function t(e){var W=this;function Y(Z){W.size=e.size;Z()}function X(ab,ac,ae,aa){var Z=new FileReader();Z.onload=function(af){ae(new Uint8Array(af.target.result))};Z.onerror=aa;try{Z.readAsArrayBuffer(d(e,ab,ac))}catch(ad){aa(ad)}}W.size=0;W.init=Y;W.readUint8Array=X}t.prototype=new G();t.prototype.constructor=t;function h(){}h.prototype.getData=function(e){e(this.data)};function q(Y){var X=this,W;function aa(ab){W=new Blob([],{type:c});ab()}function Z(ac,ab){W=new Blob([W,H?ac:ac.buffer],{type:c});ab()}function e(ad,ac){var ab=new FileReader();ab.onload=function(ae){ad(ae.target.result)};ab.onerror=ac;ab.readAsText(W,Y)}X.init=aa;X.writeUint8Array=Z;X.getData=e}q.prototype=new h();q.prototype.constructor=q;function o(ab){var W=this,Y="",aa="";function Z(ac){Y+="data:"+(ab||"")+";base64,";ac()}function X(ag,af){var ac,ae=aa.length,ad=aa;aa="";for(ac=0;ac<(Math.floor((ae+ag.length)/3)*3)-ae;ac++){ad+=String.fromCharCode(ag[ac])}for(;ac<ag.length;ac++){aa+=String.fromCharCode(ag[ac])}if(ad.length>2){Y+=a.btoa(ad)}else{aa=ad}af()}function e(ac){ac(Y+a.btoa(aa))}W.init=Z;W.writeUint8Array=X;W.getData=e}o.prototype=new h();o.prototype.constructor=o;function N(aa){var W,X=this;function Z(ab){W=new Blob([],{type:aa});ab()}function Y(ac,ab){W=new Blob([W,H?ac:ac.buffer],{type:aa});ab()}function e(ab){ab(W)}X.init=Z;X.writeUint8Array=Y;X.getData=e}N.prototype=new h();N.prototype.constructor=N;function F(ab,W,X,aj,ac,ah,Z,Y,ak,aa){var e=0,af,ai,al=W.sn,ag;function am(){ab.removeEventListener("message",ad,false);Y(ai,ag)}function ad(ap){var ao=ap.data,aq=ao.data,an=ao.error;if(an){an.toString=function(){return"Error: "+this.message};ak(an);return}if(ao.sn!==al){return}if(typeof ao.codecTime==="number"){ab.codecTime+=ao.codecTime}if(typeof ao.crcTime==="number"){ab.crcTime+=ao.crcTime}switch(ao.type){case"append":if(aq){ai+=aq.length;aj.writeUint8Array(aq,function(){ae()},aa)}else{ae()}break;case"flush":ag=ao.crc;if(aq){ai+=aq.length;aj.writeUint8Array(aq,function(){am()},aa)}else{am()}break;case"progress":if(Z){Z(af+ao.loaded,ah)}break;case"importScripts":case"newTask":case"echo":break;default:console.warn("zip.js:launchWorkerProcess: unknown message: ",ao)}}function ae(){af=e*C;if(af<=ah){X.readUint8Array(ac+af,Math.min(C,ah-af),function(ap){if(Z){Z(af,ah)}var ao=af===0?W:{sn:al};ao.type="append";ao.data=ap;try{ab.postMessage(ao,[ap.buffer])}catch(an){ab.postMessage(ao)}e++},ak)}else{ab.postMessage({sn:al,type:"flush"})}}ai=0;ab.addEventListener("message",ad,false);ae()}function b(e,af,aa,ac,al,W,X,ak,Z,ad){var ai=0,ah,ab=0,aj=W==="input",ae=W==="output",ag=new M();function Y(){var am;ah=ai*C;if(ah<al){af.readUint8Array(ac+ah,Math.min(C,al-ah),function(ap){var ao;try{ao=e.append(ap,function(ar){if(X){X(ah+ar,al)}})}catch(aq){Z(aq);return}if(ao){ab+=ao.length;aa.writeUint8Array(ao,function(){ai++;setTimeout(Y,1)},ad);if(ae){ag.append(ao)}}else{ai++;setTimeout(Y,1)}if(aj){ag.append(ap)}if(X){X(ah,al)}},Z)}else{try{am=e.flush()}catch(an){Z(an);return}if(am){if(ae){ag.append(am)}ab+=am.length;aa.writeUint8Array(am,function(){ak(ab,ag.get())},ad)}else{ak(ab,ag.get())}}}Y()}function m(Y,X,ae,aa,ab,ah,af,ag,W,Z,ad){var e=af?"output":"none";if(a.zip.useWebWorkers){var ac={sn:X,codecClass:"Inflater",crcType:e};F(Y,ac,ae,aa,ab,ah,W,ag,Z,ad)}else{b(new a.zip.Inflater(),ae,aa,ab,ah,e,W,ag,Z,ad)}}function B(Z,Y,ae,aa,e,af,X,ab,ad){var W="input";if(a.zip.useWebWorkers){var ac={sn:Y,options:{level:e},codecClass:"Deflater",crcType:W};F(Z,ac,ae,aa,0,ae.size,X,af,ab,ad)}else{b(new a.zip.Deflater(),ae,aa,0,ae.size,W,X,af,ab,ad)}}function U(Y,X,ae,aa,ab,ah,af,ag,W,Z,ad){var e="input";if(a.zip.useWebWorkers&&af){var ac={sn:X,codecClass:"NOOP",crcType:e};F(Y,ac,ae,aa,ab,ah,W,ag,Z,ad)}else{b(new j(),ae,aa,ab,ah,e,W,ag,Z,ad)}}function J(Z){var Y,X="",W,e=["\u00C7","\u00FC","\u00E9","\u00E2","\u00E4","\u00E0","\u00E5","\u00E7","\u00EA","\u00EB","\u00E8","\u00EF","\u00EE","\u00EC","\u00C4","\u00C5","\u00C9","\u00E6","\u00C6","\u00F4","\u00F6","\u00F2","\u00FB","\u00F9","\u00FF","\u00D6","\u00DC","\u00F8","\u00A3","\u00D8","\u00D7","\u0192","\u00E1","\u00ED","\u00F3","\u00FA","\u00F1","\u00D1","\u00AA","\u00BA","\u00BF","\u00AE","\u00AC","\u00BD","\u00BC","\u00A1","\u00AB","\u00BB","_","_","_","\u00A6","\u00A6","\u00C1","\u00C2","\u00C0","\u00A9","\u00A6","\u00A6","+","+","\u00A2","\u00A5","+","+","-","-","+","-","+","\u00E3","\u00C3","+","+","-","-","\u00A6","-","+","\u00A4","\u00F0","\u00D0","\u00CA","\u00CB","\u00C8","i","\u00CD","\u00CE","\u00CF","+","+","_","_","\u00A6","\u00CC","_","\u00D3","\u00DF","\u00D4","\u00D2","\u00F5","\u00D5","\u00B5","\u00FE","\u00DE","\u00DA","\u00DB","\u00D9","\u00FD","\u00DD","\u00AF","\u00B4","\u00AD","\u00B1","_","\u00BE","\u00B6","\u00A7","\u00F7","\u00B8","\u00B0","\u00A8","\u00B7","\u00B9","\u00B3","\u00B2","_"," "];for(Y=0;Y<Z.length;Y++){W=Z.charCodeAt(Y)&255;if(W>127){X+=e[W-128]}else{X+=String.fromCharCode(W)}}return X}function x(e){return decodeURIComponent(escape(e))}function L(e){var W,X="";for(W=0;W<e.length;W++){X+=String.fromCharCode(e[W])}return X}function s(X){var W=(X&4294901760)>>16,Z=X&65535;try{return new Date(1980+((W&65024)>>9),((W&480)>>5)-1,W&31,(Z&63488)>>11,(Z&2016)>>5,(Z&31)*2,0)}catch(Y){}}function r(Y,Z,X,W,e){Y.version=Z.view.getUint16(X,true);Y.bitFlag=Z.view.getUint16(X+2,true);Y.compressionMethod=Z.view.getUint16(X+4,true);Y.lastModDateRaw=Z.view.getUint32(X+6,true);Y.lastModDate=s(Y.lastModDateRaw);if((Y.bitFlag&1)===1){e(A);return}if(W||(Y.bitFlag&8)!=8){Y.crc32=Z.view.getUint32(X+10,true);Y.compressedSize=Z.view.getUint32(X+14,true);Y.uncompressedSize=Z.view.getUint32(X+18,true)}if(Y.compressedSize===4294967295||Y.uncompressedSize===4294967295){e(S);return}Y.filenameLength=Z.view.getUint16(X+22,true);Y.extraFieldLength=Z.view.getUint16(X+24,true)}function V(W,ab,e){var aa=0;function X(){}X.prototype.getData=function(af,ak,ae,ac){var ai=this;function ad(al){var am=I(4);am.view.setUint32(0,al);return ai.crc32==am.view.getUint32(0)}function aj(al,am){if(ac&&!ad(am)){e(K)}else{af.getData(function(an){ak(an)})}}function ag(al){e(al||T)}function ah(al){e(al||k)}W.readUint8Array(ai.offset,30,function(am){var an=I(am.length,am),al;if(an.view.getUint32(0)!=1347093252){e(z);return}r(ai,an,4,false,e);al=ai.offset+30+ai.filenameLength+ai.extraFieldLength;af.init(function(){if(ai.compressionMethod===0){U(ai._worker,aa++,W,af,al,ai.compressedSize,ac,aj,ae,ag,ah)}else{m(ai._worker,aa++,W,af,al,ai.compressedSize,ac,aj,ae,ag,ah)}},ah)},ag)};function Z(af){var ad=22;if(W.size<ad){e(z);return}var ac=256*256,ae=ad+ac;ag(ad,function(){ag(Math.min(ae,W.size),function(){e(z)})});function ag(ah,ai){W.readUint8Array(W.size-ah,ah,function(aj){for(var ak=aj.length-ad;ak>=0;ak--){if(aj[ak]===80&&aj[ak+1]===75&&aj[ak+2]===5&&aj[ak+3]===6){af(new DataView(aj.buffer,ak,ad));return}}ai()},function(){e(D)})}}var Y={getEntries:function(ad){var ac=this._worker;Z(function(ag){var af,ae;af=ag.getUint32(16,true);ae=ag.getUint16(8,true);if(af<0||af>=W.size){e(z);return}W.readUint8Array(af,W.size-af,function(ai){var al,ak=0,ah=[],am,aj,ao,an=I(ai.length,ai);for(al=0;al<ae;al++){am=new X();am._worker=ac;if(an.view.getUint32(ak)!=1347092738){e(z);return}r(am,an,ak+6,true,e);am.commentLength=an.view.getUint16(ak+32,true);am.directory=((an.view.getUint8(ak+38)&16)==16);am.offset=an.view.getUint32(ak+42,true);aj=L(an.array.subarray(ak+46,ak+46+am.filenameLength));am.filename=((am.bitFlag&2048)===2048)?x(aj):J(aj);if(!am.directory&&am.filename.charAt(am.filename.length-1)=="/"){am.directory=true}ao=L(an.array.subarray(ak+46+am.filenameLength+am.extraFieldLength,ak+46+am.filenameLength+am.extraFieldLength+am.commentLength));am.comment=((am.bitFlag&2048)===2048)?x(ao):J(ao);ah.push(am);ak+=46+am.filenameLength+am.extraFieldLength+am.commentLength}ad(ah)},function(){e(D)})})},close:function(ac){if(this._worker){this._worker.terminate();this._worker=null}if(ac){ac()}},_worker:null};if(!a.zip.useWebWorkers){ab(Y)}else{w("inflater",function(ac){Y._worker=ac;ab(Y)},function(ac){e(ac)})}}function y(e){return unescape(encodeURIComponent(e))}function f(W){var e,X=[];for(e=0;e<W.length;e++){X.push(W.charCodeAt(e))}return X}function v(Y,ae,ad,Z){var e={},ab=[],af=0;var ac=0;function aa(ag){ad(ag||n)}function X(ag){ad(ag||T)}var W={add:function(ai,ao,aq,aj,ar){var an,ah,al;var ak=this._worker;function ap(au){var at;al=ar.lastModDate||new Date();an=I(26);e[ai]={headerArray:an.array,directory:ar.directory,filename:ah,offset:af,comment:f(y(ar.comment||""))};an.view.setUint32(0,335546376);if(ar.version){an.view.setUint8(0,ar.version)}if(!Z&&ar.level!==0&&!ar.directory){an.view.setUint16(4,2048)}an.view.setUint16(6,(((al.getHours()<<6)|al.getMinutes())<<5)|al.getSeconds()/2,true);an.view.setUint16(8,((((al.getFullYear()-1980)<<4)|(al.getMonth()+1))<<5)|al.getDate(),true);an.view.setUint16(22,ah.length,true);at=I(30+ah.length);at.view.setUint32(0,1347093252);at.array.set(an.array,4);at.array.set(ah,30);af+=at.array.length;Y.writeUint8Array(at.array,au,aa)}function ag(at,au){var av=I(16);af+=at||0;av.view.setUint32(0,1347094280);if(typeof au!="undefined"){an.view.setUint32(10,au,true);av.view.setUint32(4,au,true)}if(ao){av.view.setUint32(8,at,true);an.view.setUint32(14,at,true);av.view.setUint32(12,ao.size,true);an.view.setUint32(18,ao.size,true)}Y.writeUint8Array(av.array,function(){af+=16;aq()},aa)}function am(){ar=ar||{};ai=ai.trim();if(ar.directory&&ai.charAt(ai.length-1)!="/"){ai+="/"}if(e.hasOwnProperty(ai)){ad(g);return}ah=f(y(ai));ab.push(ai);ap(function(){if(ao){if(Z||ar.level===0){U(ak,ac++,ao,Y,0,ao.size,true,ag,aj,X,aa)}else{B(ak,ac++,ao,Y,ar.level,ag,aj,X,aa)}}else{ag()}},aa)}if(ao){ao.init(am,X)}else{am()}},close:function(al){if(this._worker){this._worker.terminate();this._worker=null}var ak,aj=0,ah=0,ag,ai;for(ag=0;ag<ab.length;ag++){ai=e[ab[ag]];aj+=46+ai.filename.length+ai.comment.length}ak=I(aj+22);for(ag=0;ag<ab.length;ag++){ai=e[ab[ag]];ak.view.setUint32(ah,1347092738);ak.view.setUint16(ah+4,5120);ak.array.set(ai.headerArray,ah+6);ak.view.setUint16(ah+32,ai.comment.length,true);if(ai.directory){ak.view.setUint8(ah+38,16)}ak.view.setUint32(ah+42,ai.offset,true);ak.array.set(ai.filename,ah+46);ak.array.set(ai.comment,ah+46+ai.filename.length);ah+=46+ai.filename.length+ai.comment.length}ak.view.setUint32(ah,1347093766);ak.view.setUint16(ah+8,ab.length,true);ak.view.setUint16(ah+10,ab.length,true);ak.view.setUint32(ah+12,aj,true);ak.view.setUint32(ah+16,af,true);Y.writeUint8Array(ak.array,function(){Y.getData(al)},aa)},_worker:null};if(!a.zip.useWebWorkers){ae(W)}else{w("deflater",function(ag){W._worker=ag;ae(W)},function(ag){ad(ag)})}}function p(W){var e=document.createElement("a");return W.map(function(X){e.href=X;return e.href})}var l={deflater:["z-worker.js","deflate.js"],inflater:["z-worker.js","inflate.js"]};function w(Y,ab,W){if(a.zip.workerScripts!==null&&a.zip.workerScriptsPath!==null){W(new Error("Either zip.workerScripts or zip.workerScriptsPath may be set, not both."));return}var e;if(a.zip.workerScripts){e=a.zip.workerScripts[Y];if(!Array.isArray(e)){W(new Error("zip.workerScripts."+Y+" is not an array!"));return}e=p(e)}else{e=l[Y].slice(0);e[0]=(a.zip.workerScriptsPath||"")+e[0]}var Z=new Worker(e[0]);Z.codecTime=Z.crcTime=0;Z.postMessage({type:"importScripts",scripts:e.slice(1)});Z.addEventListener("message",aa);function aa(ac){var ad=ac.data;if(ad.error){Z.terminate();W(ad.error);return}if(ad.type==="importScripts"){Z.removeEventListener("message",aa);Z.removeEventListener("error",X);ab(Z)}}Z.addEventListener("error",X);function X(ac){Z.terminate();W(ac)}}function u(e){console.error(e)}a.zip={Reader:G,Writer:h,BlobReader:t,Data64URIReader:O,TextReader:Q,BlobWriter:N,Data64URIWriter:o,TextWriter:q,createReader:function(W,X,e){e=e||u;W.init(function(){V(W,X,e)},e)},createWriter:function(W,Y,e,X){e=e||u;X=!!X;W.init(function(){v(W,Y,e,X)},e)},useWebWorkers:true,workerScriptsPath:null,workerScripts:null}})(this);(function(){var i=512*1024;var j=zip.TextWriter,r=zip.BlobWriter,u=zip.Data64URIWriter,x=zip.Reader,v=zip.TextReader,a=zip.BlobReader,c=zip.Data64URIReader,q=zip.createReader,g=zip.createWriter;function h(C){var B=this,E;function F(G){B.size=C.uncompressedSize;G()}function A(G){if(B.data){G()}else{C.getData(new r(),function(H){B.data=H;E=new a(H);G()},null,B.checkCrc32)}}function D(H,I,J,G){A(function(){E.readUint8Array(H,I,J,G)},G)}B.size=0;B.init=F;B.readUint8Array=D}h.prototype=new x();h.prototype.constructor=h;h.prototype.checkCrc32=false;function s(B){var A=0;function C(D){A+=D.uncompressedSize||0;D.children.forEach(C)}C(B);return A}function l(D,E,A){var B=0;function C(){B++;if(B<D.children.length){F(D.children[B])}else{E()}}function F(G){if(G.directory){l(G,C,A)}else{G.reader=new G.Reader(G.data,A);G.reader.init(function(){G.uncompressedSize=G.reader.size;C()})}}if(D.children.length){F(D.children[B])}else{E()}}function y(B){var A=B.parent.children;A.forEach(function(D,C){if(D.id==B.id){A.splice(C,1)}})}function m(C,D,F,E,B){var A=0;function G(J,K,M,L,H){var N=0;function I(){var O=K.children[N];if(O){J.add(O.getFullname(),O.reader,function(){A+=O.uncompressedSize||0;G(J,O,function(){N++;I()},L,H)},function(P){if(L){L(A+P,H)}},{directory:O.directory,version:O.zipVersion})}else{M()}}I()}G(C,D,F,E,B)}function p(D,F,B,A){function E(K,J){var H=[];if(K.isDirectory){var G=K.createReader();(function I(){G.readEntries(function(L){if(!L.length){J(H)}else{H=H.concat(L);I()}},A)})()}if(K.isFile){J(H)}}function C(H,I,G){E(I,function(J){var M=0;function L(O){function N(P){C(P,O,function(){M++;K()})}if(O.isDirectory){N(H.addDirectory(O.name))}if(O.isFile){O.file(function(Q){var P=H.addBlob(O.name,Q);P.uncompressedSize=Q.size;N(P)},A)}}function K(){var N=J[M];if(N){L(N)}else{G()}}K()})}if(F.isDirectory){C(D,F,B)}else{F.file(function(G){D.addBlob(F.name,G);B()},A)}}function z(D,G,I,C,F,H,A){var E=0;function B(M,P,R,K,O,Q){var L=0;function N(T){function S(U){E+=T.uncompressedSize||0;B(U,T,function(){L++;J()},K,O,Q)}if(T.directory){M.getDirectory(T.name,{create:true},S,O)}else{M.getFile(T.name,{create:true},function(U){T.getData(new zip.FileWriter(U,zip.getMimeType(T.name)),S,function(V){if(K){K(E+V,Q)}},A)},O)}}function J(){var S=P.children[L];if(S){N(S)}else{R()}}J()}if(G.directory){B(D,G,I,C,F,H)}else{G.getData(new zip.FileWriter(D,zip.getMimeType(G.name)),I,C,A)}}function o(A){A.entries=[];A.root=new t(A)}function k(B,G,F,E,A){var C=0;function D(){var H=C*i;if(E){E(H,B.size)}if(H<B.size){B.readUint8Array(H,Math.min(i,B.size-H),function(I){G.writeUint8Array(new Uint8Array(I),function(){C++;D()})},A)}else{G.getData(F)}}D()}function d(C,B,D,A){if(C.directory){return A?new t(C.fs,B,D,C):new w(C.fs,B,D,C)}else{throw"Parent entry is not a directory."}}function f(){}f.prototype={init:function(A,B,E,C){var D=this;if(A.root&&C&&C.getChildByName(B)){throw"Entry filename already exists."}if(!E){E={}}D.fs=A;D.name=B;D.id=A.entries.length;D.parent=C;D.children=[];D.zipVersion=E.zipVersion||20;D.uncompressedSize=0;A.entries.push(D);if(C){D.parent.children.push(D)}},getFileEntry:function(F,E,D,A,B){var C=this;l(C,function(){z(F,C,E,D,A,s(C),B)},A)},moveTo:function(B){var A=this;if(B.directory){if(!B.isDescendantOf(A)){if(A!=B){if(B.getChildByName(A.name)){throw"Entry filename already exists."}y(A);A.parent=B;B.children.push(A)}}else{throw"Entry is a ancestor of target entry."}}else{throw"Target entry is not a directory."}},getFullname:function(){var C=this,A=C.name,B=C.parent;while(B){A=(B.name?B.name+"/":"")+A;B=B.parent}return A},isDescendantOf:function(A){var B=this.parent;while(B&&B.id!=A.id){B=B.parent}return !!B}};f.prototype.constructor=f;var n;function w(A,B,E,C){var D=this;f.prototype.init.call(D,A,B,E,C);D.Reader=E.Reader;D.Writer=E.Writer;D.data=E.data;if(E.getData){D.getData=E.getData}}w.prototype=n=new f();n.constructor=w;n.getData=function(E,D,C,A){var B=this;if(!E||(E.constructor==B.Writer&&B.data)){D(B.data)}else{if(!B.reader){B.reader=new B.Reader(B.data,A)}B.reader.init(function(){E.init(function(){k(B.reader,E,D,C,A)},A)})}};n.getText=function(D,C,A,B){this.getData(new j(B),D,C,A)};n.getBlob=function(D,C,B,A){this.getData(new r(D),C,B,A)};n.getData64URI=function(D,C,B,A){this.getData(new u(D),C,B,A)};var e;function t(A,B,E,C){var D=this;f.prototype.init.call(D,A,B,E,C);D.directory=true}t.prototype=e=new f();e.constructor=t;e.addDirectory=function(A){return d(this,A,null,true)};e.addText=function(A,B){return d(this,A,{data:B,Reader:v,Writer:j})};e.addBlob=function(B,A){return d(this,B,{data:A,Reader:a,Writer:r})};e.addData64URI=function(B,A){return d(this,B,{data:A,Reader:c,Writer:u})};e.addFileEntry=function(C,B,A){p(this,C,B,A)};e.addData=function(A,B){return d(this,A,B)};e.importBlob=function(B,C,A){this.importZip(new a(B),C,A)};e.importText=function(C,B,A){this.importZip(new v(C),B,A)};e.importData64URI=function(B,C,A){this.importZip(new c(B),C,A)};e.exportBlob=function(C,B,A){this.exportZip(new r("application/zip"),C,B,A)};e.exportText=function(C,B,A){this.exportZip(new j(),C,B,A)};e.exportFileEntry=function(D,C,B,A){this.exportZip(new zip.FileWriter(D,"application/zip"),C,B,A)};e.exportData64URI=function(C,B,A){this.exportZip(new u("application/zip"),C,B,A)};e.importZip=function(B,D,A){var C=this;q(B,function(E){E.getEntries(function(F){F.forEach(function(I){var H=C,J=I.filename.split("/"),G=J.pop();J.forEach(function(K){H=H.getChildByName(K)||new t(C.fs,K,null,H)});if(!I.directory){d(H,G,{data:I,Reader:h})}});D()})},A)};e.exportZip=function(E,D,C,A){var B=this;l(B,function(){g(E,function(F){m(F,B,function(){F.close(D)},C,s(B))},A)},A)};e.getChildByName=function(A){var D,C,B=this;for(D=0;D<B.children.length;D++){C=B.children[D];if(C.name==A){return C}}};function b(){o(this)}b.prototype={remove:function(A){y(A);this.entries[A.id]=null},find:function(A){var B,D=A.split("/"),C=this.root;for(B=0;C&&B<D.length;B++){C=C.getChildByName(D[B])}return C},getById:function(A){return this.entries[A]},importBlob:function(B,C,A){o(this);this.root.importBlob(B,C,A)},importText:function(C,B,A){o(this);this.root.importText(C,B,A)},importData64URI:function(B,C,A){o(this);this.root.importData64URI(B,C,A)},exportBlob:function(C,B,A){this.root.exportBlob(C,B,A)},exportText:function(C,B,A){this.root.exportText(C,B,A)},exportFileEntry:function(D,C,B,A){this.root.exportFileEntry(D,C,B,A)},exportData64URI:function(C,B,A){this.root.exportData64URI(C,B,A)}};zip.fs={FS:b,ZipDirectoryEntry:t,ZipFileEntry:w};zip.getMimeType=function(){return"application/octet-stream"}})();(function(){var c="HTTP Range not supported.";var j=zip.Reader;var g=zip.Writer;var h;var f;try{f=new Blob([new DataView(new ArrayBuffer(0))]).size===0}catch(i){}function b(n){var e=document.createElement("a");e.href=n;return e.protocol==="http:"||e.protocol==="https:"}function d(n){var o=this;function e(t,r){var s;if(!o.data){s=new XMLHttpRequest();s.addEventListener("load",function(){if(!o.size){o.size=Number(s.getResponseHeader("Content-Length"))||Number(s.response.byteLength)}o.data=new Uint8Array(s.response);t()},false);s.addEventListener("error",r,false);s.open("GET",n);s.responseType="arraybuffer";s.send()}else{t()}}function q(t,r){if(!b(n)){e(t,r);return}var s=new XMLHttpRequest();s.addEventListener("load",function(){o.size=Number(s.getResponseHeader("Content-Length"));if(!o.size){e(t,r)}else{t()}},false);s.addEventListener("error",r,false);s.open("HEAD",n);s.send()}function p(s,t,u,r){e(function(){u(new Uint8Array(o.data.subarray(s,s+t)))},r)}o.size=0;o.init=q;o.readUint8Array=p}d.prototype=new j();d.prototype.constructor=d;function k(e){var n=this;function q(t,r){var s=new XMLHttpRequest();s.addEventListener("load",function(){n.size=Number(s.getResponseHeader("Content-Length"));if(s.getResponseHeader("Accept-Ranges")=="bytes"){t()}else{r(c)}},false);s.addEventListener("error",r,false);s.open("HEAD",e);s.send()}function p(s,u,v,r){var t=new XMLHttpRequest();t.open("GET",e);t.responseType="arraybuffer";t.setRequestHeader("Range","bytes="+s+"-"+(s+u-1));t.addEventListener("load",function(){v(t.response)},false);t.addEventListener("error",r,false);t.send()}function o(s,t,u,r){p(s,t,function(v){u(new Uint8Array(v))},r)}n.size=0;n.init=q;n.readUint8Array=o}k.prototype=new j();k.prototype.constructor=k;function a(e){var n=this;function p(r,q){n.size=e.byteLength;r()}function o(r,s,t,q){t(new Uint8Array(e.slice(r,r+s)))}n.size=0;n.init=p;n.readUint8Array=o}a.prototype=new j();a.prototype.constructor=a;function l(){var q,n=this;function p(s,r){q=new Uint8Array();s()}function o(s,u,r){var t=new Uint8Array(q.length+s.length);t.set(q);t.set(s,q.length);q=t;u()}function e(r){r(q.buffer)}n.init=p;n.writeUint8Array=o;n.getData=e}l.prototype=new g();l.prototype.constructor=l;function m(s,r){var p,n=this;function q(u,t){s.createWriter(function(v){p=v;u()},t)}function o(w,v,t){var u=new Blob([f?w:w.buffer],{type:r});p.onwrite=function(){p.onwrite=null;v()};p.onerror=t;p.write(u)}function e(t){s.file(t)}n.init=q;n.writeUint8Array=o;n.getData=e}m.prototype=new g();m.prototype.constructor=m;zip.FileWriter=m;zip.HttpReader=d;zip.HttpRangeReader=k;zip.ArrayBufferReader=a;zip.ArrayBufferWriter=l;if(zip.fs){h=zip.fs.ZipDirectoryEntry;h.prototype.addHttpContent=function(n,e,o){function p(s,r,t,q){if(s.directory){return q?new h(s.fs,r,t,s):new zip.fs.ZipFileEntry(s.fs,r,t,s)}else{throw"Parent entry is not a directory."}}return p(this,n,{data:e,Reader:o?k:d})};h.prototype.importHttpContent=function(n,o,p,e){this.importZip(o?new k(n):new d(n),p,e)};zip.fs.FS.prototype.importHttpContent=function(n,o,p,e){this.entries=[];this.root=new h(this);this.root.importHttpContent(n,o,p,e)}}})();(function(b){var ae=15;var c=30;var p=19;var k=29;var f=256;var g=(f+1+k);var h=(2*g+1);var d=256;var V=7;var B=16;var A=17;var E=18;var u=8*2;var y=-1;var N=1;var L=2;var a=0;var Z=0;var D=1;var r=3;var l=4;var v=0;var ad=1;var M=2;var ag=-2;var o=-3;var O=-5;var X=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];function s(){var ai=this;function ak(ax){var ay=ai.dyn_tree;var aw=ai.stat_desc.static_tree;var ao=ai.stat_desc.extra_bits;var al=ai.stat_desc.extra_base;var av=ai.stat_desc.max_length;var ar;var am,an;var au;var aq;var at;var ap=0;for(au=0;au<=ae;au++){ax.bl_count[au]=0}ay[ax.heap[ax.heap_max]*2+1]=0;for(ar=ax.heap_max+1;ar<h;ar++){am=ax.heap[ar];au=ay[ay[am*2+1]*2+1]+1;if(au>av){au=av;ap++}ay[am*2+1]=au;if(am>ai.max_code){continue}ax.bl_count[au]++;aq=0;if(am>=al){aq=ao[am-al]}at=ay[am*2];ax.opt_len+=at*(au+aq);if(aw){ax.static_len+=at*(aw[am*2+1]+aq)}}if(ap===0){return}do{au=av-1;while(ax.bl_count[au]===0){au--}ax.bl_count[au]--;ax.bl_count[au+1]+=2;ax.bl_count[av]--;ap-=2}while(ap>0);for(au=av;au!==0;au--){am=ax.bl_count[au];while(am!==0){an=ax.heap[--ar];if(an>ai.max_code){continue}if(ay[an*2+1]!=au){ax.opt_len+=(au-ay[an*2+1])*ay[an*2];ay[an*2+1]=au}am--}}}function aj(an,al){var am=0;do{am|=an&1;an>>>=1;am<<=1}while(--al>0);return am>>>1}function ah(am,at,an){var ap=[];var ao=0;var aq;var ar;var al;for(aq=1;aq<=ae;aq++){ap[aq]=ao=((ao+an[aq-1])<<1)}for(ar=0;ar<=at;ar++){al=am[ar*2+1];if(al===0){continue}am[ar*2]=aj(ap[al]++,al)}}ai.build_tree=function(ao){var am=ai.dyn_tree;var aq=ai.stat_desc.static_tree;var an=ai.stat_desc.elems;var at,al;var ar=-1;var ap;ao.heap_len=0;ao.heap_max=h;for(at=0;at<an;at++){if(am[at*2]!==0){ao.heap[++ao.heap_len]=ar=at;ao.depth[at]=0}else{am[at*2+1]=0}}while(ao.heap_len<2){ap=ao.heap[++ao.heap_len]=ar<2?++ar:0;am[ap*2]=1;ao.depth[ap]=0;ao.opt_len--;if(aq){ao.static_len-=aq[ap*2+1]}}ai.max_code=ar;for(at=Math.floor(ao.heap_len/2);at>=1;at--){ao.pqdownheap(am,at)}ap=an;do{at=ao.heap[1];ao.heap[1]=ao.heap[ao.heap_len--];ao.pqdownheap(am,1);al=ao.heap[1];ao.heap[--ao.heap_max]=at;ao.heap[--ao.heap_max]=al;am[ap*2]=(am[at*2]+am[al*2]);ao.depth[ap]=Math.max(ao.depth[at],ao.depth[al])+1;am[at*2+1]=am[al*2+1]=ap;ao.heap[1]=ap++;ao.pqdownheap(am,1)}while(ao.heap_len>=2);ao.heap[--ao.heap_max]=ao.heap[1];ak(ao);ah(am,ai.max_code,ao.bl_count)}}s._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28];s.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0];s.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576];s.d_code=function(ah){return((ah)<256?X[ah]:X[256+((ah)>>>7)])};s.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];s.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];s.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];s.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function aa(ak,aj,ai,ah,am){var al=this;al.static_tree=ak;al.extra_bits=aj;al.extra_base=ai;al.elems=ah;al.max_length=am}aa.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8];aa.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5];aa.static_l_desc=new aa(aa.static_ltree,s.extra_lbits,f+1,g,ae);aa.static_d_desc=new aa(aa.static_dtree,s.extra_dbits,0,c,ae);aa.static_bl_desc=new aa(null,s.extra_blbits,0,p,V);var Y=9;var W=8;function n(ah,am,ai,al,ak){var aj=this;aj.good_length=ah;aj.max_lazy=am;aj.nice_length=ai;aj.max_chain=al;aj.func=ak}var G=0;var q=1;var I=2;var e=[new n(0,0,0,0,G),new n(4,4,8,4,q),new n(4,5,16,8,q),new n(4,6,32,32,q),new n(4,4,16,16,I),new n(8,16,32,32,I),new n(8,16,128,128,I),new n(8,32,128,256,I),new n(32,128,258,1024,I),new n(32,258,258,4096,I)];var t=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];var J=0;var U=1;var F=2;var j=3;var i=32;var z=42;var T=113;var R=666;var S=8;var P=0;var ac=1;var C=2;var af=3;var x=258;var w=(x+af+1);function Q(aj,am,ai,al){var ak=aj[am*2];var ah=aj[ai*2];return(ak<ah||(ak==ah&&al[am]<=al[ai]))}function H(){var aU=this;var aJ;var aS;var bb;var aB;var an;var ao;var a0;var aE;var bm;var ah;var aO;var aI;var a2;var ay;var a9;var aQ;var br;var bq;var bh;var aP;var au;var bs;var aV;var aL;var ak;var aA;var a4;var ba;var ai;var ap;var az;var be;var aG;var am;var aC=new s();var bp=new s();var bg=new s();aU.depth=[];var a3;var bj;var a7;var al;var aw;var a8;var aR;var av;aU.bl_count=[];aU.heap=[];be=[];aG=[];am=[];function aW(){var bt;ah=2*ao;aI[ay-1]=0;for(bt=0;bt<ay-1;bt++){aI[bt]=0}a4=e[ba].max_lazy;ap=e[ba].good_length;az=e[ba].nice_length;aA=e[ba].max_chain;bs=0;bq=0;aL=0;bh=ak=af-1;au=0;a2=0}function aX(){var bt;for(bt=0;bt<g;bt++){be[bt*2]=0}for(bt=0;bt<c;bt++){aG[bt*2]=0}for(bt=0;bt<p;bt++){am[bt*2]=0}be[d*2]=1;aU.opt_len=aU.static_len=0;a7=aw=0}function bk(){aC.dyn_tree=be;aC.stat_desc=aa.static_l_desc;bp.dyn_tree=aG;bp.stat_desc=aa.static_d_desc;bg.dyn_tree=am;bg.stat_desc=aa.static_bl_desc;aR=0;av=0;a8=8;aX()}aU.pqdownheap=function(bt,bv){var bx=aU.heap;var bu=bx[bv];var bw=bv<<1;while(bw<=aU.heap_len){if(bw<aU.heap_len&&Q(bt,bx[bw+1],bx[bw],aU.depth)){bw++}if(Q(bt,bu,bx[bw],aU.depth)){break}bx[bv]=bx[bw];bv=bw;bw<<=1}bx[bv]=bu};function a5(bB,bA){var bu;var by=-1;var bt;var bw=bB[0*2+1];var bx=0;var bv=7;var bz=4;if(bw===0){bv=138;bz=3}bB[(bA+1)*2+1]=65535;for(bu=0;bu<=bA;bu++){bt=bw;bw=bB[(bu+1)*2+1];if(++bx<bv&&bt==bw){continue}else{if(bx<bz){am[bt*2]+=bx}else{if(bt!==0){if(bt!=by){am[bt*2]++}am[B*2]++}else{if(bx<=10){am[A*2]++}else{am[E*2]++}}}}bx=0;by=bt;if(bw===0){bv=138;bz=3}else{if(bt==bw){bv=6;bz=3}else{bv=7;bz=4}}}}function aM(){var bt;a5(be,aC.max_code);a5(aG,bp.max_code);bg.build_tree(aU);for(bt=p-1;bt>=3;bt--){if(am[s.bl_order[bt]*2+1]!==0){break}}aU.opt_len+=3*(bt+1)+5+5+4;return bt}function aj(bt){aU.pending_buf[aU.pending++]=bt}function bc(bt){aj(bt&255);aj((bt>>>8)&255)}function aK(bt){aj((bt>>8)&255);aj((bt&255)&255)}function bl(bv,bu){var bw,bt=bu;if(av>u-bt){bw=bv;aR|=((bw<<av)&65535);bc(aR);aR=bw>>>(u-av);av+=bt-u}else{aR|=(((bv)<<av)&65535);av+=bt}}function aT(bv,bt){var bu=bv*2;bl(bt[bu]&65535,bt[bu+1]&65535)}function a6(bB,bA){var bu;var by=-1;var bt;var bw=bB[0*2+1];var bx=0;var bv=7;var bz=4;if(bw===0){bv=138;bz=3}for(bu=0;bu<=bA;bu++){bt=bw;bw=bB[(bu+1)*2+1];if(++bx<bv&&bt==bw){continue}else{if(bx<bz){do{aT(bt,am)}while(--bx!==0)}else{if(bt!==0){if(bt!=by){aT(bt,am);bx--}aT(B,am);bl(bx-3,2)}else{if(bx<=10){aT(A,am);bl(bx-3,3)}else{aT(E,am);bl(bx-11,7)}}}}bx=0;by=bt;if(bw===0){bv=138;bz=3}else{if(bt==bw){bv=6;bz=3}else{bv=7;bz=4}}}}function bi(bu,bt,bv){var bw;bl(bu-257,5);bl(bt-1,5);bl(bv-4,4);for(bw=0;bw<bv;bw++){bl(am[s.bl_order[bw]*2+1],3)}a6(be,bu-1);a6(aG,bt-1)}function a1(){if(av==16){bc(aR);aR=0;av=0}else{if(av>=8){aj(aR&255);aR>>>=8;av-=8}}}function at(){bl(ac<<1,3);aT(d,aa.static_ltree);a1();if(1+a8+10-av<9){bl(ac<<1,3);aT(d,aa.static_ltree);a1()}a8=7}function aH(bx,bv){var bt,bw,bu;aU.pending_buf[al+a7*2]=(bx>>>8)&255;aU.pending_buf[al+a7*2+1]=bx&255;aU.pending_buf[a3+a7]=bv&255;a7++;if(bx===0){be[bv*2]++}else{aw++;bx--;be[(s._length_code[bv]+f+1)*2]++;aG[s.d_code(bx)*2]++}if((a7&8191)===0&&ba>2){bt=a7*8;bw=bs-bq;for(bu=0;bu<c;bu++){bt+=aG[bu*2]*(5+s.extra_dbits[bu])}bt>>>=3;if((aw<Math.floor(a7/2))&&bt<Math.floor(bw/2)){return true}}return(a7==bj-1)}function aZ(bz,bw){var by;var bv;var bx=0;var bu;var bt;if(a7!==0){do{by=((aU.pending_buf[al+bx*2]<<8)&65280)|(aU.pending_buf[al+bx*2+1]&255);bv=(aU.pending_buf[a3+bx])&255;bx++;if(by===0){aT(bv,bz)}else{bu=s._length_code[bv];aT(bu+f+1,bz);bt=s.extra_lbits[bu];if(bt!==0){bv-=s.base_length[bu];bl(bv,bt)}by--;bu=s.d_code(by);aT(bu,bw);bt=s.extra_dbits[bu];if(bt!==0){by-=s.base_dist[bu];bl(by,bt)}}}while(bx<a7)}aT(d,bz);a8=bz[d*2+1]}function bn(){if(av>8){bc(aR)}else{if(av>0){aj(aR&255)}}aR=0;av=0}function ax(bu,bt,bv){bn();a8=8;if(bv){bc(bt);bc(~bt)}aU.pending_buf.set(bm.subarray(bu,bu+bt),aU.pending);aU.pending+=bt}function aN(bu,bv,bt){bl((P<<1)+(bt?1:0),3);ax(bu,bv,true)}function aF(bw,by,bt){var bv,bu;var bx=0;if(ba>0){aC.build_tree(aU);bp.build_tree(aU);bx=aM();bv=(aU.opt_len+3+7)>>>3;bu=(aU.static_len+3+7)>>>3;if(bu<=bv){bv=bu}}else{bv=bu=by+5}if((by+4<=bv)&&bw!=-1){aN(bw,by,bt)}else{if(bu==bv){bl((ac<<1)+(bt?1:0),3);aZ(aa.static_ltree,aa.static_dtree)}else{bl((C<<1)+(bt?1:0),3);bi(aC.max_code+1,bp.max_code+1,bx+1);aZ(be,aG)}}aX();if(bt){bn()}}function aq(bt){aF(bq>=0?bq:-1,bs-bq,bt);bq=bs;aJ.flush_pending()}function bf(){var bw,bt;var bv;var bu;do{bu=(ah-aL-bs);if(bu===0&&bs===0&&aL===0){bu=ao}else{if(bu==-1){bu--}else{if(bs>=ao+ao-w){bm.set(bm.subarray(ao,ao+ao),0);aV-=ao;bs-=ao;bq-=ao;bw=ay;bv=bw;do{bt=(aI[--bv]&65535);aI[bv]=(bt>=ao?bt-ao:0)}while(--bw!==0);bw=ao;bv=bw;do{bt=(aO[--bv]&65535);aO[bv]=(bt>=ao?bt-ao:0)}while(--bw!==0);bu+=ao}}}if(aJ.avail_in===0){return}bw=aJ.read_buf(bm,bs+aL,bu);aL+=bw;if(aL>=af){a2=bm[bs]&255;a2=(((a2)<<br)^(bm[bs+1]&255))&aQ}}while(aL<w&&aJ.avail_in!==0)}function aY(bt){var bv=65535;var bu;if(bv>bb-5){bv=bb-5}while(true){if(aL<=1){bf();if(aL===0&&bt==Z){return J}if(aL===0){break}}bs+=aL;aL=0;bu=bq+bv;if(bs===0||bs>=bu){aL=(bs-bu);bs=bu;aq(false);if(aJ.avail_out===0){return J}}if(bs-bq>=ao-w){aq(false);if(aJ.avail_out===0){return J}}}aq(bt==l);if(aJ.avail_out===0){return(bt==l)?F:J}return bt==l?j:U}function bo(bw){var bz=aA;var bE=bs;var bx;var by;var bt=ak;var bu=bs>(ao-w)?bs-(ao-w):0;var bv=az;var bA=aE;var bC=bs+x;var bD=bm[bE+bt-1];var bB=bm[bE+bt];if(ak>=ap){bz>>=2}if(bv>aL){bv=aL}do{bx=bw;if(bm[bx+bt]!=bB||bm[bx+bt-1]!=bD||bm[bx]!=bm[bE]||bm[++bx]!=bm[bE+1]){continue}bE+=2;bx++;do{}while(bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bm[++bE]==bm[++bx]&&bE<bC);by=x-(bC-bE);bE=bC-x;if(by>bt){aV=bw;bt=by;if(by>=bv){break}bD=bm[bE+bt-1];bB=bm[bE+bt]}}while((bw=(aO[bw&bA]&65535))>bu&&--bz!==0);if(bt<=aL){return bt}return aL}function ar(bt){var bv=0;var bu;while(true){if(aL<w){bf();if(aL<w&&bt==Z){return J}if(aL===0){break}}if(aL>=af){a2=(((a2)<<br)^(bm[(bs)+(af-1)]&255))&aQ;bv=(aI[a2]&65535);aO[bs&aE]=aI[a2];aI[a2]=bs}if(bv!==0&&((bs-bv)&65535)<=ao-w){if(ai!=L){bh=bo(bv)}}if(bh>=af){bu=aH(bs-aV,bh-af);aL-=bh;if(bh<=a4&&aL>=af){bh--;do{bs++;a2=((a2<<br)^(bm[(bs)+(af-1)]&255))&aQ;bv=(aI[a2]&65535);aO[bs&aE]=aI[a2];aI[a2]=bs}while(--bh!==0);bs++}else{bs+=bh;bh=0;a2=bm[bs]&255;a2=(((a2)<<br)^(bm[bs+1]&255))&aQ}}else{bu=aH(0,bm[bs]&255);aL--;bs++}if(bu){aq(false);if(aJ.avail_out===0){return J}}}aq(bt==l);if(aJ.avail_out===0){if(bt==l){return F}else{return J}}return bt==l?j:U}function bd(bu){var bw=0;var bv;var bt;while(true){if(aL<w){bf();if(aL<w&&bu==Z){return J}if(aL===0){break}}if(aL>=af){a2=(((a2)<<br)^(bm[(bs)+(af-1)]&255))&aQ;bw=(aI[a2]&65535);aO[bs&aE]=aI[a2];aI[a2]=bs}ak=bh;aP=aV;bh=af-1;if(bw!==0&&ak<a4&&((bs-bw)&65535)<=ao-w){if(ai!=L){bh=bo(bw)}if(bh<=5&&(ai==N||(bh==af&&bs-aV>4096))){bh=af-1}}if(ak>=af&&bh<=ak){bt=bs+aL-af;bv=aH(bs-1-aP,ak-af);aL-=ak-1;ak-=2;do{if(++bs<=bt){a2=(((a2)<<br)^(bm[(bs)+(af-1)]&255))&aQ;bw=(aI[a2]&65535);aO[bs&aE]=aI[a2];aI[a2]=bs}}while(--ak!==0);au=0;bh=af-1;bs++;if(bv){aq(false);if(aJ.avail_out===0){return J}}}else{if(au!==0){bv=aH(0,bm[bs-1]&255);if(bv){aq(false)}bs++;aL--;if(aJ.avail_out===0){return J}}else{au=1;bs++;aL--}}}if(au!==0){bv=aH(0,bm[bs-1]&255);au=0}aq(bu==l);if(aJ.avail_out===0){if(bu==l){return F}else{return J}}return bu==l?j:U}function aD(bt){bt.total_in=bt.total_out=0;bt.msg=null;aU.pending=0;aU.pending_out=0;aS=T;an=Z;bk();aW();return v}aU.deflateInit=function(bt,bv,bw,bu,by,bx){if(!bu){bu=S}if(!by){by=W}if(!bx){bx=a}bt.msg=null;if(bv==y){bv=6}if(by<1||by>Y||bu!=S||bw<9||bw>15||bv<0||bv>9||bx<0||bx>L){return ag}bt.dstate=aU;a0=bw;ao=1<<a0;aE=ao-1;a9=by+7;ay=1<<a9;aQ=ay-1;br=Math.floor((a9+af-1)/af);bm=new Uint8Array(ao*2);aO=[];aI=[];bj=1<<(by+6);aU.pending_buf=new Uint8Array(bj*4);bb=bj*4;al=Math.floor(bj/2);a3=(1+2)*bj;ba=bv;ai=bx;aB=bu&255;return aD(bt)};aU.deflateEnd=function(){if(aS!=z&&aS!=T&&aS!=R){return ag}aU.pending_buf=null;aI=null;aO=null;bm=null;aU.dstate=null;return aS==T?o:v};aU.deflateParams=function(bt,bu,bw){var bv=v;if(bu==y){bu=6}if(bu<0||bu>9||bw<0||bw>L){return ag}if(e[ba].func!=e[bu].func&&bt.total_in!==0){bv=bt.deflate(D)}if(ba!=bu){ba=bu;a4=e[ba].max_lazy;ap=e[ba].good_length;az=e[ba].nice_length;aA=e[ba].max_chain}ai=bw;return bv};aU.deflateSetDictionary=function(bt,by,bw){var bv=bw;var bx,bu=0;if(!by||aS!=z){return ag}if(bv<af){return v}if(bv>ao-w){bv=ao-w;bu=bw-bv}bm.set(by.subarray(bu,bu+bv),0);bs=bv;bq=bv;a2=bm[0]&255;a2=(((a2)<<br)^(bm[1]&255))&aQ;for(bx=0;bx<=bv-af;bx++){a2=(((a2)<<br)^(bm[(bx)+(af-1)]&255))&aQ;aO[bx&aE]=aI[a2];aI[a2]=bx}return v};aU.deflate=function(bu,bt){var bv,bz,bx,bw,by;if(bt>l||bt<0){return ag}if(!bu.next_out||(!bu.next_in&&bu.avail_in!==0)||(aS==R&&bt!=l)){bu.msg=t[M-(ag)];return ag}if(bu.avail_out===0){bu.msg=t[M-(O)];return O}aJ=bu;bw=an;an=bt;if(aS==z){bz=(S+((a0-8)<<4))<<8;bx=((ba-1)&255)>>1;if(bx>3){bx=3}bz|=(bx<<6);if(bs!==0){bz|=i}bz+=31-(bz%31);aS=T;aK(bz)}if(aU.pending!==0){aJ.flush_pending();if(aJ.avail_out===0){an=-1;return v}}else{if(aJ.avail_in===0&&bt<=bw&&bt!=l){aJ.msg=t[M-(O)];return O}}if(aS==R&&aJ.avail_in!==0){bu.msg=t[M-(O)];return O}if(aJ.avail_in!==0||aL!==0||(bt!=Z&&aS!=R)){by=-1;switch(e[ba].func){case G:by=aY(bt);break;case q:by=ar(bt);break;case I:by=bd(bt);break;default:}if(by==F||by==j){aS=R}if(by==J||by==F){if(aJ.avail_out===0){an=-1}return v}if(by==U){if(bt==D){at()}else{aN(0,0,false);if(bt==r){for(bv=0;bv<ay;bv++){aI[bv]=0}}}aJ.flush_pending();if(aJ.avail_out===0){an=-1;return v}}}if(bt!=l){return v}return ad}}function K(){var ah=this;ah.next_in_index=0;ah.next_out_index=0;ah.avail_in=0;ah.total_in=0;ah.avail_out=0;ah.total_out=0}K.prototype={deflateInit:function(aj,ai){var ah=this;ah.dstate=new H();if(!ai){ai=ae}return ah.dstate.deflateInit(ah,aj,ai)},deflate:function(ah){var ai=this;if(!ai.dstate){return ag}return ai.dstate.deflate(ai,ah)},deflateEnd:function(){var ai=this;if(!ai.dstate){return ag}var ah=ai.dstate.deflateEnd();ai.dstate=null;return ah},deflateParams:function(aj,ai){var ah=this;if(!ah.dstate){return ag}return ah.dstate.deflateParams(ah,aj,ai)},deflateSetDictionary:function(aj,ai){var ah=this;if(!ah.dstate){return ag}return ah.dstate.deflateSetDictionary(ah,aj,ai)},read_buf:function(ai,al,aj){var ak=this;var ah=ak.avail_in;if(ah>aj){ah=aj}if(ah===0){return 0}ak.avail_in-=ah;ai.set(ak.next_in.subarray(ak.next_in_index,ak.next_in_index+ah),al);ak.next_in_index+=ah;ak.total_in+=ah;return ah},flush_pending:function(){var ai=this;var ah=ai.dstate.pending;if(ah>ai.avail_out){ah=ai.avail_out}if(ah===0){return}ai.next_out.set(ai.dstate.pending_buf.subarray(ai.dstate.pending_out,ai.dstate.pending_out+ah),ai.next_out_index);ai.next_out_index+=ah;ai.dstate.pending_out+=ah;ai.total_out+=ah;ai.avail_out-=ah;ai.dstate.pending-=ah;if(ai.dstate.pending===0){ai.dstate.pending_out=0}}};function ab(aj){var ak=this;var am=new K();var al=512;var ah=Z;var ai=new Uint8Array(al);var an=aj?aj.level:y;if(typeof an=="undefined"){an=y}am.deflateInit(an);am.next_out=ai;ak.append=function(at,ar){var aq,ap=[],aw=0,ao=0,av=0,au;if(!at.length){return}am.next_in_index=0;am.next_in=at;am.avail_in=at.length;do{am.next_out_index=0;am.avail_out=al;aq=am.deflate(ah);if(aq!=v){throw new Error("deflating: "+am.msg)}if(am.next_out_index){if(am.next_out_index==al){ap.push(new Uint8Array(ai))}else{ap.push(new Uint8Array(ai.subarray(0,am.next_out_index)))}}av+=am.next_out_index;if(ar&&am.next_in_index>0&&am.next_in_index!=aw){ar(am.next_in_index);aw=am.next_in_index}}while(am.avail_in>0||am.avail_out===0);au=new Uint8Array(av);ap.forEach(function(ax){au.set(ax,ao);ao+=ax.length});return au};ak.flush=function(){var aq,ap=[],ao=0,at=0,ar;do{am.next_out_index=0;am.avail_out=al;aq=am.deflate(l);if(aq!=ad&&aq!=v){throw new Error("deflating: "+am.msg)}if(al-am.avail_out>0){ap.push(new Uint8Array(ai.subarray(0,am.next_out_index)))}at+=am.next_out_index}while(am.avail_in>0||am.avail_out===0);am.deflateEnd();ar=new Uint8Array(at);ap.forEach(function(au){ar.set(au,ao);ao+=au.length});return ar}}var m=b.zip||b;m.Deflater=m._jzlib_Deflater=ab})(this);function toJSON(obj) {
    return JSON.stringify(obj, undefined, 4)
}

function toBlob(obj) {
    return new Blob([toJSON(obj)], { "type": 'text/json' })
}

class Campaign {
    constructor(title) {
        this.title = title
        this.campaign = {}
        this.zip = null
        this._pending_operations = []
        this._total_size = 0
        this.console = new ModalWindow("Exporting Campaign to ZIP file", "r20exporter-modal")
        this.console.warn("Note that you should not open a different campaign in Roll20 as it can interfere with the download of some resources.")
        this.console.warn("<strong>DISCLAIMER: Please note that using this tool to export a module from the marketplace may infringe on the Marketplace Asset License and/or Roll20 EULA.</strong>")
        $('#r20exporter').remove()
        let button = $('<a class="btn" id="r20exporter">Export Campaign to ZIP</a>')
        let content = $("#mysettings .content")
        content.prepend(button)
        button.css("width", "calc(100% - " + content.css("padding-right") + " - " + content.css("padding-left") + ")")
        button.on('click', () => this.exportCampaignZip())
    }

    get TOTAL_STEPS() {
        return 10;
    }

    newPendingOperation() {
        const id = Math.random().toString(36)
        this._pending_operations.push(id)
        this._updateSecondProgress()
        return id
    }

    hasPendingOperation() {
        return this._pending_operations.length > 0
    }

    completedOperation(id) {
        this._pending_operations.remove(id)
        this._updateSecondProgress()
        return !this.hasPendingOperation()
    }

    clearPendingOperations() {
        this._pending_operations = []
        this._updateSecondProgress()
    }

    _updateSecondProgress() {
        let left = this._pending_operations.length
        let total = this.console.second_progress.total
        this.console.setLabel2(left + " operations in progress")
        if (left > total)
            total = left
        if (left == 0)
            left = total = 1
        this.console.setProgress2(total - left, total)
    }

    findID(id, obj_type = null) {
        const find_id = (o) => o.id == id
        if (obj_type == "handout" || obj_type === null) {
            const handout = this.campaign.handouts.find(find_id)
            if (handout)
                return handout
        }
        if (obj_type == "page" || obj_type === null) {
            const page = this.campaign.pages.find(find_id)
            if (page)
                return page
        }
        if (obj_type == "character" || obj_type === null) {
            const char = this.campaign.characters.find(find_id)
            if (char)
                return char
        }
        if (obj_type == "track" || obj_type === null) {
            const track = this.campaign.jukebox.find(find_id)
            if (track)
                return track
        }
        return null
    }

    _createZipFile() {
        return new window.zip.fs.FS().root
    }

    _addZipFolder(zip, filename) {
        return zip.addDirectory(filename)
    }

    _addFileToZip(zip, filename, content) {
        zip.addBlob(filename, content)
        if (content.size !== undefined) {
            this._total_size += content.size
        } else if (content.length !== undefined) {
            this._total_size += content.length
        }
    }

    _exportZip(zip, fileEntry, onend, onprogress, onerror) {
        window.zip.useWebWorkers = false
        this._current_size = 0

        const addEntryToZipWriter = (writer, zip) => {
            setTimeout(() => addEntryToZipWriterDelayed(writer, zip), 0)
        }

        const addEntryToZipWriterDelayed = (writer, zip) => {
            const makeCB = (c) => {
                return () => {
                    this._current_size += c.data ? c.data.size : 0
                    onprogress(this._current_size, this._total_size)
                    addEntryToZipWriter(writer, zip)
                }
            }
            const partialprogress = (bytes) => onprogress(this._current_size + bytes, this._total_size)

            // Find the current folder/item we need to add
            let current = zip
            for (let idx of this._zip_add_indices) {
                current = current.children[idx]
            }

            // We're out of children, go back to the parent
            if (current === undefined) {
                this._zip_add_indices.pop()
                // If the list is empty, we've gone back to the root and we're done
                if (this._zip_add_indices.length == 0) {
                    writer.close(onend)
                } else {
                    // Now that we're done with this folder, go to the next child of the parent
                    this._zip_add_indices[this._zip_add_indices.length-1] += 1
                    addEntryToZipWriterDelayed(writer, zip)
                }
                return
            }

            if (current.directory) {
                // Add the directory and when we're done, start adding its children from index 0
                this._zip_add_indices.push(0)
                writer.add(current.getFullname(), null, makeCB(current),
                    partialprogress, { directory: current.directory, version: current.zipVersion })
            } else {
                // Add the file and when we're done, add the next child of the parent
                this._zip_add_indices[this._zip_add_indices.length-1] += 1
                writer.add(current.getFullname(), new current.Reader(current.data, onerror), makeCB(current),
                    partialprogress, { version: current.zipVersion })
            }
        }

        const zipWriterCreated = (writer) => {
            // Need to keep list of where we are in the add process, it seems
            // that we can't add two files at the same time, they conflict and we
            // can't add them recursively like zip.fs.FS.exportZip does because we'll
            // run out of stack quickly due to the number of files.
            this._zip_add_indices = [0]
            addEntryToZipWriter(writer, zip)
        }

        window.zip.createWriter(new window.zip.FileWriter(fileEntry, "application/zip"), zipWriterCreated, onerror)
    }

    // Based on https://gildas-lormeau.github.io/zip.js/demos/demo1.js
    _saveZipToFile(zip, filename) {
        const BYTES = ["Bytes", "KB", "MB", "GB"]
        const DIV = [1, 1024, 1024 * 1024, 1024 * 1024 * 1024]
        let size = this._total_size
        let div = 0
        while ((size / 1024) > 1 && div + 1 < DIV.length) {
            size /= 1024
            div += 1
        }
        this.console.warn("Done downloading resources!")
        this.console.warn("It is highly recommended to keep this tab focused and the window non-minimized during the entire process\n" +
                     "otherwise it could take hours instead of minutes to generate the ZIP file for your campaign.\n" +
                     "You can separate the tab into its own window if you want to keep using your browser in the meantime.")
        this.console.log("Generating ZIP file with ", size.toFixed(2), BYTES[div] + " of data")
        this.console.setLabel1("Generating " + size.toFixed(2) + BYTES[div] + " ZIP file (" + this.TOTAL_STEPS + "/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(this.TOTAL_STEPS - 1, this.TOTAL_STEPS)

        const requestFileSystem = window.webkitRequestFileSystem || window.mozRequestFileSystem || window.requestFileSystem

        const createTempFile = (tempCB) => {
            let tmpFilename = "tmp.zip"
            requestFileSystem(window.TEMPORARY, 4 * 1024 * 1024 * 1024,
                (filesystem) => {
                    const create = () => filesystem.root.getFile(tmpFilename, { create: true }, (zipFile) => tempCB(zipFile))
                    // Get the tmp.zip if it exists then delete it and create new
                    filesystem.root.getFile(tmpFilename, null,
                        (entry) => entry.remove(create, create), create)
                }
            )
        }

        // Create a tmp.zip file in temporary storage
        createTempFile((fileEntry) => {
            this._exportZip(zip, fileEntry, () => {
                    this.console.warn("Congratulations! The Campaign.zip file was generated successfully.\nStarting download.")
                    this.console.setProgress1(this.TOTAL_STEPS, this.TOTAL_STEPS)
                    setTimeout(() => this.console.hide(), 5000)
                    fileEntry.file((f) => window.saveAs(f, filename))
                }, (current, total) => {
                    const percent = 100 * current / total
                    this.console.setProgress2(current, total)
                    this.console.setLabel2("Generating ZIP file (" + percent.toFixed(2) + "%)")
                }, (message) => {
                    this.console.log("Error creating zip file writer : ", message)
                })
            })
    }
    _parseSides(sides) {
        let result = []
        const side_list = sides.split("|")
        for (let side of side_list) {
            if (side != "")
                result.push(window.decodeURIComponent(side))
        }
        return result
    }

    parsePage(page) {
        let data = page.toJSON()
        data.zorder = data.zorder.split(",")
        data.graphics = page.thegraphics ? page.thegraphics.toJSON() : []
        data.texts = page.thetexts ? page.thetexts.toJSON() : []
        data.paths = page.thepaths ? page.thepaths.toJSON() : []
        for (let path of data.paths) {
            path.path = JSON.parse(path.path)
        }
        for (let graphic of data.graphics) {
            if (graphic.sides)
                graphic.sides = this._parseSides(graphic.sides)
        }
        return data
    }

    parsePages(pages) {
        let array = []
        for (let page of pages.models) {
            if (page.fullyLoaded) {
                array.push(this.parsePage(page))
            } else {
                // Archived pages are not loaded. We can tell them to load but we have
                // no callbacks on when that is done, so we need to wait before parsing them.
                const id = this.newPendingOperation()
                const makeCB = (a, i, p) => {
                    return () => {
                        a.push(this.parsePage(p))
                        this.completedOperation(i)
                    }
                }
                page.fullyLoadPage()
                setTimeout(makeCB(array, id, page), 1000)
            }
        }
        this.console.log("Finished parsing pages.")
        return array
    }

    updateModel(data, key, blob, id, cb) {
        if (["bio", "gmnotes", "notes"].includes(key)) {
            data[key] = window.unescape(blob)
        } else if (key === "defaulttoken") {
            try {
                data[key] = JSON.parse(blob)
            } catch (err) {
                // Some one got invalid json data it seems
                data[key] = {}
            }
            if (data[key].sides)
                data[key].sides = this._parseSides(data[key].sides)
        } else {
            data[key] = blob
        }
        if (this.completedOperation(id) && cb)
            cb()
    }


    parseCharacter(character, cb) {
        let data = character.toJSON()
        data.inplayerjournals = data.inplayerjournals.split(",")
        data.controlledby = data.controlledby.split(",")
        if (data.bio != "") {
            delete data.bio
            const bio_id = this.newPendingOperation()
            character._getLatestBlob("bio", (blob) => this.updateModel(data, "bio", blob, bio_id, cb))
        }
        if (data.gmnotes != "") {
            delete data.gmnotes
            const gmnotes_id = this.newPendingOperation()
            character._getLatestBlob("gmnotes", (blob) => this.updateModel(data, "gmnotes", blob, gmnotes_id, cb))
        }
        if (data.defaulttoken != "") {
            delete data.defaulttoken
            const token_id = this.newPendingOperation()
            character._getLatestBlob("defaulttoken", (blob) => this.updateModel(data, "defaulttoken", blob, token_id, cb))
        }
        data.attributes = character.attribs.toJSON()
        data.abilities = character.abilities.toJSON()
        return data
    }

    parseCharacters(characters, cb) {
        let array = []
        for (let character of characters.models) {
            array.push(this.parseCharacter(character, cb))
        }
        this.console.log("Finished parsing characters.")
        return array
    }

    parseHandout(handout, cb) {
        let data = handout.toJSON()
        data.inplayerjournals = data.inplayerjournals.split(",")
        data.controlledby = data.controlledby.split(",")
        if (data.notes != "") {
            delete data.notes
            const notes_id = this.newPendingOperation()
            handout._getLatestBlob("notes", (blob) => this.updateModel(data, "notes", blob, notes_id, cb))
        }
        if (data.gmnotes != "") {
            delete data.gmnotes
            const gmnotes_id = this.newPendingOperation()
            handout._getLatestBlob("gmnotes", (blob) => this.updateModel(data, "gmnotes", blob, gmnotes_id, cb))
        }
        return data
    }

    parseHandouts(handouts, cb) {
        let array = []
        for (let handout of handouts.models) {
            array.push(this.parseHandout(handout, cb))
        }
        this.console.log("Finished parsing handouts.")
        return array
    }

    parsePlayer(player) {
        let data = player.toJSON()
        if (data.journalfolderstatus)
            data.journalfolderstatus = data.journalfolderstatus.split(",")
        if (data.jukeboxfolderstatus)
            data.jukebosfolderstatus = data.jukeboxfolderstatus.split(",")
        if (data.macrobar) {
            let macros = data.macrobar.split(",")
            data.macrobar = []
            for (let macro of macros) {
                if (macro != "") {
                    let [src, id] = macro.split("|")
                    data.macrobar.push({ "src": src, "id": id })
                }
            }
        }
        if (data.adv_fow_revealed)
            data.adv_fow_revealed = JSON.parse(data.adv_fow_revealed)
        return data
    }

    parsePlayers(players) {
        let array = []
        for (let player of players.models)
            array.push(this.parsePlayer(player))
        this.console.log("Finished parsing players.")
        return array
    }

    parseMacros(players) {
        let array = []
        for (let player of players.models) {
            let macros = player.macros.toJSON()
            for (let macro of macros)
                macro.player_id = player.id
            array.push(...macros)
        }
        this.console.log("Finished parsing Macros.")
        return array
    }

    parseDecks(decks) {
        let array = []
        for (let deck of decks.models) {
            let data = deck.toJSON()
            data.cards = deck.cards.toJSON()
            data.currentDeck = data.currentDeck.split(",")
            data.discardPile = data.discardPile.split(",")
            array.push(data)
        }
        this.console.log("Finished parsing Decks.")
        return array
    }

    parseTables(tables) {
        let array = []
        for (let table of tables.models) {
            let data = table.toJSON()
            data.items = table.tableitems.toJSON()
            array.push(data)
        }
        this.console.log("Finished parsing Rollable Tables.")
        return array
    }

    loadArchivedPages() {
        let num_loaded = 0
        for (let page of window.Campaign.pages.models) {
            if (!page.fullyLoaded) {
                page.fullyLoadPage()
                num_loaded += 1
            }
        }
        return num_loaded
    }

    _parseChatArchiveHTML(obj, html) {
        const scripts = $(html).filter("script[type='text/javascript']")
        const prefix = "var msgdata = \""
        for (let i = 0; i < scripts.length; i++) {
            const content = scripts[i].textContent.trim()
            if (content.startsWith(prefix)) {
                const start = prefix.length
                const end = content.indexOf("\";", start)
                try {
                    const chat = window.atob(content.slice(start, end))
                    obj.chat_archive = JSON.parse(chat)
                } catch (e) {
                    this.console.log("Unable to parse chat data: ", e)
                }
                break
            }
        }
    }

    _fetchChatArchive(obj, done) {
        const id = this.newPendingOperation()
        const errorcb = () => {
            if (this.completedOperation(id) && done)
                done()
        }
        const cb = (blob) => {
            let f = new FileReader()
            f.onerror = errorcb
            f.onabort = errorcb
            f.onload = () => {
                this._parseChatArchiveHTML(obj, f.result)
                if (this.completedOperation(id) && done)
                    done()
            }
            f.readAsText(blob)
        }
        this.downloadResource("https://app.roll20.net/campaigns/chatarchive/" + obj.campaign_id + "/?p=1&onePage=true", cb, errorcb)
    }

    _parseCampaignDelayed(result, cb) {
        const done = () => {
            if (cb)
                cb(result)
        }
        // Make sure we don't get callback called before we finish parsing all the items
        const id = this.newPendingOperation()
        this.console.setLabel1("Extracting Campaign data (2/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(1, this.TOTAL_STEPS)
        result.handouts = this.parseHandouts(window.Campaign.handouts, done)
        result.characters = this.parseCharacters(window.Campaign.characters, done)
        result.pages = this.parsePages(window.Campaign.pages)
        result.players = this.parsePlayers(window.Campaign.players)
        result.macros = this.parseMacros(window.Campaign.players)
        result.decks = this.parseDecks(window.Campaign.decks)
        result.tables = this.parseTables(window.Campaign.rollabletables)
        result.jukebox = window.Jukebox.playlist.toJSON()
        this._fetchChatArchive(result, done)
        if (result.jukeboxfolder != "")
            result.jukeboxfolder = JSON.parse(result.jukeboxfolder)
        if (result.journalfolder != "")
            result.journalfolder = JSON.parse(result.journalfolder)
        if (result.turnorder != "")
            result.turnorder = JSON.parse(result.turnorder)
        this.console.log("Download operations in progress : ", this._pending_operations.length)
        this.console.setProgress2(0, this._pending_operations.length)
        this.console.setLabel1("Downloading Journal Resources (3/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(2, this.TOTAL_STEPS)
        if (this.completedOperation(id))
            done()
    }

    parseCampaign(cb) {
        const character_num_attributes = window.Campaign.characters.models.map((c) => c.attribs.length)
        if (!character_num_attributes.all((n) => n > 0)) {
            const num_loaded_sheets = character_num_attributes.count((n) => n > 0)
            this.console.log("Waiting for character sheets to finish loading (" + num_loaded_sheets + "/" + character_num_attributes.length + ")")
            this.console.setLabel1("Waiting for character sheets to finish loading (1/" + this.TOTAL_STEPS + ")")
            this.console.setLabel2(num_loaded_sheets + "/" + character_num_attributes.length + " character sheets loaded")
            this.console.setProgress1(0, this.TOTAL_STEPS)
            this.console.setProgress2(num_loaded_sheets, character_num_attributes.length)
            return setTimeout(() => this.parseCampaign(cb), 1000)
        }

        const pages_paths = window.Campaign.pages.models.map((p) => p.thepaths)
        if (pages_paths.some((p) => p === undefined)) {
            const num_loaded_pages = pages_paths.count((p) => !!p)
            const first_unloaded = window.Campaign.pages.models.find((p) => p.thepaths === undefined)
            if (first_unloaded)
                first_unloaded.fullyLoadPage()
            this.console.log("Waiting for pages to finish loading (" + num_loaded_pages + "/" + pages_paths.length + ")")
            this.console.setLabel1("Waiting for pages to finish loading (1/" + this.TOTAL_STEPS + ")")
            this.console.setLabel2(num_loaded_pages + "/" + pages_paths.length + " pages loaded")
            this.console.setProgress1(0, this.TOTAL_STEPS)
            this.console.setProgress2(num_loaded_pages, pages_paths.length)
            return setTimeout(() => this.parseCampaign(cb), 100)
        }


        let result = window.Campaign.toJSON()
        result["R20Exporter_format"] = "1.0"
        result.campaign_title = this.title
        result.account_id = window.d20_account_id
        result.campaign_id = window.campaign_id
        this.campaign = result

        this.loadArchivedPages()
        this.console.log("Waiting 5 seconds for archived pages to finish loading")
        this.console.setLabel1("Waiting for archived pages to finish loading (1/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(0, this.TOTAL_STEPS)
        let i = -1
        const updateProgress = () => {
            i += 1
            this.console.setLabel2("Waiting... " + (5 - i) + "s")
            this.console.setProgress2(i, 5)
            if (i <  5)
                setTimeout(updateProgress, 1000)
        }
        updateProgress()

        setTimeout(() => this._parseCampaignDelayed(result, cb), 5000)
        return result
    }

    saveCampaign(filename = null) {
        window.saveAs(toBlob(this.campaign), filename || this.title + ".json")
    }

    exportCampaignJson(filename = null) {
        this.parseCampaign(() => this.saveCampaign(filename))
    }

    exportCampaign() {
        this.exportCampaignJson()
    }

    _imageToBlob(img, id, cb) {
        let c = document.createElement("canvas")
        let ctx = c.getContext("2d")
        c.width = img.naturalWidth
        c.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)
        c.toBlob((blob) => {
            this.completedOperation(id)
            cb(blob)
        }, "image/jpeg", 0.75)
    }

    downloadImageViaCanvas(url, cb, errorCB = null) {
        const id = this.newPendingOperation()
        let img = new Image()
        img.onload = (ev) => this._imageToBlob(img, id, cb)
        img.onerror = (error) => {
            this.completedOperation(id)
            if (errorCB)
                errorCB()
        }
        img.crossOrigin = ""
        img.src = url
    }

    downloadResource(url, cb, errorCB = null) {
        const id = this.newPendingOperation()

        window.fetch(url).then((response) => {
            if (response.status == 200 || response.status == 0) {
                return Promise.resolve(response.blob())
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }
        ).then((blob) => {
            this.completedOperation(id)
            if (cb)
                cb(blob)
        }
        ).catch((error) => {
            this.completedOperation(id)
            if (errorCB)
                errorCB()
        }
        )
    }

    // Most avatar/imgsrc URLs use the 'med' filename, even for the huge map files. We should download the appropriate sized
    // file depending on the image size we are looking for. We just download the highest resolution file that we can instead.
    downloadR20Resource(folder, prefix, url, finallyCB, try_files = ["original", "max", "med", "thumb"], use_canvas = false) {
        let filename = url.split("/").slice(-1)[0].split(".")[0]
        // This is needed so we download the higher res file first.
        // Unfortunately, there are some CORS issues sometimes, so if higher res file fails, download the lower one.
        if (try_files.length > 0) {
            let new_url = url
            if (["original", "max", "med", "thumb"].includes(filename)) {
                new_url = url.replace("/" + filename + ".", "/" + try_files[0] + ".")
            } else {
                try_files = [""]
            }

            const successCB = this._makeAddBlobToZip(folder, prefix + ".png", finallyCB)
            const errorCB = () => {
                this.downloadR20Resource(folder, prefix, url, finallyCB, try_files.slice(1), use_canvas)
            }

            if (use_canvas) {
                this.downloadImageViaCanvas(new_url, successCB, errorCB)
            } else {
                this.downloadResource(new_url, successCB, errorCB)
            }
        } else {
            if (use_canvas) {
                this.console.log("Couldn't download ", url, " with any alternative filename. Resource has become unavailable")
                finallyCB()
            } else {
                this.downloadR20Resource(folder, prefix, url, finallyCB, undefined, true)
            }
        }
    }

    _makeNameUnique(names, orig_name) {
        const name = String(names.length).padStart(3, "0") + " - " + orig_name
        names.push(name)
        return name
    }

    _flattenJournalEntries(journal, _list = []) {
        for (let entry of journal) {
            if (typeof(entry) == "string") {
                _list.push(entry)
            } else {
                this._flattenJournalEntries(entry.i, _list)
            }
        }
        return _list
    }

    _makeAddBlobToZip(folder, filename, finallyCB) {
        return (blob) => {
            this._addFileToZip(folder, filename, blob)
            finallyCB()
        }
    }

    _addCharacterToZip(folder, character, finallyCB) {
        this._addFileToZip(folder, "character.json", toBlob(character))
        if ((character.avatar || "") != "") {
            this.downloadR20Resource(folder, "avatar", character.avatar, finallyCB)
        }
        if (character.defaulttoken) {
            if ((character.defaulttoken.imgsrc || "") != "") {
                this.downloadR20Resource(folder, "token", character.defaulttoken.imgsrc, finallyCB)
            }
            if (character.defaulttoken.sides) {
                for (let [i, side] of character.defaulttoken.sides.entries())
                    this.downloadR20Resource(folder, "side_" + i, side, finallyCB)
            }
        }

        if ((character.bio || "") != "")
            this._addFileToZip(folder, "bio.html", new Blob([character.bio]))
        if ((character.gmnotes || "") != "")
            this._addFileToZip(folder, "gmnotes.html", new Blob([character.gmnotes]))
    }

    _addHandoutToZip(folder, handout, finallyCB) {
        this._addFileToZip(folder, "handout.json", toBlob(handout))
        if ((handout.avatar || "") != "")
            this.downloadR20Resource(folder, "avatar", handout.avatar, finallyCB)
        if ((handout.notes || "") != "")
            this._addFileToZip(folder, "notes.html", new Blob([handout.notes]))
        if ((handout.gmnotes || "") != "")
            this._addFileToZip(folder, "gmnotes.html", new Blob([handout.gmnotes]))
    }

    _addJournalToZip(folder, journal, finallyCB) {
        let names = []
        for (let journal_entry of journal) {
            if (typeof(journal_entry) == "string") {
                let handout = this.findID(journal_entry, "handout")
                if (handout !== null) {
                    let name = this._makeNameUnique(names, handout.name)
                    let handout_dir = this._addZipFolder(folder, name)
                    this._addHandoutToZip(handout_dir, handout, finallyCB)
                } else {
                    let character = this.findID(journal_entry, "character")
                    if (character !== null) {
                        let name = this._makeNameUnique(names, character.name)
                        let char_dir = this._addZipFolder(folder, name)
                        this._addCharacterToZip(char_dir, character, finallyCB)
                    } else {
                        this.console.log("Can't find handout with ID : ", journal_entry)
                        continue
                    }
                }
            } else {
                let name = this._makeNameUnique(names, journal_entry.n)
                let child_dir = this._addZipFolder(folder, name)
                this._addJournalToZip(child_dir, journal_entry.i, finallyCB)
            }
        }
    }

    _addPlaylistToZip(folder, playlist, finallyCB) {
        let names = []
        for (let audio of playlist) {
            if (typeof(audio) == "string") {
                let track = this.findID(audio, "track")
                if (track !== null) {
                    let name = this._makeNameUnique(names, track.title)
                    let url = null
                    if (name.slice(-4) != ".mp3")
                        name += ".mp3"
                    if (track.source == "My Audio") {
                        url = "https://app.roll20.net/audio_library/play/" + this.campaign.campaign_id + "/" + track.track_id
                    } else if (track.source == "Tabletop Audio") {
                        url = "https://s3.amazonaws.com/cdn.roll20.net/ttaudio/" + track.track_id.split("-")[0]
                    } else if (track.source == "Incompetech") {
                        url = "https://s3.amazonaws.com/cdn.roll20.net/incompetech/" + track.track_id.split("-")[0]
                    } else if (track.source == "Battlebards") {
                        let filename = track.track_id.split(".mp3-")[0] + ".mp3"
                        filename = encodeURIComponent(filename.replace(/%20%2D%20/g, " - "))
                        const id = this.newPendingOperation()
                        const _makePostCB = (folder, name, finallyCB, id) => {
                            return (url) => {
                                const errorCB = () => {
                                    this.console.log("Couldn't download Jukebox audio from url : ", url)
                                }
                                this.downloadResource(url, this._makeAddBlobToZip(folder, name, finallyCB), errorCB)
                                this.completedOperation(id)
                            }
                        }
                        const _makePostErrorCB = (track_id, finallyCB, id) => {
                            return () => {
                                this.console.log("Couldn't download Jukebox audio from Battlebards : ", track_id)
                                this.completedOperation(id)
                                finallyCB()
                            }
                        }

                        $.post("/editor/audiourl/bb", { trackurl: filename }, _makePostCB(folder, name, finallyCB, id))
                            .fail(_makePostErrorCB(track.track_id, finallyCB, id))
                    } else {
                        this.console.log("Can't download Audio track (", track.title, "). Unsupported source : ", track.source)
                    }
                    if (url) {
                        const errorCB = (url) => {
                            return () => this.console.log("Couldn't download Jukebox audio from url : ", url)
                        }
                        this.downloadResource(url, this._makeAddBlobToZip(folder, name, finallyCB), errorCB(url))
                    }
                } else {
                    this.console.log("Can't find Audio Track with ID : ", track)
                    continue
                }
            } else {
                let name = this._makeNameUnique(names, audio.n)
                let child_dir = this._addZipFolder(folder, name)
                this._addPlaylistToZip(child_dir, audio.i, finallyCB)
            }
        }
    }

    _addPageToZip(folder, page, finallyCB) {
        this._addFileToZip(folder, "page.json", toBlob(page))
        if ((page.thumbnail || "") != "") {
            this.downloadR20Resource(folder, "thumbnail", page.thumbnail, finallyCB)
        }
        if (page.graphics.length > 0) {
            const graphics = this._addZipFolder(folder, "graphics")
            for (let graphic of page.graphics) {
                this.downloadR20Resource(graphics, graphic.id, graphic.imgsrc, finallyCB)
                if (graphic.sides) {
                    for (let [i, side] of graphic.sides.entries())
                        this.downloadR20Resource(graphics, graphic.id + "_side_" + i, side, finallyCB)
                }
            }
        }
    }


    _saveCampaignZipCharacters(checkZipDone) {
        this.console.log("Saving Characters")
        this.console.setLabel1("Saving Characters (4/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(3, this.TOTAL_STEPS)
        const id = this.newPendingOperation()
        if (this.campaign.characters.length > 0) {
            const characters = this._addZipFolder(this.zip, "characters")
            let names = []
            for (let character of this.campaign.characters) {
                let name = this._makeNameUnique(names, character.name)
                let char_dir = this._addZipFolder(characters, name)
                this._addCharacterToZip(char_dir, character, checkZipDone)
            }
        }

        this.savingStep = 1
        this.completedOperation(id)
        checkZipDone(true)
    }

    _saveCampaignZipJournal(checkZipDone) {
        this.console.log("Saving Journal")
        this.console.setLabel1("Saving Journal handouts (5/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(4, this.TOTAL_STEPS)
        const id = this.newPendingOperation()
        if (this.campaign.journalfolder.length > 0) {
            let journal = this._addZipFolder(this.zip, "journal")
            this._addJournalToZip(journal, this.campaign.journalfolder, checkZipDone)
            let all_ids = this._flattenJournalEntries(this.campaign.journalfolder)
            let orphaned = []
            let archived = []
            for (let handout of this.campaign.handouts) {
                if (!all_ids.includes(handout.id)) {
                    orphaned.push(handout.id)
                } else if (handout.archived) {
                    archived.push(handout.id)
                }
            }
            if (archived.length > 0) {
                let folder = this._addZipFolder(journal, "Archived Handouts")
                this._addJournalToZip(folder, archived, checkZipDone)
            }
            if (orphaned.length > 0) {
                let folder = this._addZipFolder(journal, "Orphaned Handouts")
                this._addJournalToZip(folder, orphaned, checkZipDone)
            }
        }

        this.savingStep = 2
        this.completedOperation(id)
        checkZipDone(true)
    }

    _saveCampaignZipPage(checkZipDone) {
        const id = this.newPendingOperation()
        if (this.savingPageIdx >= this.campaign.pages.length) {
            this.savingStep = 4
            this.console.setPageLabel(null)
        } else {
            let page = this.campaign.pages[this.savingPageIdx]
            let name = page.name || "Untitled"
            this.console.setPageProgress(this.savingPageIdx, this.campaign.pages.length)
            this.savingPageIdx += 1
            this.console.setPageLabel(name + " (" + this.savingPageIdx + "/" + this.campaign.pages.length + ")")
            this.console.log("Saving Page : ", name, "(", this.savingPageIdx, "/", this.campaign.pages.length, ")")
            name = this._makeNameUnique(this.names, name)
            let page_dir = this._addZipFolder(this.pages, name)
            this._addPageToZip(page_dir, page, checkZipDone)
        }

        this.completedOperation(id)
        checkZipDone(true)
    }

    _saveCampaignZipPages(checkZipDone) {
        this.console.log("Saving ", this.campaign.pages.length, " Pages")
        this.console.setLabel1("Saving Pages (6/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(5, this.TOTAL_STEPS)
        if (this.campaign.pages.length > 0) {
            this.pages = this._addZipFolder(this.zip, "pages")
            this.names = []
        }
        this.savingStep = 3
        this.savingPageIdx = 0
        checkZipDone(true)
    }

    _saveCampaignZipJukebox(checkZipDone) {
        this.console.log("Saving Jukebox audio")
        this.console.setLabel1("Saving Jukebox audio (7/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(6, this.TOTAL_STEPS)
        const id = this.newPendingOperation()
        if (this.campaign.jukeboxfolder.length > 0) {
            let jukebox = this._addZipFolder(this.zip, "jukebox")
            this._addPlaylistToZip(jukebox, this.campaign.jukeboxfolder, checkZipDone)
        }
        this.savingStep = 5
        this.completedOperation(id)
        checkZipDone(true)
    }


    _saveCampaignZipDecks(checkZipDone) {
        this.console.log("Saving Decks")
        this.console.setLabel1("Saving Decks (8/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(7, this.TOTAL_STEPS)
        const id = this.newPendingOperation()
        if (this.campaign.decks.length > 0) {
            let decks = this._addZipFolder(this.zip, "decks")
            let names = []
            for (let deck of this.campaign.decks) {
                let name = this._makeNameUnique(names, deck.name)
                let deck_dir = this._addZipFolder(decks, name)
                if (deck.avatar)
                    this.downloadR20Resource(deck_dir, "avatar", deck.avatar, checkZipDone)
                let card_names = []
                for (let card of deck.cards) {
                    let card_name = this._makeNameUnique(card_names, card.name || "")
                    if (card.avatar)
                        this.downloadR20Resource(deck_dir, card_name, card.avatar, checkZipDone)
                }
            }
        }
        this.savingStep = 6
        this.completedOperation(id)
        checkZipDone(true)
    }

    _saveCampaignZipTables(checkZipDone) {
        this.console.log("Saving Rollable Tables")
        this.console.setLabel1("Saving Rollable Tables (9/" + this.TOTAL_STEPS + ")")
        this.console.setProgress1(8, this.TOTAL_STEPS)
        const id = this.newPendingOperation()
        if (this.campaign.tables.length > 0) {
            let tables = this._addZipFolder(this.zip, "tables")
            let names = []
            for (let table of this.campaign.tables) {
                let name = this._makeNameUnique(names, table.name)
                let table_dir = this._addZipFolder(tables, name)
                let item_names = []
                for (let item of table.items) {
                    if (item.avatar) {
                        let item_name = this._makeNameUnique(item_names, item.name || "")
                        this.downloadR20Resource(table_dir, item_name, item.avatar, checkZipDone)
                    }
                }
            }
        }
        this.savingStep = 7
        this.completedOperation(id)
        checkZipDone(true)
    }

    saveCampaignZip(filename = null) {
        if (this.zip !== null) {
            this.console.error("Saving already in progress. Can't be cancelled.")
            return
        }
        this._zip_filename = filename || (this.title + ".zip")
        this.zip = this._createZipFile()
        this._total_size = 0
        this.savingStep = 0
        this._addFileToZip(this.zip, 'campaign.json', toBlob(this.campaign))
        if (this.campaign.chat_archive)
            this._addFileToZip(this.zip, 'chat_archive.json', toBlob(this.campaign.chat_archive))
        this._checkZipDone()
    }

    _checkZipDone(show_pending = false) {
        if (!this.hasPendingOperation()) {
            //this.console.log("No more pending operations. Current step is ", this.savingStep)
            const checkZipDone = (show_pending) => this._checkZipDone(show_pending)

            if (this.savingStep == 0) {
                setTimeout(() => this._saveCampaignZipCharacters(checkZipDone), 0)
                //this.savingStep = 4
                //this._checkZipDone(true)
            } else if (this.savingStep == 1) {
                setTimeout(() => this._saveCampaignZipJournal(checkZipDone), 0)
            } else if (this.savingStep == 2) {
                setTimeout(() => this._saveCampaignZipPages(checkZipDone), 0)
            } else if (this.savingStep == 3) {
                setTimeout(() => this._saveCampaignZipPage(checkZipDone), 0)
            } else if (this.savingStep == 4) {
                setTimeout(() => this._saveCampaignZipJukebox(checkZipDone), 0)
            } else if (this.savingStep == 5) {
                setTimeout(() => this._saveCampaignZipDecks(checkZipDone), 0)
            } else if (this.savingStep == 6) {
                setTimeout(() => this._saveCampaignZipTables(checkZipDone), 0)
            } else {
                setTimeout(() => {
                    this._saveZipToFile(this.zip, this._zip_filename)
                    this.zip = null
                }, 0)
            }
            if (show_pending) {
                this.console.log("Download operations in progress : ", this._pending_operations.length)
                this.console.setProgress2(0, this._pending_operations.length)
            }
        }
    }


    exportCampaignZip(filename = null) {
        this.console.show()
        this.parseCampaign((campaign) => this.saveCampaignZip(filename))
    }

}

class ModalWindow {
    constructor(title = "", modalClass = "modal") {
        this.title = title
        const modal_div = $("body ." + modalClass)
        if (modal_div.length > 0) {
            modal_div.remove()
        }
        this.modal_div = $('<div class="' + modalClass + '"><div class="' + modalClass + '-content"></div></div>')
        const css = `
            /* The Modal (background) */
            .modal {
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 100000; /* Sit on top */
                padding-top: 50px; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            }
            
            /* Modal Content */
            .modal-content {
                background-color: #fefefe;
                margin: auto;
                padding: 20px;
                border: 3px solid #333;
                border-radius: 25px;
                width: 80%;
                height: 80%;
                overflow: auto; /* Enable scroll if needed */
                overflow-x: hidden; /* Disable horizontal scroll */
            }
            .modal-content .title {
                position: relative;
                top: -20px;
                left: -20px;
                width: calc(100% + 40px);
                text-align: center;
                color: white;
                background-color: black;
                font-size: 1.25em;
                font-weight: bold;
            }
            .modal-content .log {
                background-color: #ddd;
            }
            .modal-content .warn {
                background-color: gold;
                font-style: italic;
            }
        `.replace(/modal/g, modalClass)
        $("body").append($("<style>" + css + "</style>"))
        $("body").append(this.modal_div)
        this.content = this.modal_div.find("." + modalClass + "-content")
        this.main_progress = new ProgressBar()
        this.mp_current = this.mp_total = 1
        this.second_progress = new ProgressBar()
        this.sp_current = this.sp_total = 1
        this.page_progress = new ProgressBar()
        this.pp_current = this.pp_total = 1
        this.setPageLabel(null)
        this.clear()
        this.hide()
    }

    clear() {
        this.content.html("")
        this.content.append($('<div class="title">' + this.title + '</div>'))
        this.content.append(this.main_progress.getElement())
        this.content.append(this.page_progress.getElement())
        this.content.append(this.second_progress.getElement())
        this.content.append($('<div class="warn"></div>'))
        this.content.append($('<details class="log"><summary>Log</summary></details>'))
    }

    hide() {
        this.modal_div.css("display", "none")
    }

    show() {
        this.modal_div.css("display", "block")
    }

    append(content) {
        this.content.append($(content))
    }

    log(...args) {
        console.log(...args)
        let line = ""
        for (let a of args) {
            line += String(a) + " "
        }
        this.content.find(".log").append("<p>" + line.replace(/\n/g, "<br/>") + "</p>")
    }

    warn(...args) {
        console.warn(...args)
        let line = ""
        for (let a of args) {
            line += String(a) + " "
        }
        this.content.find(".warn").append($("<p>" + line.replace(/\n/g, "<br/>") + "</p"))
    }

    setLabel1(label) {
        this.main_progress.setLabel(label)
    }
    setLabel2(label) {
        this.second_progress.setLabel(label)
    }
    setPageLabel(label) {
        if (label) {
            this.page_progress.getElement().css("display", "block")
            this.page_progress.setLabel(label)
        } else {
            this.page_progress.getElement().css("display", "none")
            this.setPageProgress(0, 1)
        }
    }
    setProgress1(current, total = null) {
        this.main_progress.setProgress(current, total)
        this.mp_current = current
        this.mp_total = total ? total : this.main_progress.total
    }
    setProgress2(current, total = null) {
        this.second_progress.setProgress(current, total)
        this.sp_current = current
        this.sp_total = this.second_progress.total
        let percent = this.sp_current / this.sp_total
        if (this.pp_total > 1) {
            this.page_progress.setProgress(this.pp_current + percent)
            percent = this.pp_current / this.pp_total
        }
        this.main_progress.setProgress(this.mp_current + percent)
    }
    setPageProgress(current, total = null) {
        this.page_progress.setProgress(current, total)
        this.pp_current = current
        this.pp_total = this.page_progress.total
        let percent = this.pp_current / this.pp_total
        this.main_progress.setProgress(this.mp_current + percent)
    }
}


class ProgressBar {
    constructor(label = "", current = 0, total = 100) {
        this.progress = $(`<div style="width: 100%; background-color: grey; margin: 5px">
                               <span style="float: left; position: relative; left: 50%; line-height: 20px">
                                  <strong style="float: left; position: relative; left: -50%"></strong>
                               </span>
                               <div style="background-color: dodgerblue; height: 20px;"></div>
                             </div>`)
        this.setLabel(label)
        this.setProgress(current, total)
    }

    setLabel(label) {
        this.progress.find("strong").html(label)
    }

    setProgress(current, total = null) {
        if (total) {
            this.total = total
        }
        this.current = current
        let percent = this.getPercent()
        this.progress.find("div").css("width", percent.toFixed(2) + "%")
    }

    getPercent() {
        let percent = 100
        if (this.total !== 0)
            percent = this.current * 100 / this.total
        return percent
    }

    getElement() {
        return this.progress
    }
}

function R20Exporter_init() {
    console.log("Roll20 Campaign exporter loaded.")
    console.log("To export your Roll20 campaign, enter R20Exporter.exportCampaignZip() or click on the button in the Settings sidebar.")
    window.R20Exporter = new Campaign($("head title").text().trim().replace(" | Roll20", ""))
    window.ProgressBar = ProgressBar
}

// We need to create the campaign only after the DOM is loaded, otherwise when R20ES is installed, we get an error
// unable to find '$' because r20es slows down the download of the jquery external script it seems.
// We also need to be able to run it as standalone.
if ($ !== undefined)
    R20Exporter_init()
else
    window.addEventListener("DOMContentLoaded", R20Exporter_init)
