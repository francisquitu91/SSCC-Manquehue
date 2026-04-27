export type DocumentSourceType = 'storage' | 'drive';

export interface InstitutionalDocumentRecord {
  id: string;
  category: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number | null;
  order_index: number;
  created_at: string;
  source_type?: DocumentSourceType | null;
  external_view_url?: string | null;
  external_download_url?: string | null;
  route_slug?: string | null;
  open_in_fullscreen?: boolean | null;
  is_hidden?: boolean | null;
}

export interface InstitutionalDocumentProjection {
  id: string;
  source_document_id: string | null;
  title: string;
  category: string;
  source_file_url: string | null;
  source_file_name: string | null;
  external_view_url: string;
  external_download_url: string | null;
  route_slug: string | null;
  open_in_fullscreen: boolean;
  is_hidden: boolean;
}

export interface ProjectedInstitutionalDocument extends InstitutionalDocumentRecord {
  projection_id?: string;
  source_document_id?: string | null;
  is_projection_orphan?: boolean;
}

const DRIVE_ID_PATTERNS = [
  /\/d\/([a-zA-Z0-9_-]{20,})/,
  /[?&]id=([a-zA-Z0-9_-]{20,})/,
] as const;

export function normalizeRouteSlug(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function extractDriveId(url: string): string | null {
  for (const pattern of DRIVE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

export function buildDrivePreviewUrl(url: string): string {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return '';
  }

  if (trimmedUrl.includes('/document/d/')) {
    const id = extractDriveId(trimmedUrl);
    return id ? `https://docs.google.com/document/d/${id}/preview` : trimmedUrl;
  }

  if (trimmedUrl.includes('/presentation/d/')) {
    const id = extractDriveId(trimmedUrl);
    return id ? `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000` : trimmedUrl;
  }

  const id = extractDriveId(trimmedUrl);
  return id ? `https://drive.google.com/file/d/${id}/preview` : trimmedUrl;
}

export function buildDriveDownloadUrl(viewUrl: string, configuredDownloadUrl?: string | null): string {
  if (configuredDownloadUrl?.trim()) {
    return configuredDownloadUrl.trim();
  }

  const id = extractDriveId(viewUrl);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : viewUrl;
}

export function getDocumentViewUrl(doc: InstitutionalDocumentRecord): string {
  if (doc.source_type === 'drive') {
    return buildDrivePreviewUrl(doc.external_view_url || doc.file_url);
  }

  return doc.file_url;
}

export function getDocumentDownloadUrl(doc: InstitutionalDocumentRecord): string {
  if (doc.source_type === 'drive') {
    return buildDriveDownloadUrl(doc.external_view_url || doc.file_url, doc.external_download_url);
  }

  return doc.file_url;
}

export function mergeDocumentsWithProjections(
  primaryDocuments: InstitutionalDocumentRecord[],
  projections: InstitutionalDocumentProjection[]
): ProjectedInstitutionalDocument[] {
  const projectionBySourceId = new Map<string, InstitutionalDocumentProjection>();
  const primaryIds = new Set(primaryDocuments.map((doc) => doc.id));

  for (const projection of projections) {
    if (projection.source_document_id) {
      projectionBySourceId.set(projection.source_document_id, projection);
    }
  }

  const mergedPrimary = primaryDocuments.map((doc) => {
    const projection = projectionBySourceId.get(doc.id);

    if (!projection) {
      return {
        ...doc,
        source_type: doc.source_type || 'storage',
        open_in_fullscreen: doc.open_in_fullscreen ?? true,
        is_hidden: doc.is_hidden ?? false,
        is_projection_orphan: false,
        source_document_id: doc.id,
      } satisfies ProjectedInstitutionalDocument;
    }

    return {
      ...doc,
      source_type: 'drive',
      external_view_url: projection.external_view_url,
      external_download_url: projection.external_download_url,
      route_slug: projection.route_slug,
      open_in_fullscreen: projection.open_in_fullscreen,
      is_hidden: Boolean(projection.is_hidden) || Boolean(doc.is_hidden),
      projection_id: projection.id,
      source_document_id: doc.id,
      is_projection_orphan: false,
    } satisfies ProjectedInstitutionalDocument;
  });

  const orphanProjections = projections
    .filter((projection) => !projection.source_document_id || !primaryIds.has(projection.source_document_id))
    .map((projection) => {
      const syntheticId = `projection-${projection.id}`;

      return {
        id: syntheticId,
        category: projection.category,
        title: projection.title,
        description: null,
        file_url: projection.external_view_url,
        file_name: projection.source_file_name || `${projection.title}.gdrive`,
        file_type: 'application/vnd.google-apps.document',
        file_size: null,
        order_index: 0,
        created_at: new Date().toISOString(),
        source_type: 'drive',
        external_view_url: projection.external_view_url,
        external_download_url: projection.external_download_url,
        route_slug: projection.route_slug,
        open_in_fullscreen: projection.open_in_fullscreen,
        is_hidden: projection.is_hidden,
        projection_id: projection.id,
        source_document_id: projection.source_document_id,
        is_projection_orphan: true,
      } satisfies ProjectedInstitutionalDocument;
    });

  return [...mergedPrimary, ...orphanProjections];
}
