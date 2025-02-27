import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import GridHighlights from '@/components/gridhighlights';

import foto1 from '@/src/img/banner-2.png';
import foto2 from '@/src/img/banner.png';

import highlight1 from '@/src/highlights/foto-1.jpg';
import highlight2 from '@/src/highlights/foto-2.webp';
import highlight3 from '@/src/highlights/foto-3.jpg';

export default function home() {
    const itens = [
        { id: 1, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 2, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 3, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 4, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 5, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 6, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 7, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight1, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 8, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight2, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
        { id: 9, title: 'BMW', description: 'I8 Roadster 1.5 Turbo - 2019', image: highlight3, value: 'R$ 100.000,00', km: '100.000 km', typeOil: 'Óleo', transmission: 'Automático', year: '2021' },
    ];

    console.log('Itens:', itens); // Verifique se os itens estão sendo passados corretamente

    return <div className='bg-stone-900 min-h-screen max-w-screen w-[100vw]'>
        <Carousel images={[foto1, foto2]} />
        <Filter />
        <GridHighlights itens={itens}/>
    </div>
}