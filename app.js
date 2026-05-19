const modules = [
  { id: "command", label: "Command Center", icon: "layout-dashboard", roles: ["State Admin", "District Officer", "Finance/Admin"] },
  { id: "sims", label: "SIMS Inventory", icon: "package-search", roles: ["State Admin", "District Officer", "BVO", "AI Technician"] },
  { id: "vims", label: "VIMS Vaccines", icon: "syringe", roles: ["State Admin", "District Officer", "BVO", "MVU Staff"] },
  { id: "mpds", label: "MPDS Medicines", icon: "pill", roles: ["State Admin", "District Officer", "Finance/Admin", "BVO"] },
  { id: "ddss", label: "DDSS Surveillance", icon: "activity", roles: ["State Admin", "District Officer", "BVO", "MVU Staff"] },
  { id: "dtms", label: "Digital Training", icon: "graduation-cap", roles: ["State Admin", "District Officer", "Field Technician", "AI Technician"] },
  { id: "mvu", label: "MVU Operations", icon: "truck", roles: ["State Admin", "District Officer", "MVU Staff", "BVO"] },
  { id: "ems", label: "Expenditure", icon: "indian-rupee", roles: ["State Admin", "Finance/Admin", "District Officer"] },
  { id: "mfrs", label: "Monthly Farm Reports", icon: "clipboard-list", roles: ["State Admin", "District Officer", "BVO"] },
  { id: "allocation", label: "AI Technician Allocation", icon: "route", roles: ["State Admin", "District Officer", "AI Technician"] },
  { id: "farmer", label: "Farmer Services", icon: "users-round", roles: ["Farmer", "Support/Ops", "State Admin"] },
  { id: "grievance", label: "Grievance & Chatbot", icon: "messages-square", roles: ["Citizen", "Support/Ops", "State Admin"] },
  { id: "security", label: "Cybersecurity", icon: "shield-alert", roles: ["State Admin", "Support/Ops"] },
  { id: "integration", label: "Integration Ecosystem", icon: "workflow", roles: ["State Admin", "Support/Ops"] },
  { id: "roadmap", label: "Rollout Roadmap", icon: "milestone", roles: ["State Admin", "District Officer", "Finance/Admin"] },
  { id: "mobile", label: "Rural Mobile Ops", icon: "smartphone", roles: ["Field Technician", "MVU Staff", "AI Technician", "BVO"] }
];

const roles = {
  "State Admin": {
    scope: "Statewide governance visibility across all modules",
    priorities: ["Outbreak command", "Fund utilization", "District performance", "Security posture"],
    kpis: ["30 districts", "98.2% service SLA", "12 live escalations", "₹42.8 Cr tracked"]
  },
  "District Officer": {
    scope: "District operations, approvals, and field escalation control",
    priorities: ["Inventory approval", "MVU routing", "Disease response", "Training compliance"],
    kpis: ["14 blocks", "92% case closure", "6 stock alerts", "3 pending approvals"]
  },
  "BVO": {
    scope: "Block-level service delivery and livestock health workflows",
    priorities: ["Case triage", "Stock requests", "Farm reports", "Technician coordination"],
    kpis: ["42 villages", "87 visits due", "11 drafts pending", "2 outbreak watches"]
  },
  "Field Technician": {
    scope: "Offline-ready rural workflows and case capture",
    priorities: ["Assigned visits", "Draft sync", "GPS evidence", "Service closure"],
    kpis: ["9 visits today", "6 offline drafts", "74% battery", "Last sync 18 min"]
  },
  "MVU Staff": {
    scope: "Mobile veterinary unit routing, treatment, and emergency dispatch",
    priorities: ["Route optimization", "Emergency cases", "Medicine kit", "Upload queue"],
    kpis: ["128 km route", "4 emergency calls", "91% kit readiness", "22 cases"]
  },
  "AI Technician": {
    scope: "Artificial insemination scheduling, stock, and outcome tracking",
    priorities: ["Route plan", "Straw utilization", "Pregnancy follow-up", "Farmer requests"],
    kpis: ["18 AI tasks", "96% cold chain", "7 follow-ups", "2 stock transfers"]
  },
  "Finance/Admin": {
    scope: "Budget governance, procurement, expenditure, and audit trails",
    priorities: ["Approvals", "Utilization", "Vendor payments", "District variance"],
    kpis: ["₹8.4 Cr pending", "74% utilization", "19 invoices", "4 audit flags"]
  },
  "Support/Ops": {
    scope: "Platform operations, integrations, support, and service assurance",
    priorities: ["Tickets", "API uptime", "Device health", "User access"],
    kpis: ["99.94% uptime", "47 open tickets", "11 risky sessions", "8 API warnings"]
  },
  Farmer: {
    scope: "Service requests, vaccination reminders, grievance tracking",
    priorities: ["Book service", "Track request", "View history", "Chat support"],
    kpis: ["3 animals due", "1 active ticket", "2 reminders", "Next visit Friday"]
  },
  Citizen: {
    scope: "Public grievance submission, tracking, and assisted support",
    priorities: ["Register complaint", "Track ticket", "Escalate", "Feedback"],
    kpis: ["Ticket SLA 36h", "2 updates", "1 escalation", "Chat available"]
  }
};

const districts = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati",
  "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar",
  "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri",
  "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];

