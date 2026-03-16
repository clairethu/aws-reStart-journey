
# Lab: Managing File Permissions & Ownership
**Date:** March 2026  
**Environment:** AWS EC2 (Amazon Linux)  

## 🎯 Business Objective
The goal of this lab was to implement a secure, hierarchical folder structure for "CompanyA." In a transformation project, this ensures that sensitive data (HR, Finance) is restricted to authorized personnel, minimizing internal security risks.

---

## 🛠 Technical Tasks & Commands

### 1. Secure Access
- **Command:** `chmod 400 labsuser.pem`
- **Logic:** Restricted key access to 'Owner-Read-Only' to satisfy SSH security requirements for EC2.

### 2. Ownership Re-assignment (`chown`)
Applied recursive ownership across a multi-departmental directory structure:
- **CEO/Global:** `sudo chown -R mjackson:Personnel companyA/`
- **HR:** `sudo chown -R ljuan:HR HR/`
- **Finance:** `sudo chown -R mmajor:Finance HR/Finance/`

## 3. File Listing & Inspection (Operational Auditing)
*Standardized methods for auditing system assets and identifying technical debt.*

| Command | Action | Project Management Value |
| :--- | :--- | :--- |
| `ls -l` | Long format listing | High-level audit of permissions and ownership. |
| `ls -l [file]` | Specific file inspection | Isolating critical configuration files for review. |
| `ls -l [path]` | Folder audit | Verifying departmental data isolation. |
| `ls -l *.txt` | Wildcard filtering | Batch-processing specific file types for migration. |

---

## 4. Permission Management (`chmod`)
*Implementing security governance through symbolic and octal modes.*

### A. Symbolic Mode (Agile Adjustments)
- `sudo chmod g+w [file]` : **Enable Collaboration** by adding Write access to the Group.
- `sudo chmod g=r [file]` : **Enforce Integrity** by setting Group access to Read-Only.
- `sudo chmod +x [file]` : **Provisioning** a script to be executable by all users.
- `sudo chmod o-r [file]` : **Data Privacy** by removing Read access for the "rest of the world."

### B. Octal Mode (Infrastructure Standards)

- `sudo chmod 644 [file]` : **Standard File Security** (Owner: RW, Group/Others: R).
- `sudo chmod 755 [dir]` : **Standard Directory Access** (Owner: Full, Group/Others: Read/Execute).
- `sudo chmod 400 [file]` : **High-Security Lockdown** (Read-only for Owner). *Essential for protecting AWS .pem keys.*

---

## 🧠 Lab Exercise Reflections
* **Governance:** Using the `-R` (Recursive) flag is essential for ensuring that security policies are applied consistently across all sub-directories, preventing "data leaks" in forgotten folders.
* **Automation Ready:** Understanding the numeric (Absolute) mode `764` is vital for writing Infrastructure-as-Code (IaC) scripts where symbolic letters might be ambiguous.
* **Security-First:** This lab mirrors the setup of an **AWS IAM Policy**, but at the Operating System level. Correcting these at the source is the first step in a successful Cloud migration.

---

## 📂 Verification Proof
Successfully audited the final structure using:
```bash
ls -laR Sales
ls -laR Shipping
