const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'for', 'of', 'to', 'in', 'at', 'by', 'with', 'about', 'write', 'post', 'create', 'make', 'generate', 'content', 'thread', 'is', 'are', 'this', 'that', 'it', 'my', 'our', 'me', 'i', 'we', 'you', 'please', 'new',
]);

export function extractExactTerms(text: string, max = 5): string[] {
  if(!text) return [];
  const terms = new Set<string>();

  for 
  (const m of text.matchAll(/[""'']([^""'']{2,60})[""'']/g)){
    terms.add(m[1]?.trim() ?? '');
  }
  for (const m of text.matchAll(/#([\p{L}\p{N}_]{2,40})/gu)){
    terms.add(m[1] ?? ''); 
}

  for (const m of text.matchAll(/\b([A-Z][\p{L}\p{N}]*(?:\s+[A-Z0-9][\p{L}\p{N}]*)*)\b/gu)){
    const t = m[1]?.trim() ?? '';
    if(t.length > 2 && !STOPWORDS.has(t.toLowerCase())) terms.add(t ?? '');
  }

  return [...terms].slice(0, max);
}

export interface RetrievedMemory {
  memoryItemId: string;
  content: string;
}

export function mergeRetrievedMemories(
  exactMatches: RetrievedMemory[],
  semanticMatches: RetrievedMemory[],
  limit: number,
): RetrievedMemory[] {
  const merged = new Map<string, RetrievedMemory>();
  for(const m of exactMatches) merged.set(m.memoryItemId, m);
  for(const s of semanticMatches) {
    if(!merged.has(s.memoryItemId)) merged.set(s.memoryItemId, s);
  }
  return [...merged.values()].slice(0,limit);
}