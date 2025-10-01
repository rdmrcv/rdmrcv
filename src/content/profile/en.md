---
locale: "en"
name: "Roman Domrachev"
title: "Principal Backend (Go)"
kicker: "Fast, observable, cost-efficient Go backends."
ogDescription: |
  Principal Go backend engineer focused on low-latency WebSockets, Kafka→ClickHouse analytics pipelines, and cost-effective backends.
photo: "../../assets/pictures/photo.jpeg"
location: "Yerevan, Armenia"
openTo: "Remote (EU)"
relocation: "France"
highlights:
  - "~400k CCU on custom Go WebSockets; p95 ≤ 300 ms; controlled  to 1–3 s"
  - "~1M events/day; peaks ~5k/s; Kafka→ClickHouse with rollups/TTLs"
  - "2–3× lower infra cost vs managed alternatives"
  - "Kubernetes + GitOps; SLO-based alerting mapped to user impact"
toolbox:
  - "Go (Golang)"
  - "Distributed systems"
  - "Event-driven architecture"
  - "WebSockets"
  - "Kafka"
  - "Redpanda"
  - "ClickHouse"
  - "MongoDB"
  - "PostgreSQL"
  - "Redis"
  - "Kubernetes (K8s)"
  - "GitOps"
  - "CI/CD"
  - "Observability (Prometheus/Grafana)"
  - "SLI/SLO"
  - "Performance"
  - "Cost optimization"
contact:
  email: "r@dmrcv.me"
  linkedin: "https://linkedin.com/in/rdmrcv/"
  github: "https://github.com/rdmrcv"
  pdf: "/files/profile.pdf"
experience:
  - company: "Brandis"
    role: "Head of Development"
    period: "2018–present"
    location: "Remote · Vilnius, LT"
    summary:
      - "Built and operated Go WebSockets platform for live streams (~400k CCU)."
      - "Streaming analytics via Kafka→ClickHouse with 15-minute compaction windows."
      - "Established K8s + GitOps ops model with SLO-based alerting and autoscaling."
      - "Communication with the product team → plan and execute features devlopment."
      - "Accelerated delivery with internal Go service starter kit (logs, metrics, CI templates)."
    breakdown: |
      **Problem space.** Deliver live interactions and telemetry during high-audience streams while holding p95 ≤ 300 ms and tolerating 1–3 s spikes with graceful degradation.

      **Approach.**
      - **WebSockets:** dedicated Go fan-out service with bounded queues, backpressure, and per-tenant guardrails.
      - **Data path:** Kafka keyed to read paths; ClickHouse tables and materialized views with rollups/TTLs to contain churn.
      - **Ops:** Kubernetes with app-metric HPAs, GitOps deployments, and SLI/SLO alerting aligned to user-visible symptoms.

      **Scale & results.**
      - **Concurrency:** ~400k CCU on peak events.
      - **Ingest:** ~1M events/day with ~5k/s bursts.
      - **Freshness:** sub-second to few seconds.
      - **Cost:** 2–3× cheaper than managed alternatives evaluated in 2018–19.

      **Stack.** Go, Kafka, ClickHouse, PostgreSQL, Redis, WebSockets, Kubernetes, Prometheus, Grafana.
    stack:
      - "Go"
      - "Kafka"
      - "ClickHouse"
      - "PostgreSQL"
      - "Redis"
      - "WebSockets"
      - "Kubernetes"
      - "Prometheus"
      - "Grafana"
  - company: "Lingualeo"
    role: "CTO"
    period: "2018"
    location: "Moscow, RU"
    summary:
      - "Led incremental SOA migration; shipped core services in Go."
      - "Introduced NLP (spaCy) pipelines to auto-generate grammar exercises."
    breakdown: |
      **Focus.** Break monolith safely, align service scaffolding, unblock delivery velocity.

      **Highlights.**
      - Standardized Go service bootstrap with logging, tracing, CI, and deploy runbooks.
      - spaCy NLP pipelines to extract grammar patterns and automate exercise creation, cutting manual effort.

      **Stack.** Go, Python (spaCy), PostgreSQL, Redis, Docker, CI/CD.
    stack:
      - "Go"
      - "Python"
      - "spaCy"
      - "PostgreSQL"
      - "MySQL"
      - "Docker"
  - company: "Lingualeo"
    role: "Backend Team Lead"
    period: "2016–2018"
    location: "Moscow, RU"
    summary:
      - "Oversaw backend team and SOA migration cadence."
      - "Improved deploy frequency and rollback safety."
      - "Maintained internal framework for auth/logging/metrics to reduce boilerplate."
    breakdown: |
      **Ops.** Codified CI/CD templates, conservative rollouts, and shared libraries for telemetry, auth, and configuration.

      **Outcome.** Faster delivery, fewer one-off solutions, and clearer ownership boundaries.

      **Stack.** Go, PHP (legacy), PostgreSQL, Redis, Docker, CI/CD.
    stack:
      - "Go"
      - "PHP"
      - "PostgreSQL"
      - "MySQL"
      - "Docker"
  - company: "Earlier roles"
    role: "Engineering"
    period: "2009–2016"
    location: "Omsk & Moscow, RU"
    summary:
      - "PHP Developer — Lingualeo: integrations, tooling, scheduling/notifications."
      - "Full-stack — Magnetic Project: outsourcing, e-currency exchanger."
      - "Web Developer — Premier Publishing House: magazine site, ad sync."
    stack:
      - "PHP"
      - "JavaScript"
      - "MySQL"
      - "HTML/CSS"
---
I design and run low-latency, high-throughput backends in Go—event-driven services that stay fast, observable, and cost-efficient at scale. WebSockets infrastructure for hundreds of thousands of concurrent viewers and Kafka→ClickHouse analytics that ingest ~1M events/day.

My focus: predictable throughput, low tail latency, cost-efficiency, and operability under load. I favor simple, measurable designs (clear SLIs/SLOs, backpressure, idempotency) and invest in observability, so failures are shallow and cheap.

What I bring:

 * Throughput & reliability: event-driven Go services with bounded queues, circuit-breakers and observation instrumentation.
 * Data at speed: Kafka / Redpanda (partitioning & keys that match access patterns), ClickHouse (aggregated views, TTLs, rollups).
 * Ops rigor: Kubernetes, GitOps CI/CD, Terraform & Ansible for infrastructure as code (IaC), alerting that reflects user impact.
 * Cost discipline: lean storage/egress, right-sizing, and aggregation strategies that cut waste.