const profiles = {
  "State Admin": ["Ananya Rath", "Directorate / State Admin", "Odisha State", "SA"],
  "District Officer": ["Prakash Behera", "CDVO / District Officer", "Cuttack District", "DO"],
  BVO: ["Madhusmita Nayak", "Block Veterinary Officer", "Athagarh Block", "BV"],
  "Field Technician": ["Rakesh Sahoo", "Field Technician", "Assigned villages", "FT"],
  "MVU Staff": ["Debasis Das", "Mobile Veterinary Unit", "MVU-18 / Koraput", "MV"],
  "AI Technician": ["Sonalika Pradhan", "AI Technician", "Balangir Service Area", "AI"],
  "Finance/Admin": ["Nihar Mohanty", "Finance & Administration", "State Finance Cell", "FA"],
  "Support/Ops": ["Ritika Sen", "Support Operations", "Platform Operations", "SO"],
  Farmer: ["Gopal Majhi", "Farmer Services", "Registered farmer", "FR"],
  Citizen: ["Public User", "Citizen Support", "Odisha Citizen Portal", "CT"]
};

let activeRole = "State Admin";
let activeModule = "command";

const el = {
  html: document.documentElement,
  app: document.getElementById("app"),
  loginScreen: document.getElementById("loginScreen"),
  loginRoleGrid: document.getElementById("loginRoleGrid"),
  loginRoleSelect: document.getElementById("loginRoleSelect"),
  enterSystemBtn: document.getElementById("enterSystemBtn"),
  roleSelect: document.getElementById("roleSelect"),
  nav: document.getElementById("primaryNav"),
  title: document.getElementById("pageTitle"),
  breadcrumb: document.getElementById("breadcrumb"),
  roleBanner: document.getElementById("roleBanner"),
  content: document.getElementById("content"),
  themeToggle: document.getElementById("themeToggle"),
  loginThemeToggle: document.getElementById("loginThemeToggle"),
  sidePanel: document.getElementById("sidePanel"),
  profileBtn: document.getElementById("profileBtn"),
  profileDropdown: document.getElementById("profileDropdown"),
  profileRole: document.getElementById("profileRole"),
  profileName: document.getElementById("profileName"),
  profileMeta: document.getElementById("profileMeta"),
  profileJurisdiction: document.getElementById("profileJurisdiction"),
  logoutBtn: document.getElementById("logoutBtn")
};

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

function renderRoleSelect() {
  el.roleSelect.innerHTML = Object.keys(roles)
    .map((role) => `<option ${role === activeRole ? "selected" : ""}>${role}</option>`)
    .join("");
  el.loginRoleSelect.innerHTML = Object.keys(roles)
    .map((role) => `<option ${role === activeRole ? "selected" : ""}>${role}</option>`)
    .join("");
}

function renderLoginRoles() {
  el.loginRoleGrid.innerHTML = Object.keys(roles).map((role) => `
    <button type="button" class="role-option ${role === activeRole ? "active" : ""}" data-login-role="${role}">
      ${icon(role === "State Admin" ? "landmark" : role === "Citizen" ? "message-circle" : role === "Farmer" ? "wheat" : "badge-check")}
      <span>${role}</span>
    </button>
  `).join("");
}

function allowedModules() {
  return modules.filter((mod) => mod.roles.includes(activeRole));
}

function renderNav() {
  const allowed = allowedModules();
  if (!allowed.some((mod) => mod.id === activeModule)) activeModule = allowed[0].id;
  el.nav.innerHTML = allowed
    .map((mod) => `
      <button type="button" class="${mod.id === activeModule ? "active" : ""}" data-module="${mod.id}">
        ${icon(mod.icon)}
        <span>${mod.label}</span>
      </button>
    `)
    .join("");
}

