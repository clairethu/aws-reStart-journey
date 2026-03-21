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
| CloudFront | `the-train-cafe-cdn` | Global | ❌ Blocked |
| Cognito User Pool | `the-train-cafe-users` | us-east-1 | ❌ Blocked |
| Cognito App Client | `the-train-cafe-app` | us-east-1 | ❌ Blocked |
| DynamoDB | `TrainCafe-Bookings` | us-east-1 | ✅ Active |
| DynamoDB | `TrainCafe-Orders` | us-east-1 | ✅ Active |
| Lambda | `TrainCafe-SaveBooking` | us-east-1 | ❌ Blocked |
| Lambda | `TrainCafe-SaveOrder` | us-east-1 | ❌ Blocked |
| API Gateway | `the-train-cafe-api` | us-east-1 | ❌ Blocked |
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
- Uploaded **19 files (7.4 MB)** — all succeeded, 0 failures
- Website confirmed live in browser at S3 URL

| Screenshot | Description |
|---|---|
| `01_s3_create_bucket.png` | Create bucket form — name `the-train-cafe-website`, region us-east-1 |
| `02_s3_public_access_off_warning.png` | Block Public Access OFF + acknowledgement checked |
| `03_s3_bucket_created.png` | Bucket created successfully — March 21, 2026 |
| `04_s3_static_hosting_maintenance.png` | Edit static hosting — Enabled, index.html, error.html |
| `05_s3_static_hosting_enabled.png` | Static hosting Enabled — endpoint URL visible |
| `06_s3_bucket_policy.png` | PublicReadGetObject policy saved successfully |
| `07_s3_files_uploaded.png` | 19 files, 7.4 MB — 100% succeeded, 0 failed |
| `08_s3_website_live.png` | Website live at S3 URL — full site visible in browser |

---

### ❌ Phase 2 — CloudFront + AWS Cognito — BLOCKED

Three approaches were attempted — all blocked by Canvas Sandbox permissions:

**Attempt 1 — CloudFront:**
- Went to CloudFront → Create distribution
- Set origin to S3 bucket, turned WAF off
- Clicked Create distribution → **blocked** — `wafv2:CreateWebACL` not permitted

**Attempt 2 — Cognito with S3 URL:**
- Tried creating Cognito User Pool with S3 HTTP URL as callback
- **blocked** — Cognito requires HTTPS, S3 only provides HTTP

**Attempt 3 — AWS Amplify as HTTPS alternative:**
- Tried Amplify as fallback HTTPS provider
- **blocked** — `amplify:CreateApp` not permitted

| Screenshot | Description |
|---|---|
| `09_error_cloudfront_waf_blocked.png` | CloudFront error — `wafv2:CreateWebACL` not permitted |
| `10_error_cognito_https_required.png` | Cognito error — HTTPS required, S3 URL is HTTP only |
| `11_error_amplify_CreateApp_blocked.png` | Amplify error — `amplify:CreateApp` not permitted |

---

### ⚠️ Phase 3 — DynamoDB + Lambda + API Gateway — PARTIAL

**Completed:**
- Created `TrainCafe-Bookings` table — partition key `bookingId` (String) — status **Active**
- Created `TrainCafe-Orders` table — partition key `orderId` (String) — status **Active**
- Both tables created March 21, 2026

**Blocked:**
- IAM role `the-train-cafe-lambda-role` — creation failed, `iam:CreateRole` not permitted
- Lambda functions — cannot create without IAM role
- API Gateway — cannot create without Lambda

| Screenshot | Description |
|---|---|
| `12_dynamodb_bookings_table.png` | TrainCafe-Bookings — Active, bookingId partition key, March 21 23:50 |
| `13_dynamodb_orders_table.png` | Both tables Active — TrainCafe-Bookings + TrainCafe-Orders, March 21 23:56 |
| `14_error_iam_CreateRole_blocked.png` | IAM error — `iam:CreateRole` not permitted in Canvas Sandbox |

---

### ❌ Phase 4 — Connect Forms to Database — BLOCKED

Cannot be completed — depends on Lambda and API Gateway from Phase 3 which are blocked.
Lambda code is written and ready to deploy once IAM permissions are resolved.


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

| Status | Screenshot | Phase | What it shows |
|---|---|---|---|
| ✅ | [01_s3_create_bucket.png](Labs/Projects/the-train-cafe/screenshots/01_s3_create_bucket.png) | Phase 1 | Create bucket form — name `the-train-cafe-website`, region us-east-1 |
| ✅ | [02_s3_public_access_off_warning.png](Labs/Projects/the-train-cafe/screenshots/02_s3_public_access_off_warning.png) | Phase 1 | Block Public Access OFF — acknowledgement checkbox checked |
| ✅ | [03_s3_bucket_created.png](Labs/Projects/the-train-cafe/screenshots/03_s3_bucket_created.png) | Phase 1 | Bucket created successfully — March 21, 2026 |
| ✅ | [04_s3_static_hosting_maintenance.png](Labs/Projects/the-train-cafe/screenshots/04_s3_static_hosting_maintenance.png) | Phase 1 | Edit static website hosting — Enabled, index.html, error.html |
| ✅ | [05_s3_static_hosting_enabled.png](Labs/Projects/the-train-cafe/screenshots/05_s3_static_hosting_enabled.png) | Phase 1 | Static hosting Enabled — endpoint URL visible |
| ✅ | [06_s3_bucket_policy.png](Labs/Projects/the-train-cafe/screenshots/06_s3_bucket_policy.png) | Phase 1 | Bucket policy with PublicReadGetObject saved |
| ✅ | [07_s3_files_uploaded.png](Labs/Projects/the-train-cafe/screenshots/07_s3_files_uploaded.png) | Phase 1 | 19 files, 7.4 MB uploaded — 100% succeeded, 0 failed |
| ✅ | [08_s3_website_live.png](Labs/Projects/the-train-cafe/screenshots/08_s3_website_live.png) | Phase 1 | Website live at S3 URL — full site visible in browser |
| ❌ | [09_error_cloudfront_waf_blocked.png](Labs/Projects/the-train-cafe/screenshots/09_error_cloudfront_waf_blocked.png) | Phase 2 | CloudFront blocked — `wafv2:CreateWebACL` not permitted |
| ❌ | [10_error_cognito_https_required.png](Labs/Projects/the-train-cafe/screenshots/10_error_cognito_https_required.png) | Phase 2 | Cognito blocked — HTTPS required, S3 URL is HTTP only |
| ❌ | [11_error_amplify_CreateApp_blocked.png](Labs/Projects/the-train-cafe/screenshots/11_error_amplify_CreateApp_blocked.png) | Phase 2 | Amplify fallback blocked — `amplify:CreateApp` not permitted |
| ✅ | [12_dynamodb_bookings_table.png](Labs/Projects/the-train-cafe/screenshots/12_dynamodb_bookings_table.png) | Phase 3 | TrainCafe-Bookings table Active — bookingId partition key |
| ✅ | [13_dynamodb_orders_table.png](Labs/Projects/the-train-cafe/screenshots/13_dynamodb_orders_table.png) | Phase 3 | Both tables Active — TrainCafe-Bookings + TrainCafe-Orders |
| ❌ | [14_error_iam_CreateRole_blocked.png](Labs/Projects/the-train-cafe/screenshots/14_error_iam_CreateRole_blocked.png) | Phase 3 | IAM role blocked — `iam:CreateRole` not permitted in sandbox |

---

*© 2026 The Train Café, Zurich — All aboard.*
