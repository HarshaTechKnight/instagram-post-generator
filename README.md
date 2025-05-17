
# InstaVihangam - AI Powered Instagram Post Generator

InstaVihangam is a web application that helps users generate creative Indian names and engaging Instagram captions for their images using AI. Upload an image, and let the AI do the rest!

## Features

- **Image Upload**: Users can upload an image they want to create a post for.
- **AI-Generated Indian Name**: Generates a unique and culturally relevant Indian name based on the uploaded image.
- **AI-Generated Instagram Caption**: Creates an engaging Instagram caption using the uploaded image and the generated Indian name.
- **Copy to Clipboard**: Easily copy the generated name and caption.
- **Post Preview**: Shows a preview of how the image and text might look in an Instagram-style post.
- **Responsive Design**: Built with Tailwind CSS and ShadCN UI for a modern and responsive user interface.

## Tech Stack

- **Frontend**:
  - Next.js (v15 with App Router)
  - React (v18)
  - TypeScript
- **Styling**:
  - Tailwind CSS
  - ShadCN UI components
- **AI Integration**:
  - Genkit (Firebase Genkit)
  - Google AI (Gemini models)
- **State Management**: React Hooks (useState, useEffect)
- **Tooling**:
  - ESLint, Prettier (configured via Next.js)
  - `genkit-cli` for Genkit development

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd insta-vihangam
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root of your project (copy from `.env` if it exists, or create a new one).
    You will need to add your Google AI API key:
    ```env
    GOOGLE_API_KEY=your_google_ai_api_key_here
    ```
    You can obtain a Google AI API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

1.  **Start the Genkit development server** (for AI flow development and testing, in a separate terminal):
    ```bash
    npm run genkit:dev
    ```
    Or, to watch for changes in your Genkit flows:
    ```bash
    npm run genkit:watch
    ```

2.  **Start the Next.js development server** (in another terminal):
    ```bash
    npm run dev
    ```
    This will typically start the application on `http://localhost:9002`.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the Next.js app in development mode with Turbopack.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server and watches for file changes.
-   `npm run build`: Builds the Next.js app for production.
-   `npm run start`: Starts the Next.js production server.
-   `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.
-   `npm run typecheck`: Runs TypeScript to check for type errors.

## Project Structure

-   `src/app/`: Contains the Next.js pages and layout components (App Router).
-   `src/ai/`: Contains Genkit AI flows and configuration.
    -   `src/ai/flows/`: Specific AI generation flows (e.g., name generation, caption generation).
    -   `src/ai/genkit.ts`: Genkit initialization and configuration.
    -   `src/ai/dev.ts`: Entry point for `genkit start`.
-   `src/components/`: Shared React components.
    -   `src/components/ui/`: ShadCN UI components.
-   `src/hooks/`: Custom React hooks.
-   `src/lib/`: Utility functions.
-   `public/`: Static assets.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details (if one exists).
(You might want to add a LICENSE.md file if you intend to distribute this project).
