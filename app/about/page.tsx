import React from 'react';
import DOMPurify from "dompurify";
import { cn } from '@/lib/utils';

interface TopicosProps {
    title: string;
    paragraph: string;
    bg?: string;
}

const Topicos: TopicosProps[] = [
    {
        title: "História",
        paragraph: "Fundada em 15/08/1997 a Ritter Veículos Ltda originou-se devido ao ideal de um jovem empresário determinado a ter uma empresa voltada para a comercialização de veículos séria, respeitadora e preocupada com a satisfação total de seus clientes.",
        bg: '/topics/img/history.jpg'
    },
    {
        title: "Missão",
        paragraph: "A Ritter Veículos tem como objetivo oferecer as melhores ofertas e condições do mercado, com a certeza de realizar sempre uma negociação bilateral, obtendo assim a satisfação cliente-empresa.",
        bg: '/topics/img/mission.jpg'
    },
    {
        title: "Estratégia",
        paragraph: "Com estoque bem diversificado, a Ritter Veículos dispõe da mais ampla variedade de marcas, modelos, cores e faixa de preços de veículos nacionais, importados, usados, semi-novos e zero Km.",
        bg: '/topics/img/estrategies.jpg'
    },
    {
        title: "Valores",
        paragraph: "Organização, profissionalismo e respeito ao cliente, são os parâmetros que sempre nortearam a Ritter Veículos, com o objetivo de imprimir qualidade em tudo que faz. Hoje estamos colhendo os frutos de nossa maior conquista, que são os milhares de clientes e amigos que já negociaram conosco. Procure um membro de nossa equipe e junte-se à nós.",
        bg: '/topics/img/values.jpg'
    },
]

export default function AboutPage() {
    return <div className=" flex flex-col items-center justify-center ">
        <div className="container flex flex-col items-center justify-center p-5 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Topicos.map(({ title, paragraph, bg }, index) => (
                    <div key={index} className={`flex flex-col rounded-xl shadow-xl bg-white`}>
                        <div className="overflow-auto rounded-lg backdrop-sepia-50">
                            <div className="mx-auto h-100 overflow-y-scroll border-x border-x-gray-200 bg-cover bg-[center_-100px] " style={{ backgroundImage: `url(${bg})` }}>
                                <div className="mt-65">
                                    <div className="border-x border-x-gray-200 p-4 text-white sm:p-8 min-h-85 bg-gray-500">
                                        <div className="font-inter text-2xl font-bold tracking-tight ">
                                            {title}
                                        </div>
                                        <p className="mt-4 font-light text-xl leading-7">{paragraph}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </div>
};