function renderBanner() {
  const role = roles[activeRole];
  el.roleBanner.innerHTML = `
    <div class="banner-inner">
      <div>
        <div class="eyebrow">Permission-aware workspace</div>
        <h3>${activeRole}</h3>
        <p class="muted">${role.scope}</p>
      </div>
      <div class="toolbar">
        ${role.priorities.map((item) => `<span class="filter-chip">${item}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderProfile() {
  const [name, meta, jurisdiction, initials] = profiles[activeRole];
  document.querySelectorAll(".avatar").forEach((avatar) => {
    avatar.textContent = initials;
  });
  el.profileRole.textContent = activeRole;
  el.profileName.textContent = name;
  el.profileMeta.textContent = meta;
  el.profileJurisdiction.textContent = jurisdiction;
}

function toggleTheme() {
  const dark = el.html.dataset.theme === "dark";
  el.html.dataset.theme = dark ? "light" : "dark";
  const nextIcon = icon(dark ? "moon" : "sun");
  el.themeToggle.innerHTML = nextIcon;
  el.loginThemeToggle.innerHTML = nextIcon;
  refreshIcons();
}

function metricCards(cards) {
  return cards.map((card) => `
    <article class="metric-card span-3">
      <div class="metric-top">
        <div>
          <span class="mini-label">${card.label}</span>
          <span class="metric-value">${card.value}</span>
        </div>
        <span class="status-pill ${card.tone || "ok"}"><span class="dot ${card.tone || "ok"}"></span>${card.status}</span>
      </div>
      <span class="trend">${card.trend}</span>
    </article>
  `).join("");
}

function odishaHeatmap(mode = "Disease risk") {
  return `
    <section class="panel span-7">
      <div class="panel-title">
        <div>
          <div class="eyebrow">Odisha choropleth</div>
          <h2>${mode}</h2>
        </div>
        <div class="toolbar">
          <span class="filter-chip">District drilldown</span>
          <span class="filter-chip">Live overlay</span>
          <span class="filter-chip">AI risk score</span>
        </div>
      </div>
      <div class="odisha-map">
        ${districts.map((name, index) => `
          <button class="district risk-${(index % 4) + 1}" type="button" data-action="open-drawer">
            <strong>${name}</strong>
            <span>${Math.round(42 + ((index * 7) % 56))}%</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function bars(title, labels = ["SIMS", "VIMS", "MPDS", "DDSS", "MVU", "EMS", "DTMS", "MFRS", "AI", "GIS", "API", "Help"]) {
  return `
    <section class="panel span-5">
      <div class="panel-title">
        <div>
          <div class="eyebrow">Operational trend</div>
          <h2>${title}</h2>
        </div>
        <span class="status-pill ok"><span class="dot ok"></span>Streaming</span>
      </div>
      <div class="chart-bars">
        ${labels.map((label, i) => `<div class="bar" style="height:${44 + ((i * 17) % 120)}px" data-label="${label}"></div>`).join("")}
      </div>
    </section>
  `;
}

function table(title, rows, columns = ["Record", "District", "Status", "Owner", "SLA"]) {
  return `
    <section class="panel span-8">
      <div class="panel-title">
        <div>
          <div class="eyebrow">List view</div>
          <h2>${title}</h2>
        </div>
        <div class="toolbar">
          <span class="filter-chip">${icon("filter")} Filters</span>
          <span class="filter-chip">${icon("arrow-up-down")} Sort</span>
          <span class="filter-chip">${icon("rows-3")} Bulk actions</span>
        </div>
      </div>
      <table class="data-table">
        <thead><tr>${columns.map((col) => `<th>${col}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row) => `<tr data-action="open-drawer">${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function timeline(title = "Operational Timeline") {
  const events = [
    ["ok", "District officer approved emergency transfer to Kendrapara cold room.", "4 min ago"],
    ["watch", "MVU-18 reported weak network; 7 treatment sheets saved locally.", "18 min ago"],
    ["critical", "AI model escalated FMD cluster from watch to high priority.", "32 min ago"],
    ["ok", "Training completion uploaded for 48 field technicians.", "1 hr ago"]
  ];
  return `
    <section class="panel span-4">
      <div class="panel-title">
        <div>
          <div class="eyebrow">Activity log</div>
          <h2>${title}</h2>
        </div>
      </div>
      <div class="timeline">
        ${events.map(([tone, text, time]) => `
          <div class="timeline-row">
            <span class="dot ${tone}"></span>
            <div>
              <strong>${text}</strong>
              <p class="muted">${time}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function workflow(title, steps) {
  return `
    <section class="panel span-12">
      <div class="panel-title">
        <div>
          <div class="eyebrow">Workflow screen</div>
          <h2>${title}</h2>
        </div>
        <span class="status-pill watch"><span class="dot watch"></span>Approval aware</span>
      </div>
      <div class="workflow">
        ${steps.map((step) => `
          <div class="route-step">
            ${icon(step.icon)}
            <div>
              <strong>${step.title}</strong>
              <p class="muted">${step.copy}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function aiInsights() {
  return `
    <section class="panel span-4">
      <div class="panel-title">
        <div>
          <div class="eyebrow">AI analytics</div>
          <h2>Smart Recommendations</h2>
        </div>
        ${icon("sparkles")}
      </div>
      <div class="timeline">
        <div class="timeline-row"><span class="dot critical"></span><div><strong>Prioritize Kendrapara vaccination ring</strong><p class="muted">Predicted outbreak spread risk is 1.8x baseline over 72 hours.</p></div></div>
        <div class="timeline-row"><span class="dot watch"></span><div><strong>Rebalance semen stock</strong><p class="muted">Move 420 straws from Sambalpur to Kalahandi before Friday demand spike.</p></div></div>
        <div class="timeline-row"><span class="dot ok"></span><div><strong>Optimize MVU-07 route</strong><p class="muted">Merge two calls into one route and save 38 minutes.</p></div></div>
      </div>
    </section>
  `;
}

function renderCommand() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Statewide SLA", value: "98.2%", status: "Healthy", trend: "+2.4% vs last month" },
      { label: "Live Disease Alerts", value: "12", status: "Watch", tone: "watch", trend: "3 high priority clusters" },
      { label: "Inventory Risk", value: "7", status: "Action", tone: "critical", trend: "Cold chain and stock thresholds" },
      { label: "Fund Utilization", value: "74%", status: "On track", trend: "₹42.8 Cr monitored" }
    ])}
    ${odishaHeatmap("Statewide resource and disease intelligence")}
    ${bars("Cross-module activity")}
    ${aiInsights()}
    ${timeline("Command room event stream")}
  `;
}

function renderInventory(kind) {
  const config = {
    sims: ["SIMS Semen Inventory", "Semen straw batch lifecycle", ["Batch OD-S-4481", "Kalahandi", '<span class="status-pill critical">Low buffer</span>', "AI Officer", "24h"], ["Batch OD-S-4472", "Sambalpur", '<span class="status-pill ok">Surplus</span>', "Depot Manager", "3d"]],
    vims: ["VIMS Vaccine Inventory", "Vaccination stock and cold chain", ["FMD-VX-220", "Kendrapara", '<span class="status-pill watch">Emergency ring</span>', "CDVO", "8h"], ["HS-VX-118", "Ganjam", '<span class="status-pill ok">Stable</span>', "Cold Room", "5d"]],
    mpds: ["MPDS Medicine Distribution", "Procurement, depot, and issue tracking", ["Oxytetracycline", "Puri", '<span class="status-pill watch">Reorder due</span>', "Pharma Store", "48h"], ["Dewormer Kit", "Keonjhar", '<span class="status-pill ok">Issued</span>', "BVO", "Closed"]]
  }[kind];
  el.content.innerHTML = `
    ${metricCards([
      { label: "Available stock", value: "82.4%", status: "Tracked", trend: "Auto-reconciled from depot scans" },
      { label: "Threshold alerts", value: "19", status: "Action", tone: "watch", trend: "7 require district approval" },
      { label: "Cold chain health", value: "96%", status: "Stable", trend: "2 devices need calibration" },
      { label: "Pending indents", value: "34", status: "Queue", tone: "watch", trend: "Median approval 11.6h" }
    ])}
    ${table(config[0], [config[2], config[3], ["Transfer TR-1048", "Cuttack", '<span class="status-pill ok">In transit</span>', "Logistics", "18h"], ["Indent IN-7782", "Mayurbhanj", '<span class="status-pill watch">Awaiting approval</span>', "BVO", "12h"]])}
    ${timeline(config[1])}
    ${workflow("Stock request and approval flow", [
      { icon: "file-plus", title: "Create indent", copy: "Block request with item, quantity, and urgency evidence." },
      { icon: "badge-check", title: "District approval", copy: "Permission-aware approval with budget and threshold checks." },
      { icon: "truck", title: "Depot dispatch", copy: "Cold chain, route, and handoff tracked in one record." },
      { icon: "scan-line", title: "Field receipt", copy: "QR receipt, device sync, and variance capture." },
      { icon: "bar-chart-3", title: "Analytics update", copy: "Forecasts and utilization dashboards update immediately." }
    ])}
    ${bars("Demand forecast")}
  `;
}

function renderDisease() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Active outbreaks", value: "5", status: "High", tone: "critical", trend: "2 districts need rapid response" },
      { label: "Samples in transit", value: "128", status: "Lab", tone: "watch", trend: "GIS-linked chain of custody" },
      { label: "Cases closed", value: "91%", status: "Good", trend: "+6% from prior week" },
      { label: "Prediction accuracy", value: "86%", status: "AI", trend: "Model confidence on cluster detection" }
    ])}
    ${odishaHeatmap("Disease spread and response coverage")}
    ${aiInsights()}
    ${table("DDSS Case Registry", [
      ["DDSS-8841", "Kendrapara", '<span class="status-pill critical">FMD suspected</span>', "Rapid Response", "6h"],
      ["DDSS-8792", "Balasore", '<span class="status-pill watch">Lab pending</span>', "CDVO", "18h"],
      ["DDSS-8721", "Ganjam", '<span class="status-pill ok">Contained</span>', "BVO", "Closed"],
      ["DDSS-8655", "Koraput", '<span class="status-pill watch">Surveillance</span>', "MVU-04", "24h"]
    ])}
  `;
}

function renderTraining() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Training completion", value: "83%", status: "On track", trend: "4,812 certified users" },
      { label: "Assessments due", value: "292", status: "Queue", tone: "watch", trend: "District reminders scheduled" },
      { label: "Field adoption", value: "71%", status: "Growing", trend: "+12% after coaching" },
      { label: "Content updates", value: "18", status: "Live", trend: "Role-specific release notes" }
    ])}
    ${table("Role-wise Training Cohorts", [
      ["DTMS-AI-12", "Sundargarh", '<span class="status-pill ok">Certified</span>', "AI Technicians", "Complete"],
      ["DTMS-MVU-08", "Koraput", '<span class="status-pill watch">Assessment due</span>', "MVU Staff", "2d"],
      ["DTMS-BVO-31", "Cuttack", '<span class="status-pill ok">In progress</span>', "BVO", "5d"],
      ["DTMS-SEC-03", "State HQ", '<span class="status-pill critical">Mandatory</span>', "Admins", "24h"]
    ], ["Cohort", "District", "Status", "Audience", "Due"])}
    ${timeline("Learning and onboarding activity")}
    ${bars("Training adoption by module")}
  `;
}

function renderMVU() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Active MVUs", value: "114", status: "Live", trend: "GPS active across 28 districts" },
      { label: "Emergency calls", value: "38", status: "Dispatch", tone: "watch", trend: "Median response 42 minutes" },
      { label: "Route efficiency", value: "89%", status: "Good", trend: "AI route optimizer enabled" },
      { label: "Offline sheets", value: "76", status: "Sync", tone: "watch", trend: "Auto-upload queued" }
    ])}
    ${table("MVU Dispatch Board", [
      ["MVU-18", "Koraput", '<span class="status-pill watch">Low network</span>', "Dr. P. Mishra", "Route active"],
      ["MVU-07", "Puri", '<span class="status-pill critical">Emergency</span>', "Dr. S. Das", "18m ETA"],
      ["MVU-42", "Balangir", '<span class="status-pill ok">On schedule</span>', "Field Team 4", "2 visits"],
      ["MVU-03", "Cuttack", '<span class="status-pill ok">At depot</span>', "Driver logged", "Ready"]
    ], ["Unit", "District", "Status", "Team", "Next action"])}
    ${workflow("Emergency response workflow", [
      { icon: "phone-call", title: "Citizen call", copy: "Complaint converted to triaged MVU service case." },
      { icon: "map-pin", title: "GPS dispatch", copy: "Nearest vehicle, medicine kit, and route selected." },
      { icon: "stethoscope", title: "Treatment", copy: "Field diagnosis, medicine, and evidence capture." },
      { icon: "wifi-off", title: "Offline save", copy: "Draft persists during weak connectivity." },
      { icon: "check-circle-2", title: "Closure", copy: "SLA, invoice, stock, and report records update." }
    ])}
    ${bars("Service coverage")}
  `;
}

function renderFinance() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Budget utilized", value: "74%", status: "On track", trend: "₹42.8 Cr of ₹57.6 Cr" },
      { label: "Pending approvals", value: "43", status: "Queue", tone: "watch", trend: "₹8.4 Cr awaiting review" },
      { label: "Audit exceptions", value: "7", status: "Review", tone: "critical", trend: "Vendor and district variance" },
      { label: "Release compliance", value: "96%", status: "Good", trend: "PFMS references mapped" }
    ])}
    ${table("Expenditure Monitoring Ledger", [
      ["EMS-INV-991", "Cuttack", '<span class="status-pill watch">Finance review</span>', "Vendor Desk", "18h"],
      ["EMS-GR-184", "Keonjhar", '<span class="status-pill ok">Released</span>', "District Treasury", "Closed"],
      ["EMS-AUD-044", "Puri", '<span class="status-pill critical">Variance</span>', "Audit Cell", "24h"],
      ["EMS-PO-320", "State HQ", '<span class="status-pill ok">Committed</span>', "Procurement", "3d"]
    ], ["Document", "Unit", "Status", "Desk", "SLA"])}
    ${bars("Fund utilization")}
    ${timeline("Finance approval trail")}
  `;
}

