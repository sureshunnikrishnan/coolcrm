# CoolCRM Backend Application

## Overview

The CoolCRM Backend Application is a **RESTful API built with Node.js, Express, and Prisma**, designed to manage customer data efficiently. It provides endpoints for creating, retrieving, and managing customer information, with a focus on security and scalability. The application uses **PostgreSQL** as its database and includes **Swagger** documentation for easy API exploration [1-4].

## Main Features

*   **Customer Management**: Create, retrieve, and manage customer data [5, 6].
*   **Data Encryption**: Encrypts sensitive customer information (mobile numbers) for enhanced security [5, 7].
*   **API Documentation**: Swagger integration for interactive API documentation and exploration [3, 4].
*   **Data Validation**: Implements input validation to ensure data integrity [6, 8].
*   **Database ORM**: Uses Prisma for type-safe database access and migrations [2, 8].
*   **Environment Configuration**: Utilizes `dotenv` for managing environment-specific configuration [3, 9].

## Technologies Used

*   **Node.js**: JavaScript runtime environment [10, 11].
*   **Express**: Web application framework for Node.js [12-14].
*   **Prisma**: ORM for database access [12, 15, 16].
*   **PostgreSQL**: Relational database [1, 2].
*   **Swagger**: API documentation and exploration tool [12, 17, 18].
*   **CryptoJS**: Library for data encryption [12, 19].
*   **dotenv**: Module for loading environment variables [12, 20, 21].
*   **express-validator**: Middleware for input validation [12, 14, 22].
*   **nodemon**: Utility for automatic server restarts during development [12, 23, 24].

## Setup Instructions

### Prerequisites

*   **Node.js** (version 18 or higher) [11, 15]
*   **npm** (Node Package Manager) [11, 12]
*   **Docker** (optional, for containerized deployment) [1]
*   **Docker Compose** (optional, for multi-container setup) [1]

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd crm-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

1.  **Set up the `.env` file:**

    Create a `.env` file in the root directory with the following variables:

    ```
    PORT=3000
    DATABASE_URL=postgresql://user:password@localhost:5432/crm_db
    ENCRYPTION_KEY=your-secure-encryption-key
    ```

    *   Replace `user`, `password`, and `crm_db` with your PostgreSQL credentials and database name [1, 2].
    *   Ensure `ENCRYPTION_KEY` is a strong, randomly generated key [1, 5, 7].

2.  **Configure Prisma:**

    Modify the `prisma/schema.prisma` file to match your database connection details [2]:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```

### Database Setup

1.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate deploy
    ```

    This command creates the necessary tables in your PostgreSQL database based on the `prisma/schema.prisma` file [2, 25].

2.  **Generate Prisma client:**

    ```bash
    npx prisma generate
    ```

    This command generates the Prisma client, which you will use to interact with the database [11, 12].

### Running the Application

1.  **Start the server:**

    ```bash
    npm run dev # For development with nodemon
    # OR
    npm start # For production
    ```

    The server will start at `http://localhost:3000` (or the port specified in your `.env` file) [3, 4].

### Docker Compose (Optional)

1.  **Configure the `docker-compose.yml` file:**

    Ensure the `docker-compose.yml` file is configured with the correct database credentials and encryption key [1]:

    ```yaml
    version: '3.8'
    name: 'CoolCRM'
    services:
      app:
        build: .
        ports:
          - "3000:3000"
        environment:
          - DATABASE_URL=postgresql://user:password@db:5432/crm_db
          - ENCRYPTION_KEY=your-secure-encryption-key
        depends_on:
          - db
      db:
        image: postgres:14-alpine
        ports:
          - "5432:5432"
        environment:
          - POSTGRES_USER=user
          - POSTGRES_PASSWORD=password
          - POSTGRES_DB=crm_db
        volumes:
          - postgres_data:/var/lib/postgresql/data
    volumes:
      postgres_data:
    ```

2.  **Start the application with Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command builds the Docker image and starts the application along with the PostgreSQL database [1].

## Usage Examples

### API Endpoints

*   **Create a new customer:**

    ```
    POST /api/customers
    Content-Type: application/json

    {
      "name": "John Doe",
      "mobileNumber": "1234567890",
      "email": "john.doe@example.com"
    }
    ```

    *   **Response (201 Created):**

        ```json
        {
          "id": 1,
          "name": "John Doe",
          "mobileNumber": "1234567890",
          "encryptedMobile": "encrypted_value",
          "email": "john.doe@example.com",
          "createdAt": "2024-07-24T12:00:00.000Z",
          "updatedAt": "2024-07-24T12:00:00.000Z"
        }
        ```

*   **Get all customers:**

    ```
    GET /api/customers
    ```

    *   **Response (200 OK):**

        ```json
        [
          {
            "id": 1,
            "name": "John Doe",
            "mobileNumber": "1234567890",
            "email": "john.doe@example.com",
            "createdAt": "2024-07-24T12:00:00.000Z",
            "updatedAt": "2024-07-24T12:00:00.000Z"
          },
          {
            "id": 2,
            "name": "Jane Smith",
            "mobileNumber": "0987654321",
            "email": "jane.smith@example.com",
            "createdAt": "2024-07-24T13:00:00.000Z",
            "updatedAt": "2024-07-24T13:00:00.000Z"
          }
        ]
        ```

*   **Get customer by ID:**

    ```
    GET /api/customers/1
    ```

    *   **Response (200 OK):**

        ```json
        {
          "id": 1,
          "name": "John Doe",
          "mobileNumber": "1234567890",
          "email": "john.doe@example.com",
          "createdAt": "2024-07-24T12:00:00.000Z",
          "updatedAt": "2024-07-24T12:00:00.000Z"
        }
        ```

### Swagger Documentation

*   Access the Swagger UI at `/api-docs` endpoint of your server, for example, `http://localhost:3000/api-docs` [4].

## Security

### Data Encryption

*   Sensitive data, such as mobile numbers, is encrypted using `crypto-js` before being stored in the database [5, 7].
*   Ensure the `ENCRYPTION_KEY` is securely managed and not exposed in the codebase [1, 7].

### Input Validation

*   The application uses `express-validator` middleware to validate incoming data, preventing common security vulnerabilities such as injection attacks [6, 8].

## Maintainability and Scalability Improvements (Future Considerations)

*   **Service Layer**: Decouple database logic from controllers by introducing a service layer.
*   **Centralized Configuration**: Use a dedicated configuration module for managing environment variables.
*   **Consolidated Middleware**: Group all middleware functions into a single module.
*   **Centralized Error Handling**: Implement error-handling middleware for consistent error responses.
*   **Code Reusability**: Extract duplicated code blocks into reusable functions or modules.
*   **Input Sanitization**: Add input sanitization to prevent injection attacks.
*   **Rate Limiting**: Implement rate limiting middleware to prevent abuse of the API endpoints.
*   **Modular Project Structure**: Group related files into feature-specific directories.
*   **Logging**: Integrate a logging library for debugging, monitoring, and auditing.