\# Vigilon — Security Operations Dashboard for Threat Detection with Risk Mitigation Analytics



Vigilon is an AI-powered Security Operations Center (SOC) platform that helps security analysts detect, classify, and prioritize cyber threats in real time. It combines machine learning-based anomaly detection with a live analytics dashboard, turning raw security event data into actionable, risk-ranked intelligence.



\---



\## Overview



Modern SOC teams are flooded with security events — network logs, login attempts, vulnerability scans, and endpoint alerts — far more than any human team can manually triage. Vigilon addresses this by automatically:



\- \*\*Detecting anomalies\*\* in security event data using trained machine learning models

\- \*\*Classifying threats\*\* by type and severity

\- \*\*Scoring risk\*\* for each incident based on asset criticality, attack chain context, and historical patterns

\- \*\*Correlating related events\*\* into unified incidents, reducing alert fatigue

\- \*\*Prioritizing response\*\* so analysts focus on what matters most first



The result is a single dashboard where a SOC analyst can see, at a glance, what's currently critical, what's trending, and what needs immediate attention — instead of manually sifting through thousands of raw logs.



\---



\## Problem Statement



Security teams face three recurring challenges:



1\. \*\*Volume\*\* — Too many raw events to review manually

2\. \*\*Noise\*\* — Many alerts are false positives or duplicates of the same underlying incident

3\. \*\*Prioritization\*\* — Without risk context, critical threats can be buried under low-priority noise



Vigilon tackles all three by applying ML-driven detection, event correlation, and risk-based scoring, then surfacing the results through a real-time visual dashboard.



\---



\## Key Features



\### Threat Detection \& Classification

\- Machine learning models (Isolation Forest for anomaly detection, ExtraTreeRegressor for risk scoring) classify incoming security events as normal or suspicious

\- Each prediction includes a confidence score and severity rating



\### Vulnerability Management

\- Tracks known vulnerabilities (CVE IDs, CVSS scores, affected assets)

\- Flags patch availability and resolution status



\### Risk-Based Incident Prioritization

\- Automatically groups related events into incidents via attack-chain correlation

\- Scores each incident's risk based on asset criticality and threat severity

\- Ranks incidents into a prioritized response queue



\### Real-Time Analytics Dashboard

\- Live KPI cards (total events, anomalies detected, critical threats)

\- Event trend, threat distribution, and confidence score visualizations

\- Risk score trends and risk level distribution over time

\- Filterable, searchable threat and incident tables

\- MITRE ATT\&CK technique/tactic mapping and IOC intelligence views



\### Secure API

\- All sensitive endpoints (events, threats, vulnerabilities, assets, stats) require API key authentication

\- Keys are hashed before storage — never stored or transmitted in plain text



\---



\## System Architecture



```

┌─────────────────────┐        REST API (API-key secured)        ┌──────────────────────┐

│   React Frontend     │ ───────────────────────────────────────▶ │   FastAPI Backend      │

│   (Vite + MUI)        │ ◀─────────────────────────────────────── │   (Python)              │

└─────────────────────┘              JSON responses               └──────────┬───────────┘

&#x20;                                                                             │

&#x20;                                                                             ▼

&#x20;                                                                   ┌──────────────────┐

&#x20;                                                                   │     MongoDB        │

&#x20;                                                                   │ (events, threats,  │

&#x20;                                                                   │ vulnerabilities,    │

&#x20;                                                                   │ incidents, assets)  │

&#x20;                                                                   └──────────┬───────┘

&#x20;                                                                             │

&#x20;                                                                             ▼

&#x20;                                                                   ┌──────────────────┐

&#x20;                                                                   │  ML Models          │

&#x20;                                                                   │ (Isolation Forest,  │

&#x20;                                                                   │  ExtraTreeRegressor)│

&#x20;                                                                   └──────────────────┘

```



\---



\## Tech Stack



| Layer            | Technology                                       |

|-------------------|-----------------------------------------------------|

| Frontend          | React, Vite, Material UI (MUI), Recharts             |

| Backend           | Python, FastAPI, Motor / PyMongo                      |

| Database          | MongoDB                                                |

| Machine Learning  | scikit-learn (Isolation Forest, ExtraTreeRegressor)   |

| Authentication    | API key-based (hashed storage)                          |



\---



\## Repository Structure



```

vigilon-dashboard/

├── backend/    FastAPI service — API routes, ML models, database layer

└── frontend/   React dashboard — pages, charts, and UI components

```



Each subfolder has its own README with detailed setup instructions.



\---



\## Use Cases



\- \*\*SOC Analysts\*\* — monitor live threat activity and respond to the highest-risk incidents first

\- \*\*Security Managers\*\* — track overall organizational risk posture and vulnerability backlog

\- \*\*Incident Responders\*\* — investigate correlated attack chains with full context (MITRE mapping, affected assets, related events)



\---



\## Project Management



This project was developed following an Agile process. Full sprint planning, backlog, stand-up notes, and retrospectives are documented in \[`docs/Agile\_Doc.xlsx`](./docs/Agile\_Doc.xlsx), covering:



\- \*\*Product Backlog\*\* — full list of planned features and user stories

\- \*\*Sprint Backlog\*\* — task breakdown and progress per sprint

\- \*\*Stand-up Meeting Notes\*\* — daily progress tracking

\- \*\*Retrospective\*\* — sprint review and lessons learned



\---



\## Future Enhancements



\- Automated response playbooks triggered by risk thresholds

\- Integration with external threat intelligence feeds

\- Role-based access control for multi-analyst teams

\- Historical trend forecasting using time-series models



\---



\## License



This project is licensed under the terms in \[LICENSE](./LICENSE).

