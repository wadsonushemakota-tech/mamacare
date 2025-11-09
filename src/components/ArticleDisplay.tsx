import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import nutritionImage from '@/assets/nutrition.jpg';
import mothersImage from '@/assets/mothers.jpg';
import heroPregnantWomanImage from '@/assets/hero-pregnant-woman.jpg';
import nutritionWomanImage from '@/assets/nutrition-woman.jpg';
import educationWomanImage from '@/assets/education-woman.jpg';
import wellnessWomanImage from '@/assets/wellness-woman.jpg';

interface ArticleDisplayProps {
  isOpen: boolean;
  title: string;
  content: {
    en: string;
    sh: string;
    nd: string;
  };
  onClose: () => void;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ isOpen, title, content, onClose }) => {
  const [language, setLanguage] = useState<'en' | 'sh' | 'nd'>('en');

  if (!isOpen) return null;

  // Determine which image to display based on the article title
  const getImageForArticle = (articleTitle: string): string | undefined => {
    const imageMap: Record<string, string> = {
      "Understanding Pregnancy": heroPregnantWomanImage,
      "Healthy Eating During Pregnancy": nutritionWomanImage,
      "Pregnancy Nutrition Guide": nutritionImage,
      "Mindfulness for Expectant Moms": mothersImage,
      "Debunking 5 Common Pregnancy Myths in Zimbabwe": educationWomanImage,
      "The Hidden Signs: How FASD Can Affect a Child's Future in School and Life": educationWomanImage,
      "Are Traditional Brews Safe During Pregnancy? The Honest Answer": wellnessWomanImage,
      "The Father's Role: 5 Ways Men Can Champion an Alcohol-Free Pregnancy": heroPregnantWomanImage,
      "I Drank Before I Knew I Was Pregnant. What Do I Do Now?": wellnessWomanImage,
    };
    return imageMap[articleTitle];
  };

  const imageToDisplay = getImageForArticle(title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-4xl mx-4 h-[90vh]">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="space-x-2">
              <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'default' : 'outline'}>English</Button>
              <Button onClick={() => setLanguage('sh')} variant={language === 'sh' ? 'default' : 'outline'}>Shona</Button>
              <Button onClick={() => setLanguage('nd')} variant={language === 'nd' ? 'default' : 'outline'}>Ndebele</Button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Close
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {imageToDisplay && (
              <img src={imageToDisplay} alt={title} className="w-full h-auto max-h-[60vh] object-contain rounded-md mb-6" />
            )}
            <div className="space-y-4">
              {content[language]
                .split('\n\n')
                .filter(para => para.trim().length > 0)
                .map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDisplay;
