

export default async function TagPage({params}: {params: Promise<{ slug: string }>}) {
  
  const { slug } = await params
  
  return (
    <div>
      TagPage Page { slug }
    </div>
  )
}