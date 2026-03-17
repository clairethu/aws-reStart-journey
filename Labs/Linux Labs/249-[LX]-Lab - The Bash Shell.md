# 🐚 Lab: Bash Shell Customization & Environment Architecture
**Focus Area:** Secure Connectivity, Command Aliasing, and PATH Variable Manipulation.

---

## 🏗️ Task 1: Secure Remote Connectivity (SSH)
**Objective:** Establish a secure encrypted session to an Amazon Linux EC2 instance.

- **Security Protocol:** SSH (Secure Shell) via Port 22.
- **Key Management:** Utilized `.pem` (Mac/Linux) or `.ppk` (Windows) keys for passwordless authentication.
- **Access Control:** Applied `chmod 400` to the private key to restrict permissions. This ensures the key is "read-only" for the owner and inaccessible to others, meeting the mandatory security requirements for SSH.

---

## 🛡️ Task 2: Creating a Backup Alias
**Objective:** Simplify complex archiving commands into a single, repeatable shortcut to reduce manual toil.

### Implementation
Created a custom alias to automate the `tar` utility:

```bash
alias backup=`tar -cvzf`
```
---

## Task 3: PATH Environment Variable Optimization

**Objective:** Understand how Linux locates executable files and modify the system's search path to enable global script execution.

### 1. Initial Script Testing
Attempted to run the proprietary script `hello.sh` using three different methods to analyze shell behavior:

* **Relative Path (Inside Directory):** Executed `./hello.sh` while inside the `/bin` folder. 
    * **Status:** Success.
* **Relative Path (Parent Directory):** Executed `./bin/hello.sh` from the `CompanyA` folder. 
    * **Status:** Success.
* **Direct Command:** Executed `hello.sh` from the `CompanyA` folder. 
    * **Status:** Failed.
    * **Error:** `bash: hello.sh: command not found`

---

### 2. Diagnosing the Path Issue
To identify why the direct command failed, I inspected the current environment variables:

```bash
echo $PATH
