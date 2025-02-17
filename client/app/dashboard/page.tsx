"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ThemeSwitcher from "@/components/theme-switcher";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import useSecretData from "@/store/secret.store";
import dateformat from "dateformat";
import { MessageCircle, Mic2Icon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

export default function Page() {
  const {
    getallSecrets,
    secrets,
    setSelectedSecret,
    selectedSecret,
    createSecret,
  } = useSecretData();
  const [show, setShow] = useState<boolean>();
  const [secret, setSecret] = useState<string>();
  // const { } = useSecretData();

  useEffect(() => {
    getallSecrets();
  }, [getallSecrets, selectedSecret]);
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
            {/* <SidebarTrigger className="-ml-1" /> */}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 dark:bg-bgMain">
          <div className={` ${!show && "hidden"}`}>
            <Textarea
              onChange={(e) => {
                setSecret(e.target.value);
              }}
              placeholder=" write your secret here ... "
              className=" rounded-none text-xs textarea"
              // style={{ fieldSizing: "content" }}
            />

            <Button
              onClick={() => {
                createSecret(secret as string);
              }}
              variant="outline"
              className=" text-sm bg-bgMain my-2 rounded-none"
            >
              Wishper
            </Button>
          </div>

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
                      <div className=" flex items-center gap-2">
                        <BiUpvote size={18} color="rgb(255 255 255 / 0.4)" />
                        <BiDownvote
                          size={18}
                          color=" rgb(255 255 255 / 0.4)"
                          className=" mt-[2px]"
                        />
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
                        {dateformat(secret.createdAt, "shortDate")}
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

        <Button
          onClick={() => {
            setShow(!show);
          }}
          className=" group size-12 fixed transition-all hover:scale-110 flex bg-bgMain hover:bg-bgMain justify-center items-center right-[400px] bottom-5 border rounded-md "
        >
          <Plus className=" dark:text-white/40 text-black/60" />
        </Button>
      </SidebarInset>
      <AppSidebar />
    </SidebarProvider>
  );
}
