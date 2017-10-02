# ChatApp


## Installation Steps

Install Node Version  6.9.0 or higher on your machine
Run npm install to install all node packages

## App Functionality

Parses Text Input and gives JSON representation using below logic:
Your service should parse the following data from the input:
1. mentions - A way to mention a user. Always starts with an '@' and ends when hitting a non-word character.
2. Emoticons - For this exercise, you only need to consider 'custom' emoticons which are alphanumeric strings, no longer than 15 characters, contained in parenthesis. You can assume that anything matching this format is an emoticon. (https://www.hipchat.com/emoticons)
3. Links - Any URLs contained in the message, along with the page's title. (We recommend https://cors-anywhere.herokuapp.com/ as a work-around for CORS errors)
  
The output should be a JSON object containing arrays of all matches parsed from the input string, displayed in the UI.
For example, entering the following text should result in the corresponding outputs.
Input: "@chris you around?"
Output:
{
  "mentions": [
    "chris"
  ],
  "emoticons": [],
  "links": []
}
Input: "Good morning! (megusta) (coffee)"
Output:
{
  "mentions": [],
  "emoticons": [
    "megusta",
    "coffee"
  ],
  "links": []
}
 
Input: "Olympics are starting soon; http://www.nbcolympics.com"
Output:
{
  "mentions": [],
  "emoticons": [],
  "links": [
    {
      "url": "http://www.nbcolympics.com",
      "title": "2018 PyeongChang Olympic Games"
    }
  ]
}
 
Input: "@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016"
Output:
{
  "mentions": [
    "bob",
    "john"
  ],
  "emoticons": [
    "success"
  ],
  "links": [
    {
      "url": "https://twitter.com/jdorfman/status/430511497475670016",
      "title": "Justin Dorfman on Twitter: &quot;nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq&quot;"
    }
  ]
}

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

