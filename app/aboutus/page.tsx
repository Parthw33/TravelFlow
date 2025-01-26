"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Users, Globe2, Award, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { FooterProps } from "@/typescript/layout";
import { getAllTeam, getFooterRes, getForPageRes, getPageRes } from "@/helper";
import { onEntryChange } from "@/contentstack-sdk";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Team } from "./components/team";

const stats = [
  { label: "Happy Travelers", value: "50K+", icon: Users },
  { label: "Destinations", value: "100+", icon: Globe2 },
  { label: "Awards Won", value: "25+", icon: Award },
  { label: "Years Experience", value: "10+", icon: Heart },
];

export default function AboutPage() {
  const [footerData, setFooterData] = useState<FooterProps | undefined>(
    undefined
  );
  const [aboutData, setAboutData] = useState<any | null>(null);
  const [team, setTeam] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const entryUrl = usePathname();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [footer, about, team] = await Promise.all([
          getFooterRes(),
          getForPageRes(entryUrl),
          getAllTeam(),
        ]);

        console.log("Data ", team);

        setFooterData(footer);
        setAboutData(about);
        setTeam(team);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
    onEntryChange(fetchInitialData);
  }, []);

  const extractModularBlockData = (aboutData: any | null) => {
    if (!aboutData?.page_components)
      return {
        heroBanner: null,
        mission: null,
        fromAuthors: null,
      };

    return {
      heroBanner: aboutData.page_components.find(
        (block: any) => block.hero_banner
      )?.hero_banner,
      mission: aboutData.page_components.find((block: any) => block.section)
        ?.section,
      fromAuthors: aboutData.page_components.find(
        (block: any) => block.from_authors
      )?.from_authors,
    };
  };

  const { heroBanner, mission, fromAuthors } =
    extractModularBlockData(aboutData);

  console.log("wqdwqdwd ", aboutData);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          {heroBanner?.banner_image && (
            <Image
              src={heroBanner?.banner_image.url}
              alt={heroBanner?.banner_title}
              width={800}
              height={400}
              className="object-cover w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container px-4 mx-auto">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                {heroBanner?.banner_title}
              </h1>
              <p className="mb-8 text-xl text-white/90">
                {heroBanner?.banner_description}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        {mission && (
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">{mission.title}</h2>
                  <p className="text-muted-foreground">{mission.description}</p>
                </motion.div>
                {mission.image && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <Image
                      src={mission.image?.url}
                      alt={mission.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        <Team team={team} />
      </main>
      <Footer navigation_menu={footerData?.navigation_menu} />
    </div>
  );
}
