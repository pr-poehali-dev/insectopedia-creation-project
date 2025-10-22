import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [selectedInsect, setSelectedInsect] = useState<Insect | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Энциклопедия насекомых</h1>
        <p className="text-muted-foreground">База знаний о различных видах насекомых</p>
      </div>

      {insects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Bug" size={64} className="mx-auto mb-4 opacity-50" />
          <p>Загрузка данных о насекомых...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insects.map((insect) => (
          <Card key={insect.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-full h-48 bg-secondary rounded-md mb-4 flex items-center justify-center overflow-hidden">
                {insect.image_url ? (
                  <img src={insect.image_url} alt={insect.name_ru} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Bug" size={64} className="text-muted-foreground" />
                )}
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
                <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setSelectedInsect(insect)}>
                  Читать далее →
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedInsect} onOpenChange={() => setSelectedInsect(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedInsect && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedInsect.name_ru}</DialogTitle>
                <DialogDescription className="italic text-lg">{selectedInsect.name_latin}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="w-full h-64 bg-secondary rounded-md flex items-center justify-center overflow-hidden">
                  {selectedInsect.image_url ? (
                    <img src={selectedInsect.image_url} alt={selectedInsect.name_ru} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Bug" size={96} className="text-muted-foreground" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Описание</h3>
                  <p className="text-muted-foreground">{selectedInsect.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Ruler" size={20} className="text-primary" />
                      <h4 className="font-semibold">Размер</h4>
                    </div>
                    <p className="text-muted-foreground">{selectedInsect.size_mm} мм</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <h4 className="font-semibold">Продолжительность жизни</h4>
                    </div>
                    <p className="text-muted-foreground">{selectedInsect.lifespan}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MapPin" size={20} className="text-primary" />
                      <h4 className="font-semibold">Ареал обитания</h4>
                    </div>
                    <p className="text-muted-foreground">{selectedInsect.habitat}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Utensils" size={20} className="text-primary" />
                      <h4 className="font-semibold">Питание</h4>
                    </div>
                    <p className="text-muted-foreground">{selectedInsect.diet}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                  <Icon name="Eye" size={16} />
                  <span>{selectedInsect.views} просмотров</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EncyclopediaPage;