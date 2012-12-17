# Description

This is an entry for the "Show off your CSS chops!" CloudSpokes Challenge (CSC1962).
The base application got HEAVILY modified to represent the original chatter feed DOM structure for styling purposes.
My approach was to use the already done CSS files and assets from the existing chatter page (since equal visuals should have the same style definitions anyway...).

On the way i made the application more "angular" and future ready by extracting repeated "components" (starting with "chatterfeed") and packing them into directives with additional control logic. Please referr to <strong>csc1962/public/js/directives.js</strong> for details and comments on each of them.

I switched the application to nodejs with express, although it could be easily backported to ruby.

## Templates

The templates used by the directives can be found in the <strong>csc1962/public/partials/templates/chatterfeed</strong> folder.

# Installation / deployment

## Setting up project folder

Create a folder in Your workspace:
<pre>$ cd ~/workspace
~workspace$ mkdir csc1962</pre>

## Getting source

Unpack the submitted zip archive:
<pre>~workspace/csc1962$ unzip csc1962.zip</pre>
	
or alternatively get source from git:
<pre>~workspace$ git clone https://github.com/bitbay/csc1962.git</pre>

## Configuration

Running the application does not need any extra configuration. Simply install node dependencies with
<pre>~workspace/csc1962$ npm install -d</pre>

## Running the application

Simply run
<pre>~workspace/csc1962$ node app.js</pre>

Now You can navigate with a browser to <strong>http://localhost:3000/</strong>.

## Running tests

No tests are included in this entry.

# Heroku setup

## Creating application

Create a new application with the heroku command-line client (or toolchain):
<pre>$ heroku apps:create {app}</pre>

## Configure web process

Assign (at least) one web process to the application with:
<pre>$ heroku ps:scale web=1</pre>

## Deploy to heroku

Once created, push the git source to the heroku master branch:
<pre>~workspace/csc1962$ git push heroku master</pre>

If no errors, You can check the application on the web, navigating to http://{app}.herokuapps.com

# Application Internals

## Modifications done in the base application

The view partial of feed.html was completely modified to represent the structure of the chatter page on salesforce.com.
Header, left and main content.

I switched the chatterfeed.json (v23) to a new one with v24 syntax, and some more variety in content (attachments).

I commented out the "parsing" of the loaded json chatterfeed in the main controller, since to have as much as possible from the existing chatter feed functionality more data was needed (some originally stripped out feed.comments keys).

General clean-up following <a href="http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule">the boy scout rule</a>.

I deleted some not-used images.

## CSS and images

All sprites and CSS where downloaded from and property of salesforce.com, except styles.css and normalize.css
As mentioned before, the approach is based on the most seamless integration with the existing feed reader.