function renderFarmReports() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Reports received", value: "91%", status: "Good", trend: "27 districts submitted" },
      { label: "Validation issues", value: "64", status: "Resolve", tone: "watch", trend: "Auto-detected anomalies" },
      { label: "Farm productivity", value: "+8%", status: "Trend", trend: "Milk yield and herd health" },
      { label: "Pending sign-offs", value: "18", status: "Queue", tone: "watch", trend: "BVO and district approvals" }
    ])}
    ${table("Monthly Farm Report Submissions", [
      ["MFRS-APR-KJR", "Keonjhar", '<span class="status-pill ok">Validated</span>', "BVO-12", "Closed"],
      ["MFRS-APR-PURI", "Puri", '<span class="status-pill watch">Anomaly</span>', "District Cell", "12h"],
      ["MFRS-APR-KPT", "Koraput", '<span class="status-pill watch">Draft</span>', "Block Team", "2d"],
      ["MFRS-APR-BLS", "Balasore", '<span class="status-pill ok">Signed</span>', "CDVO", "Closed"]
    ], ["Report", "District", "Status", "Owner", "Due"])}
    ${workflow("Farm report validation flow", [
      { icon: "clipboard-pen", title: "Block entry", copy: "Livestock, productivity, disease, and service data captured." },
      { icon: "scan-search", title: "Auto validation", copy: "Anomalies flagged against historical and district baselines." },
      { icon: "user-check", title: "BVO sign-off", copy: "Permission-aware correction and approval." },
      { icon: "building-2", title: "District consolidation", copy: "CDVO sees block-level variance and completion status." },
      { icon: "line-chart", title: "State analytics", copy: "Leadership dashboards update after monthly closure." }
    ])}
  `;
}

function renderAllocation() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "AI tasks today", value: "1,248", status: "Planned", trend: "89% route confidence" },
      { label: "Technician load", value: "76%", status: "Balanced", trend: "8 overload risks resolved" },
      { label: "Cold chain variance", value: "4", status: "Watch", tone: "watch", trend: "Smart transfer suggested" },
      { label: "Outcome follow-ups", value: "392", status: "Due", trend: "Pregnancy check queue" }
    ])}
    ${table("AI Technician Allocation Board", [
      ["AI-REQ-884", "Balangir", '<span class="status-pill ok">Assigned</span>', "Tech-118", "9:30 AM"],
      ["AI-REQ-902", "Kalahandi", '<span class="status-pill watch">Rebalance</span>', "Tech-044", "Today"],
      ["AI-REQ-931", "Sambalpur", '<span class="status-pill ok">Scheduled</span>', "Tech-223", "Tomorrow"],
      ["AI-REQ-956", "Mayurbhanj", '<span class="status-pill critical">Stock risk</span>', "Unassigned", "4h"]
    ], ["Request", "District", "Status", "Technician", "Slot"])}
    ${workflow("Smart allocation flow", [
      { icon: "calendar-plus", title: "Farmer request", copy: "Need, location, animal profile, and slot preference captured." },
      { icon: "brain", title: "AI matching", copy: "Technician skill, stock, route, and SLA are scored." },
      { icon: "route", title: "Route plan", copy: "Low-connectivity route and backup assignment generated." },
      { icon: "badge-check", title: "Field service", copy: "Outcome, evidence, and consumption recorded." },
      { icon: "refresh-cw", title: "Follow-up", copy: "Pregnancy check and next service reminders scheduled." }
    ])}
    ${aiInsights()}
  `;
}

