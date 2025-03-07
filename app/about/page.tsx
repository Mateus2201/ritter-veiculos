import React from 'react';
import DOMPurify from "dompurify";

interface TopicosProps {
    title: string;
    paragraph: string
}

const Topicos: TopicosProps[] = [
    {
        title: "História",
        paragraph: "Fundada em 15/08/1997 a Ritter Veículos Ltda originou-se devido ao ideal de um jovem empresário determinado a ter uma empresa voltada para a comercialização de veículos séria, respeitadora e preocupada com a satisfação total de seus clientes."
    },
    {
        title: "Missão",
        paragraph: "A Ritter Veículos tem como objetivo oferecer as melhores ofertas e condições do mercado, com a certeza de realizar sempre uma negociação bilateral, obtendo assim a satisfação cliente-empresa."
    },
    {
        title: "Estratégia",
        paragraph: "Com estoque bem diversificado, a Ritter Veículos dispõe da mais ampla variedade de marcas, modelos, cores e faixa de preços de veículos nacionais, importados, usados, semi-novos e zero Km."
    },
    {
        title: "Valores",
        paragraph: "Organização, profissionalismo e respeito ao cliente, são os parâmetros que sempre nortearam a Ritter Veículos, com o objetivo de imprimir qualidade em tudo que faz. Hoje estamos colhendo os frutos de nossa maior conquista, que são os milhares de clientes e amigos que já negociaram conosco. Procure um membro de nossa equipe e junte-se à nós."
    },
]

export default function About() {
    return (
        <div className="min-h-screen bg-stone-900">
            <div className="container mx-auto p-8 flex flex-col justify-center bg-stone-800 h-screen">
                {Topicos.map(({ title, paragraph }) => <div className='flex flex-col items-center'>
                    <h1 className='text-white text-5xl font-bold p-5'>{title}</h1>
                    <p className='text-white text-2xl font-semibold text-center'>{paragraph}</p>
                </div>)}
            </div>
        </div>
    );
};
