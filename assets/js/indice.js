import"./modulepreload-polyfill-B5Qt9EMX.js";const A="/VerticalAtlas/";document.addEventListener("DOMContentLoaded",function(){const l=document.createElement("div");l.id="alpinistIndex",l.className="alpinist-container",document.body.appendChild(l);const x=document.createElement("h1");x.textContent="Alpinist Index",l.appendChild(x);const h=document.createElement("div");h.className="search-container",l.appendChild(h);const u=document.createElement("input");u.type="text",u.id="searchAlpinist",u.placeholder="Search alpinists...",h.appendChild(u);const b=document.createElement("div");b.id="alpinistList",l.appendChild(b);const f=document.createElement("div");f.className="filter-container",l.appendChild(f);const E=document.createElement("div");E.innerHTML=`
        <label><input type="checkbox" id="guideFilter"> Show only guides</label>
    `,f.appendChild(E),fetch(`${A}/data/data.tsv`).then(o=>{if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return o.text()}).then(o=>{const r=o.trim().split(`
`),d=r[0].split("	");console.log(d);const s=d.findIndex(i=>i==="Guide"),t=d.findIndex(i=>i==="Alpinist");if(t===-1&&s===-1)throw new Error("Neither Alpinist nor Guide column found in TSV file");const e=[];for(let i=1;i<r.length;i++){const a=r[i].split("	");t!==-1&&a.length>t&&a[t].trim()&&a[t].split(",").map(n=>n.trim()).forEach(n=>{n&&!e.some(c=>c.name===n&&c.role==="Alpinist")&&e.push({name:n,role:"Alpinist",isGuide:!1})}),s!==-1&&a.length>s&&a[s].trim()&&a[s].split(",").map(n=>n.trim()).forEach(n=>{const c=e.find(w=>w.name===n);c?(c.isGuide=!0,c.role=c.role==="Alpinist"?"Alpinist, Guide":"Guide"):n&&e.push({name:n,role:"Guide",isGuide:!0})})}e.sort((i,a)=>i.name.localeCompare(a.name)),C(e),document.getElementById("searchAlpinist").addEventListener("input",function(){y(e)}),document.getElementById("guideFilter").addEventListener("change",function(){y(e)})}).catch(o=>{console.error("Error loading TSV data:",o),document.getElementById("alpinistList").innerHTML=`
                <div class="error">Error loading alpinist data: ${o.message}</div>
            `});function C(o){const r=document.getElementById("alpinistList");r.innerHTML="";const d={};o.forEach(t=>{const e=t.name.charAt(0).toUpperCase();d[e]||(d[e]=[]),d[e].push(t)});const s=document.createElement("div");s.className="alpha-nav",Object.keys(d).sort().forEach(t=>{const e=document.createElement("a");e.href=`#section-${t}`,e.textContent=t,s.appendChild(e)}),r.appendChild(s),Object.keys(d).sort().forEach(t=>{const e=document.createElement("div");e.className="alpha-section",e.id=`section-${t}`;const p=document.createElement("h2");p.textContent=t,e.appendChild(p);const g=document.createElement("ul");d[t].forEach(i=>{const a=document.createElement("li");a.className=i.isGuide?"guide":"";const m=document.createElement("span");m.className="name",m.textContent=i.name,a.appendChild(m);const n=document.createElement("span");n.className="role-badge",n.textContent=i.role,a.appendChild(n),g.appendChild(a)}),e.appendChild(g),r.appendChild(e)})}function y(o){const r=document.getElementById("searchAlpinist").value.toLowerCase(),d=document.getElementById("guideFilter").checked,s=o.filter(t=>{const e=t.name.toLowerCase().includes(r),p=!d||t.isGuide;return e&&p});C(s)}const v=document.createElement("style");v.textContent=`
        .alpinist-container {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .search-container, .filter-container {
            margin-bottom: 20px;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .alpha-nav {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .alpha-nav a {
            display: block;
            padding: 5px 10px;
            margin: 2px;
            text-decoration: none;
            background: #f5f5f5;
            border-radius: 3px;
            color: #333;
        }
        
        .alpha-section {
            margin-bottom: 20px;
        }
        
        .alpha-section h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        
        ul {
            list-style: none;
            padding: 0;
        }
        
        li {
            padding: 5px 0;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .guide {
            font-weight: bold;
        }
        
        .name {
            flex-grow: 1;
        }
        
        .role-badge {
            background: #3498db;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 12px;
            margin-left: 10px;
        }
        
        .guide .role-badge {
            background: #4CAF50;
        }
        
        .error {
            color: red;
            padding: 20px;
            background: #fff0f0;
            border-radius: 4px;
        }
    `,document.head.appendChild(v)});
