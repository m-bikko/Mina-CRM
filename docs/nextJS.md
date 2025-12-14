# Next.js Framework Documentation

## Introduction

Next.js is a powerful React framework for building full-stack web applications developed by Vercel. It extends React's capabilities with features like server-side rendering (SSR), static site generation (SSG), and hybrid approaches, all optimized through Rust-based JavaScript tooling for high-performance builds. Next.js enables developers to create production-ready applications with automatic code splitting, built-in routing, API routes, and seamless integration between frontend and backend code. The framework supports both the modern App Router (introduced in Next.js 13 and continuously improved through versions 14, 15, and 16) and the traditional Pages Router, offering flexibility for different project needs. Next.js 16 brings React 19 support with new hooks like useActionState and useFormState, experimental features for enhanced authentication flows, advanced caching capabilities with the "use cache" directive, and async request APIs for better performance and security.

Next.js addresses common challenges in modern web development by providing solutions for routing, data fetching, image optimization, internationalization, and SEO out of the box. It supports React Server Components for efficient server-side rendering, Client Components for interactive UI, and Server Actions for server-side mutations without needing separate API endpoints. The framework's architecture is designed to enable optimal performance with automatic optimizations like lazy loading, prefetching, and intelligent caching strategies while maintaining developer productivity through conventions and best practices. Version 16 introduces groundbreaking features like component-level caching, post-response execution with after(), request-aware rendering with connection(), and async request APIs that enhance security by preventing accidental data leakage during prerendering.

## Core APIs and Functions

### App Router - Basic Page Structure

The App Router uses a file-system based routing where folders define routes and special files (page.tsx, layout.tsx) define UI components.

```typescript
// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Async Request APIs - cookies() and headers()

In Next.js 16, request APIs now return Promises instead of synchronous values, requiring await when accessing cookies, headers, params, and searchParams. This change improves security by preventing accidental data leakage during prerendering.

```typescript
// app/dashboard/page.tsx
import { cookies, headers } from 'next/headers';

export default async function DashboardPage() {
  // Async cookies API - requires await
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  // Async headers API - requires await
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User Agent: {userAgent}</p>
      <p>Token: {token?.value}</p>
    </div>
  );
}

// Route Handler with async request APIs
// app/api/user/route.ts
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  const headersList = await headers();
  const authorization = headersList.get('authorization');

  return NextResponse.json({
    session: session?.value,
    auth: authorization
  });
}
```

### Dynamic Routes with generateStaticParams

Create dynamic routes and pre-render pages at build time using generateStaticParams for static site generation. Note that params are now accessed asynchronously.

```typescript
// app/posts/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <article className="mb-32">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={content} />
      </article>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### "use cache" Directive and Cache Management

Next.js 16 introduces component-level caching with the "use cache" directive, cacheLife() for controlling cache behavior, and cacheTag() for selective cache invalidation. This feature requires the cacheComponents configuration option.

```typescript
// lib/cached-data.ts
"use cache";

import { cacheLife, cacheTag } from "next/cache";

// Cache with predefined profile
export async function getProductList() {
  cacheLife("hours"); // stale: 5min, revalidate: 1hr, expire: 1day
  cacheTag("products");

  const response = await fetch("https://api.example.com/products");
  return response.json();
}

// Cache with custom profile
export async function getUserProfile(userId: string) {
  cacheLife({
    stale: 300,      // 5 minutes
    revalidate: 900, // 15 minutes
    expire: 3600,    // 1 hour
  });
  cacheTag("user", `user-${userId}`);

  const response = await fetch(`https://api.example.com/users/${userId}`);
  return response.json();
}

// Cache with multiple tags
export async function getPostsWithAuthor(authorId: string) {
  cacheLife("days");
  cacheTag("posts", "authors", `author-${authorId}`);

  const response = await fetch(`https://api.example.com/posts?author=${authorId}`);
  return response.json();
}

// app/products/page.tsx
import { getProductList } from "@/lib/cached-data";
import { revalidateTag } from "next/cache";

