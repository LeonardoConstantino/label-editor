const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PreferenceManager-BkZSHOdD.js","./Database-CZCcsqkt.js","./Logger-CNOUfmyc.js","./imageProcessor-BT0oebsG.js","./PDFGenerator-C6DsuxCf.js","./chunk-DECur_0Z.js","./typeof-4GwhTj0O.js"])))=>i.map(i=>d[i]);
import{n as e,r as t,t as n}from"./chunk-DECur_0Z.js";import{n as r,r as i,t as a}from"./Database-CZCcsqkt.js";import{t as o}from"./Logger-CNOUfmyc.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var s=new class{history=[];currentIndex=-1;maxSnapshots=50;snapshot(e,t){let n=e.getImageData(0,0,e.canvas.width,e.canvas.height),r=JSON.parse(JSON.stringify(t));this.history=this.history.slice(0,this.currentIndex+1),this.history.push({imageData:n,elements:r,timestamp:Date.now()}),this.history.length>this.maxSnapshots?this.history.shift():this.currentIndex++}undo(){return this.currentIndex>0?(this.currentIndex--,this.history[this.currentIndex]):null}redo(){return this.currentIndex<this.history.length-1?(this.currentIndex++,this.history[this.currentIndex]):null}canUndo(){return this.currentIndex>0}canRedo(){return this.currentIndex<this.history.length-1}clear(){this.history=[],this.currentIndex=-1}},c=new class e{static PRESETS={click:{freq:[1200],duration:.06,type:`sine`,volume:.15,envelope:{attack:.001,decay:.04,sustain:0,release:0},noise:{amount:.02,type:`white`,duration:.02}},tap:{freq:[2e3],duration:.03,type:`sine`,volume:.1,envelope:{attack:.001,decay:.025}},success:{freq:[523,659,784],duration:.35,type:`triangle`,volume:.15,envelope:{attack:.008,decay:.25,sustain:.05}},notify:{freq:[880,1100,1320],duration:.2,type:`sine`,volume:.18,envelope:{attack:.008,decay:.15}},warning:{freq:[440,466],duration:.3,type:`sawtooth`,volume:.16,filter:{type:`lowpass`,frequency:800,Q:1},envelope:{attack:.01,decay:.25}},error:{freq:[400,566],duration:.4,type:`square`,volume:.18,noise:{amount:.1,type:`pink`,duration:.3},filter:{type:`bandpass`,frequency:500,Q:2},envelope:{attack:.005,decay:.3}},swooshIn:{sweep:{from:200,to:1200},duration:.15,type:`sine`,volume:.15,filter:{type:`lowpass`,frequency:1200,Q:.5},envelope:{attack:.004,decay:.12}},swooshOut:{sweep:{from:1200,to:200},duration:.15,type:`sine`,volume:.15,filter:{type:`lowpass`,frequency:800,Q:.5},envelope:{attack:.004,decay:.12}},delete:{freq:[150,180],duration:.2,type:`triangle`,volume:.16,noise:{amount:.3,type:`brown`,duration:.2},filter:{type:`lowpass`,frequency:400},envelope:{attack:.01,decay:.18}},undo:{freq:[600,750],duration:.12,type:`sine`,volume:.16,envelope:{attack:.002,decay:.1}},save:{freq:[600,750,900],duration:.3,type:`triangle`,volume:.2,envelope:{attack:.006,decay:.25}},toggle:{freq:[900,1200],duration:.1,type:`sine`,volume:.14,envelope:{attack:.003,decay:.08}},open:{sweep:{from:400,to:1100},duration:.18,type:`sine`,volume:.18,envelope:{attack:.004,decay:.15}},close:{sweep:{from:1100,to:400},duration:.18,type:`sine`,volume:.18,envelope:{attack:.004,decay:.15}},new:{freq:[600,800,1e3],duration:.3,type:`triangle`,volume:.2,envelope:{attack:.01,decay:.25}},cut:{freq:[1500],duration:.06,type:`sine`,volume:.12,noise:{amount:.25,type:`white`,duration:.06},envelope:{attack:.001,decay:.05}},copy:{freq:[1e3],duration:.05,type:`sine`,volume:.14,envelope:{attack:.001,decay:.04}},paste:{sweep:{from:800,to:400},duration:.08,type:`sine`,volume:.16,envelope:{attack:.002,decay:.07}},select:{freq:[2e3],duration:.02,type:`sine`,volume:.1,noise:{amount:.01,type:`white`,duration:.01},envelope:{attack:.001,decay:.018}},zoomIn:{sweep:{from:200,to:1e3},duration:.1,type:`sine`,volume:.15,envelope:{attack:.002,decay:.08}},zoomOut:{sweep:{from:1e3,to:200},duration:.1,type:`sine`,volume:.15,envelope:{attack:.002,decay:.08}},find:{freq:[900,1100],duration:.18,type:`sine`,volume:.17,envelope:{attack:.005,decay:.15}},replace:{freq:[800,1e3],duration:.22,type:`triangle`,volume:.19,noise:{amount:.05,type:`pink`,duration:.15},envelope:{attack:.008,decay:.2}},export:{sweep:{from:400,to:1200},duration:.25,type:`triangle`,volume:.18,envelope:{attack:.01,decay:.22}}};context;enabled;throttleMs;logger;lastPlayTime;activeSounds;constructor(e={}){let t=window.AudioContext||window.webkitAudioContext;if(!t){console.warn(`Web Audio API não suportada`),this.context=null,this.enabled=!1,this.throttleMs=50,this.logger=console,this.lastPlayTime=new Map,this.activeSounds=new Set;return}this.context=new t,this.enabled=e.enabled??!0,this.throttleMs=e.throttle??50,this.logger=e.logger||console,this.lastPlayTime=new Map,this.activeSounds=new Set,this.logger.info(`UISoundManager`,`Instância criada com Web Audio API`)}play(t){if(!this.context||!this.enabled)return!1;let n=e.PRESETS[t];if(!n)return this.logger.warn(`UISoundManager`,`Preset "${t}" não existe`),!1;let r=Date.now();return r-(this.lastPlayTime.get(t)||0)<this.throttleMs?!1:(this.lastPlayTime.set(t,r),this.synthesize(n),!0)}playCustom(e){if(!this.context||!this.enabled)return!1;if(!e||typeof e.duration!=`number`)return this.logger.warn(`UISoundManager`,`playCustom requer "duration" (número)`),!1;let t=e.sweep&&typeof e.sweep.from==`number`&&typeof e.sweep.to==`number`,n=e.freq!==void 0;if(!t&&!n)return this.logger.warn(`UISoundManager`,`playCustom requer "freq" ou "sweep"`),!1;if(n&&(Array.isArray(e.freq)?e.freq:[e.freq]).some(e=>typeof e!=`number`||isNaN(e)||e<20||e>2e4))return this.logger.warn(`UISoundManager`,`Frequências inválidas (devem ser números entre 20Hz e 20kHz)`),!1;if(t){let{from:t,to:n}=e.sweep;if(isNaN(t)||isNaN(n)||t<20||t>2e4||n<20||n>2e4)return this.logger.warn(`UISoundManager`,`Valores de sweep inválidos (devem ser números entre 20Hz e 20kHz)`),!1}if(e.duration<=0||e.duration>5)return this.logger.warn(`UISoundManager`,`Duração deve estar entre 0 e 5 segundos`),!1;let r=[`sine`,`square`,`sawtooth`,`triangle`];if(e.type&&!r.includes(e.type))return this.logger.warn(`UISoundManager`,`Tipo "${e.type}" inválido. Use: ${r.join(`, `)}`),!1;let i=e.freq,a={...e,freq:i===void 0?void 0:Array.isArray(i)?i:[i],sweep:t?e.sweep:void 0,type:e.type||`sine`,volume:Math.max(0,Math.min(1,e.volume??.2)),envelope:e.envelope||{attack:.005,decay:e.duration*.8}};return this.logger.debug(`UISoundManager`,`Reproduzindo som customizado com configuração:`,a),this.synthesize(a),!0}synthesize(e){if(!this.context)return;this.context.state===`suspended`&&this.context.resume();let t=this.context.currentTime,n=e.duration,r=e.volume,i=e.envelope||{attack:.005,decay:n*.8},a=this.context.createGain();a.gain.value=0;let o=null;e.filter&&(o=this.context.createBiquadFilter(),o.type=e.filter.type||`lowpass`,o.frequency.value=e.filter.frequency||1e3,o.Q.value=e.filter.Q||1);let s=o||a;o&&o.connect(a),a.connect(this.context.destination);let c={masterGain:a,filterNode:o,sources:[]};if(this.activeSounds.add(c),e.sweep){let r=this.context.createOscillator();r.type=e.type,r.frequency.setValueAtTime(e.sweep.from,t),r.frequency.linearRampToValueAtTime(e.sweep.to,t+n),r.connect(s),r.start(t),r.stop(t+n),c.sources.push(r)}else e.freq&&(Array.isArray(e.freq)?e.freq:[e.freq]).forEach(r=>{let i=this.context.createOscillator();i.type=e.type,i.frequency.value=r,i.connect(s),i.start(t),i.stop(t+n),c.sources.push(i)});if(e.noise){let r=e.noise.duration||n,i=this.createNoiseBuffer(e.noise.type||`white`,r),a=this.context.createBufferSource();a.buffer=i;let o=this.context.createGain();o.gain.value=e.noise.amount||.1,a.connect(o),o.connect(s),a.start(t),a.stop(t+r),c.sources.push(a),c.noiseGain=o}this.applyEnvelope(a,r,i,t,n),this.scheduleCleanup(c,t+n)}applyEnvelope(e,t,n,r,i){let a=n.attack??.005,o=n.decay??.1,s=n.sustain??0,c=n.release??.05,l=1e-4,u=Math.max(l,t*s),d=Math.max(l,t);e.gain.setValueAtTime(l,r),e.gain.linearRampToValueAtTime(d,r+a),s>0?(e.gain.exponentialRampToValueAtTime(u,r+a+o),e.gain.setValueAtTime(u,r+i-c),e.gain.exponentialRampToValueAtTime(l,r+i)):e.gain.exponentialRampToValueAtTime(l,r+a+o)}scheduleCleanup(e,t){if(!this.context)return;let n=this.context.createBuffer(1,1,this.context.sampleRate),r=this.context.createBufferSource();r.buffer=n;let i=this.context.createGain();i.gain.value=0,r.connect(i),i.connect(this.context.destination),r.start(t),r.onended=()=>{if(e.sources.forEach(e=>{try{e.disconnect()}catch{}}),e.noiseGain)try{e.noiseGain.disconnect()}catch{}if(e.filterNode)try{e.filterNode.disconnect()}catch{}try{e.masterGain.disconnect()}catch{}try{r.disconnect()}catch{}try{i.disconnect()}catch{}this.activeSounds.delete(e)}}createNoiseBuffer(e,t){if(!this.context)throw Error(`AudioContext não disponível`);let n=this.context.sampleRate,r=Math.ceil(n*t),i=this.context.createBuffer(1,r,n),a=i.getChannelData(0);if(e===`white`)for(let e=0;e<r;e++)a[e]=Math.random()*2-1;else if(e===`pink`){let e=0,t=0,n=0,i=0,o=0,s=0,c=0;for(let l=0;l<r;l++){let r=Math.random()*2-1;e=.99886*e+r*.0555179,t=.99332*t+r*.0750759,n=.969*n+r*.153852,i=.8665*i+r*.3104856,o=.55*o+r*.5329522,s=-.7616*s-r*.016898,a[l]=e+t+n+i+o+s+c+r*.5362,c=r*.115926}}else if(e===`brown`){let e=0;for(let t=0;t<r;t++){let n=Math.random()*2-1;e=(e+.02*n)/1.02,a[t]=e*3.5}}return i}mute(){this.logger.debug(`UISoundManager`,`Silenciando todos os sons`),this.enabled=!1}unmute(){this.logger.debug(`UISoundManager`,`Habilitando sons`),this.enabled=!0}toggle(e){return typeof e==`boolean`?this.enabled=e:this.enabled=!this.enabled,this.logger.debug(`UISoundManager`,`Alterando estado para ${this.enabled?`habilitado`:`desabilitado`}`),this.enabled}get enumPresets(){return Object.keys(e.PRESETS).reduce((e,t)=>(e[t.toUpperCase()]=t,e),{})}destroy(){this.logger.debug(`UISoundManager`,`Destruindo instância e liberando recursos`),this.enabled=!1,this.activeSounds.forEach(e=>{if(e.sources.forEach(e=>{try{e.stop(),e.disconnect()}catch{}}),e.noiseGain)try{e.noiseGain.disconnect()}catch{}if(e.filterNode)try{e.filterNode.disconnect()}catch{}try{e.masterGain.disconnect()}catch{}}),this.activeSounds.clear(),this.lastPlayTime.clear(),this.context?.state!==`closed`&&this.context?.close(),this.logger.debug(`UISoundManager`,`Recursos liberados com sucesso`)}}({enabled:!1,logger:o}),l=new class{check(e,t){if(!(`dimensions`in e))return{overflow:!1};let n=e,r=n.position.x+n.dimensions.width,i=n.position.y+n.dimensions.height,a=r>t.widthMM||n.position.x<0,o=i>t.heightMM||n.position.y<0;return!a&&!o?{overflow:!1}:{overflow:!0,axis:a&&o?`both`:a?`x`:`y`,amountX:a?n.position.x<0?-n.position.x:r-t.widthMM:0,amountY:o?n.position.y<0?-n.position.y:i-t.heightMM:0}}},u=function(e){return e.BORDER=`border`,e.RECTANGLE=`rectangle`,e.TEXT=`text`,e.IMAGE=`image`,e}({}),d=function(e){return e.SOLID=`solid`,e.DASHED=`dashed`,e.DOTTED=`dotted`,e}({}),f=function(e){return e.CLIP=`clip`,e.ELLIPSIS=`ellipsis`,e.WRAP=`wrap`,e.SCALE=`scale`,e}({}),p=function(e){return e.COVER=`cover`,e.CONTAIN=`contain`,e.FILL=`fill`,e}({}),m={CANVAS:{widthMM:100,heightMM:60,dpi:300,previewScale:1,backgroundColor:`#ffffff`},LIMITS:{MAX_WIDTH_MM:500,MAX_HEIGHT_MM:500,MIN_DIMENSION_MM:5,MAX_DPI:600,MIN_DPI:72},COMMON:{position:{x:10,y:10},zIndex:0,rotation:0,opacity:1,locked:!1,visible:!0},[u.TEXT]:{dimensions:{width:60,height:12},content:`Nova Camada de Texto`,fontFamily:`Inter`,fontSize:12,fontWeight:400,fontStyle:`normal`,color:`#000000`,textAlign:`center`,verticalAlign:`middle`,overflow:f.CLIP,lineHeight:1.2},[u.RECTANGLE]:{dimensions:{width:40,height:30},fillColor:`#6366f1`,strokeColor:`#262a33`,strokeWidth:.5,borderRadius:0},[u.IMAGE]:{dimensions:{width:40,height:40},src:``,fit:p.CONTAIN,smoothing:!0,compositeOperation:`source-over`},[u.BORDER]:{style:d.SOLID,width:1,color:`#000000`,radius:0}},h=class{static HEX_COLOR_REGEX=/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;static validate(e){let t=[];switch((e.opacity<0||e.opacity>1)&&t.push(`Opacidade deve estar entre 0 e 1.`),e.type){case u.TEXT:this.validateText(e,t);break;case u.RECTANGLE:this.validateRectangle(e,t);break;case u.IMAGE:this.validateImage(e,t);break;case u.BORDER:this.validateBorder(e,t);break}return`dimensions`in e&&(e.dimensions.width<=0&&t.push(`Largura deve ser maior que zero.`),e.dimensions.height<=0&&t.push(`Altura deve ser maior que zero.`),e.dimensions.width>m.LIMITS.MAX_WIDTH_MM&&t.push(`Largura excede o limite de ${m.LIMITS.MAX_WIDTH_MM}mm.`),e.dimensions.height>m.LIMITS.MAX_HEIGHT_MM&&t.push(`Altura excede o limite de ${m.LIMITS.MAX_HEIGHT_MM}mm.`)),{isValid:t.length===0,errors:t}}static validateText(e,t){e.fontSize<=0&&t.push(`Tamanho da fonte deve ser maior que zero.`),this.isValidHex(e.color)||t.push(`Cor do texto inválida.`),e.lineHeight<0&&t.push(`Espaçamento entre linhas não pode ser negativo.`)}static validateRectangle(e,t){this.isValidHex(e.fillColor)||t.push(`Cor de preenchimento inválida.`),this.isValidHex(e.strokeColor)||t.push(`Cor da borda inválida.`),e.strokeWidth<0&&t.push(`Espessura da borda não pode ser negativa.`),e.borderRadius<0&&t.push(`Raio da borda não pode ser negativo.`)}static validateImage(e,t){}static validateBorder(e,t){e.width<=0&&t.push(`Espessura da moldura deve ser maior que zero.`),this.isValidHex(e.color)||t.push(`Cor da moldura inválida.`),e.radius<0&&t.push(`Raio da moldura não pode ser negativo.`)}static isValidHex(e){return this.HEX_COLOR_REGEX.test(e)}},g=`modulepreload`,_=function(e,t){return new URL(e,t).href},v={},y=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=_(t,n),t in v)return;v[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:g,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},b=new class{state;constructor(){this.state={currentLabel:null,selectedElementIds:[],clipboard:[],canUndo:!1,canRedo:!1,preferences:i},this.registerEvents()}registerEvents(){r.on(`element:add`,e=>{let t=h.validate(e);if(!t.isValid){r.emit(`notify`,{type:`error`,message:t.errors[0]}),c.play(c.enumPresets.WARNING);return}this.performAction(()=>{this.state.currentLabel&&(this.state.currentLabel.elements.push(e),c.play(c.enumPresets.SWOOSHIN))})}),r.on(`element:update`,({id:e,updates:t})=>{if(!this.state.currentLabel)return;let n=this.state.currentLabel.elements.findIndex(t=>t.id===e);if(n===-1)return;let i=this.state.currentLabel.elements[n],a=this.mergeUpdates(i,t),o=h.validate(a);if(!o.isValid){r.emit(`notify`,{type:`error`,message:o.errors[0]}),c.play(c.enumPresets.WARNING);return}this.performAction(()=>{this.state.currentLabel.elements[n]=a;let t=l.check(a,this.state.currentLabel.config);t.overflow?(r.emit(`element:warning`,{id:e,result:t}),c.play(c.enumPresets.WARNING)):r.emit(`element:warning:clear`,{id:e})})}),r.on(`element:reorder`,({id:e,direction:t})=>{this.performAction(()=>{if(!this.state.currentLabel)return;let n=this.state.currentLabel.elements.find(t=>t.id===e);n&&(n.zIndex+=t===`up`?1:-1,c.play(c.enumPresets.SWOOSHIN))})}),r.on(`element:delete`,e=>{this.performAction(()=>{this.state.currentLabel&&(this.state.currentLabel.elements=this.state.currentLabel.elements.filter(t=>e!==t.id),this.state.selectedElementIds=this.state.selectedElementIds.filter(t=>t!==e),c.play(c.enumPresets.DELETE))})}),r.on(`element:duplicate`,e=>{this.performAction(()=>{if(!this.state.currentLabel)return;let t=this.state.currentLabel.elements.find(t=>t.id===e);if(!t)return;let n=JSON.parse(JSON.stringify(t));n.id=crypto.randomUUID(),n.name=`${t.name||t.type} (Copy)`,n.position.x+=5,n.position.y+=5,n.zIndex=Math.max(...this.state.currentLabel.elements.map(e=>e.zIndex))+1,this.state.currentLabel.elements.push(n),this.state.selectedElementIds=[n.id],c.play(c.enumPresets.COPY)})}),r.on(`element:select`,e=>{this.state.selectedElementIds=Array.isArray(e)?e:[e],this.emit()}),r.on(`history:undo`,()=>this.undo()),r.on(`history:redo`,()=>this.redo()),r.on(`label:config:update`,e=>{this.performAction(()=>{if(!this.state.currentLabel)return;let{LIMITS:t}=m,n=!1,r=Math.min(Math.max(e.widthMM,t.MIN_DIMENSION_MM),t.MAX_WIDTH_MM),i=Math.min(Math.max(e.heightMM,t.MIN_DIMENSION_MM),t.MAX_HEIGHT_MM),a=Math.min(Math.max(e.dpi,t.MIN_DPI),t.MAX_DPI);(r!==e.widthMM||i!==e.heightMM||a!==e.dpi)&&(n=!0),this.state.currentLabel.config={...e,widthMM:r,heightMM:i,dpi:a},n&&c.play(c.enumPresets.WARNING)})}),r.on(`preferences:update`,e=>{this.state.preferences={...this.state.preferences,...e},this.emit(),y(()=>import(`./PreferenceManager-BkZSHOdD.js`).then(e=>{e.preferenceManager.savePreferences(this.state.preferences)}),__vite__mapDeps([0,1,2]),import.meta.url)}),r.on(`history:snapshot`,()=>this.takeSnapshot())}mergeUpdates(e,t){let n={...e};for(let e in t)typeof t[e]==`object`&&t[e]!==null&&!Array.isArray(t[e])?n[e]={...n[e],...t[e]}:n[e]=t[e];return n}performAction(e){this.state.currentLabel&&(e(),this.takeSnapshot(),this.state.currentLabel.updatedAt=Date.now(),this.emit())}takeSnapshot(){this.state.currentLabel&&r.emit(`request:canvas:snapshot`,e=>{s.snapshot(e,this.state.currentLabel.elements),this.updateHistoryStatus()})}undo(){let e=s.undo();e&&(this.applySnapshot(e),c.play(c.enumPresets.REPLACE))}redo(){let e=s.redo();e&&(this.applySnapshot(e),c.play(c.enumPresets.REPLACE))}applySnapshot(e){this.state.currentLabel&&(this.state.currentLabel.elements=JSON.parse(JSON.stringify(e.elements)),r.emit(`command:canvas:restore`,e.imageData),this.updateHistoryStatus(),this.emit())}updateHistoryStatus(){this.state.canUndo=s.canUndo(),this.state.canRedo=s.canRedo()}emit(){r.emit(`state:change`,this.getState())}getState(){return Object.freeze(JSON.parse(JSON.stringify(this.state)))}loadLabel(e){this.state.currentLabel=e,s.clear(),this.state.selectedElementIds=[],this.takeSnapshot(),this.emit()}},x=t(n(((e,t)=>{((n,r)=>{typeof define==`function`&&define.amd?define([],r):typeof t==`object`&&e!==void 0?t.exports=r():n.Papa=r()})(e,function e(){var t=typeof self<`u`?self:typeof window<`u`?window:t===void 0?{}:t,n,r=!t.document&&!!t.postMessage,i=t.IS_PAPA_WORKER||!1,a={},o=0,s={};function c(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine=``,this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=y(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new p(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,n){var r=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<r){let t=this._config.newline;t||=(a=this._config.quoteChar||`"`,this._handle.guessLineEndings(e,a)),e=[...e.split(t).slice(r)].join(t)}this.isFirstChunk&&x(this._config.beforeFirstChunk)&&(a=this._config.beforeFirstChunk(e))!==void 0&&(e=a),this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e,a=(this._partialLine=``,this._handle.parse(r,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(e=a.meta.cursor,r=(this._finished||(this._partialLine=r.substring(e-this._baseIndex),this._baseIndex=e),a&&a.data&&(this._rowCount+=a.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),i)t.postMessage({results:a,workerId:s.WORKER_ID,finished:r});else if(x(this._config.chunk)&&!n){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=a=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!r||!x(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),r||a&&a.meta.paused||this._nextChunk(),a}this._halted=!0},this._sendError=function(e){x(this._config.error)?this._config.error(e):i&&this._config.error&&t.postMessage({workerId:s.WORKER_ID,error:e,finished:!1})}}function l(e){var t;(e||={}).chunkSize||(e.chunkSize=s.RemoteChunkSize),c.call(this,e),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),r||(t.onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)),t.open(this._config.downloadRequestBody?`POST`:`GET`,this._input,!r),this._config.downloadRequestHeaders){var e,n=this._config.downloadRequestHeaders;for(e in n)t.setRequestHeader(e,n[e])}var i;this._config.chunkSize&&(i=this._start+this._config.chunkSize-1,t.setRequestHeader(`Range`,`bytes=`+this._start+`-`+i));try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}r&&t.status===0&&this._chunkError()}},this._chunkLoaded=function(){t.readyState===4&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize||t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(e=>(e=e.getResponseHeader(`Content-Range`))===null?-1:parseInt(e.substring(e.lastIndexOf(`/`)+1)))(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){e=t.statusText||e,this._sendError(Error(e))}}function u(e){(e||={}).chunkSize||(e.chunkSize=s.LocalChunkSize),c.call(this,e);var t,n,r=typeof FileReader<`u`;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input,i=(this._config.chunkSize&&(i=Math.min(this._start+this._config.chunkSize,this._input.size),e=n.call(e,this._start,i)),t.readAsText(e,this._config.encoding));r||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function d(e){var t;c.call(this,e||={}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){var e,n;if(!this._finished)return e=this._config.chunkSize,t=e?(n=t.substring(0,e),t.substring(e)):(n=t,``),this._finished=!t,this.parseChunk(n)}}function f(e){c.call(this,e||={});var t=[],n=!0,r=!1;this.pause=function(){c.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){c.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on(`data`,this._streamData),this._input.on(`end`,this._streamEnd),this._input.on(`error`,this._streamError)},this._checkIsFinished=function(){r&&t.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):n=!0},this._streamData=b(function(e){try{t.push(typeof e==`string`?e:e.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=b(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=b(function(){this._streamCleanUp(),r=!0,this._streamData(``)},this),this._streamCleanUp=b(function(){this._input.removeListener(`data`,this._streamData),this._input.removeListener(`end`,this._streamEnd),this._input.removeListener(`error`,this._streamError)},this)}function p(e){var t,n,r,i,a=2**53,o=-a,c=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,l=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,u=this,d=0,f=0,p=!1,g=!1,_=[],v={data:[],errors:[],meta:{}};function b(t){return e.skipEmptyLines===`greedy`?t.join(``).trim()===``:t.length===1&&t[0].length===0}function S(){if(v&&r&&(w(`Delimiter`,`UndetectableDelimiter`,`Unable to auto-detect delimiting character; defaulted to '`+s.DefaultDelimiter+`'`),r=!1),e.skipEmptyLines&&(v.data=v.data.filter(function(e){return!b(e)})),C()){if(v)if(Array.isArray(v.data[0])){for(var t=0;C()&&t<v.data.length;t++)v.data[t].forEach(n);v.data.splice(0,1)}else v.data.forEach(n);function n(t,n){x(e.transformHeader)&&(t=e.transformHeader(t,n)),_.push(t)}}function n(t,n){for(var r=e.header?{}:[],i=0;i<t.length;i++){var s=i,u=t[i],u=((t,n)=>(t=>(e.dynamicTypingFunction&&e.dynamicTyping[t]===void 0&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)))(t)?n===`true`||n===`TRUE`||n!==`false`&&n!==`FALSE`&&((e=>{if(c.test(e)&&(e=parseFloat(e),o<e&&e<a))return 1})(n)?parseFloat(n):l.test(n)?new Date(n):n===``?null:n):n)(s=e.header?i>=_.length?`__parsed_extra`:_[i]:s,u=e.transform?e.transform(u,s):u);s===`__parsed_extra`?(r[s]=r[s]||[],r[s].push(u)):r[s]=u}return e.header&&(i>_.length?w(`FieldMismatch`,`TooManyFields`,`Too many fields: expected `+_.length+` fields but parsed `+i,f+n):i<_.length&&w(`FieldMismatch`,`TooFewFields`,`Too few fields: expected `+_.length+` fields but parsed `+i,f+n)),r}var i;v&&(e.header||e.dynamicTyping||e.transform)&&(i=1,!v.data.length||Array.isArray(v.data[0])?(v.data=v.data.map(n),i=v.data.length):v.data=n(v.data,0),e.header&&v.meta&&(v.meta.fields=_),f+=i)}function C(){return e.header&&_.length===0}function w(e,t,n,r){e={type:e,code:t,message:n},r!==void 0&&(e.row=r),v.errors.push(e)}x(e.step)&&(i=e.step,e.step=function(t){v=t,C()?S():(S(),v.data.length!==0&&(d+=t.data.length,e.preview&&d>e.preview?n.abort():(v.data=v.data[0],i(v,u))))}),this.parse=function(i,a,o){var c=e.quoteChar||`"`,c=(e.newline||=this.guessLineEndings(i,c),r=!1,e.delimiter?x(e.delimiter)&&(e.delimiter=e.delimiter(i),v.meta.delimiter=e.delimiter):((c=((t,n,r,i,a)=>{var o,c,l,u;a||=[`,`,`	`,`|`,`;`,s.RECORD_SEP,s.UNIT_SEP];for(var d=0;d<a.length;d++){for(var f,p=a[d],m=0,g=0,_=0,v=(l=void 0,new h({comments:i,delimiter:p,newline:n,preview:10}).parse(t)),y=0;y<v.data.length;y++)r&&b(v.data[y])?_++:(f=v.data[y].length,g+=f,l===void 0?l=f:0<f&&(m+=Math.abs(f-l),l=f));0<v.data.length&&(g/=v.data.length-_),(c===void 0||m<=c)&&(u===void 0||u<g)&&1.99<g&&(c=m,o=p,u=g)}return{successful:!!(e.delimiter=o),bestDelimiter:o}})(i,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess)).successful?e.delimiter=c.bestDelimiter:(r=!0,e.delimiter=s.DefaultDelimiter),v.meta.delimiter=e.delimiter),y(e));return e.preview&&e.header&&c.preview++,t=i,n=new h(c),v=n.parse(t,a,o),S(),p?{meta:{paused:!0}}:v||{meta:{paused:!1}}},this.paused=function(){return p},this.pause=function(){p=!0,n.abort(),t=x(e.chunk)?``:t.substring(n.getCharIndex())},this.resume=function(){u.streamer._halted?(p=!1,u.streamer.parseChunk(t,!0)):setTimeout(u.resume,3)},this.aborted=function(){return g},this.abort=function(){g=!0,n.abort(),v.meta.aborted=!0,x(e.complete)&&e.complete(v),t=``},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=RegExp(m(t)+`([^]*?)`+m(t),`gm`),n=(e=e.replace(t,``)).split(`\r`),t=e.split(`
`),e=1<t.length&&t[0].length<n[0].length;if(n.length===1||e)return`
`;for(var r=0,i=0;i<n.length;i++)n[i][0]===`
`&&r++;return r>=n.length/2?`\r
`:`\r`}}function m(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function h(e){var t=(e||={}).delimiter,n=e.newline,r=e.comments,i=e.step,a=e.preview,o=e.fastMode,c=null,l=!1,u=e.quoteChar==null?`"`:e.quoteChar,d=u;if(e.escapeChar!==void 0&&(d=e.escapeChar),(typeof t!=`string`||-1<s.BAD_DELIMITERS.indexOf(t))&&(t=`,`),r===t)throw Error(`Comment character same as delimiter`);!0===r?r=`#`:(typeof r!=`string`||-1<s.BAD_DELIMITERS.indexOf(r))&&(r=!1),n!==`
`&&n!==`\r`&&n!==`\r
`&&(n=`
`);var f=0,p=!1;this.parse=function(s,h,g){if(typeof s!=`string`)throw Error(`Input must be a string`);var _=s.length,v=t.length,y=n.length,b=r.length,S=x(i),C=[],w=[],T=[],E=f=0;if(!s)return R();if(o||!1!==o&&s.indexOf(u)===-1){for(var D=s.split(n),O=0;O<D.length;O++){if(T=D[O],f+=T.length,O!==D.length-1)f+=n.length;else if(g)return R();if(!r||T.substring(0,b)!==r){if(S){if(C=[],P(T.split(t)),z(),p)return R()}else P(T.split(t));if(a&&a<=O)return C=C.slice(0,a),R(!0)}}return R()}for(var k=s.indexOf(t,f),A=s.indexOf(n,f),j=new RegExp(m(d)+m(u),`g`),M=s.indexOf(u,f);;)if(s[f]===u)for(M=f,f++;;){if((M=s.indexOf(u,M+1))===-1)return g||w.push({type:`Quotes`,code:`MissingQuotes`,message:`Quoted field unterminated`,row:C.length,index:f}),I();if(M===_-1)return I(s.substring(f,M).replace(j,u));if(u===d&&s[M+1]===d)M++;else if(u===d||M===0||s[M-1]!==d){k!==-1&&k<M+1&&(k=s.indexOf(t,M+1));var N=F((A=A!==-1&&A<M+1?s.indexOf(n,M+1):A)===-1?k:Math.min(k,A));if(s.substr(M+1+N,v)===t){T.push(s.substring(f,M).replace(j,u)),s[f=M+1+N+v]!==u&&(M=s.indexOf(u,f)),k=s.indexOf(t,f),A=s.indexOf(n,f);break}if(N=F(A),s.substring(M+1+N,M+1+N+y)===n){if(T.push(s.substring(f,M).replace(j,u)),L(M+1+N+y),k=s.indexOf(t,f),M=s.indexOf(u,f),S&&(z(),p))return R();if(a&&C.length>=a)return R(!0);break}w.push({type:`Quotes`,code:`InvalidQuotes`,message:`Trailing quote on quoted field is malformed`,row:C.length,index:f}),M++}}else if(r&&T.length===0&&s.substring(f,f+b)===r){if(A===-1)return R();f=A+y,A=s.indexOf(n,f),k=s.indexOf(t,f)}else if(k!==-1&&(k<A||A===-1))T.push(s.substring(f,k)),f=k+v,k=s.indexOf(t,f);else{if(A===-1)break;if(T.push(s.substring(f,A)),L(A+y),S&&(z(),p))return R();if(a&&C.length>=a)return R(!0)}return I();function P(e){C.push(e),E=f}function F(e){var t=0;return t=e!==-1&&(e=s.substring(M+1,e))&&e.trim()===``?e.length:t}function I(e){return g||(e===void 0&&(e=s.substring(f)),T.push(e),f=_,P(T),S&&z()),R()}function L(e){f=e,P(T),T=[],A=s.indexOf(n,f)}function R(r){if(e.header&&!h&&C.length&&!l){var i=C[0],a=Object.create(null),o=new Set(i);let t=!1;for(let n=0;n<i.length;n++){let r=i[n];if(a[r=x(e.transformHeader)?e.transformHeader(r,n):r]){let e,s=a[r];for(;e=r+`_`+s,s++,o.has(e););o.add(e),i[n]=e,a[r]++,t=!0,(c=c===null?{}:c)[e]=r}else a[r]=1,i[n]=r;o.add(r)}t&&console.warn(`Duplicate headers found and renamed.`),l=!0}return{data:C,errors:w,meta:{delimiter:t,linebreak:n,aborted:p,truncated:!!r,cursor:E+(h||0),renamedHeaders:c}}}function z(){i(R()),C=[],w=[]}},this.abort=function(){p=!0},this.getCharIndex=function(){return f}}function g(e){var t=e.data,n=a[t.workerId],r=!1;if(t.error)n.userError(t.error,t.file);else if(t.results&&t.results.data){var i={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(x(n.userStep)){for(var o=0;o<t.results.data.length&&(n.userStep({data:t.results.data[o],errors:t.results.errors,meta:t.results.meta},i),!r);o++);delete t.results}else x(n.userChunk)&&(n.userChunk(t.results,i,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var n=a[e];x(n.userComplete)&&n.userComplete(t),n.terminate(),delete a[e]}function v(){throw Error(`Not implemented.`)}function y(e){if(typeof e!=`object`||!e)return e;var t,n=Array.isArray(e)?[]:{};for(t in e)n[t]=y(e[t]);return n}function b(e,t){return function(){e.apply(t,arguments)}}function x(e){return typeof e==`function`}return s.parse=function(n,r){var i=(r||={}).dynamicTyping||!1;if(x(i)&&(r.dynamicTypingFunction=i,i={}),r.dynamicTyping=i,r.transform=!!x(r.transform)&&r.transform,!r.worker||!s.WORKERS_SUPPORTED)return i=null,s.NODE_STREAM_INPUT,typeof n==`string`?(n=(e=>e.charCodeAt(0)===65279?e.slice(1):e)(n),i=new(r.download?l:d)(r)):!0===n.readable&&x(n.read)&&x(n.on)?i=new f(r):(t.File&&n instanceof File||n instanceof Object)&&(i=new u(r)),i.stream(n);(i=(()=>{var n;return!!s.WORKERS_SUPPORTED&&(n=(()=>{var n=t.URL||t.webkitURL||null,r=e.toString();return s.BLOB_URL||=n.createObjectURL(new Blob([`var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; `,`(`,r,`)();`],{type:`text/javascript`}))})(),(n=new t.Worker(n)).onmessage=g,n.id=o++,a[n.id]=n)})()).userStep=r.step,i.userChunk=r.chunk,i.userComplete=r.complete,i.userError=r.error,r.step=x(r.step),r.chunk=x(r.chunk),r.complete=x(r.complete),r.error=x(r.error),delete r.worker,i.postMessage({input:n,config:r,workerId:i.id})},s.unparse=function(e,t){var n=!1,r=!0,i=`,`,a=`\r
`,o=`"`,c=o+o,l=!1,u=null,d=!1,f=((()=>{if(typeof t==`object`){if(typeof t.delimiter!=`string`||s.BAD_DELIMITERS.filter(function(e){return t.delimiter.indexOf(e)!==-1}).length||(i=t.delimiter),typeof t.quotes!=`boolean`&&typeof t.quotes!=`function`&&!Array.isArray(t.quotes)||(n=t.quotes),typeof t.skipEmptyLines!=`boolean`&&typeof t.skipEmptyLines!=`string`||(l=t.skipEmptyLines),typeof t.newline==`string`&&(a=t.newline),typeof t.quoteChar==`string`&&(o=t.quoteChar),typeof t.header==`boolean`&&(r=t.header),Array.isArray(t.columns)){if(t.columns.length===0)throw Error(`Option columns is empty`);u=t.columns}t.escapeChar!==void 0&&(c=t.escapeChar+o),t.escapeFormulae instanceof RegExp?d=t.escapeFormulae:typeof t.escapeFormulae==`boolean`&&t.escapeFormulae&&(d=/^[=+\-@\t\r].*$/)}})(),new RegExp(m(o),`g`));if(typeof e==`string`&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return p(null,e,l);if(typeof e[0]==`object`)return p(u||Object.keys(e[0]),e,l)}else if(typeof e==`object`)return typeof e.data==`string`&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||=e.meta&&e.meta.fields||u,e.fields||=Array.isArray(e.data[0])?e.fields:typeof e.data[0]==`object`?Object.keys(e.data[0]):[],Array.isArray(e.data[0])||typeof e.data[0]==`object`||(e.data=[e.data])),p(e.fields||[],e.data||[],l);throw Error(`Unable to serialize unrecognized input`);function p(e,t,n){var o=``,s=(typeof e==`string`&&(e=JSON.parse(e)),typeof t==`string`&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),c=!Array.isArray(t[0]);if(s&&r){for(var l=0;l<e.length;l++)0<l&&(o+=i),o+=h(e[l],l);0<t.length&&(o+=a)}for(var u=0;u<t.length;u++){var d=(s?e:t[u]).length,f=!1,p=s?Object.keys(t[u]).length===0:t[u].length===0;if(n&&!s&&(f=n===`greedy`?t[u].join(``).trim()===``:t[u].length===1&&t[u][0].length===0),n===`greedy`&&s){for(var m=[],g=0;g<d;g++){var _=c?e[g]:g;m.push(t[u][_])}f=m.join(``).trim()===``}if(!f){for(var v=0;v<d;v++){0<v&&!p&&(o+=i);var y=s&&c?e[v]:v;o+=h(t[u][y],v)}u<t.length-1&&(!n||0<d&&!p)&&(o+=a)}}return o}function h(e,t){var r,a;return e==null?``:e.constructor===Date?JSON.stringify(e).slice(1,25):(a=!1,d&&typeof e==`string`&&d.test(e)&&(e=`'`+e,a=!0),r=e.toString().replace(f,c),(a=a||!0===n||typeof n==`function`&&n(e,t)||Array.isArray(n)&&n[t]||((e,t)=>{for(var n=0;n<t.length;n++)if(-1<e.indexOf(t[n]))return!0;return!1})(r,s.BAD_DELIMITERS)||-1<r.indexOf(i)||r.charAt(0)===` `||r.charAt(r.length-1)===` `)?o+r+o:r)}},s.RECORD_SEP=``,s.UNIT_SEP=``,s.BYTE_ORDER_MARK=`﻿`,s.BAD_DELIMITERS=[`\r`,`
`,`"`,s.BYTE_ORDER_MARK],s.WORKERS_SUPPORTED=!r&&!!t.Worker,s.NODE_STREAM_INPUT=1,s.LocalChunkSize=10485760,s.RemoteChunkSize=5242880,s.DefaultDelimiter=`,`,s.Parser=h,s.ParserHandle=p,s.NetworkStreamer=l,s.FileStreamer=u,s.StringStreamer=d,s.ReadableStreamStreamer=f,t.jQuery&&((n=t.jQuery).fn.parse=function(e){var r=e.config||{},i=[];return this.each(function(e){if(!(n(this).prop(`tagName`).toUpperCase()===`INPUT`&&n(this).attr(`type`).toLowerCase()===`file`&&t.FileReader)||!this.files||this.files.length===0)return!0;for(var a=0;a<this.files.length;a++)i.push({file:this.files[a],inputElem:this,instanceConfig:n.extend({},r)})}),a(),this;function a(){if(i.length===0)x(e.complete)&&e.complete();else{var t,r,a,c,l=i[0];if(x(e.before)){var u=e.before(l.file,l.inputElem);if(typeof u==`object`){if(u.action===`abort`)return t=`AbortError`,r=l.file,a=l.inputElem,c=u.reason,void(x(e.error)&&e.error({name:t},r,a,c));if(u.action===`skip`)return void o();typeof u.config==`object`&&(l.instanceConfig=n.extend(l.instanceConfig,u.config))}else if(u===`skip`)return void o()}var d=l.instanceConfig.complete;l.instanceConfig.complete=function(e){x(d)&&d(e,l.file,l.inputElem),o()},s.parse(l.file,l.instanceConfig)}}function o(){i.splice(0,1),a()}}),i&&(t.onmessage=function(e){e=e.data,s.WORKER_ID===void 0&&e&&(s.WORKER_ID=e.workerId),typeof e.input==`string`?t.postMessage({workerId:s.WORKER_ID,results:s.parse(e.input,e.config),finished:!0}):(t.File&&e.input instanceof File||e.input instanceof Object)&&(e=s.parse(e.input,e.config))&&t.postMessage({workerId:s.WORKER_ID,results:e,finished:!0})}),(l.prototype=Object.create(c.prototype)).constructor=l,(u.prototype=Object.create(c.prototype)).constructor=u,(d.prototype=Object.create(d.prototype)).constructor=d,(f.prototype=Object.create(c.prototype)).constructor=f,s})}))()),S=class{async parseCSV(e){return new Promise((t,n)=>{x.default.parse(e,{header:!0,skipEmptyLines:!0,complete:e=>{t(e.data)},error:e=>{n(e)}})})}async parseJSON(e){let t=await e.text(),n=JSON.parse(t);return Array.isArray(n)?n:[n]}async parseTXT(e){let t=(await e.text()).trim();return t?t.split(`
`).map(e=>({nome:e.trim()})):[]}static interpolate(e,t){return e?e.replace(/\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g,(e,n,r,i)=>{let a=t[n.trim()];if(a==null)return i===void 0?e:i.trim();if(r){let e=r.split(`:`);for(let t of e)t.trim()&&(a=this.applyFormatter(a,t.trim()))}return String(a)}):``}static applyFormatter(e,t){let n=t.match(/^(\w+)(?:\((.*)\))?$/);if(!n)return e;let r=n[1].toLowerCase(),i=n[2]?n[2].split(`,`).map(e=>e.trim()):[];switch(r){case`upper`:return String(e).toUpperCase();case`lower`:return String(e).toLowerCase();case`trim`:return String(e).trim();case`capitalize`:{let t=String(e);return t.charAt(0).toUpperCase()+t.slice(1)}case`title`:return String(e).replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase());case`currency`:return new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(parseFloat(e)||0);case`number`:return new Intl.NumberFormat(`pt-BR`).format(parseFloat(e)||0);case`percent`:return new Intl.NumberFormat(`pt-BR`,{style:`percent`}).format(parseFloat(e)||0);case`truncate`:{let t=parseInt(i[0])||20,n=String(e);return n.length>t?n.substring(0,t)+`...`:n}case`date`:return this.formatDate(e,!1);case`datetime`:return this.formatDate(e,!0);case`json`:return JSON.stringify(e,null,2);default:return e}}static formatDate(e,t){try{let n=new Date(e);if(isNaN(n.getTime()))return String(e);let r={day:`2-digit`,month:`2-digit`,year:`numeric`};return t&&(r.hour=`2-digit`,r.minute=`2-digit`),new Intl.DateTimeFormat(`pt-BR`,r).format(n)}catch{return String(e)}}},C=new S,w=class{static MM_PER_INCH=25.4;static PT_PER_INCH=72;static isFiniteNumber=e=>typeof e==`number`&&isFinite(e);static mmToPx(e,t=300){if(!this.isFiniteNumber(e)||!this.isFiniteNumber(t))throw Error(`Invalid input values for mmToPx`);return e/this.MM_PER_INCH*t}static pxToMm(e,t=300){if(!this.isFiniteNumber(e)||!this.isFiniteNumber(t))throw Error(`Invalid input values for pxToMm`);return e/t*this.MM_PER_INCH}static mmToPt(e){if(!this.isFiniteNumber(e))throw Error(`Invalid input value for mmToPt`);return e/this.MM_PER_INCH*this.PT_PER_INCH}static ptToMm(e){if(!this.isFiniteNumber(e))throw Error(`Invalid input value for ptToMm`);return e/this.PT_PER_INCH*this.MM_PER_INCH}static ptToPx(e,t=300){if(!this.isFiniteNumber(e)||!this.isFiniteNumber(t))throw Error(`Invalid input values for ptToPx`);return this.mmToPx(this.ptToMm(e),t)}},T=class{render(e,t){let{ctx:n,scale:r,dpi:i,data:a}=t,o=e.position.x*r,s=e.position.y*r,c=e.dimensions.width*r,l=e.dimensions.height*r,u=r/w.mmToPx(1,i),d=w.ptToPx(e.fontSize,i)*u,f=e.content||``;a&&(f=S.interpolate(f,a)),n.save(),n.fillStyle=e.color||`#000000`,typeof canvasTxt<`u`?canvasTxt.drawText(n,f,{x:o,y:s,width:c,height:l,fontSize:d,fontFamily:e.fontFamily||`sans-serif`,fontWeight:e.fontWeight||`normal`,align:e.textAlign||`center`,vAlign:`middle`,justify:!1,debug:!1}):(n.font=`${e.fontWeight||`normal`} ${d}px ${e.fontFamily||`sans-serif`}`,n.textBaseline=`middle`,n.textAlign=e.textAlign,n.fillText(f,o+c/2,s+l/2)),n.restore()}},E=class{render(e,t){let{ctx:n,scale:r,dpi:i}=t,a=e.position.x*r,o=e.position.y*r,s=e.dimensions.width*r,c=e.dimensions.height*r;n.save(),e.fillColor&&(n.fillStyle=e.fillColor,n.fillRect(a,o,s,c)),e.strokeColor&&e.strokeWidth&&(n.strokeStyle=e.strokeColor,n.lineWidth=w.mmToPx(e.strokeWidth,i)*(r/w.mmToPx(1,i)),n.strokeRect(a,o,s,c)),n.restore()}},D=class{imageCache=new Map;render(e,t){if(!e.src)return;let{ctx:n,scale:r}=t,i=e.position.x*r,a=e.position.y*r,o=e.dimensions.width*r,s=e.dimensions.height*r,c=this.imageCache.get(e.src);c||(c=new Image,c.src=e.src,this.imageCache.set(e.src,c)),c.complete?this.drawImageScaled(n,c,i,a,o,s,e.fit):c.onload=()=>{t.ctx.drawImage(c,i,a,o,s)}}drawImageScaled(e,t,n,r,i,a,o){if(o===`fill`){e.drawImage(t,n,r,i,a);return}let s=t.width/t.height,c=i/a,l=i,u=a,d=0,f=0;o===`contain`&&(s>c?(u=i/s,f=(a-u)/2):(l=a*s,d=(i-l)/2)),e.drawImage(t,n+d,r+f,l,u)}},O=class{render(e,t){let{ctx:n,scale:r,dpi:i}=t,a=e.position.x*r,o=e.position.y*r,s=n.canvas.width,c=n.canvas.height,l=s-a*2,u=c-o*2;if(n.save(),n.globalAlpha=e.opacity??1,e.rotation&&(n.translate(s/2,c/2),n.rotate(e.rotation*Math.PI/180),n.translate(-s/2,-c/2)),n.strokeStyle=e.color||`#000000`,n.lineWidth=w.mmToPx(e.width,i)*(r/w.mmToPx(1,i)),e.style===d.DASHED?n.setLineDash([15*r,10*r]):e.style===d.DOTTED&&n.setLineDash([2*r,4*r]),e.radius>0){let t=e.radius*r;n.beginPath(),n.moveTo(a+t,o),n.lineTo(a+l-t,o),n.quadraticCurveTo(a+l,o,a+l,o+t),n.lineTo(a+l,o+u-t),n.quadraticCurveTo(a+l,o+u,a+l-t,o+u),n.lineTo(a+t,o+u),n.quadraticCurveTo(a,o+u,a,o+u-t),n.lineTo(a,o+t),n.quadraticCurveTo(a,o,a+t,o),n.closePath(),n.stroke()}else n.strokeRect(a,o,l,u);n.restore()}},k=new class{renderers=new Map;constructor(){this.renderers.set(u.TEXT,new T),this.renderers.set(u.RECTANGLE,new E),this.renderers.set(u.IMAGE,new D),this.renderers.set(u.BORDER,new O)}renderAll(e,t){e.filter(e=>e.visible!==!1).sort((e,t)=>e.zIndex-t.zIndex).forEach(e=>this.render(e,t))}render(e,t){let n=this.renderers.get(e.type);n&&n.render(e,t)}hitTest(e,t,n,r){let i=w.mmToPx(1,r.dpi),a=e.position.x*i,o=e.position.y*i;if(`dimensions`in e){let r=e.dimensions.width*i,s=e.dimensions.height*i;return t>=a&&t<=a+r&&n>=o&&n<=o+s}if(e.type===u.BORDER){let a=w.mmToPx(r.widthMM,r.dpi),o=w.mmToPx(r.heightMM,r.dpi),s=e.position.x*i;return(Math.abs(t-s)<10||Math.abs(t-(a-s))<10)&&n>=s&&n<=o-s||(Math.abs(n-s)<10||Math.abs(n-(o-s))<10)&&t>=s&&t<=a-s}return!1}},A=class{static create(e,t={}){let n=m[e]||{};return{...m.COMMON,id:crypto.randomUUID(),type:e,name:`${e.charAt(0).toUpperCase()+e.slice(1)} ${Date.now().toString().slice(-4)}`,...n,...t}}},j=e({TemplateManager:()=>M,templateManager:()=>N}),M=class{STORE_NAME=`templates`;constructor(){this.setupListeners()}setupListeners(){r.on(`template:save`,()=>this.saveCurrentLabel())}async init(){await a.initialize()}async saveCurrentLabel(){let e=b.getState().currentLabel;if(!e)return;let t=await this.generateThumbnail(e),n={...JSON.parse(JSON.stringify(e)),thumbnail:t,updatedAt:Date.now()};await a.put(this.STORE_NAME,n),r.emit(`template:saved`,n),o.debug(`TemplateManager`,`Label saved to IndexedDB:`,n.name)}async getTemplates(){return await a.getAll(this.STORE_NAME)}async loadTemplate(e){let t=await a.get(this.STORE_NAME,e);t&&b.loadLabel(t)}async deleteTemplate(e){await a.delete(this.STORE_NAME,e)}async duplicateTemplate(e){let t=await a.get(this.STORE_NAME,e);if(!t)return;let n={...JSON.parse(JSON.stringify(t)),id:crypto.randomUUID(),name:`${t.name} (Copy)`,createdAt:Date.now(),updatedAt:Date.now()};await a.put(this.STORE_NAME,n)}async exportToFile(e){let t=e||b.getState().currentLabel;if(!t)return;let n=JSON.stringify(t,null,2),r=new Blob([n],{type:`application/json`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`${t.name.replace(/\s+/g,`_`)}.label`,document.body.appendChild(a),a.click(),setTimeout(()=>{document.body.removeChild(a),URL.revokeObjectURL(i)},0),o.info(`TemplateManager`,`Label exported to file:`,t.name)}async importFromFile(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=async e=>{try{let n=e.target?.result,r=JSON.parse(n);if(!r.id||!r.config||!Array.isArray(r.elements))throw Error(`Arquivo .label inválido ou corrompido.`);b.loadLabel(r),o.info(`TemplateManager`,`Label imported from file:`,r.name),t()}catch(e){o.error(`TemplateManager`,`Failed to import file:`,e),n(e)}},r.onerror=()=>n(Error(`Erro ao ler o arquivo.`)),r.readAsText(e)})}createNewProject(){let e={id:crypto.randomUUID(),name:`Nova Etiqueta`,config:{...m.CANVAS},elements:[A.create(u.TEXT,{content:`Minha Nova Etiqueta`})],createdAt:Date.now(),updatedAt:Date.now()};b.loadLabel(e)}async captureThumbnail(e){return new Promise(t=>{let n=document.createElement(`canvas`),r=n.getContext(`2d`);if(!r){t(``);return}let i=e.config.widthMM/e.config.heightMM,a=400,o=400/i;o>400&&(o=400,a=400*i),n.width=a,n.height=o;let s=a/e.config.widthMM;r.fillStyle=e.config.backgroundColor||`#ffffff`,r.fillRect(0,0,a,o),k.renderAll(e.elements,{ctx:r,scale:s,dpi:72}),t(n.toDataURL(`image/webp`,.8))})}async generateThumbnail(e){return this.captureThumbnail(e)}},N=new M,P=class{options;logger;shortcuts;sequences;longPressHandlers;currentSequence;sequenceTimer;pressedKeys;debounceTimers;contextStack;initialized;constructor(e={}){if(e&&typeof e!=`object`)throw TypeError(`Options must be an object`);this.options={enableSequences:!0,enableLongPress:!0,sequenceTimeout:1e3,longPressDuration:3e3,debounceDelay:50,debug:!1,logger:console,...e},this.logger=this.options.logger,this.shortcuts=new Map,this.sequences=new F,this.longPressHandlers=new Map,this.currentSequence=[],this.sequenceTimer=null,this.pressedKeys=new Map,this.debounceTimers=new Map,this.contextStack=[`global`],this.initialized=!1,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleBlur=this.handleBlur.bind(this),this.logger.info(`KeyboardShortcutManager`,`KeyboardShortcutManager v2.0 criado`)}init(){return this.initialized?(this._log(`Já inicializado, ignorando`),this):(document.addEventListener(`keydown`,this.handleKeyDown),document.addEventListener(`keyup`,this.handleKeyUp),window.addEventListener(`blur`,this.handleBlur),this.initialized=!0,this._log(`Event listeners registrados`),this.options.debug&&setInterval(()=>{let e=this.getMemoryStatus();(e.pressedKeys>5||e.pendingDebounce>10)&&console.warn(`⚠️ Possível vazamento detectado:`,e)},3e4),this)}destroy(){if(!this.initialized)return this;document.removeEventListener(`keydown`,this.handleKeyDown),document.removeEventListener(`keyup`,this.handleKeyUp),window.removeEventListener(`blur`,this.handleBlur),this.shortcuts.clear(),this.sequences.clear(),this.longPressHandlers.clear(),this._clearAllTimers();for(let e of this.debounceTimers.values())clearTimeout(e);return this.debounceTimers.clear(),this.initialized=!1,this._log(`KeyboardShortcutManager destruído`),this}register(e,t,n={}){this._validateKey(e),this._validateHandler(t),this._validateOptions(n);let r={description:``,context:`global`,preventDefault:!0,stopPropagation:!1,priority:0,debounce:!1,category:`Geral`,...n},i=this._normalizeKeyString(e);return this.shortcuts.has(i)||this.shortcuts.set(i,[]),this.shortcuts.get(i).push({handler:t,config:r}),this.shortcuts.get(i).sort((e,t)=>t.config.priority-e.config.priority),this._log(`Atalho registrado: ${i}`,r),this}registerSequence(e,t,n={}){this._validateSequence(e),this._validateHandler(t),this._validateOptions(n);let r={description:``,resetOnError:!0,caseSensitive:!1,category:`Geral`,...n},i=e.map(e=>r.caseSensitive?e:e.toLowerCase());return this.sequences.insert(i,t,r),this._log(`Sequência registrada: ${i.join(` → `)}`,r),this}registerLongPress(e,t,n={}){this._validateKey(e),this._validateHandler(t);let r={duration:this.options.longPressDuration,description:``,category:`Geral`,...n},i=this._normalizeKeyString(e);return this.longPressHandlers.set(i,{handler:t,config:r}),this._log(`Long press registrado: ${i} (${r.duration}ms)`,r),this}registerKonamiCode(e,t={}){return this.registerSequence([`ArrowUp`,`ArrowUp`,`ArrowDown`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`ArrowLeft`,`ArrowRight`,`b`,`a`],e,{description:`Konami Code`,...t})}registerFibonacciSequence(e,t={}){return this.registerSequence([`1`,`1`,`2`,`3`,`5`,`8`],e,{description:`Sequência de Fibonacci`,...t})}handleKeyDown(e){if(!this.initialized||!e.key||e.repeat&&this.options.enableLongPress&&!this.options.enableSequences)return;let{code:t,key:n,normalizedKey:r}=this._extractKeyInfo(e);this._log(`Keydown: ${r} (code: ${t}, key: ${n})`);let i=this._isInputFocused(),a=i?`no-input`:this.getCurrentContext();this.options.enableLongPress&&!i&&this._handleLongPress(t,n,e),this.options.enableSequences&&!i&&this._processSequence(n),this._executeShortcuts(r,e,i,a)}handleKeyUp(e){if(!this.initialized||!e.key)return;let{code:t}=this._extractKeyInfo(e);this._cancelLongPress(t)}handleBlur(){this._clearAllTimers(),this.currentSequence=[],this.pressedKeys.clear()}_executeShortcuts(e,t,n,r){let i=this.shortcuts.get(e);if(i){for(let{handler:a,config:o}of i)if(this._checkContext(o.context,n,e)){if(o.preventDefault&&t.preventDefault(),o.stopPropagation&&t.stopPropagation(),o.debounce)this._executeWithDebounce(e,a,t,r);else if(a(t,{key:e,context:r})===!1)break}}}_executeWithDebounce(e,t,n,r){this.debounceTimers.has(e)&&clearTimeout(this.debounceTimers.get(e));let i=setTimeout(()=>{t(n,{key:e,context:r}),this.debounceTimers.delete(e)},this.options.debounceDelay);this.debounceTimers.set(e,i)}_processSequence(e){let t=e.toLowerCase();this.currentSequence.push(t),this._clearSequenceTimer();let n=this.sequences.search(this.currentSequence);if(n.match){this._log(`Sequência completada: ${this.currentSequence.join(` → `)}`),n.handler({sequence:[...this.currentSequence],config:n.config}),this.currentSequence=[];return}if(!n.hasPrefix){this._clearSequenceTimer(),this.currentSequence=[];return}this.sequenceTimer=setTimeout(()=>{this._log(`Sequência expirou`),this.currentSequence=[],this.sequenceTimer=null},this.options.sequenceTimeout)}_clearSequenceTimer(){this.sequenceTimer!==null&&(clearTimeout(this.sequenceTimer),this.sequenceTimer=null)}_handleLongPress(e,t,n){if(this.pressedKeys.has(e))return;let r=this._normalizeKeyString(t),i=this.longPressHandlers.get(r);if(!i){this.pressedKeys.set(e,{timestamp:Date.now(),timer:null});return}let a=setTimeout(()=>{this._log(`Long press: ${r}`),i.handler(n,{key:r,duration:i.config.duration}),this.pressedKeys.delete(e)},i.config.duration);this.pressedKeys.set(e,{timestamp:Date.now(),timer:a})}_cancelLongPress(e){let t=this.pressedKeys.get(e);t&&(t.timer!==null&&clearTimeout(t.timer),this.pressedKeys.delete(e))}pushContext(e){return this._validateContext(e),this.contextStack.push(e),this._log(`Contexto adicionado: ${e}`,this.contextStack),this}popContext(){if(this.contextStack.length<=1)return this._log(`Não é possível remover contexto global`),this;let e=this.contextStack.pop();return this._log(`Contexto removido: ${e}`,this.contextStack),this}getCurrentContext(){return this.contextStack[this.contextStack.length-1]}_checkContext(e,t,n){let r=n.includes(`+`);return t&&!r?(this._log(`Atalho [${n}] BLOQUEADO: Foco em input detectado.`),!1):e===`global`?!0:e===`no-input`?!t:typeof e==`function`?e(this.getCurrentContext()):typeof e==`string`?this.contextStack.includes(e):!0}_extractKeyInfo(e){let t=e.code,n=e.key,r=[];e.ctrlKey&&r.push(`ctrl`),e.altKey&&r.push(`alt`),e.shiftKey&&r.push(`shift`),e.metaKey&&r.push(`meta`);let i=n.toLowerCase();(e.ctrlKey||e.altKey||e.metaKey)&&t.startsWith(`Key`)&&(i=t.replace(`Key`,``).toLowerCase()),[`control`,`alt`,`shift`,`meta`].includes(i)&&(i=``);let a=[...new Set(r)];i&&a.push(i);let o=a.filter(e=>[`ctrl`,`alt`,`shift`,`meta`].includes(e)).sort(),s=a.filter(e=>![`ctrl`,`alt`,`shift`,`meta`].includes(e));return{code:t,key:n,normalizedKey:[...o,...s].join(`+`)}}_normalizeKeyString(e){let t=e.toLowerCase().replace(/command|cmd/g,`meta`).replace(/option/g,`alt`).split(/[\s+]+/).filter(e=>e.trim()!==``),n=t.filter(e=>[`ctrl`,`alt`,`shift`,`meta`].includes(e)).sort(),r=t.filter(e=>![`ctrl`,`alt`,`shift`,`meta`].includes(e));return[...n,...r].join(`+`)}_isInputFocused(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return[`INPUT`,`TEXTAREA`,`SELECT`].includes(e?.tagName||``)||e?.isContentEditable===!0}_validateKey(e){if(typeof e!=`string`||e.trim()===``)throw TypeError(`Key must be a non-empty string`)}_validateHandler(e){if(typeof e!=`function`)throw TypeError(`Handler must be a function`)}_validateSequence(e){if(!Array.isArray(e)||e.length===0)throw TypeError(`Sequence must be a non-empty array`);e.forEach((e,t)=>{if(typeof e!=`string`)throw TypeError(`Sequence[${t}] must be a string`)})}_validateOptions(e){if(e&&typeof e!=`object`)throw TypeError(`Options must be an object`)}_validateContext(e){if(typeof e!=`string`||e.trim()===``)throw TypeError(`Context must be a non-empty string`)}_clearAllTimers(){this._clearSequenceTimer();for(let e of this.pressedKeys.values())e.timer!==null&&clearTimeout(e.timer);this.pressedKeys.clear();for(let e of this.debounceTimers.values())clearTimeout(e);this.debounceTimers.clear()}unregister(e){let t=this._normalizeKeyString(e);return this.shortcuts.delete(t)&&this._log(`Atalho removido: ${t}`),this}unregisterSequence(e){let t=e.map(e=>e.toLowerCase());return this.sequences.delete(t)&&this._log(`Sequência removida: ${t.join(` → `)}`),this}unregisterLongPress(e){let t=this._normalizeKeyString(e);return this.longPressHandlers.delete(t)&&this._log(`Long press removido: ${t}`),this}listShortcuts(){let e=[];for(let[t,n]of this.shortcuts)n.forEach(({config:n})=>{e.push({type:`shortcut`,key:t,description:n.description,context:n.context,priority:n.priority,category:n.category})});this.sequences.forEach((t,n,r)=>{e.push({type:`sequence`,sequence:t.join(` → `),description:r?.description||``,category:r?.category||`Geral`})});for(let[t,{config:n}]of this.longPressHandlers)e.push({type:`longpress`,key:t,description:n.description,duration:n.duration,category:n.category});return e}_log(...e){this.options.debug&&this.logger.log(`KeyboardShortcutManager`,...e)}getMemoryStatus(){return{activeShortcuts:this.shortcuts.size,activeSequences:this.sequences.root.children.size,activeLongPress:this.longPressHandlers.size,pressedKeys:this.pressedKeys.size,pendingDebounce:this.debounceTimers.size,hasSequenceTimer:this.sequenceTimer!==null,currentSequence:this.currentSequence.length,initialized:this.initialized}}},F=class{root;constructor(){this.root={children:new Map,handler:null,config:null}}insert(e,t,n){let r=this.root;for(let t of e)r.children.has(t)||r.children.set(t,{children:new Map,handler:null,config:null}),r=r.children.get(t);r.handler=t,r.config=n}search(e){let t=this.root;for(let n of e){if(!t.children.has(n))return{match:!1,hasPrefix:!1};t=t.children.get(n)}return{match:t.handler!==null,hasPrefix:t.children.size>0||t.handler!==null,handler:t.handler,config:t.config}}delete(e){let t=[],n=this.root;for(let r of e){if(!n.children.has(r))return!1;t.push({node:n,key:r}),n=n.children.get(r)}if(n.handler===null)return!1;n.handler=null,n.config=null;for(let e=t.length-1;e>=0;e--){let{node:n,key:r}=t[e],i=n.children.get(r);if(i.children.size===0&&i.handler===null)n.children.delete(r);else break}return!0}forEach(e){this._traverse(this.root,[],e)}_traverse(e,t,n){e.handler!==null&&n(t,e.handler,e.config);for(let[r,i]of e.children)this._traverse(i,[...t,r],n)}clear(){this.root.children.clear()}},I=new class{manager;isInitialized=!1;propClipboard=null;metaKeyName=`ctrl`;constructor(){this.manager=new P({debug:!0,enableSequences:!0,enableLongPress:!0,debounceDelay:50,logger:o})}init(e){this.isInitialized||(this.metaKeyName=e?`meta`:`ctrl`,this.manager.init(),this.registerDefaults(),this.setupModalListeners(),this.isInitialized=!0,o.info(`ShortcutService`,`Serviço de atalhos refinado e inicializado.`))}setupModalListeners(){r.on(`ui:modal:open`,()=>{o.debug(`ShortcutService`,`Contexto alterado para: MODAL`),this.pushContext(`modal`)}),r.on(`ui:modal:close`,()=>{o.debug(`ShortcutService`,`Contexto restaurado para: GLOBAL`),this.popContext()})}registerDefaults(){this.manager.register(`${this.metaKeyName}+s`,e=>{r.emit(`template:save`,{source:`shortcut`}),c.play(c.enumPresets.SUCCESS),r.emit(`notify`,{message:`Etiqueta salva com sucesso!`,type:`success`})},{description:`Salvar Template`,category:`Projeto`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+alt+n`,e=>{N.createNewProject(),c.play(c.enumPresets.OPEN),r.emit(`notify`,{message:`Novo projeto criado`,type:`info`})},{description:`Novo Projeto`,category:`Projeto`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+z`,()=>r.emit(`history:undo`,{source:`shortcut`}),{description:`Desfazer`,category:`Edição`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+shift+z`,()=>r.emit(`history:redo`,{source:`shortcut`}),{description:`Refazer`,category:`Edição`,preventDefault:!0}),this.manager.register(`delete`,()=>this.handleDelete(),{description:`Excluir Elemento`,context:`no-input`,preventDefault:!0}),this.manager.register(`backspace`,()=>this.handleDelete(),{description:`Excluir Elemento`,context:`no-input`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+d`,()=>{let e=b.getState().selectedElementIds[0];e&&r.emit(`element:duplicate`,e)},{description:`Duplicar`,category:`Edição`,context:`no-input`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+alt+c`,()=>this.copyProperties(),{description:`Copiar Propriedades`,category:`Edição`,context:`no-input`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+alt+v`,()=>this.pasteProperties(),{description:`Colar Propriedades`,category:`Edição`,context:`no-input`,preventDefault:!0}),this.manager.register(`${this.metaKeyName}+[`,()=>this.reorder(`down`),{description:`Recuar Camada`,category:`Organizar`}),this.manager.register(`${this.metaKeyName}+]`,()=>this.reorder(`up`),{description:`Avançar Camada`,category:`Organizar`}),this.manager.register(`${this.metaKeyName}+l`,()=>this.toggleProp(`locked`),{description:`Bloquear/Desbloquear`,category:`Edição`}),this.manager.register(`${this.metaKeyName}+shift+h`,()=>this.toggleProp(`visible`),{description:`Ocultar/Mostrar`,category:`Edição`}),this.manager.register(`escape`,()=>r.emit(`element:select`,[]),{description:`Limpar Seleção`}),this.registerMovementShortcuts(),this.registerToolbarShortcuts(),this.manager.register(`${this.metaKeyName}+/`,()=>{o.debug(`ShortcutService`,`Atalho de ajuda acionado`),r.emit(`ui:open:help`,{source:`shortcut`})},{description:`Mostrar Atalhos`,category:`Ajuda`,preventDefault:!0}),this.manager.registerSequence([`t`,`e`,`s`,`t`,`e`],()=>{o.debug(`ShortcutService`,`Sequência de teste ativada!`),r.emit(`notify`,{message:`Sequência secreta ativada!`,type:`success`})},{description:`Sequência de Teste`,category:`Easter Egg`})}registerMovementShortcuts(){let e=[`arrowup`,`arrowdown`,`arrowleft`,`arrowright`],t={arrowup:{x:0,y:-1},arrowdown:{x:0,y:1},arrowleft:{x:-1,y:0},arrowright:{x:1,y:0}},n={arrowup:`Mover para cima`,arrowdown:`Mover para baixo`,arrowleft:`Mover para a esquerda`,arrowright:`Mover para a direita`};e.forEach(e=>{this.manager.register(e,n=>{let r=1;n.shiftKey&&(r=10),n.altKey&&(r=.1);let i=t[e];this.moveSelectedElement(i.x*r,i.y*r)},{description:n[e],context:`no-input`,preventDefault:!0}),this.manager.register(`shift+${e}`,n=>{let r=t[e];this.moveSelectedElement(r.x*10,r.y*10)},{description:`${n[e]} rápido`,context:`no-input`,preventDefault:!0}),this.manager.register(`alt+${e}`,n=>{let r=t[e];this.moveSelectedElement(r.x*.1,r.y*.1)},{description:`${n[e]} lento`,context:`no-input`,preventDefault:!0})})}async registerToolbarShortcuts(){this.manager.registerLongPress(`t`,()=>this.addElement(u.TEXT),{description:`Adicionar Texto`,category:`Toolbar`,duration:300}),this.manager.registerLongPress(`r`,()=>this.addElement(u.RECTANGLE),{description:`Adicionar Retângulo`,category:`Toolbar`,duration:300}),this.manager.register(`shift+r`,()=>this.addElement(u.RECTANGLE,{dimensions:{width:40,height:40}}),{description:`Adicionar Quadrado`,category:`Toolbar`,context:`no-input`}),this.manager.registerLongPress(`i`,()=>{r.emit(`command:toolbar:upload-image`,{source:`shortcut`})},{description:`Adicionar Imagem`,category:`Toolbar`,duration:300}),this.manager.registerLongPress(`b`,()=>this.addElement(u.BORDER),{description:`Adicionar Moldura`,category:`Toolbar`,duration:300}),this.manager.registerLongPress(`v`,()=>{let e=document.getElementById(`vault-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN)},{description:`Abrir Vault`,category:`Toolbar`,duration:300}),this.manager.registerLongPress(`p`,()=>{let e=document.getElementById(`batch-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN)},{description:`Produção (A4/Lote)`,category:`Toolbar`,duration:300})}addElement(e,t={}){let n=A.create(e,t);r.emit(`element:add`,n),c.play(c.enumPresets.SWOOSHIN)}moveSelectedElement(e,t){let n=b.getState(),i=n.selectedElementIds[0];if(!i||!n.currentLabel)return;let a=n.currentLabel.elements.find(e=>e.id===i);!a||a.locked||r.emit(`element:update`,{id:i,updates:{position:{x:Number((a.position.x+e).toFixed(2)),y:Number((a.position.y+t).toFixed(2))}}})}copyProperties(){let e=b.getState(),t=e.selectedElementIds[0],n=e.currentLabel?.elements.find(e=>e.id===t);n&&(this.propClipboard={type:n.type,position:{...n.position},dimensions:`dimensions`in n?{...n.dimensions}:void 0,styles:this.extractStyles(n)},c.play(c.enumPresets.TAP),r.emit(`notify`,{message:`Propriedades copiadas`,type:`info`}))}pasteProperties(){if(!this.propClipboard)return;let e=b.getState().selectedElementIds[0];if(!e)return;let t={position:this.propClipboard.position};this.propClipboard.dimensions&&(t.dimensions=this.propClipboard.dimensions),Object.assign(t,this.propClipboard.styles),r.emit(`element:update`,{id:e,updates:t}),c.play(c.enumPresets.REPLACE)}extractStyles(e){let t={};return[`color`,`fillColor`,`strokeColor`,`strokeWidth`,`opacity`,`fontSize`,`fontWeight`,`fontFamily`,`borderRadius`,`textAlign`].forEach(n=>{n in e&&(t[n]=e[n])}),t}toggleProp(e){let t=b.getState().selectedElementIds[0];if(!t)return;let n=b.getState().currentLabel?.elements.find(e=>e.id===t);if(!n)return;let i=e===`locked`?!n.locked:n.visible===!1;r.emit(`element:update`,{id:t,updates:{[e]:i}}),c.play(c.enumPresets.TOGGLE)}reorder(e){let t=b.getState().selectedElementIds[0];t&&r.emit(`element:reorder`,{id:t,direction:e})}handleDelete(){let e=b.getState().selectedElementIds[0];e&&(r.emit(`element:delete`,e),c.play(c.enumPresets.DELETE))}listShortcuts(){return this.manager.listShortcuts()}pushContext(e){this.manager.pushContext(e)}popContext(){this.manager.popContext()}},L=280,R={type:`info`,duration:4e3,message:``},z={success:`<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.6"/>
    <path d="M6 10.5l2.8 2.8L14 7.5" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,error:`<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.6"/>
    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round"/>
  </svg>`,warning:`<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2.5L18 17.5H2L10 2.5z" stroke="currentColor" stroke-width="1.6"
          stroke-linejoin="round"/>
    <path d="M10 8.5v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="10" cy="14.5" r="0.9" fill="currentColor"/>
  </svg>`,info:`<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.6"/>
    <path d="M10 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="10" cy="6.5" r="0.9" fill="currentColor"/>
  </svg>`},ee={success:`status`,error:`alert`,warning:`alert`,info:`status`},te=document.createElement(`template`);te.innerHTML=`
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :host {
      display: block;
      width: var(--toast-width, 340px);
      max-width: calc(100vw - var(--toast-offset, 24px) * 2);

      /* Token interno: resolvido uma vez no :host */
      --_dur: var(--toast-duration-ms, ${L}ms);

      /* Estado inicial: deslocado para direita e invisível */
      opacity: 0;
      transform: translateX(calc(var(--toast-width, 340px) + 48px));
      transition:
        opacity   var(--_dur) cubic-bezier(.4, 0, .2, 1),
        transform var(--_dur) cubic-bezier(.4, 0, .2, 1);
      will-change: transform, opacity;
    }

    /* WCAG 2.1 §2.3.3 — respeita preferência de movimento reduzido */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transform: none !important;
        transition: opacity var(--_dur) linear;
      }
      [part="toast-bar"] { display: none !important; }
    }

    :host([data-visible]) {
      opacity: 1;
      transform: translateX(0);
    }

    /* ── Tokens padrão neutros por tipo ── */
    :host([type="success"]) {
      --_bg:     var(--toast-success-bg,     #f0fdf4);
      --_color:  var(--toast-success-color,  #166534);
      --_border: var(--toast-success-border, #22c55e);
    }
    :host([type="error"]) {
      --_bg:     var(--toast-error-bg,     #fef2f2);
      --_color:  var(--toast-error-color,  #991b1b);
      --_border: var(--toast-error-border, #ef4444);
    }
    :host([type="warning"]) {
      --_bg:     var(--toast-warning-bg,     #fffbeb);
      --_color:  var(--toast-warning-color,  #92400e);
      --_border: var(--toast-warning-border, #f59e0b);
    }
    :host([type="info"]) {
      --_bg:     var(--toast-info-bg,     #eff6ff);
      --_color:  var(--toast-info-color,  #1e40af);
      --_border: var(--toast-info-border, #3b82f6);
    }

    [part="toast-root"] {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: var(--toast-padding, 14px 16px);
      background: var(--_bg);
      color: var(--_color);
      border-radius: var(--toast-radius, 10px);
      border-left: 4px solid var(--_border);
      box-shadow: var(--toast-shadow,
        0 4px 6px -1px rgb(0 0 0 / .07),
        0 2px 4px -2px rgb(0 0 0 / .06)
      );
      font-family: var(--toast-font-family, system-ui, sans-serif);
      font-size: var(--toast-font-size, .9rem);
      line-height: 1.5;
      overflow: hidden;
      max-height: var(--toast-max-height, 160px);
    }

    [part="toast-icon"] {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 1px;
      color: var(--_border);
    }

    [part="toast-body"] {
      flex: 1;
      word-break: break-word;
      overflow-y: auto;
    }

    [part="toast-close"] {
      flex-shrink: 0;
      appearance: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      margin-top: -1px;
      color: var(--_color);
      opacity: .55;
      border-radius: 4px;
      line-height: 1;
      transition: opacity .15s;
    }

    [part="toast-close"]:hover,
    [part="toast-close"]:focus-visible {
      opacity: 1;
      outline: 2px solid var(--_border);
      outline-offset: 1px;
    }

    [part="toast-bar"] {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background: var(--toast-progress-bg, var(--_border));
      opacity: .45;
      transform-origin: left;
      transform: scaleX(1);
    }
  </style>

  <div part="toast-root">
    <span part="toast-icon"></span>
    <span part="toast-body"></span>
    <button part="toast-close" aria-label="Fechar notificação" type="button">
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true">
        <path d="M2 2l10 10M12 2L2 12"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
    <div part="toast-bar" aria-hidden="true"></div>
  </div>
`;function ne(e){return e===`success`||e===`error`||e===`warning`||e===`info`}var re=class extends HTMLElement{#e;#t=null;#n=null;#r=null;#i;#a;#o;#s;static observedAttributes=[`type`,`message`,`duration`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.appendChild(te.content.cloneNode(!0)),this.#i=this.#e.querySelector(`[part="toast-root"]`),this.#a=this.#e.querySelector(`[part="toast-icon"]`),this.#o=this.#e.querySelector(`[part="toast-body"]`),this.#s=this.#e.querySelector(`[part="toast-bar"]`)}connectedCallback(){this.#t=new AbortController;let{signal:e}=this.#t;this.#d(this.getAttribute(`type`)),this.#f(this.getAttribute(`message`)??R.message),this.#p(),this.#m(),this.#e.querySelector(`[part="toast-close"]`).addEventListener(`click`,()=>{this.dismiss()},{signal:e}),requestAnimationFrame(()=>{this.setAttribute(`data-visible`,``)})}disconnectedCallback(){this.#t?.abort(),this.#n!==null&&clearTimeout(this.#n),this.#r?.cancel()}attributeChangedCallback(e,t,n){t===n||!this.isConnected||(e===`type`?this.#d(n):e===`message`?this.#f(n??R.message):e===`duration`&&(this.#r?.cancel(),this.#r=null,this.#p(),this.#m()))}dismiss(){this.removeAttribute(`data-visible`);let e=parseFloat(getComputedStyle(this).getPropertyValue(`--toast-duration-ms`).trim())||L;setTimeout(()=>{let e=new CustomEvent(`ui-toast:dismissed`,{bubbles:!0,composed:!0,detail:{type:this.#c,message:this.#l}});this.dispatchEvent(e),this.remove()},e)}get#c(){let e=this.getAttribute(`type`);return ne(e)?e:R.type}get#l(){return this.getAttribute(`message`)??R.message}get#u(){let e=parseInt(this.getAttribute(`duration`)??``,10);return Number.isFinite(e)&&e>=0?e:R.duration}#d(e){let t=ne(e)?e:R.type,n=ee[t];this.#a.innerHTML=z[t],this.#i.setAttribute(`role`,n),this.#i.setAttribute(`aria-live`,n===`alert`?`assertive`:`polite`)}#f(e){this.#o.textContent=e}#p(){let e=this.#u;if(e<=0){this.#s.style.display=`none`;return}this.#s.style.display=``,this.#r=this.#s.animate([{transform:`scaleX(1)`},{transform:`scaleX(0)`}],{duration:e,fill:`forwards`,easing:`linear`})}#m(){this.#n!==null&&(clearTimeout(this.#n),this.#n=null);let e=this.#u;e>0&&(this.#n=setTimeout(()=>{this.dismiss()},e))}};customElements.define(`ui-toast`,re);var ie=class e extends HTMLElement{#e;static MAX_TOASTS=5;constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.innerHTML=`
      <style>
        :host {
          position: fixed;
          bottom: var(--toast-offset, 24px);
          right:  var(--toast-offset, 24px);
          z-index: var(--toast-z-index, 9999);
          display: flex;
          flex-direction: column-reverse; /* Novo toast aparece na base da pilha */
          gap: var(--toast-gap, 10px);
          pointer-events: none;           /* Container não bloqueia cliques na página */
        }
        ::slotted(ui-toast) {
          pointer-events: auto;           /* Toasts individuais são clicáveis */
        }
      </style>
      <slot></slot>
    `}show({type:t=R.type,message:n=R.message,duration:r=R.duration}){let i=this.querySelectorAll(`ui-toast`);i.length>=e.MAX_TOASTS&&i[0].dismiss();let a=document.createElement(`ui-toast`);return a.setAttribute(`type`,t),a.setAttribute(`message`,n),a.setAttribute(`duration`,String(r)),this.appendChild(a),c.play(c.enumPresets.NOTIFY),a}clear(){this.querySelectorAll(`ui-toast`).forEach(e=>{e.dismiss()})}};customElements.define(`ui-toast-manager`,ie);function ae(){let e=document.querySelector(`ui-toast-manager`);if(e!==null)return e;let t=document.createElement(`ui-toast-manager`);return document.body.appendChild(t),t}var oe={show(e){return ae().show(e)},clear(){ae().clear()}},B=`Ctrl`,V=`Control`,H=!1,U=!1,se=()=>{if(typeof navigator<`u`){let e=navigator.platform.toLowerCase(),t=navigator.userAgent.toLowerCase();H=e.includes(`mac`)||t.includes(`mac os`),H?(B=`⌘`,V=`Meta`):(B=`Ctrl`,V=`Control`)}},ce=()=>{U=/Mobi|Android/i.test(navigator.userAgent)||window.innerWidth<=768},le=()=>(se(),ce(),{metaKey:B,metaKeyName:V,isMac:H,isMobile:U,platform:typeof navigator<`u`?navigator.platform:`unknown`,userAgent:typeof navigator<`u`?navigator.userAgent:`unknown`}),ue=`@import "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap";@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1}}}@layer theme{:root,:host{--font-sans:"Inter", system-ui, sans-serif;--font-mono:"JetBrains Mono", monospace;--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-sm:24rem;--container-md:28rem;--container-2xl:42rem;--container-4xl:56rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height:calc(2.25 / 1.875);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-tight:-.025em;--tracking-wide:.025em;--tracking-wider:.05em;--tracking-widest:.1em;--leading-relaxed:1.625;--leading-loose:2;--radius-xs:.125rem;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--radius-4xl:2rem;--ease-in:cubic-bezier(.4, 0, 1, 1);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-ping:ping 1s cubic-bezier(0, 0, .2, 1) infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--blur-sm:8px;--blur-md:12px;--blur-xl:24px;--blur-3xl:64px;--aspect-video:16 / 9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-canvas:#0f1115;--color-surface:#161920d9;--color-surface-solid:#161920;--color-border-ui:#262a33;--color-text-main:#f8fafc;--color-text-muted:#94a3b8;--color-accent-primary:#6366f1;--color-accent-hover:#4f46e5;--color-accent-success:#10b981;--color-accent-danger:#f43f5e;--color-accent-warning:#f59e0b;--ease-spring:cubic-bezier(.34, 1.56, .64, 1);--shadow-panel:0 8px 32px #00000080;--shadow-neon-primary:0 0 12px #6366f166}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}body{background-color:var(--color-canvas);font-family:var(--font-sans);color:var(--color-text-main);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-user-select:none;user-select:none;overflow:hidden}*{scrollbar-width:thin;scrollbar-color:var(--color-border-ui) transparent}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:0 0;margin:4px}::-webkit-scrollbar-thumb{background-color:var(--color-border-ui);background-clip:padding-box;border:2px solid #0000;border-radius:99px}::-webkit-scrollbar-thumb:hover{background-color:var(--color-text-muted)}::-webkit-scrollbar-thumb:active{background-color:var(--color-accent-primary)}::-webkit-scrollbar-corner{background:0 0}}@layer components{.layout-container{background-color:var(--color-canvas);width:100%;height:100dvh;position:relative;overflow:hidden}.canvas-workspace{z-index:0;background-image:radial-gradient(circle,#262a3366 1px,#0000 1px);background-size:24px 24px;box-shadow:inset 0 0 120px #0009}.label-artboard{background-color:var(--color-white);-webkit-print-color-adjust:exact;print-color-adjust:exact;transition:transform .4s var(--ease-spring);position:relative;overflow:hidden;box-shadow:0 25px 50px -12px #000000e6,0 0 0 1px #0000000d}.toolbar-pill{top:calc(var(--spacing) * 6);left:calc(var(--spacing) * 6);z-index:50;align-items:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);padding:calc(var(--spacing) * 2);--tw-shadow:0 8px 32px var(--tw-shadow-color,#00000080);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);background-color:#161920d9;display:flex;position:absolute}.panel-glass{top:calc(var(--spacing) * 0);right:calc(var(--spacing) * 0);z-index:40;height:100%;width:calc(var(--spacing) * 85);padding:calc(var(--spacing) * 6);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border-left:1px solid var(--color-border-ui);transition:transform .4s var(--ease-spring);background-color:#161920bf;flex-direction:column;flex-shrink:0;padding-right:1px;display:flex;position:absolute;box-shadow:-10px 0 40px #00000080}.input-prism{border-radius:var(--radius-lg);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);background-color:#0003;width:100%}@supports (color:color-mix(in lab, red, red)){.input-prism{background-color:color-mix(in oklab, var(--color-black) 20%, transparent)}}.input-prism{padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));color:var(--color-text-main);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));--tw-duration:.2s;--tw-outline-style:none;outline-style:none;transition-duration:.2s}.input-prism::placeholder{color:var(--color-text-muted)}.input-prism:focus,.input-prism:focus-within{border-color:var(--color-accent-primary);box-shadow:var(--shadow-neon-primary)}.label-prism{margin-bottom:calc(var(--spacing) * 1.5);font-family:var(--font-mono);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);color:var(--color-text-muted);text-transform:uppercase;font-size:10px;display:block}.btn-prism{cursor:pointer;justify-content:center;align-items:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-lg);padding-inline:calc(var(--spacing) * 4);padding-block:calc(var(--spacing) * 2);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));-webkit-user-select:none;user-select:none;transition-timing-function:var(--ease-spring);display:inline-flex}.btn-prism:active:not(:disabled){filter:brightness(.85);transform:translateY(2px)scale(.96);box-shadow:inset 0 4px 8px #0006,inset 0 1px 2px #0009}.btn-prism:focus-visible{box-shadow:0 0 0 2px var(--color-canvas), 0 0 0 4px var(--color-accent-primary), 0 0 16px #6366f180;outline:none;transform:translateY(-1px)}.btn-primary{background-color:var(--color-accent-primary);color:var(--color-white)}@media (hover:hover){.btn-primary:hover{background-color:var(--color-accent-hover);--tw-shadow:0 0 16px var(--tw-shadow-color,#6366f180);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}}.btn-secondary{border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);background-color:var(--color-surface-solid);color:var(--color-text-main)}@media (hover:hover){.btn-secondary:hover{background-color:var(--color-border-ui)}}.btn-success{background-color:var(--color-accent-success);--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:var(--color-black)}@media (hover:hover){.btn-success:hover{--tw-shadow:0 0 16px var(--tw-shadow-color,#10b98166);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-brightness:brightness(110%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}}.btn-danger{border-style:var(--tw-border-style);border-width:1px;border-color:#f43f5e80}@supports (color:color-mix(in lab, red, red)){.btn-danger{border-color:color-mix(in oklab, var(--color-accent-danger) 50%, transparent)}}.btn-danger{background-color:#f43f5e1a}@supports (color:color-mix(in lab, red, red)){.btn-danger{background-color:color-mix(in oklab, var(--color-accent-danger) 10%, transparent)}}.btn-danger{color:var(--color-accent-danger)}@media (hover:hover){.btn-danger:hover{background-color:var(--color-accent-danger);color:var(--color-white)}}.card-module{margin-bottom:calc(var(--spacing) * 4);border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);background-color:var(--color-surface-solid);padding:calc(var(--spacing) * 4);--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}ui-icon{--icon-size:18px;width:var(--icon-size);height:var(--icon-size);color:currentColor;pointer-events:none;justify-content:center;align-items:center;display:inline-flex}ui-icon::part(svg){stroke-width:1.5px;stroke:currentColor;fill:none;width:100%;height:100%;transition:transform .3s var(--ease-spring)}button:hover>ui-icon::part(svg),.btn-prism:hover>ui-icon::part(svg){transform:scale(1.15)}ui-modal{--modal-z:10000;--modal-backdrop:#0009;--modal-backdrop-blur:8px;--modal-bg:var(--color-surface-solid);--modal-border:var(--color-border-ui);--modal-radius:16px;--modal-padding:24px;--modal-shadow:var(--shadow-panel), inset 0 1px 0 #ffffff0d;--modal-font:var(--font-sans);--modal-duration:.3s;--modal-easing:var(--ease-spring)}ui-modal::part(header){border-bottom:1px solid var(--color-border-ui);margin-bottom:20px;padding-bottom:16px}ui-modal::part(title){color:var(--color-text-main);font-weight:600}ui-modal::part(body){color:var(--color-text-muted)}ui-modal::part(close-btn):hover{color:var(--color-accent-primary);transition:all .3s var(--ease-spring);transform:rotate(90deg)scale(1.1)}ui-confirm{--uc-z-index:10001;--uc-backdrop-color:#000c;--uc-panel-bg:var(--color-surface-solid);--uc-panel-border:var(--color-border-ui);--uc-panel-radius:12px;--uc-panel-shadow:var(--shadow-panel), var(--shadow-neon-primary);--uc-font-family:var(--font-sans);--uc-color-title:var(--color-text-main);--uc-color-message:var(--color-text-muted);--uc-btn-cancel-bg:transparent;--uc-btn-cancel-color:var(--color-text-muted);--uc-btn-cancel-border:var(--color-border-ui)}ui-confirm::part(title){font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.05em}ui-toast-manager{--toast-gap:12px;--toast-offset:32px;--toast-width:320px;--toast-radius:12px;--toast-font-family:var(--font-sans);--toast-shadow:0 12px 32px #0009;--toast-z-index:9999;--toast-info-bg:var(--color-surface-solid);--toast-info-color:var(--color-text-main);--toast-info-border:var(--color-accent-primary);--toast-success-bg:var(--color-surface-solid);--toast-success-color:var(--color-text-main);--toast-success-border:var(--color-accent-success);--toast-error-bg:var(--color-surface-solid);--toast-error-color:var(--color-text-main);--toast-error-border:var(--color-accent-danger);--toast-progress-bg:var(--color-border-ui)}ui-toast-manager::part(toast-root){border:1px solid var(--color-border-ui);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-left-width:4px}ui-number-scrubber::part(wrapper){background-color:#0a0c1099;border-radius:6px;box-shadow:inset 0 2px 6px #0006,0 1px #ffffff0d}ui-number-scrubber::part(label){color:var(--color-text-muted);background:#ffffff05;border-right:none;font-weight:700;box-shadow:inset -1px 0 #ffffff0d}ui-number-scrubber:hover::part(label){color:var(--color-text-main);text-shadow:0 0 8px #ffffff4d}ui-number-scrubber:focus-within::part(wrapper){border-color:var(--color-accent-primary);box-shadow:inset 0 2px 6px #0006, 0 0 0 1px var(--color-accent-primary), 0 0 12px #6366f133}.inspector-header{margin-bottom:calc(var(--spacing) * 3);justify-content:space-between;align-items:center;display:flex}.inspector-title-group{align-items:center;gap:calc(var(--spacing) * 2);display:flex}.inspector-title{font-family:var(--font-mono);--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest);color:var(--color-text-muted);text-transform:uppercase;font-size:10px}.inspector-badge{background-color:#0003;border-radius:.25rem}@supports (color:color-mix(in lab, red, red)){.inspector-badge{background-color:color-mix(in oklab, var(--color-black) 20%, transparent)}}.inspector-badge{padding-inline:calc(var(--spacing) * 1.5);padding-block:calc(var(--spacing) * .5);font-family:var(--font-mono);color:#94a3b880;font-size:9px}@supports (color:color-mix(in lab, red, red)){.inspector-badge{color:color-mix(in oklab, var(--color-text-muted) 50%, transparent)}}.inspector-badge{text-transform:uppercase}.blueprint-box{margin-bottom:calc(var(--spacing) * 6);height:calc(var(--spacing) * 45);border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);background-color:#0a0c10;justify-content:center;align-items:center;width:100%;display:flex;position:relative;overflow:hidden}.blueprint-grid{pointer-events:none;inset:calc(var(--spacing) * 0);background-image:radial-gradient(#ffffff0d 1px,#0000 0);background-size:16px 16px;position:absolute}.blueprint-paper{border-radius:var(--radius-xs);background-color:var(--color-white);--tw-shadow:0 8px 32px var(--tw-shadow-color,#00000080);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));--tw-duration:.4s;transition-duration:.4s;transition-timing-function:var(--ease-spring)}.dimension-line{background-color:var(--color-accent-primary);opacity:.6;position:absolute}.element-card{margin-bottom:calc(var(--spacing) * 2);border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-border-ui);background-color:var(--color-surface-solid);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));--tw-duration:.4s;transition-duration:.4s;transition-timing-function:var(--ease-spring);overflow:hidden}.element-card.selected{z-index:10;border-color:var(--color-accent-primary);--tw-shadow:0 0 12px var(--tw-shadow-color,#6366f166);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.card-header{cursor:pointer;align-items:center;gap:calc(var(--spacing) * 2.5);padding:calc(var(--spacing) * 3);-webkit-user-select:none;user-select:none;display:flex}@media (hover:hover){.card-header:hover{background-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.card-header:hover{background-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}}.card-content{border-top-style:var(--tw-border-style);border-top-width:1px;border-color:var(--color-border-ui);padding-inline:calc(var(--spacing) * 3);padding-top:calc(var(--spacing) * 1);padding-bottom:calc(var(--spacing) * 4);animation:slideDown .3s var(--ease-spring);display:none}.element-card.selected .card-content{display:block}.type-tag{background-color:#6366f11a;border-radius:.25rem}@supports (color:color-mix(in lab, red, red)){.type-tag{background-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.type-tag{padding-inline:calc(var(--spacing) * 1.5);padding-block:calc(var(--spacing) * .5);font-family:var(--font-mono);color:var(--color-accent-primary);text-transform:uppercase;font-size:8px}.layer-name{text-overflow:ellipsis;white-space:nowrap;font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);flex:1;overflow:hidden}.row-ui{margin-bottom:calc(var(--spacing) * 2);gap:calc(var(--spacing) * 2.5);display:flex}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.studio-container{margin:calc(var(--spacing) * -6);background-color:var(--color-canvas);flex-direction:column;height:100%;display:flex;overflow:hidden}.studio-main{flex:1;display:flex;overflow:hidden}.studio-sidebar{width:calc(var(--spacing) * 96);gap:calc(var(--spacing) * 8);border-right-style:var(--tw-border-style);border-right-width:1px;border-color:var(--color-border-ui);background-color:#16192080;flex-direction:column;display:flex;overflow-y:auto}@supports (color:color-mix(in lab, red, red)){.studio-sidebar{background-color:color-mix(in oklab, var(--color-surface-solid) 50%, transparent)}}.studio-sidebar{padding:calc(var(--spacing) * 8)}.studio-preview{background-color:var(--color-canvas);padding:calc(var(--spacing) * 8);background-image:radial-gradient(var(--color-border-ui) 1px, transparent 0);background-size:20px 24px;flex:1;position:relative;overflow:hidden}.studio-footer{z-index:10;height:calc(var(--spacing) * 20);border-top-style:var(--tw-border-style);border-top-width:1px;border-color:var(--color-border-ui);background-color:var(--color-surface-solid);padding-inline:calc(var(--spacing) * 10);justify-content:space-between;align-items:center;display:flex}.preview-grid{gap:calc(var(--spacing) * 8);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));width:100%;display:grid}.preview-card{align-items:center;gap:calc(var(--spacing) * 3);animation:popIn .4s var(--ease-spring) both;flex-direction:column;display:flex}.label-thumbnail{border-radius:var(--radius-xs);background-color:var(--color-white);--tw-shadow:0 15px 35px var(--tw-shadow-color,#0009);width:100%;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);position:relative;overflow:hidden}.a4-viewport{border-radius:var(--radius-3xl);border-style:var(--tw-border-style);border-width:1px;border-color:#262a3333;justify-content:center;align-items:flex-start;width:100%;height:100%;display:flex;position:relative;overflow:auto}@supports (color:color-mix(in lab, red, red)){.a4-viewport{border-color:color-mix(in oklab, var(--color-border-ui) 20%, transparent)}}.a4-viewport{background-color:#0f111566}@supports (color:color-mix(in lab, red, red)){.a4-viewport{background-color:color-mix(in oklab, var(--color-canvas) 40%, transparent)}}.a4-viewport{padding-inline:calc(var(--spacing) * 6);padding-block:calc(var(--spacing) * 12)}.a4-sheet{width:210mm;height:297mm;padding:var(--a4-margin,10mm);grid-template-columns:repeat(var(--a4-cols,2), 1fr);grid-gap:var(--a4-gap,5mm);transform-origin:top;transition:all .4s var(--ease-spring);background:#fff;flex-shrink:0;align-content:start;display:grid;box-shadow:0 40px 100px #0009}.drop-zone{height:calc(var(--spacing) * 44);cursor:pointer;justify-content:center;align-items:center;gap:calc(var(--spacing) * 3);border-radius:var(--radius-2xl);border-style:var(--tw-border-style);--tw-border-style:dashed;border-style:dashed;border-width:2px;border-color:var(--color-border-ui);background-color:#0000001a;flex-direction:column;width:100%;display:flex;position:relative;overflow:hidden}@supports (color:color-mix(in lab, red, red)){.drop-zone{background-color:color-mix(in oklab, var(--color-black) 10%, transparent)}}.drop-zone{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.drop-zone:hover{border-color:#6366f180}@supports (color:color-mix(in lab, red, red)){.drop-zone:hover{border-color:color-mix(in oklab, var(--color-accent-primary) 50%, transparent)}}.drop-zone:hover{background-color:#6366f10d}@supports (color:color-mix(in lab, red, red)){.drop-zone:hover{background-color:color-mix(in oklab, var(--color-accent-primary) 5%, transparent)}}.drop-zone.active{border-color:var(--color-accent-primary);background-color:#6366f11a;scale:1.01}@supports (color:color-mix(in lab, red, red)){.drop-zone.active{background-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.drop-zone.active{box-shadow:var(--shadow-neon-primary)}.drop-zone.has-file{--tw-border-style:solid;border-style:solid;border-color:#10b98166}@supports (color:color-mix(in lab, red, red)){.drop-zone.has-file{border-color:color-mix(in oklab, var(--color-accent-success) 40%, transparent)}}.drop-zone.has-file{background-color:#10b9810d}@supports (color:color-mix(in lab, red, red)){.drop-zone.has-file{background-color:color-mix(in oklab, var(--color-accent-success) 5%, transparent)}}.drop-zone ui-icon{--icon-size:32px;color:var(--color-text-muted);transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));--tw-duration:.3s;transition-duration:.3s}.drop-zone:hover ui-icon{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x) var(--tw-scale-y);color:var(--color-accent-primary)}.drop-zone.has-file ui-icon{color:var(--color-accent-success)}.variable-badge{border-style:var(--tw-border-style);border-width:1px;border-color:#6366f133;border-radius:.25rem;align-items:center;display:inline-flex}@supports (color:color-mix(in lab, red, red)){.variable-badge{border-color:color-mix(in oklab, var(--color-accent-primary) 20%, transparent)}}.variable-badge{background-color:#6366f11a}@supports (color:color-mix(in lab, red, red)){.variable-badge{background-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.variable-badge{padding-inline:calc(var(--spacing) * 2);padding-block:calc(var(--spacing) * 1);font-family:var(--font-mono);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);color:var(--color-accent-primary);text-transform:uppercase;font-size:10px}.variable-badge.missing{border-color:#f43f5e33}@supports (color:color-mix(in lab, red, red)){.variable-badge.missing{border-color:color-mix(in oklab, var(--color-accent-danger) 20%, transparent)}}.variable-badge.missing{background-color:#f43f5e1a}@supports (color:color-mix(in lab, red, red)){.variable-badge.missing{background-color:color-mix(in oklab, var(--color-accent-danger) 10%, transparent)}}.variable-badge.missing{color:var(--color-accent-danger)}.data-mini-table{margin-top:calc(var(--spacing) * 4);border-collapse:collapse;width:100%;font-family:var(--font-mono);font-size:11px}.data-mini-table th{border-bottom-style:var(--tw-border-style);border-bottom-width:1px;border-color:var(--color-border-ui);padding-bottom:calc(var(--spacing) * 2);text-align:left;color:var(--color-text-muted)}.data-mini-table td{text-overflow:ellipsis;white-space:nowrap;border-bottom-style:var(--tw-border-style);border-color:#262a334d;border-bottom-width:1px;max-width:100px;overflow:hidden}@supports (color:color-mix(in lab, red, red)){.data-mini-table td{border-color:color-mix(in oklab, var(--color-border-ui) 30%, transparent)}}.data-mini-table td{padding-block:calc(var(--spacing) * 2)}@keyframes popIn{0%{opacity:0;transform:scale(.9)translateY(10px)}to{opacity:1;transform:scale(1)translateY(0)}}.tooltip-rich-panel{padding:calc(var(--spacing) * 1);flex-direction:column;display:flex}.tooltip-rich-header{margin-bottom:calc(var(--spacing) * 1);align-items:center;gap:calc(var(--spacing) * 1.5);border-bottom-style:var(--tw-border-style);border-color:#ffffff1a;border-bottom-width:1px;display:flex}@supports (color:color-mix(in lab, red, red)){.tooltip-rich-header{border-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.tooltip-rich-header{padding-bottom:calc(var(--spacing) * 1.5);font-family:var(--font-mono);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);color:var(--color-text-muted);text-transform:uppercase;font-size:10px}.kbd-prism,kbd.kbd-prism{font-family:var(--font-mono);--tw-font-weight:var(--font-weight-bold);font-size:9px;font-weight:var(--font-weight-bold);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);color:var(--color-text-muted);text-transform:uppercase;-webkit-user-select:none;user-select:none;background-color:var(--color-canvas);border:1px solid var(--color-border-ui);box-shadow:inset 0 1px 0 #ffffff1a, 0 2px 0 var(--color-border-ui), 0 3px 2px #0006;border-radius:4px;justify-content:center;align-items:center;padding:2px 6px;display:inline-flex;transform:translateY(-1px)}.kbd-prism:active{box-shadow:inset 0 1px 0 #ffffff0d, 0 0 0 var(--color-border-ui);transform:translateY(1px)}input[type=color].input-prism{cursor:pointer;height:32px;padding:3px}input[type=color].input-prism::-webkit-color-swatch-wrapper{padding:0}input[type=color].input-prism::-webkit-color-swatch{transition:all .2s var(--ease-spring);border:1px solid #ffffff26;border-radius:4px;box-shadow:inset 0 2px 4px #0006}input[type=color].input-prism::-moz-color-swatch{border:1px solid #ffffff26;border-radius:4px}input[type=color].input-prism:hover::-webkit-color-swatch{border-color:#fff6;transform:scale(.96)}input[type=color].input-prism:focus,input[type=color].input-prism:active{border-color:var(--color-accent-primary);box-shadow:0 0 12px #6366f14d}input[type=checkbox]{appearance:none;cursor:pointer;background:#050505;border-radius:20px;width:36px;height:20px;transition:background .3s;position:relative;box-shadow:inset 0 2px 4px #000c,0 1px #ffffff0d}input[type=checkbox]:before{content:"";width:16px;height:16px;transition:all .4s var(--ease-spring);background:#3f3f46;border-radius:50%;position:absolute;top:2px;left:2px;box-shadow:0 2px 4px #0006}input[type=checkbox]:checked{background:var(--color-accent-primary);box-shadow:inset 0 2px 4px #0000004d,0 0 12px #6366f166}input[type=checkbox]:checked:before{background:#fff;left:calc(100% - 18px)}}@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:calc(var(--spacing) * 0)}.end{inset-inline-end:var(--spacing)}.top-0{top:calc(var(--spacing) * 0)}.top-1\\/2{top:50%}.top-2{top:calc(var(--spacing) * 2)}.top-2\\.5{top:calc(var(--spacing) * 2.5)}.top-6{top:calc(var(--spacing) * 6)}.right-0{right:calc(var(--spacing) * 0)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-6{right:calc(var(--spacing) * 6)}.right-10{right:calc(var(--spacing) * 10)}.bottom-0{bottom:calc(var(--spacing) * 0)}.bottom-6{bottom:calc(var(--spacing) * 6)}.bottom-8{bottom:calc(var(--spacing) * 8)}.left-0{left:calc(var(--spacing) * 0)}.left-1\\/2{left:50%}.left-3{left:calc(var(--spacing) * 3)}.left-6{left:calc(var(--spacing) * 6)}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[200\\]{z-index:200}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.-m-6{margin:calc(var(--spacing) * -6)}.mx-1{margin-inline:calc(var(--spacing) * 1)}.mx-2{margin-inline:calc(var(--spacing) * 2)}.mx-auto{margin-inline:auto}.-mt-32{margin-top:calc(var(--spacing) * -32)}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:calc(var(--spacing) * 1)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-2\\.5{margin-top:calc(var(--spacing) * 2.5)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-auto{margin-top:auto}.-mr-32{margin-right:calc(var(--spacing) * -32)}.mb-1{margin-bottom:calc(var(--spacing) * 1)}.mb-1\\.5{margin-bottom:calc(var(--spacing) * 1.5)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-2\\.5{margin-bottom:calc(var(--spacing) * 2.5)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-6{margin-bottom:calc(var(--spacing) * 6)}.mb-8{margin-bottom:calc(var(--spacing) * 8)}.mb-10{margin-bottom:calc(var(--spacing) * 10)}.mb-16{margin-bottom:calc(var(--spacing) * 16)}.ml-1\\.5{margin-left:calc(var(--spacing) * 1.5)}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.table{display:table}.aspect-video{aspect-ratio:var(--aspect-video)}.h-1{height:calc(var(--spacing) * 1)}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-6{height:calc(var(--spacing) * 6)}.h-8{height:calc(var(--spacing) * 8)}.h-10{height:calc(var(--spacing) * 10)}.h-12{height:calc(var(--spacing) * 12)}.h-14{height:calc(var(--spacing) * 14)}.h-16{height:calc(var(--spacing) * 16)}.h-20{height:calc(var(--spacing) * 20)}.h-40{height:calc(var(--spacing) * 40)}.h-44{height:calc(var(--spacing) * 44)}.h-48{height:calc(var(--spacing) * 48)}.h-64{height:calc(var(--spacing) * 64)}.h-\\[60vh\\]{height:60vh}.h-\\[90vh\\]{height:90vh}.h-\\[500px\\]{height:500px}.h-dvh{height:100dvh}.h-full{height:100%}.min-h-65{min-height:calc(var(--spacing) * 65)}.min-h-\\[220px\\]{min-height:220px}.w-1\\.5{width:calc(var(--spacing) * 1.5)}.w-1\\/3{width:33.3333%}.w-2\\/3{width:66.6667%}.w-3{width:calc(var(--spacing) * 3)}.w-3\\.5{width:calc(var(--spacing) * 3.5)}.w-4{width:calc(var(--spacing) * 4)}.w-6{width:calc(var(--spacing) * 6)}.w-8{width:calc(var(--spacing) * 8)}.w-10{width:calc(var(--spacing) * 10)}.w-12{width:calc(var(--spacing) * 12)}.w-14{width:calc(var(--spacing) * 14)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-24{width:calc(var(--spacing) * 24)}.w-32\\.5{width:calc(var(--spacing) * 32.5)}.w-60{width:calc(var(--spacing) * 60)}.w-64{width:calc(var(--spacing) * 64)}.w-\\[75\\%\\]{width:75%}.w-\\[90vw\\]{width:90vw}.w-\\[340px\\]{width:340px}.w-\\[800px\\]{width:800px}.w-full{width:100%}.w-px{width:1px}.max-w-2xl{max-width:var(--container-2xl)}.max-w-4xl{max-width:var(--container-4xl)}.max-w-45{max-width:calc(var(--spacing) * 45)}.max-w-\\[80\\%\\]{max-width:80%}.max-w-md{max-width:var(--container-md)}.max-w-sm{max-width:var(--container-sm)}.min-w-15{min-width:calc(var(--spacing) * 15)}.flex-1{flex:1}.flex-shrink,.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.origin-center{transform-origin:50%}.-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-4{--tw-translate-y:calc(var(--spacing) * 4);translate:var(--tw-translate-x) var(--tw-translate-y)}.scale-\\[1\\.02\\]{scale:1.02}.rotate-90{rotate:90deg}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.resize{resize:both}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-\\[auto_1fr\\]{grid-template-columns:auto 1fr}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-1{gap:calc(var(--spacing) * 1)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-3\\.5{gap:calc(var(--spacing) * 3.5)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-5{gap:calc(var(--spacing) * 5)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-8{gap:calc(var(--spacing) * 8)}.gap-10{gap:calc(var(--spacing) * 10)}.gap-16{gap:calc(var(--spacing) * 16)}.gap-x-3{column-gap:calc(var(--spacing) * 3)}.gap-y-1\\.5{row-gap:calc(var(--spacing) * 1.5)}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-4xl{border-radius:var(--radius-4xl)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-b-2{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-accent-danger{border-color:var(--color-accent-danger)}.border-accent-primary{border-color:var(--color-accent-primary)}.border-accent-primary\\/10{border-color:#6366f11a}@supports (color:color-mix(in lab, red, red)){.border-accent-primary\\/10{border-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.border-accent-primary\\/20{border-color:#6366f133}@supports (color:color-mix(in lab, red, red)){.border-accent-primary\\/20{border-color:color-mix(in oklab, var(--color-accent-primary) 20%, transparent)}}.border-accent-primary\\/30{border-color:#6366f14d}@supports (color:color-mix(in lab, red, red)){.border-accent-primary\\/30{border-color:color-mix(in oklab, var(--color-accent-primary) 30%, transparent)}}.border-accent-primary\\/50{border-color:#6366f180}@supports (color:color-mix(in lab, red, red)){.border-accent-primary\\/50{border-color:color-mix(in oklab, var(--color-accent-primary) 50%, transparent)}}.border-accent-success{border-color:var(--color-accent-success)}.border-accent-success\\/20{border-color:#10b98133}@supports (color:color-mix(in lab, red, red)){.border-accent-success\\/20{border-color:color-mix(in oklab, var(--color-accent-success) 20%, transparent)}}.border-accent-warning{border-color:var(--color-accent-warning)}.border-accent-warning\\/20{border-color:#f59e0b33}@supports (color:color-mix(in lab, red, red)){.border-accent-warning\\/20{border-color:color-mix(in oklab, var(--color-accent-warning) 20%, transparent)}}.border-border-ui{border-color:var(--color-border-ui)}.border-border-ui\\/30{border-color:#262a334d}@supports (color:color-mix(in lab, red, red)){.border-border-ui\\/30{border-color:color-mix(in oklab, var(--color-border-ui) 30%, transparent)}}.border-border-ui\\/50{border-color:#262a3380}@supports (color:color-mix(in lab, red, red)){.border-border-ui\\/50{border-color:color-mix(in oklab, var(--color-border-ui) 50%, transparent)}}.border-transparent{border-color:#0000}.border-white\\/5{border-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.border-white\\/5{border-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.border-white\\/10{border-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.border-white\\/10{border-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.border-white\\/20{border-color:#fff3}@supports (color:color-mix(in lab, red, red)){.border-white\\/20{border-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.bg-\\[\\#0a0c10\\]{background-color:#0a0c10}.bg-\\[\\#050608\\]{background-color:#050608}.bg-accent-danger\\/10{background-color:#f43f5e1a}@supports (color:color-mix(in lab, red, red)){.bg-accent-danger\\/10{background-color:color-mix(in oklab, var(--color-accent-danger) 10%, transparent)}}.bg-accent-danger\\/20{background-color:#f43f5e33}@supports (color:color-mix(in lab, red, red)){.bg-accent-danger\\/20{background-color:color-mix(in oklab, var(--color-accent-danger) 20%, transparent)}}.bg-accent-primary\\/5{background-color:#6366f10d}@supports (color:color-mix(in lab, red, red)){.bg-accent-primary\\/5{background-color:color-mix(in oklab, var(--color-accent-primary) 5%, transparent)}}.bg-accent-primary\\/10{background-color:#6366f11a}@supports (color:color-mix(in lab, red, red)){.bg-accent-primary\\/10{background-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.bg-accent-success{background-color:var(--color-accent-success)}.bg-accent-success\\/10{background-color:#10b9811a}@supports (color:color-mix(in lab, red, red)){.bg-accent-success\\/10{background-color:color-mix(in oklab, var(--color-accent-success) 10%, transparent)}}.bg-accent-warning\\/10{background-color:#f59e0b1a}@supports (color:color-mix(in lab, red, red)){.bg-accent-warning\\/10{background-color:color-mix(in oklab, var(--color-accent-warning) 10%, transparent)}}.bg-black{background-color:var(--color-black)}.bg-black\\/10{background-color:#0000001a}@supports (color:color-mix(in lab, red, red)){.bg-black\\/10{background-color:color-mix(in oklab, var(--color-black) 10%, transparent)}}.bg-black\\/20{background-color:#0003}@supports (color:color-mix(in lab, red, red)){.bg-black\\/20{background-color:color-mix(in oklab, var(--color-black) 20%, transparent)}}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab, red, red)){.bg-black\\/30{background-color:color-mix(in oklab, var(--color-black) 30%, transparent)}}.bg-black\\/40{background-color:#0006}@supports (color:color-mix(in lab, red, red)){.bg-black\\/40{background-color:color-mix(in oklab, var(--color-black) 40%, transparent)}}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab, red, red)){.bg-black\\/50{background-color:color-mix(in oklab, var(--color-black) 50%, transparent)}}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab, red, red)){.bg-black\\/60{background-color:color-mix(in oklab, var(--color-black) 60%, transparent)}}.bg-black\\/70{background-color:#000000b3}@supports (color:color-mix(in lab, red, red)){.bg-black\\/70{background-color:color-mix(in oklab, var(--color-black) 70%, transparent)}}.bg-border-ui{background-color:var(--color-border-ui)}.bg-canvas{background-color:var(--color-canvas)}.bg-surface-solid{background-color:var(--color-surface-solid)}.bg-surface-solid\\/40{background-color:#16192066}@supports (color:color-mix(in lab, red, red)){.bg-surface-solid\\/40{background-color:color-mix(in oklab, var(--color-surface-solid) 40%, transparent)}}.bg-surface-solid\\/50{background-color:#16192080}@supports (color:color-mix(in lab, red, red)){.bg-surface-solid\\/50{background-color:color-mix(in oklab, var(--color-surface-solid) 50%, transparent)}}.bg-surface-solid\\/80{background-color:#161920cc}@supports (color:color-mix(in lab, red, red)){.bg-surface-solid\\/80{background-color:color-mix(in oklab, var(--color-surface-solid) 80%, transparent)}}.bg-surface-solid\\/90{background-color:#161920e6}@supports (color:color-mix(in lab, red, red)){.bg-surface-solid\\/90{background-color:color-mix(in oklab, var(--color-surface-solid) 90%, transparent)}}.bg-surface\\/80{background-color:#161920ae}@supports (color:color-mix(in lab, red, red)){.bg-surface\\/80{background-color:color-mix(in oklab, var(--color-surface) 80%, transparent)}}.bg-white{background-color:var(--color-white)}.bg-white\\/5{background-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.bg-white\\/5{background-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.bg-white\\/10{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.bg-white\\/10{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.bg-linear-to-r{--tw-gradient-position:to right}@supports (background-image:linear-gradient(in lab, red, red)){.bg-linear-to-r{--tw-gradient-position:to right in oklab}}.bg-linear-to-r{background-image:linear-gradient(var(--tw-gradient-stops))}.from-transparent{--tw-gradient-from:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.via-accent-primary\\/50{--tw-gradient-via:#6366f180}@supports (color:color-mix(in lab, red, red)){.via-accent-primary\\/50{--tw-gradient-via:color-mix(in oklab, var(--color-accent-primary) 50%, transparent)}}.via-accent-primary\\/50{--tw-gradient-via-stops:var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.fill-accent-primary\\/20{fill:#6366f133}@supports (color:color-mix(in lab, red, red)){.fill-accent-primary\\/20{fill:color-mix(in oklab, var(--color-accent-primary) 20%, transparent)}}.object-contain{object-fit:contain}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.p-10{padding:calc(var(--spacing) * 10)}.px-1{padding-inline:calc(var(--spacing) * 1)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-3\\!{padding-inline:calc(var(--spacing) * 3)!important}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.px-8{padding-inline:calc(var(--spacing) * 8)}.py-0{padding-block:calc(var(--spacing) * 0)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-1\\!{padding-block:calc(var(--spacing) * 1)!important}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-px{padding-block:1px}.pt-0{padding-top:calc(var(--spacing) * 0)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-6{padding-top:calc(var(--spacing) * 6)}.pr-2{padding-right:calc(var(--spacing) * 2)}.pr-4{padding-right:calc(var(--spacing) * 4)}.pr-8{padding-right:calc(var(--spacing) * 8)}.pb-0{padding-bottom:calc(var(--spacing) * 0)}.pb-1\\.5{padding-bottom:calc(var(--spacing) * 1.5)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-3{padding-bottom:calc(var(--spacing) * 3)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pl-9{padding-left:calc(var(--spacing) * 9)}.pl-10{padding-left:calc(var(--spacing) * 10)}.pl-12{padding-left:calc(var(--spacing) * 12)}.text-center{text-align:center}.text-left{text-align:left}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[8px\\]{font-size:8px}.text-\\[9px\\]{font-size:9px}.text-\\[10px\\]{font-size:10px}.text-\\[10px\\]\\!{font-size:10px!important}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.leading-loose{--tw-leading:var(--leading-loose);line-height:var(--leading-loose)}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-\\[0\\.2em\\]{--tw-tracking:.2em;letter-spacing:.2em}.tracking-\\[0\\.3em\\]{--tw-tracking:.3em;letter-spacing:.3em}.tracking-\\[0\\.15em\\]{--tw-tracking:.15em;letter-spacing:.15em}.tracking-\\[0\\.25em\\]{--tw-tracking:.25em;letter-spacing:.25em}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.tracking-widest{--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest)}.text-accent-danger{color:var(--color-accent-danger)}.text-accent-primary{color:var(--color-accent-primary)}.text-accent-success{color:var(--color-accent-success)}.text-accent-success\\/90{color:#10b981e6}@supports (color:color-mix(in lab, red, red)){.text-accent-success\\/90{color:color-mix(in oklab, var(--color-accent-success) 90%, transparent)}}.text-accent-warning{color:var(--color-accent-warning)}.text-text-main{color:var(--color-text-main)}.text-text-muted{color:var(--color-text-muted)}.text-text-muted\\/50{color:#94a3b880}@supports (color:color-mix(in lab, red, red)){.text-text-muted\\/50{color:color-mix(in oklab, var(--color-text-muted) 50%, transparent)}}.text-text-muted\\/60{color:#94a3b899}@supports (color:color-mix(in lab, red, red)){.text-text-muted\\/60{color:color-mix(in oklab, var(--color-text-muted) 60%, transparent)}}.text-white{color:var(--color-white)}.text-white\\/5{color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.text-white\\/5{color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.text-white\\/10{color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.text-white\\/10{color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.capitalize{text-transform:capitalize}.uppercase{text-transform:uppercase}.italic{font-style:italic}.opacity-0{opacity:0}.opacity-10{opacity:.1}.opacity-20{opacity:.2}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-80{opacity:.8}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_0_12px_rgba\\(99\\,102\\,241\\,0\\.4\\)\\]{--tw-shadow:0 0 12px var(--tw-shadow-color,#6366f166);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_0_15px_rgba\\(0\\,0\\,0\\,0\\.8\\)\\]{--tw-shadow:0 0 15px var(--tw-shadow-color,#000c);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_0_15px_rgba\\(99\\,102\\,241\\,0\\.15\\)\\]{--tw-shadow:0 0 15px var(--tw-shadow-color,#6366f126);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_0_20px_rgba\\(99\\,102\\,241\\,0\\.15\\)\\]{--tw-shadow:0 0 20px var(--tw-shadow-color,#6366f126);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_5px_15px_rgba\\(0\\,0\\,0\\,0\\.6\\)\\]{--tw-shadow:0 5px 15px var(--tw-shadow-color,#0009);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_8px_30px_rgba\\(0\\,0\\,0\\,0\\.8\\)\\]{--tw-shadow:0 8px 30px var(--tw-shadow-color,#000c);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_10px_30px_rgba\\(0\\,0\\,0\\,0\\.8\\)\\]{--tw-shadow:0 10px 30px var(--tw-shadow-color,#000c);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[10px_0_30px_rgba\\(0\\,0\\,0\\,0\\.5\\)\\]{--tw-shadow:10px 0 30px var(--tw-shadow-color,#00000080);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[inset_0_0_20px_rgba\\(99\\,102\\,241\\,0\\.05\\)\\]{--tw-shadow:inset 0 0 20px var(--tw-shadow-color,#6366f10d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-neon-primary{--tw-shadow:0 0 12px var(--tw-shadow-color,#6366f166);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-panel{--tw-shadow:0 8px 32px var(--tw-shadow-color,#00000080);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.blur-3xl{--tw-blur:blur(var(--blur-3xl));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.drop-shadow-\\[0_0_8px_rgba\\(99\\,102\\,241\\,0\\.5\\)\\]{--tw-drop-shadow-size:drop-shadow(0 0 8px var(--tw-drop-shadow-color,#6366f180));--tw-drop-shadow:var(--tw-drop-shadow-size);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.drop-shadow-\\[0_0_8px_rgba\\(245\\,158\\,11\\,0\\.6\\)\\]{--tw-drop-shadow-size:drop-shadow(0 0 8px var(--tw-drop-shadow-color,#f59e0b99));--tw-drop-shadow:var(--tw-drop-shadow-size);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-xl{--tw-backdrop-blur:blur(var(--blur-xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.delay-75{transition-delay:75ms}.delay-100{transition-delay:.1s}.duration-\\(--ease-spring\\){--tw-duration:var(--ease-spring);transition-duration:var(--ease-spring)}.duration-200{--tw-duration:.2s;transition-duration:.2s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-500{--tw-duration:.5s;transition-duration:.5s}.ease-\\[var\\(--ease-spring\\)\\]{--tw-ease:var(--ease-spring);transition-timing-function:var(--ease-spring)}.ease-in{--tw-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.ease-spring{--tw-ease:var(--ease-spring);transition-timing-function:var(--ease-spring)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.group-open\\:rotate-180:is(:where(.group):is([open],:popover-open,:open) *){rotate:180deg}.group-open\\:border-white\\/5:is(:where(.group):is([open],:popover-open,:open) *){border-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.group-open\\:border-white\\/5:is(:where(.group):is([open],:popover-open,:open) *){border-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.group-open\\:bg-black\\/10:is(:where(.group):is([open],:popover-open,:open) *){background-color:#0000001a}@supports (color:color-mix(in lab, red, red)){.group-open\\:bg-black\\/10:is(:where(.group):is([open],:popover-open,:open) *){background-color:color-mix(in oklab, var(--color-black) 10%, transparent)}}@media (hover:hover){.group-hover\\:translate-y-0:is(:where(.group):hover *){--tw-translate-y:calc(var(--spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.group-hover\\:scale-110:is(:where(.group):hover *){--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x) var(--tw-scale-y)}.group-hover\\:scale-\\[1\\.03\\]:is(:where(.group):hover *){scale:1.03}.group-hover\\:animate-ping:is(:where(.group):hover *){animation:var(--animate-ping)}.group-hover\\:border-accent-primary\\/30:is(:where(.group):hover *){border-color:#6366f14d}@supports (color:color-mix(in lab, red, red)){.group-hover\\:border-accent-primary\\/30:is(:where(.group):hover *){border-color:color-mix(in oklab, var(--color-accent-primary) 30%, transparent)}}.group-hover\\:text-accent-primary:is(:where(.group):hover *){color:var(--color-accent-primary)}.group-hover\\:text-accent-primary\\/40:is(:where(.group):hover *){color:#6366f166}@supports (color:color-mix(in lab, red, red)){.group-hover\\:text-accent-primary\\/40:is(:where(.group):hover *){color:color-mix(in oklab, var(--color-accent-primary) 40%, transparent)}}.group-hover\\:text-accent-primary\\/50:is(:where(.group):hover *){color:#6366f180}@supports (color:color-mix(in lab, red, red)){.group-hover\\:text-accent-primary\\/50:is(:where(.group):hover *){color:color-mix(in oklab, var(--color-accent-primary) 50%, transparent)}}.group-hover\\:text-text-main:is(:where(.group):hover *){color:var(--color-text-main)}.group-hover\\:text-white:is(:where(.group):hover *){color:var(--color-white)}.group-hover\\:opacity-100:is(:where(.group):hover *){opacity:1}.group-hover\\:shadow-\\[0_0_20px_rgba\\(99\\,102\\,241\\,0\\.3\\)\\]:is(:where(.group):hover *){--tw-shadow:0 0 20px var(--tw-shadow-color,#6366f14d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.group-hover\\:blur-sm:is(:where(.group):hover *){--tw-blur:blur(var(--blur-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}}.placeholder\\:text-text-muted::placeholder{color:var(--color-text-muted)}@media (hover:hover){.hover\\:translate-x-1:hover{--tw-translate-x:calc(var(--spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.hover\\:-translate-y-1:hover{--tw-translate-y:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.hover\\:-translate-y-1\\.5:hover{--tw-translate-y:calc(var(--spacing) * -1.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.hover\\:-translate-y-2:hover{--tw-translate-y:calc(var(--spacing) * -2);translate:var(--tw-translate-x) var(--tw-translate-y)}.hover\\:border-accent-danger\\/50:hover{border-color:#f43f5e80}@supports (color:color-mix(in lab, red, red)){.hover\\:border-accent-danger\\/50:hover{border-color:color-mix(in oklab, var(--color-accent-danger) 50%, transparent)}}.hover\\:border-accent-primary:hover{border-color:var(--color-accent-primary)}.hover\\:border-accent-primary\\/40:hover{border-color:#6366f166}@supports (color:color-mix(in lab, red, red)){.hover\\:border-accent-primary\\/40:hover{border-color:color-mix(in oklab, var(--color-accent-primary) 40%, transparent)}}.hover\\:border-accent-primary\\/50:hover{border-color:#6366f180}@supports (color:color-mix(in lab, red, red)){.hover\\:border-accent-primary\\/50:hover{border-color:color-mix(in oklab, var(--color-accent-primary) 50%, transparent)}}.hover\\:border-white\\/20:hover{border-color:#fff3}@supports (color:color-mix(in lab, red, red)){.hover\\:border-white\\/20:hover{border-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.hover\\:border-white\\/30:hover{border-color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.hover\\:border-white\\/30:hover{border-color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.hover\\:bg-accent-danger:hover{background-color:var(--color-accent-danger)}.hover\\:bg-accent-danger\\/10:hover{background-color:#f43f5e1a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent-danger\\/10:hover{background-color:color-mix(in oklab, var(--color-accent-danger) 10%, transparent)}}.hover\\:bg-accent-danger\\/20:hover{background-color:#f43f5e33}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent-danger\\/20:hover{background-color:color-mix(in oklab, var(--color-accent-danger) 20%, transparent)}}.hover\\:bg-accent-primary\\/5:hover{background-color:#6366f10d}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent-primary\\/5:hover{background-color:color-mix(in oklab, var(--color-accent-primary) 5%, transparent)}}.hover\\:bg-accent-primary\\/10:hover{background-color:#6366f11a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent-primary\\/10:hover{background-color:color-mix(in oklab, var(--color-accent-primary) 10%, transparent)}}.hover\\:bg-accent-primary\\/20:hover{background-color:#6366f133}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent-primary\\/20:hover{background-color:color-mix(in oklab, var(--color-accent-primary) 20%, transparent)}}.hover\\:bg-accent-success:hover{background-color:var(--color-accent-success)}.hover\\:bg-white\\/5:hover{background-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/5:hover{background-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.hover\\:bg-white\\/10:hover{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/10:hover{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.hover\\:bg-white\\/20:hover{background-color:#fff3}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/20:hover{background-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.hover\\:text-accent-danger:hover{color:var(--color-accent-danger)}.hover\\:text-accent-primary:hover{color:var(--color-accent-primary)}.hover\\:text-black:hover{color:var(--color-black)}.hover\\:text-text-main:hover{color:var(--color-text-main)}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:shadow-\\[0_0_15px_rgba\\(244\\,63\\,94\\,0\\.3\\)\\]:hover{--tw-shadow:0 0 15px var(--tw-shadow-color,#f43f5e4d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.hover\\:shadow-\\[0_0_20px_rgba\\(16\\,185\\,129\\,0\\.4\\)\\]:hover{--tw-shadow:0 0 20px var(--tw-shadow-color,#10b98166);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.hover\\:shadow-\\[0_20px_40px_rgba\\(0\\,0\\,0\\,0\\.6\\)\\,0_0_15px_rgba\\(99\\,102\\,241\\,0\\.2\\)\\]:hover{--tw-shadow:0 20px 40px var(--tw-shadow-color,#0009), 0 0 15px var(--tw-shadow-color,#6366f133);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.hover\\:shadow-\\[inset_0_0_30px_rgba\\(99\\,102\\,241\\,0\\.05\\)\\]:hover{--tw-shadow:inset 0 0 30px var(--tw-shadow-color,#6366f10d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}}.focus\\:border-accent-primary:focus{border-color:var(--color-accent-primary)}.focus\\:shadow-\\[0_0_12px_rgba\\(99\\,102\\,241\\,0\\.2\\)\\]:focus{--tw-shadow:0 0 12px var(--tw-shadow-color,#6366f133);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (width>=40rem){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (width>=48rem){.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:flex-row-reverse{flex-direction:row-reverse}.md\\:p-10{padding:calc(var(--spacing) * 10)}}@media (width>=64rem){.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (width>=80rem){.xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}.\\[\\&_summary\\:\\:-webkit-details-marker\\]\\:hidden summary::-webkit-details-marker{display:none}}@media print{body{background:#fff!important}.panel-glass,.toolbar-pill,ui-toast-manager,ui-modal{display:none!important}.layout-container,.canvas-workspace{box-shadow:none!important;background:0 0!important;padding:0!important;display:block!important;position:static!important}.label-artboard{page-break-after:always;break-after:page;box-shadow:none!important;border:none!important;margin:0!important;transform:none!important}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes pulse{50%{opacity:.5}}`,de=new CSSStyleSheet;de.replaceSync(ue);var W=de,fe=class extends HTMLElement{workspace;artboard;canvas;ctx;selectionOutlineBorderWidth=1.5;unsubscribe=null;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W]),this.workspace=document.createElement(`div`),this.artboard=document.createElement(`div`),this.canvas=document.createElement(`canvas`),this.ctx=this.canvas.getContext(`2d`,{willReadFrequently:!0})}connectedCallback(){this.render(),this.setupListeners(),this.redraw()}disconnectedCallback(){this.unsubscribe&&this.unsubscribe()}render(){if(!this.shadowRoot||this.shadowRoot.querySelector(`.canvas-workspace`))return;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: var(--color-canvas);
        }

        /* Container principal que permite o scroll */
        .canvas-workspace {
          display: flex;
          min-width: 100%;
          min-height: 100%;
          padding: 150px; /* Respiro fixo (Task 66) */
          box-sizing: border-box;
        }

        /* Camada de centralização que cresce com o conteúdo */
        .artboard-scaler {
          display: block;
          margin: auto; /* Truque mestre para centralizar com scroll funcional */
          position: relative;
        }

        .label-artboard {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s var(--ease-spring);
          background-color: white;
          flex: none;
        }
      </style>
    `,this.workspace.className=`canvas-workspace`;let e=document.createElement(`div`);e.className=`artboard-scaler`,e.id=`scaler`,this.artboard.className=`label-artboard`,this.artboard.appendChild(this.canvas),e.appendChild(this.artboard),this.workspace.appendChild(e),this.shadowRoot.appendChild(this.workspace)}setupListeners(){this.unsubscribe=r.on(`state:change`,e=>{this.redraw(e),this.updateWorkspaceVisuals(e)}),r.on(`request:canvas:snapshot`,e=>{e(this.ctx)}),r.on(`command:canvas:restore`,e=>{this.ctx.putImageData(e,0,0)}),this.canvas.addEventListener(`mousedown`,e=>this.handleMouseDown(e))}updateWorkspaceVisuals(e){}redraw(e=b.getState()){let t=e.currentLabel;if(!t)return;let{config:n,elements:r}=t,i=n.previewScale,a=w.mmToPx(1,n.dpi),o=w.mmToPx(t.config.widthMM,n.dpi),s=w.mmToPx(t.config.heightMM,n.dpi);this.artboard.style.width=`${o}px`,this.artboard.style.height=`${s}px`,this.artboard.style.backgroundColor=n.backgroundColor||`#ffffff`,this.artboard.style.transform=`translate(-50%, -50%) scale(${i})`;let c=this.shadowRoot?.getElementById(`scaler`);c&&(c.style.width=`${o*i}px`,c.style.height=`${s*i}px`),this.canvas.width=o,this.canvas.height=s,this.canvas.style.width=`100%`,this.canvas.style.height=`100%`,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=n.backgroundColor||`#ffffff`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),r.filter(e=>e.visible!==!1).sort((e,t)=>e.zIndex-t.zIndex).forEach(t=>{k.render(t,{ctx:this.ctx,scale:a,dpi:n.dpi}),e.selectedElementIds.includes(t.id)&&this.drawSelectionOutline(t,a,n.dpi)}),e.preferences.showGrid&&this.drawGridOverlay(e,a)}drawGridOverlay(e,t){let{gridSizeMM:n,gridColor:r,gridOpacity:i}=e.preferences,{widthMM:a,heightMM:o}=e.currentLabel.config,s=n*t;this.ctx.save(),this.ctx.beginPath(),this.ctx.strokeStyle=r||`rgba(99, 102, 241, 0.15)`,this.ctx.globalAlpha=i??.3,this.ctx.lineWidth=.5;for(let e=0;e<=a*t;e+=s)this.ctx.moveTo(e,0),this.ctx.lineTo(e,o*t);for(let e=0;e<=o*t;e+=s)this.ctx.moveTo(0,e),this.ctx.lineTo(a*t,e);this.ctx.stroke(),this.ctx.restore()}drawSelectionOutline(e,t,n){e.dimensions&&(this.ctx.save(),this.ctx.strokeStyle=`#6366f1`,this.ctx.lineWidth=w.ptToPx(this.selectionOutlineBorderWidth,n)*(t/w.mmToPx(1,n)),this.ctx.setLineDash([5,5]),this.ctx.strokeRect(e.position.x*t,e.position.y*t,e.dimensions.width*t,e.dimensions.height*t),this.ctx.restore())}handleMouseDown(e){let t=this.canvas.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*this.canvas.width,i=(e.clientY-t.top)/t.height*this.canvas.height,a=b.getState();if(!a.currentLabel)return;let o=[...a.currentLabel.elements].sort((e,t)=>t.zIndex-e.zIndex).find(e=>k.hitTest(e,n,i,a.currentLabel.config));o?(r.emit(`element:select`,o.id),c.play(c.enumPresets.SELECT)):r.emit(`element:select`,[])}};customElements.define(`editor-canvas`,fe);var pe=class extends HTMLElement{button;constructor(){super(),this.attachShadow({mode:`open`}),this.button=document.createElement(`button`),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}static get observedAttributes(){return[`variant`,`disabled`]}connectedCallback(){this.setupBaseStyles(),this.render(),this.setupEvents()}attributeChangedCallback(){this.render()}setupBaseStyles(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: inline-block; width: auto; }
        button { width: 100%; outline: none; }
        button:disabled { opacity: 0.4; cursor: not-allowed; filter: grayscale(1); }
      </style>
    `,this.shadowRoot.appendChild(this.button))}setupEvents(){this.button.addEventListener(`click`,()=>{this.hasAttribute(`disabled`)||c.play(c.enumPresets.CLICK)})}render(){let e=this.getAttribute(`variant`)||`secondary`,t=this.hasAttribute(`disabled`);this.button.className=`btn-prism btn-${e}`,this.button.disabled=t,this.button.innerHTML=`<slot></slot>`}};customElements.define(`app-button`,pe);var me={close:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`,plus:`<path fill="currentColor" fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>`,minus:`<path fill="currentColor" fill-rule="evenodd" d="M5.625 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>`,search:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>`,"chevron-right":`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>`,"chevron-left":`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.75 19.5-7.5-7.5 7.5-7.5"/>`,"chevron-down":`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>`,"chevron-up":`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>`,refresh:`<path fill="currentColor" d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"/>`,"arrow-uturn-down":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0 1 12 0v3"/>`,grip:`<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>`,"book-open":`<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>`,rect:`<rect x="3" y="4" width="18" height="16" rx="2" ry="2"/>`,settings:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`,home:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>`,menu:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`,"external-link":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>`,copy:`<path fill="currentColor" d="M19 19H8q-.825 0-1.413-.588T6 17V3q0-.825.588-1.413T8 1h7l6 6v10q0 .825-.588 1.413T19 19ZM14 8V3H8v14h11V8h-5ZM4 23q-.825 0-1.413-.588T2 21V7h2v14h11v2H4ZM8 3v5-5 14V3Z"/>`,database:`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>`,download:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>`,upload:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/>`,edit:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>`,pencil:`<path d="M13 21h8"/><path d="m15 5 4 4"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>`,arrow:`<path d="M13 5H19V11"/><path d="M19 5L5 19"/>`,circle:`<circle cx="12" cy="12" r="10"/>`,"rotate-ccw":`<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>`,undo:`<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>`,redo:`<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>`,trash:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>`,save:`<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g>`,code:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>`,eye:`<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></g>`,"eye-off":`<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>`,shrink:`<path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/><path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/><path d="M15 4.2V9m0 0h4.8M15 9l6-6"/><path d="M9 4.2V9m0 0H4.2M9 9 3 3"/>`,move:`<path d="M12 2v20"/><path d="m15 19-3 3-3-3"/><path d="m19 9 3 3-3 3"/><path d="M2 12h20"/><path d="m5 9-3 3 3 3"/><path d="m9 5 3-3 3 3"/>`,clock:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>`,calendar:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>`,"map-pin":`<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,"upload-cloud":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775a5.25 5.25 0 0 1 10.233-2.33a3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/>`,"download-cloud":`<path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/>`,text:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>`,"clipboard-pen":`<path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>`,"pencil-ruler":`<path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>`,"corner-down-right":`<path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>`,eraser:`<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/>`,brackets:`<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>`,lightbulb:`<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>`,"check-circle":`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`,"info-circle":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>`,"x-circle":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>`,"alert-triangle":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.24 3.957-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.845a1.989 1.989 0 0 0 1.7-2.983L13.64 3.957a1.989 1.989 0 0 0-3.4 0zM12 9v4m0 4h.01"/>`,"alert-circle":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0m9-4v4m0 4h.01"/>`,help:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,tag:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>`,filter:`<path fill="currentColor" d="M11 20q-.425 0-.713-.288T10 19v-6L4.2 5.6q-.375-.5-.113-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20h-2Zm1-7.7L16.95 6h-9.9L12 12.3Zm0 0Z"/>`,lightning:`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,sparkles:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Zm8.446-7.189L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Zm-1.365 11.852L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>`,user:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>`,bell:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>`,"command-line":`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>`,image:`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Z"/>`,blocks:`<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/>`,package:`<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>`,list:`<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>`,camera:`<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>`,printer:`<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>`,cpu:`<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>`,stethoscope:`<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>`,"layout-template":`<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>`,fingerprint:`<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>`,keyboard:`<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>`,grid:`<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>`,"file-json":`<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/>`,calculator:`<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>`,layers:`<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>`,"file-plus":`<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/>`,folder:`<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`},G={xs:`12`,sm:`16`,md:`20`,lg:`24`,xl:`32`,"2xl":`48`};function he(e){return e?G[e]??e:G.md}function ge(e){return e.replace(/<script[\s\S]*?<\/script>/gi,``).replace(/\son\w+\s*=\s*["'][^"']*["']/gi,``)}var _e=Object.freeze(Object.fromEntries(Object.entries(me).map(([e,t])=>[e,ge(t)]))),ve=document.createElement(`template`);ve.innerHTML=`
  <style>
    :host {
      /* Layout */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      /* Tamanho padrão (md) — sobrescrito via atributo ou CSS var */
      width:  var(--icon-size, 20px);
      height: var(--icon-size, 20px);

      /* Cor — herda do contexto por padrão */
      color: var(--icon-color, currentColor);

      /* Evita que o ícone capture eventos de pointer acidentalmente */
      pointer-events: none;
      user-select: none;
    }

    :host([hidden]) {
      display: none;
    }

    /* SVG gerado internamente */
    svg[part="svg"] {
      width: 100%;
      height: 100%;
      display: block;
      color: inherit;
    }

    /* SVG vindo via slot — força mesmas dimensões e cor */
    ::slotted(svg) {
      width: 100% !important;
      height: 100% !important;
      display: block;
      color: inherit;
      stroke: currentColor;
      fill: currentColor;
    }
  </style>

  <!-- Slot: SVG customizado do usuário -->
  <slot></slot>

  <!-- Container do ícone interno (catálogo) -->
  <span id="icon-container" aria-hidden="true"></span>
`;var ye=new Set,be=class extends HTMLElement{#e;#t;#n;#r=null;static observedAttributes=[`name`,`size`,`color`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.appendChild(ve.content.cloneNode(!0)),this.#t=this.#e.getElementById(`icon-container`),this.#n=this.#e.querySelector(`slot`)}connectedCallback(){this.#r=new AbortController;let{signal:e}=this.#r;this.#n.addEventListener(`slotchange`,()=>this.#s(),{signal:e}),this.#a(this.getAttribute(`size`)),this.#o(this.getAttribute(`color`)),this.#i(this.getAttribute(`name`)),this.#s()}disconnectedCallback(){this.#r?.abort()}attributeChangedCallback(e,t,n){if(t!==n)switch(e){case`name`:this.#i(n);break;case`size`:this.#a(n);break;case`color`:this.#o(n);break}}get name(){return this.getAttribute(`name`)}set name(e){e?this.setAttribute(`name`,e):this.removeAttribute(`name`)}get size(){return this.getAttribute(`size`)}set size(e){e?this.setAttribute(`size`,e):this.removeAttribute(`size`)}get color(){return this.getAttribute(`color`)}set color(e){e?this.setAttribute(`color`,e):this.removeAttribute(`color`)}static get catalog(){return Object.keys(me)}#i(e){if(this.#t.innerHTML=``,!e)return;let t=_e[e];if(!t){ye.has(e)||(console.warn(`[ui-icon] Ícone "${e}" não encontrado no catálogo. Use um <svg> via slot para ícones customizados.`),ye.add(e));return}let n=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);n.setAttribute(`part`,`svg`),n.setAttribute(`viewBox`,`0 0 24 24`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`fill`,`none`),n.setAttribute(`stroke`,`currentColor`),n.setAttribute(`aria-hidden`,`true`),n.innerHTML=t,this.#t.appendChild(n)}#a(e){let t=he(e);this.style.setProperty(`--icon-size`,`${t}px`)}#o(e){let t=e||`currentColor`;this.style.setProperty(`--icon-color`,t)}#s(){let e=this.#n.assignedElements({flatten:!0}),t=e.length>0;this.#t.hidden=t,t&&e.forEach(e=>{e.setAttribute(`aria-hidden`,`true`),e.tagName?.toLowerCase()===`svg`&&!e.hasAttribute(`viewBox`)&&console.warn(`[ui-icon] SVG customizado sem atributo viewBox pode não escalar corretamente.`)}),this.dispatchEvent(new CustomEvent(`ui-icon:slotchange`,{detail:{hasSlotContent:t},bubbles:!0,composed:!0}))}};customElements.define(`ui-icon`,be);var xe=[`top`,`bottom`,`left`,`right`],Se=new CSSStyleSheet;Se.replaceSync(`
  :host {
    position: fixed;
    z-index: 10001;
    max-width: 320px;
    padding: 12px;
    border-radius: 8px;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 11px;
    font-weight: 500;
    line-height: 1.5;
    pointer-events: none;
    user-select: none;

    /* Tactile Prism: Glassmorphism */
    background: rgba(22, 25, 32, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-border-ui, #262a33);
    color: var(--color-text-main, #ffffff);
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(99, 102, 241, 0.1);

    /* Física de Mola */
    opacity: 0;
    transform: scale(0.95) translateY(4px);
    transition:
      opacity 150ms ease,
      transform 250ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
    visibility: hidden;
  }

  :host(.is-visible) {
    opacity: 1;
    transform: scale(1) translateY(0px);
    visibility: visible;
  }

  /* Variantes com Glow Neon */
  :host([variant="primary"]) { border-color: var(--color-accent-primary); box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
  :host([variant="success"]) { border-color: var(--color-accent-success); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
  :host([variant="warning"]) { border-color: #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
  :host([variant="error"])   { border-color: var(--color-accent-danger); box-shadow: 0 0 20px rgba(244, 63, 94, 0.2); }

  [part="arrow"] {
    position: absolute;
    width: 8px; height: 8px;
    background: inherit;
    border: inherit;
    border-top: none; border-left: none;
  }

  :host([data-placement="top"])    [part="arrow"] { bottom: -5px; left: var(--arrow-offset, 50%); transform: translateX(-50%) rotate(45deg); }
  :host([data-placement="bottom"]) [part="arrow"] { top: -5px;    left: var(--arrow-offset, 50%); transform: translateX(-50%) rotate(-135deg); }
  :host([data-placement="left"])   [part="arrow"] { right: -5px;  top:  var(--arrow-offset, 50%); transform: translateY(-50%) rotate(-45deg); }
  :host([data-placement="right"])  [part="arrow"] { left: -5px;   top:  var(--arrow-offset, 50%); transform: translateY(-50%) rotate(135deg); }

  [part="content"] {
    display: block;
    padding: 8px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  /* Estilos internos para conteúdo rico */
  [part="content"] .tooltip-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  [part="content"] .tooltip-header ui-icon {
    color: var(--color-accent-primary);
  }

  [part="content"] .tooltip-header span {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  [part="content"] .tooltip-section {
    margin-bottom: 12px;
  }

  [part="content"] .tooltip-section:last-child {
    margin-bottom: 0;
  }

  [part="content"] .section-title {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-accent-primary);
    margin-bottom: 8px;
  }

  [part="content"] .controls-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 12px;
    align-items: center;
  }

  [part="content"] kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 9px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 4px;
    color: var(--color-text-main);
    min-width: 48px;
  }

  [part="content"] .control-desc {
    font-size: 11px;
    color: var(--color-text-muted, #94a3b8);
  }

  [part="content"] .math-note {
    margin-top: 12px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 10px;
    color: var(--color-text-muted, #94a3b8);
  }

  [part="content"] .math-note ui-icon {
    color: var(--color-accent-primary);
    flex-shrink: 0;
  }

  [part="content"] .math-note code {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    color: var(--color-text-main);
  }
`);var Ce=class extends HTMLElement{#e;constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.adoptedStyleSheets=[W,Se];let e=document.createElement(`div`);e.innerHTML=`
      <span part="arrow"></span>
      <span part="content"></span>
    `,this.#e.appendChild(e)}setContent(e){let t=this.#e.querySelector(`[part="content"]`);t.innerHTML=``,typeof e==`string`?t.textContent=e:t.appendChild(e)}show(){this.classList.add(`is-visible`)}hide(){this.classList.remove(`is-visible`),this.addEventListener(`transitionend`,()=>{this.classList.contains(`is-visible`)||this.remove()},{once:!0})}position(e,t,n){let r=this.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,o=[t,...xe.filter(e=>e!==t)],s=null,c=null;for(let t of o){let o=this.#t(e,r,t,n,6);if(o.top>=18&&o.left>=18&&o.top+r.height<=a-18&&o.left+r.width<=i-18){s=t,c=o;break}}s||(s=t,c=this.#t(e,r,t,n,6));let l=c,u=Math.min(Math.max(l.left,18),i-r.width-18),d=Math.min(Math.max(l.top,18),a-r.height-18);if(s===`top`||s===`bottom`){let t=(e.left+e.width/2-u)/r.width*100,n=Math.min(Math.max(t,10),90);this.style.setProperty(`--arrow-offset`,`${n}%`)}else{let t=(e.top+e.height/2-d)/r.height*100,n=Math.min(Math.max(t,10),90);this.style.setProperty(`--arrow-offset`,`${n}%`)}this.setAttribute(`data-placement`,s),this.style.top=`${d}px`,this.style.left=`${u}px`}#t(e,t,n,r,i){let a=r+i;switch(n){case`top`:return{top:e.top-t.height-a,left:e.left+(e.width-t.width)/2};case`bottom`:return{top:e.bottom+a,left:e.left+(e.width-t.width)/2};case`left`:return{top:e.top+(e.height-t.height)/2,left:e.left-t.width-a};case`right`:return{top:e.top+(e.height-t.height)/2,left:e.right+a}}}};customElements.define(`tooltip-balloon`,Ce);var we=class extends HTMLElement{#e=null;#t=new WeakMap;connectedCallback(){this.#n(),this.#r(),this.#a()}disconnectedCallback(){this.#e?.disconnect()}#n(){document.querySelectorAll(`[data-tooltip]`).forEach(e=>{this.#i(e)})}#r(){let e=new Set,t=null;this.#e=new MutationObserver(n=>{n.forEach(t=>{t.addedNodes.forEach(t=>{t instanceof HTMLElement&&(t.hasAttribute(`data-tooltip`)&&e.add(t),t.querySelectorAll(`[data-tooltip]`).forEach(t=>{e.add(t)}))})}),t===null&&(t=requestAnimationFrame(()=>{e.forEach(e=>this.#i(e)),e.clear(),t=null}))}),this.#e.observe(document.body,{childList:!0,subtree:!0})}#i(e){if(this.#t.has(e))return;let t=new Te(e,{text:e.getAttribute(`data-tooltip`)||void 0,templateRef:e.getAttribute(`data-tooltip-ref`)||void 0,placement:e.getAttribute(`data-tooltip-placement`)||`top`,variant:e.getAttribute(`data-tooltip-variant`)||void 0,delay:Number(e.getAttribute(`data-tooltip-delay`)||200),offset:Number(e.getAttribute(`data-tooltip-offset`)||8),triggers:(e.getAttribute(`data-tooltip-trigger`)||`hover focus`).split(/\s+/)});this.#t.set(e,t)}#a(){document.addEventListener(`mouseenter`,e=>{let t=e.composedPath().find(e=>e instanceof HTMLElement&&e.hasAttribute?.(`data-tooltip`));t&&!this.#t.has(t)&&this.#i(t)},{capture:!0,passive:!0}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&document.querySelectorAll(`tooltip-balloon`).forEach(e=>e.hide())})}};customElements.define(`ui-tooltip-manager`,we);var Te=class{#e;#t;#n=null;#r=new AbortController;#i=null;#a=null;#o=!1;constructor(e,t){this.#e=e,this.#t=t,this.#s()}#s(){let{signal:e}=this.#r,{triggers:t}=this.#t;t.includes(`hover`)&&(this.#e.addEventListener(`mouseenter`,()=>this.#c(),{signal:e}),this.#e.addEventListener(`mouseleave`,()=>this.#l(),{signal:e})),t.includes(`focus`)&&(this.#e.addEventListener(`focusin`,()=>this.#c(),{signal:e}),this.#e.addEventListener(`focusout`,()=>this.#l(),{signal:e})),t.includes(`click`)&&(this.#e.addEventListener(`click`,e=>{e.stopPropagation(),this.#o?this.close():this.open()},{signal:e}),document.addEventListener(`click`,e=>{this.#o&&!this.#e.contains(e.target)&&!this.#n?.contains(e.target)&&this.close()},{signal:e,capture:!0}))}#c(){this.#a&&=(clearTimeout(this.#a),null),!this.#i&&(this.#i=setTimeout(()=>{this.#u(),this.#i=null},this.#t.delay))}#l(){this.#i&&=(clearTimeout(this.#i),null),!this.#a&&(this.#a=setTimeout(()=>{this.#d(),this.#a=null},100))}#u(){if(this.#o)return;this.#o=!0;let e=`tip-${Math.random().toString(36).slice(2,9)}`;this.#n=document.createElement(`tooltip-balloon`),this.#n.id=e,this.#e.setAttribute(`aria-describedby`,e),this.#t.variant&&this.#n.setAttribute(`variant`,this.#t.variant);let t=this.#f();t&&this.#n.setContent(t),document.body.appendChild(this.#n),requestAnimationFrame(()=>{let e=this.#e.getBoundingClientRect();this.#n.position(e,this.#t.placement,this.#t.offset),this.#n.show()})}#d(){!this.#o||!this.#n||(this.#o=!1,this.#e.removeAttribute(`aria-describedby`),this.#n.hide(),this.#n=null)}#f(){if(this.#t.text)return this.#t.text;if(this.#t.templateRef){let e=document.getElementById(this.#t.templateRef);if(e instanceof HTMLTemplateElement)return e.content.cloneNode(!0)}return this.#t.contentSlot?this.#t.contentSlot.cloneNode(!0):null}open(){this.#i&&=(clearTimeout(this.#i),null),this.#a&&=(clearTimeout(this.#a),null),this.#u()}close(){this.#i&&=(clearTimeout(this.#i),null),this.#a&&=(clearTimeout(this.#a),null),this.#d()}updateConfig(e){if(Object.assign(this.#t,e),this.#o&&this.#n){let t=this.#f();t&&this.#n.setContent(t),e.variant!==void 0&&(e.variant?this.#n.setAttribute(`variant`,e.variant):this.#n.removeAttribute(`variant`))}}destroy(){this.#i&&=(clearTimeout(this.#i),null),this.#a&&=(clearTimeout(this.#a),null),this.#r.abort(),this.#d()}},Ee=document.createElement(`template`);Ee.innerHTML=`
<style>
  :host { display: contents; }
</style>
<slot name="target"></slot>
<slot name="content" style="display: none;"></slot>
`;var De=class extends HTMLElement{#e;#t;#n;#r=null;static observedAttributes=[`trigger`,`placement`,`tooltip`,`tooltip-ref`,`variant`,`delay`,`offset`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.adoptedStyleSheets=[W],this.#e.appendChild(Ee.content.cloneNode(!0)),this.#t=this.#e.querySelector(`slot[name="target"]`),this.#n=this.#e.querySelector(`slot[name="content"]`)}connectedCallback(){this.#t.addEventListener(`slotchange`,()=>this.#i()),this.#i()}disconnectedCallback(){this.#r?.destroy()}attributeChangedCallback(e,t,n){t===n||!this.#r||([`tooltip`,`tooltip-ref`,`variant`].includes(e)?this.#r.updateConfig(this.#a()):this.#i())}#i(){let e=this.#t.assignedElements({flatten:!0});if(!e.length)return;this.#r?.destroy();let t=e[0];this.#r=new Te(t,this.#a())}#a(){let e=this.#n.assignedNodes({flatten:!0}),t=e.length>0?this.#o(e):void 0;return{text:this.getAttribute(`tooltip`)||void 0,templateRef:this.getAttribute(`tooltip-ref`)||void 0,contentSlot:t,placement:this.getAttribute(`placement`)||`top`,variant:this.getAttribute(`variant`)||void 0,delay:Number(this.getAttribute(`delay`)||200),offset:Number(this.getAttribute(`offset`)||8),triggers:(this.getAttribute(`trigger`)||`hover focus`).split(/\s+/)}}#o(e){let t=document.createDocumentFragment(),n=document.createElement(`div`),r=e=>{if(e.nodeType===Node.TEXT_NODE)return e.cloneNode(!1);if(e.nodeType===Node.ELEMENT_NODE){let t=e,n=document.createElement(t.nodeName.toLowerCase());for(let e of Array.from(t.attributes))n.setAttribute(e.name,e.value);for(let e of Array.from(t.childNodes))n.appendChild(r(e));return n}return e.cloneNode(!1)};e.forEach(e=>{n.appendChild(r(e))});let i=n.querySelector(`[class*="tooltip-header"], [class*="header"]`);return i&&i.classList.add(`tooltip-header`),n.querySelectorAll(`[class*="section-title"], [class*="title"]`).forEach(e=>{e.classList.add(`section-title`)}),n.querySelectorAll(`[class*="grid"]`).forEach(e=>{e.classList.add(`controls-grid`)}),n.querySelectorAll(`kbd, [class*="kbd"]`).forEach(e=>{e.classList.add(`kbd`)}),n.querySelectorAll(`[class*="desc"], [class*="text-muted"]`).forEach(e=>{e.classList.contains(`section-title`)||e.classList.add(`control-desc`)}),n.querySelectorAll(`[class*="note"], [class*="math"]`).forEach(e=>{e.classList.add(`math-note`)}),n.querySelectorAll(`[class*="mb-"], [class*="section"]`).forEach(e=>{e.classList.add(`tooltip-section`)}),t.appendChild(n),t}open(){this.#r?.open()}close(){this.#r?.close()}get isOpen(){return this.#r?.[`#isOpen`]??!1}};customElements.define(`ui-tooltip`,De);var Oe=class extends HTMLElement{unsubscribe=null;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.render(),this.setupListeners(),this.updateUI()}disconnectedCallback(){this.unsubscribe&&this.unsubscribe()}setupListeners(){this.unsubscribe=r.on(`state:change`,e=>{this.updateUI(e)}),r.on(`command:toolbar:upload-image`,()=>{this.shadowRoot?.getElementById(`file-input`)?.click()})}updateUI(e=b.getState()){let t=this.shadowRoot;if(!t)return;let n=t.getElementById(`undo`),r=t.getElementById(`redo`);n&&n.toggleAttribute(`disabled`,!e.canUndo),r&&r.toggleAttribute(`disabled`,!e.canRedo)}render(){!this.shadowRoot||this.shadowRoot.querySelector(`#add-text`)||(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .divider {
          width: 1px;
          height: 20px;
          background-color: var(--color-border-ui);
          margin: 0 6px;
          opacity: 0.6;
        }
        app-button {
          --btn-padding: 8px 12px;
        }
        .tooltip-rich-panel {
          width: 200px;
          padding: 4px;
        }
        @keyframes pulse-indigo {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .pulse-help {
          animation: pulse-indigo 2s infinite;
          border-color: var(--color-accent-primary) !important;
        }
      </style>
      
      <!-- GRUPO DE CRIAÇÃO -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-text" variant="secondary">
          <ui-icon name="text"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Texto</span>
            <kbd class="kbd-prism">T</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma nova camada de texto dinâmico ou estático.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-rect" variant="secondary">
          <ui-icon name="rect"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Retângulo</span>
            <kbd class="kbd-prism">R</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Desenha um retângulo no canvas. Segure <kbd class="kbd-prism text-[8px] px-1 py-0 shadow-none">Shift</kbd> para quadrado.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-image" variant="secondary">
          <ui-icon name="image"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Imagem</span>
            <kbd class="kbd-prism">I</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importa um arquivo local de imagem ou logotipo para a etiqueta.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-border" variant="secondary">
          <ui-icon name="rect" style="transform: scale(1.2); opacity:
          0.7;"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold
          tracking-wide">Moldura</span>
            <kbd class="kbd-prism">B</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma borda decorativa ao redor de toda a etiqueta.
          </p>
        </div>
      </ui-tooltip
      
      <div class="divider"></div>
      
      <!-- GRUPO DE HISTÓRICO -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="undo" variant="secondary" disabled>
          <ui-icon name="undo"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Desfazer</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Z</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Reverte a última modificação realizada no design.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="redo" variant="secondary" disabled>
          <ui-icon name="redo"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Refazer</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Shift</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Z</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Restaura a ação que foi desfeita anteriormente.
          </p>
        </div>
      </ui-tooltip>
      
      <div class="divider"></div>
      
      <!-- AÇÕES PRIMÁRIAS -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-help" variant="secondary" class="${localStorage.getItem(`has_seen_guide`)?``:`pulse-help`}">
          <ui-icon name="help"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Guia & Atalhos</span>
            <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">/</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Acesse o centro de ajuda, tutoriais rápidos e mapa de atalhos.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="save" variant="secondary">
          <ui-icon name="save"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Salvar</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">S</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Persiste o design atual no banco de dados local do navegador.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-project-modal" variant="secondary" style="margin-left: 4px;">
          <ui-icon name="folder"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Projeto</span>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importar ou exportar arquivos de design (.label) para backup ou compartilhamento.
          </p>
        </div>
      </ui-tooltip>
      
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-batch" variant="success" style="margin-left: 4px;">
          GENERATE PDF
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Gerar Lote</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">P</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Renderiza múltiplas etiquetas em alta qualidade para impressão.
          </p>
        </div>
      </ui-tooltip>
      
      <input type="file" id="file-input" style="display: none;" accept="image/*">
    `,this.attachEvents())}attachEvents(){let e=this.shadowRoot,t=e.getElementById(`file-input`);e.getElementById(`add-text`)?.addEventListener(`click`,()=>{r.emit(`element:add`,A.create(u.TEXT))}),e.getElementById(`add-rect`)?.addEventListener(`click`,()=>{r.emit(`element:add`,A.create(u.RECTANGLE))}),e.getElementById(`add-border`)?.addEventListener(`click`,()=>{r.emit(`element:add`,A.create(u.BORDER))}),e.getElementById(`add-image`)?.addEventListener(`click`,()=>t.click()),t?.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(!t)return;let{imageProcessor:n}=await y(async()=>{let{imageProcessor:e}=await import(`./imageProcessor-BT0oebsG.js`);return{imageProcessor:e}},__vite__mapDeps([3,2]),import.meta.url),i=await n.process(t),a=b.getState().currentLabel.config;r.emit(`element:add`,A.create(u.IMAGE,{dimensions:{width:w.pxToMm(i.width,a.dpi),height:w.pxToMm(i.height,a.dpi)},src:i.src}))}),e.getElementById(`open-help`)?.addEventListener(`click`,()=>{r.emit(`ui:open:help`,{tab:`guide`});let t=e.getElementById(`open-help`);t&&t.classList.remove(`pulse-help`)}),e.getElementById(`undo`)?.addEventListener(`click`,()=>r.emit(`history:undo`,{source:`toolbar`})),e.getElementById(`redo`)?.addEventListener(`click`,()=>r.emit(`history:redo`,{source:`toolbar`})),e.getElementById(`save`)?.addEventListener(`click`,async()=>{let{templateManager:e}=await y(async()=>{let{templateManager:e}=await Promise.resolve().then(()=>j);return{templateManager:e}},void 0,import.meta.url);await e.saveCurrentLabel(),r.emit(`notify`,{type:`success`,message:`Template salvo com sucesso!`})}),e.getElementById(`open-batch`)?.addEventListener(`click`,()=>{let e=document.getElementById(`batch-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN)}),e.getElementById(`open-project-modal`)?.addEventListener(`click`,()=>{let e=document.getElementById(`project-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN)}),document.getElementById(`btn-export-file`)?.addEventListener(`click`,async()=>{await N.exportToFile(),c.play(c.enumPresets.SUCCESS)}),document.getElementById(`btn-import-trigger`)?.addEventListener(`click`,()=>{document.getElementById(`global-import-input`)?.click()}),document.getElementById(`global-import-input`)?.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(t)try{await N.importFromFile(t);let e=document.getElementById(`project-modal`);e&&e.removeAttribute(`open`),c.play(c.enumPresets.SUCCESS),r.emit(`notify`,{message:`Projeto importado com sucesso!`,type:`success`})}catch(e){r.emit(`notify`,{message:`Erro ao importar: `+e.message,type:`error`})}})}};customElements.define(`editor-toolbar`,Oe);function K(e){if(!e)return``;let t=document.createElement(`p`);return t.textContent=e,t.innerHTML}var ke=class extends HTMLElement{input;labelElement;constructor(){super(),this.attachShadow({mode:`open`}),this.labelElement=document.createElement(`label`),this.labelElement.className=`label-prism`,this.input=document.createElement(`input`),this.input.className=`input-prism`,this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}static get observedAttributes(){return[`label`,`type`,`value`,`placeholder`]}connectedCallback(){this.setupBaseStyles(),this.render(),this.setupEvents()}attributeChangedCallback(e,t,n){t!==n&&this.updateValues()}setupBaseStyles(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          margin-bottom: 12px;
          width: 100%;
        }
      </style>
    `,this.shadowRoot.appendChild(this.labelElement),this.shadowRoot.appendChild(this.input))}render(){this.updateValues()}updateValues(){let e=this.getAttribute(`label`)||``,t=this.getAttribute(`type`)||`text`,n=this.getAttribute(`value`)||``,r=this.getAttribute(`placeholder`)||``;this.labelElement.textContent=e,this.input.type=t,this.input.placeholder=r,this.input.value!==n&&(this.input.value=n)}setupEvents(){this.input.addEventListener(`input`,e=>{c.play(c.enumPresets.TAP),this.dispatchEvent(new CustomEvent(`app-input`,{detail:e.target.value,bubbles:!0,composed:!0}))})}};customElements.define(`app-input`,ke);var Ae=class extends HTMLElement{#e;#t;#n;#r=null;#i=!1;#a=0;#o=0;#s=5;static observedAttributes=[`value`,`min`,`max`,`step`,`label`,`unit`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.adoptedStyleSheets=[W]}get value(){return parseFloat(this.#t.value)||0}set value(e){let t=typeof e==`string`?parseFloat(e):e;this.#d(t,!1)}get min(){return parseFloat(this.getAttribute(`min`)||`-Infinity`)}get max(){return parseFloat(this.getAttribute(`max`)||`Infinity`)}get step(){return parseFloat(this.getAttribute(`step`)||`1`)}connectedCallback(){this.#m(),this.#c(),this.#p()}disconnectedCallback(){this.#r?.abort()}attributeChangedCallback(e,t,n){this.#t&&(e===`value`&&this.#d(parseFloat(n),!1),e===`label`&&(this.#e.querySelector(`.label-text`).textContent=n),e===`unit`&&(this.#e.querySelector(`.scrubber-unit`).textContent=n))}#c(){this.#r=new AbortController;let{signal:e}=this.#r,t=this.#e.querySelector(`.scrubber-label`);this.#t=this.#e.querySelector(`.scrubber-input`),this.#n=this.#e.querySelector(`.scrubber-wrapper`),t.addEventListener(`pointerdown`,e=>this.#l(e),{signal:e}),this.#t.addEventListener(`keydown`,e=>this.#u(e),{signal:e}),this.#t.addEventListener(`input`,()=>c.play(c.enumPresets.TAP),{signal:e}),this.#t.addEventListener(`blur`,()=>this.#f(),{signal:e})}#l(e){let t=e.currentTarget;this.#i=!0,this.#a=e.clientX,this.#o=this.value,this.#n.classList.add(`is-scrubbing`),this.#t.style.cursor=`ew-resize`,t.setPointerCapture(e.pointerId),c.play(c.enumPresets.TAP);let n=e=>{if(!this.#i)return;let t=e.clientX-this.#a,n=e.shiftKey?10:e.altKey?.1:1,r=t/this.#s*this.step*n,i=this.#o+r;Math.abs(i-this.value)>=this.step&&c.play(c.enumPresets.TAP),this.#d(i,!0)},r=e=>{this.#i=!1,this.#n.classList.remove(`is-scrubbing`),this.#t.style.cursor=`text`,t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId),this.#f(),t.removeEventListener(`pointermove`,n),t.removeEventListener(`pointerup`,r)};t.addEventListener(`pointermove`,n),t.addEventListener(`pointerup`,r)}#u(e){let t=1;e.shiftKey&&(t=10),e.altKey&&(t=.1),e.key===`ArrowUp`?(e.preventDefault(),this.#d(this.value+this.step*t,!0)):e.key===`ArrowDown`?(e.preventDefault(),this.#d(this.value-this.step*t,!0)):e.key===`Enter`&&this.#t.blur()}#d(e,t){let n=Math.min(Math.max(e,this.min),this.max),r=this.getAttribute(`step`)?.includes(`.`)?2:n%1==0?0:2,i=n.toFixed(r);this.#t.value!==i&&(this.#t.value=i,this.#p(),t&&this.dispatchEvent(new CustomEvent(`input`,{detail:{value:parseFloat(i),property:this.getAttribute(`property`)},bubbles:!0,composed:!0})))}#f(){let e=this.#t.value.replace(`,`,`.`);try{if(/[^-+*/().0-9 ]/g.test(e)===!1){let t=Function(`return (${e})`)();this.#d(t,!1)}}catch{this.#d(this.value,!1)}this.dispatchEvent(new CustomEvent(`change`,{detail:{value:this.value,property:this.getAttribute(`property`)},bubbles:!0,composed:!0}))}#p(){if(this.min===-1/0||this.max===1/0)return;let e=(this.value-this.min)/(this.max-this.min)*100;this.style.setProperty(`--progress`,`${Math.max(0,Math.min(100,e))}%`)}#m(){let e=this.getAttribute(`label`)||``,t=this.getAttribute(`value`)||`0`,n=this.getAttribute(`unit`)||``;this.#e.innerHTML=`
      <style>
        :host { display: block; width: 100%; --progress: 0%; }
        
        .scrubber-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          height: 32px;
          background-color: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.2s var(--ease-spring);
        }
        
        .scrubber-wrapper::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: var(--progress);
          background: linear-gradient(90deg, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.15) 100%);
          pointer-events: none;
          border-right: 1px solid rgba(99,102,241,0.3);
          z-index: 0;
        }

        .scrubber-wrapper:hover { border-color: rgba(255, 255, 255, 0.2); }
        
        .scrubber-wrapper:focus-within {
          border-color: var(--color-accent-primary);
          box-shadow: var(--shadow-neon-primary);
        }

        .scrubber-wrapper.is-scrubbing {
          border-color: var(--color-accent-primary);
          transform: scale(0.98);
          background: rgba(99, 102, 241, 0.05);
        }

        .scrubber-label {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 100%;
          background: rgba(255, 255, 255, 0.03);
          border-right: 1px solid var(--color-border-ui);
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: bold;
          cursor: ew-resize;
          user-select: none;
        }

        .scrubber-input {
          position: relative;
          z-index: 1;
          flex: 1;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text-main);
          font-family: var(--font-mono);
          font-size: 11px;
          text-align: right;
          padding-right: 4px;
        }

        .scrubber-unit {
          position: relative;
          z-index: 1;
          color: rgba(148, 163, 184, 0.4);
          font-family: var(--font-mono);
          font-size: 9px;
          padding-right: 8px;
          pointer-events: none;
        }
      </style>
      <div class="scrubber-wrapper" part="wrapper">
        <div class="scrubber-label" part="label">
          <span class="label-text">${e}</span>
        </div>
        <input type="text" class="scrubber-input" part="input" value="${t}" spellcheck="false" autocomplete="off" />
        <span class="scrubber-unit">${n}</span>
      </div>
    `}};customElements.define(`ui-number-scrubber`,Ae);function je(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}function Me(e,{includeTime:t=!1,isRelative:n=!1,locale:r=`pt-BR`}={}){if(!e)throw Error(`isoString é obrigatório`);let i=new Date(e);if(isNaN(i.getTime()))throw Error(`Data inválida`);if(n){let e=Math.floor((i.getTime()-Date.now())/1e3),t=new Intl.RelativeTimeFormat(r,{numeric:`auto`});for(let[n,r]of[[31536e3,`year`],[2592e3,`month`],[86400,`day`],[3600,`hour`],[60,`minute`],[1,`second`]]){let i=Math.trunc(e/n);if(Math.abs(i)>=1)return t.format(i,r)}return t.format(0,`second`)}let a={day:`2-digit`,month:`2-digit`,year:`numeric`};return t&&Object.assign(a,{hour:`2-digit`,minute:`2-digit`,hour12:!1}),new Intl.DateTimeFormat(r,a).format(i)}var Ne=e=>e.type===u.TEXT,Pe=e=>e.type===u.RECTANGLE,Fe=e=>e.type===u.IMAGE,Ie=e=>e.type===u.BORDER,Le=e=>`dimensions`in e,Re=je((e,t)=>{o.debug(`Inspector`,`Input Event: prop=${t} | value=${e}`)},100),ze=class extends HTMLElement{abortController=null;currentElementsJson=``;currentSelectedId=null;currentThumbnail=``;overflowWarnings=new Map;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.renderSkeleton(),this.setupListeners()}disconnectedCallback(){this.cleanup()}cleanup(){this.abortController&&=(this.abortController.abort(),null)}setupListeners(){this.cleanup(),this.abortController=new AbortController;let{signal:e}=this.abortController,t=r.on(`state:change`,e=>this.handleStateChange(e)),n=r.on(`element:warning`,({id:e,result:t})=>{this.overflowWarnings.set(e,t),this.updateWarningVisuals()}),i=r.on(`element:warning:clear`,({id:e})=>{this.overflowWarnings.delete(e),this.updateWarningVisuals()});e.addEventListener(`abort`,()=>{t(),n(),i()});let a=this.shadowRoot;a.addEventListener(`app-input`,e=>this.handleGenericInput(e),{signal:e}),a.addEventListener(`input`,e=>this.handleGenericInput(e),{signal:e}),a.addEventListener(`change`,e=>this.handleGenericInput(e),{signal:e}),a.addEventListener(`click`,e=>this.handleDelegatedClick(e),{signal:e})}handleStateChange(e){let t=e.currentLabel?.elements||[],n=e.currentLabel?.config,r=e.selectedElementIds[0]||null,i=e.preferences,a=JSON.stringify(t.map(e=>({id:e.id,type:e.type,v:e.visible})));a!==this.currentElementsJson||r!==this.currentSelectedId?(o.debug(`Inspector`,`Rebuild disparado: Mudança na estrutura ou seleção.`),this.currentElementsJson=a,this.currentSelectedId=r,this.rebuildPanel(e.currentLabel,r,i)):(this.syncValues(t,n,r),this.syncDigitalTwin()),this.updateDigitalTwin(e.currentLabel)}updateDigitalTwin=je(async e=>{if(!e)return;let{templateManager:t}=await y(async()=>{let{templateManager:e}=await Promise.resolve().then(()=>j);return{templateManager:e}},void 0,import.meta.url);this.currentThumbnail=await t.captureThumbnail(e),this.syncDigitalTwin()},1e3);syncDigitalTwin(){let e=this.shadowRoot?.querySelector(`#vault-monitor-img`);e&&this.currentThumbnail&&(e.src=this.currentThumbnail)}renderSkeleton(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: flex; flex-direction: column; height: 100%; gap: 16px; padding: 20px; box-sizing: border-box; color: var(--color-text-main); font-family: var(--font-sans); overflow-y: scroll; }
        #panel-content { display: flex; flex-direction: column; gap: 12px; flex: 1; padding-right: 8px; }
        .row-ui { display: flex; gap: 10px; margin-bottom: 4px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .row-ui > .fixed-small { flex: none; width: 100px; }
        .tooltip-content { padding: 8px; max-width: 220px; }
        .action-icon { pointer-events: auto !important; transition: all 0.2s var(--ease-spring);
        .action-icon:hover { transform: scale(1.2); color: var(--color-accent-primary); }
        .action-icon.active { color: var(--color-accent-primary); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      </style>
      <div class="inspector-header">
        <div class="inspector-title-group">
          <span id="panel-title" class="inspector-title">LAYERS</span>
          <span id="unit-count" class="inspector-badge">0 UNITS</span>
        </div>
        <ui-tooltip placement="bottom" offset="8">
          <button slot="target" class="help-btn" aria-label="Manual Técnico">
            <ui-icon name="help" size="md"></ui-icon>
          </button>
          <div slot="content" class="tooltip-content">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">
              <ui-icon name="save" size="md" style="--icon-color: var(--color-accent-primary);"></ui-icon>
              <span style="color: white; font-weight: 600; font-size: 11px; text-transform: uppercase;">Technical Manual</span>
            </div>
            <p class="label-prism" style="margin-top: 0;">Dimension Scrubbing</p>
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center;">
              <kbd class="kbd-prism">Drag</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Adjust ±1.0mm</span>
              <kbd class="kbd-prism">Shift</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Fast ±10mm</span>
              <kbd class="kbd-prism">Alt</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Fine ±0.1mm</span>
            </div>
            <div style="margin-top: 12px; padding: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; border: 1px solid rgba(255,255,255,0.05); display: flex; gap: 8px;">
              <ui-icon name="text" size="sm"></ui-icon>
              <span style="font-size: 9px; color: var(--color-text-muted);">Supports math:</br><code style="color: white;">100/2 + 5</code></span>
            </div>
          </div>
        </ui-tooltip>
      </div>
      <div id="panel-content"></div>
    `)}rebuildPanel(e,t,n){let r=this.shadowRoot?.getElementById(`panel-content`),i=this.shadowRoot?.getElementById(`panel-title`),a=this.shadowRoot?.getElementById(`unit-count`);!r||!e||(t?(i&&(i.textContent=`PROPERTIES`),a&&(a.textContent=`${e.elements.length} UNITS`),r.innerHTML=[...e.elements].sort((e,t)=>t.zIndex-e.zIndex).map(e=>this.renderCardHtml(e,e.id===t)).join(``)):(i&&(i.textContent=`LABEL SETUP`),a&&(a.textContent=`BLUEPRINT`),r.innerHTML=this.renderDocumentSetup(e,n||b.getState().preferences)),this.updateWarningVisuals())}renderDocumentSetup(e,t){let{widthMM:n,heightMM:r,backgroundColor:i}=e.config;return`
      <!-- THE VAULT MONITOR (Digital Twin) -->
      <div class="relative w-full h-48 bg-[#0a0c10] border border-border-ui rounded-xl flex items-center justify-center mb-6 overflow-hidden group cursor-pointer" 
           data-action="open-vault" id="btn-open-vault">
        
        <!-- A Miniatura Real (Proporcional) -->
        <div class="relative bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:blur-sm" 
             style="aspect-ratio: ${n} / ${r}; max-height: 80%; max-width: 80%;">
          
          <img id="vault-monitor-img" src="${this.currentThumbnail||``}" 
               class="w-full h-full object-contain" 
               style="${this.currentThumbnail?``:`background-color: ${i||`white`}`}" />
          
          <!-- Efeito Scanline CRT (Juice) -->
          <div class="absolute inset-0 pointer-events-none opacity-10" 
               style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px);"></div>
        </div>

        <!-- Overlay de Hover (O Convite) -->
        <div class="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <div class="bg-surface-solid border border-accent-primary text-text-main font-mono text-[10px] px-3 py-1.5 rounded uppercase tracking-widest shadow-neon-primary">
            [ Open Vault ]
          </div>
        </div>

        <!-- Réguas de Medida (Cotas sutilmente integradas) -->
        <div class="absolute top-2 left-0 right-0 flex justify-center pointer-events-none opacity-40">
           <span class="bg-surface-solid border border-accent-primary text-text-main font-mono text-xs px-2 py-1 rounded" style="background-color: rgba(255, 255, 255, 0.1);">
             ${n}mm
           </span>
        </div>
        <div class="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none opacity-40">
           <span class="bg-surface-solid border border-accent-primary text-text-main font-mono text-xs px-2 py-1 rounded" style="background-color: rgba(255, 255, 255, 0.1); writing-mode: vertical-rl;">
             ${r}mm
           </span>
        </div>
      </div>
      
      <span class="label-prism">Canvas Setup</span>
      <div class="row-ui">
        <ui-number-scrubber label="W" data-doc-prop="widthMM" value="${n}" unit="mm" step="1" style="flex: 1;"></ui-number-scrubber>
        <ui-number-scrubber label="H" data-doc-prop="heightMM" value="${r}" unit="mm" step="1" style="flex: 1;"></ui-number-scrubber>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="DPI" data-doc-prop="dpi" value="${e.config.dpi}" min="72" max="600" step="1" unit="dpi"></ui-number-scrubber>
        <app-input label="Paper" type="color" data-doc-prop="backgroundColor" value="${K(i||`#ffffff`)}" class="fixed-small"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Zoom" data-doc-prop="previewScale" value="${e.config.previewScale}" min="0.1" max="5" step="0.1" unit="x"></ui-number-scrubber>
      </div>

      <span class="label-prism" style="margin-top: 12px;">Preferences</span>
      <div class="card-module" style="padding: 12px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">SHOW GRID</span>
          <input type="checkbox" data-pref="showGrid" ${t.showGrid?`checked`:``}>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">GRID SIZE</span>
          <ui-number-scrubber data-pref="gridSizeMM" value="${t.gridSizeMM||5}" min="1" max="50" step="1" unit="mm" style="width: 80px; flex: none;"></ui-number-scrubber>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">GRID COLOR</span>
          <app-input type="color" data-pref="gridColor" value="${t.gridColor||`#6366f1`}" style="width: 80px; flex: none;"></app-input>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">GRID OPACITY</span>
          <ui-number-scrubber data-pref="gridOpacity" value="${t.gridOpacity??.3}" min="0" max="1" step="0.05" unit="α" style="width: 80px; flex: none;"></ui-number-scrubber>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">UNIT</span>
          <select data-pref="unit" class="input-prism" style="width: 80px; padding: 2px 6px; height: 24px; font-size: 10px;">
            <option value="mm" ${t.unit===`mm`?`selected`:``}>MM</option>
            <option value="px" ${t.unit===`px`?`selected`:``}>PX</option>
            <option value="pt" ${t.unit===`pt`?`selected`:``}>PT</option>
          </select>
        </div>
      </div>
    `}renderCardHtml(e,t){let n=K(e.id);return`
      <div class="element-card ${t?`selected`:``}" data-id="${n}">
        <div class="card-header" data-action="select">
          <span class="type-tag">${K(e.type)}</span>
          <span class="layer-name" data-layer-id="${n}">${K(e.name||e.type)}</span>
          <span class="warning-tag" data-warn-id="${n}" style="display:none; color:var(--color-accent-warning)">⚠</span>
          <ui-icon name="${e.visible===!1?`eye`:`eye-off`}" class="action-icon ${e.visible===!1?``:`active`}" 
            data-action="toggle-vis" 
            style="--icon-size: 14px; cursor: pointer; opacity: ${e.visible===!1?`0.3`:`1`};"></ui-icon>
        </div>
        <div class="card-content">
          ${t?this.renderElementProperties(e):``}
        </div>
      </div>
    `}renderElementProperties(e){return`
      <span class="label-prism">Identification</span>
      <div class="row-ui">
        <app-input label="Layer Name" data-prop="name" value="${K(e.name||``)}" style="flex:1"></app-input>
      </div>

      <span class="label-prism">Transform</span>
      <div class="row-ui">
        <ui-number-scrubber label="X" data-prop="position.x" value="${e.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Y" data-prop="position.y" value="${e.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
      </div>
      
      ${Le(e)?`
        <div class="row-ui">
          <ui-number-scrubber label="W" data-prop="dimensions.width" value="${e.dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="H" data-prop="dimensions.height" value="${e.dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      `:``}

      <div class="row-ui">
        <ui-number-scrubber label="Rot" data-prop="rotation" value="${e.rotation||0}" min="0" max="360" step="1" unit="°"></ui-number-scrubber>
        <ui-number-scrubber label="Op" data-prop="opacity" value="${e.opacity??1}" min="0" max="1" step="0.05" unit="α"></ui-number-scrubber>
      </div>

      ${this.renderTypeSpecificFields(e)}

      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <app-button variant="secondary" data-action="up" style="flex: 1;">UP</app-button>
        <app-button variant="danger" data-action="del" style="flex: 1;">DEL</app-button>
      </div>
    `}renderTypeSpecificFields(e){return Ne(e)?`
        <div class="flex items-center justify-between mb-1">
          <span class="label-prism" style="margin:0">Typography</span>
          <ui-tooltip placement="left" offset="12">
            <button slot="target" class="help-btn cursor-help opacity-50" aria-label="Manual Técnico">
              <ui-icon name="help" size="sm"></ui-icon>
            </button>
            <div slot="content" class="tooltip-rich-panel w-60">
  
              <!-- CABEÇALHO -->
              <div class="tooltip-rich-header mb-2 pb-1.5 border-b border-white/10 flex items-center gap-1.5">
                <ui-icon name="brackets" class="w-3.5 h-3.5 text-accent-primary"></ui-icon>
                <span class="font-mono text-[10px] text-text-main font-semibold uppercase tracking-wider">
                  Dynamic Interpolation
                </span>
              </div>

              <!-- TABELA DE COMANDOS (Grid) -->
              <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center text-[10px] mb-1">
                
                <!-- Item 1 -->
                <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">
                  :upper
                </code> 
                <span class="text-text-muted">MAIÚSCULAS</span>
                
                <!-- Item 2 -->
                <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">
                  :currency
                </code> 
                <span class="text-text-muted">R$ 1.250,00</span>
                
                <!-- Item 3 -->
                <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">
                  :date
                </code> 
                <span class="text-text-muted">19/04/2026</span>
                
                <!-- Item 4 -->
                <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">
                  :trunc(N)
                </code> 
                <span class="text-text-muted">Limita o texto a N chars</span>
                
                <!-- Item 5 (Fallback - Note que mudei a cor para Warning para diferenciar lógica) -->
                <code class="font-mono text-accent-warning bg-accent-warning/10 px-1 py-0.5 rounded border border-accent-warning/20">
                  ||Default
                </code> 
                <span class="text-text-muted">Valor reserva (Fallback)</span>

              </div>

              <!-- RODAPÉ (Dica Oculta) -->
              <div class="mt-2.5 pt-2 border-t border-white/5 text-[9px] text-accent-success/90 flex gap-1.5 items-start">
                <ui-icon name="lightbulb" class="w-3 h-3 shrink-0 mt-0.5"></ui-icon>
                <p class="leading-relaxed">
                  <strong class="uppercase tracking-wide font-semibold">Tip:</strong> Chain formatters like 
                  <code class="font-mono text-white bg-white/10 px-1 py-0.5 rounded border border-white/20">:trim:upper</code>
                </p>
              </div>

            </div>
          </ui-tooltip>
        </div>
        <div class="row-ui">
          <app-input label="Content" data-prop="content" value="${K(e.content)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Size" data-prop="fontSize" value="${e.fontSize}" min="1" max="200" step="1" unit="pt"></ui-number-scrubber>
          <app-input label="Color" type="color" data-prop="color" value="${K(e.color)}" class="fixed-small"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Lead" data-prop="lineHeight" value="${e.lineHeight||1.2}" min="0.5" max="3" step="0.1" unit="lh"></ui-number-scrubber>
          <app-input label="Weight" data-prop="fontWeight" value="${K(String(e.fontWeight))}" class="fixed-small"></app-input>
        </div>
      `:Pe(e)?`
        <span class="label-prism">Appearance</span>
        <div class="row-ui">
          <app-input label="Fill" type="color" data-prop="fillColor" value="${K(e.fillColor)}" style="flex:1"></app-input>
          <app-input label="Stroke" type="color" data-prop="strokeColor" value="${K(e.strokeColor)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Radius" data-prop="borderRadius" value="${e.borderRadius||0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="Thick" data-prop="strokeWidth" value="${e.strokeWidth||0}" min="0" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      `:Fe(e)?`
        <span class="label-prism">Image Settings</span>
        <div class="row-ui">
          <app-input label="Fit Mode" data-prop="fit" value="${K(e.fit)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui" style="align-items: center; gap: 12px; margin-top: 8px;">
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">Smoothing</span>
          <input type="checkbox" data-prop="smoothing" ${e.smoothing===!1?``:`checked`} style="width: auto; flex: none;">
        </div>
      `:Ie(e)?`
        <span class="label-prism">Border Style</span>
        <div class="row-ui">
          <app-input label="Style" data-prop="style" value="${K(e.style)}" style="flex:1"></app-input>
          <app-input label="Color" type="color" data-prop="color" value="${K(e.color)}" class="fixed-small"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Thick" data-prop="width" value="${e.width}" min="0.1" max="10" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="Radius" data-prop="radius" value="${e.radius||0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
        </div>
      `:``}handleGenericInput(e){let t=e.target.closest(`[data-prop], [data-doc-prop], [data-pref]`);if(!t)return;let n=!!e.detail&&typeof e.detail!=`number`;if((t.tagName.toLowerCase()===`app-input`||t.tagName.toLowerCase()===`ui-number-scrubber`)&&!n&&(e.type===`input`||e.type===`change`))return;let i=t.getAttribute(`data-doc-prop`),a=t.getAttribute(`data-prop`),o=t.getAttribute(`data-pref`),s;if(n){let t=e.detail;s=t&&typeof t==`object`&&`value`in t?t.value:t}else s=t instanceof HTMLInputElement?t.type===`checkbox`?t.checked:t.value:(t instanceof HTMLSelectElement,t.value);s!==void 0&&(Re(e.target.value,i||a||o),i?this.emitDocUpdate(i,s):a&&this.currentSelectedId?this.emitElUpdate(this.currentSelectedId,a,s):o&&r.emit(`preferences:update`,{[o]:s}))}handleDelegatedClick(e){let t=e.target,n=t.closest(`[data-action]`);if(!n)return;let i=n.getAttribute(`data-action`);if(i===`open-vault`){let e=document.getElementById(`vault-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN);return}let a=t.closest(`.element-card`)?.getAttribute(`data-id`)||this.currentSelectedId;if(a)if(i===`select`){if(a===this.currentSelectedId)return;r.emit(`element:select`,a),c.play(c.enumPresets.TAP)}else if(i===`toggle-vis`){let e=b.getState().currentLabel?.elements.find(e=>e.id===a);if(e){let t=e.visible===!1;r.emit(`element:update`,{id:a,updates:{visible:t}})}c.play(c.enumPresets.TOGGLE)}else i===`up`?r.emit(`element:reorder`,{id:a,direction:`up`}):i===`del`&&r.emit(`element:delete`,a)}emitDocUpdate(e,t){let n=b.getState().currentLabel;n&&r.emit(`label:config:update`,{...n.config,[e]:t})}emitElUpdate(e,t,n){let i={};if(t.includes(`.`)){let[e,r]=t.split(`.`);i[e]={[r]:n}}else i[t]=n;r.emit(`element:update`,{id:e,updates:i})}syncValues(e,t,n){let r=this.shadowRoot,i=(e,t,n,i=!0)=>{let a=e.querySelector(t);!a||n===void 0||r.activeElement===a||a.shadowRoot?.activeElement||i&&a.classList.contains(`is-scrubbing`)||(a.type===`checkbox`?a.checked!==n&&(a.checked=n):(a instanceof HTMLSelectElement,a.value!==n&&(a.value=n)))};if(!n){i(r,`[data-doc-prop="widthMM"]`,t.widthMM),i(r,`[data-doc-prop="heightMM"]`,t.heightMM),i(r,`[data-doc-prop="dpi"]`,t.dpi),i(r,`[data-doc-prop="previewScale"]`,t.previewScale),i(r,`[data-doc-prop="backgroundColor"]`,t.backgroundColor,!1);let e=b.getState().preferences;i(r,`[data-pref="showGrid"]`,e.showGrid,!1),i(r,`[data-pref="gridSizeMM"]`,e.gridSizeMM),i(r,`[data-pref="gridColor"]`,e.gridColor,!1),i(r,`[data-pref="gridOpacity"]`,e.gridOpacity),i(r,`[data-pref="unit"]`,e.unit,!1);return}let a=r.querySelector(`.element-card[data-id="${n}"]`);if(!a)return;let o=e.find(e=>e.id===n);if(!o)return;let s=a.querySelector(`.layer-name`);s&&(s.textContent=o.name||o.type),i(a,`[data-prop="name"]`,o.name,!1),i(a,`[data-prop="position.x"]`,o.position.x),i(a,`[data-prop="position.y"]`,o.position.y),i(a,`[data-prop="rotation"]`,o.rotation),i(a,`[data-prop="opacity"]`,o.opacity),Le(o)&&(i(a,`[data-prop="dimensions.width"]`,o.dimensions.width),i(a,`[data-prop="dimensions.height"]`,o.dimensions.height)),Ne(o)?(i(a,`[data-prop="content"]`,o.content,!1),i(a,`[data-prop="fontSize"]`,o.fontSize),i(a,`[data-prop="lineHeight"]`,o.lineHeight),i(a,`[data-prop="color"]`,o.color,!1),i(a,`[data-prop="fontWeight"]`,o.fontWeight,!1)):Pe(o)?(i(a,`[data-prop="fillColor"]`,o.fillColor,!1),i(a,`[data-prop="strokeColor"]`,o.strokeColor,!1),i(a,`[data-prop="borderRadius"]`,o.borderRadius),i(a,`[data-prop="strokeWidth"]`,o.strokeWidth)):Ie(o)&&(i(a,`[data-prop="style"]`,o.style,!1),i(a,`[data-prop="color"]`,o.color,!1),i(a,`[data-prop="width"]`,o.width),i(a,`[data-prop="radius"]`,o.radius))}updateWarningVisuals(){this.shadowRoot?.querySelectorAll(`.warning-tag`).forEach(e=>{let t=e.getAttribute(`data-warn-id`);e.style.display=t&&this.overflowWarnings.has(t)?`inline`:`none`})}};customElements.define(`element-inspector`,ze);var Be=document.createElement(`template`);Be.innerHTML=`
<style>
  :host {
    --uc-z-index: 9999;
    --uc-backdrop-color: rgba(0, 0, 0, .55);
    --uc-backdrop-blur: 6px;
    --uc-panel-bg: #1c1c22;
    --uc-panel-border: #2e2e38;
    --uc-panel-radius: 16px;
    --uc-panel-shadow: 0 24px 64px rgba(0,0,0,.6), 0 4px 16px rgba(0,0,0,.4);
    --uc-panel-max-width: 420px;
    --uc-font-family: system-ui, -apple-system, sans-serif;
    --uc-color-title: #f0f0f5;
    --uc-color-message: #9090a8;
    --uc-btn-radius: 10px;
    --uc-btn-cancel-bg: transparent;
    --uc-btn-cancel-color: #9090a8;
    --uc-btn-cancel-border: #2e2e38;
    --uc-color-danger: #ef4444;
    --uc-color-warning: #f59e0b;
    --uc-color-info: #3b82f6;
    --uc-transition-duration: 280ms;

    /* interno — calculado via JS */
    --_accent: var(--uc-color-danger);

    display: contents;
    font-family: var(--uc-font-family);
  }

  /* ── Camada de overlay ─────────────────────────────────── */
  #overlay {
    position: fixed;
    inset: 0;
    z-index: var(--uc-z-index);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    visibility: hidden;
    pointer-events: none;
  }

  :host([open]) #overlay {
    visibility: visible;
    pointer-events: auto;
  }

  /* ── Backdrop ──────────────────────────────────────────── */
  #backdrop {
    position: absolute;
    inset: 0;
    background: var(--uc-backdrop-color);
    backdrop-filter: blur(var(--uc-backdrop-blur));
    -webkit-backdrop-filter: blur(var(--uc-backdrop-blur));
    opacity: 0;
    transition: opacity var(--uc-transition-duration) ease;
  }

  :host([open]) #backdrop {
    opacity: 1;
  }

  /* ── Painel ────────────────────────────────────────────── */
  #panel {
    position: relative;
    background: var(--uc-panel-bg);
    border: 1px solid var(--uc-panel-border);
    border-radius: var(--uc-panel-radius);
    box-shadow: var(--uc-panel-shadow);
    max-width: var(--uc-panel-max-width);
    width: 100%;
    padding: 1.5rem;
    transform: scale(.93) translateY(8px);
    opacity: 0;
    transition:
      transform var(--uc-transition-duration) cubic-bezier(.16,1,.3,1),
      opacity   var(--uc-transition-duration) ease;
    will-change: transform, opacity;
  }

  :host([open]) #panel {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  /* ── Linha superior: ícone + textos ────────────────────── */
  #header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  #icon-wrapper {
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--_accent) 12%, transparent);
    color: var(--_accent);
    transition: background var(--uc-transition-duration) ease,
                color     var(--uc-transition-duration) ease;
  }

  #icon-wrapper svg {
    width: 1.35rem;
    height: 1.35rem;
    stroke-width: 2.25;
  }

  #texts {
    flex: 1;
    padding-top: .15rem;
    min-width: 0;
  }

  #title {
    margin: 0 0 .35rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--uc-color-title);
    letter-spacing: -.015em;
    line-height: 1.3;
  }

  #message {
    margin: 0;
    font-size: .875rem;
    color: var(--uc-color-message);
    line-height: 1.6;
    word-break: break-word;
  }

  /* ── Divisor sutil ─────────────────────────────────────── */
  #divider {
    height: 1px;
    background: var(--uc-panel-border);
    margin: 1.25rem 0 1rem;
    opacity: .6;
  }

  /* ── Rodapé com botões ─────────────────────────────────── */
  #footer {
    display: flex;
    justify-content: flex-end;
    gap: .625rem;
  }

  /* ── Base dos botões ───────────────────────────────────── */
  button {
    font-family: inherit;
    font-size: .875rem;
    font-weight: 600;
    border-radius: var(--uc-btn-radius);
    padding: .5rem 1.125rem;
    cursor: pointer;
    transition:
      background  140ms ease,
      color       140ms ease,
      opacity     140ms ease,
      transform   100ms ease,
      box-shadow  140ms ease;
    outline: none;
    line-height: 1;
    white-space: nowrap;
  }

  button:focus-visible {
    outline: 2px solid var(--_accent);
    outline-offset: 3px;
  }

  button:active:not(:disabled) {
    transform: scale(.96);
  }

  /* ── Botão Cancelar ────────────────────────────────────── */
  #btn-cancel {
    background: var(--uc-btn-cancel-bg);
    color: var(--uc-btn-cancel-color);
    border: 1px solid var(--uc-btn-cancel-border);
  }

  #btn-cancel:hover:not(:disabled) {
    background: color-mix(in srgb, var(--uc-btn-cancel-border) 40%, transparent);
    color: var(--uc-color-title);
  }

  /* ── Botão Confirmar ───────────────────────────────────── */
  #btn-ok {
    background: var(--_accent);
    color: #fff;
    border: 1px solid transparent;
    box-shadow: 0 2px 12px color-mix(in srgb, var(--_accent) 35%, transparent);
    min-width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .375rem;
  }

  #btn-ok:hover:not(:disabled) {
    filter: brightness(1.12);
    box-shadow: 0 4px 18px color-mix(in srgb, var(--_accent) 45%, transparent);
  }

  #btn-ok:disabled {
    opacity: .55;
    cursor: not-allowed;
    filter: none;
    box-shadow: none;
  }

  /* ── Badge de contagem regressiva ──────────────────────── */
  #countdown-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: rgba(255,255,255,.25);
    font-size: .7rem;
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
    transition: opacity 200ms ease;
  }

  #countdown-badge[hidden] {
    display: none;
  }
</style>

<div id="overlay" role="dialog" aria-modal="true" aria-labelledby="uc-title" aria-describedby="uc-message">
  <div id="backdrop" part="backdrop"></div>

  <div id="panel" part="panel">
    <div id="header">
      <div id="icon-wrapper" part="icon" aria-hidden="true"></div>
      <div id="texts">
        <p id="title" part="title"></p>
        <p id="message" part="message"></p>
      </div>
    </div>

    <div id="divider" role="separator"></div>

    <div id="footer">
      <button id="btn-cancel" part="btn-cancel" type="button"></button>
      <button id="btn-ok"     part="btn-ok"     type="button">
        <span id="btn-ok-label"></span>
        <span id="countdown-badge" hidden aria-hidden="true"></span>
      </button>
    </div>
  </div>
</div>
`;var Ve={danger:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,warning:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>`,info:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>`},He={danger:`var(--uc-color-danger)`,warning:`var(--uc-color-warning)`,info:`var(--uc-color-info)`},Ue=class extends HTMLElement{#e;#t=null;#n=null;#r=null;#i=0;#a=null;#o={};static observedAttributes=[`open`,`variant`,`title`,`message`,`confirm-text`,`cancel-text`,`countdown`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.appendChild(Be.content.cloneNode(!0)),this.#g()}connectedCallback(){this.#p(),this.#o.overlay.setAttribute(`aria-labelledby`,`uc-title`),this.#o.overlay.setAttribute(`aria-describedby`,`uc-message`),this.#o.title.id=`uc-title`,this.#o.message.id=`uc-message`,this.hasAttribute(`variant`)||this.setAttribute(`variant`,`danger`),this.hasAttribute(`confirm-text`)||this.setAttribute(`confirm-text`,`Confirmar`),this.hasAttribute(`cancel-text`)||this.setAttribute(`cancel-text`,`Cancelar`),this.hasAttribute(`countdown`)||this.setAttribute(`countdown`,`3`)}disconnectedCallback(){this.#y()}attributeChangedCallback(e,t,n){if(t!==n)switch(e){case`open`:n===null?this.#c():this.#s(),c.play(c.enumPresets.SWOOSHIN);break;case`variant`:this.#f(n??`danger`);break;case`title`:this.#o.title.textContent=n??``;break;case`message`:this.#o.message.textContent=n??``;break;case`confirm-text`:this.#o.btnOkLabel.textContent=n??`Confirmar`;break;case`cancel-text`:this.#o.btnCancel.textContent=n??`Cancelar`;break}}ask(e=``,t=``,{variant:n=`danger`,confirmText:r=`Confirmar`,cancelText:i=`Cancelar`,countdown:a=3}={}){return this.#n&&this.#l(!1,{silent:!0}),new Promise(o=>{this.#n=o,this.setAttribute(`variant`,n),this.setAttribute(`title`,e),this.setAttribute(`message`,t),this.setAttribute(`confirm-text`,r),this.setAttribute(`cancel-text`,i),this.setAttribute(`countdown`,String(a)),this.setAttribute(`open`,``)})}dismiss(){this.#l(!1)}#s(){this.#_(`ui-confirm:open`,{variant:this.getAttribute(`variant`)??void 0,title:this.getAttribute(`title`)??void 0,message:this.getAttribute(`message`)??void 0}),this.#u(),requestAnimationFrame(()=>this.#o.btnCancel.focus())}#c(){this.#d(),this.#h()}#l(e,{silent:t=!1}={}){this.#d(),t||this.#_(`ui-confirm:result`,{result:e}),this.removeAttribute(`open`);let n=this.#v;setTimeout(()=>{this.#n&&=(this.#n(e),null),t||this.#_(`ui-confirm:close`,{result:e})},n)}#u(){let e=parseInt(this.getAttribute(`countdown`)??`3`,10);this.#i=Number.isFinite(e)&&e>0?e:0;let t=this.#o.btnOk,n=this.#o.countdownBadge;if(this.#i===0){t.disabled=!1,n.hidden=!0;return}t.disabled=!0,n.hidden=!1,n.textContent=String(this.#i),this.#r=window.setInterval(()=>{--this.#i,this.#i<=0?(this.#d(),t.disabled=!1,n.hidden=!0,t.focus()):n.textContent=String(this.#i)},1e3)}#d(){this.#r!==null&&(clearInterval(this.#r),this.#r=null),this.#o.btnOk.disabled=!1,this.#o.countdownBadge.hidden=!0}#f(e){let t=He[e]??He.danger;this.style.setProperty(`--_accent`,t),this.#o.iconWrapper.innerHTML=Ve[e]??Ve.danger}#p(){this.#t=new AbortController;let{signal:e}=this.#t;this.#o.btnOk.addEventListener(`click`,()=>{this.#o.btnOk.disabled||this.#l(!0)},{signal:e}),this.#o.btnCancel.addEventListener(`click`,()=>this.#l(!1),{signal:e}),this.#o.backdrop.addEventListener(`click`,()=>this.#l(!1),{signal:e}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.hasAttribute(`open`)&&(e.stopPropagation(),this.#l(!1))},{signal:e,capture:!0}),this.#o.overlay.addEventListener(`keydown`,e=>{e.key!==`Tab`||!this.hasAttribute(`open`)||this.#m(e)},{signal:e})}#m(e){let t=Array.from(this.#o.panel.querySelectorAll(`button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])`)).filter(e=>e.offsetParent!==null);if(t.length===0)return;let n=t[0],r=t[t.length-1],i=this.#e.activeElement;e.shiftKey?i===n&&(e.preventDefault(),r.focus()):i===r&&(e.preventDefault(),n.focus())}#h(){this.#a&&`focus`in this.#a&&typeof this.#a.focus==`function`&&this.#a.focus()}#g(){let e=e=>this.#e.getElementById(e);this.#o={overlay:this.#e.querySelector(`#overlay`),backdrop:e(`backdrop`),panel:e(`panel`),iconWrapper:e(`icon-wrapper`),title:e(`title`),message:e(`message`),btnCancel:e(`btn-cancel`),btnOk:e(`btn-ok`),btnOkLabel:e(`btn-ok-label`),countdownBadge:e(`countdown-badge`)}}#_(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get#v(){let e=getComputedStyle(this).getPropertyValue(`--uc-transition-duration`).trim(),t=e.endsWith(`ms`)?parseFloat(e):parseFloat(e)*1e3;return Number.isFinite(t)?t:280}#y(){this.#t?.abort(),this.#d(),this.#n&&=(this.#n(!1),null)}};customElements.define(`ui-confirm`,Ue);var We=(()=>{let e=document.querySelector(`ui-confirm`);return e||(e=document.createElement(`ui-confirm`),document.body.appendChild(e)),e})(),Ge=class extends HTMLElement{templates=[];filter=`all`;abortController=null;isSkeletonRendered=!1;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.loadAndRender()}disconnectedCallback(){this.cleanup()}cleanup(){this.abortController&&=(this.abortController.abort(),null)}async loadAndRender(){this.templates=await N.getTemplates(),this.render()}render(){this.shadowRoot&&(this.isSkeletonRendered||(this.renderSkeleton(),this.isSkeletonRendered=!0,this.attachEventsOnce()),this.updateSidebarUI(),this.renderGrid())}renderSkeleton(){this.shadowRoot.innerHTML=`
    <style>
      :host { display: block; height: 100%; }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { 
        background-color: var(--color-border-ui); 
        border-radius: 99px; 
        border: 2px solid var(--color-canvas); 
      }
      ::-webkit-scrollbar-thumb:hover { background-color: var(--color-accent-primary); }
      
      @keyframes scanline-scroll {
        0% { background-position: 0 0; }
        100% { background-position: 0 4px; }
      }
      .crt-scanline {
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);
        animation: scanline-scroll 0.8s linear infinite;
      }
      
      .cartridge-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 32px;
        position: relative;
        z-index: 10;
      }

      .fade-out {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
        transition: all 0.4s var(--ease-spring);
        pointer-events: none;
      }
    </style>

    <div class="flex h-full w-full -m-6 bg-[#0a0c10] overflow-hidden">
      <aside id="sidebar" class="w-64 border-r border-border-ui bg-surface-solid/40 p-6 flex flex-col gap-6 backdrop-blur-md relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div class="flex items-center gap-2 mb-2 pb-4 border-b border-white/5">
          <ui-icon name="database" class="text-accent-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"></ui-icon>
          <h3 class="font-mono text-[11px] text-text-main uppercase tracking-[0.25em] font-bold">The Vault</h3>
        </div>
        
        <div class="flex flex-col gap-4 mb-4">
          <app-button id="vault-import-btn" variant="primary" style="width: 100%;">
            <ui-icon name="upload"></ui-icon> IMPORT .LABEL
          </app-button>
        </div>

        <div class="flex flex-col gap-2">
          <button id="filter-all" class="filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer" data-filter="all">
            <div class="flex items-center gap-2 pointer-events-none">
              <ui-icon name="grid" size="sm"></ui-icon>
              All Cartridges
            </div>
          </button>

          <button id="filter-recent" class="filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer" data-filter="recent">
            <div class="flex items-center gap-2 pointer-events-none">
              <ui-icon name="clock" size="sm"></ui-icon>
              Recent Activity
            </div>
          </button>
        </div>

        <div class="mt-auto p-4 bg-black/40 rounded-xl border border-border-ui shadow-inner relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent-primary/50 to-transparent"></div>
          <p class="text-[10px] text-text-muted leading-relaxed font-mono">
            <strong class="text-accent-primary uppercase tracking-widest flex items-center gap-1 mb-1">
              <div class="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse"></div> Online
            </strong>
            All designs are securely stored in your local cartrige bays.
          </p>
        </div>
      </aside>
      <main class="flex-1 p-8 md:p-10 overflow-y-auto relative bg-canvas">
        <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 24px 24px;"></div>
        <div id="cartridge-grid" class="cartridge-grid"></div>
      </main>
    </div>
    `}updateSidebarUI(){let e=this.shadowRoot,t=e.getElementById(`filter-all`),n=e.getElementById(`filter-recent`),r=`text-accent-primary bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] scale-[1.02]`,i=`text-text-muted border-transparent hover:text-text-main hover:bg-white/5 hover:translate-x-1`;t&&(t.className=`filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${this.filter===`all`?r:i}`),n&&(n.className=`filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${this.filter===`recent`?r:i}`)}renderGrid(){let e=this.shadowRoot.getElementById(`cartridge-grid`),t=this.filter===`recent`?[...this.templates].sort((e,t)=>t.updatedAt-e.updatedAt):this.templates,n=document.createDocumentFragment(),r=document.createElement(`button`);r.id=`btn-new-template`,r.className=`w-full h-full min-h-65 rounded-2xl border-2 border-dashed border-border-ui bg-black/20 flex flex-col items-center justify-center gap-5 text-text-muted hover:text-accent-primary hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.05)] transition-all duration-500 cursor-pointer group`,r.innerHTML=`
        <div class="w-16 h-16 rounded-full bg-surface-solid border border-border-ui flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-(--ease-spring) relative">
          <ui-icon name="plus" size="sm"></ui-icon>
          <div class="absolute inset-0 rounded-full border border-accent-primary opacity-0 group-hover:animate-ping"></div>
        </div>
        <div class="text-center">
          <span class="block font-mono text-[11px] uppercase tracking-widest font-bold mb-1">New Blueprint</span>
          <span class="text-[9px] font-sans opacity-60">Initialize empty workspace</span>
        </div>
    `,r.onclick=()=>{N.createNewProject(),this.closeVault(),c.play(c.enumPresets.OPEN)},n.appendChild(r),t.forEach(e=>{let t=document.createElement(`div`);t.innerHTML=this.renderCartridgeHtml(e),n.appendChild(t.firstElementChild)}),e.innerHTML=``,e.appendChild(n)}renderCartridgeHtml(e){let t=Me(new Date(e.updatedAt).toISOString(),{isRelative:!0}),n=Me(new Date(e.updatedAt).toISOString(),{includeTime:!0}),r=e.config.widthMM/e.config.heightMM,i=this.getElementSummary(e);return`
    <div class="group relative bg-surface-solid border border-border-ui rounded-2xl overflow-hidden shadow-panel transition-all duration-300 ease-spring hover:border-accent-primary hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_15px_rgba(99,102,241,0.2)]" data-id="${e.id}">
        

        <div class="bg-black w-full h-44 flex items-center justify-center p-6 relative border-b border-border-ui overflow-hidden shadow-inner">
          <img src="${e.thumbnail||``}" 
              class="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.03] z-10" 
              style="aspect-ratio: ${r}; max-width: 100%; max-height: 100%;" />

          <div class="absolute inset-0 z-20 pointer-events-none crt-scanline"></div>
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-all duration-300 z-30">
            <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75 w-[75%]">
              <button class="action-load w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase border border-accent-success text-accent-success bg-accent-success/10 hover:bg-accent-success hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-200 cursor-pointer" data-id="${e.id}">
                <ui-icon name="download" size="sm"></ui-icon> Load Asset
              </button>
            </div>
            
            <div class="flex gap-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100">
              <button class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer bg-black/60 border border-white/10 text-text-muted hover:text-accent-primary hover:border-accent-primary/40 hover:bg-accent-primary/10 transition-all action-export-label" 
                      data-id="${e.id}" title="Exportar para arquivo .label">
                <ui-icon name="download" size="sm"></ui-icon>
              </button>
              <button class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer bg-black/60 border border-white/10 text-text-muted hover:text-white hover:border-white/30 hover:bg-white/10 transition-all action-duplicate" title="Duplicate" data-id="${e.id}">
                <ui-icon name="copy" size="sm"></ui-icon>
              </button>
              <button class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer bg-black/60 border border-white/10 text-text-muted hover:text-accent-danger hover:border-accent-danger/50 hover:bg-accent-danger/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all action-delete" title="Delete" data-id="${e.id}">
                <ui-icon name="trash" size="sm"></ui-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="p-4 bg-surface-solid">
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <h4 class="font-sans text-[13px] font-bold text-text-main truncate group-hover:text-accent-primary transition-colors" title="${K(e.name)}">
              ${K(e.name)}
            </h4>
            
            <!-- INVENTORY COUNTER (Task 68) - RICH TOOLTIP -->
            <ui-tooltip placement="bottom" delay="200">
              <div slot="target" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-mono font-bold text-accent-primary uppercase tracking-tight cursor-help transition-all hover:bg-accent-primary/20">
                <ui-icon name="grid" size="sm"></ui-icon>
                ${i.total} UNITS
              </div>
              <div slot="content" class="w-32.5">
                <div>
                  <span>Inventory Report</span>
                </div>
                <div class="flex flex-col gap-1 mt-1">
                  ${i.rows}
                </div>
              </div>
            </ui-tooltip>
          </div>

          <div class="flex items-center justify-between">
            <span class="px-2 py-1 rounded bg-black/40 border border-white/5 text-[9px] font-mono text-text-muted uppercase tracking-widest shadow-inner flex items-center gap-1" title="Label dimensions in millimeters">
            <ui-icon name="pencil-ruler" size="xs"></ui-icon>
              ${e.config.widthMM} × ${e.config.heightMM}mm
            </span>
            <span class="font-mono text-[9px] text-text-muted/50 uppercase flex items-center gap-1" title="Last updated: ${n}">
              <ui-icon name="clock" size="xs"></ui-icon>
              ${t}
            </span>
          </div>
        </div>
      </div>
    `}getElementSummary(e){let t={text:0,image:0,shape:0,border:0};e.elements.forEach(e=>{let n=e.type;n===`text`?t.text++:n===`image`?t.image++:n===`border`?t.border++:t.shape++});let n=e.elements.length,r=(e,t,n)=>`
      <div class="flex items-center justify-between text-[10px] py-0.5">
        <div class="flex items-center gap-2 text-text-muted">
          <ui-icon name="${e}" size="xs"></ui-icon>
          <span class="font-sans uppercase tracking-tight">${t}</span>
        </div>
        <span class="font-mono text-text-main font-bold">${n}</span>
      </div>
    `,i=``;return t.text>0&&(i+=r(`text`,`Text`,t.text)),t.image>0&&(i+=r(`image`,`Images`,t.image)),t.shape>0&&(i+=r(`rect`,`Shapes`,t.shape)),t.border>0&&(i+=r(`rect`,`Borders`,t.border)),n===0&&(i=`<div class="text-[9px] text-text-muted italic opacity-60 py-1">No layers detected</div>`),{total:n,rows:i}}attachEventsOnce(){let e=this.shadowRoot;this.abortController=new AbortController;let{signal:t}=this.abortController;r.on(`template:saved`,()=>{setTimeout(()=>{this.loadAndRender()},500)}),e.getElementById(`vault-import-btn`)?.addEventListener(`click`,()=>{document.getElementById(`global-import-input`)?.click()}),e.querySelectorAll(`.filter-btn`).forEach(e=>{e.addEventListener(`click`,e=>{this.filter=e.currentTarget.dataset.filter||`all`,c.play(c.enumPresets.TAP),this.render()},{signal:t})}),e.addEventListener(`click`,async e=>{let t=e.target,n=t.closest(`.action-load`),r=t.closest(`.action-duplicate`),i=t.closest(`.action-delete`),a=t.closest(`.action-export-label`);if(a){let e=a.dataset.id,t=this.templates.find(t=>t.id===e);t&&(N.exportToFile(t),c.play(c.enumPresets.SUCCESS))}if(n){let e=n.dataset.id;await N.loadTemplate(e),c.play(c.enumPresets.SUCCESS),this.closeVault()}if(r){let e=r.dataset.id;setTimeout(async()=>{await N.duplicateTemplate(e),c.play(c.enumPresets.TAP),this.loadAndRender()},300)}if(i){let e=i.dataset.id;if(await We.ask(`Excluir template?`,`Esta ação não pode ser desfeita.`,{variant:`danger`,confirmText:`Excluir definitivamente`,cancelText:`Cancelar`,countdown:1})){let n=t.closest(`[data-id]`);n&&n.classList.add(`fade-out`),setTimeout(async()=>{await N.deleteTemplate(e),c.play(c.enumPresets.DELETE),this.loadAndRender()},300)}}},{signal:t})}closeVault(){let e=document.getElementById(`vault-modal`);e&&e.removeAttribute(`open`)}};customElements.define(`vault-gallery`,Ge);var Ke=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.render(),this.setupEvents()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }

        .action-btn:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), var(--shadow-neon-primary);
        }
      </style>

      <div class="p-6 flex flex-col items-center text-center">
        <!-- Ícone Hero -->
        <div class="w-20 h-20 rounded-4xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-8 shadow-neon-primary animate-pulse">
          <ui-icon name="layers" size="lg" class="text-accent-primary"></ui-icon>
        </div>

        <h2 class="font-sans text-3xl font-bold text-text-main mb-3 tracking-tight">Label Forge OS</h2>
        <p class="text-sm text-text-muted mb-10 max-w-md leading-relaxed">
          Bem-vindo ao seu ambiente de precisão técnica. <br>
          <span class="opacity-60 font-mono text-[10px] uppercase tracking-widest">System Status: Ready for Input</span>
        </p>

        <!-- As 3 Ações Principais -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-2">
          
          <!-- NOVO BLUEPRINT -->
          <button id="action-new" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="file-plus" class="text-accent-primary"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-main uppercase tracking-[0.2em] font-bold">New Blueprint</span>
              <span class="text-[9px] text-text-muted opacity-60">Start from defaults</span>
            </div>
          </button>

          <!-- OPEN VAULT -->
          <button id="action-vault" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="package" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.2em] font-bold transition-colors">Open Vault</span>
              <span class="text-[9px] text-text-muted opacity-60">Load saved assets</span>
            </div>
          </button>

          <!-- IMPORT FILE -->
          <button id="action-import" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="upload-cloud" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.2em] font-bold transition-colors">Import File</span>
              <span class="text-[9px] text-text-muted opacity-60">External .label data</span>
            </div>
          </button>

        </div>
      </div>
    `)}setupEvents(){let e=this.shadowRoot;e.getElementById(`action-new`)?.addEventListener(`click`,()=>{N.createNewProject(),this.closeWelcome(),c.play(c.enumPresets.OPEN)}),e.getElementById(`action-vault`)?.addEventListener(`click`,()=>{this.closeWelcome();let e=document.getElementById(`vault-modal`);e&&e.setAttribute(`open`,``),c.play(c.enumPresets.OPEN)}),e.getElementById(`action-import`)?.addEventListener(`click`,()=>{let e=document.getElementById(`global-import-input`);if(e){e.click();let t=()=>{this.closeWelcome(),r.off(`state:change`,t)};r.on(`state:change`,t)}c.play(c.enumPresets.TAP)})}closeWelcome(){let e=document.getElementById(`welcome-modal`);e&&e.removeAttribute(`open`)}};customElements.define(`ui-welcome-screen`,Ke);var q={tutorialSection:[{id:`t1`,title:`Design de Precisão`,content:`O Label Forge OS opera com medidas milimétricas reais. Utilize a Toolbar superior para inserir elementos e o Inspetor à direita para ajustes finos de posição, rotação e tipografia. Seus designs são salvos automaticamente no seu navegador enquanto você trabalha.`,imageDescription:`Visão geral do Cockpit: Canvas centralizado com ferramentas de precisão`},{id:`t2`,title:`Automação de Lote`,content:`Transforme designs estáticos em produção em massa. Ao utilizar chaves como {{nome}} ou {{preco}}, você prepara o terreno para o Gerador de Lote. Importe uma planilha CSV no Cockpit de Produção e o sistema gerará um PDF otimizado com um registro por etiqueta.`,imageDescription:`Integração de dados: Mapeamento de variáveis para impressão em lote`},{id:`t3`,title:`The Vault (Biblioteca)`,content:`Não perca seus ativos. O Vault armazena todos os seus cartuchos de etiquetas localmente. Você pode duplicar projetos para variações rápidas ou carregar designs antigos instantaneamente sem precisar de arquivos externos.`,imageDescription:`The Vault: Sua galeria local de ativos de design`}],faqItens:[{q:`Onde meus arquivos são salvos?`,a:`Tudo é armazenado no banco de dados local do seu navegador (IndexedDB). Não enviamos seus dados para servidores externos, garantindo privacidade total e acesso offline.`},{q:`Como funciona a unidade de medida?`,a:`O sistema utiliza Milímetros (mm) como padrão para garantir que o que você vê na tela seja exatamente o que sairá na impressora, respeitando o DPI configurado.`},{q:`O PDF gerado está em qual tamanho?`,a:`O gerador de lote organiza suas etiquetas automaticamente em folhas A4 (210x297mm), calculando a melhor disposição para evitar desperdício de papel.`}],proTips:[{icon:`sparkles`,tip:`Aperte [Ctrl+/] para ver a lista completa de atalhos e acelerar seu fluxo de trabalho.`},{icon:`move`,tip:`Segure a tecla [Alt] enquanto arrasta com as setas para mover elementos com precisão de 0.1mm.`},{icon:`copy`,tip:`Use [Ctrl+Alt+C] e [Ctrl+Alt+V] para copiar estilos de uma camada para outra instantaneamente.`},{icon:`layers`,tip:`Mantenha camadas importantes bloqueadas [Ctrl+L] para evitar movimentos acidentais durante o design.`}]},qe=class extends HTMLElement{shortcuts=[];searchQuery=``;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}set data(e){this.shortcuts=e,this.render()}get variant(){return this.getAttribute(`variant`)||`default`}get categoryFilter(){return this.getAttribute(`category-filter`)}get enableSearch(){return this.hasAttribute(`enable-search`)&&this.getAttribute(`enable-search`)!==`false`}connectedCallback(){this.render(),this.setupEvents()}setupEvents(){this.shadowRoot?.addEventListener(`input`,e=>{let t=e.target;t.id===`search-input`&&(this.searchQuery=t.value.toLowerCase(),this.renderShortcuts())})}formatKey(e,t){let n=t===`sequence`?e.split(` → `):e.split(`+`),r={arrowup:`↑`,arrowdown:`↓`,arrowleft:`←`,arrowright:`→`,escape:`Esc`,delete:`Del`,backspace:`⌫`,shift:`Shift`,ctrl:`Ctrl`,alt:`Alt`},i=n.map(e=>{let t=e.toLowerCase();return`<kbd class="kbd-prism">${r[t]||(t.length===1?t.toUpperCase():t.charAt(0).toUpperCase()+t.slice(1))}</kbd>`});return t===`longpress`?`${i[0]} <span class="font-mono text-[8px] text-accent-primary uppercase tracking-widest ml-1.5 opacity-80 border border-accent-primary/30 px-1 py-px rounded bg-accent-primary/10">Segure</span>`:t===`sequence`?i.join(`<span class="text-text-muted/50 mx-1 text-[10px]">→</span>`):i.join(`<span class="text-text-muted/50 mx-1 text-[10px]">+</span>`)}getDescription(e){return e.description?e.description:{delete:`Excluir Seleção`,backspace:`Apagar Elemento`}[e.key.toLowerCase()]||`Ação Desconhecida`}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; width: 100%; }

        /* O truque do pontilhado "Menu de Restaurante" para a variante Default */
        .dot-leader {
          flex: 1;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          margin: 0 12px;
          position: relative;
          top: -4px; /* Alinha com o meio do texto */
        }
        
        /* Masonry Layout nativo usando columns */
        .masonry-grid {
          column-count: 1;
          column-gap: 2rem;
        }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }

        /* Scrollbar customizada para se tiver tamanho fixo */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--color-border-ui); border-radius: 4px; }
      </style>

      <div class="shortcut-container w-full h-full flex flex-col text-text-main">
        ${this.variant===`default`&&this.enableSearch?`
          <div class="mb-6 relative">
            <ui-icon name="search" size="sm" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"></ui-icon>
            <input type="text" id="search-input" placeholder="Buscar atalhos..." autocomplete="off"
                   class="w-full bg-black/20 border border-border-ui rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans text-text-main placeholder:text-text-muted outline-none focus:border-accent-primary focus:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all">
          </div>
        `:``}
        
        <div id="shortcuts-wrapper" class="${this.variant===`default`?`masonry-grid`:`flex flex-col gap-1`}">
          <!-- O JS injeta aqui -->
        </div>
      </div>
    `,this.renderShortcuts())}renderShortcuts(){let e=this.shadowRoot?.getElementById(`shortcuts-wrapper`);if(!e)return;let t=this.shortcuts;if(this.searchQuery&&(t=t.filter(e=>this.getDescription(e).toLowerCase().includes(this.searchQuery)||e.key.toLowerCase().includes(this.searchQuery))),this.categoryFilter&&(t=t.filter(e=>e.category.toLowerCase()===this.categoryFilter?.toLowerCase())),t.length===0){e.innerHTML=`<div class="text-center text-text-muted text-xs py-4 font-mono">Nenhum atalho encontrado.</div>`;return}if(this.variant===`slim`){e.innerHTML=t.map(e=>`
        <div class="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded transition-colors">
          <div class="min-w-15 flex justify-end">${this.formatKey(e.sequence||e.key,e.type)}</div>
          <span class="text-[11px] text-text-muted truncate">${K(this.getDescription(e))}</span>
        </div>
      `).join(``);return}let n=t.reduce((e,t)=>(e[t.category]||(e[t.category]=[]),e[t.category].push(t),e),{}),r=``;for(let[e,t]of Object.entries(n))r+=`
        <div class="masonry-item bg-surface-solid/50 border border-border-ui rounded-xl p-5 shadow-panel">
          
          <h3 class="font-mono text-[10px] text-accent-primary uppercase tracking-[0.15em] font-bold mb-4 flex items-center gap-2">
            <ui-icon name="folder" size="sm" class="opacity-80"></ui-icon>
            ${K(e)}
          </h3>
          
          <div class="flex flex-col gap-3.5">
            ${t.map(e=>`
              <div class="flex items-center text-[12px] group">
                <span class="text-text-main group-hover:text-white transition-colors">${K(this.getDescription(e))}</span>
                <span class="dot-leader"></span>
                <span class="shrink-0 flex items-center justify-end">${this.formatKey(e.sequence||e.key,e.type)}</span>
              </div>
            `).join(``)}
          </div>

        </div>
      `;e.innerHTML=r}};customElements.define(`ui-keyboard-shortcuts`,qe);var Je=class extends HTMLElement{activeTab=`guide`;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.render()}setTab(e){this.activeTab=e,this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; height: 100%; }
        .tab-btn.active {
          text-shadow: 0 0 10px rgba(99,102,241,0.5);
        }

        /* FAQ Accordion Juice */
        details summary::-webkit-details-marker { display: none; }
      </style>

      <div class="flex flex-col h-full -m-6 bg-[#0a0c10] overflow-hidden">
        <!-- TABS -->
        <nav class="flex items-center gap-8 px-8 border-b border-border-ui bg-surface-solid/40 backdrop-blur-md">
          <button class="font-mono text-[11px] uppercase tracking-[0.2em] pb-4 pt-6 border-b-2 transition-all duration-300 cursor-pointer ${this.activeTab===`guide`?`border-accent-primary text-text-main font-bold`:`border-transparent text-text-muted hover:text-text-main`}" data-tab="guide">
            Quick Start Guide
          </button>
          <button class="font-mono text-[11px] uppercase tracking-[0.2em] pb-4 pt-6 border-b-2 transition-all duration-300 cursor-pointer ${this.activeTab===`shortcuts`?`border-accent-primary text-text-main font-bold`:`border-transparent text-text-muted hover:text-text-main`}" data-tab="shortcuts">
            Keyboard Shortcuts
          </button>
        </nav>

        <!-- CONTENT -->
        <main class="flex-1 overflow-y-auto p-10 bg-canvas relative">
          <div class="absolute inset-0 pointer-events-none opacity-10" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 32px 32px;"></div>
          
          <div class="relative z-10 max-w-4xl mx-auto">
            ${this.activeTab===`guide`?this.renderGuide():this.renderShortcuts()}
          </div>
        </main>
      </div>
    `,this.setupEvents())}renderGuide(){return`
      <!-- TUTORIAL SECTIONS (Z-Pattern) -->
      <div class="flex flex-col gap-16 mb-16">
        ${q.tutorialSection.map((e,t)=>`
          <div class="flex flex-col md:flex-row gap-10 items-center ${t%2==0?``:`md:flex-row-reverse`}">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/30 font-mono text-xs text-accent-primary font-bold shadow-neon-primary">
                  0${t+1}
                </span>
                <h3 class="font-sans text-xl font-bold text-text-main tracking-tight">${e.title}</h3>
              </div>
              <p class="text-sm text-text-muted leading-relaxed pl-12">
                ${e.content}
              </p>
            </div>

            <div class="flex-1 w-full">
              <div class="aspect-video bg-[#050608] border border-border-ui rounded-2xl overflow-hidden relative flex flex-col items-center justify-center group shadow-panel">
                <div class="absolute inset-0 pointer-events-none opacity-20 crt-scanline" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 12px 12px;"></div>
                <ui-icon name="image" size="2xl" class="text-white/5 group-hover:text-accent-primary/40 transition-all duration-500 group-hover:scale-110"></ui-icon>
                <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] text-center px-8 mt-4 leading-loose opacity-60">
                  ${e.imageDescription}
                </span>
              </div>
            </div>
          </div>
        `).join(``)}
      </div>

      <!-- PRO TIPS GRID -->
      <div class="mb-16 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl p-8 shadow-panel relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div class="flex items-center gap-3 mb-8 pb-4 border-b border-accent-primary/10 relative z-10">
          <ui-icon name="sparkles" class="text-accent-primary fill-accent-primary/20"></ui-icon>
          <h4 class="font-mono text-xs text-accent-primary uppercase tracking-[0.3em] font-bold">Pro-Level Tactics</h4>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
          ${q.proTips.map(e=>`
            <div class="flex gap-4 items-start group">
              <div class="mt-1 p-2 bg-black/40 rounded-xl border border-white/5 shrink-0 group-hover:border-accent-primary/30 transition-colors">
                <ui-icon name="${e.icon}" size="sm" class="text-text-muted group-hover:text-accent-primary transition-colors"></ui-icon>
              </div>
              <p class="text-xs text-text-main leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                ${e.tip}
              </p>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- FAQ ACCORDION -->
      <div class="max-w-2xl">
        <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3 opacity-60">
          <ui-icon name="help" size="sm"></ui-icon>
          Frequent Inquiries
        </h4>
        
        <div class="flex flex-col gap-3">
          ${q.faqItens.map(e=>`
            <details class="group bg-surface-solid/50 border border-border-ui rounded-xl overflow-hidden transition-all duration-300">
              <summary class="flex items-center justify-between p-5 cursor-pointer font-sans text-sm text-text-main font-semibold hover:bg-white/5 transition-colors select-none">
                ${e.q}
                <ui-icon name="chevron-down" size="sm" class="text-text-muted group-open:rotate-180 transition-transform duration-300"></ui-icon>
              </summary>
              <div class="p-5 pt-0 text-sm text-text-muted leading-relaxed border-t border-white/5 bg-black/20">
                ${e.a}
              </div>
            </details>
          `).join(``)}
        </div>
      </div>
    `}renderShortcuts(){return`
      <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ui-keyboard-shortcuts id="shortcut-viewer" enable-search="true"></ui-keyboard-shortcuts>
      </div>
    `}setupEvents(){let e=this.shadowRoot;if(e.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.tab;t!==this.activeTab&&(this.activeTab=t,c.play(c.enumPresets.TAP),this.render())})}),this.activeTab===`shortcuts`){let t=e.getElementById(`shortcut-viewer`);t&&(t.data=I.listShortcuts())}}};customElements.define(`ui-help-center`,Je);var Ye=[`default`,`success`,`danger`,`warning`,`info`],Xe=[`sm`,`md`,`lg`,`xl`,`fullscreen`],Ze=[`fade`,`scale`,`slide`,`flip`],Qe={default:{accent:`#6366f1`,fg:`#fff`,icon:null},success:{accent:`#16a34a`,fg:`#fff`,icon:`✓`},danger:{accent:`#dc2626`,fg:`#fff`,icon:`!`},warning:{accent:`#d97706`,fg:`#fff`,icon:`⚠`},info:{accent:`#0284c7`,fg:`#fff`,icon:`i`}},$e={sm:`28rem`,md:`40rem`,lg:`56rem`,xl:`72rem`,fullscreen:`100vw`};function J(e){return Ye.includes(e)}function Y(e){return Xe.includes(e)}function et(e){return Ze.includes(e)}var tt=`
  :host {
    display: contents;
    --_bg       : var(--modal-bg,       #ffffff);
    --_border   : var(--modal-border,   rgba(0,0,0,.1));
    --_shadow   : var(--modal-shadow,   0 20px 60px rgba(0,0,0,.22));
    --_radius   : var(--modal-radius,   0.875rem);
    --_pad      : var(--modal-padding,  1.75rem);
    --_overlay  : var(--modal-backdrop, rgba(0,0,0,.5));
    --_accent   : var(--modal-accent,   #6366f1);
    --_fg       : var(--modal-accent-fg,#ffffff);
    --_font     : var(--modal-font,     system-ui, sans-serif);
    --_dur      : var(--modal-duration, 280ms);
    --_ease     : var(--modal-easing,   cubic-bezier(.4,0,.2,1));
    --_z        : var(--modal-z,        1000);
  }

  /* ── Overlay ────────────────────────────────────────────────────────── */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--_z);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--_font);
    visibility: hidden;
    pointer-events: none;
  }

  .overlay.is-open {
    visibility: visible;
    pointer-events: auto;
  }

  .overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--_overlay);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    opacity: 0;
    transition: opacity var(--_dur) var(--_ease);
  }

  .overlay.is-open::before    { opacity: 1; }
  .overlay.is-closing::before { opacity: 0; }

  /* ── Painel ─────────────────────────────────────────────────────────── */
  .panel {
    position: relative;
    z-index: 1;
    background: var(--_bg);
    border: 1px solid var(--_border);
    border-radius: var(--_radius);
    box-shadow: var(--_shadow);
    width: min(var(--_width, 40rem), calc(100vw - 2rem));
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: opacity var(--_dur) var(--_ease),
                transform var(--_dur) var(--_ease);
  }

  :host([size="fullscreen"]) .panel {
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }

  /* ── Estados de animação ────────────────────────────────────────────── */
  .panel                      { opacity: 0; }
  .overlay.is-open .panel     { opacity: 1; transform: none; }
  .overlay.is-closing .panel  { opacity: 0; }

  :host([animation="fade"]) .panel,
  :host(:not([animation]))  .panel { transform: none; }

  :host([animation="scale"]) .panel                       { transform: scale(.88); }
  :host([animation="scale"]) .overlay.is-open .panel      { transform: scale(1); }
  :host([animation="scale"]) .overlay.is-closing .panel   { transform: scale(.88); }

  :host([animation="slide"]) .panel                       { transform: translateY(2rem); }
  :host([animation="slide"]) .overlay.is-open .panel      { transform: translateY(0); }
  :host([animation="slide"]) .overlay.is-closing .panel   { transform: translateY(2rem); }

  :host([animation="flip"]) .overlay                      { perspective: 900px; }
  :host([animation="flip"]) .panel                        { transform: rotateX(-16deg) translateY(-1rem); }
  :host([animation="flip"]) .overlay.is-open .panel       { transform: rotateX(0deg) translateY(0); }
  :host([animation="flip"]) .overlay.is-closing .panel    { transform: rotateX(-16deg) translateY(-1rem); }

  @media (prefers-reduced-motion: reduce) {
    .overlay::before, .panel { transition-duration: 1ms !important; }
    .panel { transform: none !important; }
  }

  /* ── Stripe (variante) ──────────────────────────────────────────────── */
  .stripe { height: 4px; flex-shrink: 0; background: var(--_accent); }

  /* ── Header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    align-items: flex-start;
    gap: .75rem;
    padding: var(--_pad) var(--_pad) 0;
    flex-shrink: 0;
  }

  .icon-badge {
    width: 2rem; height: 2rem;
    border-radius: 50%;
    background: var(--_accent);
    color: var(--_fg);
    display: grid;
    place-items: center;
    font-size: .85rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .icon-badge:empty { display: none; }

  .title-wrap { flex: 1; min-width: 0; }

  .title { font-size: 1.1rem; font-weight: 700; color: #111; line-height: 1.3; }

  .close-btn {
    all: unset;
    cursor: pointer;
    width: 2rem; height: 2rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #888;
    font-size: 1.1rem;
    flex-shrink: 0;
    transition: background .15s, color .15s;
    user-select: none;
    -webkit-user-select: none;
  }

  .close-btn:hover         { background: rgba(0,0,0,.07); color: #222; }
  .close-btn:focus-visible { outline: 2px solid var(--_accent); outline-offset: 2px; }

  /* ── Body ───────────────────────────────────────────────────────────── */
  .body {
    flex: 1;
    padding: var(--_pad);
    overflow-y: auto;
    font-size: .9375rem;
    line-height: 1.6;
    color: #374151;
    overscroll-behavior: contain;
  }

  /* ── Footer ─────────────────────────────────────────────────────────── */
  .footer {
    padding: 1rem var(--_pad) var(--_pad);
    border-top: 1px solid var(--_border);
    flex-shrink: 0;
  }

  .footer.hidden { display: none; }

  /* ── Bottom-sheet em mobile ─────────────────────────────────────────── */
  @media (max-width: 480px) {
    .overlay { align-items: flex-end; }
    .panel {
      width: 100vw !important;
      max-height: 92vh !important;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    :host([animation="slide"]) .panel                      { transform: translateY(100%); }
    :host([animation="slide"]) .overlay.is-open .panel     { transform: translateY(0); }
    :host([animation="slide"]) .overlay.is-closing .panel  { transform: translateY(100%); }
  }
`,nt=`
  <div class="overlay"aria-hidden="true" aria-labelledby="modal-title" aria-describedby="modal-body" part="dialog">

    <div class="panel" role="dialog" aria-modal="true"  part="panel">
      <div class="stripe" aria-hidden="true"></div>

      <header class="header" part="header">
        <span class="icon-badge" aria-hidden="true"></span>
        <div class="title-wrap">
          <slot name="header">
            <span id="modal-title" class="title" part="title"></span>
          </slot>
        </div>
        <button class="close-btn" part="close-btn"
                aria-label="Fechar modal" type="button">✕</button>
      </header>

      <div id="modal-body" class="body" part="body">
        <slot></slot>
      </div>

      <footer class="footer hidden" part="footer">
        <slot name="footer"></slot>
      </footer>
    </div>

  </div>
`,rt=`a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),details>summary`,it=class extends HTMLElement{#e;#t;#n=null;#r;#i;#a;#o;#s;#c;#l;#u=!1;#d=!1;#f=null;static observedAttributes=[`variant`,`size`,`animation`,`heading`,`open`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#t=this.attachInternals();let e=new CSSStyleSheet;e.replaceSync(tt),this.#e.adoptedStyleSheets=[e],this.#e.innerHTML=nt,this.#m()}connectedCallback(){if(this.#d)return;this.#d=!0,this.#n=new AbortController;let e=this.#n.signal;this.#a.addEventListener(`click`,()=>this.close(),{signal:e}),this.#r.addEventListener(`click`,e=>{e.target===this.#r&&this.#b()},{signal:e}),this.#l.addEventListener(`slotchange`,()=>{let e=this.#l.assignedNodes({flatten:!0}).length>0;this.#c.classList.toggle(`hidden`,!e)},{signal:e}),this.#r.addEventListener(`keydown`,e=>{if(e.key===`Escape`){e.preventDefault(),this.#b();return}e.key===`Tab`&&this.#C(e)},{signal:e}),this.#h()}disconnectedCallback(){this.#d=!1,this.#n?.abort()}attributeChangedCallback(e,t,n){if(t!==n)switch(e){case`variant`:this.#g(n);break;case`size`:this.#_(n);break;case`animation`:break;case`heading`:this.#o.textContent=n??``;break;case`open`:{let e=n!==null;e&&!this.#p&&!this.#u&&this.#v(),!e&&this.#p&&!this.#u&&this.#y(),c.play(c.enumPresets.SWOOSHIN);break}}}open(){this.#p||this.#u||this.setAttribute(`open`,``)}close(){!this.#p||this.#u||this.removeAttribute(`open`)}toggle(){this.#p?this.close():this.open()}get isOpen(){return this.#p}get variant(){let e=this.getAttribute(`variant`);return J(e)?e:`default`}set variant(e){this.setAttribute(`variant`,J(e)?e:`default`)}get size(){let e=this.getAttribute(`size`);return Y(e)?e:`md`}set size(e){this.setAttribute(`size`,Y(e)?e:`md`)}get animation(){let e=this.getAttribute(`animation`);return et(e)?e:`scale`}set animation(e){this.setAttribute(`animation`,et(e)?e:`scale`)}get heading(){return this.getAttribute(`heading`)??``}set heading(e){this.setAttribute(`heading`,e)}addEventListener(e,t,n){super.addEventListener(e,t,n)}removeEventListener(e,t,n){super.removeEventListener(e,t,n)}get#p(){return this.#r.classList.contains(`is-open`)}#m(){let e=e=>this.#e.querySelector(e);this.#r=e(`.overlay`),this.#i=e(`.panel`),this.#a=e(`.close-btn`),this.#o=e(`#modal-title`),this.#s=e(`.icon-badge`),this.#c=e(`.footer`),this.#l=e(`slot[name="footer"]`)}#h(){this.hasAttribute(`variant`)&&this.#g(this.getAttribute(`variant`)),this.hasAttribute(`size`)&&this.#_(this.getAttribute(`size`)),this.hasAttribute(`heading`)&&(this.#o.textContent=this.getAttribute(`heading`)),this.hasAttribute(`open`)&&this.#v()}#g(e){let t=Qe[J(e)?e:`default`],n=this.#e.host;n.style.setProperty(`--_accent`,t.accent),n.style.setProperty(`--_fg`,t.fg),this.#s.textContent=t.icon??``}#_(e){let t=Y(e)?e:`md`;this.#i.style.setProperty(`--_width`,$e[t])}#v(){this.#u=!0,this.#f=document.activeElement,this.#r.classList.add(`is-open`),this.#r.removeAttribute(`aria-hidden`),this.#t.states?.add(`open`),r.emit(`ui:modal:open`,{id:this.id}),requestAnimationFrame(()=>{(this.#T()??this.#a).focus(),this.#u=!1}),this.#S(`ui-modal:open`)}#y(e=!1){this.#u=!0,this.#r.classList.replace(`is-open`,`is-closing`);let t=this.#x(getComputedStyle(this.#r).getPropertyValue(`--_dur`));setTimeout(()=>{this.#r.classList.remove(`is-closing`),this.#r.setAttribute(`aria-hidden`,`true`),this.#t.states?.delete(`open`),this.#u=!1,this.#f?.focus?.(),this.#f=null,r.emit(`ui:modal:close`,{id:this.id}),e&&this.#S(`ui-modal:cancel`),this.#S(`ui-modal:close`)},t)}#b(){!this.#p||this.#u||this.removeAttribute(`open`)}#x(e){let t=e.trim().match(/^(\d+(?:\.\d+)?)(ms|s)?$/);if(!t||t[1]===void 0)return 280;let n=parseFloat(t[1]);return(t[2]??`ms`)===`s`?n*1e3:n}#S(e){let t={modal:this};this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}#C(e){let t=this.#w();if(!t.length){e.preventDefault(),this.#a.focus();return}let n=t[0],r=t[t.length-1],i=this.#e.activeElement instanceof HTMLSlotElement?document.activeElement:this.#e.activeElement;if(!i||!t.includes(i)){e.preventDefault(),n.focus();return}e.shiftKey&&i===n?(e.preventDefault(),r.focus()):!e.shiftKey&&i===r&&(e.preventDefault(),n.focus())}#w(){return[...Array.from(this.#e.querySelectorAll(rt)),...Array.from(this.querySelectorAll(rt))]}#T(){return this.#w().find(e=>e!==this.#a)??null}};customElements.define(`ui-modal`,it);var at=1500,ot=2e3,X={copy:`<ui-icon name="copy"  size="xs"></ui-icon>`,check:`<ui-icon name="check-circle" size="xs"></ui-icon>`,error:`<ui-icon name="alert-circle" size="xs"></ui-icon>`},st={missing:`variável ausente no template`,used:`variável mapeada`,default:`variável disponível`},ct=document.createElement(`template`);ct.innerHTML=`
  <style>
    :host {
      display: inline-flex;
      cursor: pointer;
      outline: none;
      --badge-transition-duration: 200ms;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* ── Root ── */
    [part="root"] {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid transparent;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1;
      user-select: none;
      transition:
        background-color var(--badge-transition-duration) ease,
        border-color     var(--badge-transition-duration) ease,
        color            var(--badge-transition-duration) ease,
        transform        200ms var(--ease-spring),
        box-shadow       var(--badge-transition-duration) ease;
    }

    /* ── Estados base ── */
    :host([state="default"]) [part="root"],
    :host(:not([state]))     [part="root"] {
      background-color: rgba(99, 102, 241, 0.10);
      border-color:     rgba(99, 102, 241, 0.20);
      color:            #6366f1;
    }

    :host([state="missing"]) [part="root"] {
      background-color: rgba(244, 63, 94, 0.10);
      border-color:     rgba(244, 63, 94, 0.20);
      color:            #f43f5e;
      opacity: 0.65;
    }

    :host([state="used"]) [part="root"] {
      background-color: rgba(16, 185, 129, 0.10);
      border-color:     rgba(16, 185, 129, 0.25);
      color:            #10b981;
    }

    /* ── Hover ── */
    :host([state="default"]:hover) [part="root"],
    :host(:not([state]):hover)     [part="root"] {
      background-color: rgba(99, 102, 241, 0.18);
      border-color:     rgba(99, 102, 241, 0.45);
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.20);
      transform: translateY(-1px);
    }

    :host([state="missing"]:hover) [part="root"] {
      background-color: rgba(244, 63, 94, 0.18);
      border-color:     rgba(244, 63, 94, 0.45);
      box-shadow: 0 0 10px rgba(244, 63, 94, 0.20);
      transform: translateY(-1px);
      opacity: 0.85;
    }

    :host([state="used"]:hover) [part="root"] {
      background-color: rgba(16, 185, 129, 0.18);
      border-color:     rgba(16, 185, 129, 0.45);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.20);
      transform: translateY(-1px);
    }

    /* ── Active (tátil) ── */
    :host(:active) [part="root"] {
      transform: scale(0.93) translateY(0);
      transition-duration: 80ms;
    }

    /* ── Focus-visible (acessibilidade teclado) ── */
    :host(:focus-visible) [part="root"] {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }
    :host([state="missing"]:focus-visible) [part="root"] { outline-color: #f43f5e; }
    :host([state="used"]:focus-visible)    [part="root"] { outline-color: #10b981; }

    /* ── Ícone (oculto por padrão, visível no hover/focus/feedback) ── */
    [part="icon"] {
      display: none;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      --icon-size: 10px;
      transition:
        opacity  150ms ease,
        transform 200ms var(--ease-spring);
    }

    :host(:hover)         [part="icon"],
    :host(:focus-visible) [part="icon"] {
      display: inline-flex;
    }

    /* ── Feedback: copiado ── */
    :host([data-copied]) [part="root"] {
      background-color: rgba(16, 185, 129, 0.15) !important;
      border-color:     rgba(16, 185, 129, 0.50) !important;
      color:            #10b981 !important;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.25) !important;
      transform: scale(1.04) !important;
    }

    :host([data-copied]) [part="icon"] {
      display: inline-flex;
      transform: scale(1.2);
    }

    /* ── Feedback: erro ── */
    :host([data-error]) [part="root"] {
      background-color: rgba(244, 63, 94, 0.15) !important;
      border-color:     rgba(244, 63, 94, 0.50) !important;
      color:            #f43f5e !important;
      box-shadow: 0 0 12px rgba(244, 63, 94, 0.25) !important;
      opacity: 1 !important;
    }

    :host([data-error]) [part="icon"] {
      display: inline-flex;
    }

    /* ── Slot ── */
    ::slotted(*) { pointer-events: none; }
  </style>

  <span part="root" role="button" tabindex="0">
    <span part="label"><slot></slot></span>
    <span part="icon" aria-hidden="true">${X.copy}</span>
  </span>
`;var lt=class extends HTMLElement{#e;#t=null;#n=null;#r;#i;#a;static observedAttributes=[`state`];constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.appendChild(ct.content.cloneNode(!0)),this.#r=this.#e.querySelector(`[part="root"]`),this.#i=this.#e.querySelector(`[part="icon"]`),this.#a=this.#e.querySelector(`slot`)}connectedCallback(){this.#t=new AbortController;let{signal:e}=this.#t;this.#r.addEventListener(`click`,()=>this.#s(),{signal:e}),this.#r.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.#s())},{signal:e}),this.#a.addEventListener(`slotchange`,()=>this.#l(),{signal:e}),this.#l()}disconnectedCallback(){this.#t?.abort(),this.#t=null,this.#n!==null&&(clearTimeout(this.#n),this.#n=null)}attributeChangedCallback(e,t,n){e===`state`&&t!==n&&this.#l()}get state(){return this.getAttribute(`state`)??`default`}set state(e){this.setAttribute(`state`,e)}#o(){return this.#a.assignedNodes({flatten:!0}).map(e=>e.textContent??``).join(``).trim()}async#s(){let e=this.#o();if(e)try{await navigator.clipboard.writeText(e),this.#c(`copied`),this.dispatchEvent(new CustomEvent(`ui-badge-copied`,{detail:{value:e},bubbles:!0,composed:!0}))}catch(e){this.#c(`error`),console.warn(`[ui-variable-badge] Falha ao copiar para área de transferência:`,e),this.dispatchEvent(new CustomEvent(`ui-badge-copy-error`,{detail:{reason:e},bubbles:!0,composed:!0}))}}#c(e){this.#n!==null&&(clearTimeout(this.#n),this.removeAttribute(`data-copied`),this.removeAttribute(`data-error`));let t=e===`copied`,n=t?at:ot,r=t?`data-copied`:`data-error`,i=t?`Copiado!`:`Falha ao copiar`;this.#r.setAttribute(`aria-pressed`,`true`),this.#i.innerHTML=t?X.check:X.error,this.setAttribute(r,``),this.#r.setAttribute(`aria-label`,i),this.#n=setTimeout(()=>{this.removeAttribute(r),this.#i.innerHTML=X.copy,this.#r.setAttribute(`aria-pressed`,`false`),this.#l(),this.#n=null},n)}#l(){let e=this.#o(),t=st[this.state]??`variável`,n=`${e||`badge`} — ${t}. Clique para copiar.`;this.#r.setAttribute(`aria-label`,n),this.#r.setAttribute(`aria-pressed`,`false`)}};customElements.define(`ui-variable-badge`,lt);var ut=class extends HTMLElement{dataList=[];currentFileName=``;dataFields=[];labelPlaceholders=[];a4Config={marginMM:10,gapMM:5,columns:2,showCropMarks:!0,zoom:.45};isDragging=!1;constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[W])}connectedCallback(){this.render()}refreshLabelPlaceholders(){let e=b.getState().currentLabel;if(!e)return;let t=new Set,n=/\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;e.elements.forEach(e=>{if(e.type===u.TEXT&&e.content){let r=e.content,i;for(;(i=n.exec(r))!==null;)t.add(i[1].trim())}}),this.labelPlaceholders=Array.from(t)}render(){if(!this.shadowRoot)return;this.refreshLabelPlaceholders();let e=this.isDragging?`drop-zone dragging`:`drop-zone`;this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; height: 100%; }
      </style>

      <div class="studio-container">
        <div class="studio-main">
          <!-- SIDEBAR: Controls & Upload -->
          <div class="studio-sidebar">
            
            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">1. Data Source</h4>
              
              <!-- Upload Zone or File Info -->
              <div id="upload-container">
                ${this.currentFileName?`
                    <div class="w-full p-4 bg-accent-success/10 border border-accent-success/20 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                      <div class="flex items-center gap-3">
                        <ui-icon name="text" style="color: var(--color-accent-success)"></ui-icon>
                        <div class="flex flex-col">
                          <span class="text-xs font-semibold truncate max-w-45">${this.currentFileName}</span>
                          <span class="text-[10px] text-text-muted">${this.dataList.length} records detected</span>
                        </div>
                      </div>
                      <button class="p-1.5 rounded-lg hover:bg-accent-danger/20 text-accent-danger transition-colors cursor-pointer" id="btn-remove-file" title="Remove file">
                        <ui-icon name="trash" size="md"></ui-icon>
                      </button>
                    </div>
                  `:`
                    <div id="drop-zone" class="${e}">
                      <ui-icon name="text" style="transform: scale(1.5); opacity: 0.5"></ui-icon>
                      <div style="text-align: center">
                        <span style="display: block; font-size: 12px; font-weight: 600;">Drop CSV | JSON | TXT</span>
                        <span style="font-size: 10px; color: var(--color-text-muted);">or click to browse</span>
                      </div>
                      <input type="file" id="file-input" accept=".csv,.json,.txt" style="display: none;">
                    </div>
                  `}
              </div>

              <!-- Available Data Fields (from uploaded file) -->
              ${this.dataFields.length>0?`
                <div class="mt-2">
                  <span class="label-prism" style="font-size: 8px">Fields available in file:</span>
                  <div class="flex flex-wrap gap-2 mb-2">
                    ${this.dataFields.map(e=>`<ui-variable-badge state="${this.labelPlaceholders.includes(e)?`used`:`missing`}">
                          ${K(e)}
                        </ui-variable-badge>`).join(``)}
                  </div>
                </div>
              `:``}

              <!-- Placeholders needed by Label -->
              ${this.labelPlaceholders.length>0?`
                <div class="mt-1">
                  <span class="label-prism" style="font-size: 8px">Variables needed by template:</span>
                  <div class="flex flex-wrap gap-2 mb-2">
                    ${this.labelPlaceholders.map(e=>{let t=this.dataFields.includes(e);return`<span class="variable-badge ${t?``:`missing`}">
                        {{${K(e)}}} ${t?``:`⚠️`}
                      </span>`}).join(``)}
                  </div>
                </div>
              `:``}
            </div>

            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">2. A4 Page Layout</h4>
              <div class="grid grid-cols-2 gap-4">
                <ui-number-scrubber id="cfg-cols" label="COL" value="${this.a4Config.columns}" min="1" max="10" step="1.0" unit="Col"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-gap" label="GAP" value="${this.a4Config.gapMM}" min="0" max="50" step="1.0" unit="mm"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-margin" label="MAR" value="${this.a4Config.marginMM}" min="0" max="50" step="1.0" unit="mm"></ui-number-scrubber>
                
                <div class="flex flex-col justify-center items-center bg-black/20 rounded-lg p-2 border border-border-ui/50">
                   <span class="label-prism" style="margin-bottom: 4px; font-size: 8px;">Crop Marks</span>
                   <input type="checkbox" id="cfg-crop" ${this.a4Config.showCropMarks?`checked`:``}>
                </div>
              </div>
            </div>

            <!-- Data Summary -->
            <div class="data-preview-container" id="data-summary-box">
               ${this.dataList.length>0?``:`<div class="status-badge">Waiting for data...</div>`}
            </div>
          </div>

          <!-- MAIN PREVIEW: A4 Sheet -->
          <div class="studio-preview">
            <div class="absolute bottom-6 right-10 z-20 flex items-center gap-3 bg-surface-solid/80 backdrop-blur-md p-2 px-4 rounded-2xl border border-border-ui shadow-panel">
              <ui-number-scrubber id="cfg-zoom" label="Zoom" value="${Math.round(this.a4Config.zoom*100)}" min="10" max="200" step="5.0" unit="%"></ui-number-scrubber>
            </div>

            <div class="a4-viewport">
              <div id="a4-sheet" class="a4-sheet" style="
                --a4-margin: ${this.a4Config.marginMM}mm;
                --a4-gap: ${this.a4Config.gapMM}mm;
                --a4-cols: ${this.a4Config.columns};
                transform: scale(${this.a4Config.zoom});
              ">
                <!-- Labels will be injected here -->
              </div>
            </div>
          </div>
        </div>

        <div class="studio-footer">
          <div class="flex items-center gap-6">
             <div class="status-badge" id="batch-summary">
               ${this.dataList.length>0?`BATCH SIZE: ${this.dataList.length} UNITS`:`READY TO PROCESS`}
             </div>
             ${this.dataList.length>0?`<div class="status-badge" style="color: var(--color-accent-primary)">ESTIMATED PAGES: ${Math.ceil(this.dataList.length/12)}</div>`:``}
          </div>
          <div style="display: flex; gap: 12px;">
            <app-button id="btn-close" variant="secondary">CLOSE STUDIO</app-button>
            <app-button id="btn-generate" variant="success" style="padding: 0 40px;">
              ⚡ GENERATE PDF
            </app-button>
          </div>
        </div>
      </div>
    `,this.attachEvents(),this.dataList.length>0&&this.updateDataSummary(),this.updatePreview()}attachEvents(){let e=this.shadowRoot,t=e.getElementById(`drop-zone`),n=e.getElementById(`file-input`),i=e.getElementById(`btn-remove-file`);t&&(t.addEventListener(`click`,()=>n.click()),t.addEventListener(`dragover`,e=>{e.preventDefault(),this.isDragging||(this.isDragging=!0,t.classList.add(`dragging`))}),t.addEventListener(`dragleave`,e=>{e.preventDefault(),this.isDragging=!1,t.classList.remove(`dragging`)}),t.addEventListener(`drop`,e=>{e.preventDefault(),this.isDragging=!1,t.classList.remove(`dragging`);let n=e.dataTransfer?.files[0];n&&this.handleFile(n)})),n&&n.addEventListener(`change`,()=>{let e=n.files?.[0];e&&this.handleFile(e)}),i&&i.addEventListener(`click`,()=>{this.dataList=[],this.dataFields=[],this.currentFileName=``,c.play(c.enumPresets.DELETE),this.render()}),this.setupConfigListeners(e),e.getElementById(`cfg-crop`)?.addEventListener(`change`,e=>{this.a4Config.showCropMarks=e.target.checked,this.updatePreview()}),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>{let e=document.getElementById(`batch-modal`);e&&e.removeAttribute(`open`)}),e.getElementById(`btn-generate`)?.addEventListener(`click`,async()=>{if(this.dataList.length===0){r.emit(`notify`,{type:`warning`,message:`Upload a data source first.`});return}let e=this.labelPlaceholders.filter(e=>!this.dataFields.includes(e));e.length>0&&r.emit(`notify`,{type:`warning`,message:`Warning: Labels need {{${e.join(`}}, {{`)}}}, but these fields weren't found in your file.`});let{pdfGenerator:t}=await y(async()=>{let{pdfGenerator:e}=await import(`./PDFGenerator-C6DsuxCf.js`);return{pdfGenerator:e}},__vite__mapDeps([4,5,6]),import.meta.url),n=b.getState().currentLabel;n&&(c.play(c.enumPresets.SUCCESS),await t.generateLotePDF(n,this.dataList,this.a4Config))})}setupConfigListeners(e){Object.entries({"cfg-cols":e=>{this.a4Config.columns=e||1,this.updatePreview()},"cfg-gap":e=>{this.a4Config.gapMM=e||0,this.updatePreview()},"cfg-margin":e=>{this.a4Config.marginMM=e||0,this.updatePreview()},"cfg-zoom":t=>{this.a4Config.zoom=(t||45)/100;let n=e.getElementById(`a4-sheet`);n.style.transform=`scale(${this.a4Config.zoom})`}}).forEach(([t,n])=>{let r=e.getElementById(t);if(!r)return;let i=e=>n(e.detail.value);r.addEventListener(`change`,i),r.addEventListener(`input`,i)})}async handleFile(e){try{this.currentFileName=e.name;let t=await this.parseFileByExtension(e);if(t&&t.length>0)this.dataFields=Object.keys(t[0]),this.dataList=t,c.play(c.enumPresets.NOTIFY),this.render(),r.emit(`notify`,{type:`success`,message:`${t.length} records loaded successfully.`});else throw Error(`The file is empty or invalid.`)}catch(e){this.currentFileName=``,this.dataList=[],c.play(c.enumPresets.WARNING),r.emit(`notify`,{type:`error`,message:e.message}),this.render()}}async parseFileByExtension(e){let t=e.name.slice(e.name.lastIndexOf(`.`)).toLowerCase();if(t===`.csv`)return C.parseCSV(e);if(t===`.json`)return C.parseJSON(e);if(t===`.txt`)return C.parseTXT(e);throw Error(`Unsupported format: ${t}`)}updateDataSummary(){let e=this.shadowRoot.getElementById(`data-summary-box`);if(!this.dataList.length)return;let t=Object.keys(this.dataList[0]),n=t.slice(0,4);e.innerHTML=`
      <div class="flex flex-col gap-3 animate-in fade-in duration-500">
        <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">Data Preview (First 3)</h4>
        <div class="overflow-x-auto border border-border-ui/30 rounded-lg">
          <table class="data-mini-table">
            <thead>
              <tr>${n.map(e=>`<th>${K(e)}</th>`).join(``)}${t.length>4?`<th>...</th>`:``}</tr>
            </thead>
            <tbody>
              ${this.dataList.slice(0,3).map(e=>`
                <tr>
                  ${n.map(t=>`<td>${K(String(e[t]))}</td>`).join(``)}
                  ${t.length>4?`<td class="text-text-muted">...</td>`:``}
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}updatePreview(){let e=this.shadowRoot.getElementById(`a4-sheet`),t=b.getState().currentLabel;if(e.style.setProperty(`--a4-margin`,`${this.a4Config.marginMM}mm`),e.style.setProperty(`--a4-gap`,`${this.a4Config.gapMM}mm`),e.style.setProperty(`--a4-cols`,`${this.a4Config.columns}`),!t||this.dataList.length===0){e.innerHTML=`
        <div style="grid-column: 1/-1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; font-family: var(--font-mono); opacity: 0.2; text-transform: uppercase;">
          <ui-icon name="image" style="--icon-size: 80px; margin-bottom: 20px;"></ui-icon>
          <span style="font-size: 24px; letter-spacing: 0.5em;">Cockpit Preview</span>
        </div>
      `;return}e.innerHTML=``;let n=210-this.a4Config.marginMM*2,r=297-this.a4Config.marginMM*2,i=t.config.widthMM,a=t.config.heightMM,o=Math.floor((n+this.a4Config.gapMM)/(i+this.a4Config.gapMM)),s=Math.floor((r+this.a4Config.gapMM)/(a+this.a4Config.gapMM)),c=Math.min(this.a4Config.columns,o||1)*(s||1);this.dataList.slice(0,c).forEach(n=>{let r=document.createElement(`div`);r.className=`label-artboard`,r.style.width=`${t.config.widthMM}mm`,r.style.height=`${t.config.heightMM}mm`,r.style.boxShadow=`0 4px 12px rgba(0,0,0,0.1)`,r.style.border=`1px solid rgba(0,0,0,0.05)`;let i=document.createElement(`canvas`);r.appendChild(i),e.appendChild(r),this.renderLabelThumb(i,t,n)})}renderLabelThumb(e,t,n){let r=e.getContext(`2d`),i=1.2,a=t.config.dpi||m.CANVAS.dpi;e.width=t.config.widthMM*(a/25.4)*(i/4),e.height=t.config.heightMM*(a/25.4)*(i/4),e.width=t.config.widthMM*2,e.height=t.config.heightMM*2,e.style.width=`100%`,e.style.height=`100%`,r.fillStyle=t.config.backgroundColor||m.CANVAS.backgroundColor,r.fillRect(0,0,e.width,e.height);let o=e.width/t.config.widthMM;t.elements.forEach(e=>{k.render(e,{ctx:r,scale:o,dpi:a,data:n})})}};customElements.define(`data-source-input`,ut);var dt=new CSSStyleSheet;dt.replaceSync(`
  /* ── Host ── */
  :host {
    display: block;
    z-index: var(--hud-z-index, 40);
    pointer-events: auto;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* ── Banner Pill ── */
  .hud-banner {
    display:         flex;
    align-items:     center;
    gap:             10px;
    padding:         6px 14px 6px 10px;
    border-radius:   9999px;
    cursor:          default;
    user-select:     none;
    background:      var(--hud-ghost-bg, rgba(10, 12, 16, 0.25));
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border:          1px solid var(--hud-border-ghost, rgba(255, 255, 255, 0.05));
    transition:
      background     0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      border-color   0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      box-shadow     0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      transform      0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
    will-change: transform, box-shadow;
  }

  /* Estado foco (hover real + foco de teclado) */
  .hud-banner:hover,
  .hud-banner:focus-within {
    background:    var(--hud-focus-bg, rgba(22, 25, 32, 0.95));
    border-color:  var(--hud-border-focus, rgba(99, 102, 241, 0.45));
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.55),
      0 0 18px var(--hud-glow-color, rgba(99, 102, 241, 0.18));
    transform: translateY(-2px);
  }

  /* ── Ícone de lâmpada ── */
  .hud-icon {
    flex-shrink: 0;
    width:   14px;
    height:  14px;
    opacity: 0.45;
    color:   var(--color-accent-primary, #6366f1);
    transition: opacity 0.3s ease, transform 0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }

  .hud-banner:hover .hud-icon,
  .hud-banner:focus-within .hud-icon {
    opacity: 1;
    transform: scale(1.15) rotate(-8deg);
  }

  /* ── Viewport de texto (máscara de overflow) ── */
  .tip-viewport {
    position:   relative;
    overflow:   hidden;
    height:     18px;
    display:    flex;
    align-items: center;
    min-width:  120px;
    max-width:  520px;
  }

  /* ── Linha de texto ── */
  .tip-text {
    display:     inline-flex;
    align-items: center;
    gap:         4px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size:   12px;
    line-height: 1;
    white-space: nowrap;
    color:       var(--color-text-muted, rgba(148, 163, 184, 0.5));
    transition:
      color     0.3s ease,
      transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity   0.45s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }

  .hud-banner:hover .tip-text,
  .hud-banner:focus-within .tip-text {
    color: var(--color-text-main, rgba(226, 232, 240, 0.9));
  }

  /* Estados de animação (aplicados via JS) */
  .tip-text[data-state="visible"] {
    transform: translateY(0);
    opacity:   1;
  }

  .tip-text[data-state="exit-up"] {
    transform: translateY(-110%);
    opacity:   0;
  }

  .tip-text[data-state="enter-from-bottom"] {
    transform: translateY(110%);
    opacity:   0;
  }

  /* ── Prefixo "Dica:" ── */
  .tip-prefix {
    text-transform:  uppercase;
    letter-spacing:  0.08em;
    font-weight:     700;
    color:           var(--color-accent-primary, #6366f1);
    opacity:         0.75;
    margin-right:    4px;
    flex-shrink:     0;
  }

  .hud-banner:hover .tip-prefix,
  .hud-banner:focus-within .tip-prefix {
    opacity: 1;
  }

  /* ── KBD Inline ── */
  .kbd-hud {
    display:        inline-flex;
    align-items:    center;
    justify-content: center;
    font-family:    var(--font-mono, 'JetBrains Mono', monospace);
    font-size:      10px;
    font-weight:    600;
    line-height:    1;
    padding:        1px 4px;
    border-radius:  3px;
    background:     rgba(99, 102, 241, 0.12);
    border:         1px solid rgba(99, 102, 241, 0.35);
    border-bottom:  2px solid rgba(99, 102, 241, 0.5);
    color:          var(--color-accent-primary, #6366f1);
    vertical-align: middle;
    white-space:    nowrap;
    flex-shrink:    0;
    box-shadow:     0 1px 0 rgba(0,0,0,0.4);
  }

  /* KBD para tecla única (pressionamento longo) — destaque diferente */
  .kbd-hud[data-type="single"] {
    background:  rgba(245, 158, 11, 0.10);
    border-color: rgba(245, 158, 11, 0.35);
    border-bottom-color: rgba(245, 158, 11, 0.55);
    color:       var(--color-accent-warning, #f59e0b);
  }

  /* Separador de combinação (+) e sequência (→) */
  .kbd-sep {
    font-size:   9px;
    opacity:     0.4;
    margin:      0 1px;
    color:       var(--color-text-muted, #94a3b8);
    flex-shrink: 0;
  }

  /* Grupo de teclas (combinação ou sequência) */
  .kbd-group {
    display:     inline-flex;
    align-items: center;
    gap:         0;
    margin:      0 3px;
  }

  /* ── Botão de Fechar ── */
  .btn-close {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           18px;
    height:          18px;
    border-radius:   50%;
    border:          none;
    background:      transparent;
    color:           var(--color-text-muted, #94a3b8);
    cursor:          pointer;
    margin-left:     4px;
    flex-shrink:     0;
    opacity:         0;
    transform:       scale(0.7);
    transition:
      opacity   0.25s ease,
      transform 0.25s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      background 0.2s ease,
      color      0.2s ease;
    /* Garante que seja focável mesmo invisível para a/11y */
    pointer-events: none;
  }

  .hud-banner:hover .btn-close,
  .hud-banner:focus-within .btn-close {
    opacity:        1;
    transform:      scale(1);
    pointer-events: auto;
  }

  .btn-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color:      var(--color-text-main, #e2e8f0);
    transform:  scale(1.15) rotate(90deg);
  }

  .btn-close:focus-visible {
    outline:        2px solid var(--color-accent-primary, #6366f1);
    outline-offset: 2px;
  }

  /* ── Dot pulsante de "ao vivo" ── */
  .live-dot {
    width:         5px;
    height:        5px;
    border-radius: 50%;
    background:    var(--color-accent-primary, #6366f1);
    opacity:       0.4;
    flex-shrink:   0;
    animation:     hud-pulse 3s ease-in-out infinite;
  }

  @keyframes hud-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.4); }
  }

  /* Pausa a pulsação quando não há dicas */
  :host([data-empty]) .live-dot {
    animation: none;
    opacity:   0.15;
  }
`);var ft=document.createElement(`template`);ft.innerHTML=`
  <div
    class="hud-banner"
    part="banner"
    role="region"
    aria-label="Dicas do editor"
    aria-live="polite"
    aria-atomic="true"
  >
    <!-- Dot pulsante -->
    <span class="live-dot" aria-hidden="true"></span>

    <!-- Ícone de lâmpada -->
    <ui-icon
      part="icon"
      name="lightbulb"
      class="hud-icon"
      aria-hidden="true"
    ></ui-icon>

    <!-- Viewport com máscara de overflow -->
    <div class="tip-viewport" aria-hidden="true">
      <span
        id="tip-text"
        class="tip-text"
        part="tip-text"
        data-state="visible"
      ></span>
    </div>

    <!-- Texto para leitores de tela (fora do viewport animado) -->
    <span
      id="sr-text"
      class="sr-only"
      style="
        position: absolute;
        width: 1px; height: 1px;
        padding: 0; margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      "
    ></span>

    <!-- Botão fechar -->
    <button
      id="btn-close"
      class="btn-close"
      part="close-btn"
      type="button"
      aria-label="Fechar painel de dicas"
      tabindex="0"
    >
      <ui-icon name="close" size="xs" aria-hidden="true"></ui-icon>
    </button>
  </div>
`;function Z(e,t=`combo`){return`<kbd class="kbd-hud" ${t===`single`?`data-type="single"`:``}>${Q(e.trim())}</kbd>`}function Q(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function pt(e){let t=e.trim();if(t.includes(` → `)){let e=t.split(` → `),n=e.map((t,n)=>{let r=n<e.length-1?`<span class="kbd-sep" aria-hidden="true">→</span>`:``;return`${Z(t,`combo`)}${r}`});return`<span class="kbd-group" aria-label="Sequência: ${Q(t)}">${n.join(``)}</span>`}if(t.includes(`+`)){let e=t.split(`+`),n=e.map((t,n)=>{let r=n<e.length-1?`<span class="kbd-sep" aria-hidden="true">+</span>`:``;return`${Z(t,`combo`)}${r}`});return`<span class="kbd-group" aria-label="Atalho: ${Q(t)}">${n.join(``)}</span>`}return`<span class="kbd-group" aria-label="Tecla: ${Q(t)}">${Z(t,`single`)}</span>`}function mt(e){let t=[],n=0,r=/\[([^\]]+)\]/g,i;for(;(i=r.exec(e))!==null;)i.index>n&&t.push(`<span>${Q(e.slice(n,i.index))}</span>`),t.push(pt(i[1])),n=r.lastIndex;return n<e.length&&t.push(`<span>${Q(e.slice(n))}</span>`),t.join(``)}function ht(e){return e.replace(/\[([^\]]+)\]/g,(e,t)=>t.includes(` → `)?`Sequência: ${t}`:t.includes(`+`)?`Atalho ${t}`:`Tecla ${t}`)}function gt(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var _t=class extends HTMLElement{#e;#t=new AbortController;#n=[];#r=0;#i=null;#a=!1;#o=!1;#s=!1;#c=15e3;#l=null;#u=null;#d=null;constructor(){super(),this.#e=this.attachShadow({mode:`open`}),this.#e.adoptedStyleSheets=[W,dt],this.#e.appendChild(ft.content.cloneNode(!0)),this.#l=this.#e.getElementById(`tip-text`),this.#u=this.#e.getElementById(`sr-text`),this.#d=this.#e.getElementById(`btn-close`)}connectedCallback(){let e=this.#t.signal,t=this.#e.querySelector(`.hud-banner`),n=parseInt(getComputedStyle(this).getPropertyValue(`--hud-tip-interval-ms`).trim(),10);!isNaN(n)&&n>0&&(this.#c=n),t?.addEventListener(`mouseenter`,()=>{this.#a=!0},{signal:e}),t?.addEventListener(`mouseleave`,()=>{this.#a=!1},{signal:e}),this.#d?.addEventListener(`click`,()=>this.#g(),{signal:e}),this.#n.length>0&&(this.#m(!1),this.#f())}disconnectedCallback(){this.#t.abort(),this.#p()}setTips(e){if(!Array.isArray(e)||e.length===0){this.setAttribute(`data-empty`,``);return}this.removeAttribute(`data-empty`),this.#n=gt(e),this.#r=0,this.#m(!1),this.isConnected&&(this.#p(),this.#f())}pause(){this.#o=!0,this.#p()}resume(){this.#o&&(this.#o=!1,this.#f())}#f(){this.#i===null&&(this.#n.length<=1||(this.#i=window.setInterval(()=>{this.#a||this.#o||this.#s||(this.#r=(this.#r+1)%this.#n.length,this.#m(!0))},this.#c)))}#p(){this.#i!==null&&(clearInterval(this.#i),this.#i=null)}#m(e){let t=this.#l,n=this.#u;if(!t||this.#n.length===0)return;let r=this.#n[this.#r],i=mt(r),a=ht(r);if(n&&(n.textContent=`Dica: ${a}`),!e){t.innerHTML=this.#h(i),t.dataset.state=`visible`;return}this.#s=!0,t.dataset.state=`exit-up`,setTimeout(()=>{t.innerHTML=this.#h(i),t.dataset.state=`enter-from-bottom`,t.offsetWidth,t.dataset.state=`visible`,setTimeout(()=>{this.#s=!1},450)},450)}#h(e){return`<span class="tip-prefix" aria-hidden="true">Dica:</span>${e}`}#g(){this.style.opacity=`0`,this.style.transform=`translateY(8px)`,this.style.transition=`opacity 0.3s ease, transform 0.3s ease`,this.dispatchEvent(new CustomEvent(`hud-close`,{detail:{permanent:!1},bubbles:!0,composed:!0})),setTimeout(()=>{this.#p(),this.remove()},300)}};customElements.define(`ui-hud-tips`,_t),r.on(`notify`,e=>{oe.show(e)}),r.on(`ui:open:help`,(e={})=>{localStorage.setItem(`has_seen_guide`,`true`);let t=document.getElementById(`help-center-modal`),n=t?.querySelector(`ui-help-center`);t&&n&&(e.tab&&n.setTab(e.tab),t.setAttribute(`open`,``),c.play(c.enumPresets.OPEN))});var $={id:crypto.randomUUID(),name:`Nova Etiqueta`,config:{...m.CANVAS},elements:[A.create(u.TEXT,{content:`Minha Nova Etiqueta`})],createdAt:Date.now(),updatedAt:Date.now()};document.addEventListener(`DOMContentLoaded`,async()=>{let{isMac:e}=le();c.toggle(!0);let t=()=>{c.play(c.enumPresets.TAP),document.removeEventListener(`click`,t),document.removeEventListener(`keydown`,t)};document.addEventListener(`click`,t,{once:!0}),document.addEventListener(`keydown`,t,{once:!0}),await N.init(),I.init(e),document.querySelector(`ui-hud-tips`)?.setTips([...I.listShortcuts().map(e=>`[${e.key||e.sequence}] - ${e.description}`),...q.proTips.map(e=>e.tip),`Dica: Use Ctrl+Z para desfazer ações.`,`Dica: Use as setas do teclado para mover elementos selecionados.`]);let n=localStorage.getItem(`last_active_project`),i=localStorage.getItem(`has_seen_guide`)===`true`,a=!1;if(n){let e=(await N.getTemplates()).find(e=>e.id===n);e&&(b.loadLabel(e),a=!0,r.emit(`notify`,{type:`success`,message:`Sessão anterior restaurada.`,duration:3e3}),c.play(c.enumPresets.SUCCESS))}if(!a&&!i){let e=document.getElementById(`welcome-modal`);e&&e.setAttribute(`open`,``)}else a||(b.loadLabel($),o.info(`Main`,`Standard session initialized: ${$.id}`));r.on(`state:change`,e=>{e.currentLabel?.id&&localStorage.setItem(`last_active_project`,e.currentLabel.id)});let{preferenceManager:s}=await y(async()=>{let{preferenceManager:e}=await import(`./PreferenceManager-BkZSHOdD.js`);return{preferenceManager:e}},__vite__mapDeps([0,1,2]),import.meta.url),l=await s.getPreferences();r.emit(`preferences:update`,l),b.loadLabel($),o.info(`Main`,`Application Initialized with Label: ${$.id}`),r.emit(`notify`,{type:`info`,message:`Aplicação inicializada com sucesso!`,duration:5e3})});export{m as a,y as i,w as n,u as o,S as r,k as t};