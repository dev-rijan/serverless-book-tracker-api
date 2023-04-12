import { createChunks } from '../../../src/utils/util'

describe('Util Functions', () => {
  describe('createChunks function', () => {
    const mockData = [
      { comment: 'comment 1' },
      { comment: 'comment 2' },
      { comment: 'comment 3' },
      { comment: 'comment 4' },
      { comment: 'comment 5' },
      { comment: 'comment 6' },
      { comment: 'comment 7' },
      { comment: 'comment 8' },
      { comment: 'comment 9' },
      { comment: 'comment 10' },
      { comment: 'comment 11' },
      { comment: 'comment 12' },
    ]
    const dataCount = mockData.length
    const chunkSize = 3

    it('should return array of chunks', () => {
      const chunks = createChunks(mockData, chunkSize)
      expect(chunks.length).toEqual(dataCount / chunkSize)
    })
  })
})
