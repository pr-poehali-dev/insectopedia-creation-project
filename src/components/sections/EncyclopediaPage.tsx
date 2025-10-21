import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

interface EncyclopediaPageProps {
  insects: Insect[];
}

const EncyclopediaPage = ({ insects }: EncyclopediaPageProps) => {
  return (
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
};

export default EncyclopediaPage;
