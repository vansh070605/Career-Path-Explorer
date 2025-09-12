import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'हिंदी' : 'English');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
    >
      <Globe size={16} />
      {language}
    </Button>
  );
};

export default LanguageSwitcher;