export default async function ProductsPage() {
  const products = await getProductList();

  async function refreshProducts() {
    "use server";
    revalidateTag("products");
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <form action={refreshProducts}>
        <button type="submit">Refresh</button>
      </form>
    </div>
  );
}

// next.config.ts - Enable caching features
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    // Define custom cache profiles
    blog: {
      stale: 3600,      // 1 hour
      revalidate: 7200, // 2 hours
      expire: 86400,    // 1 day
    },
  },
};

export default nextConfig;
```

### after() API - Post-Response Execution

The after() API allows you to schedule work that runs after the response is sent to the client, perfect for logging, analytics, and cleanup tasks. This is now a stable API in Next.js 16.

```typescript
// app/actions.ts
"use server";

import { after } from "next/server";
import { cookies } from "next/headers";
import { logAnalytics, updateUserMetrics } from "@/lib/analytics";

export async function submitForm(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user-id")?.value;

  // Process form data and send response
  const result = await processFormData(formData);

  // Schedule work to run after response is sent
  after(async () => {
    // Log analytics without blocking the response
    await logAnalytics({
      event: "form_submitted",
      userId,
      formId: formData.get("form-id"),
    });

    // Update user metrics asynchronously
    await updateUserMetrics(userId);
  });

  return { success: true, data: result };
}

// Route Handler example
// app/api/checkout/route.ts
import { after } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Process payment
  const payment = await processPayment(body);

  // Schedule post-response tasks
  after(() => {
    // Send confirmation email (runs after response)
    sendConfirmationEmail(body.email, payment.id);

    // Update inventory (runs after response)
    updateInventory(body.items);

    // Track conversion (runs after response)
    trackConversion(body.userId, payment.amount);
  });

  return NextResponse.json({
    success: true,
    paymentId: payment.id
  });
}
```

### connection() API - Request-Aware Rendering

The connection() API ensures code only runs during actual requests, not during prerendering. It returns a promise that resolves immediately for requests but never resolves during prerendering, creating a "dynamic hole" in partial prerendering (PPR).

```typescript
// app/dashboard/page.tsx
import { connection } from "next/server";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  // Wait for an actual request - this won't resolve during prerendering
  await connection();

  // This code only runs for real requests, not during build
  const cookieStore = await cookies();
  const userId = cookieStore.get("user-id")?.value;

  // Fetch user-specific data safely
  const userData = await fetchUserData(userId);

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Last login: {userData.lastLogin}</p>
    </div>
  );
}

// Example with PPR - mixing static and dynamic content
// app/profile/page.tsx
import { Suspense } from "react";
import { connection } from "next/server";

