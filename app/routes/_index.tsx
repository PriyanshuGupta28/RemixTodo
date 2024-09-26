import type { MetaFunction } from "@remix-run/node";
import HeroSection from "~/components/HeroSection/HeroSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Todo" },
    { name: "description", content: "Welcome to Remix Todo!" },
  ];
};

export default function Index() {
  return (
    <div className="text-red-500">
      <HeroSection />
    </div>
  );
}
