/**
 * ============================================================================
 *  CAP-02 — API VERSIONING (EMA §6.8)
 *  Semantic versioning for Edge Functions.
 * ============================================================================
 */

export const API_VERSION = 'v1' as const;

export interface ApiVersionConfig {
  version: string;
  deprecated: boolean;
  sunsetDate?: string;
  changelog: string[];
}

/** Registry of API versions and their status */
export const API_VERSIONS: Record<string, ApiVersionConfig> = {
  v1: {
    version: 'v1',
    deprecated: false,
    changelog: [
      'Initial release — all core endpoints',
    ],
  },
};

/**
 * Get the versioned URL path for an Edge Function.
 * Example: versionedPath('ai-sindacalista') → '/functions/v1/ai-sindacalista'
 */
export function versionedPath(functionName: string, version: string = API_VERSION): string {
  return `/functions/${version}/${functionName}`;
}

/**
 * Check if a version is still supported (not deprecated or past sunset).
 */
export function isVersionSupported(version: string): boolean {
  const config = API_VERSIONS[version];
  if (!config) return false;
  if (config.deprecated && config.sunsetDate) {
    return new Date(config.sunsetDate) > new Date();
  }
  return !config.deprecated;
}

/**
 * Get the deprecation warning header for a version.
 */
export function getDeprecationHeaders(version: string): Record<string, string> {
  const config = API_VERSIONS[version];
  if (!config?.deprecated) return {};
  return {
    'Deprecation': 'true',
    'Sunset': config.sunsetDate || '',
    'Link': `</functions/v1/${version}>; rel="successor-version"`,
  };
}
