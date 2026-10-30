// import { describe, it, expect } from 'vitest';
// import {
//   extractExactTerms,
//   mergeRetrievedMemories,
// } from '../src/content/exact-terms';

// const mem = (id: string, content = id) => ({memoryItemId: id, content});

// describe('extractExactTerms', () => {
//   it('extracts quoted phrases , hashtags and product names', () => {
//     const terms = extractExactTerms('Write about "Summer Sale" #LaunchWeek for ThreadPilot');
//     expect(terms).toEqual(
//       expect.arrayContaining(['Summer Sale', 'LaunchWeek', ])
//     )
//   })
// })