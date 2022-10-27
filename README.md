# ActiveLA
 CS35L Fall 2022 Project

# WIP. Not everything is set up yet. Let us know if something does not work.

## Development setup
It's probably easier to do these on Github desktop.

Before starting, create a new branch.

On command line:
Clone the repository and install required packages:
```
git clone https://github.com/TayKaiJun/Swee.git
...
cd server
npm install
cd ..
cd client
npm install
```
Use the following command to run the app on your local machine:
```
cd client
npm run dev
```
Invoking the dev script should run both the server and client.
Connecting to the MongoDB cloud database requires the .env file containing the MongoDB URI which you can find in the Google drive. Put it in the server folder.
>If you're downloading the file from Gdrive, the downloaded file might be saved as 
"env" instead of ".env". 
>Make sure to rename it correctly so that .gitignore will catch the file to be ignored.


## Technologies used
The following are the libraries we will use for this project. There might be more that will be added.

Frontend (React). Built with create-react-app:
1. Bootstrap
2. 
3. React-router

Backend (Node):
1. Express
2. Mongoose

Development (Just for running the app on local machine):
1. Nodemon
2. Concurrently

## File structure
We'll use this file structure to make development among us neater.
>Note: components that would be used in more than 1 page should go into the `client/src/components` folder while each page shall be an individual folder in `client/src/pages`.
>You should then import the component you need in your page from the components folder.

```
swee
├── client
│   ├── src
|   |   │  
|   |   ├── assets  
│   |   ├── components
|   |   |      ├── Component#1
│   |   |      |     ├── index.js
│   |   |      |     ├── index.css
│   |   |      ├── Component#2
│   |   |            ├── index.js
│   |   |            ├── index.css
│   |   ├── pages
│   |   |      ├── Page#1
│   |   |      |     ├── index.js
│   |   |      |     ├── index.css
│   |   |      ├── Page#2
│   |   |            ├── index.js
│   |   |            ├── index.css
|   |   |── App.css
|   |   |── App.js
|   |
├───├── package.json
|    ...
├── server
│   ├── models
|   |   |
│   |   ├── modelOne.model.js
│   |   ├── modelTwo.model.js
│   |   ├── modelThree.model.js
|   |  
│   ├── controllers
│   |   ├── routeForModelOne.js
│   |   ├── routeForModelTwo.js
│   |   ├── routeForModelThree.js
|   |
|   |── server.js
|   |── package.json
...
```
