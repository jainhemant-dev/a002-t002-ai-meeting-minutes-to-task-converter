# Enterprise-Grade To-Do List
<img src="./@proof_images//Q2.1 AI Meeting Minutes to Task Converter.png" />
<img src="./@proof_images//Q2.2 AI Meeting Minutes to Task Converter.png" />
## Overview
This is a modern, AI-enabled to-do list application built using the latest web technologies. The application leverages AI capabilities to enhance task management and productivity. It is designed to be user-friendly, responsive, and feature-rich.

## Features
- **AI-Powered Task Management**: Add tasks using natural language, and the AI will understand and process them.
- **Modern UI/UX**: Built with Tailwind CSS for a sleek and responsive design.
- **Real-Time Updates**: State management with Redux Toolkit ensures seamless updates.
- **Task Prioritization**: Assign priorities to tasks for better organization.
- **Editable Tasks**: Update or delete tasks as needed.
- **Loading Indicators**: Smooth user experience with custom loading spinners.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (v15.3.2)
- **Programming Language**: JavaScript (React v19.0.0)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Notifications**: [react-hot-toast](https://react-hot-toast.com/)
- **HTTP Requests**: [Axios](https://axios-http.com/)

## Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:jainhemant-dev/a002-t002-ai-meeting-minutes-to-task-converter.git
   cd a002-t001-enterprise-grade-to-do-list
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
- **Development Mode**:
  ```bash
  npm run dev
  ```
  The application will be available at `http://localhost:3000`.

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Start the Production Server**:
  ```bash
  npm start
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

## .env Sample
The application requires the following environment variables:

```properties
NEXT_PUBLIC_GEMINI_API_KEY=your-api-key-here
NEXT_PUBLIC_GEMINI_MODEL=gemini-1.5-flash
```

Replace `your-api-key-here` with your actual API key.

## Folder Structure
```
src/
  app/
    favicon.ico
    globals.css
    layout.js
    page.js
    providers.js
  components/
    TaskInput.js
    TaskItem.js
    TaskList.js
  redux/
    store.js
    tasksSlice.js
  utils/
    gemini.js
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

