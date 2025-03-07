import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import GridHighlights from '@/components/gridhighlights';
import foto1 from '@/src/img/banner-2.png';
import foto2 from '@/src/img/banner.png';

export default function home() {
    return <div className='bg-stone-900 min-h-screen max-w-screen w-[100vw]'>
        <Carousel images={[foto1, foto2]} />
        <Filter classNameGap='md:grid md:grid-cols-6 md:gap-5'>
            <h1 className='text-5xl w-4xl font-bold text-white'> Seu carro aqui: </h1>
        </Filter>
        <GridHighlights />
    </div>
}