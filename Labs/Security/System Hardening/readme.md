# Project: Fleet-Wide Software Patching with AWS Systems Manager

## Overview
This project addresses the logistical challenge of keeping software up to date in organizations with hundreds or thousands of workstations. By using **AWS Systems Manager Patch Manager**, this project demonstrates how to automate the deployment of security updates across a large fleet of servers to maintain a consistent security baseline.

---

## **Project Prerequisites & Existing Environment**
To simulate a real-world enterprise environment, the project starts with a pre-configured infrastructure.

### **The Starting Environment**
* **Server Fleet:** The environment consists of six **Amazon EC2** instances.
* **Operating Systems:** The fleet is divided into three **Linux** instances and three **Windows** instances to test cross-platform management.
* **Backend Support:** Essential components like **IAM roles** (permissions) and service connections were pre-built to ensure the automation tools could communicate with the servers.


# Phase 1: Patching Linux Instances using Default Security Standards

This phase demonstrates how to use automated "standard rules" (baselines) to update a group of Linux servers all at once. This ensures that every server meets the company's minimum security requirements without manual work on each machine.

## **Step 1: Fleet Discovery and Management**
Before updating, the project uses **Fleet Manager** to get a "Bird's Eye View" of every server in the company. 

* **The Fleet:** The dashboard shows six active **Managed Nodes** (3 Linux and 3 Windows servers).
* **Connectivity:** Every server shows a "Ping Status" of **Online**, meaning they are ready to receive updates.

![env_setup](./images/env_setup.png)


## **Step 2: Verifying Server Identity**
To ensure the correct security rules are applied, a deep-dive into an individual server (**Linux-1**) was performed.

* **Platform Verification:** The server is confirmed as an **Amazon Linux** instance.
* **The "Permission Slip" (IAM Role):** The server has a specific **IAM Role** attached. This acts like a digital ID card that allows **AWS Systems Manager** to safely enter the server and install updates.

![env_setup](./images/linux1-details.jpg)


## **Step 3: Initiating the Automated Patching**
The project utilizes the **Patch Manager** tool to begin the update process across the entire organization.

* **The Overview:** The command center provides a "Patch Now" feature for quick security fixes.

![overview](./images/overview.jpg)

* **The Rule Book (Baseline):** For this task, the **AWS-AmazonLinux2DefaultPatchBaseline** was used. This is a pre-configured set of security rules provided by AWS that covers standard Linux vulnerabilities.

![patched](./images/patched.jpg)

---

## **Step 4: Targeted Execution and Monitoring**
To stay organized, the project doesn't just update everything at once. It uses **Tags** to target a specific "Patch Group."

* **Targeting:** The update was sent specifically to servers tagged as **LinuxProd** (Linux Production).
* **Operation Type:** A **Scan and Install** operation was chosen. This first checks for what is missing and then immediately installs the fix.
* **Visual Progress:** A real-time dashboard provides a pie chart to track the success of the operation. As the "Succeeded" section grows, it confirms the servers are now secure.

![patching](./images/patching.jpg)

* **Visual Confirmation:** The **Scan/Install operation summary** chart is now entirely green, indicating a 100% success rate for the operation.

![success patch](./images/success_patched.jpg)

---

### **The Business Logic (Why this matters):**
* **Consistency:** Using a **Default Baseline** ensures that no matter who sets up a server, it will always follow the same high security standards.
* **Efficiency through Tagging:** By using **Patch Groups**, a single administrator can update 3 servers or 3,000 servers with the same amount of effort.
* **Transparency:** The visual **Operation Summary** allows managers to see the "Health" of their infrastructure in real-time, providing proof that the business is protected.
