(function(){"use strict";var e={8121:function(e,t,i){var r=i(3751),o=i(641);function s(e,t,i,r,s,a){const n=(0,o.g2)("video-test");return(0,o.uX)(),(0,o.Wv)(n)}var a=i(33);const n={class:"video-editor-wrapper"},p={class:"video-editor"},d={class:"video-editor__header"},c={class:"video-editor__tabs"},l={class:"video-editor__container"},h={class:"video-editor__main"},v=["src"],u={key:0,class:"video-editor__cropper-overlay"},g={class:"video-editor__controls"},m=["max","disabled"],A={class:"video-editor__volume"},C={class:"video-editor__time"},f={class:"video-editor__volume-control"},k=["src"],w=["disabled"],y={class:"video-editor__controls-group"},b={class:"video-editor__speed"},_=["disabled"],D=["value"],S={class:"video-editor__aspect-ratio-selector"},R=["disabled"],x=["value"],P={class:"video-editor__side-preview-wrapper"},L={key:0,class:"video-editor__side-preview-content"},T=["src"],$={key:1,class:"video-editor__preview-container"},B={ref:"previewCanvas",class:"video-editor__preview-canvas"};function I(e,t,i,s,I,F){const E=(0,o.g2)("CropperControls");return(0,o.uX)(),(0,o.CE)("div",n,[(0,o.Lk)("div",p,[(0,o.Lk)("div",d,[t[21]||(t[21]=(0,o.Lk)("div",{class:"video-editor__title"},"Cropper",-1)),(0,o.Lk)("div",c,[(0,o.Lk)("div",{class:(0,a.C4)(["video-editor__preview",{"video-editor--active":"preview"===I.sessionType}]),onClick:t[0]||(t[0]=(...e)=>F.startPreview&&F.startPreview(...e))}," Preview Session ",2),(0,o.Lk)("div",{class:(0,a.C4)(["video-editor__session",{"video-editor--active":"generate"===I.sessionType}]),onClick:t[1]||(t[1]=(...e)=>F.setSession&&F.setSession(...e))}," Generate Session ",2)])]),(0,o.Lk)("div",l,[(0,o.Lk)("div",h,[(0,o.Lk)("video",{ref:"videoPlayer",class:"video-editor__player",onLoadedmetadata:t[2]||(t[2]=(...e)=>F.onLoadedMetadata&&F.onLoadedMetadata(...e)),onTimeupdate:t[3]||(t[3]=(...e)=>F.updateSeekTime&&F.updateSeekTime(...e))},[(0,o.Lk)("source",{src:I.video,type:"video/mp4"},null,8,v),t[22]||(t[22]=(0,o.eW)(" Your browser does not support the video tag. "))],544),I.isCropperActive?((0,o.uX)(),(0,o.CE)("div",u,[(0,o.Lk)("div",{ref:"cropper",class:"video-editor__cropper",style:(0,a.Tr)(I.cropperStyle),onMousedown:t[4]||(t[4]=(...e)=>F.startDrag&&F.startDrag(...e)),onMousemove:t[5]||(t[5]=(...e)=>F.onDrag&&F.onDrag(...e)),onMouseup:t[6]||(t[6]=(...e)=>F.endDrag&&F.endDrag(...e)),onTouchstart:t[7]||(t[7]=(...e)=>F.startDrag&&F.startDrag(...e)),onTouchmove:t[8]||(t[8]=(...e)=>F.onDrag&&F.onDrag(...e)),onTouchend:t[9]||(t[9]=(...e)=>F.endDrag&&F.endDrag(...e))},null,36)])):(0,o.Q3)("",!0),(0,o.Lk)("div",null,[(0,o.Lk)("div",g,["generate"===I.sessionType?((0,o.uX)(),(0,o.CE)("div",{key:0,onClick:t[10]||(t[10]=(...e)=>F.togglePlay&&F.togglePlay(...e)),class:"video-editor__play-pause-btn"},[(0,o.Lk)("div",{class:(0,a.C4)(I.isPlaying?"video-editor__pause-icon":"video-editor__play-icon")},null,2)])):(0,o.Q3)("",!0),(0,o.bo)((0,o.Lk)("input",{type:"range","onUpdate:modelValue":t[11]||(t[11]=e=>I.seekTime=e),max:I.duration,step:"0.01",onMousedown:t[12]||(t[12]=(...e)=>F.pauseSeekUpdates&&F.pauseSeekUpdates(...e)),onInput:t[13]||(t[13]=(...t)=>e.debouncedSeek&&e.debouncedSeek(...t)),onMouseup:t[14]||(t[14]=(...e)=>F.resumeSeekUpdates&&F.resumeSeekUpdates(...e)),class:"video-editor__seek-bar",disabled:"preview"===I.sessionType},null,40,m),[[r.Jo,I.seekTime]])]),(0,o.Lk)("div",A,[(0,o.Lk)("div",C,(0,a.v_)(F.formattedCurrentTime)+" | "+(0,a.v_)(F.formattedDuration),1),(0,o.Lk)("div",f,[(0,o.Lk)("img",{src:I.videoVolume,alt:"video-volume"},null,8,k),(0,o.bo)((0,o.Lk)("input",{type:"range","onUpdate:modelValue":t[15]||(t[15]=e=>I.volume=e),min:"0",max:"1",step:"0.01",onInput:t[16]||(t[16]=(...e)=>F.changeVolume&&F.changeVolume(...e)),class:"video-editor__volume-slider",disabled:"preview"===I.sessionType},null,40,w),[[r.Jo,I.volume]])])]),(0,o.Lk)("div",y,[(0,o.Lk)("div",b,[t[23]||(t[23]=(0,o.Lk)("label",null,"Speed",-1)),(0,o.bo)((0,o.Lk)("select",{"onUpdate:modelValue":t[17]||(t[17]=e=>I.playbackRate=e),onChange:t[18]||(t[18]=(...e)=>F.changePlaybackRate&&F.changePlaybackRate(...e)),class:"video-editor__speed-select",disabled:"preview"===I.sessionType},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(I.playbackRates,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e,value:e},(0,a.v_)(e)+"x ",9,D)))),128))],40,_),[[r.u1,I.playbackRate]])]),(0,o.Lk)("div",S,[t[24]||(t[24]=(0,o.Lk)("label",null,"Cropper Aspect Ratio",-1)),(0,o.bo)((0,o.Lk)("select",{"onUpdate:modelValue":t[19]||(t[19]=e=>I.aspectRatio=e),onChange:t[20]||(t[20]=(...e)=>F.updateCropperDimensions&&F.updateCropperDimensions(...e)),class:"video-editor__aspect-ratio-select",disabled:"preview"===I.sessionType},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(I.aspectRatios,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e.value,value:e.value},(0,a.v_)(e.label),9,x)))),128))],40,R),[[r.u1,I.aspectRatio]])])])])]),(0,o.Lk)("div",P,[t[27]||(t[27]=(0,o.Lk)("div",{class:"video-editor__side-preview-text"},"Preview",-1)),(0,o.Lk)("div",{class:(0,a.C4)(["video-editor__side-preview",{"video-editor__cropper-active":I.isCropperActive}])},[I.isCropperActive?((0,o.uX)(),(0,o.CE)("div",$,[(0,o.Lk)("canvas",B,null,512)])):((0,o.uX)(),(0,o.CE)("div",L,[(0,o.Lk)("img",{src:I.vector,alt:"vector"},null,8,T),t[25]||(t[25]=(0,o.Lk)("div",{class:"video-editor__preview-not-available"}," Preview not available ",-1)),t[26]||(t[26]=(0,o.Lk)("div",{class:"video-editor__start-cropper-instruction"}," Please click on “Start Cropper” and then play video ",-1))]))],2)])]),(0,o.bF)(E,{sessionType:I.sessionType,onSetSession:F.setSession,onStartCropper:F.startCropper,onRemoveCropper:F.removeCropper,onLogRecords:F.logRecords},null,8,["sessionType","onSetSession","onStartCropper","onRemoveCropper","onLogRecords"])])])}i(4114),i(4603),i(7566),i(8721);var F=i(2543),E=i.n(F);const U={key:0,class:"video-editor__actions"},X=["disabled"],M=["disabled"];function O(e,t,i,r,s,n){return"generate"===i.sessionType?((0,o.uX)(),(0,o.CE)("div",U,[(0,o.Lk)("div",{class:(0,a.C4)(["video-editor__start-cropper",{disabled:s.isCropperActive}]),onClick:t[0]||(t[0]=(...e)=>n.startCropper&&n.startCropper(...e)),disabled:s.isCropperActive}," Start Cropper ",10,X),(0,o.Lk)("div",{class:(0,a.C4)(["video-editor__remove-cropper",{disabled:!s.isCropperActive}]),onClick:t[1]||(t[1]=(...e)=>n.removeCropper&&n.removeCropper(...e)),disabled:!s.isCropperActive}," Remove Cropper ",10,M),(0,o.Lk)("div",{class:"video-editor__generate-preview",onClick:t[2]||(t[2]=t=>e.$emit("logRecords"))}," Generate Preview ")])):(0,o.Q3)("",!0)}var j={props:{sessionType:{type:String,required:!0}},data(){return{isCropperActive:!1}},methods:{startCropper(){this.isCropperActive=!0,this.$emit("startCropper")},removeCropper(){this.isCropperActive=!1,this.$emit("removeCropper")}}},V=i(6262);const Y=(0,V.A)(j,[["render",O],["__scopeId","data-v-2b5dbfd2"]]);var H=Y,Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC+SURBVHgBvZWBDYIwEEVPJugIbCCjMIIb6AYyimziBrgBt4FucP5LaMRE22tpeclPSGj/p1zbIwIi4qArNMt25sXL0cr8IeWZ1LtBxhk6Unk66HLQJeGhpTqwBghVpDGMeUE3iCkHQ7Ha1diTJO60aMCfjzIHZQWkBG0KWEL60HxLkWO44NvcFcjnenkG56cGWI3NAaDLMfZYTjJDd6iP/u8f7HJVMNWDNWCkeoy+eJOUR5vYV1cbpFzLHLz5Gy5njnVobmNZAAAAAElFTkSuQmCC",W=i.p+"media/video-verse.0f68f2f8.mp4",G="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC1SURBVHgBlVMBDcMwDItK4IVQCINwCDuC/Qh+KD+TMSiFM+gY7Azy9PK1KUvX1ZIXyYrjTG2JCmDmIIxgoBbAnHjBWOp1lllKFIaVfFI990wyzJ1K/iOqvhH62clngCkZyTrgig2fkHoqJJobSJ1Bj5rcXqKBl9ALO+E7ex214aMFZ4k7GIQT0n9b5AE3CNOBAfkXLjB7+BbgGGeuH2OEHjYRxi20BvTCB5XADVe5NiRy5TF9AbZJDHx/3atZAAAAAElFTkSuQmCC",J={components:{CropperControls:H},data(){return{playbackRates:[.5,1,1.5,2,2.5],aspectRatios:[{value:"9/18",label:"9:18"},{value:"9/16",label:"9:16"},{value:"4/3",label:"4:3"},{value:"3/4",label:"3:4"},{value:"1/1",label:"1:1"},{value:"4/5",label:"4:5"}],isPlaying:!1,playbackRate:1,volume:1,seekTime:0,duration:0,cropperData:{x:50,y:50,width:200,height:200},cropperStyle:{top:"50px",left:"50px",width:"200px",height:"200px"},aspectRatio:"9/18",isDragging:!1,dragStartX:0,dragStartY:0,previewCtx:null,frameRequest:null,isSeeking:!1,isCropperActive:!1,records:[],isPreviewing:!1,sessionType:"generate",vector:Q,video:W,videoVolume:G}},mounted(){this.debouncedSeek=E().debounce((()=>{this.seek()}),50)},methods:{setSession(){this.records=[],this.isPlaying=!1,this.seekTime=0,this.volume=1,this.playbackRate=1,this.isCropperActive=!1,this.isPreviewing=!1,this.cropperData={x:50,y:50,width:200,height:200},this.cropperStyle={top:"50px",left:"50px",width:"200px",height:"200px"},this.sessionType="generate"},recordData(){if(this.$refs.cropper){const e=this.$refs.videoPlayer,t=e.currentTime,i=e.volume,r=e.playbackRate,o=this.$refs.cropper,s=o.getBoundingClientRect(),a=e.getBoundingClientRect(),n=[s.left-a.left,s.top-a.top,s.right-a.left,s.bottom-a.top],p={timeStamp:parseFloat(t.toFixed(2)),coordinates:n,volume:parseFloat(i.toFixed(2)),playbackRate:parseFloat(r.toFixed(2))};this.records.push(p),console.log("Recorded Data:",p)}},logRecords(){const e=JSON.stringify(this.records,null,2),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download="cropper_records.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)},formatTime(e){const t=Math.floor(e/3600),i=Math.floor(e%3600/60),r=Math.floor(e%60);return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`},onLoadedMetadata(){this.$refs.videoPlayer&&(this.duration=this.$refs.videoPlayer.duration,this.updateCropperDimensions())},togglePlay(){const e=this.$refs.videoPlayer;this.isPlaying?(e.pause(),cancelAnimationFrame(this.frameRequest)):(this.updateCropperDimensions(),this.updatePreviewCanvas(),e.play()),this.isPlaying=!this.isPlaying},changePlaybackRate(){this.$refs.videoPlayer.playbackRate=parseFloat(this.playbackRate)},changeVolume(){this.$refs.videoPlayer.volume=this.volume},seek(){this.$refs.videoPlayer.currentTime=this.seekTime},updateSeekTime(){this.isSeeking||this.isPreviewing||(this.seekTime=this.$refs.videoPlayer.currentTime,this.recordData()),this.$refs.videoPlayer.ended&&(this.isPlaying=!1)},pauseSeekUpdates(){this.isSeeking=!0},resumeSeekUpdates(){this.isSeeking=!1,this.seek()},startDrag(e){if(this.isPreviewing)return;e.preventDefault(),this.isDragging=!0;const t=e.type.startsWith("touch")?e.touches[0]:e;this.dragStartX=t.clientX-this.cropperData.x,this.dragStartY=t.clientY-this.cropperData.y},onDrag(e){if(!this.isDragging||this.isPreviewing)return;const t=e.type.startsWith("touch")?e.touches[0]:e;let i=t.clientX-this.dragStartX,r=t.clientY-this.dragStartY;const o=this.$refs.videoPlayer.getBoundingClientRect(),s=this.$refs.cropper.getBoundingClientRect();i<0&&(i=0),r<0&&(r=0),i+s.width>o.width&&(i=o.width-s.width),r+s.height>o.height&&(r=o.height-s.height),this.cropperData.x=i,this.cropperData.y=r,this.cropperStyle={top:`${r}px`,left:`${i}px`,width:`${this.cropperData.width}px`,height:`${this.cropperData.height}px`},this.recordData()},endDrag(){this.isDragging=!1,this.recordData()},updateCropperDimensions(){const e=this.$refs.videoPlayer.offsetHeight,t={"9/18":{width:.5*e,height:e},"9/16":{width:9/16*e,height:e},"4/3":{width:4/3*e,height:e},"3/4":{width:3/4*e,height:e},"1/1":{width:e,height:e},"4/5":{width:.8*e,height:e}},i=t[this.aspectRatio];this.cropperData.width=i.width,this.cropperData.height=i.height;const r=this.$refs.videoPlayer.getBoundingClientRect();let o=(r.width-this.cropperData.width)/2,s=0;if(o<0&&(o=0),s<0&&(s=0),o+this.cropperData.width>r.width&&(o=r.width-this.cropperData.width),s+this.cropperData.height>r.height&&(s=r.height-this.cropperData.height),this.cropperData.x=o,this.cropperData.y=s,this.cropperStyle={width:`${this.cropperData.width}px`,height:`${this.cropperData.height}px`,top:`${s}px`,left:`${o}px`},this.previewCtx){const e=this.$refs.previewCanvas;e&&(e.width=this.cropperData.width,e.height=this.cropperData.height)}},updatePreviewCanvas(){if(!this.isCropperActive)return;if(!this.previewCtx){const e=this.$refs.previewCanvas;this.previewCtx=e.getContext("2d")}const e=this.$refs.videoPlayer;if(e){const t=e.videoWidth,i=e.videoHeight,r=t/e.offsetWidth,o=i/e.offsetHeight,{x:s,y:a,width:n,height:p}=this.cropperData;this.previewCtx.clearRect(0,0,n,p),this.previewCtx.drawImage(e,s*r,a*o,n*r,p*o,0,0,n,p),this.frameRequest=requestAnimationFrame(this.updatePreviewCanvas)}},startCropper(){this.isCropperActive=!0,this.$nextTick((()=>{const e=this.$refs.previewCanvas;e&&(this.previewCtx=e.getContext("2d"),this.updateCropperDimensions(),this.updatePreviewCanvas())}))},removeCropper(){this.isCropperActive=!1,this.$nextTick((()=>{const e=this.$refs.previewCanvas;if(e){const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height)}}))},startPreview(){if(0===this.records.length)return;this.sessionType="preview",this.isPreviewing=!0;const e=this.$refs.videoPlayer;e.currentTime=0,e.volume=parseFloat(this.records[0].volume),this.volume=parseFloat(this.records[0].volume),e.playbackRate=parseFloat(this.records[0].playbackRate),this.playbackRate=`${this.records[0].playbackRate}`,this.currentPreviewIndex=0;let t=performance.now();e.pause();const i=r=>{const o=r-t;if(this.currentPreviewIndex>=this.records.length)return e.pause(),void(this.isPreviewing=!1);const s=this.records[this.currentPreviewIndex],a=this.records[this.currentPreviewIndex+1]||s,n=(a.timeStamp-s.timeStamp)/e.playbackRate*1e3;if(o>=n){e.currentTime<s.timeStamp&&(e.currentTime=s.timeStamp,setTimeout((()=>{e.play().catch((e=>{console.error("Error starting video:",e)}))}),0)),e.volume!==parseFloat(s.volume)&&(e.volume=parseFloat(s.volume)),e.playbackRate!==parseFloat(s.playbackRate)&&(e.playbackRate=parseFloat(s.playbackRate)),this.seekTime=s.timeStamp,this.volume=s.volume;const i=e.getBoundingClientRect(),o=this.$refs.cropper.getBoundingClientRect();let a=s.coordinates[0],n=s.coordinates[1];a<0&&(a=0),n<0&&(n=0),a+o.width>i.width&&(a=i.width-o.width),n+o.height>i.height&&(n=i.height-o.height),this.cropperData.x=a,this.cropperData.y=n,this.cropperStyle={position:"absolute",left:`${a}px`,top:`${n}px`,width:s.coordinates[2]-s.coordinates[0]+"px",height:s.coordinates[3]-s.coordinates[1]+"px"},this.updatePreviewCanvas(),this.currentPreviewIndex++,t=r}this.isPreviewing&&requestAnimationFrame(i)};requestAnimationFrame(i)},endPreview(){this.isPreviewing=!1}},computed:{formattedCurrentTime(){return this.formatTime(this.seekTime)},formattedDuration(){return this.formatTime(this.duration)}}};const N=(0,V.A)(J,[["render",I],["__scopeId","data-v-4c6afa05"]]);var K=N,q={name:"App",components:{"video-test":K}};const Z=(0,V.A)(q,[["render",s]]);var z=Z;(0,r.Ef)(z).mount("#app")}},t={};function i(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}i.m=e,function(){var e=[];i.O=function(t,r,o,s){if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],s=e[c][2];for(var n=!0,p=0;p<r.length;p++)(!1&s||a>=s)&&Object.keys(i.O).every((function(e){return i.O[e](r[p])}))?r.splice(p--,1):(n=!1,s<a&&(a=s));if(n){e.splice(c--,1);var d=o();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[r,o,s]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){i.p="/"}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,s,a=r[0],n=r[1],p=r[2],d=0;if(a.some((function(t){return 0!==e[t]}))){for(o in n)i.o(n,o)&&(i.m[o]=n[o]);if(p)var c=p(i)}for(t&&t(r);d<a.length;d++)s=a[d],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(c)},r=self["webpackChunkvideo_verse"]=self["webpackChunkvideo_verse"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=i.O(void 0,[504],(function(){return i(8121)}));r=i.O(r)})();
//# sourceMappingURL=app.b75120cb.js.map