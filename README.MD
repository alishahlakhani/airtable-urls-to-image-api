# Airtable Image URL => Image Attachment Auto Uploader

You can use this code snippet to convert Airtable url(entire column) to Images(Attachment) column

# How to?

1. Git clone codebase `git clone git@github.com:alishahlakhani/airtable-urls-to-image-api.git`
2. Change directory `cd ./airtable-urls-to-image`
3. Install dependencies `npm install` or `yarn`
4. Update `configs.js`. Open `configs.js` and updated the following urls

```js
module.exports = {
  // This is your Airtable API KEY
  API_KEY: "Insert your key here",
  // This is the base you are updating
  BASE_ID: "Insert your base Id",
  // This is the base name you're updating
  BASE_NAME: "Insert your base name",
  // This is the view which you're updating
  VIEW_NAME: "Insert your view name",
  // [IMPORTANT] - Column name where image urls are present
  URL_TEXT_COLUMN_NAME: "Insert column name where images are in url format",
  // [IMPORTANT] - Column name where image will be uploaded. Please ensure that the type of this column is 'Attachment'
  URL_ATTACHMENT_COLUMN_NAME:
    "Insert column name where image type is Attachment",
};
```

5. Run code & Voila `npm run start`
