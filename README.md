# Whisper

A modern full-stack application for anonymous secret sharing, built with Next.js and Bun.

## 🌟 Project Structure

```
whisper/
├── client/              # Frontend Next.js application
│   ├── app/            # Next.js app directory
│   │   ├── layout.tsx  # Root layout component
│   │   ├── page.tsx    # Home page
│   │   ├── secrets/    # Secrets viewing/sharing
│   │   └── rules/      # Platform rules
│   └── lib/            # Shared utilities
│       ├── posthogProvider.tsx    # Analytics provider
│       └── posthogpageview.tsx    # Page view tracking
└── src/                # Backend Bun server
```

## 🚀 Features

- **Anonymous Secret Sharing**: Share secrets securely and anonymously
- **Modern UI**: Built with Next.js App Router and React
- **Analytics**: Integrated PostHog for user behavior tracking
- **Rules System**: Clear guidelines for platform usage
- **Responsive Design**: Works across all device sizes

## 🛠️ Backend Setup

To install dependencies:

```bash
bun install
```

To run the development server:

```bash
bun run index.ts
```

To build for production:

```bash
bun run build
```

## 💻 Frontend Setup

Navigate to the client directory:

```bash
cd client
bun install
bun run dev
```

## 🚀 Production Deployment

The project uses PM2 for process management in production. Deploy using:

```bash
bun run build
pm2 start ecosystem.config.js
```

## 🔧 Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh) v1.2.2+
- **Database**: PostgreSQL with Prisma
- **API**: RESTful endpoints
- **Process Manager**: PM2

### Frontend
- **Framework**: Next.js with App Router
- **Analytics**: PostHog
- **Styling**: Modern CSS/SCSS
- **State Management**: React Hooks

## 🔐 Environment Setup

Ensure you have the following environment variables set in your `.env` files:

```env
# Frontend (.env)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
