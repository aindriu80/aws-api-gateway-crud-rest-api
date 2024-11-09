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

## Pending/In Progress Tasks

- **Testing DELETE Method**: While the DELETE method is implemented, additional testing may be needed to verify its behavior with different input cases and ensure proper deletion from the database.

- **Unit Testing**: Unit tests need to be written for the Lambda functions to ensure their correct behavior during edge cases and error handling.

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

4. **Test the API**:
   Use Postman or curl to test the deployed API endpoints:
   - **POST**: `/dev/items` – Create an item
   - **GET**: `/dev/items/{id}` – Get an item by ID
   - **PUT**: `/dev/items/{id}` – Update an item by ID
   - **DELETE**: `/dev/items/{id}` – Delete an item by ID

## Notes

- Make sure the IAM roles and policies are correctly set up for AWS Lambda to access DynamoDB.
- For further customization, you can modify the Lambda functions or the API Gateway settings via the `serverless.yml` file.

