# 🚀 Super Easy Supabase Setup Guide

## Step 1: Create Supabase Account (Free)

1. Go to **[supabase.com](https://supabase.com)**
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email
4. **It's completely free** for your usage level!

## Step 2: Create Your Project

1. Click **"New project"**
2. Choose your organization (or create one)
3. **Project settings:**
   - **Name:** `Araujo-Schacht Planner`
   - **Database Password:** Choose a secure password (save it!)
   - **Region:** Choose closest to you
4. Click **"Create new project"**
5. **Wait 2-3 minutes** for setup to complete

## Step 3: Set Up Database

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. **Copy the entire contents** of `supabase-schema.sql` file 
4. **Paste it** into the SQL editor
5. Click **"Run"** (or Ctrl+Enter)
6. You should see **"Success. No rows returned"** ✅

## Step 4: Get Your API Keys

1. Go to **Settings** → **API** (left sidebar)
2. Copy these two values:
   - **Project URL** (looks like: `https://abc123.supabase.co`)
   - **Public anon key** (long string starting with `eyJ...`)

## Step 5: Add Environment Variables

### Option A: For Vercel (Recommended)
1. Go to your **Vercel project dashboard**
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - **Name:** `REACT_APP_SUPABASE_URL`
   - **Value:** Your Project URL from Step 4
   
   - **Name:** `REACT_APP_SUPABASE_ANON_KEY` 
   - **Value:** Your anon key from Step 4

4. **Redeploy** your project in Vercel

### Option B: For Local Development
1. Create `.env.local` in your project root
2. Add these lines:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 6: Test Your Setup

1. **Deploy/restart** your app
2. **Login** with your credentials
3. **Add a goal** or task
4. Go to your **Supabase dashboard** → **Table Editor**
5. You should see your data in the tables! 🎉

## 🎉 You Now Have:

✅ **Real-time collaboration** - You and Yvonne can use the app simultaneously  
✅ **Cross-device sync** - Access from phone, computer, tablet  
✅ **Automatic backups** - Supabase handles all data safety  
✅ **Fast performance** - Data loads instantly  
✅ **Free hosting** - No costs for your usage level  
✅ **Secure storage** - Industry-standard security  

## 🔧 Troubleshooting

**"Invalid API key" error:**
- Check your environment variables are correct
- Redeploy after adding env vars

**"Connection failed" error:**
- Verify your Project URL is correct
- Check Supabase project is active (green dot in dashboard)

**Data not saving:**
- Check browser console for errors
- Verify database schema was created successfully

## 📱 What Changes:

- **Same beautiful app** - UI stays exactly the same
- **Real collaboration** - You and Yvonne can work together
- **Instant sync** - Changes appear immediately for both users
- **All devices** - Phone, computer, tablet all stay in sync

**Your local-only data will be migrated automatically!** 🚀

Need help? Just ask! The setup should take less than 10 minutes.