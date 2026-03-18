
## 🕵️ Security Auditing: Reviewing Authentication Logs
**Objective:** Analyzing system access patterns and identifying unauthorized login attempts.

### 🛠️ Toolset Applied:
- **`less /tmp/log/secure`:** Utilized to inspect the authentication log. This file acts as the primary audit trail for SSH traffic and `sudo` usage.
- **`lastlog`:** Generated a report of the most recent login times for all system accounts.

### 🔍 Security Analysis:
- **Failed Authentications:** Identified unauthorized IP addresses attempting to access the system via non-standard ports.
- **System User Integrity:** Verified that service accounts (daemon, bin, etc.) remain in a "Never logged in" state, confirming that these accounts have not been compromised for interactive shell access.

> **Transformation Insight:** Log rotation and review are the heartbeat of **Cloud Compliance.** In a professional environment, these logs are often streamed to **AWS CloudWatch** or a SIEM (Security Information and Event Management) system to trigger automatic alerts when multiple "Failed password" events occur in a short window.
