import Hero from "@/components/Hero";
import { features } from "@/data/features";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="hero-grid-background"></div>
      <Hero />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Powerfull features for your career growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl">
            {features.map((feature, index) => (
              <Card
                className={
                  "border-2 hover:border-primary cursor-pointer transition-colors duration-300"
                }
                key={index}
              >
                <CardContent
                  className={"flex flex-col items-center text-center"}
                >
                  <div className="flex items-center flex-col justify-center pt-4">
                    {feature.icon}
                    <h3 className="ml-2 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid space-y-4 sm:space-y-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-muted-foreground mt-2">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-muted-foreground mt-2">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-muted-foreground mt-2">Success Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground mt-2">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-2">
              How it works
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Four ways to enhance your career journey with our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className={"flex flex-col items-center text-center space-x-4"}
              >
                <div className="flex items-center space-y-4 flex-col justify-center pt-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Powerfull features for your career growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
            {testimonial.map((testimonial, index) => (
              <Card className={"bg-background"} key={index}>
                <CardContent>
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <Image
                          className="rounded-full object-cover border-2 border-primery/20"
                          src={testimonial.image}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">{testimonial.author}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                        <p className="text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="italic text-muted-foreground">
                        <span className="text-primary text-3xl">&quot;</span>
                        {testimonial.quote}
                        <span className="text-primary text-3xl">&quot;</span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Find answers to common questions about our platform and services.
            </p>
          </div>
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="gradient rounded-lg py-24 mx-auto">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground text-center mb-2">
              Ready to take your career to the next level?
            </h2>
            <p className="text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl text-center mb-8">
              Join thousands of professionals who have transformed their careers
              with our AI-driven platform. Sign up today and start your journey
              towards success!
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="cursor-pointer h-11 animate-bounce">
                Start your journey Today <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
