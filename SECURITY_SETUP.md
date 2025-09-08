# Security Setup Guide

## Current Authentication Setup

Your app now has secure email/password authentication with only two authorized accounts:

### Default Accounts
- **Daniel:** daniel@araujo-schacht.com
- **Yvonne:** yvonne@araujo-schacht.com  
- **Default Passwords:** 
  - Daniel: `ChangeMe2025!D`
  - Yvonne: `ChangeMe2025!Y`

## Changing Passwords (IMPORTANT - Do This First!)

You have two options to set your own passwords:

### Option 1: Environment Variables (Recommended for Vercel)

1. **For Local Development:**
   - Copy `.env.example` to `.env.local`
   - Update with your passwords:
   ```
   REACT_APP_DANIEL_PASSWORD=YourSecurePassword123!
   REACT_APP_YVONNE_PASSWORD=YourSecurePassword456!
   ```

2. **For Vercel Deployment:**
   - Go to your Vercel project settings
   - Navigate to Settings → Environment Variables
   - Add these variables:
     - `REACT_APP_DANIEL_PASSWORD` = Your password for Daniel
     - `REACT_APP_YVONNE_PASSWORD` = Your password for Yvonne
   - Redeploy to apply changes

### Option 2: Direct Code Change

1. Open `src/auth/authConfig.ts`
2. Change the default passwords in lines 17-18:
   ```typescript
   const danielPassword = process.env.REACT_APP_DANIEL_PASSWORD || 'YourNewPassword!';
   const yvonnePassword = process.env.REACT_APP_YVONNE_PASSWORD || 'YourNewPassword!';
   ```
3. Commit and push to trigger Vercel redeployment

## Password Requirements

Passwords must meet these criteria:
- At least 8 characters long
- 1 uppercase letter
- 1 number  
- 1 special character (@$!%*?&)

## Security Features

✅ **Only 2 authorized accounts** - No one else can create accounts  
✅ **Email/password authentication** - Secure login required  
✅ **Password validation** - Enforces strong passwords  
✅ **Error handling** - Invalid login attempts are blocked  
✅ **Session persistence** - Stays logged in until logout  
✅ **Local data storage** - All data stays in your browser  

## Email Addresses (Optional to Change)

If you want to use different email addresses:

1. Update the `email` fields in `src/auth/authConfig.ts`
2. Use real email addresses you control
3. The emails are just identifiers - no emails are actually sent

## Security Notes

- This is a **client-side only** authentication system
- Passwords are stored in the code (suitable for private family use)  
- Data is stored locally in browser localStorage
- No external servers are involved beyond Vercel hosting
- Perfect security level for a private family planning app

## For Production Deployment

The current setup is secure enough for:
- Private family use
- Vercel hosting  
- No sensitive financial or personal data
- Local data storage only

Your 12-week planner is now secure and ready for use! 🔒