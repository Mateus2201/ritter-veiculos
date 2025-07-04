
interface FooterProps {
    logo: { src: string };
}

export default function Footer({ logo }: FooterProps) {
    return (
        <footer className={'static bottom-0 border-t bg-primary border-t-black text-offWhite flex items-center justify-center'}>
            <div className="container bg-primary ">
                <div className={'max-w-full md:grid md: grid-cols-3 gap-20 p-10 font-bold'}>
                    <div className='not-md:mt-5 not-md:border-t not-md:border-white not-md:pt-5'>
                        <img src={logo.src} alt="logo" className={'w-60'} />
                        <p className='mt-2'>administrativo@ritterveiculos.com.br</p>
                        <p className='mt-2'>atendimento@ritterveiculos.com.br</p>
                    </div>
                    <div className='not-md:mt-5 not-md:border-t not-md:border-white not-md:pt-5'>
                        <h2>Contatos</h2>
                        <p>51 99952-2616</p>

                        <p>51 99980-1614</p>
                        <p className='relative bottom-1 '>&copy; {new Date().getFullYear()} Ritter Veículos. Todos os direitos reservados.</p>

                    </div>
                    <div className='not-md:mt-5 not-md:border-t not-md:border-white not-md:pt-5'>
                        <h2>Localização e Horários</h2>
                        <p>Av. Flores da Cunha, nº 1140, Parada 50</p>
                        <p>Canoas - RS</p>
                        <p>Horários de Atendimento</p>
                        <p>Segunda à Sexta</p>
                        <p>Das 8:30 às 18:30</p>
                        <p>Sábados</p>
                        <p>Das 8:30 às 16:30</p>

                    </div>
                </div>

            </div>

        </footer>
    );
};