export default function ProfilePage() {
  return (
    <div>
      {/* Static content - prerendered */}
      <header>
        <h1>User Profile</h1>
      </header>

      {/* Dynamic content - only rendered on request */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <DynamicProfileContent />
      </Suspense>
    </div>
  );
}

async function DynamicProfileContent() {
  // Ensure this only runs during requests
  await connection();

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const profile = await fetchProfile(session);

  return (
    <div>
      <p>Email: {profile.email}</p>
      <p>Member since: {profile.createdAt}</p>
    </div>
  );
}
```

### Internationalization with Dynamic Routes

Implement i18n by using dynamic route segments and generateStaticParams to create localized pages.

```typescript
// app/[lang]/layout.tsx
import { i18n, type Locale } from "@/i18n-config";

export const metadata = {
  title: "i18n within app router - Vercel Examples",
  description: "How to do i18n in Next.js 16 within app router",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const { children } = props;

  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
```

### API Routes - App Router Style

Create API endpoints using Route Handlers with route.ts/route.js files supporting HTTP methods.

```typescript
// app/api/set-token/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const res = NextResponse.json({ message: 'successful' });
  res.cookies.set('token', 'this is a token');
  return res;
}

// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const secret = headersList.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("posts");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

### API Routes - Pages Router Style

Traditional API routes in the pages/api directory supporting various HTTP methods.

```typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../interfaces";

const users: User[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>,
) {
  res.status(200).json(users);
}

// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../interfaces";

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case "GET":
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "PUT":
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

### Form Component with Client-Side Navigation

The Form component from next/form provides enhanced form handling with automatic client-side navigation, maintaining client state during transitions.

```typescript
// app/posts/new/page.tsx
import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorEmail = (formData.get("authorEmail") as string) || undefined;

    const postData = authorEmail
      ? {
          title,
          content,
          author: { connect: { email: authorEmail } },
        }
      : { title, content };

    await prisma.post.create({ data: postData });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <Form action={createPost}>
      <input type="text" name="title" required placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <input type="text" name="authorEmail" placeholder="Author email" />
      <button type="submit">Create Post</button>
    </Form>
  );
}
```

### Server Actions and Form Handling

Server Actions allow you to define server-side functions that can be called from Client Components, perfect for form submissions and data mutations.

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    await sql`
      INSERT INTO todos (text)
      VALUES (${data.todo})
    `;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

// app/add-form.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useActionState(createTodo, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}

// app/page.tsx
import postgres from "postgres";
import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Home() {
  let todos = await sql`SELECT * FROM todos`;

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### HTTP Access Control - forbidden() and unauthorized()

Experimental functions that allow rendering custom error pages for 403 Forbidden and 401 Unauthorized responses in Server Components, Route Handlers, and Server Actions. Requires experimental.authInterrupts flag.

```typescript
// app/dashboard/page.tsx
import { forbidden, unauthorized } from 'next/navigation';
import { verifySession } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await verifySession();

  // Throw 401 if user is not authenticated
  if (!session) {
    unauthorized();
  }

  // Throw 403 if user doesn't have required permissions
  if (!session.user.permissions.includes('admin')) {
    forbidden();
  }

  return <div>Admin Dashboard</div>;
}

// app/unauthorized.tsx
export default function UnauthorizedPage() {
  return (
    <div>
      <h1>401 - Unauthorized</h1>
      <p>Please sign in to access this resource.</p>
    </div>
  );
}

// app/forbidden.tsx
export default function ForbiddenPage() {
  return (
    <div>
      <h1>403 - Forbidden</h1>
      <p>You don't have permission to access this resource.</p>
    </div>
  );
}

// next.config.ts
const nextConfig = {
  experimental: {
    authInterrupts: true, // Required to enable forbidden() and unauthorized()
  },
};

export default nextConfig;
```

### Navigation Hooks - useRouter, usePathname, useSearchParams

Client-side navigation hooks for reading and manipulating the current URL in Client Components.

```typescript
// app/[lang]/components/locale-switcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathname(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

### Pages Router - getStaticProps and getStaticPaths

Pages Router data fetching methods for static site generation with dynamic routes.

```typescript
// pages/gsp/[slug].tsx
import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import LocaleSwitcher from "../../components/locale-switcher";

type GspPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function GspPage(props: GspPageProps) {
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;

  if (isFallback) {
    return "Loading...";
  }

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <LocaleSwitcher />

      <Link href="/gsp">To getStaticProps page</Link>
      <br />

      <Link href="/gssp">To getServerSideProps page</Link>
      <br />

      <Link href="/">To index page</Link>
      <br />
    </div>
  );
}

type Props = {
  locale?: string;
  locales?: string[];
};

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
  locales,
}) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export const getStaticPaths: GetStaticPaths = ({ locales = [] }) => {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { slug: "first" }, locale });
    paths.push({ params: { slug: "second" }, locale });
  }

  return {
    paths,
    fallback: true,
  };
};
```

### Image Optimization

Next.js Image component provides automatic image optimization with lazy loading, responsive images, and modern formats.

```typescript
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import vercel from "../public/vercel.png";

const Index = () => (
  <div>
    <h2 id="internal">Internal Image</h2>
    <p>The following is an example of a reference to an internal image from the public directory.</p>

    <Image
      alt="Vercel logo"
      src={vercel}
      width={1000}
      height={1000}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />

    <h2 id="external">External Image</h2>
    <p>External images must be configured in next.config.js using the remotePatterns property.</p>

    <Image
      alt="Next.js logo"
      src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png"
      width={1200}
      height={400}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  </div>
);

export default Index;

// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
        search: "",
      },
    ],
  },
};
```

