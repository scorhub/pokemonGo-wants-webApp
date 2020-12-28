Initial set up for backend
============================

> Guide to set up initial admin account.

# Table of Contents

- [Information](#information)
	- [Set up .env](#set-up-.env)
	- [Open route](#open-route)
	- [Activate file](#activate-file)
	- [Create admin](#create-admin)
	- [Copy data to seed](#copy-data-to-seed)
	- [Close up](#close-up)

## Information

The app uses hashed passwords and allows only admin to register new users, so you need to set up initial admin account and fill the information to seed file before taking the app in use. Instructions to this are provided below.

Before taking these steps, you need to set up database and have database & backend running, as provided on master readme (*root-level readme*).

### Set up .env

First, set up .env as provided in master readme.

### Open route

Second, open router and route from ```app.js``` (root of the back folder) by removing comment-marks

### Activate file

Third you need to "activate" code inside the ```setup_register.js``` by removing comments.

### Create admin

Fourth, *Send Request* for userclass creation from ````0000_post_initial.http```, then fill *Register admin* with corresponding credentials and send it too.

### Copy data to seed

Fifth, copy created data from database to ```database\seeds\datafiles\userdata.js```.

### Close up

Finally, comment router and route hidden from ```app.js``` and code from ```setup_register.js```.