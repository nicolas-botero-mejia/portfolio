# Server-Side Password Protection for Products

Secure your products with server-side password protection, HTTP-only cookies, and SHA-256 hashed passwords.

---

## 🚀 Quick Start

### 1. Generate a Password Hash

```bash
npm run hash-password "yourpassword"
```

Output:
```
✅ Password hashed successfully!

SHA-256 hash (add this to .env.local):
  5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

### 2. Add to `.env.local`

Create `.env.local` in project root:

```env
# Global password for all locked products
PRODUCT_GLOBAL_PASSWORD=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

### 3. Lock a Product

Edit your product frontmatter:

```yaml
---
title: "Protected Product"
company: "Client Name"
locked: true
---
```

### 4. Test

```bash
npm run dev
```

Visit the locked product and enter your password!

---

## 📖 Configuration Guide

### Option 1: Global Password

One password for all locked products.

**Generate hash:**
```bash
npm run hash-password "portfolio2024"
```

**Add to `.env.local`:**
```env
PRODUCT_GLOBAL_PASSWORD=hash-from-above
```

**Lock products:**
```yaml
locked: true
```

---

### Option 2: Per-Product Passwords

Different password for each product.

**Generate hash:**
```bash
npm run hash-password "ocean-secret"
```

**Add to `.env.local`:**
```env
# Format: PRODUCT_[SLUG]_PASSWORD
PRODUCT_OCEAN_PASSWORD=hash-from-above
PRODUCT_SAINAPSIS_PASSWORD=another-hash-here
```

Slug naming rules:
- `ocean.mdx` → `PRODUCT_OCEAN_PASSWORD`
- `sainapsis.mdx` → `PRODUCT_SAINAPSIS_PASSWORD`
- `my-product.mdx` → `PRODUCT_MY_PRODUCT_PASSWORD`

**Lock products:**
```yaml
locked: true
```

---

### Option 3: Development Testing

For quick testing, use frontmatter passwords (not recommended for production):

```yaml
---
locked: true
password: "testpass123"  # Plain text, will be hashed
---
```

⚠️ **Warning:** Frontmatter passwords are visible in your codebase. Use environment variables for production.

---

## 🎯 Password Priority

When validating, passwords are checked in this order:

1. **Frontmatter password** (if set in product MDX)
2. **Environment variable** for specific product (`PRODUCT_[SLUG]_PASSWORD`)
3. **Global password** (`PRODUCT_GLOBAL_PASSWORD`)

If any match, the product unlocks.

---

## 📝 Examples

### Example 1: All Public Except One

Most products public, one client-confidential.

**`.env.local`:**
```env
PRODUCT_CONFIDENTIAL_PASSWORD=hash-here
```

**Files:**
```yaml
# sainapsis.mdx - Public
---
title: "Sainapsis"
# No 'locked' field
---

# ocean.mdx - Public
---
title: "Ocean"
---

# confidential.mdx - Protected
---
title: "Confidential Client"
locked: true
---
```

---

### Example 2: All Protected with One Password

Entire portfolio password-protected.

**`.env.local`:**
```env
PRODUCT_GLOBAL_PASSWORD=hash-here
```

**All files:**
```yaml
---
locked: true
---
```

---

### Example 3: Client-Specific Passwords

Different password for each client.

**`.env.local`:**
```env
PRODUCT_GLOBAL_PASSWORD=backup-password-hash
PRODUCT_CLIENT_A_PASSWORD=client-a-hash
PRODUCT_CLIENT_B_PASSWORD=client-b-hash
```

**Files:**
```yaml
# client-a.mdx
---
locked: true
---

# client-b.mdx
---
locked: true
---

# public-work.mdx
# Not locked
---
```

Each client gets their password. Global password works as backup.

---

## 🔒 Security Features

### ✅ Server-Side Validation
- Passwords never sent to client
- All validation on server
- Content not rendered until authenticated

### ✅ Hashed Storage
- SHA-256 hashing
- Plain text never stored
- Environment variables protected

