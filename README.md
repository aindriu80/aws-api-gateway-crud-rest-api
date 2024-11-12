# AWS API Gateway CRUD REST API

This project provides a REST API for CRUD operations with AWS Lambda and DynamoDB. The API allows creating, reading, updating, and deleting items from a DynamoDB table. Below are the key details about the project and its current status.

## Completed Tasks

- **API Endpoints Deployment**: Successfully deployed the following API endpoints via AWS API Gateway:

  - POST: `/dev/items` – Create a new item
  - GET: `/dev/items/{id}` – Retrieve an item by its `id`
  - PUT: `/dev/items/{id}` – Update an existing item
  - DELETE: `/dev/items/{id}` – Delete an item by its `id`

- **AWS SDK and Dependencies**: The following npm packages were added to support the functionality:

  - `"aws-sdk": "^2.1692.0"`
  - `"jmespath": "^0.16.0"`
  - `"sax": "^1.4.1"`
  - `"uuid": "^11.0.2"`
  - `"xml2js": "^0.6.2"`
  - `"xmlbuilder": "^15.1.1"`

- **Authorization Issues**: The API was successfully integrated with DynamoDB, and access to resources was properly configured using IAM roles and policies to resolve authorization errors.

- **API Testing**: Partial testing of the API has been completed using Postman. The POST, GET, and PUT endpoints were tested, and responses were verified successfully.

- **Testing DELETE Method**: The DELETE method has been implemented and thoroughly tested. It correctly handles deletion and provides appropriate responses for both successful deletions and attempts to delete non-existent items (returning "Item not found").

- **Unit Testing**: All tests for the POST (Create), GET (Read), and DELETE (Delete) Lambda functions have been successfully implemented and are passing, including the dynamic id retrieval for the GET test.

## Pending/In Progress Tasks

- **Deployment Pipeline**: Set up a CI/CD pipeline for automated deployment using tools like AWS CodePipeline or GitHub Actions.

## How to Use

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aindriu80/aws-api-gateway-crud-rest-api

   cd aws-api-gateway-crud-rest-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Deploy the service**:

   ```bash
   serverless deploy
   ```

4. **Run Unit Tests**:
   Use Postman or curl to test the deployed API endpoints:
   - **POST**: `/dev/items` – Create an item
   - **GET**: `/dev/items/{id}` – Get an item by ID
   - **PUT**: `/dev/items/{id}` – Update an item by ID
   - **DELETE**: `/dev/items/{id}` – Delete an item by ID
5. **Test the API**:
   To run the unit tests using Jest, execute:
   ```bash
    npm test
    npm jest
   ```
   This will run the tests for the Lambda functions to ensure everything is working as expected.

### Running node create_table.js

The `create_table.js` script checks if the `ItemsTable` exists in your DynamoDB. If the table does not exist, it creates it and adds a sample item. If the table already exists, it simply adds a sample item with the ID `93a51f24-12b7-4e5b-869e-8ce7eebaa14f` to the table.

To run the script:

```bash
node create_table.js
```

## Notes

- Make sure the IAM roles and policies are correctly set up for AWS Lambda to access DynamoDB.
- For further customization, you can modify the Lambda functions or the API Gateway settings via the `serverless.yml` file.
