'use strict'

/* ---------- Data ---------- */
const skills = [
  { category: 'AI & LLM', items: ['Agentic AI', 'LLMs', 'RAG', 'LangChain', 'AI Workflows', 'Retrieval Evaluation'] },
  { category: 'Machine Learning', items: ['Scikit-learn', 'XGBoost', 'Ensemble Learning', 'Feature Engineering'] },
  { category: 'Deep Learning', items: ['PyTorch', 'Keras', 'CNNs', 'Transfer Learning', 'Model Compression'] },
  { category: 'Computer Vision & Edge AI', items: ['Semantic Segmentation', 'Object Detection', 'Pruned CNNs', 'BNNs', 'AdderNet', 'DeepShift'] },
  { category: 'Backend & AI Infrastructure', items: ['FastAPI', 'REST APIs', 'asyncio', 'React', 'FFmpeg', 'ElevenLabs', 'FAISS', 'Cross-Encoder Re-ranking'] },
  { category: 'Programming', items: ['Python', 'SQL', 'C/C++'] },
  { category: 'Data & Tooling', items: ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'MySQL', 'GitHub Actions CI', 'pytest', 'Structured Logging', 'Caching'] },
]

// Add `github` / `demo` URLs to show the matching buttons on a project card.
const projects = [
  {
    name: 'AI Video Dubbing Platform',
    variant: 'dubbing',
    problem: 'AI dubbing is long-running work that blocks clients and breaks on timeouts.',
    solution:
      'A full-stack asynchronous platform with job-based REST APIs and async polling for non-blocking AI processing.',
    contribution:
      'Concurrent multi-language processing with asyncio.gather, plus an FFmpeg pipeline for frame-accurate trimming, AI voice-track muxing, and automated SRT/VTT subtitles.',
    tech: ['FastAPI', 'React/TypeScript', 'FFmpeg', 'asyncio'],
    flow: ['React UI', 'FastAPI job API', 'asyncio workers', 'FFmpeg + AI voice', 'SRT/VTT output'],
    github: '',
    demo: '',
  },
  {
    name: 'Production RAG System',
    variant: 'rag',
    problem: 'Accurate, fast knowledge retrieval over documents at scale.',
    solution:
      'A production-style RAG system with LangChain, FAISS, and Ollama, exposed through FastAPI and containerized with Docker Compose.',
    contribution:
      'FAISS IVF/HNSW indexing and cross-encoder re-ranking, evaluated with a custom harness; added query caching, structured logging, and automated testing.',
    tech: ['LangChain', 'FAISS', 'Ollama', 'FastAPI', 'Docker'],
    flow: ['Documents', 'FAISS IVF/HNSW', 'Cross-encoder re-rank', 'Ollama LLM', 'FastAPI'],
    results: 'Improved Recall@k and query latency, measured with a custom evaluation harness.',
    github: '',
    demo: '',
  },
  {
    name: 'Triage Severity & ICU-Risk Classification System',
    variant: 'triage',
    problem: 'Classifying emergency-department patients by triage severity and ICU risk.',
    solution:
      'A 5-class ESI triage ML pipeline with a FastAPI + React/Vite clinical dashboard, hosted on Render and Vercel.',
    contribution:
      'Removed 28+ leakage-prone features; evaluated Logistic Regression, Random Forest, and Gradient Boosting with stratified k-fold CV, weighted Cohen’s Kappa, and error analysis; added permutation feature importance (XAI).',
    tech: ['Python', 'scikit-learn', 'FastAPI', 'React', 'Vite'],
    flow: ['Patient features', 'ML pipeline', 'Triage level', 'Feature importance', 'React dashboard'],
    github: '',
    demo: '',
  },
  {
    name: 'Voice-Driven Lead Generation System',
    variant: 'voice',
    problem: 'Turning customer conversations into structured, usable sales leads.',
    solution:
      'An end-to-end voice system with multi-turn customer discovery, knowledge-grounded responses, and webhook-based tool calling.',
    contribution:
      'Pydantic validation and Google Sheets API with OAuth2 for reliable lead persistence and real-time sales visibility, using a modular, provider-agnostic architecture.',
    tech: ['ElevenLabs', 'FastAPI', 'Google Sheets API'],
    flow: ['ElevenLabs voice', 'Webhook tool call', 'FastAPI + Pydantic', 'Google Sheets'],
    github: '',
    demo: '',
  },
  {
    name: 'Coronary Artery Disease Prediction using Voting Ensemble',
    variant: 'ensemble',
    problem: 'Predicting coronary artery disease reliably from imbalanced medical datasets.',
    solution: 'A two-layer ensemble framework combining Random Forest, XGBoost, and SVM classifiers.',
    contribution: 'Validated model robustness using cross-validation on imbalanced medical datasets.',
    results: 'Improved prediction accuracy by approximately 7–10% compared to individual models.',
    tech: ['Python', 'Scikit-learn', 'XGBoost'],
    flow: ['Medical dataset', 'Random Forest', 'XGBoost', 'SVM', 'Voting ensemble'],
    github: '',
    demo: '',
  },
  {
    name: 'Pneumonia Detection from Chest X-Ray Images',
    variant: 'xray',
    problem: 'Automated detection of pneumonia from chest X-ray images.',
    solution: 'A Deep Convolutional Neural Network for automated pneumonia detection.',
    contribution: 'CLAHE-based preprocessing to improve image contrast before classification.',
    results:
      'Enhanced recall and sensitivity by approximately 9% with CLAHE preprocessing, with consistent classification performance across validation experiments.',
    tech: ['Keras', 'Deep CNN', 'CLAHE'],
    flow: ['Chest X-ray', 'CLAHE preprocessing', 'Deep CNN', 'Pneumonia detection'],
    github: '',
    demo: '',
  },
]

