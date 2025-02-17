import { AppSidebar } from "@/components/app-sidebar";
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
import dummyData from "@/utils/dummy";
import dateFormat from "dateformat";
import { MessageCircle } from "lucide-react";

export default function Page() {
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
        <header className="sticky justify-between items-center top-0 flex shrink-0 items-center bg-white/5 gap-2 border-b p-4">
          <div></div>

          <SidebarTrigger className="-ml-1" />
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
                className=" mx-2 px-3 py-2 rounded border-b border-white/20 bg-white/5"
              >
                <AccordionItem value="item-1" className=" border-none">
                  <AccordionTrigger>
                    <div className=" w-full flex justify-between items-center">
                      <div>{secret.title}</div>

                      <div className=" flex items-center justify-center">
                        <div className=" flex flex-row items-center">
                          <span className=" text-sm px-1 text-xs">12</span>
                          <MessageCircle size={11} className="" />
                        </div>
                        <Separator
                          orientation="vertical"
                          className=" h-3  bg-white/70 ml-2"
                        />
                        <span className=" text-white/80 text-xs mx-3">
                          {dateFormat(secret.createdAt, "fullDate")}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" py-2 text-xs font-inter font-light">
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
