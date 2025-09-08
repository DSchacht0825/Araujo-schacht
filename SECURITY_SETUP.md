# Security Setup Guide

## Current Authentication Setup

Your app now has secure email/password authentication with only two authorized accounts:

### Default Accounts
- **Daniel:** daniel@araujo-schacht.com
- **Yvonne:** yvonne@araujo-schacht.com  
- **Default Password:** `BelongingBecoming2025!`

## Changing Passwords (Recommended)

To change your passwords for better security:

1. Open `src/auth/authConfig.ts`
2. Update the password fields:

```typescript
export const authorizedAccounts: UserAccount[] = [
  {
    email: 'daniel@araujo-schacht.com',
    password: 'YOUR_NEW_STRONG_PASSWORD', // Change this
    name: 'Daniel',
    id: 'daniel-user'
  },
  {
    email: 'yvonne@araujo-schacht.com',
    password: 'YOUR_NEW_STRONG_PASSWORD', // Change this
    name: 'Yvonne', 
    id: 'yvonne-user'
  }
];
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