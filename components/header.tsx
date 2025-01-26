import { Button } from "@/components/ui/button";
import { onEntryChange } from "../contentstack-sdk";
import {
  HeaderProps,
  Entry,
  NavLinks,
  ButtonConfig,
} from "../typescript/layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllEntries, getHeaderRes } from "../helper";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { HeaderSkeleton } from "./skeletons/header-skeleton";

export function Header() {
  const [header, setHeaderProp] = useState<HeaderProps | undefined>(undefined);
  const [entries, setEntries] = useState<Entry | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [getHeader, setHeader] = useState(header);

  const fetchHeaderAndEntries = async () => {
    try {
      const headerRes = await getHeaderRes();
      const entriesRes = await getAllEntries();
      setHeaderProp(headerRes);
      setEntries(entriesRes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  function buildNavigation(ent: Entry, hd: HeaderProps) {
    let newHeader = { ...hd };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink: NavLinks) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_ref: [{ title: entry.title, url: entry.url, $: entry.$ }],
            $: {},
          });
        }
      });
    }
    return newHeader;
  }

  async function fetchData() {
    try {
      if (header && entries) {
        const headerRes = await getHeaderRes();
        const newHeader = buildNavigation(entries, headerRes);
        setHeader(newHeader);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHeaderAndEntries();
  }, []);

  useEffect(() => {
    if (header && entries) {
      onEntryChange(() => fetchData());
    }
  }, [header]);

  const headerData = getHeader ? getHeader : undefined;

  return isLoading ? (
    <HeaderSkeleton />
  ) : (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 text-primary">
            {headerData && (
              <Link legacyBehavior href="/">
                <a className="logo-tag" title="Contentstack">
                  <img
                    className="logo"
                    src={headerData.logo.url}
                    alt={headerData.title}
                    title={headerData.title}
                    {...(headerData.logo.$?.url as {})}
                  />
                </a>
              </Link>
            )}
          </div>
          <Link href="/">
            <span className="text-xl font-bold">{headerData?.title}</span>
          </Link>
        </div>

        {/* Navigation & Buttons */}
        <div className="flex items-center space-x-4">
          {/* Navigation Menu */}
          <ul className="hidden md:flex space-x-6 nav-ul header-ul">
            {headerData?.navigation_menu.map((list) => {
              const className =
                pathname === list.page_ref[0].url ? "active" : "";
              return (
                <li key={list.label} className="flex-auto">
                  <Link legacyBehavior href={list.page_ref[0].url}>
                    <a className={className}>{list.label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {headerData?.button?.map((btnConfig: ButtonConfig) => (
              <Button
                key={btnConfig._metadata.uid}
                variant={btnConfig.variant ? "ghost" : "default"}
                asChild
              >
                <Link href={btnConfig.href}>{btnConfig.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
