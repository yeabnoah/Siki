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
};

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
    const prompt = `give me 1 to 3 word title for the following secret. the title should be catchy and also precise and also genune not like some tv show script but personal taste, here is the secret : ${secret}
     
    your response should be a word , phrase or sentence no other fluff is needed"

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
}));

export default useSecretData;
