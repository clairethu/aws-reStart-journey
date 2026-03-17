# 🐚 Lab: Bash Shell Customization & Environment Architecture
**Focus Area:** Secure Connectivity, Command Aliasing, and PATH Variable Manipulation.

---

## 🏗️ Task 1: Secure Remote Connectivity (SSH)
**Objective:** Establish a secure encrypted session to an Amazon Linux EC2 instance.

- **Security Protocol:** SSH (Secure Shell) via Port 22.
- **Key Management:** Utilized `.pem` (Mac/Linux) or `.ppk` (Windows) keys for passwordless authentication.
- **Access Control:** Applied `chmod 400` to the private key to restrict permissions, ensuring the key is not accessible by other system users—a requirement for SSH security.

---

## 🛡️ Task 2: Creating a Backup Alias
**Objective:** Simplify complex archiving commands into a single, repeatable shortcut.

### Implementation
Created a custom alias to automate the `tar` utility:
```bash
alias backup='tar -cvzf '
