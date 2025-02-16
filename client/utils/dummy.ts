const dummyData = {
  secrets: [
    {
      id: 1,
      title: "My First Secret",
      secretContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at nibh a libero varius suscipit. Pellentesque malesuada ante est, lobortis feugiat neque porta in. Nullam lobortis aliquet tempor. Fusce vulputate sed risus sed fermentum. Integer dapibus interdum cursus. Donec accumsan erat in odio rhoncus faucibus. In hac habitasse platea dictumst. Ut non placerat dui. Aliquam justo nunc, finibus ac lobortis id, aliquet in turpis. Ut at posuere risus. Nam a augue odio. In a mi gravida magna euismod ullamcorper vitae eu ante. ",
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
