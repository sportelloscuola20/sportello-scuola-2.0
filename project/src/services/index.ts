export * as SearchService from './search';
export * as ChatService from './chat';
export * as InterpelliService from './interpelli';
export * as DocumentiService from './documenti';
export * as SourceGateService from './source-gate';
export * as AuthService from './auth';
export * as NotificationService from './notifications';
export * as SourceIntelligenceService from './source-intelligence';
export * as ProductService from './products';

// EMA §9 — Search Pipeline
export * as SearchPipeline from '../rag/engine/search';

// EMA §10 — Source Intelligence Engine
export * as SourceIntelligence from '../rag/engine/source-intelligence';

// EMA §11 — Notification Pipeline
export * as NotificationPipeline from '../rag/engine/notifications';

// EMA §7+8 — Product Ecosystem
export * as ConsistencyMatrix from '../rag/engine/consistency-matrix';

// EMA §12-18 — Normativa Product
export * as NormativaEngine from '../rag/engine/products/normativa';

// EMA §19-23 — Interpelli Product
export * as InterpelliEngine from '../rag/engine/products/interpelli';

// EMA §24-29 — Nomine Product
export * as NomineEngine from '../rag/engine/products/nomine';

// EMA §30-35 — Hub Eventi Product
export * as HubEventiEngine from '../rag/engine/products/hub-eventi';

// EMA §36-41 — Consulente Product
export * as ConsulenteEngine from '../rag/engine/products/consulente';

// EMA §42-50 — Cross-Cutting Engines
export * as CrossCuttingEngines from '../rag/engine/cross-cutting';

// EMA §55-61 — Blueprint Architecture
export * as Blueprint from '../rag/engine/blueprint';

// SAPM — Assessment + Capabilities + Architecture
export * as SAPM from '../sapm';
