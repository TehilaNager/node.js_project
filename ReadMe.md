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
