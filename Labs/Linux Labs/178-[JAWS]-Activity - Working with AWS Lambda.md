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

[!NOTE]
Why Pre-provisioned? Using pre-created roles allowed me to focus the lab on the functional logic of the Lambda functions while ensuring that the "Least Privilege" security model was already correctly established.  

1. **Observed the salesAnalysisReport IAM role settings**
![Report Workflow](./images/IAM_role1.png)

2. **Observed the salesAnalysisReportDERole IAM role settings**
![Report Workflow](./images/IAM_role2.png)


