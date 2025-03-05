import"./modulepreload-polyfill-B5Qt9EMX.js";import{p as T}from"./dataParser-BaaGjuH2.js";function M(e,l){const o=document.getElementById("main-content");if(!o)return;o.innerHTML="";const a=document.createElement("div");a.className="bg-indigo-600 text-white py-4";const c=document.createElement("div");c.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";const v=document.createElement("a");v.href="index.html",v.className="text-indigo-100 hover:text-white mb-2 inline-block transition duration-300",v.innerHTML="&larr; Torna ai percorsi";const x=document.createElement("h1");if(x.className="text-3xl font-bold mt-2",x.textContent=l,e.length>0&&e[0].storytelling_path_description){const g=document.createElement("p");g.className="text-lg text-indigo-100 mt-1",g.textContent=e[0].storytelling_path_description,c.appendChild(g)}c.appendChild(v),c.appendChild(x),a.appendChild(c),o.appendChild(a);const d=document.createElement("div");d.className="flex flex-col md:flex-row w-full";const m=document.createElement("div");m.className="w-full md:w-3/5 h-[60vh] md:h-[calc(100vh-90px)] relative",m.id="map";const b=document.createElement("div");b.className="w-full md:w-2/5 bg-white md:h-[calc(100vh-90px)] overflow-y-auto shadow-lg border-l border-gray-200",b.id="location-details",d.appendChild(m),d.appendChild(b),o.appendChild(d);const y=document.createElement("div");y.className="absolute left-0 right-0 bottom-0 h-1 bg-gray-200";const k=document.createElement("div");if(k.className="h-full bg-indigo-600 transition-all duration-1000 ease-in-out",k.style.width="0%",k.id="progress-indicator",y.appendChild(k),m.appendChild(y),o){const g=document.createElement("div");g.className="md:hidden flex justify-center py-4 bg-white border-t border-gray-200",g.id="dots-navigation",o.appendChild(g)}I(e)}function I(e,l){if(window.L)N(e);else{const o=document.createElement("link");o.rel="stylesheet",o.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(o);const a=document.createElement("script");a.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",document.head.appendChild(a),a.onload=()=>{N(e)}}}function N(e,l){const o=e.filter(t=>t.latitude&&t.longitude&&!isNaN(parseFloat(t.latitude))&&!isNaN(parseFloat(t.longitude)));if(o.length===0){document.getElementById("map").innerHTML=`
      <div class="flex h-full items-center justify-center bg-gray-100">
        <div class="text-center p-6">
          <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Nessuna coordinata valida</h3>
          <p class="mt-1 text-sm text-gray-500">Non ci sono luoghi con coordinate geografiche valide per visualizzare la mappa.</p>
        </div>
      </div>
    `;return}D();const a=L.map("map").setView([parseFloat(o[0].latitude),parseFloat(o[0].longitude)],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(a);const c=[],v=L.featureGroup().addTo(a),x=L.layerGroup().addTo(a);o.forEach((t,n)=>{const s=parseFloat(t.latitude),i=parseFloat(t.longitude),u=L.divIcon({className:"custom-marker",html:`<div class="marker-container ${n===0?"active":""}">
              <div class="marker-point"></div>
              <div class="marker-pulse"></div>
              <div class="marker-number">${n+1}</div>
            </div>`,iconSize:[40,40],iconAnchor:[20,20]}),r=L.marker([s,i],{icon:u,title:t.Name||`Luogo ${n+1}`}).addTo(v);c.push(r),r.bindPopup(`<b>${t.Name||"Senza nome"}</b><br>${t.Description||""}`),r.on("click",()=>{w(n,o,c,a,x,!1),m&&g()})}),a.fitBounds(v.getBounds(),{padding:[30,30]}),z(o[0],0,o.length),B(0,c),$(o.length);let d=0,m=!1,b=null,y=!1;k(a,o,c,x),E(0,o.length);function k(t,n,s,i){const u=L.Control.extend({options:{position:"bottomright"},onAdd:function(){const r=L.DomUtil.create("div","leaflet-custom-control");r.style.backgroundColor="white",r.style.padding="6px",r.style.borderRadius="24px",r.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)",r.style.display="flex",r.style.alignItems="center",r.id="control-panel";const p=L.DomUtil.create("button","",r);p.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>',p.className="p-2 hover:bg-gray-100 rounded-full transition duration-300 focus:outline-none mr-1",p.title="Precedente",p.id="prev-location",p.style.cursor="pointer",p.style.border="none",p.style.background="transparent",p.style.borderRadius="50%",p.style.width="36px",p.style.height="36px";const h=L.DomUtil.create("button","",r);h.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>',h.className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition duration-300 focus:outline-none mx-1",h.title="Riproduci",h.id="play-pause-button",h.style.cursor="pointer",h.style.border="none",h.style.background="#4f46e5",h.style.color="white",h.style.borderRadius="50%",h.style.width="36px",h.style.height="36px";const f=L.DomUtil.create("button","",r);return f.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>',f.className="p-2 hover:bg-gray-100 rounded-full transition duration-300 focus:outline-none ml-1",f.title="Successivo",f.id="next-location",f.style.cursor="pointer",f.style.border="none",f.style.background="transparent",f.style.borderRadius="50%",f.style.width="36px",f.style.height="36px",L.DomEvent.disableClickPropagation(r),L.DomEvent.disableScrollPropagation(r),p.addEventListener("click",function(){d>0&&!y&&(m&&g(),w(d-1,n,s,t,i,!1))}),h.addEventListener("click",function(){g()}),f.addEventListener("click",function(){d<n.length-1&&!y&&(m&&g(),w(d+1,n,s,t,i,!1))}),r}});new u().addTo(t),C(d,o.length)}function g(){m=!m;const t=document.getElementById("play-pause-button");if(!t){console.error("Play/Pause button not found");return}m?(t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H7z" clip-rule="evenodd" /></svg>',t.title="Pausa",d<o.length-1&&!y?b=setTimeout(()=>{w(d+1,o,c,a,x,!0)},1e3):d===o.length-1&&w(0,o,c,a,x,!0)):(t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>',t.title="Riproduci",b&&(clearTimeout(b),b=null))}function w(t,n,s,i,u,r=!1){if(t>=0&&t<n.length&&!y){y=!0,d=t,B(t,s),S(n,t,u);const p=document.getElementById("location-details");p.classList.add("fade-out"),setTimeout(()=>{z(n[t],t,n.length),p.classList.remove("fade-out"),p.classList.add("fade-in"),setTimeout(()=>{p.classList.remove("fade-in")},500)},500),i.flyTo([parseFloat(n[t].latitude),parseFloat(n[t].longitude)],15,{duration:1.5,easeLinearity:.25}),P(t),E(t,n.length),setTimeout(()=>{y=!1,m&&r&&d<n.length-1?b=setTimeout(()=>{w(d+1,n,s,i,u,!0)},5e3):m&&r&&d===n.length-1&&g()},1500),C(d,n.length)}}function C(t,n){const s=document.getElementById("prev-location"),i=document.getElementById("next-location");s&&(s.disabled=t===0,s.style.opacity=t===0?"0.5":"1",s.style.cursor=t===0?"not-allowed":"pointer"),i&&(i.disabled=t===n-1,i.style.opacity=t===n-1?"0.5":"1",i.style.cursor=t===n-1?"not-allowed":"pointer")}function $(t){const n=document.getElementById("dots-navigation");if(!n)return;const s=document.createElement("div");s.className="flex space-x-2";for(let i=0;i<t;i++){const u=document.createElement("button");u.className=`w-3 h-3 rounded-full transition-all ${i===0?"bg-indigo-600 w-6":"bg-gray-300"}`,u.setAttribute("aria-label",`Vai a ${i+1}`),u.setAttribute("data-index",i),u.addEventListener("click",()=>{m&&g(),w(i,o,c,a,x,!1)}),s.appendChild(u)}n.appendChild(s)}function P(t){const n=document.getElementById("dots-navigation");if(!n)return;n.querySelectorAll("button").forEach((i,u)=>{u===t?i.className="w-6 h-3 rounded-full transition-all bg-indigo-600":u<t?i.className="w-3 h-3 rounded-full transition-all bg-indigo-300":i.className="w-3 h-3 rounded-full transition-all bg-gray-300"})}function E(t,n){const s=document.getElementById("progress-indicator");if(s){const i=(t+1)/n*100;s.style.width=`${i}%`}}}function z(e,l,o){const a=document.getElementById("location-details");a&&(a.innerHTML=`
    <div class="p-6">
      ${e.image_url?`
        <div class="relative mb-6 overflow-hidden rounded-xl h-48 md:h-64 shadow-md">
          <img src="${e.image_url}" alt="${e.Name||"Immagine luogo"}" class="w-full h-full object-cover transition-transform duration-10000 hover:scale-110">
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
            <div class="flex items-center justify-between">
              <h2 class="text-white text-xl font-bold">${e.Name||"Luogo senza nome"}</h2>
              <span class="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                ${l+1}/${o}
              </span>
            </div>
          </div>
        </div>
      `:`
        <div class="mb-4 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900">${e.Name||"Luogo senza nome"}</h2>
          <span class="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
            ${l+1}/${o}
          </span>
        </div>
      `}
      
      <div class="mb-4 flex flex-wrap gap-2">
        ${e.Date?`
          <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
            ${e.Date}
          </span>
        `:""}
        ${e.Type?`
          <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            ${e.Type}
          </span>
        `:""}
        ${e.Category?`
          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            ${e.Category}
          </span>
        `:""}
        ${e.Location?`
          <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            ${e.Location}
          </span>
        `:""}
      </div>
      
      <div class="prose text-gray-700 mb-6">
        ${e.Description||"Nessuna descrizione disponibile."}
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200">
        <a href="elemento.html?id=${e.id||""}" class="text-indigo-600 font-medium hover:text-indigo-800 transition duration-300">
          Visualizza dettagli completi
        </a>
      </div>
    </div>
  `)}function B(e,l){l.forEach((o,a)=>{const c=L.divIcon({className:"custom-marker",html:`<div class="marker-container ${a===e?"active":""}">
              <div class="marker-point"></div>
              <div class="marker-pulse"></div>
              <div class="marker-number">${a+1}</div>
            </div>`,iconSize:[40,40],iconAnchor:[20,20]});o.setIcon(c),o.isPopupOpen()&&o.closePopup()}),l[e]&&(l[e].setZIndexOffset(1e3),l[e].openPopup())}function S(e,l,o){if(o.clearLayers(),l>0){const a=e.slice(0,l+1).map(v=>[parseFloat(v.latitude),parseFloat(v.longitude)]),c=L.polyline(a,{color:"#4f46e5",weight:3,opacity:.8,dashArray:"10, 10",className:"animated-path"});o.addLayer(c)}}function D(){if(!document.getElementById("custom-storymap-styles")){const e=document.createElement("style");e.id="custom-storymap-styles",e.innerHTML=`
      /* Marker styles */
      .custom-marker {
        background: transparent;
        border: none;
      }
      .marker-container {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .marker-point {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        background: #4f46e5;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        box-shadow: 0 0 0 2px white;
        transition: all 0.3s ease;
      }
      .marker-container.active .marker-point {
        background: #ef4444;
        width: 20px;
        height: 20px;
      }
      .marker-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: rgba(79, 70, 229, 0.2);
        border-radius: 50%;
        z-index: 1;
        animation: pulse 1.5s infinite;
      }
      .marker-container.active .marker-pulse {
        background: rgba(239, 68, 68, 0.2);
      }
      .marker-number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 10px;
        font-weight: bold;
        z-index: 3;
      }
      
      /* Animation for pulsing effect */
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0;
        }
      }
      
      /* Animation for path line */
      @keyframes dash {
        to {
          stroke-dashoffset: -20;
        }
      }
      .animated-path {
        animation: dash 1s linear infinite;
      }
      
      /* Fade animations for content transitions */
      .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .fade-in {
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      
      /* Control panel styles */
      .leaflet-custom-control {
        z-index: 1000 !important;
        pointer-events: auto !important;
      }
      
      /* Make sure Leaflet container has correct z-index stacking */
      .leaflet-control-container {
        z-index: 800;
      }
      
      /* Ensure control buttons remain above map elements */
      .leaflet-bottom.leaflet-right {
        z-index: 1000 !important;
      }
      
      /* Fix SVG icon display in control buttons */
      .leaflet-custom-control svg {
        width: 20px;
        height: 20px;
        display: block;
      }
    `,document.head.appendChild(e)}}window.initializeEnhancedStorymap=M;function A(){setTimeout(()=>{const e=document.getElementById("control-panel");if(e){console.log("Control panel found in DOM:",e),console.log("Control panel style:",window.getComputedStyle(e));const l=e.getBoundingClientRect(),o=l.top>=0&&l.left>=0&&l.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&l.right<=(window.innerWidth||document.documentElement.clientWidth);console.log("Control panel visible in viewport:",o),console.log("Control panel position:",l),o||(console.log("Fixing control panel visibility..."),e.style.zIndex="10000",e.style.position="fixed",e.style.bottom="20px",e.style.right="20px")}else console.error("Control panel not found in DOM")},2e3)}document.addEventListener("DOMContentLoaded",async function(){try{const e=await T(),l=F(),o=e.filter(a=>a.storytelling_path===l);if(o.length===0)throw new Error("Nessun elemento trovato per questo percorso.");M(o,l),A()}catch(e){console.error("Errore nel caricamento del percorso:",e),H("Si è verificato un errore nel caricamento del percorso: "+e.message)}});function F(){return new URLSearchParams(window.location.search).get("percorso")}function H(e){const l=document.getElementById("main-content");l&&(l.innerHTML=`
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 inline-block mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h2 class="text-xl font-bold text-red-700 mt-4">${e}</h2>
        <a href="index.html" class="mt-6 inline-block text-indigo-600 hover:text-indigo-800">&larr; Torna alla pagina principale</a>
      </div>
    </div>
  `)}
