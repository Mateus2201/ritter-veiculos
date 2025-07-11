import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import GridHighlights from '@/components/grid-highlights';
import foto1 from '@/src/img/banner-2.png';
import foto2 from '@/src/img/banner.png';

export default function HomePage() {
    return <div className='w-screen'>
        <Carousel images={[foto1, foto2]} />
        <Filter
            titleFilters='Seu carro aqui:'
            classTitle='text-white text-5xl w-screen'
            classNameGap='md:grid md:grid-cols-6 md:gap-5 w-full'
        />
        <GridHighlights />
    </div>
}