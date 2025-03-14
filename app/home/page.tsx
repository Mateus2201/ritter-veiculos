import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import GridHighlights from '@/components/gridhighlights';
import foto1 from '@/src/img/banner-2.png';
import foto2 from '@/src/img/banner.png';

export default function home() {
    return <div className='w-screen min-h-screen'>
        <Carousel images={[foto1, foto2]} />
        <Filter classNameGap='md:grid md:grid-cols-6 md:gap-5 '>
            <h1 className='md:text-5xl md:w-4xl font-bold text-offWhite'> Seu carro aqui: </h1>
        </Filter>
        <GridHighlights />
    </div>
}