Project
============================

> Web app to make wanted list for Pokémon Go mobile game.

As of this is hobby project, and not complete, user interface were originally written in mix of English and Finnish. As so, there may be still some non-English hiding.

# Table of Contents

- [Version](#version)
	- [Version history](#version-history)
- [Features of the App](#features-of-the-app)
- [Known Issues](#known-issues)
- [Designer Notes](#designer-notes)
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
	- [Set Up](#set-up)
	- [Testing Backend](#testing-backend)
	- [Run Locally](#run-locally)
	- [Deploy Online](#deploy-online)
- [Licence](#licence)

## Version

App is currently on version 1.0

### Version history

- 1.0  Grand update: variant wants, admin interactions for news, events & features, api commands refactoring, code refactoring, Navbar reworked, shiny wants, package update, new http-test for backend, updated readme and more.
- 0.6  Costume wants, news, events, moderator rights.
- 0.58 Moderator navbar, add additional data to pokemon data, add costume variants.
- 0.57 Moderator check added, always-want size restricted to 50.
- 0.55 Tests added to backend
- 0.5  First public upload of the code

## Features of the App

App is used to track and show to your friends what you need and want to trade in Pokémon Go - mobile game.

#### User Features

- Want lists:
  - Lucky Want (as what you want to trade in to fill "LuckyDex")
  - Always Want (what you can take in trade always, e.g. good for PVP, raids, etc.)
  - Arean Want (for arean variants)
  - Variant Want (for variant forms, i.e. Unown)
  - Costume Want (for event-based costume variants, i.e. Pikachu in Mimikyu costume)
  - Shiny Want
- Ask a feature (as single coder/player does not always spot everything)
- Read news & events posted by admin
- Change password

#### Moderator Features

App supports user class "Moderator", and functionality of the class is to help Admin to add new Pokémons/variants to database and update data of existing Pokémons.

Current configuration of app gives moderator following access rights:
- Add Pokémon data
  - Types
  - Generation
  - Rarity
  - Released
  - Mega

#### Admin Features

App supports user class "Admin", and admin has extra features additionally to basic user and moderator.

- Post & edit News and Events
    - Write news & event
    - Edit news & event
    - Hide / Set visible news
    - Archive/unarchive news
- Manage features
    - Add to upcoming list, working list, mark as ready, add a note and/or archive/unarchive
- Manage Pokémon data
    - Add new Pokémons (regular ones, or differend versions for different want lists)
    - Update data (currently update regular version image only)
- Print data from database
    - All database data from news, events, features, Pokémons and wants can be printed
- Administer moderators (give / revoke rights)

#### Upcoming Features

- Filter with search & generation
- Gender want
- Page that lists all wanted Pokémons from other users, and shows who wants them (with color icons i.e.)
- PVP Battle Pokémons with best IVs & movesets
- Only Special / non-special trade filtering for want lists
- Update pages for rest of the Pokémon informations
- Accees rights & visibility moderation page for admin (can set which features are accessible by user classes)
- Want list filtering by showing only released Pokémons
- Email dependencie & email notification (for admin) when new feature ask is added
- Event pokemons & showing them on event post

## Known Issues

- Filtering other player wants with name and generation is not working fully. Especially when swapping generations.
- Images of Pokémons are swapped with image of Galarian Meowth when filtering wants with name.

## Designer Notes

The app features "print"-functionality to the admin. The components show database data in form, that knex understands. The basic idea behind the function is, that app can be easily moved from one server to another and database can be cleaned from non-essential information (as old feature asks and "not currently wanted" rows).

Git commit "Grand update: Road to version 1" were originally multiple smaller commits, but due an user error, updates are commited as one big blob.

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

As of .gitignore, there are folders and files not uploaded. These ignored files and folders are marked on list on *stars*, like ```*ignored_folder/-file*```.

### Backend Structure

    .
    └── back
       ├── bin
       ├── *build*                          *# Compiled files*
       ├── mw                               # Middleware files
       ├── *node_modules*
       ├── public
       │  └── stylesheets
       ├── routes                           # Api routes
       │  └── admin                         # Admin api routes
       ├── set_up                           # Folder for initial set up files
       ├── *tests*                          *# Test for each interaction with backend*
       ├── tests_public                     # Test for each interaction with backend (not including encoded token)
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
       │  └── *datafiles*                   *# Needed to upload database*
       │     └── *multiple datafiles*       *# Multiple files with predata, full listing and examples below*
       ├── *knexfile.js*                    *# File for knex-interaction*
       ├── package-lock.json
       └── package.json

### Frontend Structure

    .
    └── front
       ├── *node_modules*
       ├── public
       │  ├── css
       │  └── img
       ├── src                              # Source files
       │  ├── comp                          # Components
       │  │  ├── admin                      # Components for admin features
       │  │  │  ├── add                     # Data adding components
       │  │  │  ├── events                  # Event components
       │  │  │  ├── navbar                  # Admin Navbar addons
       │  │  │  ├── news                    # News components
       │  │  │  └── prints                  # Components for printing data from database
       │  │  │  │  ├── data                 # Pokémon data printing components
       │  │  │  │  ├── otherseeds           # Other seed data printing components
       │  │  │  │  └── wants                # Want data printing components
       │  │  │  ├── upd                     # Data updating components
       │  │  │  └── users                   # User interactions for admin
       │  │  ├── hooks                      # Hooks for data inquiry from backend
       │  │  ├── pages                      # Main pages of the app
       │  │  ├── parts                      # Partial areas of the page, e.g. Footer, Header, etc.
       │  │  └── wants                      # Pages for listing and interacting with wants
       │  ├── lib                           # For future use
       │  │  └── *rem.me*                   *# Remove me -file - just to get folder in git*
       │  └── serv                          # Axios services
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
> datafiles folder with multiple files

As with *node_modules*, ```knexfile.js``` and ```datafiles``` folder is also ignored from repository.

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

Inside of ```datafiles```, there are multiple files that are needed to migrate database to server. Examples of files and contents are listed below:
##### eventdata.js
```
module.exports = [
    { eid: 1, ename: "Test Event", etext: null, estart: null, eend: null, ewritedate: '2020-12-02T22:00:00.000Z' },
    { eid: 2, ename: "Test Event 2", etext: null, estart: null, eend: null, ewritedate: '2020-12-03T22:00:00.000Z' },
    { eid: 7, ename: "Test Event 7", etext: null, estart: null, eend: null, ewritedate: new Date() }
];
```
##### eventmonsdata.js
```
module.exports = [
    { emid: 1, eid: 1, epid: 1 }
]
```
##### featuredata.js
```
module.exports = [
    { afid: 1, afuid: 1, afdate: new Date(), aftitle: "Test Asking", afinfo: null, addedtolist: null, inprogress: null, completed: null, dnote: null, farchived: 0 }
];
```
##### newsdata.js
```
module.exports = [
    { nid: 1, nuid: 1, ndate: '2020-12-04T22:00:00.000Z', ntitle: "Test News Title", ntext: null, narchived: 0, nedited: null },
    { nid: 2, nuid: 1, ntitle: "Test News Title 2", ntext: null, ndate: new Date(), narchived: 0, nedited: null },
    { nid: 3, nuid: 1, ntitle: "Test News Title 3", ntext: null, ndate: new Date(), narchived: 1, nedited: null }
];
```
##### pokemonareandata.js
```
module.exports = [
    { aid: 1, apid: 19, paupdated: null, areanimg: 'url' }
    ];
```
##### pokemoncostumedata.js
```
module.exports = [
    { cid: 1, cpid: 25, version: 'version_name', cfirstappearance: null, pcupdated: null, costumeimg: 'costume_image_url'}
    ];
```
##### pokemonvariantdata.js
```
module.exports = [
    { vid: 1, vpid: 351, vversion: 'version_name', pvupdated: null, variantimg: 'variant_image_url'},
]
```
##### pokemonshinydata.js
```
module.exports = [
    { sid: 1, spid: 1, psupdated: null, shinyimg: 'url'},
    ];
```
##### pokemondata.js
```
module.exports = [
      { pid: 1, number:'001', name:'name', img:'url', type1: null, type2: null, rarity: null, subrarity: null, released: true, generation: 'generation_number', pupdated: null, maleimg: null, femimg: null }
    ];
```
##### userdata.js
```
module.exports = [
    { uid: 1, ucid: 1, username: 'name', password: 'hashed_pass', showname: 'Name', email: 'name@example.org' },
    ];
```
##### wantsalwaysdata.js
```
module.exports = [
    { awid: 1, awpid:'1', uid:'1', awant:'1' }
    ];
```
##### wantscostumedata.js
```
module.exports = [
    { cwid: 1, cwpid:'1', uid:'1', cwant:'1'}
    ];
```
##### wantsareandata.js
```
module.exports = [
    { arwid: 1, arwpid:'3', uid:'1', arwant:'1'}
    ];
```
##### wantsvariantdata.js
```
module.exports = [
    { vwid: 1, vwpid: '1', uid: '1', vwant: '1'},
    ]
```
##### wantsshinydata.js
```
module.exports = [
    { swid: 1, swpid: '3', uid: '1', swant: '1'},
    ]
```
##### wantsdata.js
```
module.exports = [
    { wid: 1, wpid:'1', uid:'1', want:'1' },
    ];
```
As seen, ```pokemondata.js``` and its sisterfiles (*arean*, *variant*, *etc*) need outside image urls to work.

#### Frontend
>

No other files ignored, except *node_modules*.

#### Root
>

Only ignored file is *.gitignore*, remember to create one beforing uploading own version to git.

## How to Deploy

To be added on later version.

### Set Up

### Testing Backend

### Run Locally

### Deploy Online

## Licence

React, Node, Knex and their work are used under their respective licenses.
s
Pokémon © 1995-2020 Nintendo.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br/>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.