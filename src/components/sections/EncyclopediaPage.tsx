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
  onInsectViewed?: (insectId: number) => void;
}

const EncyclopediaPage = ({ insects, onInsectViewed }: EncyclopediaPageProps) => {
  const [selectedInsect, setSelectedInsect] = useState<Insect | null>(null);
  
  const handleInsectOpen = (insect: Insect) => {
    setSelectedInsect(insect);
    if (onInsectViewed) {
      onInsectViewed(insect.id);
    }
  };

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
        <div className="grid md:grid-cols-2 gap-8">
          {insects.map((insect) => (
          <Card key={insect.id} className="hover:shadow-xl transition-all hover:scale-[1.02]">
            <CardHeader>
              <div className="w-full h-80 bg-secondary rounded-md mb-4 flex items-center justify-center overflow-hidden">
                {insect.image_url ? (
                  <img src={insect.image_url} alt={insect.name_ru} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Bug" size={64} className="text-muted-foreground" />
                )}
              </div>
              <CardTitle className="text-2xl">{insect.name_ru}</CardTitle>
              <CardDescription className="italic text-lg">{insect.name_latin}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base line-clamp-4 leading-relaxed">{insect.description}</p>
              
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
                <Button variant="link" size="sm" className="h-auto p-0" onClick={() => handleInsectOpen(insect)}>
                  Читать далее →
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedInsect} onOpenChange={() => setSelectedInsect(null)}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          {selectedInsect && (
            <>
              <DialogHeader className="pb-6">
                <DialogTitle className="text-4xl font-bold">{selectedInsect.name_ru}</DialogTitle>
                <DialogDescription className="italic text-xl text-foreground/70">{selectedInsect.name_latin}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-8">
                <div className="w-full h-96 bg-secondary rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                  {selectedInsect.image_url ? (
                    <img src={selectedInsect.image_url} alt={selectedInsect.name_ru} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Bug" size={128} className="text-muted-foreground" />
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="BookOpen" size={24} className="text-primary" />
                    Общее описание
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/90 mb-4">
                    {selectedInsect.description}
                  </p>
                  <p className="text-base leading-relaxed text-foreground/80 mb-4">
                    Данный вид насекомых представляет собой уникальный образец эволюционного развития членистоногих. 
                    Морфологические особенности строения тела позволяют этому виду успешно адаптироваться к различным 
                    экологическим условиям обитания. Особое внимание заслуживает анатомическое строение конечностей 
                    и ротового аппарата, которые демонстрируют высокую степень специализации.
                  </p>
                  <p className="text-base leading-relaxed text-foreground/80">
                    В процессе жизненного цикла насекомое проходит через несколько стадий развития, каждая из которых 
                    характеризуется специфическими морфологическими и физиологическими изменениями. Метаморфоз может 
                    быть полным или неполным, в зависимости от таксономической принадлежности. Репродуктивная стратегия 
                    вида оптимизирована для максимального увеличения численности популяции в благоприятных условиях среды.
                  </p>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Icon name="FileText" size={24} className="text-primary" />
                    Систематика и морфология
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Ruler" size={24} className="text-primary" />
                        <h4 className="font-bold text-lg">Размеры тела</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Длина тела составляет {selectedInsect.size_mm} мм. Размеры могут варьироваться в зависимости 
                        от пола особи, условий питания на стадии личинки и географического распространения популяции.
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Clock" size={24} className="text-primary" />
                        <h4 className="font-bold text-lg">Жизненный цикл</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Средняя продолжительность жизни имаго составляет {selectedInsect.lifespan}. Полный цикл развития 
                        от яйца до взрослой особи включает несколько линек и стадийных трансформаций организма.
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="MapPin" size={24} className="text-primary" />
                        <h4 className="font-bold text-lg">Географическое распространение</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {selectedInsect.habitat}. Популяции данного вида адаптированы к специфическим климатическим 
                        условиям и демонстрируют высокую экологическую пластичность в пределах ареала обитания.
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Utensils" size={24} className="text-primary" />
                        <h4 className="font-bold text-lg">Трофические связи</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {selectedInsect.diet}. Пищевое поведение демонстрирует высокую степень специализации, 
                        что определяет экологическую нишу вида в биоценозе.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Leaf" size={24} className="text-primary" />
                    Экологическое значение
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/80 mb-4">
                    Представители данного вида играют важнейшую роль в функционировании экосистем. Они участвуют 
                    в процессах опыления растений, разложения органических остатков и служат кормовой базой для 
                    многих видов позвоночных животных. Их деятельность способствует поддержанию биологического 
                    разнообразия и стабильности природных сообществ.
                  </p>
                  <p className="text-base leading-relaxed text-foreground/80">
                    В сельскохозяйственных экосистемах роль этих насекомых может быть двоякой: некоторые виды 
                    являются полезными энтомофагами, контролирующими численность вредителей, в то время как 
                    другие могут наносить ущерб культурным растениям. Изучение биологии и экологии данного вида 
                    имеет важное практическое значение для разработки методов биологической защиты растений.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground pt-6 border-t">
                  <Icon name="Eye" size={18} />
                  <span className="text-base">{selectedInsect.views} просмотров</span>
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