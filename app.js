const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const PROGRAMS = {
  data: {title:"Data Science & Analytics", category:"DATA SCIENCE", duration:"4 weeks", mode:"Remote", status:"Pilot concept", description:"Explore a sample dataset, clean data, visualise patterns, and present insights in a dashboard or report.", tasks:["Week 1: Explore a sample dataset and document its columns.","Week 2: Clean the data and perform exploratory analysis.","Week 3: Build a dashboard or visualisations.","Week 4: Submit source files and a short findings report."], prerequisites:"Basic spreadsheet skills; Python is helpful but not mandatory."},
  ai: {title:"AI & Machine Learning", category:"AI & MACHINE LEARNING", duration:"4 weeks", mode:"Remote", status:"Planned track", description:"Explore a beginner-friendly machine-learning workflow using an appropriate public dataset and document model limitations.", tasks:["Week 1: Define the problem and review the dataset.","Week 2: Prepare features and establish a simple baseline.","Week 3: Train and evaluate a model with suitable metrics.","Week 4: Submit notebook, evaluation report and limitations."], prerequisites:"Basic Python and introductory statistics."},
  web: {title:"Web Development", category:"WEB DEVELOPMENT", duration:"4 weeks", mode:"Remote", status:"Planned track", description:"Plan and build a responsive multi-section website, then document your code and deployment steps.", tasks:["Week 1: Create a brief, sitemap and wireframe.","Week 2: Build semantic HTML and responsive CSS.","Week 3: Add JavaScript interactions and accessibility checks.","Week 4: Test, deploy and submit the source code."], prerequisites:"A laptop and willingness to learn HTML, CSS and JavaScript."}
};
const DEMO_CERTS = {
  "TSA-DEMO-001": {name:"Demo Learner", program:"Data Science & Analytics (sample record)", date:"2026-10-01", status:"SAMPLE RECORD — NOT AN OFFICIAL CERTIFICATE"}
};
const getStore = (key, fallback=[]) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const toast = (msg) => { const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2800); };
$("#year").textContent = new Date().getFullYear();

const nav=$("#mainNav"), menu=$("#menuToggle");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"×":"☰";});
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰";}));

$$("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  $$("[data-filter]").forEach(b=>b.classList.toggle("active",b===btn));
  $$(".program-card").forEach(card=>card.classList.toggle("hidden",btn.dataset.filter!=="all"&&card.dataset.category!==btn.dataset.filter));
}));

const programDialog=$("#programDialog");
function openProgram(key){
  const p=PROGRAMS[key]; if(!p)return;
  $("#programKey").value=key; $("#modalTitle").textContent=p.title; $("#modalEyebrow").textContent=p.category;
  $("#modalDescription").textContent=p.description;
  $("#modalDetails").innerHTML="";
  [p.duration,p.mode,p.status].forEach(x=>{const span=document.createElement("span");span.textContent=x;$("#modalDetails").append(span);});
  $("#applyNotice").textContent = key==="data"
    ? "This is a demo application flow. Do not submit personal information here; the form stores data only in this browser."
    : "This track is a planning example, not an open opportunity. Do not accept applications until the program is finalised.";
  $("#applyNotice").className="notice";
  $("#applicationForm").reset(); $("#programKey").value=key;
  programDialog.showModal();
}
$$("[data-apply]").forEach(b=>b.addEventListener("click",()=>openProgram(b.dataset.apply)));
programDialog.addEventListener("click",e=>{if(e.target===programDialog)programDialog.close();});

$("#applicationForm").addEventListener("submit",e=>{
  e.preventDefault();
  const key=$("#programKey").value;
  if(key!=="data"){toast("This track is not open in this demo.");return;}
  const form=new FormData(e.currentTarget);
  const record={id:"DEMO-"+Date.now().toString().slice(-7),program:PROGRAMS[key].title,name:form.get("studentName").trim(),email:form.get("studentEmail").trim(),college:form.get("studentCollege").trim(),year:form.get("studentYear"),motivation:form.get("studentMotivation").trim(),status:"Saved on this device",submittedAt:new Date().toISOString()};
  const apps=getStore("tsa_demo_applications"); apps.push(record); setStore("tsa_demo_applications",apps);
  programDialog.close();toast("Demo application saved on this device only.");openDashboard("applications");
});

