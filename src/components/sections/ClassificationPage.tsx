import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Insect {
  id: number;
  name_ru: string;
  name_latin: string;
  order_id: number;
}

interface InsectOrder {
  id: number;
  name_ru: string;
  name_latin: string;
  description: string;
}

interface ClassificationPageProps {
  insects: Insect[];
  orders: InsectOrder[];
}

const ClassificationPage = ({ insects, orders }: ClassificationPageProps) => {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Классификация насекомых</h1>
        <p className="text-muted-foreground">Систематика по отрядам</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Загрузка классификации...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ClassificationPage;