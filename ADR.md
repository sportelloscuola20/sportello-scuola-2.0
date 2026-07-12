# Architecture Decision Records (ADR)

## ADR-001: Use Service Layer over Repository Pattern
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** Need to separate L5 (Experience) from L2 (Data) per EMA §1.6
- **Decision:** Services are stateless functions, not classes. Matches codebase style.
- **Consequences:** Simpler testing, no DI container needed, but no shared state between calls.

## ADR-002: In-Memory Event Bus with Optional Persistence
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** EMA §2/§4 requires event-driven architecture between modules
- **Decision:** Client-side InMemoryEventBus for immediate reactivity, PersistentEventBus with Supabase for cross-session history
- **Consequences:** Simple implementation, but server-side events require Supabase Realtime or polling.

## ADR-003: Gemini as Sole AI Provider
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** EMA §5 defines AI Core architecture
- **Decision:** gemini-3.1-flash-lite only, no OpenRouter, no multi-provider
- **Consequences:** Simplified adapter layer, but single point of failure mitigated by circuit breaker.

## ADR-004: Unified Source Registry
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** SOURCE_MATRIX and FONT_REGISTRY were duplicated
- **Decision:** Single SOURCE_MATRIX with peso field, FONT_REGISTRY as deprecated re-export
- **Consequences:** Single source of truth, backward compatible, one place to maintain sources.

## ADR-005: DataLineage on Every Data Point
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** EMA §3.13 requires every data point to carry lineage
- **Decision:** DataLineageObject created at service layer, propagated through response chain
- **Consequences:** Full provenance tracking, slight overhead on every response.

## ADR-006: Vitest as Test Framework
- **Date:** 2026-07-12
- **Status:** Accepted
- **Context:** CAP-08 requires test infrastructure
- **Decision:** Vitest (Vite-native, fast, TypeScript-first) over Jest
- **Consequences:** Native ESM support, faster than Jest, but smaller ecosystem.
