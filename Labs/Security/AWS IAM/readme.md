
## **Project Description: Cloud Identity & Access Governance**

In modern enterprise environments, securing a network requires more than just a single login. Without proper authentication procedures and granular access control, unauthorized users can easily exploit critical network resources, including shared folders, intranets, and hardware devices. This project focuses on implementing **AWS Identity and Access Management (IAM)** to manage users, groups, and permissions, ensuring a secure and audited cloud infrastructure.

---

## **Project Objectives**

The primary goal is to transition from a broad access model to a structured, role-based security posture by achieving the following:
*   **Creating and applying** a customized IAM password policy to harden account security.
*   **Exploring** pre-created IAM identities and their organizational structures.
*   **Inspecting** JSON-based IAM policies to understand the specific permissions applied to support roles.
*   **Managing Group Membership** by assigning users to specific functional groups.
*   **Establishing** secure access routes via the unique IAM sign-in URL.
*   **Validating** security configurations by experimenting with the real-world effects of policies on service access.

---

## **AWS Services Utilized**

*   **IAM (Identity and Access Management)**: The core service used to manage users, roles, and federated identities, providing fine-grained control over AWS API operations.
*   **Amazon EC2 (Elastic Compute Cloud)**: Virtual servers used to test administrative and support-level permissions (View, Start, Stop).
*   **Amazon S3 (Simple Storage Service)**: Scalable object storage used to verify "Read-Only" vs. "Write" access constraints.
*   **Other Integrated Services**: Visibility into **Amazon CloudWatch**, **Elastic Load Balancing (ELB)**, and **EC2 Auto Scaling** for support-tier auditing.

---

## **Existing Environment**

The initial architecture consists of a decentralized identity pool and specialized support groups. Each group is mapped to a specific policy that dictates the "Effect," "Action," and "Resource" allowed for the associated users.

![Current Environment](./images/lab-scenario.jpeg)

### **Initial Configuration Summary**

| Entity Type | Name | Associated Policy / Role |
| :--- | :--- | :--- |
| **IAM Users** | user-1, user-2, user-3 | Initial identities requiring group assignment. |
| **User Group** | **EC2-Admin** | Permissions to View, Start, and Stop EC2 instances. |
| **User Group** | **EC2-Support** | `AmazonEC2ReadOnlyAccess` for system auditing. |
| **User Group** | **S3-Support** | `AmazonS3ReadOnlyAccess` for data visibility without modification rights. |

---
## **Step 1: Account Security Hardening (Password Policy Management)**

This initial step focuses on establishing a robust security baseline for the AWS account. By transitioning from the default settings to a custom password policy, the account's authentication layer is hardened against unauthorized access and brute-force attempts.

---

### **IAM Password Policy Configuration**
The password policy was updated to meet strict corporate security requirements, ensuring that all IAM users associated with the account adhere to high-entropy credential standards.

![Current Password Policy](./images/current_pwd_policy.png)

| Requirement | Configuration | Objective |
| :--- | :--- | :--- |
| **Minimum Length** | 10 Characters | Increases complexity and the time required for a successful brute-force attack. |
| **Character Diversity** | All Character Types Enabled | Mandates a mix of uppercase, lowercase, numbers, and symbols to maximize entropy. |
| **Password Expiration** | 90 Days | Reduces the risk window if credentials are unknowingly compromised. |
| **Prevention of Reuse** | 5 Previous Passwords | Prevents users from alternating between the same few passwords, encouraging unique secrets. |
| **Administrator Reset** | Not Required | Balances security with operational efficiency by allowing users to rotate expired passwords independently. |


![Updated Password Policy](./images/update_pwd_policy.png)

---

## **Step 2: Identity Audit & Group Infrastructure Exploration**

This stage involves a comprehensive audit of the pre-provisioned IAM environment. By analyzing the relationship between **Users**, **Groups**, and **Policies**, we define the operational boundaries for different organizational roles before active deployment begins.

---

### **IAM Identity Inventory**
The environment initializes with three distinct user accounts and three functional groups. An initial audit revealed that individual users (such as **user-1**) possess no inherent permissions or group memberships, adhering to the "Zero Trust" baseline.

*   **User Baseline**: Initial inspection of **user-1** confirmed a complete lack of permissions. Attempts to access services like **EC2** or **S3** result in immediate API authorization failures.
*   **Group Methodology**: Permissions are managed at the group level rather than per user. This centralized approach ensures that any policy updates are propagated instantly to all group members, maximizing administrative efficiency.

![user-1 encountering systemic API errors due to the lack of assigned permissions](./images/user1_permit_denied.png)

---

### **Policy Architecture Analysis**
The environment utilizes two distinct types of IAM policies to control access: **AWS Managed Policies** and **Customer Inline Policies**.

#### **1. Managed Policies (Standardized Support)**
The Support groups utilize AWS Managed Policies, which are pre-built, scalable templates.
*   **EC2-Support Group**: Attached to `AmazonEC2ReadOnlyAccess`.
    *   **Scope**: Grants `Describe` and `List` permissions for EC2, ELB, and CloudWatch.
    *   **Constraint**: Explicitly prevents any "Write" actions (Start/Stop/Terminate).
*   **S3-Support Group**: Attached to `AmazonS3ReadOnlyAccess`.
    *   **Scope**: Permits `Get` and `List` operations across all S3 buckets.

#### **2. Customer Inline Policies (Specialized Administrative Access)**
The **EC2-Admin** group utilizes a **Customer Inline Policy**. Unlike managed policies, these are embedded directly into a single identity for highly specific "one-off" requirements.
*   **EC2-Admin-Policy**: Grants the ability to not only view environment data but also perform lifecycle operations (**Start** and **Stop**) on EC2 instances.

---

### **Permissions Logic (JSON Structure)**
Every policy follows a standardized JSON structure that dictates how AWS evaluates access requests:

*   **Effect**: Defines whether the result is an `Allow` or `Deny`.
*   **Action**: Specifies the exact API calls permitted (e.g., `ec2:StartInstances`).
*   **Resource**: Defines the target. The use of a wildcard (`*`) indicates the permission applies to all resources of that type in the account.

![Audit of the EC2-Admin group showing user-3 as the primary member](./images/ec2_admin_user3.png)

---

> **Operational Insight:** The distinction between **Managed** and **Inline** policies is critical for compliance. Managed policies provide a reliable, AWS-maintained standard, while Inline policies offer the surgical precision needed for specialized administrative roles like the **EC2-Admin** group.

---

> **Operational Insight:** Strengthening password policies is a critical component of **Identity Governance**. By enforcing periodic rotation and high complexity, the organization significantly mitigates the risk of credential-based breaches, which remain a primary vector for unauthorized cloud access.
