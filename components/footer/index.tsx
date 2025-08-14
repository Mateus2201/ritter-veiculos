import { MapPinned } from 'lucide-react';
import Link from 'next/link';
import WhatsappComponent from '../svg/whasapp';

interface FooterProps {
    logo: { src: string };
}

export default function Footer({ logo }: FooterProps) {
    return <footer className="bg-primary text-offWhite border-t border-black min-h-[40vh]">
        <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-start">
                    <img src={logo.src} alt="logo" className="w-48 mb-4" />
                    <p className="text-sm text-offWhite/80">
                        © {new Date().getFullYear()} Ritter Veículos. Todos os direitos reservados.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Contatos</h2>
                    <div className="space-y-2 text-sm">
                        <Link
                            href="https://api.whatsapp.com/send?phone=5551999522616"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <WhatsappComponent className='h-4 w-4' />

                            51 99952-2616
                        </Link>
                        <Link
                            href="https://api.whatsapp.com/send?phone=5551999801614"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <WhatsappComponent className='h-4 w-4' />

                            51 99980-1614
                        </Link>
                        <p className="flex items-center gap-2">administrativo@ritterveiculos.com.br</p>
                        <p className="flex items-center gap-2">atendimento@ritterveiculos.com.br</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Localização e Horários</h2>
                    <div className="space-y-2 text-sm">
                        <Link
                            href="https://maps.app.goo.gl/rr9GCB55vqECvaUL6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <MapPinned className="w-5 h-5" />
                            Av. Flores da Cunha, nº 1140, Parada 50 - Cachoeirinha - RS
                        </Link>
                        <p>Horários de Atendimento</p>
                        <p>Segunda à Sexta: 8:30 às 18:30</p>
                        <p>Sábados: 9:00 às 16:00</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
