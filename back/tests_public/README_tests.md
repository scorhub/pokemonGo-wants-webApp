Backend tests for Node.js
============================

> Information of the tests

# Table of Contents

- [Naming](#naming)
	- [0100 Class](#0100-class)
	- [0200 Class](#0100-class)
	- [0300 Class](#0100-class)

## Naming

The test have been named as "test-trees"; 0100 for registered-unlogged user, 0200 for logged user, 0300 for admin. Specific naming guide below:

### 0100 Class

For registered, but not logged user I'm using 01-prefix. As for this class, there is only login.

### 0200 Class

Logged in user uses 02-prefix on their class, and it is divided to few subclasses based on actions:

#### Subclass 0200

Basic funtions, as mainly GET actions; get front feed, get news, get events, get latest changes of wants, get and post features.

#### Subclass 0210

This subclass includes all actions with want lists, own and others.

#### Subclass 0220

This subclass is for interaction with own user.

### 0300 Class

Class 0300 is for admin actions, as divided below:

#### Subclass 0300

Interactions with Pokémon & want datas

#### Subclass 0310

Interactions with news, events, etc.

#### Subclass 0320

Seeds

#### Subclass 0330

Interactions with user accounts