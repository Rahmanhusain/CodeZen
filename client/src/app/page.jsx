import About from "@/components/About";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Image from "next/image";

const faqData = [
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework that enables server-side rendering, static site generation, and other performance optimizations for React applications."
  },
  {
    question: "How do I install Next.js?",
    answer: "You can create a new Next.js app using 'npx create-next-app@latest' which sets up everything automatically for you."
  },
  {
    question: "Is Next.js suitable for large applications?",
    answer: "Yes, Next.js is designed to scale and can handle large applications with features like automatic code splitting and optimized performance."
  },
  {
    question: "How do I deploy a Next.js application?",
    answer: "Next.js applications can be deployed to Vercel (created by the same team behind Next.js) with zero configuration, or to any hosting provider that supports Node.js."
  }
]; 

export default function Home() {
  return (
    <>
      <Hero/>
      <About />
      <Faq faqs={faqData}  />
    </>
  );
}
