import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/sections/HomePage';
import EncyclopediaPage from '@/components/sections/EncyclopediaPage';
import ClassificationPage from '@/components/sections/ClassificationPage';
import SearchPage from '@/components/sections/SearchPage';
import ContactPage from '@/components/sections/ContactPage';
import AboutPage from '@/components/sections/AboutPage';
import ProfilePage from '@/components/sections/ProfilePage';

interface Insect {
  id: number;
  name_ru: string;
  name_latin: string;
  order_id: number;
  description: string;
  habitat: string;
  size_mm: string;
  lifespan: string;
  diet: string;
  image_url: string;
  views: number;
}

interface InsectOrder {
  id: number;
  name_ru: string;
  name_latin: string;
  description: string;
  image_url: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [insects, setInsects] = useState<Insect[]>([]);
  const [orders, setOrders] = useState<InsectOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const insectsResponse = await fetch('https://functions.poehali.dev/9e937009-48dc-4ba4-bf1b-feed78d76895');
        const ordersResponse = await fetch('https://functions.poehali.dev/ff045486-aeff-431b-9db5-745d1bca4fb9');
        
        if (insectsResponse.ok) {
          const data = await insectsResponse.json();
          setInsects(data);
        }
        
        if (ordersResponse.ok) {
          const data = await ordersResponse.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredInsects = insects.filter(insect =>
    insect.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insect.name_latin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('Пользователь');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection={activeSection}
        isLoggedIn={isLoggedIn}
        username={username}
        onNavigate={setActiveSection}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <HomePage insects={insects} onNavigate={setActiveSection} />
        )}
        {activeSection === 'encyclopedia' && (
          <EncyclopediaPage insects={insects} />
        )}
        {activeSection === 'classification' && (
          <ClassificationPage insects={insects} orders={orders} />
        )}
        {activeSection === 'search' && (
          <SearchPage 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredInsects={filteredInsects}
          />
        )}
        {activeSection === 'contact' && <ContactPage />}
        {activeSection === 'about' && <AboutPage />}
        {activeSection === 'profile' && (
          <ProfilePage 
            isLoggedIn={isLoggedIn}
            username={username}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
