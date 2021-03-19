# RN-Challenge
WellMart is a team of fun, fast, and friendly builders. Everyone from interns to the CEO have some level of technical skill. Everyone is judged based on their creation and outcome. Not their background. Not their appearances.

We welcome all kinds of builders, creators, and designers. This challenge is specifically for developers. We don't care much about your resume. If you think you can build awesome products and learn fast. This challenge is for you.

This is a set of open ended challenges for you to show us your skills. Clone this repo, build an awesome app, and open a PR. The whole team will review your creation.

## Instructions
### 1. Learn
- Feel free to learn from any resources. [React Native Website](https://reactnative.dev), [YouTube](https://www.youtube.com/results?search_query=react+native+tutorial), etc. 
- We have a udemy account you can borrow (reach out to team@wellmart.id). This one is really good. Please reach out!

### 2. Build
- You have 1 week to complete the challenge. We can see the commits timeline
- Implementation (code) and design (UI/UX) will be evaluated

### 3. Show
- Impress us with your skills
- Go beyond the requirements
- Beat the competition
- Join us
- Win

### Submissions
- Setup your dev environment by following this ([React Native Getting started Guide](https://reactnative.dev/docs/getting-started))
- Clone the challenge repository
- Create a dedicated branch
- Write your code
- Commit your changes
- Fork the challenge repository
- Issue a Pull Request
- Notify us. Please send an email to team@wellmart.id

### Suggestions
- Make it easy for us to try your app. Add instructions on how to run your demo. There's a section below you can fill in
- Don't be afraid if you're still a newbie. We will judge what you built adjusted with your experience. If you're just starting out, but can learn fast. We want you :)
- Make something fun. We love to party too! :D
- You can use Expo or Vanilla React Native. Our codebase is Vanilla (Ejected from Expo) though. Here's to learn more about [Expo workflows](https://docs.expo.io/introduction/managed-vs-bare/)
- Get used to coding in TypeScript
- Be prepared to explain your decisions and your thought process in the next interview. We're curious about how you think! :)

## Challenge
Joko is a very responsible and organized person. He writes down all his to-do items in a day. And clears all the things he needs to do before the day ends

Create a React Native app where Joko can keep track of the things he need to do in his day

## Requirements
Your app should be able to complete these tasks:
- Add a new to-do item
- Mark a to-do item as done
- Delete a to-do item
- Edit a to-do item
- Display all to-dos in a list or a grid
- Filter between completed and incomplete items

### Bonus:
- Enable search for the to-do items
- Include animations
- Persist data using Contexts and/or Async Storage
- Call some public API (image, video, weather, clocks, up to you)
- Save data to a backend server (like firebase)
- Do some kind of sharing
- Somehow make this boring app fun! show some crazy pokemon animation or something :P

## How to run the demo
### Prerequisites
1. `Node.js` and `npm` installed on your device. I used npm instead of yarn, so all the commands I put here will be using npm.
2. An android phone with Expo App installed or an IOS phone with the built-in QR code scanner of the Camera App.

### Running the app
1. Make sure you have the prequisites!
2. Install Expo CLI with the following command:
```
npm install -g expo-cli
```
3. Install all of the dependencies with the following command:
```
npm install
```
4. Run the app with the following command:
```
npm run start
```
 
5. If ran successfully, your browser will open a site that has info about the running application.You will see a QR Code in that site. Scan it with your Expo App for Android phone or QR code scanner of Camera App for IOS phone.  
Alternatives:
* You can run the app on a simulator in your virtual device. To run the app on the IOS Simulator or an Android Virtual Device, you can find the documentation [here](https://docs.expo.io/workflow/expo-cli/). I used the app on my android phone because it's more laptop-friendly :D
* You can run the app in web browser, but what comes out will not be as good if you open it from a real phone or a simulator from my experience.
6. Enjoy the app!

### About the app
1. To-dos will be grouped and showed into 4 types, which is `overdue`, `today`, `tomorrow`, and `upcoming` based on the date of the to-do.
2. Each to-dos will be categorized into 4 categories, which is `Academic`, `Intern`, `Organization`, and `Fun` each with their own colors. This categories are my own preferences. For future upgrades, the user can be allowed to add and edit the category's name and color.
3. To-dos can be filtered using the search bar and/or filtered by their status and/or category.
4. Short press will toggle the to-do's status, and long press will open the to-do's detail screen to edit/delete the to-do.
5. Please keep in mind that the todos that will be displayed from the database will be my todos :D For future upgrades, a login and register method can be implemented! If the todos is empty when you open it, you can add your own!

## Author
Ananda Yulizar Muhammad [@anandayulizar](http://github.com/anandayulizar)