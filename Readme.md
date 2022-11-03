This is the back end for the WBW CRM

The purpose of this is to connect to the MySQL Database and then fetch the needed data. With that data, it sends it to the front end. We also add new elements to the database that are sent over from the front end.

Because the back end is saved to Microsoft Azure through the CRMpilot0 app service, the website the front end uses to receive the data is https://crmpilot0.azurewebsites.net/
This data is saved as a JSON and sent to the corresponding routes (/customers for customers/contacts [depending on what you want to call it], /workers for the WBW Workers, and /workercustomers to show which workers are working on which contact)

The back end utilizes Node.js with the express package to run.