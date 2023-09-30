# Survey-app

This project is inspired by a YouTube video tutorial by [The codeholic](https://youtu.be/bHRe5XNP5l8). The original repository can be found [here](https://github.com/thecodeholic/laravel-react-survey).

## About

I've built upon the foundation of the original project and introduced several enhancements and new features:

### Backend (Laravel)

- Implemented Laravel Sanctum and Socialite for authentication and authorization.
- Integrated Google and GitHub OAuth2.0 for seamless third-party authentication.
- Implemented email verification using queued events sent out after user registration.
- Implemented email notification using queued events to notify survey owners of new answers to survey.
- Utilized Amazon S3 storage for efficient handling of user profile picture uploads.
- Enhanced user experience with features to edit user profiles.
- Implemented modularized entities in which i splited surveys, questions, and answers into distinct entities, each with its own API resources and routes for better organization and maintainability.
- I implemented the repository software development pattern to handle data operations for each model entity. This enhances code separation and allows for easier testing and extensibility.
- I Utilized Laravel's built-in database transactions to manage multiple database activities as a single unit. This ensures data consistency and rollback on failure.
- I developed custom exception classes to handle exceptions consistently throughout the application. This provides more informative error messages and a better user experience.
- Implemented policies for controller handlers.

### Frontend (React)

- On the frontend, I used React TypeScript along with useReducers and useContext for more organized state management.
- Replaced useState with useReducers for better state management.
- Improved user experience with skeleton loaders and lazy loading of content.
- Better error handling UI accross the application
- Enhanced the application by persisting the answer data options when a diffrent option is selected
- Implemented User profile page
- Implemented survey view alongsides their questions and answer

## Features

- Laravel Passport and Socialite integration for authentication.
- Google and GitHub OAuth2.0 for third-party login.
- Email verification using queued events for user registration.
- Amazon S3 storage for handling user profile pictures.
- Editable user profiles for customization.
- Frontend built with React TypeScript, useReducers, and useContext for state management.
- Enhanced UI/UX with skeleton loaders and lazy loading.

## Getting Started

1. Clone the repository: `git clone REPO_URL.git`
2. Install dependencies: `composer install && npm install`
3. Copy `.env.example` to `.env` and configure your environment settings.
4. Generate application key: `php artisan key:generate`
5. Migrate the database: `php artisan migrate`
6. Run the development server: `php artisan serve`
7. Move into the react folder and install dependencies: `cd react && npm install`
8. Run React app: `npm run dev`

## Contributions

Contributions and suggestions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
