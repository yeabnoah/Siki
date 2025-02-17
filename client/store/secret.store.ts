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
  createSecret: (secret: string) => Promise<void>;
  createComment: (comment: string, secretId: number) => void;

  getallSecrets: () => Promise<void>;

  setSelectedSecret: (secret: SecretInterface) => void;
}

const useSecretData = create<SecretStoreInterface>((set, get) => ({
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

  createSecret: async (secret) => {
    const response = await axiosInstance.post("/secret/create", {
      secretContent: secret,
      title: "test",
    });

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
