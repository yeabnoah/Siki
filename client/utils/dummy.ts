const dummyData = {
  secrets: [
    {
      id: 1,
      title: "My First Secret",
      secretContent: "I ate the last slice of pizza.",
      createdAt: "2023-10-01T12:00:00Z",
      comments: [
        {
          id: 1,
          commentContent: "I knew it was you!",
          secretId: 1,
          createdAt: "2023-10-01T12:30:00Z",
        },
        {
          id: 2,
          commentContent: "You monster!",
          secretId: 1,
          createdAt: "2023-10-01T13:00:00Z",
        },
      ],
    },
    {
      id: 2,
      title: "Confession",
      secretContent: "I secretly love pineapple on pizza.",
      createdAt: "2023-10-02T14:30:00Z",
      comments: [
        {
          id: 3,
          commentContent: "Pineapple on pizza is amazing!",
          secretId: 2,
          createdAt: "2023-10-02T15:00:00Z",
        },
      ],
    },
    {
      id: 3,
      title: "Hidden Thought",
      secretContent: "I pretend to understand quantum physics.",
      createdAt: "2023-10-03T09:15:00Z",
      comments: [
        {
          id: 4,
          commentContent: "Same here, it's so confusing!",
          secretId: 3,
          createdAt: "2023-10-03T10:00:00Z",
        },
        {
          id: 5,
          commentContent: "Quantum physics is just magic with math.",
          secretId: 3,
          createdAt: "2023-10-03T10:30:00Z",
        },
      ],
    },
  ],
};

export default dummyData;
