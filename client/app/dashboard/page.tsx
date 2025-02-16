import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dummyData from "@/utils/dummy";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "380px",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <header className="sticky justify-between items-center top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <div></div>

          <SidebarTrigger className="-ml-1" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {dummyData.secrets.map((secret, index) => (
            // <div
            //   key={index}
            //   className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            // />

            <Accordion key={index} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{secret.title}</AccordionTrigger>
                <AccordionContent>{secret.secretContent}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </SidebarInset>
      <AppSidebar />
    </SidebarProvider>
  );
}
