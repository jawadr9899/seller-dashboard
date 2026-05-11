import { OrderDetails } from '@/src/page-components/OrderDetails';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetails id={params.id} />;
}
