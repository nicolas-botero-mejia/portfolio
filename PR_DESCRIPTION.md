# Add Password Protection for Case Studies

This PR implements a secure password protection system for case studies, allowing selective access control while maintaining a simple, content-focused architecture.

## 🎯 Overview

Case studies can now be password-protected with true server-side security. By default, all case studies remain publicly accessible unless explicitly locked.

## ✨ Features

### Security
- **Server-side validation** - Passwords validated on the server, never exposed to client
- **SHA-256 hashing** - All passwords stored as secure hashes in environment variables
- **HTTP-only cookies** - 7-day authentication with XSS protection
- **CSRF protection** - SameSite=Strict cookie policy
- **HTTPS-only in production** - Secure flag enabled for production deployments

### Configuration Options
- **Global password** - Single password for all locked case studies
- **Per-case-study passwords** - Unique password for each case study via environment variables
- **Development mode** - Plain text passwords in frontmatter for quick testing
- **Default unlocked** - Case studies are public unless explicitly locked

### Developer Experience
- Password hashing utility: `npm run hash-password "yourpassword"`
- Comprehensive documentation with examples
- Simple frontmatter configuration: `locked: true`
- Clean error handling and user feedback

## 📁 Key Changes

### Added Files
- `src/lib/serverPasswordAuth.ts` - Server-side password validation and cookie management
- `src/actions/authActions.ts` - Server action for form-based authentication
- `src/components/ServerPasswordPrompt.tsx` - Password input UI component
- `scripts/hashPassword.js` - CLI utility for generating password hashes
- `.env.example` - Comprehensive configuration template and examples
- `docs/PASSWORD_PROTECTION.md` - Complete documentation guide
- `README_PASSWORD_PROTECTION.md` - Quick reference guide

### Modified Files
- `src/app/[slug]/page.tsx` - Added server-side authentication check
- `src/lib/mdx.ts` - Extended `CaseStudyFrontmatter` interface with `locked` and `password` fields
- `src/config/passwords.ts` - Updated to document environment variable approach
- `package.json` - Added `hash-password` script
- `.gitignore` - Allow `.env.example` while ignoring `.env.local`

## 🔧 How to Use

### Quick Setup

1. **Generate password hash:**
```bash
npm run hash-password "yourpassword"
```

2. **Create `.env.local` file:**
```env
CASE_STUDY_GLOBAL_PASSWORD=your-generated-hash
```

3. **Lock a case study (frontmatter):**
```yaml
---
title: "Protected Case Study"
locked: true
---
```

### Configuration Examples

**Global password (all locked case studies):**
```env
CASE_STUDY_GLOBAL_PASSWORD=hash-here
```

**Per-case-study passwords:**
```env
CASE_STUDY_OCEAN_PASSWORD=hash-here
CASE_STUDY_SAINAPSIS_PASSWORD=another-hash-here
```

**Environment variable naming:**
- `ocean.mdx` → `CASE_STUDY_OCEAN_PASSWORD`
- `my-project.mdx` → `CASE_STUDY_MY_PROJECT_PASSWORD`

## 🧪 Testing

### Manual Testing

1. Start dev server: `npm run dev`
2. Add `locked: true` to any case study frontmatter
3. Navigate to that case study
4. Verify password prompt appears
5. Test with correct/incorrect passwords
6. Verify authentication persists for 7 days

### Build Testing

```bash
npm run build
npm start
# Test password-protected routes
```

## 📚 Documentation

- **Quick Reference:** `README_PASSWORD_PROTECTION.md`
- **Full Guide:** `docs/PASSWORD_PROTECTION.md` (with troubleshooting, security details, deployment instructions)
- **Config Examples:** `.env.example` (comprehensive examples and comments)

## 🛡️ Security Notes

### What This Protects
✅ Casual unauthorized browsing
✅ Search engine indexing of protected content
✅ XSS attacks (HTTP-only cookies)
✅ CSRF attacks (SameSite=Strict)
✅ Password exposure in client code

### Intended Use Cases
- Client portfolios requiring casual protection
- Work-in-progress case studies
- Professional courtesy (selective sharing)
- Simple password-based access control

### Not Suitable For
- HIPAA/PCI-DSS compliance requirements
- Audit trail/logging requirements
- Enterprise multi-user access control
- Individual user account management

## 🚀 Deployment

### Environment Variables Required

Add to your hosting platform (Vercel, Netlify, etc.):

```env
CASE_STUDY_GLOBAL_PASSWORD=your-hash-here
# And/or individual case study passwords
CASE_STUDY_[SLUG]_PASSWORD=your-hash-here
```

No other deployment changes needed. The system works with static generation and server components.

## 📝 Breaking Changes

None. This is a new feature that's opt-in via the `locked` field in frontmatter. Existing case studies remain publicly accessible.

## 🔍 Password Priority

When validating passwords, the system checks in order:
1. Frontmatter `password` field (if set)
2. Environment variable `CASE_STUDY_[SLUG]_PASSWORD`
3. Global password `CASE_STUDY_GLOBAL_PASSWORD`

## ✅ Checklist

- [x] Server-side password validation implemented
- [x] SHA-256 password hashing
- [x] HTTP-only cookie authentication
- [x] Password hashing utility script
- [x] Comprehensive documentation
- [x] Environment variable configuration
- [x] Build succeeds
- [x] TypeScript compilation passes
- [x] .env.example provided
- [x] .gitignore updated to exclude .env.local

## 📸 Screenshots

The password prompt UI features:
- Clean, centered design
- Lock icon visual indicator
- Case study title display
- Password input field
- Error message handling
- "Back to portfolio" link

---

**Ready to merge:** This PR provides production-ready, secure password protection while maintaining the portfolio's simple, content-focused architecture.
