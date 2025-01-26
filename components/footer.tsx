import React from "react";
import Link from "next/link";

// Comprehensive Type Definitions
interface PageReference {
  uid: string;
  _content_type_uid: string;
}

interface NavigationLinkMetadata {
  uid: string;
}

interface NavigationLink {
  title: string;
  page_reference: PageReference[];
  _metadata: NavigationLinkMetadata;
}

interface NavigationGroup {
  group_title: string;
  f1_name: NavigationLink[];
  _metadata: NavigationLinkMetadata;
}

interface FooterProps {
  navigation_menu: NavigationGroup[];
}

// Utility function for link generation
const generateLinkHref = (link: NavigationLink): string => {
  // Handle external links
  if (link.title.toLowerCase().includes("x.com")) {
    return "https://x.com";
  }

  // Handle internal page references
  if (link.page_reference && link.page_reference.length > 0) {
    const pageRef = link.page_reference[0];
    return pageRef._content_type_uid === "page" ? `/pages/${pageRef.uid}` : "#";
  }

  // Fallback
  return "#";
};

// Determine if link is external
const isExternalLink = (href: string): boolean => {
  return href.startsWith("http") || href.startsWith("https");
};

export function Footer({ navigation_menu }: FooterProps) {
  // Validate navigation menu
  if (!navigation_menu || navigation_menu.length === 0) {
    return null;
  }

  return (
    <footer className="px-4 py-12 bg-gray-100 border-t border-gray-200 shadow-lg dark:bg-black dark:border-gray-700 dark:shadow-xl rounded-t-xl">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {navigation_menu.map((group) => (
            <div key={group._metadata.uid}>
              <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {group.group_title}
              </h4>
              <ul className="space-y-2">
                {group.f1_name.map((link) => {
                  const href = generateLinkHref(link);

                  return (
                    <li key={link._metadata.uid}>
                      {isExternalLink(href) ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 mt-12 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TravelFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  navigation_menu: [],
};
