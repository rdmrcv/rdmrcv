---
locale: "en"
name: "Roman Domrachev"
title: "Senior Backend (Go)"
kicker: "Realtime Go backends built for scale."
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
  - "Distributed systems"
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
    role: "Head of Development"
    period: "2018–present"
    location: "Remote · Vilnius, LT"
    summary:
      - "Architected the system and built most of the backend/infrastructure."
      - "Partnered with product to translate needs into pragmatic technical decisions."
      - "Built and operated a Go WebSocket platform for data streams (up to ~400k CCU)."
      - "Built a Kafka → ClickHouse analytics pipeline following ClickHouse best practices, ingesting up to ~5k events/s."
      - "Defined the WebSocket protocol and partner APIs; guided integrations end-to-end."

    breakdown: |
      **Context.** Live interactions and telemetry during high-audience streams while holding p95 ≤ 300 ms, with controlled spikes under extreme bursts and clear SLO guardrails.

      **How I built it.**
      - **Event-driven core:** Kafka backbone for cost-tolerant throughput and eventual consistency.
      - **WebSockets:** dedicated Go fan-out service and protocol to communicate with an interactive overlay.
      - **Reactor core:** API based on consistent counters and triggers to support new mechanics without rewrites.
      - **Reliable analytics:** Events ingestion based on best practices; ClickHouse tables and materialized views with rollups/TTLs to contain insights.
      - **APIs & integrations:** partner-facing APIs, internal service contracts, analytics API.
      - **Ops:** Kubernetes with app-metric HPAs, GitOps deployments, and SLI/SLO alerting aligned to user-visible symptoms.

      **Scale & results.**
      - **Concurrency:** ~400k CCU on peak events.
      - **Ingest:** ~1M events/day with ~5k/s bursts.
      - **Freshness:** sub-second for the application. Minutes for the analytics.
      - **Engagement:** 7–11% consistent participation on interactive experiences.
      - **Cost:** 2–3× cheaper than managed alternatives evaluated in 2018–19. Up to 15% better than alternatives now.
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
    role: "CTO"
    period: "2018"
    location: "Moscow, RU"
    summary:
      - "Led incremental SOA migration; shipped core services in Go."
      - "Introduced NLP (spaCy) pipelines to auto-generate grammar exercises."
    breakdown: |
      **Context.** Oversaw monolith restructurization, align service scaffolding, unblock delivery velocity.

      **Highlights.**
      - Standardized Go service bootstrap with logging, tracing, CI, and deploy runbooks.
      - spaCy NLP pipelines to extract grammar patterns and automate exercise creation, cutting manual effort.
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
      - "Led backend team and prepared SOA migration."
      - "Improved deploy frequency and rollback safety."
      - "Maintained internal framework for auth/logging/metrics to reduce boilerplate."
    breakdown: |
      **Context.** Shared libraries and CI/CD templates to reduce duplication and keep rollouts safe.

      **Outcome.** Faster delivery, fewer one-off solutions, and clearer ownership boundaries.
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
I build and operate the backends behind real-time products, from architecture to operations. I favor simple Go services that keep throughput predictable, tail-latency low, and costs stable as traffic grows. At Brandis, I built WebSocket infrastructure for ~400k concurrent users and a Kafka→ClickHouse pipeline ingesting ~1M events/day, while shaping product scope and API contracts with partners.

I care about clarity in systems: what matters to users, how it’s measured, and where the real bottlenecks are. That usually means strong observability, clear SLOs, and pragmatic trade-offs so the platform stays reliable and affordable.
