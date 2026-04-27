# Project: Multi-AZ Custom VPC Deployment

## Overview
This project demonstrates how to build a secure and reliable network using **Amazon Virtual Private Cloud (VPC)**. The architecture is designed to host a web server across two **Availability Zones (AZs)** to ensure the system stays online even if one data center has an issue. It uses a layered design with public and private sections to keep data safe while allowing web traffic to flow correctly.

---

## AWS Services In this project

* **Amazon VPC:** The private network used to host all resources in a secure, isolated environment.
* **Amazon EC2:** A virtual server used to host and run the Apache web server.
* **Internet Gateway (IGW):** The connection point that links the VPC to the internet.
* **NAT Gateway:** Allows servers in private subnets to download updates without being exposed to outside attacks.
* **Public & Private Subnets:** Network layers used to separate web-facing tools from sensitive data.
* **Route Tables:** The "navigation system" that tells network traffic where to go.
* **Security Groups:** Virtual firewalls that protect the EC2 instance by only allowing specific traffic.

---

## Project Phases

* **Phase 1: VPC Foundation** – Creating the primary **Amazon VPC** and defining the network IP range.
* **Phase 2: Subnet Partitioning** – Creating **Public and Private Subnets** across multiple **Availability Zones** for resilience.
* **Phase 3: Connectivity Setup** – Attaching an **Internet Gateway (IGW)** and deploying a **NAT Gateway**.
* **Phase 4: Traffic Routing** – Configuring custom **Route Tables** to connect subnets to the correct gateways.
* **Phase 5: Security & Instance Launch** – Defining **Security Group** rules and launching the **Amazon EC2** web server.

---

### **Phase 1: VPC Foundation & Network Scaffolding**

In this phase, the primary network container was established using the **VPC Wizard**. This automated process ensured that the **Internet Gateway**, **Subnets**, and **Route Tables** were correctly interconnected from the start.

#### **Technical Configuration**
| Setting | Value | Rationale |
| :--- | :--- | :--- |
| **IPv4 CIDR** | `10.0.0.0/16` | Chosen to provide a large address space (~65,536 IPs), allowing the Fortune 100 customer to scale their infrastructure in the future. |
| **Availability Zones** | 1 (Initial Setup) | Focusing on establishing a stable primary zone before expanding to a Multi-AZ architecture. |
| **Public Subnet** | `10.0.0.0/24` | Dedicated to web-facing resources that require direct access to the Internet Gateway. |
| **Private Subnet** | `10.0.1.0/24` | Created to isolate backend resources, ensuring they are not directly reachable from the public internet. |
| **NAT Gateway** | 1 AZ | Implemented to allow resources in the **Private Subnet** to securely download software updates without being exposed to inbound threats. |
| **VPC Endpoints** | None | Kept as 'None' for this phase to minimize complexity while focusing on core routing and connectivity. |

---

#### **Key Decisions & Logic**

* **Why "VPC and more"?** Using the "VPC and more" option ensures that the **Internet Gateway (IGW)** and **Route Tables** are automatically attached and configured. This reduces human error and ensures that the "Public" subnet is truly public and the "Private" subnet is properly isolated.
    
* **Why a /16 CIDR Block?** For a large enterprise (Fortune 100), using a smaller range (like /24) would be too restrictive. A **/16 block** provides the "Grounded" foundation needed to support thousands of future instances or microservices.

* **Why the NAT Gateway?** Security is a priority. By routing private subnet traffic through a **NAT Gateway**, the architecture provides a "one-way street" for internet access—instances can reach out for patches, but hackers cannot reach in.

---

### **Phase 1 Outcomes**
* Successfully created **Lab VPC**.
*

---
[← Back to Certifications & Badges](../../)
