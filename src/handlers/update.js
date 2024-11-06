const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'ItemsTable',
    Key: { id },
    UpdateExpression: 'set #name = :name, #description = :description',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#description': 'description',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':description': data.description,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item updated', item: result.Attributes }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not update item', error }),
    };
  }
};

