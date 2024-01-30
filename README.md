# Simple Blog

Welcome to Simple Blog, a lightweight blogging platform where users can easily create, edit, and manage their articles.

## Project Overview

Simple Blog aims to provide users with a straightforward platform to share their thoughts and stories. The main features include:

1. **Article Creation**: Users can input a title and text for their articles.
2. **Article Management**: Users can view their previous articles, edit them, or delete them as needed.

## User Interaction

Users will interact with the application through the following client-side elements:

- **Article Form**: Allows users to input their username and blogname upon account creation. Also allows users to input a title and text for their articles.
- **Article List**: Displays a list of the user's previous articles.
- **Buttons**: Users can read, edit, or delete their previous articles, as well as login or logout of the app.

## React Components

The application is built using React with Vite and has the following component structure:

1. **App Component (Parent)**: Top-level component managing application state and rendering child components.
2. **Login Component (Child)**: Displays a login screen to login or create an account.
3. **CreateLogin Component (Child)**: Captures a users input for a username and blogname.
4. **Homepage Component (Child)**: Displays their blogname and a list of articles created by the user.
5. **CreateArticle Component (Child)**: Captures user input for article title and text.
6. **EditArticle Component (Child)**: Captures user input for changing a previous article written by the user.
* 7. **ReadArticle Component (Child)**: Displays a user selected article.

* Note: ReactMarkdown was used to display the articles in markdown format. If the user writes their article body in markdown format, the ReadArticle should display the text in accordingly.

## External APIs

No external APIs are used in this project.

## Express Server Routes

The Express server will handle the following routes:

- `GET /`: User login.
- `GET /:username/articles`: User's blog (user's homepage). Also displays all articles written by them.
- `GET /:username/:article`: User-selected article.
- `POST /`: Creates a user
- `POST /:username`: Create an article to publish.
- `PUT /:username/:article`: Edit an article.
- `DELETE /:username/:article`: Delete an article.

## Database Schema

The database will consist of the following tables and columns:

### User Table

- `user_id`: Unique identifier for each user.
- `username`: Username chosen by the user.
- `blogname`: Name of the user's blog.

### Articles Table

- `article_id`: Unique identifier for each article.
- `user_id`: Foreign key referencing the user who created the article.
- `title`: Title of the article.
- `content`: Text content of the article.
- `publish_date`: Date when the article was published.
- `edit_date`: Date when the article was last edited.