### Middleware

Middleware runs before a request is completed, allowing you to modify the response, rewrite, redirect, or add headers.

```typescript
// middleware.js
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  regions: 'auto',
}

export async function middleware(request) {
  const url = request.nextUrl

  // Rewrite root to a different page
  if (url.pathname === '/') {
    url.pathname = '/ssg/first'
    return NextResponse.rewrite(url)
  }

  // Redirect example
  if (url.pathname === '/redirect-to-somewhere') {
    url.pathname = '/somewhere'
    return NextResponse.redirect(url, {
      headers: {
        'x-redirect-header': 'hi',
      },
    })
  }

  // Rewrite to dynamic route
  if (url.pathname === '/rewrite-to-dynamic') {
    url.pathname = '/blog/from-middleware'
    url.searchParams.set('some', 'middleware')
    return NextResponse.rewrite(url)
  }

  // Add custom headers
  return NextResponse.next({
    headers: {
      'req-url-pathname': request.nextUrl.pathname,
      'req-url-query': request.nextUrl.searchParams.get('foo'),
    },
  })
}
```

### Data Fetching with Caching

Fetch API with built-in caching options for optimized data fetching in Server Components.

```typescript
// app/cases/fetch_cached/page.tsx
export default async function Page() {
  await 1
  return (
    <>
      <p>This page renders two components each performing cached fetches.</p>
      <ComponentOne />
      <ComponentTwo />
    </>
  )
}

async function ComponentOne() {
  return <div>message 1: {await fetchRandomCached('a')}</div>
}

async function ComponentTwo() {
  return (
    <>
      <div>message 2: {await fetchRandomCached('b')}</div>
      <div>message 3: {await fetchRandomCached('c')}</div>
    </>
  )
}

const fetchRandomCached = async (entropy: string) => {
  const response = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?b=' + entropy,
    { cache: 'force-cache' }
  )
  return response.text()
}
```

### Metadata Configuration

Define page metadata for SEO using the Metadata API in App Router.

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Next.js Blog Example`,
  description: `A statically generated blog example using Next.js.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
```

### Dynamic Import and Code Splitting

Dynamically import components to optimize bundle size and loading performance.

```typescript
// app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicComponent1 = dynamic(() => import("./_components/hello1"));

const DynamicComponent2WithCustomLoading = dynamic(
  () => import("./_components/hello2"),
  { loading: () => <p>Loading caused by client page transition ...</p> },
);

const DynamicComponent3WithNoSSR = dynamic(
  () => import("./_components/hello3"),
  { loading: () => <p>Loading ...</p>, ssr: false },
);

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

