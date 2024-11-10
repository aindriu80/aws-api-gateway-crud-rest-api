const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createItem = async (event) => {
  const { id, name, description, price } = JSON.parse(event.body);

  const params = {
    TableName: process.env.ITEMS_TABLE,
    Item: {
      id: uuid.v4(),  // Generate new ID if not provided
      name,
      description,
      price
    }
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created', item: params.Item })
    };
  } catch (error) {
    console.error('Error creating item:', error); // Log the error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not create item', error })
    };
  }
};

module.exports.getItem = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: process.env.ITEMS_TABLE,
    Key: { id }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Item not found' }) };
    }
    return { statusCode: 200, body: JSON.stringify(result.Item) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Could not retrieve item', error }) };
  }
};

module.exports.deleteItem = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: process.env.ITEMS_TABLE,
    Key: { id }
  };

  try {
    const result = await dynamoDB.delete(params).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Item deleted' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Could not delete item', error }) };
  }
};

