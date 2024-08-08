## React- Quizzical web app

### Overview
This is a quiz web application. 5 random questions are fetched from opentdb site and are prepared for the quiz. 

### Tree view
Displayed using ReacTree

![Tree](https://github.com/user-attachments/assets/d4b4f190-49f6-4cdd-9b00-4f386a10267f)

### Components and its usage
- App: Maintains the quiz status. Once the quiz is started, QuizPage component is loaded.
- StartPage: Default page when the application is loaded. Once Start quiz button is clicked, signal goes to parent(App component) and QuizPage is displayed.
- QuizPage: Quiz data is loaded from the external site. Passes the quiz information as props to Quiz component. Here is where, the answers are verified and the result score is calculated and displayed once submitted.
- Quiz: The quiz information is received. First, the options of the question are shuffled. The shuffled array is passed to the parent to hold the updated options list. Once the answers are verified in the Quiz component,
- the correct option, selected option, incorrect option are displayed in green, grey, and red color respectively. If the selected option is correct/ incorrect then green/ red is displayed respectively.

## Concepts used
- Hooks: useState, useEffect.
- Props function invocation: When the option is clicked, the onclick event from the Quiz component calls the props.storeAnswerFn function defined in QuizPage component to store in the state
  of the QuizPage component, which is later used in result verification.

## Live Demo
(https://scrimba-krishna-v-react-quizzical.netlify.app/)
