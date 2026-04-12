# Lab: Public vs. Private IPs (Networking Case Study)

**Date:** 2026-04-12  
**Role:** Cloud Support Engineer  
**Status:** Initial Investigation

---

### Case Summary
Client (Jess) has two EC2s in the same VPC (`10.0.0.0/16`). **Instance B** works fine, but **Instance A** has zero internet access. Also, client is asking about using `12.0.0.0/16` for a new VPC.

Client's Architecture

* ![Bastion Host CLI](./images/lab172_working_web_app.png)

### 🕵️ Observations & Hypotheses

| ID | Issue | Hypothesis / Note |
| :--- | :--- | :--- |
| **I-01** | Instance A Connectivity | Missing Public/Elastic IP. Subnet routing is likely fine since B works. |
| **I-02** | Custom CIDR (`12.x.x.x`) | Bad idea. This is public space (AT&T). Will cause routing "black holes." |

### 🛠 Action Plan
1. **Check IPs:** Verify if Instance A only has a private IP. If so, associate an Elastic IP.
2. **Review IGW:** Confirm the Internet Gateway is attached to the VPC.
3. **Advice:** Tell Jess to stick to **RFC 1918** (e.g., `172.16.x.x`) to avoid overlapping with the real internet.

---
*End of log.*
