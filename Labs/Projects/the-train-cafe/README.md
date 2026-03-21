# The Train Café — AWS Deployment Project

> *A café between destinations* — Static website deployed on AWS  
> **Est.** 2026 · Zurich

---

## Project Overview

The Train Café is a fully deployed static restaurant website built and hosted on AWS.  
Customers can browse the menu, reserve a table, and place orders online.  
User authentication is handled by AWS Cognito, and all bookings and orders are stored in DynamoDB via Lambda and API Gateway.

---

## File Structure

```
train-cafe-website/
├── index.html          # Homepage — hero, menu, about, reviews, map, footer
├── booking.html        # Table reservation form → POST to API Gateway /booking
├── order.html          # Online order form with live cart → POST to API Gateway /order
├── error.html          # Custom 404 page with animated train tracks
├── index.css           # All styles — dark gold theme, Playfair Display + Lato fonts
├── README.md           # This file
├── screenshots/        # AWS deployment screenshots (23 required)
└── images/
    ├── Banner.jpg          # Hero banner — train café exterior at dusk
    ├── Logo.jpg            # The Train Café logo (gold steam locomotive)
    ├── hero-train.jpg      # Subpage hero image
    ├── Map.png             # Google Maps screenshot — Zurich location
    ├── Croissant.jpg       # Paris Morning Croissant Plate
    ├── Ramen.jpg           # Tokyo Night Ramen
    ├── Meze.jpg            # Istanbul Sunset Mezze
    ├── Flan.jpg            # Lisbon Caramel Flan
    ├── Vienna Cake.jpg     # Vienna Chocolate Dream
    ├── Espresso.jpg        # Espresso Express
    ├── Matcha.jpg          # Matcha Departure
    ├── socials.png         # Social media icons
    └── tripadvisor.png     # TripAdvisor logo
```

---

## Live Website

**S3 Endpoint (HTTP):**
`http://the-train-cafe-website.s3-website-us-east-1.amazonaws.com`

**CloudFront URL (HTTPS — Phase 2):**
`https://[pending].cloudfront.net`

---

## AWS Architecture

| Service | Resource Name | Region | Status |
|---|---|---|---|
| S3 Bucket | `the-train-cafe-website` | us-east-1 | ✅ Live |
| CloudFront | `the-train-cafe-cdn` | Global | ⏳ Pending |
| Cognito User Pool | `the-train-cafe-users` | us-east-1 | ⏳ Pending |
| Cognito App Client | `the-train-cafe-app` | us-east-1 | ⏳ Pending |
| DynamoDB | `TrainCafe-Bookings` | us-east-1 | ✅ Active |
| DynamoDB | `TrainCafe-Orders` | us-east-1 | ✅ Active |
| Lambda | `TrainCafe-SaveBooking` | us-east-1 | ⏳ Pending |
| Lambda | `TrainCafe-SaveOrder` | us-east-1 | ⏳ Pending |
| API Gateway | `the-train-cafe-api` | us-east-1 | ⏳ Pending |
| IAM Role | `the-train-cafe-lambda-role` | Global | ❌ Blocked |

---

## Deployment Phases

### ✅ Phase 1 — S3 Static Website Hosting

**What was done:**
- Logged into AWS Canvas Sandbox — region `us-east-1` (N. Virginia)
- Created S3 bucket named `the-train-cafe-website` (General purpose, Global namespace)
- Unchecked **Block all public access** and confirmed the acknowledgement warning
- Enabled **Static Website Hosting** — Index document: `index.html`, Error document: `error.html`
- Endpoint URL: `http://the-train-cafe-website.s3-website-us-east-1.amazonaws.com`
- Added bucket policy granting public `s3:GetObject` on `arn:aws:s3:::the-train-cafe-website/*`
- Uploaded **19 files (7.4 MB)** — all succeeded, 0 failures:
  - Root level: `index.html`, `booking.html`, `order.html`, `error.html`, `index.css`
  - `images/` folder: `Banner.jpg`, `Logo.jpg`, `hero-train.jpg`, `Map.png`, all food photos