function renderCitizen() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Open grievances", value: "2,184", status: "Managed", trend: "82% within SLA" },
      { label: "Escalations", value: "73", status: "Priority", tone: "watch", trend: "District nodal officers notified" },
      { label: "Citizen CSAT", value: "4.3", status: "Good", trend: "Based on 8,412 ratings" },
      { label: "Chatbot deflection", value: "61%", status: "AI", trend: "Multilingual guided workflows" }
    ])}
    ${table("Citizen Grievance Queue", [
      ["GRV-88412", "Puri", '<span class="status-pill watch">Escalated</span>', "Support Desk", "12h"],
      ["GRV-88444", "Cuttack", '<span class="status-pill ok">Resolved</span>', "BVO", "Closed"],
      ["GRV-88501", "Kendrapara", '<span class="status-pill critical">Emergency</span>', "MVU Dispatch", "2h"],
      ["GRV-88542", "Ganjam", '<span class="status-pill watch">Awaiting citizen</span>', "Helpdesk", "1d"]
    ], ["Ticket", "District", "Status", "Owner", "SLA"])}
    <section class="panel span-4">
      <div class="panel-title"><div><div class="eyebrow">AI chatbot</div><h2>Guided Support Assistant</h2></div>${icon("bot")}</div>
      <div class="timeline">
        <div class="timeline-row"><span class="dot ok"></span><div><strong>Odisha language-aware triage</strong><p class="muted">Complaint category, severity, and location are inferred before submission.</p></div></div>
        <div class="timeline-row"><span class="dot watch"></span><div><strong>Voice assistance concept</strong><p class="muted">Citizen can speak a request, receive FAQ suggestions, and track ticket status.</p></div></div>
        <div class="timeline-row"><span class="dot ok"></span><div><strong>Feedback loop</strong><p class="muted">Resolution rating updates SLA and support quality dashboards.</p></div></div>
      </div>
    </section>
    ${workflow("Grievance lifecycle", [
      { icon: "message-square-plus", title: "Register", copy: "Citizen submits issue with category, location, and evidence." },
      { icon: "tags", title: "Classify", copy: "AI suggests severity, module owner, and response SLA." },
      { icon: "send", title: "Assign", copy: "Ticket routes to BVO, MVU, district, or support desk." },
      { icon: "arrow-up-circle", title: "Escalate", copy: "SLA breach triggers nodal officer visibility." },
      { icon: "star", title: "Resolve", copy: "Citizen confirms outcome and rates service." }
    ])}
  `;
}

function renderSecurity() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Risk score", value: "82", status: "Moderate", tone: "watch", trend: "5 suspicious sessions under review" },
      { label: "MFA coverage", value: "97%", status: "Strong", trend: "Role-based enforcement active" },
      { label: "Audit events", value: "1.8M", status: "Indexed", trend: "90-day searchable trail" },
      { label: "API uptime", value: "99.94%", status: "Healthy", trend: "3 partner warnings" }
    ])}
    <section class="panel span-8">
      <div class="panel-title"><div><div class="eyebrow">Security operations</div><h2>Compliance & Access Control</h2></div><span class="status-pill watch"><span class="dot watch"></span>Continuous monitoring</span></div>
      <div class="security-grid">
        ${["User access monitoring", "Audit log review", "Session tracking", "Threat alerts", "Permission drift", "Device health", "Encryption status", "Data access visibility", "Compliance tasks"].map((item, i) => `
          <div class="risk-card">
            <span class="mini-label">${i % 3 === 0 ? "Review" : i % 3 === 1 ? "Healthy" : "Watch"}</span>
            <h3>${item}</h3>
            <p class="muted">${64 + ((i * 9) % 32)}% posture score</p>
          </div>
        `).join("")}
      </div>
    </section>
    ${timeline("Security event stream")}
    ${table("Suspicious Activity Queue", [
      ["SEC-1044", "State HQ", '<span class="status-pill critical">Privilege spike</span>', "IAM", "1h"],
      ["SEC-1081", "Balasore", '<span class="status-pill watch">New device</span>', "SOC", "6h"],
      ["SEC-1102", "API Gateway", '<span class="status-pill watch">Rate anomaly</span>', "Platform Ops", "2h"],
      ["SEC-1119", "Cuttack", '<span class="status-pill ok">Reviewed</span>', "Audit Cell", "Closed"]
    ], ["Event", "Scope", "Status", "Owner", "SLA"])}
  `;
}