/* ---------- Helpers ---------- */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const SVG_NS = 'http://www.w3.org/2000/svg'

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function icon(id, size) {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', 'icon')
  svg.setAttribute('width', size)
  svg.setAttribute('height', size)
  svg.setAttribute('aria-hidden', 'true')
  const use = document.createElementNS(SVG_NS, 'use')
  use.setAttribute('href', `#${id}`)
  svg.appendChild(use)
  return svg
}

function pills(items, listClass) {
  const ul = el('ul', listClass || 'pill-list')
  items.forEach((item) => ul.appendChild(el('li', 'pill', item)))
  return ul
}

function reveal(node, delay) {
  node.classList.add('reveal')
  if (delay) node.style.setProperty('--delay', `${delay}s`)
  return node
}

/* ---------- Skills + tech stack ---------- */
function renderSkills() {
  const grid = document.getElementById('skills-grid')
  const stack = document.getElementById('stack-list')

  skills.forEach((skill, i) => {
    const card = el('div', 'card card-hover')
    card.appendChild(el('h3', 'card-title', skill.category))
    card.appendChild(pills(skill.items))
    const wrap = reveal(el('div', 'reveal-full'), (i % 3) * 0.1)
    wrap.appendChild(card)
    grid.appendChild(wrap)

    const row = reveal(el('div', 'stack-row'), (i % 4) * 0.05)
    row.appendChild(el('h3', null, skill.category))
    row.appendChild(pills(skill.items))
    stack.appendChild(row)
  })
}

/* ---------- Project visual (animated flow diagram) ---------- */
const CYCLE_MS = 6000
const SPLIT_OFFSETS = [-6, 0, 6]
const FAN_POSITIONS = ['16.67%', '50%', '83.33%']

function packet(durationSec, pos) {
  const p = el('span', 'pv-packet')
  p.style.setProperty('--dur', `${durationSec}s`)
  if (pos) p.style.setProperty('--pos', pos)
  return p
}

