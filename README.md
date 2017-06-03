# Plaudit! by TEAM ALL CAPS

## Description

Plaudit! is a workplace application that focuses on encouraging a supportive and uplifting work environment through positive peer feedback and recognition. Co-workers are enabled to commend one another for their hard work with company-wide visibility.

While the Plaudit! app has a bright and cheery theme by deisgn, styling can be customized based on client preference or corporate branding.

## Technologies Used

### Database Management:
* mySQL

### Deployment
* Heroku
* JawsDB MySQL

### NPM Packages:
* bcrypt
* body-parser
* connect-ensure-login
* cookie-parser
* express-session
* nodemailer
* passport
* random-string
* sequelize
* session-store

### Languages and Libraries:
* CSS
* Handlebars
* HTML
* GreenSock
* Google Fonts
* Javascript
* jQuery
* Materialize

## Getting Started and Prerequisites

Clone or download the repository to your desktop.

Users will need Google Chrome web browser for testing the application and Sublime (or another tool) for viewing/editing the code.  Users will also need to install the npm packages (provided in the package.json and listed above under "Technologies Used") via the terminal and use MySQL Workbench in order to establish a database.

## Testing

Download or clone the repository to your desktop.  Create a database in MySQL Workbench entitled "star_power."  Use said database and seed it with the seeds from the document SQL_credit or add your own seeds into SQL_credit and enter them into the MySQL database.  Add your MySQL Workbench password to the config.json.

Naviagate to the file folder that holds the Plaudit! files in the terminal.  Type "npm i --s".  Then run the server: "node server.js" 

From there, navigate to localhost:8080 in your browser to open up the landing page of the website. Create an account based on one of the established seeds and log in.  Once logged in, you will be taken to the index.handlebars page were the main activitie feed is located.  You will also see a nav bar at the top of the page which includes both a search bar in the righthand corner and a hamburger menu in the left. 

One can search for other users using the search bar.  It will take the user to that person's profile page.  The hamburger menu, once clicked, will trigger a side nav to slide out from the left side of the page.  Users can navigate to the main activity feed, their profile page, the give a badge page, or the frequently asked questions page.  Users can also log out from the side nav.

Profile pages display the profile owner's name, headshot, work role, phone number, email address, and LinkedIn profile link.  Below this is an activity feed specific to the profile owner

The Give a Badge page offers a brief form in which the user can enter the name of a recipient, select one of four colorful badges, and enter a message for their recipient.  Clicking the submit button will push the badge to the activity feed, the recipient and the user's activity feeds, and take the user to main activity feed.

The FAQ page lists commonly asked questions and their corresponding answers in a collapsible format.

The log out function in the side nav returns the user to the landing page.


## Application and Features Visual Tour

### Landing Page
![](Insert Screen Grab) 

### Main Page (Activity Feed)
![](Insert Screen Grab) 

### Profile Page (with user specific activity feed)
![](Insert Screen Grab) 

### Give a Badge Page
![](Insert Screen Grab) 

### Frequently Asked Questions Page
![](Insert Screen Grab)

### Badge Receipt Notification Email
![](http://i.imgur.com/oVxQrfE.png) 

### Forgot Password Email
![](http://i.imgur.com/cVSKVhW.png) 

## Code Walkthrough
Please refer to the repository files for coding samples; The sections are commented to indicate their functionality.

If you have any questions about how or why something works, feel free to contact a member of the [Project Team](https://github.com/SusanArend/TeamAllCaps) for details!

## Authors
* **Michelle Didier** [meeshyd](https://github.com/meeshyd)
* **Susan Heiniger** [SusanArend](https://github.com/SusanArend)
* **Adam McNerney** [NorthNern](https://github.com/NorthNern)
* **Rebecca Palmore** [rpalmore](https://github.com/rpalmore)
* **Yilin Xu** [yilinxu](https://github.com/yilinxu)

## Acknowledgments
Hat tip for help, inspiration, and patience to:

* Steven Daoud
* Nate Johnson
* Ethan Romba
* Chris Mendoza
* Liz Wylie
* Kurt Schlueter
