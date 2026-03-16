
# Lab: Managing Infrastructure Permissions & Ownership
**Date:** March 2026  
**Environment:** AWS EC2 (Amazon Linux)  
**Role:** Systems Administrator / Transformation Lead

## 🎯 Business Objective
The goal of this lab was to implement a secure, hierarchical folder structure for "CompanyA." In a transformation project, this ensures that sensitive data (HR, Finance) is restricted to authorized personnel, minimizing internal security risks.

---

## 🛠 Technical Tasks & Commands

### 1. Secure Remote Access (SSH)
Before managing the system, I established a secure connection to the Amazon EC2 instance using an RSA Key Pair.
* **Key Command:** `chmod 400 labsuser.pem`
* **Transformation Insight:** Setting the key to `400` (read-only for owner) is a security requirement. Without this "Least Privilege" setting, the SSH client will reject the connection to prevent key hijacking.

### 2. Global Ownership Re-assignment (`chown`)
I reorganized the corporate directory by assigning specific owners to departmental folders.
* **Global Change:** `sudo chown -R mjackson:Personnel companyA/`
* **Departmental Isolation:** - HR Folder -> `ljuan:HR`
  - Finance Folder -> `mmajor:Finance`
* **Validation:** Used `ls -laR` to perform a recursive audit of the entire directory tree.

### 3. Permission Mode Modification (`chmod`)
I practiced both **Symbolic** and **Absolute** modes to secure files.

| Mode | Command | Business Result |
| :--- | :--- | :--- |
| **Symbolic** | `sudo chmod g+w file` | Enabled collaborative writing for the group. |
| **Absolute** | `sudo chmod 764 file` | **Full Access** for owner; **Read/Write** for group; **Read-only** for others. |

---

## 🧠 Transformation Manager's Reflections
* **Governance:** Using the `-R` (Recursive) flag is essential for ensuring that security policies are applied consistently across all sub-directories, preventing "data leaks" in forgotten folders.
* **Automation Ready:** Understanding the numeric (Absolute) mode `764` is vital for writing Infrastructure-as-Code (IaC) scripts where symbolic letters might be ambiguous.
* **Security-First:** This lab mirrors the setup of an **AWS IAM Policy**, but at the Operating System level. Correcting these at the source is the first step in a successful Cloud migration.

---

## 📂 Verification Proof
Successfully audited the final structure using:
```bash
ls -laR Sales
ls -laR Shipping
