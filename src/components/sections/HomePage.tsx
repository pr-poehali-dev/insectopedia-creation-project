import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Insect {
  id: number;
  name_ru: string;
  name_latin: string;
  description: string;
}

interface HomePageProps {
  insects: Insect[];
  onNavigate: (section: string) => void;
}

const HomePage = ({ insects, onNavigate }: HomePageProps) => {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-primary pl-6 py-4 bg-secondary/30">
        <h1 className="text-4xl font-bold mb-2">Энциклопедия насекомых</h1>
        <p className="text-lg text-muted-foreground">
          Добро пожаловать в научную энциклопедию насекомых — свободный портал о самом многочисленном классе живых существ на Земле
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('encyclopedia')}>
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

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('classification')}>
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

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('search')}>
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

      {insects.length > 0 && (
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
      )}

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
            <Button variant="outline" className="w-full" onClick={() => onNavigate('contact')}>
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
            <Button variant="outline" className="w-full" onClick={() => onNavigate('about')}>
              Подробнее
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;