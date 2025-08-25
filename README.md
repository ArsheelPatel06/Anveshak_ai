
  # Anveshak AI

  This is a code bundle for Anveshak AI. The original project is available at https://www.figma.com/design/k7GssmYPflo5e0m39NsvOi/Anveshak-AI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
 
  ## One-click deploy to GitHub Pages

  1. Push this repository to GitHub (create a new repo and push the current branch `master`).

  2. Open the repository on GitHub, go to the "Actions" tab and select "Build and deploy to GitHub Pages". Use the "Run workflow" button to trigger a one-click deploy (the workflow will build the project and publish the `build` folder to the `gh-pages` branch).

  3. After the workflow completes, enable GitHub Pages in the repository settings and set the source to the `gh-pages` branch (root). Your site will then be available at `https://<your-username>.github.io/<repo-name>/`.

  Notes:
  - The project build output is configured to `build/` via `vite.config.ts`.
  - The Vite `base` is set to a relative path so the assets work when served from GitHub Pages.

  # Anveshak_ai
