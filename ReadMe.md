### Database Initialization

To seed the database with initial data, execute the following command in your terminal:

```bash
node seed
```

### Connecting to the Database (MongoDB Atlas)

By default, the database connection is determined by the environment mode (`NODE_ENV`).

If you want to connect using the **MongoDB Atlas** URL (used for the production environment), you can manually set the `mode` variable to `"production"` in the `` function:

```js
const mode = "production"; // Manually set to "production" to use MONGO_URL_PROD
```

Make sure your `.env` file includes the `MONGO_URL_PROD` variable with the correct MongoDB Atlas connection string.

### Bonus Features

This project includes the implementation of several optional bonus features:

1. **Business Number Editing by Admin**  
   Admin users are able to edit the `bizNumber` of a business.  
   The system ensures that the new number is unique and not already assigned to another business.

2. **Request Logger for Errors**  
   A logging system was implemented to track all incoming requests with a status code of 400 or higher.  
   For each such request, a log file is created (or appended) in the `logs/` directory:
   - The file is named with the current date (e.g. `2025-06-17.log`)
   - Each entry includes:
     - Date and time of the request
     - Status code
     - Error message
