process.env.ITEMS_TABLE = 'ItemsTable';
process.env.AWS_REGION = 'eu-west-1';
process.env.AWS_PROFILE = 'serverless-deployer';

const AWS = require('aws-sdk');
const awsMock = require('aws-sdk-mock');
const handler = require('./handler.js');
const uuid = require('uuid');


// Mock the DynamoDB DocumentClient
awsMock.setSDKInstance(AWS);

describe('Lambda Functions', () => {

  // Test for the POST (Create) Lambda function
  it('should create a new item in DynamoDB', async () => {
    const event = {
      body: JSON.stringify({
        id: uuid.v4(),
        name: 'Sample Item',
        description: 'A test item',
        price: 10.99
      })
    };

    // Mock the DynamoDB putItem
    awsMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, { Message: 'Success' });
    });

    const result = await handler.createItem(event);  // Call the Lambda handler
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe('Item created');

    awsMock.restore('DynamoDB.DocumentClient');
  });
  // Test for the GET (Read) Lambda function
  it('should retrieve an item from DynamoDB', async () => {
    const event = {
      pathParameters: { id: '93a51f24-12b7-4e5b-869e-8ce7eebaa14f' }  // Replace with a real ID
    };

    // Mock the DynamoDB getItem
    awsMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: { id: '93a51f24-12b7-4e5b-869e-8ce7eebaa14f', name: 'Sample Item' } });
    });

    const result = await handler.getItem(event);  // Call the Lambda handler
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).id).toBe('93a51f24-12b7-4e5b-869e-8ce7eebaa14f');

    awsMock.restore('DynamoDB.DocumentClient');
  });

  // Test for the DELETE Lambda function
  it('should delete an item from DynamoDB', async () => {
    const event = {
      pathParameters: { id: 'sample-id' }
    };

    // Mock the DynamoDB deleteItem
    awsMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
      callback(null, { Message: 'Success' });
    });

    const result = await handler.deleteItem(event);  // Call the Lambda handler
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe('Item deleted');

    awsMock.restore('DynamoDB.DocumentClient');
  });

  // Test for error handling (e.g., Missing item in GET)
  it('should return 404 if item is not found', async () => {
    const event = {
      pathParameters: { id: 'non-existent-id' }
    };

    // Mock the DynamoDB getItem for missing item
    awsMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, {});
    });

    const result = await handler.getItem(event);  // Call the Lambda handler
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).message).toBe('Item not found');

    awsMock.restore('DynamoDB.DocumentClient');
  });

});