function renderIntegration() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "API health", value: "99.94%", status: "Healthy", trend: "Gateway and partner systems" },
      { label: "Data flows", value: "42", status: "Active", trend: "Lab, GIS, SMS, finance" },
      { label: "Failed syncs", value: "11", status: "Watch", tone: "watch", trend: "Retries scheduled" },
      { label: "Auth checks", value: "2.4M", status: "Secured", trend: "RBAC and audit mapped" }
    ])}
    <section class="panel span-12">
      <div class="panel-title"><div><div class="eyebrow">Enterprise architecture</div><h2>Integration Ecosystem Control Plane</h2></div><span class="status-pill ok"><span class="dot ok"></span>API gateway online</span></div>
      <div class="architecture">
        <div class="integration-node"><span class="mini-label">External</span><h3>Veterinary Lab Systems</h3><p class="muted">Sample IDs, test results, chain of custody, disease notifications.</p></div>
        <div class="integration-node core"><span class="mini-label">Core platform</span><h3>Livestock Operations Data Hub</h3><p class="muted">RBAC, audit log, workflow engine, analytics warehouse, AI services.</p></div>
        <div class="integration-node"><span class="mini-label">External</span><h3>GIS & Map Services</h3><p class="muted">Odisha district overlays, route tracking, outbreak heatmaps.</p></div>
        <div class="integration-node"><span class="mini-label">Notifications</span><h3>SMS, WhatsApp, Email</h3><p class="muted">Citizen updates, field alerts, OTP, escalation messages.</p></div>
        <div class="integration-node"><span class="mini-label">Identity</span><h3>SSO, MFA, OTP Gateway</h3><p class="muted">Role-based access, device trust, session indicators.</p></div>
        <div class="integration-node"><span class="mini-label">Government</span><h3>Finance & State Platforms</h3><p class="muted">Expenditure references, procurement data, reporting exports.</p></div>
      </div>
    </section>
    ${table("API Monitoring", [
      ["/lab-results", "Statewide", '<span class="status-pill ok">Healthy</span>', "Lab Adapter", "214ms"],
      ["/gis/district-overlay", "GIS", '<span class="status-pill ok">Healthy</span>', "Map Service", "188ms"],
      ["/otp/send", "Auth", '<span class="status-pill watch">Retrying</span>', "SMS Gateway", "612ms"],
      ["/finance/release", "EMS", '<span class="status-pill ok">Healthy</span>', "Finance Bridge", "344ms"]
    ], ["Endpoint", "Domain", "Status", "Owner", "Latency"])}
  `;
}

function renderRoadmap() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Districts onboarded", value: "22/30", status: "Rolling", trend: "4 districts in active cutover" },
      { label: "Training complete", value: "78%", status: "Growing", trend: "4,812 users certified" },
      { label: "Go-live risks", value: "9", status: "Watch", tone: "watch", trend: "Dependencies and device readiness" },
      { label: "Phase progress", value: "64%", status: "Phase 2", trend: "Procurement and integrations next" }
    ])}
    <section class="panel span-8">
      <div class="panel-title"><div><div class="eyebrow">Rollout timeline</div><h2>State Implementation Roadmap</h2></div><span class="status-pill watch"><span class="dot watch"></span>Milestone tracking</span></div>
      <div class="gantt">
        ${[
          ["Pilot districts", 100],
          ["SIMS/VIMS rollout", 78],
          ["MVU mobile deployment", 66],
          ["Finance integrations", 42],
          ["Command center go-live", 58],
          ["Citizen portal launch", 36]
        ].map(([name, width]) => `
          <div class="gantt-row">
            <strong>${name}</strong>
            <div class="gantt-track"><div class="gantt-fill" style="width:${width}%"></div></div>
          </div>
        `).join("")}
      </div>
    </section>
    ${timeline("Rollout governance log")}
    ${odishaHeatmap("District onboarding status")}
  `;
}

