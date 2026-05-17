# AGENTS.md
Rules for AI coding agents working in the PureSound frontend codebase.

This file should stay stable over time. Prefer durable rules and decision principles over snapshots of the current folder tree or exhaustive file inventories.

## Project Rules
- Treat this project as a Next.js App Router frontend for a music streaming product.
- Use TypeScript for all new source code.
- Keep TypeScript strictness intact; do not weaken `tsconfig.json` to make code compile.
- Use the `@/` path alias for imports from `src`.
- Prefer existing project patterns over introducing new abstractions, libraries, or folder conventions.
- Keep changes scoped to the requested feature or fix.
- Do not edit unrelated files as part of opportunistic cleanup.
- Do not add new dependencies unless the task clearly requires them and existing dependencies cannot solve the problem.

## Code Placement Rules
- Put Next.js routes, layouts, route groups, and route-level files under `src/app`.
- Put reusable UI components under `src/components`.
- Put listener-facing feature UI under `src/components/Listener`.
- Put backend API wrapper functions under `src/apis`.
- Put shared Axios instances, interceptors, and HTTP client behavior under `src/libs/axios`.
- Put Redux store setup, typed Redux hooks, and Redux feature slices under `src/libs/redux`.
- Put reusable React hooks under `src/hooks`.
- Put backend-shaped request/response interfaces under `src/models`.
- Put shared constants and enums under `src/const`.
- Put validation schemas under `src/libs/validation`.
- Put i18n routing, navigation, request config, and locale messages under `src/libs/i18n`.
- Put small pure helpers under `src/utils`.
- Before creating a new folder, check whether the nearest existing module boundary already fits.
- Create a new folder only when the feature has a clear domain boundary that does not fit an existing module.

## Routing & i18n Rules
- User-facing pages should live under the locale-aware route structure.
- Preserve locale-aware navigation for user-facing routes.
- Do not hardcode user-facing text in components when it should be translated.
- Add or update locale messages when adding new visible copy.
- Keep staging-only behavior isolated from normal user-facing routes.
- Do not bypass middleware or i18n conventions unless the feature explicitly requires a separate route surface.

## API & Data Rules
- Do not call backend endpoints directly from components.
- Add or update a domain API wrapper in `src/apis` for backend calls.
- Use the appropriate shared API client instead of creating ad hoc Axios instances.
- Keep auth headers, locale headers, refresh-token behavior, stream-session behavior, and global API error notifications inside the shared client layer.
- Return typed API responses from API wrappers.
- Preserve the backend response wrapper convention with `ApiResponse<T>`.
- Use pagination wrapper types for paginated backend responses.
- Do not assume API wrappers return raw Axios responses; existing interceptors unwrap response bodies.
- Avoid introducing `any` in API request or response types. Add a model type instead.

## State Management Rules
- Use Redux for global client state such as auth, notifications, subscription, layout/sidebar state, listener settings, and player state.
- Use React Query for server/cache state.
- Do not store server response cache in Redux when React Query is a better fit.
- Do not add global Redux state for local component-only state.
- Use existing typed Redux hooks rather than importing raw store hooks in components.
- Avoid stale state reads immediately after dispatch; use returned payloads or react to updated state through effects.

## Forms & Validation Rules
- Use React Hook Form for non-trivial forms.
- Use Yup schema factories for validation when the form needs localized validation messages.
- Put validation schemas in `src/libs/validation`.
- Keep reusable regex rules in `src/const/regex.ts`.
- Do not duplicate validation logic across components.
- Keep validation messages translatable.

## UI Rules
- Use Tailwind classes and existing UI conventions before adding new styling patterns.
- Reuse shared listener components before creating new feature-specific UI primitives.
- Keep listener UI consistent with the existing music-app layout and interaction model.
- Use existing icon libraries and project icon conventions.
- Do not introduce a separate design system or unrelated CSS strategy.
- Keep browser-only components marked with `"use client"` when they use hooks, Redux, browser APIs, cookies, audio, or HLS.

## Playback Rules
- Keep audio playback centralized in the existing player control flow.
- Do not create a second audio element or independent HLS controller for normal playback.
- Use existing Redux player actions for queue, play/pause, shuffle, loop, volume, and track navigation behavior.
- Keep HLS token/session refresh behavior in the stream infrastructure.
- Do not manually mutate playback state inside UI components when a player action already exists.

## Error Handling Rules
- Prefer centralized API error handling in the shared Axios clients.
- Surface user-facing API errors through the existing notification system.
- Do not silently swallow caught errors unless the fallback behavior is explicit and intentional.
- Do not expand `console.log` usage in shared clients, hooks, or production-facing components.
- Use React Query loading/error state for request-driven UI where appropriate.

## Type Rules
- Add backend DTO-like interfaces under `src/models`.
- Keep shared generic wrappers such as `ApiResponse<T>` reusable and consistent.
- Prefer explicit request and response types over inline object shapes for API boundaries.
- Keep feature-local UI-only types near the component or hook that owns them.
- Do not loosen existing types to avoid handling a real nullable or optional case.

## Implementation Flow Rules
When adding a backend-backed feature:

1. Add or update model interfaces in `src/models`.
2. Add or update API wrapper functions in `src/apis`.
3. Add a React Query hook in `src/hooks` when the data is server state.
4. Use the hook or API wrapper from the component.
5. Add or update translations for visible text.
6. Reuse existing shared UI components where possible.

When adding a UI-only feature:

1. Place it under the nearest existing feature or shared component boundary.
2. Keep state local unless it must be shared across distant parts of the app.
3. Promote state to Redux only when it is truly global client state.
4. Add reusable hooks only when logic is shared or complex enough to justify extraction.

## Anti-Patterns To Avoid
- Direct backend calls inside React components.
- New ad hoc Axios clients.
- Duplicated auth, locale, token refresh, or stream-session logic.
- Storing server cache in Redux.
- New global state for local UI concerns.
- Untyped API wrappers.
- Expanding `any` usage instead of adding proper models.
- Hardcoded user-facing text.
- Silent `catch` blocks.
- Production-facing debug logs.
- Bypassing locale-aware routing.
- Multiple playback controllers or audio elements.
- Large unrelated refactors mixed into feature work.
- Folder creation based only on preference instead of a clear domain boundary.
