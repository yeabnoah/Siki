"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

// This is sample data
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Inbox",
//       url: "#",
//       icon: Inbox,
//       isActive: true,
//     },
//     {
//       title: "Drafts",
//       url: "#",
//       icon: File,
//       isActive: false,
//     },
//     {
//       title: "Sent",
//       url: "#",
//       icon: Send,
//       isActive: false,
//     },
//     {
//       title: "Junk",
//       url: "#",
//       icon: ArchiveX,
//       isActive: false,
//     },
//     {
//       title: "Trash",
//       url: "#",
//       icon: Trash2,
//       isActive: false,
//     },
//   ],
//   mails: [
//     {
//       name: "William Smith",
//       email: "williamsmith@example.com",
//       subject: "Meeting Tomorrow",
//       date: "09:34 AM",
//       teaser:
//         "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
//     },
//     {
//       name: "Alice Smith",
//       email: "alicesmith@example.com",
//       subject: "Re: Project Update",
//       date: "Yesterday",
//       teaser:
//         "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
//     },
//     {
//       name: "Bob Johnson",
//       email: "bobjohnson@example.com",
//       subject: "Weekend Plans",
//       date: "2 days ago",
//       teaser:
//         "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
//     },
//     {
//       name: "Emily Davis",
//       email: "emilydavis@example.com",
//       subject: "Re: Question about Budget",
//       date: "2 days ago",
//       teaser:
//         "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
//     },
//     {
//       name: "Michael Wilson",
//       email: "michaelwilson@example.com",
//       subject: "Important Announcement",
//       date: "1 week ago",
//       teaser:
//         "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
//     },
//     {
//       name: "Sarah Brown",
//       email: "sarahbrown@example.com",
//       subject: "Re: Feedback on Proposal",
//       date: "1 week ago",
//       teaser:
//         "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
//     },
//     {
//       name: "David Lee",
//       email: "davidlee@example.com",
//       subject: "New Project Idea",
//       date: "1 week ago",
//       teaser:
//         "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
//     },
//     {
//       name: "Olivia Wilson",
//       email: "oliviawilson@example.com",
//       subject: "Vacation Plans",
//       date: "1 week ago",
//       teaser:
//         "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
//     },
//     {
//       name: "James Martin",
//       email: "jamesmartin@example.com",
//       subject: "Re: Conference Registration",
//       date: "1 week ago",
//       teaser:
//         "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
//     },
//     {
//       name: "Sophia White",
//       email: "sophiawhite@example.com",
//       subject: "Team Dinner",
//       date: "1 week ago",
//       teaser:
//         "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
//     },
//   ],
// };
<AppSidebar />;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  // const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  // const [mails, setMails] = React.useState(data.mails);
  // const { setOpen } = useSidebar();

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row "
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              Comments
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {/* {mails.map((mail) => ( */}
              <a
                href="#"
                // key={mail.email}
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex w-full items-center gap-2">
                  <span>This is my secret</span>{" "}
                  <span className="ml-auto text-xs">Jan 24, 2025</span>
                </div>
                {/* <span className="font-medium">anonymous</span> */}
                <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  {/* {mail.teaser} */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum sed est sed sapien pellentesque tempor id vel nibh.
                  Vivamus tristique porta aliquam. Fusce in maximus magna. Etiam
                  maximus vel ipsum id condimentum. Praesent quis enim egestas
                  risus ullamcorper pretium id id magna. Mauris lacinia ex ante,
                  a interdum erat eleifend vitae. Vestibulum tincidunt iaculis
                  turpis, iaculis rutrum turpis lobortis a. Nulla rutrum dapibus
                  cursus. Ut a arcu mollis, sodales tortor a, dignissim urna.
                  Quisque nec quam lacus. Aenean arcu diam, molestie vitae
                  rutrum et, tincidunt pretium lorem. Cras et lorem hendrerit,
                  porta risus sed, rutrum erat. Integer in efficitur sem, quis
                  efficitur arcu. Mauris condimentum aliquet iaculis.
                </span>
              </a>
              {/* ))} */}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
