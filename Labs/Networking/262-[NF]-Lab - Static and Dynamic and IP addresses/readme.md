# Lab: Internet Protocols - Static and Dynamic Addresses

**Date:** 2026-04-12  
**Objective:** To demostrate the understanding about differences between Static and Dynamic IP Address.

### Scenario Overview
The client (Bob) is reporting that a "Public Instance" loses its IP address and receives a new, random one every time the instance is stopped and started. This volatility is breaking their application's connection settings.

**Client's Architecture**

### The Fix for Bob
Standard AWS Public IPs are **Ephemeral** (short-lived). They are pulled from a pool and returned when an instance stops. 

**The Solution:** By using an **Elastic IP (EIP)**, we have moved from a dynamic assignment to a **Static** association. The EIP is now "owned" by the instance regardless of its power state, resolving the issue where Bob's connections were breaking due to IP volatility.

#### Final Workflow
1. **EC2 Dashboard** > **Elastic IPs**.
2. **Allocate Elastic IP address**.
3. **Actions** > **Associate Elastic IP address**.
4. **Target:** Selected the test instance.
5. **Verified:** IP address persistence confirmed in the EC2 instance details tab.

#### Observation Log

| ID | Category | Observation / Issue | Resolution / Note |
| :--- | :--- | :--- | :--- |
| **I181-04** | **Execution** | Allocated a new Elastic IP address from the Amazon pool. | Ensuring a dedicated IP is reserved specifically for this account/region. |
| **O181-06** | **Verification** | Performed a Stop/Start test on the instance. | Confirmed the IPv4 address remained unchanged (`Statically Assigned`) after the reboot cycle. |
