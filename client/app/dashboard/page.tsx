"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import dummyData from "@/utils/dummy";
import dateFormat from "dateformat";
import {
  MessageCircle,
  Mic,
  Mic2,
  Mic2Icon,
  MicIcon,
  Microscope,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, setTheme } = useTheme();
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
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="outline"
              size="icon"
              className={cn(
                "transition-transform duration-300 ease-in-out bg-transparent border-none"
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </Button>
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-2 p-4 bg-white/5">
          {dummyData.secrets.map((secret, index) => (
            // <div
            //   key={index}
            //   className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            // />
            <div key={index}>
              <Accordion
                type="single"
                collapsible
                className=" mx-2 px-3 py-2 border border-white/5"
              >
                <AccordionItem value="item-1" className=" border-none">
                  <AccordionTrigger>
                    <div className=" w-full flex justify-between items-center">
                      <span className=" font-inter font-light text-sm">
                        {secret.title}
                      </span>

                      <div className=" flex items-center justify-center">
                        <div className=" flex flex-row items-center">
                          <span className=" text-white/40 px-1 text-xs font-inter">
                            12
                          </span>
                          <MessageCircle size={11} className=" text-white/40" />
                        </div>
                        <Separator
                          orientation="vertical"
                          className=" h-3  bg-white/40 ml-2"
                        />
                        <span className=" text-white/40 text-xs font-inter font-light mx-3">
                          {dateFormat(secret.createdAt, "fullDate")}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" py-2 text-xs font font-inter font-light">
                    {secret.secretContent}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </SidebarInset>
      <AppSidebar />
    </SidebarProvider>
  );
}
