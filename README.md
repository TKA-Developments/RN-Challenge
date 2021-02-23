# RN-Challenge
WellMart is a team of fun, fast, and friendly builders. Everyone from interns to the CEO have some level of technical skill. Everyone is judged based on their creation and outcome. Not their background. Not their appearances.

We welcome all kinds of builders, creators, and designers. This challenge is specifically for developers. We don't care much about your resume. If you think you can build awesome products and learn fast. This challenge is for you.

This is a set of open ended challenges for you to show us your skills. Clone this repo, build an awesome app, and open a PR. The whole team will review your creation.

## Instructions
### 1. Learn
- Feel free to learn from any resources. [React Native Website](https://reactnative.dev), [YouTube](https://www.youtube.com/results?search_query=react+native+tutorial), etc. 
- We have a udemy account you can borrow (reach out to contact@wellmart.id). This one is really good. Please reach out!

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
- Notify us. Please send an email to contact@wellmart.id

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

To start the demo, type in npm start inside the RN-Challenge directory. 

Note: For best viewing experience, please use the Expo Go app to test the app (I used Expo Go and the IOS emulator for the development of this app)

1. Homescreen
- In the homepage, you will see three distinct components
- First is the search bar, where you can search by name of task, date, and categories
- Second is the categories cards where you can see the number of tasks you have per category
- Third is the list of tasks that you have today, there's also a 'View All' button which will take you to the second screen
- -----------------------------------------
2. Tasks Screen
- In the second screen, you will see a calendar strip at the top of the page which you can use to navigate between the dates
- Below that is the list of tasks that you have for that particular date
- You also have an option to show or hide the tasks you have completed by clicking on the button at the top right corner
- Note: Tasks that are overdue will be highlighted red
- -----------------------------------------
3. Adding, Editing, Deleting, and Completing Tasks Functionality
- There's a blue plus button at the bottom right corner which will pop up a modal that is used to add new tasks
- In the modal, you can specify the task name, date, and choose between the available categories,
- After you're done, you can click on "Create Task" and then the task will be created
- I also added a validation for adding task. If a user doesn't specify a task name, an alert will appear.
- To edit a task, simply click on the task name and a similar modal will pop up
- To delete a task, you can click on the blue X button on the right side of each task, and then an alert will pop up to ask users for confirmation.
- To indicate that you have completed a task, you can click on the gray circle on each task and it will turn green to indicate that you have completed that task. The text will also change to a lighter color and there will be a line striking through it.

## Demo GIF
<img src="https://j.gifs.com/JyJwm9.gif" height="500"/>

