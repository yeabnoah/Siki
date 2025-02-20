import { PrismaClient } from "@prisma/client";
import { createEndpoint, createRouter } from "better-call";
import { z } from "zod";

const prisma = new PrismaClient();

const corsMiddleware = async (req: Request, next: () => Promise<Response>) => {
  const response = await next();
  return new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

const healthCheck = createEndpoint(
  "/",
  {
    method: "GET",
  },
  async () => {
    return {
      healthy: true,
      message: "server is running",
    };
  }
);

const createSecret = createEndpoint(
  "/secret/create",
  {
    method: "POST",
    body: z.object({
      title: z.string(),
      secretContent: z.string(),
    }),
  },
  async (ctx) => {
    try {
      const newSecret = await prisma.secret.create({
        data: {
          title: ctx.body.title,
          secretContent: ctx.body.secretContent,
        },
      });

      return {
        data: newSecret,
        message: "secret created successfully",
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "error happened while creating secret",
        success: false,
        error: err,
      };
    }
  }
);

const upvote = createEndpoint(
  "/secret/upvote/:id",
  {
    method: "POST",
  },
  async (ctx) => {
    try {
      // const test =
      const updatedSecret = await prisma.secret.update({
        where: {
          id: Number(ctx.params.id),
        },
        data: {
          upvote: {
            increment: 1,
          },
        },
      });

      return {
        data: updatedSecret,
        message: "upvoted successfully",
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "error happened while upvoting",
        success: false,
        error: err,
      };
    }
  }
);

const downvote = createEndpoint(
  "/secret/downvote/:id",
  {
    method: "POST",
  },
  async (ctx) => {
    try {
      const updatedSecret = await prisma.secret.update({
        where: {
          id: Number(ctx.params.id),
        },
        data: {
          downvote: {
            increment: 1,
          },
        },
      });

      return {
        data: updatedSecret,
        message: "downvoted successfully",
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "error happened while downvoting",
        success: false,
        error: err,
      };
    }
  }
);

const createComment = createEndpoint(
  "/comment/create/:id",
  {
    method: "POST",
    body: z.object({
      commentContent: z.string(),
    }),
  },

  async (ctx) => {
    try {
      const newComment = await prisma.comment.create({
        data: {
          commentContent: ctx.body.commentContent,
          secretId: Number(ctx.params.id),
        },
      });

      return {
        data: newComment,
        message: "commented successfully",
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "error happened while commenting",
        success: false,
        error: err,
      };
    }
  }
);

const getAllSecrets = createEndpoint(
  "/secret/getall",
  {
    method: "GET",
  },
  async () => {
    const allSecrets = await prisma.secret.findMany({
      include: {
        comments: true,
      },
    });

    return {
      data: allSecrets,
      message: "all secrets",
      success: true,
      error: null,
    };
  }
);

const getSecretById = createEndpoint(
  "/secret/single/:id",
  {
    method: "GET",
  },
  async (ctx) => {
    try {
      const singleSecret = await prisma.secret.findUnique({
        where: {
          id: Number(ctx.params.id),
        },
      });

      return {
        data: singleSecret,
        message: "single secret",
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "error happened while fetching single secret",
        success: false,
        error: err,
      };
    }
    return {
      sth: "something",
    };
  }
);

const removeVote = createEndpoint(
  "/secret/remove-vote/:id",
  {
    method: "POST",
    body: z.object({
      voteType: z.enum(['upvote', 'downvote']),
    }),
  },
  async (ctx) => {
    try {
      const secretId = Number(ctx.params.id);
      const voteType = ctx.body.voteType;

      const secret = await prisma.secret.findUnique({
        where: { id: secretId },
      });

      if (!secret) {
        return {
          data: null,
          message: "Secret not found",
          success: false,
          error: "Secret not found",
        };
      }

      const updatedSecret = await prisma.secret.update({
        where: { id: secretId },
        data: {
          [voteType]: {
            decrement: 1,
          },
        },
      });

      return {
        data: updatedSecret,
        message: `${voteType} removed successfully`,
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        message: "Error removing vote",
        success: false,
        error: err,
      };
    }
  }
);

// const deleteSecret = createEndpoint("")

const router = createRouter({
  healthCheck,
  createSecret,
  createComment,
  getAllSecrets,
  getSecretById,
  upvote,
  downvote,
  removeVote,
});

Bun.serve({
  fetch: async (req) => {
    // Apply CORS middleware to all requests
    return corsMiddleware(req, () => router.handler(req));
  },
  port: 7000,
});

console.log("Server running on http://localhost:7000");
