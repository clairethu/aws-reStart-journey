# Lab: Creating VPCs and Allocating Subnets

**Date:** 2026-04-12  
### Lab Objectives: Custom VPC Design

* **Architect a VPC:** Build a custom virtual network using the `192.168.0.0/16` private range.
* **Subnet Engineering:** Partition the network into a large private subnet (15,000+ IPs) and a public subnet (50+ IPs).
* **CIDR Strategy:** Apply IP addressing logic to ensure scale, prevent overlap, and meet startup requirements.
* **Console Proficiency:** Practice navigating the AWS VPC dashboard to manage subnets and CIDR blocks.
---

### Case Scenario: 
Client (Paulo) needs a VPC architecture using the `192.168.x.x` private range. The design requires a large private subnet for headquarters (~15,000 IPs) and a smaller public subnet for operations (50+ IPs).

### Proposed Network Design

| Component | CIDR Block | Size | Purpose |
| :--- | :--- | :--- | :--- |
| **VPC** | `192.168.0.0/16` | /16 | Entire Startup Network |
| **Private Subnet** | `192.168.0.0/18` | /18 | Seattle HQ (16,384 IPs) |
| **Public Subnet** | `192.168.64.0/26` | /26 | Operations Dept (64 IPs) |

---



---

### Technical Insight: The AWS Reserved Five
When planning subnets, I accounted for the fact that AWS reserves the first four and the last one IP address in every subnet (e.g., .0, .1, .2, .3, and .255). Paulo’s public subnet (`/26`) gives him 64 total addresses, but only 59 are usable—still exceeding his 50-IP requirement.
