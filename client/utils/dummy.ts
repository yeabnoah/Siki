const dummyData = {
  secrets: [
    {
      id: 1,
      title: "I Wasn't Supposed to Survive",
      secretContent: `I don’t know why I’m writing this. Maybe because no one will believe me if I don’t. Maybe because the truth needs to exist somewhere, even if no one ever reads it.

I was supposed to die that night. The plane crash that made the news—Flight 407? I was on it. Or at least, I was supposed to be. But I got off just before takeoff. Not because of a gut feeling or some divine intervention. I got off because a man in a gray suit sat down next to me and whispered in my ear: "Don’t board this flight." He didn’t explain. He didn’t look at me again. He just stood up and walked away.

I should’ve reported it. I should’ve told someone. But something about his voice—calm, certain—froze me in place. So I left. I walked back through the terminal, past the gate, past security, past the crowds of people who had no idea they were about to die. And then, an hour later, the news alert: Flight 407 had crashed. No survivors.

I didn’t tell anyone. How could I? Who would believe me? But last night, I found something tucked inside my jacket pocket. A piece of paper. Six words, written in perfect block letters:

"You were never meant to leave."`,
      createdAt: "2024-02-17T10:00:00Z",
      comments: [
        {
          id: 1,
          commentContent: "This gave me chills...",
          secretId: 1,
          createdAt: "2024-02-17T11:00:00Z",
        },
        {
          id: 2,
          commentContent: "Who was the man in gray?!",
          secretId: 1,
          createdAt: "2024-02-17T11:30:00Z",
        },
      ],
    },
    {
      id: 2,
      title: "I Let an Innocent Man Go to Prison",
      secretContent: `This has been eating me alive for the past ten years, and I can’t keep it inside anymore. I lied. I stood in a courtroom, raised my right hand, and swore to tell the truth. Then I sent an innocent man to prison.

I was 22, broke, and scared out of my mind. The cops told me they had evidence linking my friend Danny to the robbery. They said if I testified against him, I’d walk away clean. But if I didn’t? They’d find something to charge me with too. So I did it. I sat in that witness stand and told them what they wanted to hear. I said I saw Danny leaving the scene, that he had bragged about it the night before. I watched as his face fell, as the reality of what I was doing sank in for both of us.

He got 15 years. I got to go home.

I told myself he’d get out early, that someone would realize the truth. But last week, I saw his mother at a grocery store. She didn’t say a word. She just looked at me—really looked at me—and that’s when I knew. Danny’s still in there. And it’s my fault.

I don’t know what to do. If I come clean now, I lose everything. But if I don’t… I’ll never be free either.`,
      createdAt: "2024-02-16T15:00:00Z",
      comments: [
        {
          id: 3,
          commentContent: "You have to confess. It's the right thing to do.",
          secretId: 2,
          createdAt: "2024-02-16T16:00:00Z",
        },
        {
          id: 4,
          commentContent: "This is terrifying. I hope Danny gets justice.",
          secretId: 2,
          createdAt: "2024-02-16T17:30:00Z",
        },
      ],
    },
    {
      id: 3,
      title: "I Switched the Baby at the Hospital",
      secretContent: `It was a mistake. A split-second, panic-driven mistake. But I can never undo it.

I was a nurse back then, working the night shift at the maternity ward. It was exhausting—hours of crying newborns, stressed-out mothers, and paperwork I could barely keep up with. That night, we had two baby boys born minutes apart, both in identical blue blankets. It should’ve been routine, just another set of checkups before bringing them back to their mothers.

But I mixed them up.

I didn’t realize it at first. I handed Baby A to Mother B, and Baby B to Mother A. I only noticed my mistake when I saw the tags an hour later. My stomach dropped. I should’ve fixed it then and there, but I hesitated. The thought of admitting my mistake, of telling these mothers they had spent an hour bonding with the wrong baby, paralyzed me. So I did nothing. I let it be.

That was 27 years ago. I’ve checked on them over the years, just from a distance. Two boys, growing up in families that weren’t really theirs. They don’t know. No one does.

But I do. And I live with it every single day.`,
      createdAt: "2024-02-15T09:30:00Z",
      comments: [
        {
          id: 5,
          commentContent: "You have to tell them the truth!",
          secretId: 3,
          createdAt: "2024-02-15T10:00:00Z",
        },
        {
          id: 6,
          commentContent: "I can't even imagine the weight of this secret...",
          secretId: 3,
          createdAt: "2024-02-15T10:45:00Z",
        },
      ],
    },
  ],
};

export default dummyData;
