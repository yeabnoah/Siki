import axiosInstance from "@/lib/axios-instance";
import { create } from "zustand";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type CommentInterface = {
  commentContent: string;
  createdAt: Date;
};

type SecretInterface = {
  id?: number;
  title: string;
  secretContent: string;
  createdAt: Date;
  comments: CommentInterface[];
  upvote: number;
  downvote: number;
};

type VoteType = 'upvote' | 'downvote';
type VoteRecord = Record<number, VoteType>;

interface SecretStoreInterface {
  secrets: SecretInterface[];
  selectedSecret: SecretInterface | null;
  comments: CommentInterface[];
  createSecret: (secret: string) => Promise<void>;
  createComment: (comment: string, secretId: number) => void;

  getallSecrets: () => Promise<void>;

  setSelectedSecret: (secret: SecretInterface) => void;
  geminiCall: () => Promise<void>;
  isAiFetching: boolean;
  upvoteSecret: (secretId: number) => Promise<void>;
  downvoteSecret: (secretId: number) => Promise<void>;
  hasVoted: (secretId: number) => VoteType | null;
}

const useSecretData = create<SecretStoreInterface>((set, get) => ({
  secrets: [],
  selectedSecret: null,
  comments: [],
  isAiFetching: false,

  geminiCall: async () => {
    set({ isAiFetching: true });
    console.log("------------------------------");
    // const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    console.log("------------------------------");
    set({ isAiFetching: false });
  },

  setSelectedSecret: (secret: SecretInterface) => {
    set({ selectedSecret: secret });
    console.log("selected", secret);
  },

  getallSecrets: async () => {
    const allSecrets = await axiosInstance.get("/secret/getall");

    set({ secrets: allSecrets.data.data });
    console.log("secret fetched ", allSecrets.data.data);
  },

  createSecret: async (secret) => {
    const prompt = `please generate a title for the following secret. the title should be hook phrase like "I'm done with school", give me a single string of phrase .. which i can directly use :: here is the secret : ${secret} "

    `;
    const title = await model.generateContent(prompt);
    const response = await axiosInstance.post("/secret/create", {
      secretContent: secret,
      title: title.response.text(),
    });

    get().getallSecrets();
    console.log(response);
  },

  createComment: async (comment, secretId) => {
    const newComment: CommentInterface = {
      commentContent: comment,
      createdAt: new Date(),
    };

    set((state) => {
      if (!state.selectedSecret) return state;

      const updatedSelectedSecret: SecretInterface = {
        ...state.selectedSecret,
        comments: [...state.selectedSecret.comments, newComment],
      };

      return {
        selectedSecret: updatedSelectedSecret,
        secrets: state.secrets.map((secret) =>
          secret.id === secretId
            ? { ...secret, comments: [...secret.comments, newComment] }
            : secret
        ),
      };
    });

    try {
      const response = await axiosInstance.post(`/comment/create/${secretId}`, {
        commentContent: comment,
      });
      console.log(response.data);
      get().getallSecrets();
    } catch (error) {
      console.error("Failed to create comment:", error);

      set((state) => {
        if (!state.selectedSecret) return state;

        const updatedSelectedSecret: SecretInterface = {
          ...state.selectedSecret,
          comments: state.selectedSecret.comments.filter(
            (c) => c.commentContent !== comment
          ),
        };

        return {
          selectedSecret: updatedSelectedSecret,
          secrets: state.secrets.map((secret) =>
            secret.id === secretId
              ? {
                  ...secret,
                  comments: secret.comments.filter(
                    (c) => c.commentContent !== comment
                  ),
                }
              : secret
          ),
        };
      });
    }
  },

  hasVoted: (secretId: number) => {
    const votes = JSON.parse(localStorage.getItem('secretVotes') || '{}') as VoteRecord;
    console.log('Current votes in localStorage:', votes);
    console.log(`Checking vote for secret ${secretId}:`, votes[secretId]);
    return votes[secretId] || null;
  },

  upvoteSecret: async (secretId: number) => {
    try {
      const previousVote = get().hasVoted(secretId);
      const votes = JSON.parse(localStorage.getItem('secretVotes') || '{}') as VoteRecord;
      
      // If already upvoted, remove the upvote (toggle behavior)
      if (previousVote === 'upvote') {
        await axiosInstance.post(`/secret/remove-vote/${secretId}`, { voteType: 'upvote' });
        delete votes[secretId]; // Remove from localStorage
        localStorage.setItem('secretVotes', JSON.stringify(votes));
        await get().getallSecrets();
        return;
      }

      // If previously downvoted, remove the downvote first
      if (previousVote === 'downvote') {
        await axiosInstance.post(`/secret/remove-vote/${secretId}`, { voteType: 'downvote' });
        delete votes[secretId]; // Remove old vote
      }

      // Add new upvote
      await axiosInstance.post(`/secret/upvote/${secretId}`);
      
      // Update localStorage
      votes[secretId] = 'upvote';
      localStorage.setItem('secretVotes', JSON.stringify(votes));

      // Refresh data
      await get().getallSecrets();

    } catch (error) {
      console.error("Failed to upvote:", error);
      await get().getallSecrets();
    }
  },

  downvoteSecret: async (secretId: number) => {
    try {
      const previousVote = get().hasVoted(secretId);
      const votes = JSON.parse(localStorage.getItem('secretVotes') || '{}') as VoteRecord;
      
      // If already downvoted, remove the downvote (toggle behavior)
      if (previousVote === 'downvote') {
        await axiosInstance.post(`/secret/remove-vote/${secretId}`, { voteType: 'downvote' });
        delete votes[secretId]; // Remove from localStorage
        localStorage.setItem('secretVotes', JSON.stringify(votes));
        await get().getallSecrets();
        return;
      }

      // If previously upvoted, remove the upvote first
      if (previousVote === 'upvote') {
        await axiosInstance.post(`/secret/remove-vote/${secretId}`, { voteType: 'upvote' });
        delete votes[secretId]; // Remove old vote
      }

      // Add new downvote
      await axiosInstance.post(`/secret/downvote/${secretId}`);
      
      // Update localStorage
      votes[secretId] = 'downvote';
      localStorage.setItem('secretVotes', JSON.stringify(votes));

      // Refresh data
      await get().getallSecrets();

    } catch (error) {
      console.error("Failed to downvote:", error);
      await get().getallSecrets();
    }
  },
}));

export default useSecretData;
