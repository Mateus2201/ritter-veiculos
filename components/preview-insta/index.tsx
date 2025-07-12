import React from 'react'
import preview from '@/src/preview/insta.png';
import Image from 'next/image';

export default function PreviewInsta() {
    return <section className="bg-black text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 w-[300px] sm:w-[360px]">
                    <Image
                        src={preview}
                        alt="Post do Instagram"
                        className="w-full h-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Nos acompanhe no Instagram</h2>
                <p className="text-lg text-white/80 mb-2">
                    Veja as últimas novidades e bastidores da loja.
                </p>
                <p className="text-red-600 font-medium text-lg">#ritterveiculos</p>
                <a
                    href="https://www.instagram.com/ritterveiculos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:text-white hover:bg-red-700 transition"
                >
                    Ver no Instagram
                </a>
            </div>
        </div>
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-4">Nossa localização</h3>
            <div className="w-full h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9640002696387!2d-51.101781100000004!3d-29.9517141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197151431ac6dd%3A0xc6d7a9bb3bc83ddd!2sRitter%20Ve%C3%ADculos%20Ltda.!5e0!3m2!1spt-BR!2sbr!4v1752273699134!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

            </div>
        </div>
    </section>
}
