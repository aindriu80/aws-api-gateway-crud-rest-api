const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const params = {
    TableName: 'ItemsTable',
    Key: { id },
  };

  try {
    const { Item } = await dynamoDb.get(params).promise();
    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not retrieve item', error }),
    };
  }
};

