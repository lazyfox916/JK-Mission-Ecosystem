# 🧠 J.K. Mission — Frontend Product Requirement Document (PRD)

---

## ✨ 1. Product Overview

J.K. Mission is a modern healthcare + AI-powered platform designed to streamline patient data management, AI-assisted analysis, and operational workflows across clinics and medical branches.

This document focuses strictly on the **frontend experience**, ensuring a scalable, intuitive, and production-ready UI system.

---

## 🎯 2. Goals (Frontend)

* Build a **clean, fast, and intuitive UI**
* Enable **role-based experiences (Doctor / Admin / Staff)**
* Provide **real-time interaction with patient data**
* Visualize **AI analysis results clearly**
* Ensure **scalability for SaaS-level usage**

---

## 👥 3. User Roles

### 👨‍⚕️ Doctor

* View patient reports
* Analyze AI results
* Make decisions

### 🧑‍💼 Admin

* Manage users
* Manage branches
* Monitor system usage

### 👨‍🔧 Staff

* Upload patient data
* Manage reports

---

## 🧩 4. Core Modules (Frontend Scope)

---

### 🔐 4.1 Authentication UI

**Screens:**

* Login
* Forgot Password

**Features:**

* Role-based redirect
* Error handling (toast)
* Minimal + secure UI

---

### 📤 4.2 Patient Upload Interface

**Screens:**

* Upload Page

**Features:**

* Drag & drop upload
* File preview (image/video/pdf)
* Upload progress bar
* Metadata input (patient name, age, notes)

---

### 🤖 4.3 AI Analysis View

**Screens:**

* Analysis Result Page

**Features:**

* AI output visualization
* Highlight key insights
* Status indicators (processing, completed)
* Clean readable layout

---

### 🧑‍⚕️ 4.4 Doctor Dashboard

**Screens:**

* Dashboard Home
* Patient List
* Patient Detail

**Features:**

* Table/grid view
* Filters (date, status)
* Patient timeline
* AI result integration

---

### 📦 4.5 Inventory & Branch UI

**Screens:**

* Inventory List
* Branch Management

**Features:**

* Stock indicators
* Multi-branch switch
* Editable tables

---

### 💰 4.6 Sales Dashboard

**Screens:**

* Sales Overview

**Features:**

* Charts (daily/monthly)
* Revenue cards
* Distribution tracking

---

### 📊 4.7 Profit Distribution UI

**Screens:**

* Profit Breakdown

**Features:**

* Visual split (charts)
* Role-based earnings
* Summary cards

---

## 🎨 5. UI / UX Guidelines

### 🖤 Theme

* Dark-first UI (deep black / dark purple)
* High contrast text
* Neon accent highlights

### 🔤 Typography

* Clean sans-serif (Inter / Geist)
* Bold headings, soft body text

### 🎯 Design Style

* Minimal + modern
* Soft shadows
* Glassmorphism (light usage)
* Smooth animations

---

## 🧱 6. Component System

Reusable components:

* Button (primary / secondary / ghost)
* Input fields
* Cards
* Tables
* Modal
* Toast
* File uploader
* Status badge

---

## ⚡ 7. Performance Requirements

* Fast initial load (<2s)
* Lazy loading for heavy components
* Optimized image/video preview

---

## 📱 8. Responsiveness

* Desktop-first (primary)
* Tablet support
* Limited mobile support

---

## 🔄 9. Navigation Structure

* Sidebar navigation
* Topbar with user info
* Breadcrumb support

---

## 🧪 10. Edge Cases

* Empty states
* Upload failure
* AI processing delay
* No data scenarios

---

## 🚀 11. Future Scope (Frontend)

* Real-time updates (WebSocket)
* Notifications
* Advanced analytics
* Mobile app UI

---

## 🧠 Final Thought

This is not just a dashboard — it is a **medical intelligence interface**.
The frontend should feel **fast, confident, and trustworthy**.

---
