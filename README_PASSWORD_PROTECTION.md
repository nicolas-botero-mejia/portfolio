# 🔒 Password Protection Quick Reference

**Server-side password protection for work items** (products, features, side-projects). One auth system: cookie prefix `work_auth_`, env vars `WORK_[SLUG]_PASSWORD` and `WORK_GLOBAL_PASSWORD`.

## Quick Setup (3 Steps)

### 1️⃣ Generate Password Hash
```bash
npm run hash-password "yourpassword"
```

### 2️⃣ Create `.env.local`
```env
WORK_GLOBAL_PASSWORD=paste-hash-here
```

### 3️⃣ Lock a Work Item
```yaml
---
title: "Your Work Item"
locked: true
---
```

## Common Tasks

### Protect All Locked Work Items
```env
# .env.local
WORK_GLOBAL_PASSWORD=your-hash
```
```yaml
# In any work MDX (products, features, side-projects)
locked: true
```

### Different Password Per Item (by slug)
```bash
npm run hash-password "ocean-password"
npm run hash-password "sainapsis-password"
```
```env
# .env.local
WORK_OCEAN_PASSWORD=first-hash
WORK_SAINAPSIS_PASSWORD=second-hash
```
```yaml
locked: true
```

### Make a Work Item Public
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
