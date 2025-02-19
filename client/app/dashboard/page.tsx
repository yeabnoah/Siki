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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import useSecretData from "@/store/secret.store";
import dateformat from "dateformat";
import { MessageSquare, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
// import { BiDownvote, BiUpvote } from "react-icons/bi";

export default function Page() {
  const {
    getallSecrets,
    secrets,
    setSelectedSecret,
    selectedSecret,
    createSecret,
    createComment,
    upvoteSecret,
    downvoteSecret,
    hasVoted,
  } = useSecretData();
  const [show, setShow] = useState<boolean>();
  const [secret, setSecret] = useState<string>();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [mobileComment, setMobileComment] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState("60px");

  useEffect(() => {
    getallSecrets();
  }, [getallSecrets, selectedSecret]);

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecret(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <SidebarProvider
      className=" bg-white/5`"
      style={
        {
          "--sidebar-width": "380px",
        } as React.CSSProperties
      }
    >
      {/* <Spotlight /> */}
      <SidebarInset>
        <header className="sticky justify-between  top-0 flex shrink-0 items-center bg-white/5 gap-2 border-b p-4">
          <div className=" flex items-center gap-2 font-instrument text-2xl dark:text-white/80  mx-2">
            {/* <Mic2Icon /> */}
            Wishper
          </div>
          <div className=" flex justify-end items-center flex-row w-full gap-3">
            <ThemeSwitcher />
            {/* <SidebarTrigger className="-ml-1" /> */}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 dark:bg-bgMain">
          <div className={` ${!show && "hidden"}`}>
            <Textarea
              value={secret}
              onChange={handleTextAreaInput}
              placeholder="write your secret here ..."
              className="rounded-none text-xs textarea min-h-[60px] transition-all duration-200 resize-none overflow-hidden placeholder:font-instrument placeholder:text-lg"
              style={{ height: textareaHeight }}
            />

            <Button
              onClick={() => {
                createSecret(secret as string);
                setShow(false);
                setSecret("");
              }}
              variant="outline"
              className=" text-xs md:text-base py-0  dark:bg-bgMain my-2 text-black/60 dark:text-white/70 rounded-none font-instrument"
            >
              Wishper
            </Button>
          </div>

          <Accordion type="single" collapsible>
            {secrets.length <= 0 && (
              <div className=" flex items-center justify-center my-auto h-[80vh]">
                No secrets Found
              </div>
            )}
            {secrets.reverse().map((secret, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border dark:border-white/10 shadow-sm my-2"
                onClick={() => {
                  setSelectedSecret(secret);
                }}
              >
                <AccordionTrigger className="p-2">
                  <div className="flex flex-col md:flex md:flex-row md:justify-between gap-1 justify-center md:items-center w-full md:px-2 pr-1">
                    <span className="font-light text-xs md:text-sm font-inter">
                      {secret.title}
                    </span>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-3">
                        <div
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            upvoteSecret(secret.id as number);
                          }}
                          aria-disabled={!!hasVoted(secret.id as number)}
                          className={`flex items-center space-x-1 transition-colors ${
                            hasVoted(secret.id as number) === "upvote"
                              ? "text-green-500 cursor-not-allowed"
                              : hasVoted(secret.id as number)
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:text-green-500 cursor-pointer"
                          }`}
                        >
                          <BiUpvote className="size-4" />
                          <span className="text-xs">{secret.upvote || 0}</span>
                        </div>
                        <div
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downvoteSecret(secret.id as number);
                          }}
                          aria-disabled={!!hasVoted(secret.id as number)}
                          className={`flex items-center space-x-1 transition-colors ${
                            hasVoted(secret.id as number) === "downvote"
                              ? "text-red-500 cursor-not-allowed"
                              : hasVoted(secret.id as number)
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:text-red-500 cursor-pointer"
                          }`}
                        >
                          <BiDownvote className="size-4" />
                          <span className="text-xs">
                            {secret.downvote || 0}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center space-x-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSecret(secret);
                          if (window.innerWidth < 768) {
                            setIsCommentOpen(true);
                          }
                        }}
                      >
                        <MessageSquare className="dark:text-white/40 size-3" />
                        <span className="dark:text-white/40 text-sm font-light font-inter">
                          {secret.comments.length}
                        </span>
                      </div>
                      <Separator
                        orientation="vertical"
                        className="h-3 dark:bg-white/40 bg-black/50 hidden md:block"
                      />
                      <span className="dark:text-white/40 text-xs font-inter font-light hidden md:block">
                        {dateformat(secret.createdAt, "shortDate")}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  className={`py-2 px-2 md:px-4 text-xs font-inter font-light border-t dark:border-white/10 mt-2 pt-2 ${
                    isCommentOpen ? "hidden md:block" : ""
                  }`}
                >
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
          className="group size-11 rounded-none fixed transition-all hover:scale-110 flex hover:bg-white/50 bg-white/70 dark:bg-bgMain dark:hover:bg-bgMain justify-center items-center bottom-5 right-5 md:right-[400px] border z-10"
        >
          <Plus className="dark:text-white/40 text-black/60" />
        </Button>

        <Sheet open={isCommentOpen} onOpenChange={setIsCommentOpen}>
          <SheetContent side="bottom" className="h-[80vh] p-0 z-50">
            <SheetHeader className="border-b p-4 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <SheetTitle className=" font-instrument">Comments</SheetTitle>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCommentOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </div>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto">
                {!selectedSecret && (
                  <div className="flex items-center justify-center h-full">
                    No selected Secret
                  </div>
                )}
                {selectedSecret?.comments.length === 0 && (
                  <div className="flex items-center justify-center h-full font-instrument">
                    No comments yet
                  </div>
                )}
                {selectedSecret?.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b p-4 dark:border-white/10"
                  >
                    <div className="text-xs text-muted-foreground">
                      {dateformat(comment.createdAt, "shortDate")}
                    </div>
                    <div className="mt-1 text-sm">{comment.commentContent}</div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4 dark:border-white/10">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={mobileComment}
                    onChange={(e) => setMobileComment(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      createComment(
                        mobileComment,
                        selectedSecret?.id as number
                      );
                      setMobileComment("");
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </SidebarInset>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
}
