
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  icon,
  title,
  description,
  isActive = false,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = ((centerY - y) / centerY) * 3;
      
      cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    cardElement.addEventListener('mousemove', handleMouseMove);
    cardElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cardElement.removeEventListener('mousemove', handleMouseMove);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative p-6 bg-white rounded-xl feature-card-shadow transition-smooth will-change-transform h-full",
        isActive && "border-2 border-black/10",
        className
      )}
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AnimatedCard;
