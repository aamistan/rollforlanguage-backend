✅ Here’s the fully updated **`/docs/backend/roadmap.md`** with all the RBAC and security progress we completed in this chat.

---

```markdown
# 🛣 **Roll for Language Backend Implementation Roadmap**

> *“We build not for today, but for tomorrow and beyond.”*

---

### ✅ **Phase 1: Foundation Stabilization (Core Complete)**

**Goal:** Ensure the backend has all critical building blocks for a stable MVP.

* [x] Finalize Fastify server scaffolding (plugins, routes, controllers)
* [x] Lock in JWT auth (access + refresh tokens)
* [x] Set up Drizzle ORM with PlanetScale, schemas, migrations
* [x] Integrate Socket.IO basic real-time scaffolding (connection, disconnection handlers; ready for future events)
* [x] Confirm .env management and secrets handling
* [x] Document core API endpoints in Swagger/OpenAPI with schema-based validation

✅ **Phase 1 is now fully complete!**

---

### 🛡 **Phase 2: Hardening & Safeguards (Should-Have Layer)**

**Goal:** Strengthen the system’s security, reliability, and maintainability.

* [x] Add Fastify rate limiter and anti-abuse protections
* [x] Build fine-grained RBAC (Role-Based Access Control) with Fastify decorator and centralized permission mapping
* [ ] Integrate in-memory or Redis session management (optional for enhanced performance)
* [ ] Expand test coverage (unit, integration, E2E) using tools like Vitest + Supertest
* [ ] Establish audit logging for sensitive or critical operations (e.g., account changes, deletions)
* [ ] Scaffold internationalization-ready backend (prep groundwork for Strapi or i18n)
* [ ] Implement file/media service integration (Backblaze B2 or S3-compatible)

---

### 🚀 **Phase 3: Feature Expansion (Would-Be-Nice Layer)**

**Goal:** Unlock advanced backend powers for game mechanics and future scaling.

* [ ] Design modular RPG mechanics engine (stat rolls, checks, modifiers)
* [ ] Prepare backend hooks or APIs for Strapi or CMS content ingestion
* [ ] Integrate Redis adapter for Socket.IO clustering and horizontal scaling
* [ ] Explore API gateway or reverse proxy setup (e.g., NGINX, Traefik) for load balancing
* [ ] Architect plugin/expansion system for future game modules (campaign packs, item systems)
* [ ] Add search indexing (ElasticSearch, Typesense) for deep querying and search

---

### 🔧 **Phase 4: Supporting Tools & Automation**

**Goal:** Ensure developer and operations health over the long term.

* [ ] Automate migrations and seeds in CI/CD workflows (with safeguards)
* [ ] Integrate New Relic, Datadog, or similar APM for backend performance tracking
* [ ] Auto-generate API documentation (Swagger/OpenAPI) on deploy; maintain dev wiki or onboarding guides
* [ ] Build backup and recovery automation for critical data

---

### 🏗 **Phase 5: Infrastructure & DevOps**

**Goal:** Create rock-solid deployment and monitoring pipelines.

* [ ] Build robust CI/CD pipelines (GitHub Actions or Railway native) with linting, tests, and deploy steps
* [ ] Dockerize backend for consistent local and production environments (optional, but future-friendly)
* [ ] Define `.env` templates and secrets management for all environments (local, staging, production)

---

### 🌟 **Roadmap Maintenance Instructions**

✅ Track progress here after every sprint or backend milestone  
✅ Check off tasks after they’re properly integrated and tested  
✅ Add new tasks or adjust priorities as gameplay design evolves  
✅ Review roadmap monthly (or after a major feature push)

---
```

---

✅ Would you like me to now generate the **handoff message** for when you return to backend work, so you can cleanly restart from the next milestone later?