export default function IndexPage() {
  const [showMore, setShowMore] = useState(false);
  const [results, setResults] = useState();

  return (
    <div>
      {/* Load immediately, but in a separate bundle */}
      <DynamicComponent1 />

      {/* Show a progress indicator while loading */}
      <DynamicComponent2WithCustomLoading />

      {/* Load only on the client side */}
      <DynamicComponent3WithNoSSR />

      {/* Load on demand */}
      {showMore && <DynamicComponent5 />}
      <button onClick={() => setShowMore(!showMore)}>Toggle Show More</button>

      {/* Load library on demand */}
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Search"
          onChange={async (e) => {
            const { value } = e.currentTarget;
            // Dynamically load fuse.js
            const Fuse = (await import("fuse.js")).default;
            const fuse = new Fuse(names);
            setResults(fuse.search(value));
          }}
        />
        <pre>Results: {JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### Next.js Configuration

Configure Next.js behavior through next.config.js including image domains, redirects, rewrites, experimental features, and Turbopack options.

```typescript
// next.config.ts - Basic configuration
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js - Advanced configuration with experimental features
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "",
      },
    ],
  },
  // Caching features (now top-level)
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 3600,      // 1 hour
      revalidate: 7200, // 2 hours
      expire: 86400,    // 1 day
    },
  },
  experimental: {
    cacheHandlers: {},
    cacheMaxMemorySize: 104857600, // 100MB

    // Authentication features
    authInterrupts: true,

    // Build and performance
    turbopackMemoryLimit: 4294967296, // 4GB
    turbopackMinify: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    turbopackSourceMaps: true,
    turbopackTreeShaking: true,

    // TypeScript features
    typedRoutes: true,
    typedEnv: true,

    // Other features
    useLightningcss: false,
    serverComponentsHmrCache: true,
  },
};

module.exports = nextConfig;
```

### Loading and Error UI

Special files for handling loading states and errors in App Router with automatic integration.

```typescript
// app/loading.tsx
import React from 'react'

export default function OuterLoading() {
  return <div id="loading">Loading...</div>
}

// app/error.tsx
'use client'
import Link from 'next/link'

export default function ErrorComponent() {
  return (
    <>
      <h1 id="error-component">Error Happened!</h1>
      <Link href="/result" id="to-result">
        To Result
      </Link>
    </>
  )
}

// app/not-found.tsx
import styles from './style.module.css'

export default function NotFound() {
  return (
    <>
      <h1 id="not-found-component" className={styles.red}>
        Not Found!
      </h1>
    </>
  )
}
```

### Link Component for Client-Side Navigation

Next.js Link component enables client-side navigation between routes with automatic prefetching.

```typescript
// pages/index.tsx
import type { User } from "../interfaces";
import useSwr from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>("/api/users", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            {user.name ?? `User ${user.id}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

### Pages Router - Custom App Component

The _app.tsx file allows you to override the default App component to control page initialization and add global layouts.

```typescript
// pages/_app.tsx
import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

## Summary

Next.js has evolved into a comprehensive framework that addresses the full spectrum of web development needs, from simple static sites to complex, data-driven applications. The framework's dual router support (App Router and Pages Router) provides flexibility for both greenfield projects and gradual migrations, while the App Router's innovative features like React Server Components, Server Actions, and streaming represent the cutting edge of React development patterns. Next.js 16 introduces transformative capabilities including async request APIs (cookies, headers, params) that enhance security by preventing accidental data leakage during prerendering, the "use cache" directive with cacheLife() and cacheTag() for fine-grained component-level caching (now configured via top-level cacheComponents and cacheLife options), and the after() API—now a stable feature—for scheduling post-response work like analytics and logging without blocking the response. The connection() API enables request-aware rendering, ensuring code only executes during actual requests rather than prerendering, which is particularly powerful when combined with Partial Prerendering (PPR) to create dynamic holes in otherwise static pages.

The framework excels at solving common web development challenges through conventions and built-in optimizations. Image optimization, automatic code splitting, intelligent prefetching, and flexible caching strategies are all handled by Next.js out of the box. Server Actions eliminate the need for separate API endpoints for many use cases, reducing boilerplate and simplifying full-stack development. The Form component enhances traditional HTML forms with client-side navigation capabilities while maintaining progressive enhancement. The Middleware system provides powerful request-time capabilities for authentication, localization, and routing logic, while the rich ecosystem of configuration options allows fine-tuning for specific deployment scenarios. With Next.js 16, the framework introduces experimental authentication helpers like forbidden() and unauthorized() for declarative access control, advanced Turbopack integration with numerous performance flags, and React 19 support with hooks like useActionState and useFormStatus for optimal form handling. The caching system has matured with "use cache" and top-level cacheComponents and cacheLife configuration options providing unprecedented control over data freshness and revalidation strategies, while the stable after() API enables zero-latency responses by deferring non-critical work until after the user receives their content. Whether building marketing sites, e-commerce platforms, dashboards, or content-heavy applications, Next.js provides the APIs and patterns to build performant, scalable applications that deliver excellent user experiences while maintaining developer productivity and code quality.
