# 🔒 Password Protection Quick Reference

Your portfolio now has **server-side password protection** for case studies!

## Quick Setup (3 Steps)

### 1️⃣ Generate Password Hash
```bash
npm run hash-password "yourpassword"
```

### 2️⃣ Create `.env.local`
```env
CASE_STUDY_GLOBAL_PASSWORD=paste-hash-here
```

### 3️⃣ Lock Case Study
```yaml
---
title: "Your Case Study"
locked: true
---
```

## Common Tasks

### Protect All Case Studies
```env
# .env.local
CASE_STUDY_GLOBAL_PASSWORD=your-hash
```
```yaml
# All case study files
locked: true
```

### Different Password Per Case Study
```bash
npm run hash-password "ocean-password"
npm run hash-password "sainapsis-password"
```
```env
# .env.local
CASE_STUDY_OCEAN_PASSWORD=first-hash
CASE_STUDY_SAINAPSIS_PASSWORD=second-hash
```
```yaml
locked: true
```

### Make Case Study Public
```yaml
# Remove this line:
locked: true
```

## Need Help?

📖 **Full Documentation:** `docs/PASSWORD_PROTECTION.md`
📝 **Configuration Examples:** `.env.example`
🔧 **Troubleshooting:** Check docs, restart server, clear cookies

## Security Notes

✅ Server-side validation
✅ Hashed passwords (SHA-256)
✅ HTTP-only cookies
✅ 7-day authentication
✅ No passwords exposed to client

⚠️ Use for: Client work, WIP, professional courtesy
❌ Don't use for: Highly confidential, compliance-required content

---

**More info:** See `docs/PASSWORD_PROTECTION.md` for complete guide
