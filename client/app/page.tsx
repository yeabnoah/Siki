"use client";

import { Button } from "@/components/ui/button";
import useSecretData from "@/store/secret.store";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isAiFetching } = useSecretData();
  return (
    <div className=" min-h-screen w-full bg-bgMain flex justify-center items-center">
      <Button>{isAiFetching ? <Loader2 /> : "Ai Magic Button"}</Button>
    </div>
  );
}
