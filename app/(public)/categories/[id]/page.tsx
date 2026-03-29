import { CategoryDetailContent } from "@/components/website/category-detail-content"

type Props = {
  params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params
  return <CategoryDetailContent categoryId={id} />
}
