import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBeforeType?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText = ({
  text,
  typingSpeed = 30,
  deletingSpeed = 20,
  pauseBeforeDelete = 2000,
  pauseBeforeType = 500,
  className = '',
  showCursor = true,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const animate = () => {
      if (!isDeleting && currentIndex <= text.length) {
        // Typing
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        setTimeout(animate, typingSpeed);
      } else if (!isDeleting && currentIndex > text.length) {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          animate();
        }, pauseBeforeDelete);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting
        currentIndex--;
        setDisplayedText(text.slice(0, currentIndex));
        setTimeout(animate, deletingSpeed);
      } else if (isDeleting && currentIndex === 0) {
        // Pause before typing again
        isDeleting = false;
        setTimeout(animate, pauseBeforeType);
      }
    };

    const timer = setTimeout(animate, 500); // Initial delay

    return () => clearTimeout(timer);
  }, [text, typingSpeed, deletingSpeed, pauseBeforeDelete, pauseBeforeType]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className="inline-block w-0.5 h-5 bg-secondary dark:bg-white ml-1 animate-pulse" />
      )}
    </span>
  );
};

export default TypewriterText;
