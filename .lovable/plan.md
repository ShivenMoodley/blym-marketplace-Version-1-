

# Blym Platform: User Journey Improvements & Payment Infrastructure

## Overview

This plan covers three major workstreams: (1) Supabase authentication with role-based routing, (2) Web3 language alignment across remaining pages, and (3) payment infrastructure with Squads wallet integration for admin-controlled fund management.

---

## Payment & Wallet Flow

The payment and escrow architecture uses **Squads Protocol multisig wallets** so the Blym admin maintains oversight of all deal funds.

```text
+------------------+       +------------------+       +------------------+
|     BUYER         |       |   BLYM ADMIN      |       |     SELLER        |
|                  |       |   (Multisig       |       |                  |
|  Stripe / Base   |       |    Controller)    |       |  Receives payout |
|  Pay deposit     |       |                  |       |  after deal close |
+--------+---------+       +--------+---------+       +--------+---------+
         |                          |                          |
         v                          v                          v
  +--------------+         +----------------+         +--------------+
  | Buyer Squads |-------->| Admin reviews  |-------->| Seller Squads|
  | Wallet       |  funds  | & releases     |  payout | Wallet       |
  | (created on  |  held   | milestone-based|         | (created on  |
  |  signup)     |  in     | payments       |         |  onboarding) |
  +--------------+  escrow +----------------+         +--------------+

  Payment In:                                         Payment Out:
  - Stripe checkout                                   - Admin-approved
  - Base Pay (on-chain)                                 release from
                                                        Squads multisig
```

**Key points:**
- When a **seller** completes onboarding, a Squads multisig wallet is provisioned (seller + admin as signers)
- When a **buyer** signs up, a Squads multisig wallet is provisioned (buyer + admin as signers)
- All deal deposits flow into the buyer's Squads wallet
- The admin controls release of funds to the seller's Squads wallet at deal milestones
- Listing fees (premium plan) are collected via Stripe or Base Pay

---

## Workstream 1: Authentication & Role-Based Routing

### 1.1 Supabase Auth Integration

- **Sign Up page** (`SignUp.tsx`): Wire up `supabase.auth.signUp()` with email/password, then redirect to `/choose-role`
- **Login page** (`Login.tsx`): Wire up `supabase.auth.signInWithPassword()`, query `user_roles` table to determine role, redirect to appropriate dashboard
- **Buyer Sign Up** (`BuyerSignUp.tsx`): Wire up auth signup, auto-assign `user` role + store `user_type: 'buyer'` in profiles table

### 1.2 Auth Context & Protected Routes

- Create `src/contexts/AuthContext.tsx` with session listener (`onAuthStateChange`), user profile, and role state
- Create `src/components/ProtectedRoute.tsx` wrapper that redirects unauthenticated users to `/login`
- Wrap dashboard routes (`/seller-dashboard`, `/buyer-dashboard`, `/admin-dashboard`, `/deal-room/*`) with `ProtectedRoute`

### 1.3 Role-Based Redirect After Login

- On login, query `profiles.user_type` to determine if user is seller or buyer
- Query `user_roles` with `has_role()` to check for admin
- Redirect: admin -> `/admin-dashboard`, seller -> `/seller-dashboard`, buyer -> `/buyer-dashboard`

### 1.4 Database: Profiles Table Update

The `profiles` table already exists with `user_type` column. We need:
- A trigger to auto-create a profile row on `auth.users` insert
- Assign default `user` role in `user_roles` on signup

---

## Workstream 2: Web3 Language Alignment

### 2.1 Choose Listing Type (`ChooseListingType.tsx`)

- Replace "business listing" with "dApp listing" throughout
- Update feature descriptions: "Basic dApp listing", "Featured dApp listing with on-chain analytics", etc.
- Update listing durations and features to reflect Web3 context

### 2.2 Payment Page (`Payment.tsx`)

- Replace "Premium Business Listing" with "Premium dApp Listing"
- Add Base Pay as a second payment method alongside Stripe
- Update security notice for crypto-native context

