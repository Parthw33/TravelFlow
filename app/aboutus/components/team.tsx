"use client";
import { motion } from "framer-motion";

interface TeamMember {
  title: string;
  role: string;
  profile: { url: string };
  bio: string;
}

interface TeamProps {
  team: TeamMember[];
}

export function Team({ team }: TeamProps) {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of travel enthusiasts and tech experts work
            together to make your travel dreams a reality.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-lg p-6 shadow-lg"
            >
              <img
                src={member.profile.url}
                alt={member.title}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {member.title}
              </h3>
              <p className="text-primary text-center mb-4">{member.role}</p>
              <p className="text-muted-foreground text-center">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
