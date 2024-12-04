# News Aggregator Task

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)

---

## Overview
This is a **News Aggregator Application** built with **React.js**, designed to provide users with an engaging platform for browsing and filtering news from multiple sources. The application supports customization, allowing users to tailor their news feed based on preferences.

---

## Features
### General
- **Responsive Design**: Mobile-first UI.
- **Dynamic Loading**: Fetch and display news incrementally.

### Pages
1. **Header**:
   - Search with a modal-based result viewer and date filters (7/15/30 days).
   - Filter by news sources and countries.

2. **Home Page**:
   - Displays top stories, global developments, and political news.
   - "Load More" functionality for additional articles.

3. **Preference Page**:
   - Customizable preferences for categories, countries, and sources.
   - Displays personalized results in three columns.

4. **Category Page**:
   - Tabbed interface to filter news by category.

---

## Installation
### Prerequisites
- **Docker**: Ensure Docker is installed.
- **API Keys**: Obtain API keys for:
  - [NewsAPI](https://newsapi.org)
  - [New York Times](https://developer.nytimes.com/apis)
  - [The Guardian](https://open-platform.theguardian.com)

### Steps
1. **Pull the Docker Image**:
   ```bash
   docker pull chethanspoojary/news-aggregator-task:1.1
   ```
2. **Run the Docker Container:**
   ```bash
    docker run -d \
    -e VITE_API_KEY=<add-api-key> \
    -e VITE_NYT_API_KEY=<add-api-key> \
    -e VITE_GUARDIAN_API_KEY=<add-api-key> \
    -p 5173:5173 chethanspoojary/news-aggregator-task:latest
    ```
3. Access the Application: Open a browser and navigate to http://localhost:5173.

###
---

## Usage
1. **Search News:**:
   - Enter a keyword in the search bar.
   - View results in a modal with date filtering options.

2. **Filter News:**:
   - Filter sources by country using the "Filter by Source" button.

3. **Set Preferences:**:
   - Choose preferred categories, countries, and sources on the Preferences Page.

4. **Explore Categories:**:
   - Navigate to the Category Page to browse news by topic.

## API Integration
The application integrates with the following APIs:

1. **NewsAPI**: Fetch general news articles.
2. **New York Times**: Retrieve in-depth articles and analysis.
3. **The Guardian**: Access articles from The Guardian.