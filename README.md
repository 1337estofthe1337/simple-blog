# Simple Blog

Welcome to Simple Blog, a lightweight blogging platform where users can easily create, edit, and manage their articles.

## Project Overview

Simple Blog aims to provide users with a straightforward platform to share their thoughts and stories. The main features include:

1. **Article Creation**: Users can input a title and text for their articles.
2. **Article Management**: Users can view their previous articles, edit them, or delete them as needed.

## User Interaction

Users will interact with the application through the following client-side elements:

- **Article Form**: Allows users to input the title and text for their articles.
- **Article List**: Displays a list of the user's previous articles.
- **Buttons**: Below the form, buttons enable users to read, edit, or delete their previous articles.

## React Components

The application is built using React, with the following component structure:

1. **App Component (Parent)**: Top-level component managing application state and rendering child components.
2. **Article Component (Child)**: Represents an individual article, allowing users to view, edit, or delete it.
3. **ArticleForm Component (Child)**: Captures user input for article title and text.
4. **ArticleList Component (Child)**: Displays a list of articles created by the user.

Data will be passed between parent and child components to manage state and update the UI accordingly.

## External APIs

No external APIs are used in this project.

## Express Server Routes

The Express server will handle the following routes:

- `POST /articles`: Create a new article.
- `GET /articles`: Retrieve all articles for a user.
- `PUT /articles/:id`: Update an existing article.
- `DELETE /articles/:id`: Delete a specific article.

## Database Schema

The database will consist of the following tables and columns:

### User Table

- `id`: Unique identifier for each user.
- `username`: Username chosen by the user.
- `blogname`: Name of the user's blog.

### Articles Table

- `id`: Unique identifier for each article.
- `userID`: Foreign key referencing the user who created the article.
- `title`: Title of the article.
- `content`: Text content of the article.
- `publish_date`: Date when the article was published.
- `edit_date`: Date when the article was last edited.