### ✅ HTTP-Only Cookies
- 7-day authentication
- JavaScript cannot access
- XSS protection
- CSRF protection (SameSite=Strict)

### ✅ Secure in Production
- HTTPS-only cookies in production
- No password exposure in build
- Static generation safe

---

## 🛡️ What This Protects

✅ Casual browsing - Unauthorized users cannot view
✅ Search engines - Protected content not indexed
✅ Direct access - All routes require authentication
✅ XSS attacks - Cookies protected from JavaScript
✅ CSRF - Cross-site request forgery blocked

---

## ⚠️ Limitations

This is **password authentication**, not enterprise security:

- ❌ No individual user accounts
- ❌ No audit trails
- ❌ No multi-factor authentication
- ❌ No permission levels
- ❌ Password sharing possible

**Use this for:**
- Client portfolios (casual protection)
- Work-in-progress products
- Professional courtesy
- Simple password needs

**Don't use for:**
- Highly confidential documents
- Compliance requirements (HIPAA, PCI-DSS)
- Enterprise security needs
- Audit trail requirements

For enterprise needs, use NextAuth.js, Auth0, or similar.

---

## 🚀 Deployment

### Vercel

1. Project Settings → Environment Variables
2. Add variables:
   - `PRODUCT_GLOBAL_PASSWORD`
   - Any specific passwords
3. Deploy

### Netlify

1. Site settings → Environment variables
2. Add variables
3. Deploy

### Other Platforms

All major platforms support environment variables. Add them in your platform's dashboard.

---

## 🔧 Troubleshooting

### Password Not Working

```bash
# 1. Verify hash generation
npm run hash-password "yourpassword"

# 2. Check environment file
cat .env.local | grep PRODUCT

# 3. Restart dev server (required after .env changes)
npm run dev
```

### Cookie Issues

- Clear browser cookies (`cs_auth_*`)
- Check HTTPS in production
- Verify no browser extensions blocking cookies

### Build Errors

- Missing env vars? Product will be accessible (security risk!)
- Check all locked products have passwords configured

---

## 📁 Technical Details

### Files

| File | Purpose |
|------|---------|
| `src/lib/serverPasswordAuth.ts` | Server-side validation |
| `src/actions/authActions.ts` | Form submission handler |
| `src/components/ServerPasswordPrompt.tsx` | Password UI |
| `src/app/[slug]/page.tsx` | Auth check |
| `scripts/hashPassword.js` | Hash generator |
| `.env.local` | Passwords (git-ignored) |
| `.env.example` | Template |

### Authentication Flow

1. User visits `/ocean`
2. Server checks if locked + authenticated
3. If not authenticated: show password prompt
4. User enters password
5. Server validates hash
6. Server sets HTTP-only cookie
7. Page refreshes, content visible

### Cookie Details

- Name: `cs_auth_[slug]`
- Duration: 7 days
- HttpOnly: Yes
- Secure: Yes (production)
- SameSite: Strict
- Path: /

---

## 💡 Tips

1. **Different passwords for different clients** - Easy to manage access
2. **Global password as backup** - You can always access everything
3. **7-day sessions** - Users don't need to re-enter frequently
4. **Test locally first** - Use frontmatter passwords for development
5. **Document passwords securely** - Use a password manager

---

## 🆘 Need Help?

1. Check `.env.example` for configuration examples
2. Test with frontmatter passwords first (simpler)
3. Check browser console for errors
4. Review server logs
5. Verify product has `locked: true`

---

## 📚 Related Documentation

- `.env.example` - Full configuration examples
- `scripts/hashPassword.js` - Password hashing utility
- `src/lib/serverPasswordAuth.ts` - Server validation logic

---

## Version History

**v2.0.0** (Current) - Server-side authentication
- ✅ Server-side validation
- ✅ SHA-256 hashing
- ✅ HTTP-only cookies
- ✅ Environment variables
- ✅ True security

**v1.0.0** (Deprecated) - Client-side authentication
- ❌ Client-side validation
- ❌ Passwords in codebase
- ❌ SessionStorage only
