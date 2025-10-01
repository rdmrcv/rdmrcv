---
locale: "en"
name: "Roman Domrachev"
title: "Senior Backend (Go)"
kicker: "Founding Engineer @ Brandis · Go Backend · product-to-infrastructure ownership."
ogDescription: |
  Senior Go backend engineer.
location: "Yerevan, Armenia"
openTo: "Remote (EU)"
relocation: "France"
toolbox:
  - "Go (Golang)"
  - "WebSockets"
  - "Kafka / Redpanda"
  - "ClickHouse"
  - "VictoriaMetrics"
  - "PostgreSQL"
  - "Redis"
  - "Kubernetes"
  - "Observability"
contact:
  email: "r@dmrcv.me"
  linkedin: "https://linkedin.com/in/rdmrcv/"
  github: "https://github.com/rdmrcv"
  pdf:
    file: "/files/profile.pdf"
    name: "Roman Domrachev — Senior Backend (Go)"
experience:
  - company: "Brandis"
    role: "Founding Engineer & Head of Development"
    period: "2018–present"
    location: "Remote · Vilnius, LT"
    summary:
      - "Shaped product scope directly; I transformed vague vision of 'no-code editor' into deliverable APIs and constraints. Then implemented its backend."
      - "Designed and implemented WebSockets server handling 400k concurrent connections; own implementation reduced memory footprint ~twicefold."
      - "Built analytics platform; chose components to deliver up to 5k events/s, store them and visualise for our internal usage and partners; implemented golang-based ingester that accumulates records to follow the ClickHouse's best-practices."
      - "Picked VictoriaMetrics for observability backbone; VM significantly reduced cost of observability platform and simplified its maintenance."
      - "Designed both: WebSocket & REST API of the Brandis; implemented a scaffolding service that ensured design-first development by requiring to have an IDL-file before code."
      - "Communicated with external partners to design & implement integration, establish requirements and SLOs."
    stack:
      - "Go"
      - "Kafka"
      - "ClickHouse"
      - "MongoDB"
      - "Redis"
      - "WebSockets"
      - "Kubernetes"
      - "VictoriaMetrics"
      - "Grafana"
  - company: "Lingualeo"
    role: "Backend Team Lead"
    period: "2016–2018"
    location: "Moscow, RU"
    summary:
      - "Led incremental SOA migration; we improved time to prod from days to hours by isolating components responsibility."
      - "Initiated and led development of new grammar training; utilized NLP (spaCy) to generate grammar exercises and eliminating manual content authoring."
      - "Was one of drivers of an initiative to introduce Golang company-wide; maintained internal framework for auth/logging/metrics to reduce boilerplate."
    stack:
      - "Go"
      - "PHP"
      - "PostgreSQL"
      - "Python"
      - "spaCy"
      - "MySQL"
      - "Docker"
  - company: "Lingualeo"
    role: "PHP Developer"
    period: "2015-2016"
    location: "Moscow, RU"
    summary:
      - "Developed external integrations and internal tooling for teachers."
  - company: "Earlier roles"
    role: "Engineering"
    period: "2009–2015"
    location: "Omsk & Moscow, RU"
    summary:
      - "Full-stack — Magnetic Project: outsourcing, e-currency exchanger."
      - "Web Developer — Premier Publishing House: magazine site, ad sync."
    stack:
      - "PHP"
      - "JavaScript"
      - "MySQL"
      - "HTML/CSS"
---
I build, design and operate the backends optimized for connection count and throughput at stable cost. I favor simple Go services that keep throughput predictable, and costs stable as traffic grows. As founding engineer at Brandis — joining before incorporation — I took the system from zero to 400k concurrent WebSocket connections as sole architect.

I care about clarity in systems: what matters to users, how it’s measured, and where the real bottlenecks are. That usually means strong observability, clear SLOs, and pragmatic trade-offs so the platform stays reliable and affordable.

I work at the boundary of product and engineering. Staying technical, I keep the product in view — it sharpens tradeoff decisions and makes conversations with stakeholders more concrete.
