# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# 3. 🐳 Dockerizing a React App — Learning Repo

This repository documents the React + Docker demo (24:00–42:00) from a Docker fundamentals course.
The goal is to understand how React applications are containerized, why Dockerfiles are structured the way they are, and what actually happens when a container runs.

This is a learning-focused repository, not a production template.

🎯 Learning Objectives

By working through this repo, you will learn:

How Docker builds a React application

How Docker images differ from containers

Why Dockerfile instruction order matters

How ports are exposed and mapped

How React runs inside a container without local Node installed

The difference between development and production Docker setups

📦 Tech Stack

React

Node.js

Docker

Docker Desktop (for visualization)

📁 Project Structure
react-docker-demo/
├── Dockerfile
├── package.json
├── package-lock.json
├── src/
├── public/
└── README.md

🧱 Dockerfile Explained

The Dockerfile defines how Docker builds the React image.

FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

🔍 What Each Instruction Does
Instruction	Purpose
FROM node:18	Uses Node as the runtime environment
WORKDIR /app	Sets the working directory inside the container
COPY package*.json	Copies dependency metadata only
RUN npm install	Installs dependencies inside the image
COPY . .	Copies the rest of the project
EXPOSE 3000	Documents the port the app runs on
CMD	Starts the React development server

🔹 Why this order matters
Docker caches layers. Dependencies are only reinstalled if package.json changes, which speeds up rebuilds.

🏗 Build the Docker Image

To build the Docker image:

docker build -t react-docker-demo .


This command:

Reads the Dockerfile

Executes instructions top to bottom

Produces an immutable Docker image

▶️ Run the Container

To run the React app inside Docker:

docker run -p 3000:3000 react-docker-demo


-p 3000:3000 maps the container port to your local machine

The app is accessible at http://localhost:3000

🔁 Hot Reload & File Changes

When running this setup without volume mounts, file changes on the host will not automatically reflect inside the container.

This is intentional for learning:

It demonstrates container isolation

It shows why volumes are needed for live development

🧠 Key Concepts Learned

Docker images are blueprints

Containers are running instances

React does not need to be installed locally

Port mapping is required for browser access

Docker replaces environment-specific setups

Development and production containers differ

⚠️ Development vs Production Note

This repo uses:

npm start

📌 Common Commands Reference
# Build image
docker build -t react-docker-demo .

# Run container
docker run -p 3000:3000 react-docker-demo

# List images
docker images

# List running containers
docker ps

🧪 Who This Repo Is For

Developers new to Docker

Frontend engineers learning containerization

Anyone confused about how React runs inside Docker

Learners transitioning from local dev → containers

📚 Next Steps

Recommended follow-ups:

Add volume mounts for live reload

Convert to a production Dockerfile

Introduce Docker Compose

Serve build output with Nginx

Push image to Docker Hub

📎 Reference

This repository is based on the React Docker Demo (24:00–42:00) from a Docker fundamentals course by JavaScript Mastery.

# 4. 📤 Publishing a Docker Image to Docker Hub

After successfully building and running the React Docker image locally, the next step is to publish the image so others can pull and run it anywhere.

Why Publish Images?

Publishing allows:

Sharing applications without source code

Running apps without local setup

Reusing images across teams and CI/CD pipelines

🔐 Authenticate with Docker Hub
docker login


If Docker Desktop is already authenticated, this step may complete automatically.

🏷 Tag the Image

Before pushing, the image must be tagged with your Docker Hub username.

docker tag react-docker <username>/react-docker


Example:

docker tag react-docker javascriptmastery/react-docker


🔹 Important rule
Docker Hub requires images to be prefixed with your username or organization name.

⬆️ Push the Image
docker push <username>/react-docker


This uploads the image to Docker Hub, making it publicly accessible (or private, depending on settings).

Once pushed:

The image appears in Docker Desktop

It becomes visible on Docker Hub under Repositories

Anyone can run it using docker run

▶️ Running a Published Image

Anyone can now run the app without cloning the repo:

docker run -p 3000:3000 <username>/react-docker


This demonstrates one of Docker’s core strengths:
build once, run anywhere.

🧠 Key Concept: Images vs Source Code

At this point, an important mental model is reinforced:

Concept	Meaning
Source Code	Instructions to build
Docker Image	Prebuilt executable artifact
Container	Running instance of an image

Docker Hub acts like npm, but for full application environments.

🧩 Why Managing Docker Commands Becomes Painful

The session highlights a common pain point:

Multiple commands required to:

Build images

Run containers

Map ports

Configure volumes

Connect services

As applications grow, this approach becomes:

Error-prone

Hard to remember

Difficult to scale