function createVisual(project) {
  const { flow, variant } = project
  const root = el('div', 'pv')
  root.appendChild(el('div', 'pv-grid'))
  const bar = el('div', 'pv-bar')
  for (let i = 0; i < 3; i++) bar.appendChild(el('span'))
  root.appendChild(bar)

  const body = el('div', 'pv-body')
  const flowEl = el('div', 'pv-flow')
  body.appendChild(flowEl)
  root.appendChild(body)

  const nodes = [] // node elements, indexed by stage position
  const links = [] // connector elements that carry packets
  let activeNodes = () => [] // nodes highlighted for a given tick
  let packetHosts = () => [] // hosts that should show a packet for a given tick
  let extras = { levels: [] }

  const makeNode = (label, extraClass) => {
    const n = el('div', `pv-node${extraClass ? ` ${extraClass}` : ''}`)
    n.appendChild(document.createTextNode(label))
    return n
  }

  let stages

  if (variant === 'ensemble') {
    stages = 3
    const first = makeNode(flow[0], 'edge')
    const mid = el('div', 'pv-ens-mid')
    const midNodes = flow.slice(1, 4).map((label) => mid.appendChild(makeNode(label)))
    const last = makeNode(flow[4], 'edge')
    const fans = [0, 1].map(() => {
      const fan = el('div', 'pv-fan')
      FAN_POSITIONS.forEach((pos) => {
        const line = el('span', 'pv-fan-line')
        line.style.setProperty('--pos', pos)
        fan.appendChild(line)
      })
      return fan
    })
    flowEl.append(first, fans[0], mid, fans[1], last)
    activeNodes = (tick) => (tick === 0 ? [first] : tick === 2 ? midNodes : tick === 4 ? [last] : [])
    packetHosts = (tick) => {
      const stage = tick % 2 === 1 ? (tick - 1) / 2 : -1
      return stage >= 0 && stage < 2 ? [{ host: fans[stage], fan: true }] : []
    }
    nodes.push(first, ...midNodes, last)
  } else {
    stages = flow.length
    flow.forEach((label, k) => {
      const item = el('div', 'pv-item')
      const node = makeNode(label)
      if (variant === 'voice' && k === 0) {
        const voice = el('span', 'pv-voice')
        voice.setAttribute('aria-hidden', 'true')
        for (let i = 0; i < 5; i++) {
          const b = el('span')
          b.style.setProperty('--s', 0.3 + (i % 3) * 0.3)
          b.style.setProperty('--d', `${i * 0.12}s`)
          voice.appendChild(b)
        }
        node.prepend(voice)
      }
      item.appendChild(node)
      nodes.push(node)
      if (k < flow.length - 1) {
        const link = el('div', 'pv-link')
        item.appendChild(link)
        links.push(link)
      }
      flowEl.appendChild(item)
    })
    activeNodes = (tick) => (tick % 2 === 0 && nodes[tick / 2] ? [nodes[tick / 2]] : [])
    packetHosts = (tick) => {
      const k = tick % 2 === 1 ? (tick - 1) / 2 : -1
      return links[k] ? [{ host: links[k], split: variant === 'rag' && k === 1 }] : []
    }
  }

  if (variant === 'dubbing') {
    const tracks = el('div', 'pv-tracks')
    tracks.setAttribute('aria-hidden', 'true')
    ;[3, 4, 5].forEach((duration, i) => {
      const track = el('div')
      const fill = el('i')
      fill.style.setProperty('--s', 0.4 + i * 0.2)
      fill.style.setProperty('--d', `${duration}s`)
      track.appendChild(fill)
      tracks.appendChild(track)
    })
    body.appendChild(tracks)
  }

  if (variant === 'xray') {
    const scan = el('div', 'pv-scan')
    scan.setAttribute('aria-hidden', 'true')
    const box = el('div', 'pv-scan-box')
    ;[
      ['Before', 'linear-gradient(135deg, #9ca3af, #d1d5db)'],
      ['After', 'linear-gradient(135deg, #111827, #f9fafb)'],
    ].forEach(([label, background]) => {
      const pane = el('div')
      const img = el('div', 'pv-scan-img')
      img.style.background = background
      pane.append(img, el('p', null, label))
      box.appendChild(pane)
    })
    box.appendChild(el('span', 'pv-scan-line'))
    scan.appendChild(box)
    body.appendChild(scan)
  }

  if (variant === 'triage') {
    const levels = el('div', 'pv-levels')
    levels.setAttribute('aria-hidden', 'true')
    for (let n = 1; n <= 5; n++) extras.levels.push(levels.appendChild(el('span', null, String(n))))
    body.appendChild(levels)
  }

  /* --- animation loop --- */
  const steps = stages * 2
  const interval = CYCLE_MS / steps
  let inView = false
  let timer = null
  let tick = -1

  const render = () => {
    nodes.forEach((n) => n.classList.remove('is-active'))
    root.querySelectorAll('.pv-packet, .pv-split').forEach((p) => p.remove())
    if (tick < 0) {
      extras.levels.forEach((l) => l.classList.remove('is-active'))
      return
    }
    activeNodes(tick).forEach((n) => n.classList.add('is-active'))
    packetHosts(tick).forEach(({ host, split, fan }) => {
      const dur = interval / 1000
      if (fan) {
        FAN_POSITIONS.forEach((pos) => host.appendChild(packet(dur, pos)))
      } else if (split) {
        SPLIT_OFFSETS.forEach((offset) => {
          const wrap = el('span', 'pv-split')
          wrap.style.setProperty('--off', `${offset}px`)
          wrap.appendChild(packet(dur))
          host.appendChild(wrap)
        })
      } else {
        host.appendChild(packet(dur))
      }
    })
    const active = Math.floor(tick / 2) % 5
    extras.levels.forEach((l, i) => l.classList.toggle('is-active', i === active))
  }

  const sync = () => {
    const running = inView && !reducedMotion.matches
    root.classList.toggle('is-running', running)
    clearInterval(timer)
    timer = null
    if (!running) {
      tick = -1
      render()
      return
    }
    tick = 0
    render()
    timer = setInterval(() => {
      tick = (tick + 1) % steps
      render()
    }, interval)
  }

  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting === inView) return
      inView = entry.isIntersecting
      sync()
    },
    { rootMargin: '-60px' },
  ).observe(root)
  reducedMotion.addEventListener('change', sync)

  return root
}

