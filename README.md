# Rule Engine with AST Frontend

Built with React Router and Axios for handling API requests.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd app
```

2. Install dependencies
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions
├── hooks/           # Custom hooks
├── assets/          # Static assets
├── styles/          # Global styles
└── App.js           # Root component
```

## Tech Stack

- [React](https://reactjs.org/) - Frontend library
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - HTTP client
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities

## Development Setup

1. Create a `.env` file in the root directory that is inside app:
```env
REACT_APP_API_URL=your_api_url_here
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. The `build` folder is ready to be deployed.
   - You can serve it with a static server:
     ```bash
     npm install -g serve
     serve -s build
     ```


