/** @type {import('next').NextConfig} */

// ============================================================================
// GITHUB PAGES SUBPATH CONFIGURATION
// If your repo is named "my-links" (hosted at username.github.io/my-links),
// uncomment basePath and assetPrefix below and replace "/my-links" with your repo name!
// If you deploy to Vercel or a main user site (username.github.io), leave them commented out.
// ============================================================================

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoPath = '';

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  // Only apply subpath if it's NOT a main username.github.io repository
  if (!repo.endsWith('.github.io')) {
    repoPath = `/${repo}`;
  }
}

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: repoPath,
  assetPrefix: repoPath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
