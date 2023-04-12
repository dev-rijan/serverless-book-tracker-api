export default {
  BookTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Delete',
    Properties: {
      TableName: '${self:provider.environment.BOOK_TABLE}',
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: '${self:custom.tableThroughput}',
        WriteCapacityUnits: '${self:custom.tableThroughput}',
      },
    },
  },
  CommentsTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Delete',
    Properties: {
      TableName: '${self:provider.environment.COMMENTS_TABLE}',
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'bookId', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'bookId', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: '${self:custom.tableThroughput}',
        WriteCapacityUnits: '${self:custom.tableThroughput}',
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'book_index',
          KeySchema: [{ AttributeName: 'bookId', KeyType: 'HASH' }],
          Projection: {
            // attributes to project into the index
            ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: '${self:custom.tableThroughput}',
            WriteCapacityUnits: '${self:custom.tableThroughput}',
          },
        },
      ],
    },
  },
}
