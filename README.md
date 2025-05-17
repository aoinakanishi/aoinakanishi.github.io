# Aoi Nakanishi Portfolio

This repository contains the source code for **Aoi Nakanishi's** personal portfolio website. The site is built with standard HTML, CSS and JavaScript and is automatically deployed using **GitHub Pages**.

## Purpose

The main goal of this project is to showcase projects and provide a simple online profile. It demonstrates a parallax scrolling effect and animated sections using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Repository structure

- `index.html` – main HTML page containing portfolio sections.
- `style.css` – styling for the parallax sections and overall layout.
- `script.js` – JavaScript to reveal each section as it enters the viewport.
- `.github/workflows/gh-pages.yml` – GitHub Actions workflow that publishes the site to GitHub Pages whenever changes are pushed to the `main` branch.
- `CNAME` – defines the custom domain used for the site (`aoinakanishi.com`).

## Deployment

The workflow in `.github/workflows/gh-pages.yml` checks out the repository, configures GitHub Pages and uploads the content in this directory. Whenever changes are pushed to the `main` branch or the workflow is manually triggered, a new deployment is made to the GitHub Pages environment.

You can view the deployed site at <https://aoinakanishi.com> once the GitHub Pages deployment is complete.

