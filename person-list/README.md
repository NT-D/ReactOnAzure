This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### How to Debug React
- If you want to debug React using Chrome and VSCode, you can install vscode extension [debugger for chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- Add the following configuration settings in the .vscode/lanuch.json file:
```
"configurations": [
        {
            "name": "Chrome",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceRoot}/src"
        }
    ]
```
- Run **`npm start`** first, then Press **F5**, then you can see debug mode has been launched with a separated Chrome window.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

In thie project, we provide 2 test scripts for differenct usage, please check below:
```
"test": "react-scripts test --coverage",
"test:all": "react-scripts test --coverage --watchAll=false",
```
**Test Script Usage:**

1. If you wanna execute testing with **run coverage report only with files changed since last commit**, use `npm test`
2. If you wanna execute testing with **run coverage report with all test files (changed or not)**, use `npm run test:all`

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Add Custom Environment Variables
### Prepare local env setting file
- Regarding to the best practices of environment variable setting of React app, please refer to here: [https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- In this project, please refer to `env.development.sample` as sample file for development environment variable setting. **When using in develoopment mode, please rename to `env.development` so we can load it properly.**
- Accrording to the explaination of above React link, we must create custom environment variables beginning with **REACT_APP_**
- Below files on the left have more priority than files on the right:<br>
`npm start: .env.development.local, .env.development, .env.local, .env`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