/* ---------- Projects ---------- */
function field(label, text) {
  const wrap = el('div')
  wrap.appendChild(el('p', 'field-label', label))
  wrap.appendChild(el('p', 'field-text', text))
  return wrap
}

function linkButton(href, iconId, label) {
  const a = el('a')
  a.href = href
  a.target = '_blank'
  a.rel = 'noreferrer'
  a.append(icon(iconId, 16), document.createTextNode(label))
  return a
}

function createProjectCard(project, index) {
  const border = el('div', 'project-border')
  const card = el('div', 'project-card')
  border.appendChild(card)

  card.appendChild(createVisual(project))

  const head = el('div', 'project-head')
  head.appendChild(el('span', 'project-num', String(index + 1).padStart(2, '0')))
  head.appendChild(el('h3', null, project.name))
  card.appendChild(head)

  const body = el('div', 'project-body')
  body.appendChild(field('Problem', project.problem))
  body.appendChild(field('Solution', project.solution))

  const detailsWrap = el('div')
  const toggle = el('button', 'toggle-details', 'Show details')
  toggle.type = 'button'
  toggle.setAttribute('aria-expanded', 'false')
  const details = field('Key contribution', project.contribution)
  details.classList.add('details')
  details.hidden = true
  toggle.addEventListener('click', () => {
    const open = details.hidden
    details.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggle.textContent = open ? 'Hide details' : 'Show details'
  })
  detailsWrap.append(toggle, details)
  body.appendChild(detailsWrap)

  if (project.results) {
    const box = field('Result', project.results)
    box.classList.add('result-box')
    body.appendChild(box)
  }
  card.appendChild(body)
  card.appendChild(pills(project.tech))

  if (project.github || project.demo) {
    const links = el('div', 'project-links')
    if (project.github) links.appendChild(linkButton(project.github, 'i-git-branch', 'GitHub'))
    if (project.demo) links.appendChild(linkButton(project.demo, 'i-external', 'Live demo'))
    card.appendChild(links)
  }

  const wrap = reveal(el('div', 'reveal-full'), (index % 2) * 0.1)
  wrap.appendChild(border)
  return wrap
}

function renderProjects() {
  const grid = document.getElementById('projects-grid')
  projects.forEach((project, i) => grid.appendChild(createProjectCard(project, i)))
}

/* ---------- Navbar ---------- */
function initNav() {
  const toggle = document.getElementById('nav-toggle')
  const menu = document.getElementById('mobile-menu')
  const links = document.querySelectorAll('.nav-link')

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    menu.hidden = !open
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden))
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`))
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal')
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '-60px' },
  )
  targets.forEach((t) => observer.observe(t))
}

renderSkills()
renderProjects()
initNav()
initReveal()
