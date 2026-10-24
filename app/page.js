import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import AIWidget from "@/components/AIWidget";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Testimonials />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <AIWidget />
    </>
  );
}
