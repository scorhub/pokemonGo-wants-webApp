Project
============================

> Web app for making wanted list to Pokémon Go mobile game.

As of this is hobby project, and not complete, user interface were originally written in mix of English and Finnish. Althought I have done (quick) proofreading for the code, there may be still some non-English hiding.

# Table of Contents

- [Features of the App](#features-of-the-app)
- [Version](#version)
- [Frameworks and Dependencies](#frameworks-and-dependencies)
	- [Backend](#backend)
	- [Database](#database)
	- [Frontend](#frontend)
- [Folder Structure](#folder-structure)
	- [Backend](#backend-structure)
	- [Database](#database-structure)
	- [Frontend](#frontend-structure)
	- [Root](#root-structure)
- [Ignored Files](#ignored-files)
- [How to Deploy](#how-to-deploy)
	- [Deploy Online](#deploy-online)
	- [Test Locally](#test-locally)
- [Licence](#licence)

## Features of the App

App can be used to track and show to your friends what you need and want to trade in Pokémon Go - mobile game.

#### User Features

- Want lists:
  - Lucky Want (as what you want to trade in to fill "LuckyDex")
  - Always Want (what you can take in trade always, e.g. good for PVP, raids, etc.)
  - Alolan Want (for Alolan variants)
  - Galarian Want (for Galarian variants)
- Ask a feature (as single coder/player does not always spot everything)
- Change password

#### Moderator Features

App supports user class "Moderator", and functionality of the class is to help Admin to add new Pokémons/variants to database and update data of existing Pokémons.

#### Admin Features

App supports user class "Admin", and admin has extra features additionally to basic user.

- Print seeds (Admin can print information from the database - the seed printer ignores not currently wanted Pokémons, so it can be used to clean up tables)
- Add new Pokémon (as new Pokémons are added to mobile game, they can be easily added to the app)
- *Update data of Pokémon* (future feature)
- *Add news* (future feature, for posting crucial information of the game)
- *Add events* (future feature, for posting upcoming events of the game, their time and info for easily to have on hand)

#### Upcoming Features

I have long personal list of features to be implemented to the app, and here is the crucial ones that are under work:
- Last changes on lists (as which Pokémons have lefted from each persons list and which are new wants)
- Variant Want (for variants, i.e. Castform's weather variants)
- Costume Want (for event-based costume variants, i.e. Pikachu in Mimikyu costume)
- Shiny Want

## Version

The app is currently labeled as version 0.5, as it does not yet have all the basic features as I would it like to have (as listed in Upcoming Features)

## Frameworks and Dependencies

> Following frameworks and dependencies are used in the project

### Backend
- Node.js
- with additional dependencies:
    - bcryptjs
    - dotenv
    - express
    - jest
    - jsonwebtoken
    - knex
    - morgan
    - mysql
    - nodemon

### Database
- Knex.js with mySQL-dependency.

### Frontend
- React.js
- with additional dependencies:
    - React Router Dom
    - Axios

## Folder Structure

Folder structure has divided into three main sections: back, database and front.

As of .gitignore, there are folders and files not uploaded. These ignored files and folders are marked on list on *stars* ```*ignored_folder/-file*```.

### Backend Structure

    .
    └── back
       ├── bin
       ├── mw                              # Middleware files
       ├── *build*                         *# Compiled files*
       ├── public
       │  └── stylesheets
       ├── routes
       ├── *tests*                         *# Test for each interaction with backend*
       ├── utils
       ├── *.env*
       ├── app.js
       ├── package-lock.json
       └── package.json

### Database Structure

    .
    └── database
       ├── migrations
       ├── *node_modules*
       ├── seeds
       │  ├── *datafiles*                   *# Needed to upload database*
       │  ├── *wantsalwaysdata.js*          *# Predata of "always wants"*
       │  ├── *pokemonareandata.js*         *# Data / image url for arean variants i.e. Alolan forms*
       │  ├── *wantsareandata.js*           *# Predata of "arean wants"*
       │  ├── *pokemondata.js*              *# Basic data (including image url) for Pokémons*
       │  ├── *userdata.js*                 *# Basic user data, includes premade hashed passwords*
       │  └── *wantsdata.js*                *# Predata of "wants"*
       ├── package-lock.json
       ├── package.json
       └── *knexfile.js*                    *# File for knex-interaction*

### Frontend Structure

    .
    └── front
       ├── *node_modules*
       ├── public
       │  ├── css
       │  └── img
       ├── src                             # Source files
       │  ├── comp                         # Components
       │  │  ├── admin                     # Components for admin features
       │  │  │  └── navbar                 # Admin Navbar addons
       │  │  │  └── prints                 # Components for printing data from database
       │  │  ├── hooks                     # Hooks for data inquiry from backend
       │  │  ├── parts                     # Partial areas of the page, e.g. Footer, Header, etc.
       │  │  └── wants                     # Pages for listing and interacting with wants
       │  ├── lib                          # For future use
       │  │  └── *rem.me*                  *# Remove me -file - just to get folder in git*
       │  └── serv                         # Axios services
       ├── package-lock.json
       ├── package.json
       └── README.md *Generated by React*

### Root Structure
    .
    ├── *.gitignore*
    └── README.md

## Ignored Files

Some of the ignored files are needed to deploy the app, and their basic content is stated here. Check the corresponding locations of files from [Folder Structure](#folder-structure)

#### Backend
> .env

Backend needs ```.env``` to operate, and here is what it contains:

##### .env
```
PORT=3001
DB_USER=default
DB_PASS=default
DB_HOST=localhost
DB_PORT=3306
DB_TYPE=mysql
DB_DATABASE=database_name
SECRET=your_secret_key
```
As seen, most of the data are set defaults, remember to change database and secret to your own ones. Always use strong secret string.

#### Database
> knexfile.js
> datafiles folder with wantsalwaysdata.js, pokemonareandata.js, wantsareandata.js, pokemondata.js, userdata.js, wantsdata.js

As with *node_modules*, ```knexfile.js``` and ```datafiles```folder is also ignored from repository.

##### knexfile.js
```
module.exports = {
    development: {
      client: 'mysql',
      connection: {
        user: 'default',
        password: 'default',
        database: 'database_name'
      }
    }
  };
```
I have used mysql as my database, but it can be changed to your preferred one, check [Knex](http://www.knexjs.org) for more information.

Inside of ```datafiles```, there are 6 files that are needed to migrate database to server. Examples of contents of files are listed below:
##### wantsalwaysdata.js
```
module.exports = [
    { awid: 1, awpid:'1', uid:'1', awant:'1' }
    ];
```
##### pokemonareandata.js
```
module.exports = [
    { aid: 1, apid: 19, areanimg: 'url' }
    ];
```
##### wantsareandata.js
```
module.exports = [
    { arwid: 1, arwpid:'3', uid:'1', arwant:'1'}
    ];
```
##### pokemondata.js
```
module.exports = [
      { pid: 1, number:'001', name:'name', img:'url', type1: null, type2: null, rarity: null }
    ];
```
##### userdata.js
```
module.exports = [
    { uid: 1, ucid: 1, username: 'name', password: 'hashed_pass', showname: 'Name' },
    ];
```
##### wantsdata.js
```
module.exports = [
    { wid: 1, wpid:'1', uid:'1', want:'1' },
    ];
```
As seen, ```pokemondata.js``` and ```pokemonareandata.js``` need outside image urls to work.

#### Frontend
>

No other files ignored, than *node_modules*.

#### Root
>

Only ignored file is *.gitignore*, remember to create one beforing uploading own version to git.

## How to Deploy

To be added later

### Deploy Online

### Test Locally

## Licence

React, Node, Knex and their work are used under their respective licenses.

Pokémon © 1995-2020 Nintendo.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.