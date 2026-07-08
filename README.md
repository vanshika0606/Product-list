# Product List — Amazon-style Listing & Detail App

Frontend engineer assessment submission. A product listing + detail app built on top of the [DummyJSON products API](https://dummyjson.com/docs/products).

## Tech Stack

- React (functional components + hooks)
- React Router (routing, and URL search params for filter/pagination state)
- Vite (build tooling)
- Tailwind CSS (styling)

## Setup Instructions

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint
```

## Features

- **Product Listing Page** — grid of product cards (image, title, price, rating), paginated 8 per page.
- **Filters** — category (multi-select, fetched from `/products/categories`), brand (multi-select, derived from fetched products), and min/max price range. Filters combine with AND logic and changing any filter resets pagination to page 1.
- **Product Detail Page** — image, title, price, rating, description, brand, category, and reviews (when returned by the API). Reached via `/product/:id`.
- **Back navigation** — the Back button uses browser history (`navigate(-1)`), and all listing state (page, category, brand, price range) lives in the URL's query string, so returning to the listing restores exactly what was selected before.
- **Loading & error states** — shown while fetching, with a retry action on failure.

## Assumptions

- The DummyJSON API doesn't expose a single endpoint that filters by category, brand, and price range simultaneously, so all products are fetched once (`/products?limit=0`) and filtering/pagination happens client-side. The category list itself is still fetched dynamically from `/products/categories` per the spec.
- Category and brand filters are treated as multi-select checkboxes (a product matches if its category/brand is in the selected set).
- "Rating" on the card and detail page is the product's own `rating` field from the API; the reviews section on the detail page uses the `reviews` array when present.

## Architectural Decisions

- **Filter/pagination state in the URL** (`useSearchParams`) rather than component state — this gets "preserve filters on back navigation" for free via normal browser history, and makes the listing state shareable/bookmarkable.
- **Client-side filtering over multiple API calls** — combining category + brand + price via repeated API requests would mean juggling partial result sets from different endpoints; filtering one fetched list in memory is simpler and keeps the UI response instant.
- **Small, single-purpose components** (`ProductCard`, `ProductGrid`, `Pagination`, `FilterSidebar`, `StarRating`, `Loader`, `ErrorMessage`) rather than one large page component, so each concern (rendering, filtering, pagination) is easy to reason about independently.

## Improvements Given More Time

- Debounced price range inputs instead of a manual "Apply" button.
- Wire the navbar search bar to filter by product title.
- Skeleton loaders for the product grid instead of a single spinner.
- Unit tests for the filtering logic and integration tests for the listing/detail flow.
- Sorting (price, rating) alongside the existing filters.
