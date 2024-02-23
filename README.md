# Grad Gains

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. [Install](https://pnpm.io/installation#using-a-standalone-script) pnpm if you haven't.

#### Installing Dependencies

Install dependencies using

```bash
pnpm i
```

#### Start NextJS Dev Server

Start NextJS development server by running

```bash
pnpm run dev
```

## Formatting Guide and Best Practices

To keep the code as consistent as possible, it's best that we all follow a similar coding style.

### Files

Use snake case for file names

#### Components

Use the `function` convention:

```tsx
export default function SomeComponent() {}
```

#### Functions

Use the `const` convention:

```tsx
const someFunction = () => {};
```

#### Route-Related Components

Create a [private folder](<https://nextjs.org/docs/getting-started/project-structure#dynamic-routes:~:text=all%20route%20segment-,Route%20Groups%20and%20Private%20Folders,-(folder)>) for all components related to a route.

For example, if there are components that are only used for the route `/signin`, store them in a folder called `_components` in `/signin/_components`