- Website confirmed live in browser at S3 URL

> **Upload error noted:** First upload attempt included wrong files. Corrected and re-uploaded successfully. See `07_Error_wrong_files_upload.png`.

| Screenshot | Description |
|---|---|
| `01_aws_console_home.png` | AWS Console — region us-east-1 confirmed |
| `02_s3_create_bucket.png` | Create bucket form — name `the-train-cafe-website` |
| `03_s3_public_access_off_warning.png` | Block Public Access OFF + acknowledgement checked |
| `04_s3_bucket_created.png` | Bucket created successfully in us-east-1 |
| `05_s3_static_hosting_enabled.png` | Static hosting Enabled — endpoint URL visible |
| `06_s3_bucket_policy.png` | PublicReadGetObject policy saved successfully |
| `07_s3_files_uploaded_correct.png` | 16 files uploaded — 5.3 MB, 100% succeeded |
| `08_s3_website_live.png` | Website loading live from S3 URL in browser |

---

### ⏳ Phase 2 — CloudFront + AWS Cognito

**Plan:**
- Create CloudFront distribution `the-train-cafe-cdn` pointing to S3 bucket
- Use CloudFront HTTPS URL as Cognito callback URL
- Create Cognito User Pool `the-train-cafe-users` with app client `the-train-cafe-app`
- Add **Sign In** button to `index.html` linking to Cognito Hosted UI
- The Sign In button is already implemented in the HTML — just needs the Cognito URL added

> Currently pending — CloudFront distribution not yet created.

---

### ✅ Phase 3 — DynamoDB Tables

**What was done:**
- Created `TrainCafe-Bookings` table
  - Partition key: `bookingId` (String)
  - Status: **Active** ✅
- Created `TrainCafe-Orders` table
  - Partition key: `orderId` (String)
  - Status: **Active** ✅
- Both tables created in `us-east-1`, confirmed in DynamoDB console on March 19, 2026

| Screenshot | Description |
|---|---|
| `12_dynamodb_bookings_table.png` | `TrainCafe-Bookings` table Active — bookingId partition key |
| `13_dynamodb_orders_table.png` | Both tables Active — `TrainCafe-Bookings` + `TrainCafe-Orders` |

---

### ⏳ Phase 4 — Lambda + API Gateway + Forms

**Plan:**
- Create IAM role `the-train-cafe-lambda-role` with:
  - `AmazonDynamoDBFullAccess`
  - `AWSLambdaBasicExecutionRole`
- Deploy Lambda function `TrainCafe-SaveBooking` (Python 3.12) — saves to `TrainCafe-Bookings`
- Deploy Lambda function `TrainCafe-SaveOrder` (Python 3.12) — saves to `TrainCafe-Orders`
- Create HTTP API Gateway `the-train-cafe-api` with routes:
  - `POST /booking` → `TrainCafe-SaveBooking`
  - `POST /order` → `TrainCafe-SaveOrder`
- Paste API Gateway Invoke URL into `booking.html` and `order.html`

**Lambda code is written and ready.** The booking form POSTs JSON with fields: `name`, `email`, `phone`, `date`, `time`, `guests`, `occasion`, `notes`. The order form POSTs: `name`, `email`, `pickup`, `items`, `notes`.

> ❌ **Blocked:** IAM role creation failed — Canvas Sandbox does not permit `iam:CreateRole` for this user account. Awaiting instructor resolution.

---

## ⚠️ Issues Encountered

### 1. CloudFront — WAF Permission Blocked
```
Error: wafv2:CreateWebACL not authorized
```
**Screenshot:** `09_error_cloudfront_waf_blocked.png`  
**Cause:** Canvas Sandbox blocks `wafv2:CreateWebACL`. The new CloudFront wizard automatically attaches WAF and cannot be bypassed.  
**Impact:** No HTTPS URL available — Cognito cannot be configured.

