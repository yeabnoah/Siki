"use client";

import { Button } from "@/components/ui/button";
import useSecretData from "@/store/secret.store";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isAiFetching } = useSecretData();
  return (
    <main

      className="relative before:absolute before:top-0 before:left-0 before:w-full

     before:h-full before:content-[''] before:opacity-[0.05] before:z-10 before:pointer-events-none

     before:bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/noise_yvdidf.gif')]"

    >

      <Button>{isAiFetching ? <Loader2 /> : "Ai Magic Button"}</Button>
    </main>
  );
}
