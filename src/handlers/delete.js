const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  // Check if the item exists
  const getParams = {
    TableName: process.env.ITEMS_TABLE,
    Key: { id }
  };

  try {
    const result = await dynamoDb.get(getParams).promise();

    // If item doesn't exist, return "Item not found"
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" })
      };
    }

    // If item exists, proceed to delete it
    const deleteParams = {
      TableName: process.env.ITEMS_TABLE,
      Key: { id }
    };

    await dynamoDb.delete(deleteParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item deleted" })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not delete item", error })
    };
  }
};
