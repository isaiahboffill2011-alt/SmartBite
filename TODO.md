- [ ] Inspect current deployment on Vercel (SmartBite project settings)
- [ ] Confirm whether `/api` is served by separate Vercel-hosted server (e.g. `smartbite-api.vercel.app`) or should be deployed from this repo
- [ ] Commit `vercel.json` and push to origin
- [ ] Trigger Vercel redeploy and verify:
  - [ ] Frontend loads
  - [ ] `/api/*` calls work
- [ ] If `/api` is broken, adjust Vercel rewrite rules to the actual deployed server domain or deploy server separately

