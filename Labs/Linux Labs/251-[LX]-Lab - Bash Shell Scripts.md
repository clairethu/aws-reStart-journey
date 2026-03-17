
# 🐚 Lab: Bash Shell Scripts

**Focus Area:** Create a bash script that will automate the backup of a folder

## Task 1: Write a shell script
**Objective:** Create a Bash shell script that automates the creation of a backup of the CompanyA folder as a compressed archive. The name of the archive will be in the format date of the day-backup-companyA.tar.gz.

## Implementation
### 🏗️ Step 1: File Creation & Permissions
Before writing the script, the file environment was initialized:

* **Creation:** `touch backup.sh` - Created an empty shell script file.
* **Permissions:** `sudo chmod 755 backup.sh` - Modified the file privileges.
    * **7 (Owner):** Read, Write, Execute.
    * **5 (Group/Others):** Read and Execute.
    * *Significance:* This turns a text file into an **executable program**.

---

### ✍️ Step 2: Script Logic & Syntax
The script was authored using the `vi` editor with the following logic:

```bash
#!/bin/bash
# 1. Capture the current date for unique file naming
DAY="$(date +%Y_%m_%d)"

# 2. Define the destination path using the $USER environment variable
BACKUP="/home/$USER/backups/$DAY-backup-CompanyA.tar.gz"

# 3. Execute the compressed archive
tar -csvpzf $BACKUP /home/$USER/CompanyA
```
---
