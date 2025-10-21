import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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

  const renderHome = () => (
    <div className="space-y-8">
      <div className="border-l-4 border-primary pl-6 py-4 bg-secondary/30">
        <h1 className="text-4xl font-bold mb-2">Энциклопедия насекомых</h1>
        <p className="text-lg text-muted-foreground">
          Добро пожаловать в научную энциклопедию насекомых — свободный портал о самом многочисленном классе живых существ на Земле
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('encyclopedia')}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name="BookOpen" className="text-primary" size={24} />
            </div>
            <CardTitle>Энциклопедия</CardTitle>
            <CardDescription>
              Подробные статьи о различных видах насекомых с научным описанием
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('classification')}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name="Network" className="text-primary" size={24} />
            </div>
            <CardTitle>Классификация</CardTitle>
            <CardDescription>
              Систематика и таксономия: от отрядов до видов
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('search')}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name="Search" className="text-primary" size={24} />
            </div>
            <CardTitle>Поиск</CardTitle>
            <CardDescription>
              Быстрый поиск по базе данных насекомых
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Избранные статьи</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insects.slice(0, 3).map((insect) => (
            <div key={insect.id} className="border-b last:border-b-0 pb-4 last:pb-0">
              <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                {insect.name_ru}
              </h3>
              <p className="text-sm italic text-muted-foreground">{insect.name_latin}</p>
              <p className="mt-2 text-sm line-clamp-2">{insect.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Сообщество
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Присоединяйтесь к сообществу энтомологов и любителей природы. Делитесь наблюдениями и знаниями.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setActiveSection('contact')}>
              Написать автору
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              О проекте
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Научно-образовательный проект, созданный для популяризации энтомологии и сохранения биоразнообразия.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setActiveSection('about')}>
              Подробнее
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEncyclopedia = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Энциклопедия насекомых</h1>
        <p className="text-muted-foreground">База знаний о различных видах насекомых</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insects.map((insect) => (
          <Card key={insect.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-full h-48 bg-secondary rounded-md mb-4 flex items-center justify-center">
                <Icon name="Bug" size={64} className="text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">{insect.name_ru}</CardTitle>
              <CardDescription className="italic">{insect.name_latin}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm line-clamp-3">{insect.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <Icon name="Ruler" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Размер:</span>
                  <span>{insect.size_mm} мм</span>
                </div>
                <div className="flex gap-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Ареал:</span>
                  <span className="line-clamp-1">{insect.habitat}</span>
                </div>
                <div className="flex gap-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Продолжительность жизни:</span>
                  <span>{insect.lifespan}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={14} />
                  {insect.views} просмотров
                </span>
                <Button variant="link" size="sm" className="h-auto p-0">
                  Читать далее →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderClassification = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Классификация насекомых</h1>
        <p className="text-muted-foreground">Систематика по отрядам</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const orderInsects = insects.filter(i => i.order_id === order.id);
          
          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{order.name_ru}</CardTitle>
                    <CardDescription className="italic text-base mt-1">{order.name_latin}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {orderInsects.length} {orderInsects.length === 1 ? 'вид' : 'видов'}
                  </Badge>
                </div>
                <p className="text-sm mt-3">{order.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {orderInsects.map((insect) => (
                    <div key={insect.id} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-sm">{insect.name_ru}</h4>
                      <p className="text-xs italic text-muted-foreground">{insect.name_latin}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Поиск насекомых</h1>
        <p className="text-muted-foreground">Найдите информацию о любом виде</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Введите название насекомого (на русском или латыни)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {searchQuery && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Найдено результатов: <strong>{filteredInsects.length}</strong>
          </p>

          {filteredInsects.length > 0 ? (
            <div className="space-y-3">
              {filteredInsects.map((insect) => (
                <Card key={insect.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                        <Icon name="Bug" size={32} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary">{insect.name_ru}</h3>
                        <p className="text-sm italic text-muted-foreground mb-2">{insect.name_latin}</p>
                        <p className="text-sm line-clamp-2">{insect.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Размер: {insect.size_mm} мм</span>
                          <span>•</span>
                          <span>Продолжительность жизни: {insect.lifespan}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-50" />
                <p>По вашему запросу ничего не найдено</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Обратная связь</h1>
        <p className="text-muted-foreground">Свяжитесь с автором проекта</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">Тема</Label>
            <Input id="contact-subject" placeholder="Тема сообщения" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Сообщение</Label>
            <Textarea id="contact-message" rows={6} placeholder="Ваше сообщение..." />
          </div>

          <Button className="w-full">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить сообщение
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">О проекте</h1>
        <p className="text-muted-foreground">Научно-образовательная энциклопедия насекомых</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3">Миссия проекта</h2>
            <p className="text-sm leading-relaxed">
              Энциклопедия насекомых — это научно-образовательный портал, созданный для популяризации энтомологии 
              и распространения достоверной информации о самом многочисленном классе живых существ на планете. 
              Наша цель — сделать знания о насекомых доступными для всех.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-3">Содержание</h2>
            <p className="text-sm leading-relaxed mb-3">
              В энциклопедии представлены подробные статьи о различных видах насекомых, их систематике, 
              морфологии, экологии и роли в природе. Вся информация основана на научных источниках 
              и регулярно обновляется.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Научное описание видов с латинскими названиями</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Классификация по отрядам и семействам</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Информация об ареале обитания и образе жизни</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Данные о размерах, продолжительности жизни и питании</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-3">Принципы работы</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Icon name="BookOpen" size={32} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm mb-1">Научность</h3>
                <p className="text-xs text-muted-foreground">Только проверенная информация</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Icon name="Users" size={32} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm mb-1">Доступность</h3>
                <p className="text-xs text-muted-foreground">Понятно для всех</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Icon name="Leaf" size={32} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm mb-1">Экология</h3>
                <p className="text-xs text-muted-foreground">Сохранение природы</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
        <p className="text-muted-foreground">Управление профилем</p>
      </div>

      {isLoggedIn ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-sm text-muted-foreground">Участник сообщества</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Активность</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Статей</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Комментариев</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Избранное</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вход в систему</CardTitle>
                <CardDescription>Введите данные для входа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email или имя пользователя</Label>
                  <Input id="login-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input id="login-password" type="password" />
                </div>
                <Button className="w-full" onClick={() => {
                  setIsLoggedIn(true);
                  setUsername('Пользователь');
                }}>
                  Войти
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Создайте новый аккаунт</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Имя пользователя</Label>
                  <Input id="reg-username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input id="reg-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password-confirm">Повторите пароль</Label>
                  <Input id="reg-password-confirm" type="password" />
                </div>
                <Button className="w-full">
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
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
                onClick={() => setActiveSection('home')}
              >
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Button 
                variant={activeSection === 'encyclopedia' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('encyclopedia')}
              >
                <Icon name="BookOpen" size={16} className="mr-2" />
                Энциклопедия
              </Button>
              <Button 
                variant={activeSection === 'classification' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('classification')}
              >
                <Icon name="Network" size={16} className="mr-2" />
                Классификация
              </Button>
              <Button 
                variant={activeSection === 'search' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('search')}
              >
                <Icon name="Search" size={16} className="mr-2" />
                Поиск
              </Button>
              <Button 
                variant={activeSection === 'contact' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('contact')}
              >
                <Icon name="Mail" size={16} className="mr-2" />
                Связь
              </Button>
              <Button 
                variant={activeSection === 'about' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('about')}
              >
                <Icon name="Info" size={16} className="mr-2" />
                О проекте
              </Button>
            </nav>

            <Button 
              variant={activeSection === 'profile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection('profile')}
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
                onClick={() => setActiveSection('home')}
              >
                Главная
              </Button>
              <Button 
                variant={activeSection === 'encyclopedia' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('encyclopedia')}
              >
                Энциклопедия
              </Button>
              <Button 
                variant={activeSection === 'classification' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('classification')}
              >
                Классификация
              </Button>
              <Button 
                variant={activeSection === 'search' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('search')}
              >
                Поиск
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'encyclopedia' && renderEncyclopedia()}
        {activeSection === 'classification' && renderClassification()}
        {activeSection === 'search' && renderSearch()}
        {activeSection === 'contact' && renderContact()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'profile' && renderProfile()}
      </main>

      <footer className="border-t bg-secondary/30 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-3">О проекте</h3>
              <p className="text-sm text-muted-foreground">
                Научно-образовательная энциклопедия, посвященная миру насекомых
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Разделы</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Энциклопедия</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Классификация</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Поиск</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Сообщество</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Обратная связь</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Форум</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Участникам</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Информация</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">О проекте</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Условия использования</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Конфиденциальность</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Энциклопедия насекомых. Содержание доступно по лицензии Creative Commons.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;