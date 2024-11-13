const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const tableParams = {
  TableName: 'ItemsTable',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }  // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' }  // 'S' for string
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

const sampleItemParams = {
  TableName: 'ItemsTable',
  Item: {
    id: '93a51f24-12b7-4e5b-869e-8ce7eebaa14f',
    name: 'Sample Item',
    description: 'This is a test item',
    price: 10.99
  }
};

// Check if table exists
dynamodb.describeTable({ TableName: 'ItemsTable' }, (err, data) => {
  if (err && err.code === 'ResourceNotFoundException') {
    // Table does not exist, so create it
    dynamodb.createTable(tableParams, (createErr, createData) => {
      if (createErr) {
        console.error('Error creating table:', JSON.stringify(createErr, null, 2));
      } else {
        console.log('Table created:', createData.TableDescription.TableName);
        // Insert a sample item after the table is created
        docClient.put(sampleItemParams, (putErr) => {
          if (putErr) {
            console.error('Error adding sample item:', JSON.stringify(putErr, null, 2));
          } else {
            console.log('Sample item added to table.');
          }
        });
      }
    });
  } else if (data) {
    console.log('Table already exists.');
    // Table exists, so add the sample item
    docClient.put(sampleItemParams, (putErr) => {
      if (putErr) {
        console.error('Error adding sample item:', JSON.stringify(putErr, null, 2));
      } else {
        console.log('Sample item added to table.');
      }
    });
  } else {
    console.error('Error checking table status:', JSON.stringify(err, null, 2));
  }
});

