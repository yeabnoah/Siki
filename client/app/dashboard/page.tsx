"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ThemeSwitcher from "@/components/theme-switcher";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useSecretData from "@/store/secret.store";
import { ArrowDown, ArrowUp, MessageCircle, Mic2Icon } from "lucide-react";
import { useEffect } from "react";
import dateformat from "dateformat";

export default function Page() {
  const { getallSecrets, secrets } = useSecretData();
  const { setSelectedSecret } = useSecretData();

  useEffect(() => {
    getallSecrets();
  }, [getallSecrets]);
  return (
    <SidebarProvider
      className=" bg-white/5`"
      style={
        {
          "--sidebar-width": "380px",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <header className="sticky justify-between  top-0 flex shrink-0 items-center bg-white/5 gap-2 border-b p-4">
          <div className=" flex items-center gap-2">
            <Mic2Icon />
            ConfessIt
          </div>
          <div className=" flex justify-end items-center flex-row w-full gap-3">
            <ThemeSwitcher />
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 dark:bg-bgMain">
          <Accordion type="single" collapsible>
            {secrets.map((secret, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border dark:border-white/10 shadow-sm my-2"
                onClick={() => {
                  setSelectedSecret(secret);
                }}
              >
                <AccordionTrigger className="p-2">
                  <div className="flex justify-between items-center w-full px-2">
                    <span className="font-inter font-light text-sm">
                      {secret.title}
                    </span>

                    <div className="flex items-center space-x-2">
                      <div className=" flex items-center ">
                        <ArrowUp size={18} />
                        <ArrowDown size={18} />
                      </div>
                      <Separator
                        orientation="vertical"
                        className="h-3 dark:bg-white/40 bg-black/50"
                      />
                      <div className="flex items-center space-x-2">
                        <span className="dark:text-white/40 text-sm font-light font-inter">
                          {secret.comments.length}
                        </span>
                        <MessageCircle
                          size={12}
                          className="dark:text-white/40"
                        />
                      </div>
                      <Separator
                        orientation="vertical"
                        className="h-3 dark:bg-white/40 bg-black/50"
                      />
                      <span className="dark:text-white/40 text-xs font-inter font-light">
                        {/* {new Date(secret.createdAt).toISOString().split("T")[0]} */}
                        {dateformat(secret.createdAt, "fullDate")}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-2 px-4 text-xs font-inter font-light border-t dark:border-white/10 mt-2 pt-2">
                  {secret.secretContent}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SidebarInset>
      <AppSidebar />
    </SidebarProvider>
  );
}