---

### 2. Cognito — HTTPS Required
```
Error: HTTPS is required over HTTP except for http://localhost
```
**Screenshot:** `10_error_cognito_https_required.png`  
**Cause:** Cognito requires an HTTPS callback URL. S3 only provides HTTP. Without CloudFront there is no HTTPS URL available.

---

### 3. Amplify — Permission Blocked
```
Error: amplify:CreateApp not authorized
```
**Screenshot:** `11_error_amplify_CreateApp_blocked.png`  
**Cause:** Attempted Amplify as an alternative HTTPS provider. Also blocked by sandbox permissions.

---

### 4. IAM Role Creation Blocked
```
Error: Failed to create role the-train-cafe-lambda-role
iam:CreateRole not authorized
```
**Screenshot:** `14_error_iam_CreateRole_blocked.png`  
**Cause:** Canvas Sandbox restricts IAM role creation for student accounts.  
**Impact:** Lambda functions and API Gateway cannot be configured. Booking and order forms cannot connect to DynamoDB.  
**Status:** Reported to instructor. All Lambda code is written and ready to deploy.

---

## Team

| Member | Role | Contribution |
|---|---|---|
| Veronika | Concept & PM | Café concept, About Us text, project plan, presentation |
| Laura | Content | Menu descriptions, image selection, storytelling copy |
| Claire | Design | Color palette, fonts, layout design |
| Svitlana | AWS & Frontend | HTML/CSS build (developed with Claude AI), S3 deployment, DynamoDB, booking & order forms, README |

> **Note:** HTML/CSS files (`index.html`, `booking.html`, `order.html`, `error.html`, `index.css`) were developed with the assistance of Claude AI (Anthropic), used as a coding tool to accelerate frontend development.

---

## Screenshots

| Status | File | Phase | What it shows |
|---|---|---|---|
| ✅ | `01_s3_create_bucket.png` | Phase 1 | Create bucket form — name `the-train-cafe-website`, region us-east-1 |
| ✅ | `02_s3_public_access_off_warning.png` | Phase 1 | Block Public Access OFF — acknowledgement checkbox checked |
| ✅ | `03_s3_bucket_created.png` | Phase 1 | Bucket created successfully — March 21, 2026 |
| ✅ | `04_s3_static_hosting_maintenance.png` | Phase 1 | Edit static website hosting — Enabled, index.html, error.html |
| ✅ | `05_s3_static_hosting_enabled.png` | Phase 1 | Static hosting Enabled — endpoint URL visible |
| ✅ | `06_s3_bucket_policy.png` | Phase 1 | Bucket policy with PublicReadGetObject saved |
| ✅ | `07_s3_files_uploaded.png` | Phase 1 | 19 files, 7.4 MB uploaded — 100% succeeded, 0 failed |
| ✅ | `08_s3_website_live.png` | Phase 1 | Website live at S3 URL — full site visible in browser |
| ❌ | `09_error_cloudfront_waf_blocked.png` | Phase 2 | CloudFront blocked — `wafv2:CreateWebACL` not permitted in sandbox |
| ❌ | `10_error_cognito_https_required.png` | Phase 2 | Cognito blocked — HTTPS required, S3 URL is HTTP only |
| ❌ | `11_error_amplify_CreateApp_blocked.png` | Phase 2 | Amplify fallback blocked — `amplify:CreateApp` not permitted |
| ✅ | `12_dynamodb_bookings_table.png` | Phase 3 | TrainCafe-Bookings table Active — bookingId partition key |
| ✅ | `13_dynamodb_orders_table.png` | Phase 3 | Both tables Active — TrainCafe-Bookings + TrainCafe-Orders |
| ❌ | `14_error_iam_CreateRole_blocked.png` | Phase 3 | IAM role blocked — `iam:CreateRole` not permitted in sandbox |

---

*© 2026 The Train Café, Zurich — All aboard.*
