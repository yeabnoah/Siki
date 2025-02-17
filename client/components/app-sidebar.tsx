"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

<AppSidebar />;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row "
      {...props}
    >
      <Sidebar collapsible="none" className="hidden flex-1 md:flex bg-bgMain">
        <SidebarHeader className="gap-3.5 border-b p-4 bg-white/5">
          <div className="flex w-full items-center justify-between ">
            <div className="text-base font-medium text-foreground ">
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
                <span className="line-clamp-4 whitespace-break-spaces text-xs">
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

                <hr className=" bg-white" />
              </a>
              {/* ))} */}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
