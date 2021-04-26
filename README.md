# DefAI - Definition Bot

## Name

Tuan Nguyen

## Topic

DefAI takes an english word that exists in the dictionary, and produces the definitions and attributes of all the types that word can have as well as pronunciation.<br>In addition, there will also be a place for images and emojis of demonstration, if available.

## How It Works

DefAI works as simply as other dictionary applications. Users can enter an english word and DefAI will show all the possible definitions and attributes that word can have as well as an image of the word.<br><br>
Here is how you do it:<br>
![demonstration](./defai/assets/app.gif)

## Release 1: 2021-04-26 features

- Users can now search for definitions of English words with correct meanings.
- Users can view the text as well as image.
- Users can clear the current definitions view.
- Users can interact with the search bar clear text icon.

## Known bugs

After the Release 1, there are some bugs that users need to avoid:

- Searching words with special characters somehow still triggers the Define component.
- The icons in the Header component are not yet working (to be implemented).
- Landscape view is not yet implemented.

## API

DefAI will mainly be using OwlBot Dictionary API and Unsplash Photos API.<br>

### OwlBot

OwlBot is a dictionary API that can provide definitions and attributes for plenty of English words.<br>
There are some drawbacks to the API:

- Some common English words are not available.
- Some attributes may be missing from the searching words.

Check out the [OwlBot Dictionary API](https://owlbot.info/) website for more information.<br>
The npm package version of the API: [owlbot-js](https://www.npmjs.com/package/owlbot-js)<br>
Example endpoint to fetch API: [OwlBot API Endpoint](https://owlbot.info/api/v4/dictionary/owl)

### Unsplash

Unsplash is an API service that provides a wide range of photos in many sizes and different categories.<br>

Check out the [Unsplash Developers](https://unsplash.com/documentation) website for more information.<br>
Example endpoint to fetch API: [Unsplash API Endpoint](https://api.unsplash.com/photos)

### Authorization

Since both APIs require specific OAuth tokens to fetch the necessary information, I'm using dotenv file to store the API tokens and not to push them to the repository.<br>
In order to make use of the dotenv file, I created environment variables and used a package that supports dotenv file.<br>
Information about Environment Variables in Expo: [Environment variables in Expo](https://docs.expo.io/guides/environment-variables/)<br>
Details of the package babel-plugin-inline-dotenv: [babel-plugin-inline-dotenv](https://github.com/brysgo/babel-plugin-inline-dotenv)

## Target

The application will be available to both iOS and Android.

## Language

DefAI will be developed using React Native and expo-cli.

## Google Play link

http://… (will be updated when ready)

## App Store link

http://… (will be updated when ready)
