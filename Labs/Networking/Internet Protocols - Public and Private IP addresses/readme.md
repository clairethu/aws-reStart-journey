# Lab: Public vs. Private IPs (Networking Case Study)

**Date:** 2026-04-12  
**Role:** Cloud Support Engineer  
**Status:** Initial Investigation

---

### Case Summary
Client (Jess) has two EC2s in the same VPC (`10.0.0.0/16`). **Instance B** works fine, but **Instance A** has zero internet access. Also, client is asking about using `12.0.0.0/16` for a new VPC.

**Client's Architecture**

![Client Architecture](./images/vpc1.png)

### Resource Inventory & IP Discovery

| Instance | Private IPv4 Address | Public IPv4 Address | Connectivity Status |
| :--- | :--- | :--- | :--- |
| **Instance A** | `10.0.10.163` | **None** | ❌ No Internet Access |
| **Instance B** | `10.0.10.170` | `35.166.234.229` | ✅ Internet Access Active |

#### Root Cause Analysis
* **Instance B:** Accessible because it has a **Public IPv4 address** (`35.166.234.229`). This allows the VPC's Internet Gateway to route external traffic to the instance.
* **Instance A:** Inaccessible because it has **No Public IPv4 address**. In AWS, a public subnet requires an instance to have a public identity to communicate beyond the VPC.

### Resolution: Enabling Internet Access for Instance A

**Solution:** Allocated and associated an Amazon Elastic IP (EIP).


#### Steps Taken
1.  Navigated to **EC2 > Network & Security > Elastic IPs**.
2.  Allocated a new IPv4 address from Amazon's pool.
3.  Associated the address with the Network Interface (ENI) of **Instance A**.
4.  Verified connectivity by pinging `8.8.8.8` from the instance command line.

#### Advice regarding to IP range for new VPC
Advised client against using 12.0.0.0/16. Since this is public space owned by AT&T, it creates a routing conflict. The VPC will prioritize this as a 'local' route, making the actual AT&T services on the internet unreachable for these instances.


#### Verification Workflow
To avoid this in the future, always perform a WHOIS lookup to verify if a range is "Private" or "Public" before deployment. 

**Terminal Command:**
```bash
# Use the full path if 'whois' is not in your standard shell PATH
/usr/bin/whois 12.0.0.0

---
*End of log.*
