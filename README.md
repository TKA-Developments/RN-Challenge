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
- Make sure you have installed [Node.js](https://nodejs.org/en/), [Expo](https://docs.expo.io/), and [Yarn](https://classic.yarnpkg.com/en/)(optional) 
- Run this following code in project directory
```
npm install
```
or 
```
yarn install
```
- Run expo using this code in command line to start development server
```
expo start
```
- Choose your prefereed device to run the project like
    - For web choose "Run in web browser"
    - For android you can choose android simulator or your own android by installing expo go app and then press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.
    - For iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.
- To add a task, fill in the text input below and then press enter or press the add button next to the text input. Then the filled task will appear above with a checkbox and delete button. 
- To mark that the task has been completed, check the available checkbox. 
- To delete the task, press the available delete button. 
- To filter tasks that have been completed or not, select the options in the dropdown. 
- Complete option to display completed tasks. Not complete option to display unfinished tasks. All tasks option to display all tasks
- To edit task, press the edit button to the left of the delete button. Then the task you want to edit will appear in the text input below. change the task title as you want. Then the edited task will appear, but the checkbox is still the same as before editing
