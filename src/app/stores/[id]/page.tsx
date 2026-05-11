import { StoreDetails } from '@/src/page-components/StoreDetails';

export default async function StoreDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params;

    return <StoreDetails id={slug} />;
}
