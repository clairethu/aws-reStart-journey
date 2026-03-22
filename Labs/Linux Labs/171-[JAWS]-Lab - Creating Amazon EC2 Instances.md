# ☁️ AWS re/Start Lab: Task 1 Log
**Date:** 22 March 2026  
**Lab Title:** Secure Multi-Tier Deployment with EC2  
**Task:** Provisioning the Bastion Host (Gateway)

---

## 🏗️ 1. Infrastructure Configuration Details
In this task, I launched a virtual server (EC2) to serve as a **Bastion Host**. This instance acts as a secure "Jump Box" allowing me to reach internal infrastructure that is not exposed to the internet.

| Setting | Selection | Reasoning (The "Why") |
| :--- | :--- | :--- |
| **Name** | `Bastion host` | **Organization:** Using tags to identify the gateway at a glance. |
| **AMI** | `Amazon Linux 2` | **Software:** Provides a stable environment with AWS CLI pre-installed. |
| **Instance Type** | `t3.micro` | **Resources:** Low-cost, burstable performance ideal for admin tasks. |
| **Key Pair** | `Proceed without` | **Access:** Using **EC2 Instance Connect** for browser-based, keyless SSH. |
| **VPC** | `Lab VPC` | **Networking:** Isolating the lab resources in a dedicated virtual network. |
| **Subnet** | `Public Subnet` | **Connectivity:** Must be public to accept inbound traffic from the internet. |
| **Firewall** | `Bastion security group` | **Security:** Only opens **Port 22 (SSH)** to allow remote management. |
| **IAM Role** | `Bastion-Role` | **Permissions:** Allows the instance to make CLI calls to AWS services. |

---

## 🛠️ 2. Troubleshooting & Remediation: The "Hot-Fix"
During the initial deployment, I skipped the attachment of the **IAM Instance Profile** (Step 7). This would have caused the AWS CLI commands in Task 2 to fail due to "Access Denied."

**Corrective Action Taken:**
Instead of terminating the instance, I performed a **live modification**:
1.  Navigate to the **EC2 Console** > **Instances**.
2.  Select the **Bastion host**.
3.  Navigate to **Actions** > **Security** > **Modify IAM role**.
4.  Attached the `Bastion-Role` and saved.

> **Transformation Insight:** Modifying IAM roles on a running instance is a critical skill for maintaining "High Availability." It allows security updates without needing to reboot or stop services.

---

## 📖 Key Vocabulary
* **Provisioning:** Setting up and launching cloud resources.
* **Bastion Host:** A hardened server used to access a private network from a public one.
* **IAM Role:** An identity with specific permissions that can be assumed by a service or resource.
* **Security Group:** An instance-level virtual firewall.
* **Remediation:** The process of correcting a configuration error or security vulnerability.

* ![Bastion Host Launch Confirmation](./images/task1-result.png)
