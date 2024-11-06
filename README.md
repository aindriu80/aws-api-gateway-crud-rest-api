# **AWS API Gateway CRUD REST API** 

**Completed Tasks**
=====================

*   Set up Serverless Framework: Successfully configured the Serverless Framework to deploy application.
*   Deployed API Gateway CRUD Endpoints
    *   **POST**: Creates a new item.
    *   **GET**: Retrieves an item by its id.
    *   **PUT**: Updates an item by its id.
    *   **DELETE**: Deletes an item by its id.
*   Lambda Functions Deployed: The Lambda functions corresponding to each API method (Create, Read, Update, Delete) have been successfully deployed.
*   IAM Role Permissions: Handled various IAM permission errors, ensuring that the serverless-deployer role has the necessary access to create and manage resources.
*   Resolved Deployment Bucket Issues: Created a custom deployment S3 bucket and resolved access issues related to it.
*   Resolved Runtime and Permissions Issues: Adjusted permissions and ensured the runtime for Lambda functions was updated to a supported version (Node.js 18.x instead of 14.x).

**Pending/Incomplete Tasks**
==========================

*   **Testing API**: While the endpoints are deployed, testing them with actual data (using tools like Postman, curl, or unit tests) has not yet been completed.
*   **Error Handling/Validation**: Ensure Lambda functions handle errors gracefully (e.g., invalid data, missing parameters) and return meaningful responses.
*   **Security**
    *   **API Authorization**: Considering adding authentication/authorization, such as AWS IAM roles, API keys, or JWT tokens, to secure endpoints.
    *   **Permissions for Other Users**: If other users or services to access the API, additional IAM permissions may need to be set up.
*   **Logging/Monitoring**: Set up CloudWatch logs and monitoring for Lambda functions to track errors and performance.
*   **Environment-Specific Configurations**: If planning to deploy to different environments (e.g., dev, prod), may need to manage different configurations (like database URLs or API keys) for each environment.

**Potential Improvements**
=========================

*   **Input Validation**: Ensure that each Lambda function validates the inputs for each endpoint (e.g., ensuring valid id values and request bodies).
*   **Versioning**: If planning to evolve the API, consider versioning your endpoints so that future updates don't break existing clients.
*   **Database Integration**: Potentially integrate the Lambda functions with a database (such as DynamoDB) for storing items.
*   **Unit Testing**: Write unit tests for Lambda functions to ensure they handle edge cases and errors correctly.
