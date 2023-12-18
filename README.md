
# NestJS Bucket Management System

## Overview
This NestJS project provides a robust file management system. It includes two main components:
1. **File Controller**: Manages individual files within folders.
2. **Bucket Controller**: Manages folders and lists all folders with pagination.

## Prerequisites
- Node.js
- NestJS
- A preferred database (if persistence is required)

## Installation

To get the project up and running, follow these steps:

```bash
git clone https://github.com/rahulgupta24/bucket-management.git
cd bucket-management
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Usage

### File Controller
- **Upload a File**: `POST /bucket/:bucketName/file/:fileName` with file data.
- **List Files in a Bucket**: `GET /bucket/:bucketName/files`.
- **Update a File**: `PUT /bucket/:bucketName/file/:fileName` with new file content.
- **Delete a File**: `DELETE /bucket/:bucketName/file/:fileName`.

### Bucket Controller
- **Create a Bucket**: `POST /bucket/:name`.
- **Read a Bucket**: `GET /bucket/:name`.
- **Update a Bucket Name**: `PUT /bucket` with JSON body `{ "oldName": "old", "newName": "new" }`.
- **Delete a Bucket**: `DELETE /bucket/:name`.
- **List All Folders with Pagination**: `GET /bucket/list/all` with optional query parameters `pageSize` and `page`.

## Contributing
Contributions to the project are welcome. Please follow the standard fork, branch, and pull request workflow.

## License
[Your License Choice]

---

Remember to replace `[Your-Repository-Link]` and `[Your-Repository-Name]` with your actual repository details. Also, you may need to add additional instructions or details specific to your project, such as environment setup, API documentation links, etc.