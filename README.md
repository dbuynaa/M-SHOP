# Shopcart E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, Sanity CMS, local payment gateway integration, and Clerk authentication.

## Tech Stack

- **Framework**: Next.js 15.2.1 with App Router
- **CMS**: Sanity.io
- **Authentication**: Clerk
- **Payments**: Local payment gateway (ready for integration)
- **Styling**: Tailwind CSS 4, Shadcn UI, Radix UI
- **State Management**: Zustand
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn/bun
- Accounts and API keys for:
  - [Sanity.io](https://www.sanity.io/)
  - Local payment gateway provider
  - [Clerk](https://clerk.com/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shopcartyt
```

### 2. Install Dependencies

```bash
pnpm install
```

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-20
SANITY_API_TOKEN=your_sanity_api_token

# Payment Gateway Configuration
# Add your local payment gateway credentials here
# Example:
# PAYMENT_GATEWAY_API_KEY=your_payment_gateway_api_key
# PAYMENT_GATEWAY_SECRET=your_payment_gateway_secret
# PAYMENT_GATEWAY_WEBHOOK_SECRET=your_webhook_secret

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Base URL (for redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### Getting Your API Keys

**Sanity.io:**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project or select an existing one
3. Go to API settings
4. Copy your `Project ID` and `Dataset` name
5. Create an API token with read/write permissions

**Payment Gateway:**

The project is set up with placeholder functions for payment gateway integration. To integrate your local payment gateway:

1. Update `actions/createCheckoutSession.ts` with your payment gateway's API
2. Update `app/(client)/api/webhook/route.ts` to handle your gateway's webhook events
3. Add your payment gateway credentials to `.env.local`
4. Update the order schema in `sanity/schemaTypes/orderType.ts` if needed

See the TODO comments in the code files for implementation guidance.

**Clerk:**

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application or select an existing one
3. Go to API Keys
4. Copy your `Publishable key` and `Secret key`

### 4. Sanity Setup and Configuration

#### Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Sign up or log in to your Sanity account
3. Click **Create project**
4. Enter a project name (e.g., "Shopcart E-commerce")
5. Choose an organization or create a new one
6. Select a dataset name (default is `production`)
7. Click **Create project**

#### Step 2: Get Your Sanity Credentials

1. In your Sanity project dashboard, go to **API** settings
2. Copy your **Project ID** (you'll need this for `NEXT_PUBLIC_SANITY_PROJECT_ID`)
3. Note your **Dataset** name (usually `production`)

#### Step 3: Create an API Token

1. In your Sanity project, go to **API** > **Tokens**
2. Click **Add API token**
3. Name it (e.g., "Shopcart Token")
4. Select **Editor** role (or **Administrator** for full access)
5. Click **Save**
6. **Copy the token immediately** - you won't be able to see it again (this is your `SANITY_API_TOKEN`)

#### Step 4: Configure Environment Variables

Add your Sanity credentials to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-20
SANITY_API_TOKEN=your_api_token_here
```

#### Step 5: Access Sanity Studio

1. Ensure your environment variables are set correctly
2. Run the development server: `pnpm dev`
3. Navigate to `http://localhost:3000/studio`
4. You should see the Sanity Studio interface

### 5. Adding Content to Sanity

Once Sanity Studio is accessible, you can start adding content. The project includes the following content types:

#### Content Types Available:

1. **Products** - Main product catalog
2. **Categories** - Product categories
3. **Brands** - Product brands
4. **Blog Posts** - Blog articles
5. **Blog Categories** - Blog categories
6. **Authors** - Blog authors
7. **Orders** - Customer orders (created automatically)

#### Adding Your First Product:

1. In Sanity Studio (`http://localhost:3000/studio`), click **Products** in the sidebar
2. Click **Create new** or the **+** button
3. Fill in the required fields:
   - **Product Name** - e.g., "Wireless Headphones"
   - **Slug** - Auto-generated from name (or customize)
   - **Price** - e.g., 99.99
   - **Discount** - e.g., 0 (or discount amount)
   - **Stock** - e.g., 50
   - **Product Images** - Upload product images
   - **Description** - Product description
4. Optional fields:
   - **Categories** - Link to existing categories
   - **Brand** - Link to existing brand
   - **Product Status** - New, Hot, or Sale
   - **Product Type** - Gadget, Appliances, etc.
   - **Featured Product** - Toggle to feature on homepage
5. Click **Publish** to save

#### Adding Categories:

1. Click **Category** in the sidebar
2. Click **Create new**
3. Fill in:
   - **Title** - e.g., "Electronics"
   - **Slug** - Auto-generated
   - **Description** - Category description
   - **Category Image** - Upload image
   - **Featured** - Toggle if featured category
4. Click **Publish**

#### Adding Brands:

1. Click **Brand** in the sidebar
2. Click **Create new**
3. Fill in:
   - **Name** - Brand name
   - **Slug** - Auto-generated
   - **Logo** - Upload brand logo
   - **Description** - Brand description
4. Click **Publish**

#### Adding Blog Posts:

1. Click **Blog** in the sidebar
2. Click **Create new**
3. Fill in:
   - **Title** - Blog post title
   - **Slug** - Auto-generated
   - **Author** - Link to author
   - **Category** - Link to blog category
   - **Published At** - Publication date
   - **Main Image** - Featured image
   - **Body** - Blog content (rich text editor)
4. Click **Publish**

### 6. Best Practices for Content Management

- **Images**: Use high-quality images. Sanity automatically optimizes them
- **Slugs**: Keep slugs short and descriptive. They're used in URLs
- **Stock Management**: Update stock levels when products are sold (handled automatically via webhooks)
- **Featured Content**: Use the "Featured" toggle to highlight important products/categories
- **Categories**: Organize products into logical categories for better navigation
- **Brands**: Create brands before adding products that reference them

### 5. Generate Sanity Types (Recommended)

After setting up your Sanity project, generate TypeScript types from your schema:

```bash
pnpm typegen
```

This will update `sanity.types.ts` with the latest schema types, providing better TypeScript support and autocomplete.

**Note**: Run this command whenever you modify your Sanity schema types.

### 6. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 7. Sanity Studio Features

Sanity Studio provides several useful features:

- **Real-time Collaboration**: Multiple users can edit content simultaneously
- **Image Optimization**: Images are automatically optimized and served via CDN
- **Version History**: Track changes and revert if needed
- **Draft Mode**: Save drafts before publishing
- **Search**: Quickly find content using the search bar
- **Filters**: Filter content by various criteria
- **Bulk Actions**: Select multiple items for bulk operations

### 8. Content Workflow Tips

1. **Start with Categories and Brands**: Create these first before adding products
2. **Use Consistent Naming**: Keep product names, slugs, and descriptions consistent
3. **Upload High-Quality Images**: Use images with good resolution (recommended: 1200x1200px minimum)
4. **Set Stock Levels**: Always set initial stock when creating products
5. **Use Featured Toggle**: Mark important products/categories as featured for homepage display
6. **Test URLs**: After publishing, check that product/category URLs work correctly

### 9. Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
shopcartyt/
├── app/                    # Next.js App Router pages
│   ├── (client)/          # Client-facing routes
│   ├── studio/            # Sanity Studio
│   └── api/               # API routes
├── components/            # React components
├── sanity/               # Sanity configuration
│   ├── schemaTypes/      # Content schemas
│   ├── queries/          # GROQ queries
│   └── lib/              # Sanity utilities
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── store.ts              # Zustand store
└── actions/              # Server actions
```

## Key Features

- 🛍️ Product catalog with categories and brands
- 🛒 Shopping cart functionality
- 💳 Payment gateway integration (ready for local gateway)
- 👤 User authentication with Clerk
- 📦 Order management
- ❤️ Wishlist functionality
- 📝 Blog system
- 🎨 Modern, responsive UI

## Development Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typegen` - Generate Sanity TypeScript types

## Troubleshooting

### Common Issues

1. **Environment variables not found**

   - Ensure `.env.local` exists in the root directory
   - Restart the development server after adding environment variables

2. **Sanity connection errors**

   - Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` match your Sanity project
   - Check that your Sanity API token has the correct permissions (Editor or Administrator)
   - Ensure the dataset name matches exactly (case-sensitive)
   - Try regenerating your API token if issues persist
   - Check browser console for specific error messages

3. **Sanity Studio not loading**

   - Verify all environment variables are set in `.env.local`
   - Restart the development server after adding/changing environment variables
   - Clear browser cache and try again
   - Check that you're accessing `http://localhost:3000/studio` (not `/studio/`)

4. **Content not appearing on the website**

   - Ensure content is **Published** (not just saved as draft)
   - Check that you're querying the correct dataset
   - Verify your GROQ queries in `sanity/queries/query.ts`
   - Run `pnpm typegen` to update TypeScript types
   - Check browser console for query errors

5. **Payment gateway integration**

   - Ensure you've implemented the payment gateway functions in `actions/createCheckoutSession.ts`
   - Verify webhook endpoint is correctly configured in `app/(client)/api/webhook/route.ts`
   - Check that your payment gateway credentials are set in `.env.local`

6. **Clerk authentication issues**
   - Verify your Clerk keys are correct
   - Ensure your Clerk application is configured with the correct redirect URLs

## Quick Start Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Node.js 18+ installed
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Dependencies installed (`pnpm install`)
- [ ] Sanity project created
- [ ] Sanity Project ID obtained
- [ ] Sanity API token created (Editor role)
- [ ] `.env.local` file created with all required variables
- [ ] Sanity Studio accessible at `http://localhost:3000/studio`
- [ ] At least one category created
- [ ] At least one brand created
- [ ] At least one product created
- [ ] Types generated (`pnpm typegen`)
- [ ] Development server running (`pnpm dev`)

## Payment Gateway Integration

The project includes placeholder functions ready for your local payment gateway integration:

- **`actions/createCheckoutSession.ts`**: Create payment sessions/transactions
- **`app/(client)/api/webhook/route.ts`**: Handle payment webhooks and create orders

Both files contain detailed TODO comments guiding you through the integration process.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Clerk Documentation](https://clerk.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
