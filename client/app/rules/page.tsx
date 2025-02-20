"use client";

import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Rules() {
    const router = useRouter();

    return (
        <main className="container mx-auto px-4 py-8 max-w-3xl bg-white dark:bg-bgMain">
            {/* Header with back button and theme switcher */}
            <div className="flex justify-between items-center mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="gap-2 hover:bg-transparent"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>
                <ThemeSwitcher />
            </div>

            <h1 className="font-bold mb-8 font-instrument text-4xl text-bgMain dark:text-white">Rules & Terms of Use</h1>

            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-3 font-instrument text-bgMain dark:text-white">1. Content Guidelines</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="font-inter text-sm text-bgMain dark:text-white">No hate speech, discrimination, or harassment</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">No personal information or identifying details</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">No explicit or inappropriate content</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">No spam or promotional content</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">No illegal content or activities</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3 font-instrument text-bgMain dark:text-white">2. Privacy & Anonymity</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="font-inter text-sm text-bgMain dark:text-white">All posts are completely anonymous</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">Do not attempt to identify other users</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">Do not share personal information</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">We do not track or store user data</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3 font-instrument text-bgMain dark:text-white">3. Moderation</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="font-inter text-sm text-bgMain dark:text-white">Content is moderated to ensure community guidelines are followed</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">Inappropriate content will be removed without notice</li>
                        <li className="font-inter text-sm text-bgMain dark:text-white">Repeated violations may result in IP restrictions</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-3xl font-semibold mb-3 font-instrument text-bgMain dark:text-white">4. Disclaimer</h2>
                    <p className="font-instrument text-xl text-red-600 dark:text-red-400">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        This platform is provided "as is" without any warranties. We are not responsible for any content posted by users.
                        By using this service, you agree to follow these rules and terms. We reserve the right to modify these terms at any time.
                    </p>
                </div>
            </section>
        </main>
    );
} 