function renderMobile() {
  el.content.innerHTML = `
    <section class="panel span-12">
      <div class="panel-title">
        <div>
          <div class="eyebrow">Rural operations</div>
          <h2>Offline-first Field Staff Experience</h2>
        </div>
        <span class="status-pill watch"><span class="dot watch"></span>Weak network mode</span>
      </div>
      <div class="mobile-showcase">
        <div class="mobile-frame">
          <div class="phone-screen">
            <div class="phone-top"><strong>MVU Field</strong><span>2G · 74%</span></div>
            <div class="phone-body">
              <div class="offline-card high"><span class="mini-label">Emergency</span><h3>Case MVU-88501</h3><p class="muted">Cattle fever, village 8.4 km ahead. GPS cached.</p></div>
              <div class="offline-card"><div class="kv-row"><span>Pending uploads</span><strong>6</strong></div><div class="kv-row"><span>Last sync</span><strong>18 min</strong></div><div class="kv-row"><span>Local drafts</span><strong>Auto-saved</strong></div></div>
              <button class="primary-btn" type="button">${icon("plus")} New treatment sheet</button>
              <div class="offline-card"><span class="mini-label">Route</span><h3>Next stops</h3><p class="muted">3 visits sequenced for low signal zones. Voice note capture available.</p></div>
              <div class="offline-card"><span class="mini-label">Sync queue</span><p class="muted">Retrying when stable network returns. Photos compressed for upload.</p></div>
            </div>
          </div>
        </div>
        <div>
          ${workflow("Low-connectivity workflow", [
            { icon: "wifi-off", title: "Detect weak network", copy: "UI shifts to local-first forms with clear sync state." },
            { icon: "save", title: "Save drafts", copy: "Service sheets, photos, GPS, and voice notes persist on device." },
            { icon: "map", title: "Cache route", copy: "Route and village stop list remain usable offline." },
            { icon: "upload-cloud", title: "Retry queue", copy: "Uploads retry with compression and conflict handling." },
            { icon: "check-check", title: "Server sync", copy: "Inventory, reports, and SLA records reconcile after upload." }
          ])}
        </div>
      </div>
    </section>
  `;
}

