'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flag, TrendingUp, ShieldCheck } from 'lucide-react';

interface Topic {
    title: string;
    paragraph: string;
    icon: React.ReactNode;
}

const topics: Topic[] = [
    {
        title: 'História',
        paragraph:
            'Desde 1997, a Ritter Veículos se consolidou no mercado por sua transparência e dedicação, conquistando a confiança de milhares de clientes.',
        icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
    },
    {
        title: 'Missão',
        paragraph:
            'Oferecer as melhores ofertas e condições, sempre focando na satisfação total do cliente e em negociações justas.',
        icon: <Flag className="w-12 h-12 text-green-500" />,
    },
    {
        title: 'Estratégia',
        paragraph:
            'Diversificação de estoque e inovação contínua para manter a liderança em variedade de veículos.',
        icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
    },
    {
        title: 'Valores',
        paragraph:
            'Comprometimento, respeito e excelência guiam cada passo, garantindo qualidade em tudo que fazemos.',
        icon: <ShieldCheck className="w-12 h-12 text-red-500" />,
    },
];

export default function AboutPage() {
    return (
        <section className="bg-gradient-to-b from-white to-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
                    Sobre a Ritter Veículos
                </h2>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {topics.map(({ title, paragraph, icon }, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex flex-col items-start p-8 bg-white rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
                                {icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {paragraph}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}