### 2.3 Deal Room (`DealRoom.tsx`)

- Replace "TechFlow Marketing Agency" mock data with a DeFi/Web3 protocol example
- Change "Business Overview" to "Protocol Overview"
- Replace "Monthly Revenue/Profit" with "Protocol Revenue (USDC)", "TVL", "DAU/MAU"
- Update documents list to Web3 equivalents (audit reports, tokenomics, smart contract docs)
- Update LOI deal structures: "All-Cash" -> "Stablecoin", add "Token Swap", "Milestone Escrow"

### 2.4 Confidential Access Request (`ConfidentialAccessRequest.tsx`)

- Replace "business" references with "protocol/dApp"
- Update NDA language for Web3 context (smart contract addresses, token info, treasury details)

### 2.5 Admin Dashboard (`AdminDashboard.tsx`)

- Replace mock data from traditional businesses to DApp/protocol listings
- Update categories from "Hospitality, Retail" to "DeFi, NFT, Infrastructure, Gaming"
- Change financial labels from "Revenue/Profit" to "Protocol Revenue/TVL"

### 2.6 Buyer Profile Setup (`BuyerProfileSetup.tsx`)

- Update "industriesOfInterest" options from traditional sectors to Web3 categories
- Update "preferredBusinessModels" to protocol models (DeFi, NFT, SaaS, Infrastructure)
- Change budget labels to USDC denomination

### 2.7 Sign Up Page (`SignUp.tsx`)

- Update description from "buying or selling businesses" to "buying or selling dApps & protocols"

---

## Workstream 3: Squads Wallet Integration

### 3.1 Database Migration

Create a new `squads_wallets` table:
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `wallet_address` (text)
- `wallet_type` (text: 'buyer' or 'seller')
- `squad_address` (text, the Squads multisig address)
- `created_at` (timestamp)

### 3.2 Wallet Provisioning Logic

- On seller onboarding completion: create a Squads wallet entry (mock for now, real integration later)
- On buyer signup completion: create a Squads wallet entry
- Display the Squads wallet address in both dashboards alongside the connected EOA wallet

### 3.3 Payment Flow Updates

- **Payment page**: Add Base Pay option (on-chain USDC payment) alongside Stripe
- **Deal Room**: Show escrow status card with Squads wallet balance, milestone progress, and admin release status
- **Seller Dashboard**: Show escrow deposits received, pending releases

---

## Technical Details

### Files to Create
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/components/ProtectedRoute.tsx` - Route guard component

### Files to Modify
- `src/App.tsx` - Wrap routes with AuthProvider, add ProtectedRoute
- `src/pages/Login.tsx` - Supabase auth integration + role-based redirect
- `src/pages/SignUp.tsx` - Supabase auth signup + Web3 copy
- `src/pages/BuyerSignUp.tsx` - Supabase auth signup
- `src/pages/ChooseListingType.tsx` - Web3 terminology
- `src/pages/Payment.tsx` - Web3 terminology + Base Pay option
- `src/pages/DealRoom.tsx` - Full Web3 overhaul + escrow status
- `src/pages/ConfidentialAccessRequest.tsx` - Web3 terminology
- `src/pages/AdminDashboard.tsx` - Web3 terminology + DApp categories
- `src/pages/BuyerProfileSetup.tsx` - Web3 categories and USDC budgets
- `src/pages/SellerDashboard.tsx` - Squads wallet display
- `src/pages/BuyerDashboard.tsx` - Squads wallet display
- `src/components/Navbar.tsx` - Add logout button when authenticated

### Database Changes (via migration tool)
1. Create trigger to auto-create profile on user signup
2. Create `squads_wallets` table with RLS policies
3. Add default role assignment trigger

### Implementation Order
1. Database migrations (profiles trigger, squads_wallets table, role trigger)
2. Auth context + protected routes
3. Login/SignUp wiring with Supabase
4. Web3 language updates across all pages
5. Squads wallet provisioning (mock) in onboarding flows
6. Payment page: Base Pay option + escrow status in Deal Room

