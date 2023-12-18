

# Project Bucket and File Management 

## Overview
Making a AWS S3 clone using NestJs

## Features
- File Upload
- File Update
- File Deletion
- List Files in a Bucket
- Create, Update, and Delete Buckets
- Paginated Listing of All Buckets

## Getting Started
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them. For example:
- Node.js
- NestJS CLI
- Any other dependencies

### Installing
A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository
   ```sh
   git clone https://github.com/rahulgupta24/bucket-management
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the application
   ```sh
   npm run start
   ```

## Usage
### File Management
- **Upload a File:** 
  - Endpoint: `[POST] /file`
  - Parameters: `bucketName`, `fileName`
  - Body: Form-data with the file

- **List Files in a Bucket:** 
  - Endpoint: `[GET] /file`
  - Query Parameters: `bucketName`

- **Update a File:** 
  - Endpoint: `[PUT] /file`
  - Parameters: `bucketName`, `fileName`
  - Body: Form-data with the file

- **Delete a File:** 
  - Endpoint: `[DELETE] /file`
  - Query Parameters: `bucketName`, `fileName`

### Bucket Management
- **Create a Bucket:** 
  - Endpoint: `[POST] /bucket/:name`

- **Rename a Bucket:** 
  - Endpoint: `[PUT] /bucket`
  - Body: JSON with `oldName` and `newName`

- **Delete a Bucket:** 
  - Endpoint: `[DELETE] /bucket/:name`

- **List All Buckets (Paginated):** 
  - Endpoint: `[GET] /bucket/list/all`
  - Query Parameters: `pageSize`, `page`

## Contributing
Instructions for how to contribute to your project.

## License
MIT.

---
