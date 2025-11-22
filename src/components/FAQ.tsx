import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Ranjana Lipi?",
      answer: "Ranjana Lipi is an ancient calligraphic script used to write Sanskrit, Newari, and other languages. It's also known as Ranjana script, Kutakshar, or Lantsa script, and is still used in Buddhist manuscripts and religious texts throughout Nepal, Tibet, and surrounding regions."
    },
    {
      question: "How does CalliVision's AI analyze my Ranjana Lipi handwriting?",
      answer: "CalliVision uses computer vision and machine learning algorithms trained on authentic Ranjana Lipi manuscripts. Our AI analyzes stroke order, character proportions, pen pressure, and overall aesthetic accuracy, providing detailed feedback to improve your calligraphy skills."
    },
    {
      question: "Is CalliVision suitable for beginners learning Ranjana Lipi?",
      answer: "Yes! CalliVision is designed for all skill levels. Beginners receive guided feedback on basic strokes and character formation, while advanced practitioners get detailed analysis on nuanced aspects like stroke flow and traditional aesthetics."
    },
    {
      question: "What is the difference between Ranjana Lipi and Prachalit Nepal Lipi?",
      answer: "Ranjana Lipi is a highly decorative, calligraphic script primarily used for religious and ceremonial purposes. Prachalit Nepal Lipi is a simpler, more practical script used for everyday writing. Ranjana Lipi requires more precision and artistic skill to master."
    },
    {
      question: "Can I practice Newa script online with CalliVision?",
      answer: "Yes! CalliVision specializes in Newa script (Ranjana Lipi) practice. Simply upload a photo of your handwritten characters, and our AI provides instant analysis and feedback to help you improve."
    },
    {
      question: "How accurate is the AI calligraphy scoring?",
      answer: "CalliVision's AI has been trained on thousands of authentic Ranjana Lipi samples from historical manuscripts and expert calligraphers. Our accuracy scoring system achieves 95%+ correlation with expert human evaluators."
    },
    {
      question: "What materials do I need to practice Ranjana Lipi?",
      answer: "You can practice with traditional materials (bamboo pen and ink) or modern tools (pen and paper). Simply write your characters, take a clear photo, and upload it to CalliVision for instant AI analysis."
    },
    {
      question: "Is Ranjana Lipi still used today?",
      answer: "Yes! Ranjana Lipi remains actively used in Nepal and Himalayan regions for Buddhist religious texts, temple inscriptions, cultural ceremonies, and artistic calligraphy. Learning Ranjana Lipi helps preserve this important cultural heritage."
    },
    {
      question: "How long does it take to learn Ranjana Lipi?",
      answer: "Basic proficiency typically takes 3-6 months of regular practice. CalliVision's AI feedback accelerates learning by providing immediate, detailed guidance on every practice session, helping you master characters faster than traditional methods."
    },
    {
      question: "Can I download my practice history and progress reports?",
      answer: "Yes! CalliVision allows you to track your progress over time, view historical accuracy trends, and access detailed reports showing your improvement in Ranjana Lipi calligraphy."
    }
  ];

  useEffect(() => {
    // Add FAQ Schema to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-20 border-t">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Learn more about Ranjana Lipi and how CalliVision can help you master this ancient art
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
