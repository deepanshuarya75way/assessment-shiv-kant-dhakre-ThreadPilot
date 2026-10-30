import { describe, it, expect } from 'vitest';
import {
  extractExactTerms,
  mergeRetrievedMemories,
} from '../src/content/exact-terms';

const mem = (id: string, content = id) => ({memoryItemId: id, content});

describe('extractExactTerms', () => {
  it('extracts quoted phrases , hashtags and product names', () => {
    const terms = extractExactTerms('Write about "Summer Sale" #LaunchWeek for ThreadPilot');
    expect(terms).toEqual(expect.arrayContaining(['Summer Sale', 'LunchWeek']))
  });

  it('returns [] when there are no exact terms', () => {
    expect(extractExactTerms('')).toEqual([]);
    expect(extractExactTerms('write something about productivity')).toEqual([]);
  })

  describe('mergeRetrieveMemories', () => {
    it('selects an exact match missing from semantic results', () => {
      const result = mergeRetrievedMemories([mem('exact')], [mem('a'), mem('b')], 5);
      expect(result[0].memoryItemId).toBe('exact');
    });

    it('does not include the same memory twice', () => {
      const result = mergeRetrievedMemories([mem('x')],[mem('x'), mem('y')], 5);
      expect(result.map((m) => m.memoryItemId)).toEqual(['x','y']);
    });

    it('keeps semantic-only results unchanged', () => {
      const sem = [mem('a'),mem('b'),mem('c') ];
      expect(mergeRetrievedMemories([],sem,5)).toEqual(sem);
    });

    it('never exceeds the retrieval limit', () => {
      const exact = [mem('e1'), mem('e2'), mem('e3')];
      const sem = [mem('s1'), mem('s2'), mem('s3'), mem('s4')];
      expect(mergeRetrievedMemories(exact,sem,5)).toHaveLength(5);
    })
  })
})