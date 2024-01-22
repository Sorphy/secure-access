# User Management System with RBAC and MFA

This project is a user management system with role-based access control (RBAC) and Multi-Factor Authentication (MFA) using Node.js, Express, Sequelize, and JWT.


# PROJECT STRUCTURE
project-root/
|-- dist/
|-- node_modules/
|-- src/
|   |-- config/
|   |   |-- db.ts
|   |   |-- index.ts
|
|   |-- controllers/
|   |   |-- assignRoleController.ts
|   |   |-- authController.ts
|   |   |-- UserController.ts
|
|   |-- middleware/
|   |   |-- auth.ts
|   |   |-- rbac.ts
|
|   |-- models/
|   |   |-- user.ts
|
|   |-- routes/
|   |   |-- assignRoleRoute.ts
|   |   |-- userRoute.ts
|
|   |-- utils/
|   |   |-- mfaUtils.ts
|
|   |-- index.ts
|
|-- .env
|-- .gitignore
|-- package.json
|-- README.md
|-- tsconfig.json




## Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Sorphy/secure-access.git
    cd secure-access
    ```

2. **Install Dependencies:**

    ```bash
    yarn
    ```

3. **Set up Environment Variables:**

    Create a `.env` file in the root directory and add:

    ```env
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_secret_key
    SENDINBLUE_USER = your_sendinblue_user_mail
    SENDINBLUE_PASSWORD = your_sendinblue_poassword
    SENDINBLUE_HOST = your_sendinblue_host
    SENDINBLUE_PORT=your_sendinblue_port
    FROM_ADMIN_MAIL ="admin mail"
    USER_SUBJECT = subject_of_the_message
    ```

    Replace `your_postgres_database_url`,`your_secret_key`, `your_sendinblue_user_mail`, `your_sendinblue_poassword`, `your_sendinblue_host`, `your_sendinblue_port`, `admin mail` and `subject_of_the_message`  with your actual database URL and a secure JWT secret key.

4. **Run the Application:**

    ```bash
    yarn compile
    yarn dev
    ```

    Visit [http://localhost:4000](http://localhost:4000).

## API Endpoints

### 1. Sign Up

- **Endpoint:** `POST /users/signup`
- **Description:** Creates a new user with optional MFA.
- **Request Body:**
    ```json
    {
      "name": "Sorphy",
      "email": "sorphyat@gmail.com",
      "password": "password123",
      "confirm_password": "password123",
      "role": "admin",
      "enableMFA": true,
      "phoneNumber": "+1234567890"
    }
    ```
- **Response:**
    ```json
    {
    "message": "User created successfully",
    "newUser": {
        "id": "69da532f-022f-41cc-bf5b-7249ff0ec751",
        "name": "Sorphy",
        "email": "sorphyat@gmail.com",
        "password": "$2a$10$bVGAt9v88mrrp6XqIisbb.dr5v6kXqr3eerU2GLbRvBy.N9B6C1Ee",
        "role": "employee",
        "permissions": [
            "VIEW_PRODUCTS",
            "VIEW_SALES_REPORTS",
            "PROCESS_ORDERS"
        ],
        "mfaEnabled": true,
        "otpSecret": 5462,
        "otp_expiry": "2024-01-22T18:48:58.368Z",
        "phoneNumber": "+2348138860880",
        "updatedAt": "2024-01-22T18:18:58.378Z",
        "createdAt": "2024-01-22T18:18:58.378Z"
    }
    }
    ```

### 2. Sign In

- **Endpoint:** `POST /users/signin`
- **Description:** Authenticates a user and generates a JWT token.
- **Request Body:**
    ```json
    {
      "email": "sorphyat@gmail.com",
      "password": "password123",
    }
    ```
- **Response:**
    ```json
    {
      "message": "User successfully signed in",
      "token": "generated_jwt_token"
    }
    ```

### 3. Assign Role (Admin Only)

- **Endpoint:** `POST /admin/assign-role`
- **Description:** Assigns a role to a user. Requires admin privileges.
- **Headers:**
    - `Authorization: Bearer <your_jwt_token>`
- **Request Body:**
    ```json
    {
      "userId": "69da532f-022f-41cc-bf5b-7249ff0ec751",
      "role": "manager"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Role assigned successfully"
    }
    ```

### 4. Admin-Only Access

- **Endpoint:** `GET /users/admin-only`
- **Description:** Requires admin privileges.
- **Headers:**
    - `Authorization: Bearer <your_jwt_token>`
- **Response:**
    ```json
    {
      "message": "Access granted. Admin privileges successfully applied."
    }
    ```

### 5. Admin and Managers Access

- **Endpoint:** `GET /users/admin-and-managers`
- **Description:** Requires admin or manager privileges.
- **Headers:**
    - `Authorization: Bearer <your_jwt_token>`
- **Response:**
    ```json
    {
      "message": "Access granted. Admin and managers privileges successfully applied."
    }
    ```

### 6. Admin, Managers, and Employees Access

- **Endpoint:** `GET /users/admin-managers-employees`
- **Description:** Requires admin, manager, or employee privileges.
- **Headers:**
    - `Authorization: Bearer <your_jwt_token>`
- **Response:**
    ```json
    {
      "message": "Access granted. Admin, managers, and employees privileges successfully applied."
    }
    ```

## Multi-Factor Authentication (MFA)

If MFA is enabled during user signup, an OTP (One-Time Password) is generated and sent via SMS. This OTP can be used for additional authentication.


## Testing with Postman

1. Open Postman for this project endpints(https://documenter.getpostman.com/view/26371214/2s9YymHQTS).
2. Update the environment variables in Postman with your local configuration.
3. Test each endpoint with the provided requests in the collection.

