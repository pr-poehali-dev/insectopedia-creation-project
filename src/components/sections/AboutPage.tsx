import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const AboutPage = () => {
  return (
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
};

export default AboutPage;
