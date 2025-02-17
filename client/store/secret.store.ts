import axiosInstance from "@/lib/axios-instance";
import { create } from "zustand";

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
  createSecret: (
    secret: Omit<SecretInterface, "createdAt" | "comments">
  ) => void;
  createComment: (comment: string, secretId: number) => void;

  getallSecrets: () => Promise<void>;

  setSelectedSecret: (secret: SecretInterface) => void;
}

const useSecretData = create<SecretStoreInterface>((set) => ({
  secrets: [],
  selectedSecret: null,
  comments: [],

  setSelectedSecret: (secret: SecretInterface) => {
    set({ selectedSecret: secret });
    console.log("selected", secret);
  },

  getallSecrets: async () => {
    const allSecrets = await axiosInstance.get("/secret/getall");

    set({ secrets: allSecrets.data.data });
    console.log("secret fetched ", allSecrets.data.data);
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

  createComment: async (comment, secretId) => {
    const response = await axiosInstance.post(`/comment/create/${secretId}`, {
      commentContent: comment,
    });

    console.log(response.data);

    // set((state) => ({
    //   secrets: state.secrets.map((secret) =>
    //     secret === state.secrets[secretId]
    //       ? { ...secret, comments: [...secret.comments, newComment] }
    //       : secret
    //   ),
    // }));
  },
}));

export default useSecretData;
