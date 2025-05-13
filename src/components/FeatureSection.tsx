
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";

interface ChecklistItem {
  id: string;
  text: string;
}

interface FeatureSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: ChecklistItem[];
  imageComponent?: React.ReactNode;
  backgroundColor?: string;
  reverse?: boolean;
  icon: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  items,
  imageComponent,
  backgroundColor = "bg-white",
  reverse = false,
  icon,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const animateOnScroll = () => {
      const elements = sectionElement.querySelectorAll(".animate-on-scroll");
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;
        
        if (isVisible) {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    };

    // Initial check
    setTimeout(animateOnScroll, 100);

    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("py-20 overflow-hidden", backgroundColor)}
    >
      <div className="section-container">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            reverse ? "lg:flex-row-reverse" : ""
          )}
        >
          <div className={cn("space-y-6", reverse ? "lg:order-2" : "lg:order-1")}>
            <div
              className="animate-on-scroll opacity-0 transform translate-y-4 transition-all duration-700"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="inline-flex items-center py-1 px-3 rounded-full bg-black/5">
                <span className="text-sm font-medium">{subtitle}</span>
              </div>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold animate-on-scroll opacity-0 transform translate-y-4 transition-all duration-700"
              style={{ transitionDelay: "200ms" }}
            >
              {title}
            </h2>

            <p
              className="text-gray-600 text-lg leading-relaxed animate-on-scroll opacity-0 transform translate-y-4 transition-all duration-700"
              style={{ transitionDelay: "300ms" }}
            >
              {description}
            </p>

            <div className="pt-4 space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-3 animate-on-scroll opacity-0 transform translate-y-4 transition-all duration-700"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "relative animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700",
              reverse ? "lg:order-1" : "lg:order-2"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            {imageComponent ? (
              imageComponent
            ) : (
              <AnimatedCard
                icon={icon}
                title={title}
                description={description}
                isActive={true}
                className="max-w-md mx-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
