# Product List — Amazon-style Listing & Detail App

A simple e-commerce style app: browse products in a grid, filter/search them, and open one to see its details. Built with React, using the [DummyJSON products API](https://dummyjson.com/docs/products) as the data source.

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # start the app locally (http://localhost:5173)
npm run build     # create a production build
npm run lint      # check code style
```

## Tech Stack

| Tool | Used for |
|---|---|
| React | UI components |
| React Router | Page navigation + storing filters/search in the URL |
| Vite | Dev server & build |
| Tailwind CSS | Styling |

## What It Does

- **Browse products** — a paginated grid (8 per page) showing each product's image, title, price, and rating.
- **Search** — type in the navbar to search by product name; typing pauses briefly (debounced) before searching, so it doesn't fire on every keystroke.
- **Filter** — narrow results by category, brand, or price range. Filters combine together (e.g. category AND price range).
- **Product details** — click a product to see its full description, price, rating, brand, category, an image carousel, and reviews.
- **Everything is a link** — page, filters, and search are all stored in the URL, so hitting "Back" brings you right back to where you were, and links can be shared/bookmarked.
- **Handles the rough edges** — loading skeletons while data is fetching, a friendly message when a filter matches nothing, clear error messages if a request fails (with a retry button), and images that gracefully show a placeholder or fallback icon instead of breaking.

## Project Structure

```
src/
├── api/          # calls to the DummyJSON API
├── components/   # reusable UI pieces (cards, filters, pagination, etc.)
├── pages/        # top-level pages (listing, detail)
├── hooks/        # React state/logic shared across components
├── helpers/      # small cross-cutting utilities (HTTP requests, error messages)
└── utilities/    # plain calculation logic with no React/DOM in it (pagination math, filtering, etc.)
```

## Notes on Design Choices

- **Why filters live in the URL:** it means "Back" just works (browser history restores it for free), and a filtered view can be bookmarked or shared.
- **Why filtering happens in the browser, not the API:** DummyJSON has no single endpoint that filters by category + brand + price at once, so the app fetches the full product list once and filters it in memory — it's simpler and feels instant.
- **Why small components:** each piece (card, grid, pagination, filters, star rating) does one job, so it's easy to find and change things without touching unrelated code.

## Assumptions

- Category and brand filters are multi-select (checking more than one category/brand broadens the match within that filter).
- "Rating" shown on cards and the detail page is the product's own `rating` field from the API. The reviews section only shows if the API returns a `reviews` array.

## If I Had More Time

- Debounce the price range inputs too (currently needs an "Apply" button).
- Add unit/integration tests for filtering and the listing/detail flow.
- Add sorting (by price, by rating).
- Cancel an in-flight product-detail request if the user navigates to another product before it finishes.
