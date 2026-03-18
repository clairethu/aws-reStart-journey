
## System Assessment: `yum check-update`
*Identifying available patches without altering the system state.*

- **Command:** `sudo yum -y check-update`
- **Logic:** Queries configured repositories to identify packages with higher version numbers than those currently residing in the local RPM database.
- **Risk Mitigation:** Unlike `yum update`, this command is "non-destructive." It allows an administrator to view potential changes before executing a full upgrade.

> **Transformation Insight:** In a professional CI/CD pipeline, we use `check-update` to trigger alerts. If a critical security patch is found, the system can automatically notify the PM or Dev team that a maintenance window is required.

## ⚠️ Deviation Analysis: YUM Transaction Discrepancy
**Observation:** My local environment shows a single transaction (ID 1), while the lab manual displays two (ID 1 & 2).

**Root Cause:**
- **Image Baseline:** The lab manual was created using an AMI that performed 18 system-level updates upon boot (Transaction ID 1).
- **Environment Isolation:** My current instance launched with a "Static Baseline," meaning no background updates occurred prior to my manual `httpd` installation. 

**Action Taken:** Modified subsequent lab commands to target **Transaction ID 1** to align with my specific environment's audit trail.

> **Transformation Insight:** "Environmental Parity" is a common challenge in DevOps. Software versions and history can change depending on which "Image" or "Snapshot" you start with. Flexibility in identifying your own Transaction IDs is a core skill for cloud administrators.

## 🕵️ Infrastructure Auditing: `describe-instance-attribute`
*Programmatically verifying resource specifications and hardware tiers.*

- **Command:** `aws ec2 describe-instance-attribute --instance-id [ID] --attribute instanceType`
- **Logic:** Queries the AWS Metadata API to return the specific instance family and size (e.g., t2.micro) assigned to a resource.
- **Use Case:** Essential for verifying that the "Development" environment matches the "Production" specifications before a major software deployment.

> **Transformation Insight:** In a "Cloud Governance" strategy, we don't guess—we verify. Using the CLI to audit instance types ensures that we are adhering to our budget and performance benchmarks without having to manually hunt through the Management Console.
