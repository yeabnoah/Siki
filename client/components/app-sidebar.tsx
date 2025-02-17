"use client";

import * as React from "react";
import dateFormat from "dateformat";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import useSecretData from "@/store/secret.store";
import { useState } from "react";

<AppSidebar />;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedSecret } = useSecretData();
  const [comment, setComment] = useState<string>();

  const { createComment } = useSecretData();

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row "
      {...props}
      // Comments
    >
      <Sidebar
        collapsible="none"
        className="hidden flex-1 md:flex dark:bg-bgMain bg-white"
      >
        <SidebarHeader className="gap-3 border-b px-4 pt-4 dark:bg-white/5">
          <div className="flex w-full items-center justify-between ">
            <div className="text-base font-medium text-foreground ">
              Comments
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {selectedSecret?.comments.map((each, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    // key={mail.email}
                    className="flex py-2 flex-col items-start whitespace-nowrap border-b px-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <div className="flex w-full items-center py-1">
                      <span className=" text-xs">
                        {dateFormat(each.createdAt, "shortDate")}
                      </span>
                    </div>
                    <span className="whitespace-break-spaces text-xs">
                      {each.commentContent}
                    </span>
                    <hr className=" border-white/5 border" />
                  </a>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="gap-3.5 border-t p-4">
          <div className="flex w-full gap-2 items-center justify-between ">
            <Input
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder=" comment here"
            />
            <Button
              onClick={() => {
                createComment(comment as string, selectedSecret?.id as number);
              }}
              className="  p-3"
            >
              <Send className=" size-9" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
