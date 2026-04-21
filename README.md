# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Customer OTP + Order Email Flow

This project now supports:

- Customer email OTP login before order submission.
- Email confirmation when order is placed.
- Email notifications when admin updates order status (Confirmed, Key Sent, Completed, Cancelled).

### 1. Configure Microsoft Graph (Recommended)

Create app in Microsoft Entra:

1. Open Microsoft Entra admin center.
2. Go to App registrations > New registration.
3. Register app for this website mailer.
4. Open API permissions > Add permission > Microsoft Graph > Application permissions > `Mail.Send`.
5. Click Grant admin consent.
6. Open Certificates & secrets and create a new client secret.
7. Copy and store securely: Tenant ID, Client ID, Client Secret.

Update `.env`:

```
SUPPORT_EMAIL=support@cytroksys.in
GRAPH_TENANT_ID=your_entra_tenant_id
GRAPH_CLIENT_ID=your_app_client_id
GRAPH_CLIENT_SECRET=your_app_client_secret
GRAPH_SENDER_UPN=support@cytroksys.in
```

Backend sends via Microsoft Graph endpoint:

- `POST https://graph.microsoft.com/v1.0/users/support@cytroksys.in/sendMail`

### 2. Configure Outlook SMTP (Fallback)

Update `.env` using `.env.example` as reference:

```
SUPPORT_EMAIL=support@cytroksys.in
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=support@cytroksys.in
SMTP_PASS=your_outlook_app_password_or_smtp_password
SMTP_FROM="Cytroksys Support <support@cytroksys.in>"
```

Important:

- If your account uses MFA, create an app password and use it as `SMTP_PASS`.
- If SMTP AUTH is disabled in Microsoft 365 tenant settings, enable it for this mailbox.

### 3. Start frontend + API

Run API server in one terminal:

```
npm run api:start
```

Run frontend in another terminal:

```
npm run dev
```

Vite proxy forwards `/api/*` to `http://localhost:8787` (or `VITE_API_PROXY_TARGET`).

### 4. Backend endpoints added

- `POST /api/auth/customer/request-otp`
- `POST /api/auth/customer/verify-otp`
- `POST /api/auth/customer/validate`
- `POST /api/email/order-placed`
- `POST /api/email/order-status`

### 5. What users see

- In store order modal, customer must verify email with OTP before placing order.
- On success, order is still created in Firestore and confirmation email is sent.
- In admin order detail, status update also triggers customer and support email.
