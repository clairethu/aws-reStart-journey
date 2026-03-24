# AWS re/Start Lab: Automating & Troubleshooting EC2 Deployments

**Date:** 23 March 2026  
**Project:** Automated Reporting   
**Lab Objectives:** The goal of this activity is to deploy a fully automated, serverless reporting solution. Using AWS Lambda, the system will extract sales data from a MariaDB database (running on a LAMP stack) and distribute a daily analysis report via Amazon SNS to administrative stakeholders.   
By the end of this lab, I will have demonstrated the ability to:

* **Deploy Serverless Logic:** Configure and deploy AWS Lambda functions to handle data extraction and report generation.
* **Implement Event-Driven Triggers:** Schedule automated report generation using Amazon CloudWatch Events (EventBridge) for a daily 8 PM execution.
* **Secure Credential Management:** Utilize AWS Systems Manager Parameter Store to securely store and retrieve database connection strings, avoiding hardcoded secrets.
* **Integrate Multi-Tier Services:** Bridge the gap between serverless functions and VPC-based resources (MariaDB on EC2).
* **Automate Notifications:** Configure Amazon SNS (Simple Notification Service) to push automated email reports to end-users.

**Workflow**   
1. **Trigger:** CloudWatch Events fires at 8 PM daily.
2. **Process:** The "Report" Lambda triggers the "Extractor" Lambda.
3. **Data:** The Extractor pulls sales records from the MariaDB database.
4. **Delivery:** The results are formatted and sent to an SNS Topic.
5. **Output:** The Admin receives the report via email.

![Report Workflow](./images/lab178_workflow.png)

### Step 1 : Opened the AWS Management Console
### Step 2 : Identity & Access Management (IAM) Observation

**Action** I began with a security audit of the two **pre-provisioned** IAM `roles—salesAnalysisReportRole` and `salesAnalysisReportDERole` to verify the permissions required for our serverless architecture.

Figure: Pre-provisioned IAM roles identified within the AWS Console.
![Report Workflow](./images/preprov_iamroles.png)

**[!NOTE]**
Why Pre-provisioned? Using pre-created roles allowed me to focus the lab on the functional logic of the Lambda functions while ensuring that the "Least Privilege" security model was already correctly established.  

1. **Observed the salesAnalysisReport IAM role settings**
![Report Workflow](./images/IAM_role1.png)

2. **Observed the salesAnalysisReportDERole IAM role settings**
![Report Workflow](./images/IAM_role2.png)

### Step 3 : Artifact Retrieval & Dependency Preparation
**Action** To streamline the deployment, I utilized two pre-developed ZIP archives:
1. `pymysql-v3.zip` **(The Lambda Layer):** Contains the PyMySQL open-source client library. This provides the "driver" necessary for a Python-based Lambda function to communicate with a MariaDB/MySQL database.
2. `salesAnalysisReportDataExtractor-v3.zip` **(The Lambda Function):** The core application logic. This script is designed to retrieve sales records from the Café database and format them for the final report.

**[!NOTE]**
Modular Development: These artifacts were pre-developed for the lab to simulate a real-world workflow where a Developer provides a code package, and a Cloud Engineer (me) is responsible for the deployment and infrastructure integration.

### Step 4 : Created a Lambda layer
**Action:** Created a Lambda layer to provide database connectivity

**Layer Name:** `pymysqlLibrary`   
**Artifact:** `pymysql-v3.zip` (PyMySQL client library)
**Runtime:** `Python 3.14` (Modernized from 3.9 for current environment compatibility)
![Report Workflow](./images/created_lambda_layer.png)

**[!NOTE]**
The `pymysqlLibary.zip` file used in this lab was packaged using the following folder structure:
![Report Workflow](./images/pymysqlLibary.png)

### Step 5 : Created a data extractor Lambda function
**Action:** Created a Lambda funtion to extract data from database

**Function Name:** `salesAnalysisReportDataExtractor`   
**Runtime:** `Python 3.14` (Modernized from 3.9 for current environment compatibility)
**Permissions:** Assigned the pre-provisioned `salesAnalysisReportDERole` to grant the function.  

Successfully created the function salesAnalysisReportDataExtractor.
![Report Workflow](./images/ReportDERole.png)

### Step 6 : Added the Lambda layer to the function
**Action:** Integrated the database driver into the function to enable communication with MariaDB.
**Purpose:** To inject the PyMySQL library into the function environment, allowing the Python code to query the external database without bundling the library in the main code package.

**Layer Source:** Custom layers   
**Layer Name:** `pymysqlLibrary`   
**Version:** 1
Successfully created the layer to function.
![Report Workflow](./images/added_layer.png)

### Step 7 :Imported Data Extractor Logic
**Action:** Uploaded the core application code and configured the execution entry point.

**Handler:** `salesAnalysisReportDataExtractor.lambda_handler`   
**Artifact:** `salesAnalysisReportDataExtractor-v3.zip`


## 📓 Lab Observations & Troubleshooting

The following table documents deviations from the lab manual, technical hurdles, and key architectural notes identified during the deployment.

| ID | Category | Observation / Issue | Resolution / Note |
| :--- | :--- | :--- | :--- |
| **178-01** | **Runtime** | The lab manual specified **Python 3.9**, but the version is deprecated/EOL (End of Life) in the 2026 console. | **Migrated to Python 3.14** for both the Lambda Layer and the Function to ensure modern support and security. |
| **178-02** | **Database Engine** | Lab manual references **MySQL**, but the backend EC2 instance is actually running **MariaDB**. | Confirmed MariaDB as a "drop-in replacement." Since it is binary-compatible with MySQL, it uses the same **Port 3306** and the **PyMySQL** driver without requiring code changes. |
