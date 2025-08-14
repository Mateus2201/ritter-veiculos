import Carousel from '@/components/carousel';
import Filter from '@/components/filter';
import GridHighlights from '@/components/grid-highlights';
import PreviewInsta from '@/components/preview-insta';
import { redirect } from 'next/navigation';

export default function Home() {
  return <div className='w-screen'>
    <Carousel />
    <Filter
      titleFilters='Seu carro aqui:'
      classTitle='text-white text-5xl w-screen'
      classNameGap='md:grid md:grid-cols-6 md:gap-5 w-full'
    />
    <GridHighlights />
    <PreviewInsta />
  </div>
}