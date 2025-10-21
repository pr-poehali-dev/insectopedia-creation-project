import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Insect {
  id: number;
  name_ru: string;
  name_latin: string;
  description: string;
  size_mm: string;
  lifespan: string;
}

interface SearchPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredInsects: Insect[];
}

const SearchPage = ({ searchQuery, onSearchChange, filteredInsects }: SearchPageProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
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
};

export default SearchPage;
