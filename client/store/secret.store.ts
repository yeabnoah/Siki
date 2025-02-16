import axiosInstance from "@/lib/axios-instance";
import { create } from "zustand";

type CommentInterface = {
  commentContent: string;
  createdAt: Date;
};

type SecretInterface = {
  title: string;
  secretContent: string;
  createdAt: Date;
  comments: CommentInterface[];
};

interface SecretStoreInterface {
  secrets: SecretInterface[];
  selectedSecret: SecretInterface | null;
  comments: CommentInterface[];
  createSecret: (
    secret: Omit<SecretInterface, "createdAt" | "comments">
  ) => void;
  createComment: (
    comment: Omit<CommentInterface, "createdAt">,
    secretId: number
  ) => void;

  getallSecrets: () => Promise<void>;
}

const useSecretData = create<SecretStoreInterface>((set) => ({
  secrets: [],
  selectedSecret: null,
  comments: [],

  getallSecrets: async () => {
    const allSecrets = await axiosInstance.get("/secret/getall");

    set({ secrets: allSecrets.data });
    console.log("secret fetched : 000000000", allSecrets.data);
  },

  createSecret: (secret) => {
    const newSecret: SecretInterface = {
      ...secret,
      createdAt: new Date(),
      comments: [],
    };
    set((state) => ({
      secrets: [...state.secrets, newSecret],
    }));
  },

  createComment: (comment, secretId) => {
    const newComment: CommentInterface = {
      ...comment,
      createdAt: new Date(),
    };

    set((state) => ({
      secrets: state.secrets.map((secret) =>
        secret === state.secrets[secretId]
          ? { ...secret, comments: [...secret.comments, newComment] }
          : secret
      ),
    }));
  },
}));

export default useSecretData;
