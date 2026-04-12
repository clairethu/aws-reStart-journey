# Lab: Custom VPC & Subnet Allocation

**Date:** 2026-04-12  
**Scenario:** Built a network foundation for a startup needing 15,000 IPs for HQ (Private) and 50 IPs for Operations (Public) using the `192.168.x.x` range.

---

### Final Network Design

| Component | CIDR Block | Size | Total IPs | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **VPC** | `192.168.0.0/16` | /16 | 65,536 | Main Network Boundary |
| **Private Subnet** | `192.168.0.0/18` | /18 | 16,384 | Seattle HQ (Requirement: 15k) |
| **Public Subnet** | `192.168.64.0/26` | /26 | 64 | Ops Team (Requirement: 50) |

---

### CIDR Challenges & Resolutions

**1. The "Subset" Error (Boundary Issue)**
* **Problem:** Initially tried to create a large subnet that extended beyond the VPC's fence line.
* **Fix:** Changed the VPC to a **`/16`**. This expanded the "property" to ensure it was large enough to hold the 16,384-IP private block.

**2. The "Invalid" Error (Overlap Issue)**
* **Problem:** Attempted to start the Public subnet at `192.168.1.0`. Because the Private subnet is so large, it already "owned" everything from `.0.0` to `.63.255`.
* **Fix:** Offset the Public subnet to **`192.168.64.0`**. This moved the "fence" to the first available mathematical block after the HQ territory ended.

---

### Technical Insight: The AWS Reserved Five
AWS reserves **5 IP addresses** in every subnet for networking management (Network, VPC Router, DNS, Reserved, and Broadcast). 
* **Client Need:** 50 IPs. 
* **Design Choice:** A **`/26`** provides 64 total addresses. After reservations, **59 are usable**, safely meeting the requirement.
