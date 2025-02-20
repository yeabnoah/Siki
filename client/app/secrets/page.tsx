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
import { MessageSquare, Send, X, BookOpen, RefreshCcw, Book } from "lucide-react";
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
  // const [show, setShow] = useState<boolean>(true);
  const [secret, setSecret] = useState<string>();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [mobileComment, setMobileComment] = useState<string>("");
  const [textareaHeight] = useState("60px");
  const [isLoading, setIsLoading] = useState(true);
  const [votingInProgress, setVotingInProgress] = useState<{ [key: number]: boolean }>({});

  const fetchSecrets = async () => {
    try {
      setIsLoading(true);
      await getallSecrets();
    } catch (error) {
      console.error('Error fetching secrets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecret(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleVote = async (secretId: number, voteType: 'upvote' | 'downvote') => {
    if (votingInProgress[secretId]) return;

    const secretToUpdate = secrets.find(s => s.id === secretId);
    if (!secretToUpdate) return;

    if (hasVoted(secretId)) return;

    setVotingInProgress(prev => ({ ...prev, [secretId]: true }));

    try {
      if (voteType === 'upvote') {
        await upvoteSecret(secretId);
      } else {
        await downvoteSecret(secretId);
      }
      await getallSecrets();
    } catch (error) {
      console.error('Voting failed:', error);
      await getallSecrets();
    } finally {
      setVotingInProgress(prev => ({ ...prev, [secretId]: false }));
    }
  };

  return (
    <SidebarProvider
      className="bg-white dark:bg-bgMain"
      style={
        {
          "--sidebar-width": "380px",
        } as React.CSSProperties
      }
    >
      {/* <Spotlight /> */}
      <SidebarInset>
        <header className="sticky justify-between top-0 flex shrink-0 items-center bg-white dark:bg-white/5 gap-2 border-b dark:border-white/10 p-4">
          <div className="flex items-center gap-2 font-instrument text-2xl text-black/80 dark:text-white/80 mx-2">
            {/* <Mic2Icon /> */}
            Wishper
          </div>
          <div className="flex justify-end items-center flex-row w-full gap-3">
            <Button
              onClick={() => window.location.href = '/rules'}
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-transparent text-bgMain dark:text-white/70"
            >
              <Book />
              <span className="hidden md:inline font-instrument text-lg">Rules</span>
            </Button>
            <Button
              onClick={fetchSecrets}
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-transparent  text-bgMain dark:text-white/70"
            >
              <RefreshCcw />
              <span className="hidden md:inline font-instrument text-lg">Reload</span>
            </Button>
            <ThemeSwitcher />
            {/* <SidebarTrigger className="-ml-1" /> */}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-2 p-4 bg-white dark:bg-bgMain">
          {/* <div className={` ${!show && "hidden"}`}> */}
          <Textarea
            value={secret}
            onChange={handleTextAreaInput}
            placeholder="write your secret here ..."
            className="rounded-none text-xs textarea min-h-[60px] transition-all duration-200 resize-none overflow-hidden placeholder:font-instrument placeholder:text-lg bg-white dark:bg-bgMain text-black dark:text-white"
            style={{ height: textareaHeight }}
          />

          <Button
            onClick={() => {
              if (secret?.trim()) {
                createSecret(secret);
                setSecret("");
              }
            }}
            disabled={!secret?.trim()}
            variant="outline"
            className="text-xs md:text-base py-0 w-fit bg-white dark:bg-bgMain my-2 text-black/60 dark:text-white/70 rounded-none font-instrument disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Wishper
          </Button>
          {/* </div> */}

          <Accordion type="single" collapsible>
            {isLoading ? (
              <div className="flex font-instrument text-2xl items-center justify-center my-auto h-[45vh]">
                Loading...
              </div>
            ) : (!secrets || secrets.length <= 0) ? (
              <div className="flex items-center justify-center my-auto h-[80vh]">
                No secrets Found
              </div>
            ) : (
              [...secrets]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((secret, index) => (
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
                                handleVote(secret.id as number, 'upvote');
                              }}
                              aria-disabled={!!hasVoted(secret.id as number) || votingInProgress[secret.id as number]}
                              className={`flex items-center space-x-1 transition-colors ${hasVoted(secret.id as number) === "upvote"
                                ? "text-green-500 cursor-not-allowed"
                                : hasVoted(secret.id as number)
                                  ? "text-gray-400 cursor-not-allowed"
                                  : votingInProgress[secret.id as number]
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
                                handleVote(secret.id as number, 'downvote');
                              }}
                              aria-disabled={!!hasVoted(secret.id as number) || votingInProgress[secret.id as number]}
                              className={`flex items-center space-x-1 transition-colors ${hasVoted(secret.id as number) === "downvote"
                                ? "text-red-500 cursor-not-allowed"
                                : hasVoted(secret.id as number)
                                  ? "text-gray-400 cursor-not-allowed"
                                  : votingInProgress[secret.id as number]
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
                      className={`py-2 px-2 md:px-4 text-xs font-inter font-light border-t dark:border-white/10 mt-2 pt-2 ${isCommentOpen ? "hidden md:block" : ""}`}
                    >
                      {secret.secretContent}

                      <div className="mt-4 flex justify-end md:hidden">
                        <Button

                          variant="outline"
                          size="sm"
                          className="gap-2 bg-transparent  rounded-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSecret(secret);
                            setIsCommentOpen(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" color="gray" />
                          <span className=" text-[gray]">Comment</span>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
            )}
          </Accordion>
        </div>

        {/* <Button
          onClick={() => {
            setShow(!show);
          }}
          className="group size-11 rounded-none fixed transition-all hover:scale-110 flex hover:bg-white/50 bg-white/70 dark:bg-bgMain dark:hover:bg-bgMain justify-center items-center bottom-5 right-5 md:right-[400px] border z-10"
        >
          <Plus className="dark:text-white/40 text-black/60" />
        </Button> */}

        <Sheet open={isCommentOpen} onOpenChange={setIsCommentOpen}>
          <SheetContent
            side="bottom"
            className="h-[70vh] p-0 z-50 w-full focus:outline-none"
          >
            <SheetHeader className="sticky top-0 border-b p-4 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <SheetTitle className="font-instrument">Comments</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCommentOpen(false)}
                  className="h-8 w-8 rounded-md hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                >
                  <X className="size-10" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </SheetHeader>
            <div className="flex flex-col h-[calc(80vh-8rem)]">
              <div className="flex-1 overflow-y-auto">
                {!selectedSecret && (
                  <div className="flex items-center  text-xl font-instrument justify-center h-full">
                    No selected Secret
                  </div>
                )}
                {selectedSecret?.comments.length === 0 && (
                  <div className="flex items-center justify-center h-full font-instrument">
                    No comments yet
                  </div>
                )}
                {selectedSecret?.comments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((comment, index) => (
                    <div
                      key={index}
                      className=" px-4 py-2 border-b-[.6px] dark:border-white/5"
                    >
                      <div className="text-xs text-muted-foreground">
                        {dateformat(comment.createdAt, "shortDate")}
                      </div>
                      <div className="mt-1 text-sm">{comment.commentContent}</div>
                    </div>
                  ))}
              </div>
              <div className="sticky bottom-0 left-0 right-0 border-t bg-background px-2 py-4 dark:border-white/10">
                <div className="flex gap-2">
                  <Input
                    className="border-none shadow-none rounded-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 focus:border-none placeholder:font-instrument text-base py-2"
                    placeholder="Add a comment..."
                    value={mobileComment}
                    onChange={(e) => setMobileComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && mobileComment.trim()) {
                        createComment(mobileComment, selectedSecret?.id as number);
                        setMobileComment("");
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (mobileComment.trim()) {
                        createComment(mobileComment, selectedSecret?.id as number);
                        setMobileComment("");
                      }
                    }}
                    disabled={!mobileComment.trim()}
                    size="icon"
                    className="focus:outline-none focus-visible:outline-none focus-visible:ring-0 hover:bg-transparent"
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
