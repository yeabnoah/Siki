# Whisper

A modern full-stack application for anonymous secret sharing, built with Next.js and Bun.

## 🌟 Project Structure

```
whisper/
├── client/         # Frontend Next.js application
└── src/           # Backend Bun server
```

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

## 🚀 Production Deployment

The project uses PM2 for process management in production. Deploy using:

```bash
bun run build
pm2 start ecosystem.config.js
```

## 🔧 Tech Stack

- **Runtime**: [Bun](https://bun.sh) v1.2.2+
- **Database**: PostgreSQL with Prisma
- **API**: RESTful endpoints
- **Process Manager**: PM2

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
