import About from "@/components/About";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Image from "next/image";

const faqData = [
  {
    question: "How does the AI-powered waste recognition work?",
    answer: "Our platform uses advanced AI technology to scan and identify the type of waste you want to dispose of."
  },
  {
    question: "What happens to the recyclable waste collected?",
    answer: "We supply the collected recyclable materials to businesses who use them to create sustainable products"
  },
  {
    question: "How can I schedule a waste pickup?",
    answer: "You can easily schedule a waste pickup after logging into your profile ."
  },
  
]; 

export default function Home() {
  return (
    <>
      <Hero/>
      <About />
      <Services />
      <Faq faqs={faqData}  />
    </>
  );
}
