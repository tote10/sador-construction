# AppContext Documentation

`lib/state/AppContext.tsx` is the central client-side state container for the site. It exposes the content and actions that power the public pages, the admin dashboard, and the login gate.

## Purpose

This provider is responsible for:

- Storing all editable site content in one place.
- Seeding the app with realistic default construction data.
- Persisting edits in `localStorage` so content survives refreshes.
- Providing a shared API through the `useApp()` hook.
- Managing the simple frontend-only login state used by admin views.

The file is marked as a client component because it uses React state and browser storage.

## Data Models

The context defines the core domain objects used across the site.

### `Project`

Represents a portfolio item shown on the projects pages.

Important fields:

- `id`: Unique identifier.
- `title`: Project name.
- `category`: One of `Building`, `Road`, `Infrastructure`, or `Other`.
- `description`: Public-facing summary.
- `location`: Project location.
- `year`: Completion or active year.
- `duration`: Delivery duration string.
- `status`: `Completed` or `Ongoing`.
- `images`: Gallery image URLs.
- `beforeImage` / `afterImage`: Optional comparison images.
- `clientName`: Optional client label.
- `featured`: Flag used to highlight projects.

### `Service`

Represents a service card shown on the services pages.

Important fields:

- `id`: Unique identifier.
- `title`: Service name.
- `description`: Short marketing description.
- `iconName`: Icon identifier used by the UI.
- `details`: Supporting bullet points.

### `Testimonial`

Represents a client quote displayed on the site.

Important fields:

- `id`: Unique identifier.
- `clientName`: Person giving the quote.
- `companyName`: Organization name.
- `quote`: Testimonial text.
- `rating`: Numeric rating, typically 1 to 5.

### `ContactSubmission`

Represents a message sent through the contact form.

Important fields:

- `id`: Unique identifier.
- `name`, `email`, `phone`, `projectType`: User-provided contact details.
- `message`: The inquiry text.
- `submittedAt`: Timestamp string.
- `status`: `read` or `unread`.

### `HomepageContent`

Controls the editable hero and stats section on the homepage.

Fields:

- `heroTitle`
- `heroSubtitle`
- `yearsOfExperience`
- `projectsDone`
- `happyClients`
- `activeStaff`

### `SEOSettings`

Controls the page metadata used by the public pages.

Fields:

- `title`
- `description`
- `keywords`

## Context Shape

`AppContextType` combines all state slices and actions into one interface.

It exposes:

- Read-only state arrays and objects for projects, services, testimonials, submissions, homepage content, and SEO settings.
- `isLoggedIn` for the admin gate.
- CRUD actions for projects, services, testimonials, and submissions.
- Update actions for homepage content and SEO settings.
- `login()` and `logout()`.

This makes the provider the single source of truth for the app.

## Default Seed Data

The file includes hard-coded seed content:

- `defaultProjects`
- `defaultServices`
- `defaultTestimonials`
- `defaultHomepageContent`
- `defaultSEOSettings`

These values are used on first load when no saved `localStorage` data exists.

The default submissions array also starts with one example inquiry so the admin dashboard has content to display immediately.

## Initialization Flow

On mount, the provider reads all state from `localStorage` inside a `useEffect` block.

### Storage keys

- `sador_projects`
- `sador_services`
- `sador_testimonials`
- `sador_submissions`
- `sador_homepage`
- `sador_seo`
- `sador_isLoggedIn`

### How loading works

1. A small helper called `getStored()` reads a key from `localStorage`.
2. If the item exists, it is parsed with `JSON.parse()`.
3. If the item is missing or invalid, the default seed value is used.
4. State is populated from storage.
5. `loaded` is set to `true` so persistence effects can begin writing back to storage.

The `loaded` guard prevents the save effects from immediately overwriting defaults before hydration completes.

## Persistence Strategy

Each state slice has its own `useEffect` that writes to `localStorage` when the value changes.

This means updates are persisted automatically after any action mutates state.

### Why this is useful

- Refreshing the browser keeps edits intact.
- Admin users can make content changes without a backend.
- The implementation is simple and easy to replace later.

### Important limitation

This is browser-only persistence. It is not shared between devices, and it is cleared if the browser storage is reset.

## Authentication Behavior

The login state is intentionally lightweight and frontend-only.

### `login(password)`

- Accepts `admin123` or `password`.
- Sets `isLoggedIn` to `true` on success.
- Returns `true` or `false` to let the caller react immediately.

### `logout()`

- Sets `isLoggedIn` to `false`.

### Security note

This is not real authentication. It is a UI-level gate meant for demo or prototype behavior. Production authentication should move to a server-backed system.

## CRUD Actions

The provider exposes a consistent set of mutation functions for each main content type.

### Projects

- `addProject(project)` inserts a new project at the top of the list.
- `updateProject(id, project)` merges partial updates into the matching project.
- `deleteProject(id)` removes the project.

### Services

- `addService(service)` appends a new service.
- `updateService(id, service)` merges partial updates.
- `deleteService(id)` removes the service.

### Testimonials

- `addTestimonial(testimonial)` appends a new testimonial.
- `updateTestimonial(id, testimonial)` merges partial updates.
- `deleteTestimonial(id)` removes the testimonial.

### Contact submissions

- `submitContact(submission)` creates a new submission with generated `id`, current timestamp, and `unread` status.
- `deleteSubmission(id)` removes a message.
- `markSubmissionRead(id)` flips the matching submission to `read`.

### Homepage content

- `updateHomepageContent(content)` merges partial homepage edits.

### SEO settings

- `updateSEOSettings(seo)` merges partial SEO edits.

## ID Generation

New records use a timestamp-based identifier:

- `proj-${Date.now()}`
- `serv-${Date.now()}`
- `test-${Date.now()}`
- `sub-${Date.now()}`

This is fine for local prototyping, but a production backend should generate stable IDs.

## How Components Use It

Components call `useApp()` to read the shared state and actions.

Example usage:

```tsx
import { useApp } from '@/lib/state/AppContext';

export function ExamplePanel() {
  const { projects, addProject } = useApp();

  return (
    <div>
      <p>Total projects: {projects.length}</p>
      <button
        onClick={() =>
          addProject({
            title: 'New Project',
            category: 'Building',
            description: 'Example project description',
            location: 'Addis Ababa, Ethiopia',
            year: '2026',
            duration: '12 Months',
            status: 'Ongoing',
            images: [],
            featured: false
          })
        }
      >
        Add project
      </button>
    </div>
  );
}
```

If `useApp()` is called outside `AppProvider`, it throws an error so the integration problem is easy to catch.

## Where It Is Wired In

`AppProvider` is mounted at the app root in `app/layout.tsx`, which makes the state available across the entire route tree.

That is why the public pages, navbar, footer, and dashboard can all read from the same shared state without prop drilling.

## Current Architecture Notes

- The provider is a good fit for the current prototype stage.
- The entire state is centralized, which keeps the app simple.
- The implementation is easy to replace later with API calls or a database layer.
- The dashboard note already hints at swapping the functions in this file for Supabase or another backend later.

## Practical Takeaway

This file is both the content store and the action layer for the application. If a page needs editable business content, it should usually read from `useApp()` rather than duplicating its own local state.