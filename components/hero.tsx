import { useState, useEffect } from "react";
import { Herobanner } from "@/typescript/layout";
import { Button } from "./ui/button";
import Link from "next/link";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { RainbowButton } from "./ui/rainbow-button";
import { HeroSkeleton } from "./skeletons/hero-skeleton";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { DotPattern } from "./ui/dot-pattern";

const generateLinkHref = (button: any): string => {
  if (button.button_title.toLowerCase() === "watch demo") {
    return "https://www.youtube.com";
  }

  return button.link || "#";
};

export function Hero({ herobanner }: { herobanner: Herobanner[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const banner = herobanner?.[0];
  const ctaButtons = banner?.cta_button || [];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative px-4 pt-32 pb-24 overflow-hidden bg-background">
      {/* Full background dot pattern */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0  dark:opacity-10",
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
        width={30}
        height={30}
        cx={2}
        cy={2}
        cr={1}
      />

      <div className="container relative z-10 mx-auto ">
        <div className="z-10 flex items-center justify-center min-h-64">
          <AnimatedGradientText>
            🎉 <hr className="w-px h-4 mx-2 bg-gray-300 shrink-0" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Introducing TravelFlow
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          {/* Skeleton for title */}
          {isLoading ? (
            <HeroSkeleton />
          ) : (
            <h1 className="mt-6 mb-6 text-4xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">
              {banner?.banner_title}
            </h1>
          )}

          {/* Skeleton for description */}
          {isLoading ? (
            <HeroSkeleton />
          ) : (
            <p className="mb-8 text-lg md:text-xl text-muted-foreground">
              {banner?.banner_description}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {ctaButtons.map((button: any, index: number) =>
              index === 0 ? (
                <Link href={generateLinkHref(button)} key={index}>
                  <InteractiveHoverButton className="rounded-lg">
                    {button.button_title}
                  </InteractiveHoverButton>
                </Link>
              ) : (
                <RainbowButton key={index}>
                  <Link href={generateLinkHref(button)}>
                    {button.button_title}
                  </Link>
                </RainbowButton>
              )
            )}
          </div>
        </div>

        {/* Skeleton for video */}
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          banner?.banner_image.url && (
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden border shadow-2xl rounded-xl">
                <video
                  width="100%"
                  height="auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover w-full"
                >
                  <source src={banner.banner_image.url} type="video/mp4" />
                </video>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
