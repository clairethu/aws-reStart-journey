
# ⚙️ Lab: Process Management & Automated Task Scheduling
**Focus Area:** Resource Governance, Stream Editing, and Scheduled Automation (Cron)

## 📋 Executive Summary
In this lab, I established an automated auditing system to monitor and anonymize file assets. This exercise demonstrates the ability to manage system processes and implement "Set and Forget" governance policies using the Linux Cron daemon.

---

## 🛠️ Part 1: Process Monitoring & Auditing
Before automating tasks, I utilized system monitoring tools to audit active workloads and verify utility capabilities.

| Command | Action | Business Application |
| :--- | :--- | :--- |
| `top -hv` | Version & Help Audit | Ensuring environment parity and tool capability verification. |
| `ps -u student -f` | Targeted User Audit | Isolating specific user workloads for resource accounting. |
| `grep "^student"` | Regex Filtering | Using line-anchors to ensure data integrity during process audits. |

---

## 🏗️ Part 2: Implementing Automated Governance (Cron)
**Objective:** Create a recurring hourly task to generate an anonymized inventory of all `.csv` data assets.

### 1. Crontab Environment Setup
I accessed the cron table using `sudo crontab -e` and configured the environment variables to ensure script reliability:

* **SHELL**: Specified `/bin/bash` for advanced command execution.
* **PATH**: Defined explicit binary paths to prevent "Command Not Found" errors in the background.
* **MAILTO**: Directed system alerts to `root` for centralized error handling.

### 2. The Automation Logic
I "installed" the following job into the crontab:

```bash
0 * * * * ls -la $(find .) | sed -e 's/..csv/#####.csv/g' > /home/ec2-user/companyA/SharedFolders/filteredAudit.csv