function renderFarmer() {
  el.content.innerHTML = `
    ${metricCards([
      { label: "Service requests", value: "18.2K", status: "Active", trend: "AI, vaccination, treatment" },
      { label: "Vaccination reminders", value: "42K", status: "Scheduled", trend: "Village-wise outreach" },
      { label: "Follow-ups due", value: "7,884", status: "Queue", tone: "watch", trend: "AI and treatment outcomes" },
      { label: "Citizen satisfaction", value: "4.3", status: "Good", trend: "Farmer feedback loop" }
    ])}
    ${table("Farmer Service Requests", [
      ["FS-8841", "Kalahandi", '<span class="status-pill ok">Assigned</span>', "AI Technician", "Today"],
      ["FS-8902", "Puri", '<span class="status-pill watch">Awaiting MVU</span>', "MVU Desk", "6h"],
      ["FS-8991", "Cuttack", '<span class="status-pill ok">Reminder sent</span>', "Vaccination Team", "Tomorrow"],
      ["FS-9014", "Balasore", '<span class="status-pill critical">Emergency</span>', "BVO", "2h"]
    ], ["Request", "District", "Status", "Owner", "Due"])}
    ${workflow("Farmer service journey", [
      { icon: "smartphone", title: "Request", copy: "Farmer requests service by portal, call center, or assisted entry." },
      { icon: "bot", title: "Guide", copy: "AI assistant recommends category and required details." },
      { icon: "user-plus", title: "Assign", copy: "Technician or MVU receives role-aware task." },
      { icon: "bell", title: "Notify", copy: "SMS/voice notification updates farmer in local language." },
      { icon: "history", title: "History", copy: "Animal service history and reminders remain accessible." }
    ])}
  `;
}

function renderModule() {
  const mod = modules.find((item) => item.id === activeModule);
  el.title.textContent = mod.label;
  el.breadcrumb.textContent = `${activeRole} / ${mod.label}`;
  renderBanner();

  const renderers = {
    command: renderCommand,
    sims: () => renderInventory("sims"),
    vims: () => renderInventory("vims"),
    mpds: () => renderInventory("mpds"),
    ddss: renderDisease,
    dtms: renderTraining,
    mvu: renderMVU,
    ems: renderFinance,
    mfrs: renderFarmReports,
    allocation: renderAllocation,
    farmer: renderFarmer,
    grievance: renderCitizen,
    security: renderSecurity,
    integration: renderIntegration,
    roadmap: renderRoadmap,
    mobile: renderMobile
  };
  renderers[activeModule]();
  renderProfile();
  refreshIcons();
}

function enterSystem() {
  activeRole = el.loginRoleSelect.value;
  activeModule = allowedModules()[0]?.id || "command";
  el.loginScreen.classList.add("hidden");
  el.app.classList.add("is-authenticated");
  renderRoleSelect();
  renderLoginRoles();
  renderNav();
  renderModule();
}

function logout() {
  el.profileDropdown.classList.remove("open");
  el.profileDropdown.setAttribute("aria-hidden", "true");
  el.profileBtn.setAttribute("aria-expanded", "false");
  el.app.classList.remove("is-authenticated");
  el.loginScreen.classList.remove("hidden");
  renderLoginRoles();
  refreshIcons();
}

function bindEvents() {
  el.roleSelect.addEventListener("change", (event) => {
    activeRole = event.target.value;
    el.loginRoleSelect.value = activeRole;
    renderLoginRoles();
    renderNav();
    renderModule();
  });

  el.loginRoleSelect.addEventListener("change", (event) => {
    activeRole = event.target.value;
    renderRoleSelect();
    renderLoginRoles();
  });

  el.loginRoleGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-login-role]");
    if (!button) return;
    activeRole = button.dataset.loginRole;
    renderRoleSelect();
    renderLoginRoles();
    refreshIcons();
  });

  el.enterSystemBtn.addEventListener("click", enterSystem);

  el.nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-module]");
    if (!button) return;
    activeModule = button.dataset.module;
    renderNav();
    renderModule();
  });

  el.themeToggle.addEventListener("click", () => {
    toggleTheme();
  });

  el.loginThemeToggle.addEventListener("click", () => {
    toggleTheme();
  });

  el.profileBtn.addEventListener("click", () => {
    const open = !el.profileDropdown.classList.contains("open");
    el.profileDropdown.classList.toggle("open", open);
    el.profileDropdown.setAttribute("aria-hidden", String(!open));
    el.profileBtn.setAttribute("aria-expanded", String(open));
  });

  el.logoutBtn.addEventListener("click", logout);

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-drawer") {
      el.sidePanel.classList.add("open");
      el.sidePanel.setAttribute("aria-hidden", "false");
    }
    if (action === "close-drawer") {
      el.sidePanel.classList.remove("open");
      el.sidePanel.setAttribute("aria-hidden", "true");
    }
  });
}

renderRoleSelect();
renderLoginRoles();
renderNav();
renderModule();
bindEvents();