const dashboardDialog=$("#dashboardDialog");
$$("[data-open-dashboard]").forEach(b=>b.addEventListener("click",()=>openDashboard("overview")));
dashboardDialog.addEventListener("click",e=>{if(e.target===dashboardDialog)dashboardDialog.close();});
$$("[data-tab]").forEach(b=>b.addEventListener("click",()=>renderDashboard(b.dataset.tab)));
function openDashboard(tab){renderDashboard(tab);dashboardDialog.showModal();}
function renderDashboard(tab){
  $$("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  const out=$("#dashboardContent");out.innerHTML="";
  if(tab==="overview"){
    const apps=getStore("tsa_demo_applications"), tasks=getStore("tsa_demo_tasks");
    out.innerHTML=`<div class="dash-card"><div class="dash-row"><h3>Welcome to your demo dashboard</h3><span class="status-pill">LOCAL DEMO</span></div><p>This is a UI prototype, not a real student account system.</p></div>
    <div class="dash-card"><h3>My applications</h3><p>${apps.length} application record(s) stored in this browser.</p><button class="btn btn-outline" data-switch="applications">View applications</button></div>
    <div class="dash-card"><h3>Task submissions</h3><p>${tasks.length} demo submission(s) stored in this browser.</p><button class="btn btn-outline" data-switch="tasks">Open tasks</button></div>
    <div class="notice">Do not use this demo for real student data. Browser storage is not secure, is device-specific, and can be cleared.</div>`;
  } else if(tab==="applications"){
    const apps=getStore("tsa_demo_applications");
    if(!apps.length){out.innerHTML='<div class="dash-card"><h3>No demo applications yet</h3><p>Use “View program & apply” on the Data Science card to test the flow.</p></div>';return;}
    apps.slice().reverse().forEach(a=>{const card=document.createElement("div");card.className="dash-card";card.innerHTML=`<div class="dash-row"><h3></h3><span class="status-pill">DEMO ONLY</span></div><p></p><p></p>`;card.querySelector("h3").textContent=a.program;card.querySelectorAll("p")[0].textContent=`${a.name} · ${a.college} · ${a.year}`;card.querySelectorAll("p")[1].textContent=`Reference ${a.id} · ${new Date(a.submittedAt).toLocaleString()}`;out.append(card);});
    const clear=document.createElement("button");clear.className="btn btn-outline";clear.textContent="Clear demo applications";clear.onclick=()=>{setStore("tsa_demo_applications",[]);renderDashboard("applications");};out.append(clear);
  } else {
    out.innerHTML=`<div class="dash-card"><h3>Sample task: Data exploration</h3><p>Practice task only. Use synthetic or properly licensed public data; never submit confidential records.</p><p><strong>Deliverable:</strong> dataset description, data-quality notes, and a short summary of findings.</p><span class="status-pill">PRACTICE TASK</span>
    <form id="taskForm" class="task-form"><label for="taskLink">Project link (optional)</label><input id="taskLink" type="url" placeholder="https://..."><label for="taskNotes">What did you complete?</label><textarea id="taskNotes" rows="3" maxlength="1000" required placeholder="Summarise your work (max 1000 characters)"></textarea><button class="btn btn-primary" type="submit">Save demo submission</button></form></div>
    <p class="muted">Demo only: this does not send your work to a mentor or company.</p>`;
    $("#taskForm").addEventListener("submit",e=>{e.preventDefault();const tasks=getStore("tsa_demo_tasks");tasks.push({link:$("#taskLink").value.trim(),notes:$("#taskNotes").value.trim(),date:new Date().toISOString()});setStore("tsa_demo_tasks",tasks);toast("Demo submission saved on this device.");renderDashboard("tasks");});
    const tasks=getStore("tsa_demo_tasks");tasks.slice().reverse().forEach(t=>{const card=document.createElement("div");card.className="dash-card";const h=document.createElement("h3");h.textContent="Saved demo submission";const p=document.createElement("p");p.textContent=t.notes;card.append(h,p);if(t.link){const a=document.createElement("a");a.href=t.link;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Open project link";a.className="text-link";card.append(a);}out.append(card);});
  }
  $$("[data-switch]",out).forEach(b=>b.addEventListener("click",()=>renderDashboard(b.dataset.switch)));
}
$("#verifyForm").addEventListener("submit",e=>{
  e.preventDefault();const id=$("#certificateId").value.trim().toUpperCase();const result=$("#verifyResult");result.className="verify-result";
  const cert=DEMO_CERTS[id];
  if(!cert){result.classList.add("error");result.textContent="No matching sample record found. This is not a live certificate registry.";return;}
  result.textContent=`${cert.status} · ${cert.name} · ${cert.program} · Date: ${cert.date}`;
});
