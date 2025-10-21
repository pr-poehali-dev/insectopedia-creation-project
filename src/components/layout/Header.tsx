import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  isLoggedIn: boolean;
  username: string;
  onNavigate: (section: string) => void;
}

const Header = ({ activeSection, isLoggedIn, username, onNavigate }: HeaderProps) => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <Icon name="Bug" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Энциклопедия насекомых</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Свободная энциклопедия</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <Button 
              variant={activeSection === 'home' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('home')}
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button 
              variant={activeSection === 'encyclopedia' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('encyclopedia')}
            >
              <Icon name="BookOpen" size={16} className="mr-2" />
              Энциклопедия
            </Button>
            <Button 
              variant={activeSection === 'classification' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('classification')}
            >
              <Icon name="Network" size={16} className="mr-2" />
              Классификация
            </Button>
            <Button 
              variant={activeSection === 'search' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('search')}
            >
              <Icon name="Search" size={16} className="mr-2" />
              Поиск
            </Button>
            <Button 
              variant={activeSection === 'contact' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('contact')}
            >
              <Icon name="Mail" size={16} className="mr-2" />
              Связь
            </Button>
            <Button 
              variant={activeSection === 'about' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('about')}
            >
              <Icon name="Info" size={16} className="mr-2" />
              О проекте
            </Button>
          </nav>

          <Button 
            variant={activeSection === 'profile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onNavigate('profile')}
          >
            <Icon name="User" size={16} className="mr-2" />
            {isLoggedIn ? username : 'Войти'}
          </Button>
        </div>

        <div className="lg:hidden mt-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={activeSection === 'home' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('home')}
            >
              Главная
            </Button>
            <Button 
              variant={activeSection === 'encyclopedia' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('encyclopedia')}
            >
              Энциклопедия
            </Button>
            <Button 
              variant={activeSection === 'classification' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('classification')}
            >
              Классификация
            </Button>
            <Button 
              variant={activeSection === 'search' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('search')}
            >
              Поиск
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
