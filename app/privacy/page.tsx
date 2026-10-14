
import type { Metadata } from 'next';
import {
    Cookie,
    Database,
    ExternalLink,
    LockKeyhole,
    ShieldCheck,
    UserRound,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Ritter Veículos',
    description:
        'Conheça as práticas de privacidade da Ritter Veículos, o tratamento de dados pessoais e os direitos previstos na LGPD.',
};

const sections = [
    {
        title: 'Dados pessoais tratados',
        icon: Database,
        content: (
            <>
                <p>
                    Durante a navegação, podem ser tratados dados técnicos
                    necessários ao funcionamento e à segurança do site, como
                    endereço IP, data e horário de acesso e informações do
                    navegador, conforme os registros mantidos pela infraestrutura.
                </p>
                <p>
                    Caso você entre em contato com a Ritter Veículos por
                    WhatsApp ou e-mail, poderemos receber informações que decidir
                    compartilhar, como nome, telefone, endereço de e-mail e
                    detalhes da sua solicitação.
                </p>
            </>
        ),
    },
    {
        title: 'Finalidade do tratamento',
        icon: ShieldCheck,
        content: (
            <>
                <p>
                    Os dados pessoais são tratados, conforme aplicável, para
                    disponibilizar o catálogo de veículos, responder a consultas,
                    prestar atendimento comercial, manter o funcionamento e a
                    segurança do site e atender a obrigações legais.
                </p>
                <p>
                    O tratamento ocorre com fundamento nas hipóteses legais
                    previstas na Lei Geral de Proteção de Dados Pessoais
                    (Lei nº 13.709/2018 — LGPD), de acordo com cada finalidade.
                </p>
            </>
        ),
    },
    {
        title: 'Cookies e tecnologias semelhantes',
        icon: Cookie,
        content: (
            <>
                <p>
                    Este site não utiliza cookies para armazenar informações
                    sobre a navegação dos visitantes.
                </p>
                <p>
                    Caso sejam realizadas alterações futuras que envolvam o uso
                    de cookies ou tecnologias semelhantes, esta Política será
                    atualizada para refletir as práticas adotadas.
                </p>
            </>
        ),
    },
    {
        title: 'Compartilhamento de dados',
        icon: ExternalLink,
        content: (
            <>
                <p>
                    Os dados poderão ser tratados por prestadores de serviços
                    tecnológicos envolvidos na disponibilização, hospedagem
                    e segurança do site, quando necessário à sua operação.
                </p>
                <p>
                    Os links para serviços externos, como WhatsApp e plataformas
                    de mapas, direcionam você para ambientes administrados por
                    terceiros. Ao utilizá-los, o tratamento de dados também
                    estará sujeito às políticas desses serviços.
                </p>
            </>
        ),
    },
    {
        title: 'Armazenamento e segurança',
        icon: LockKeyhole,
        content: (
            <>
                <p>
                    Os dados pessoais são mantidos pelo período necessário
                    ao cumprimento das finalidades do tratamento, observadas
                    as obrigações legais e regulatórias e as demais hipóteses
                    de conservação previstas na legislação.
                </p>
                <p>
                    São adotadas medidas técnicas e administrativas de segurança
                    compatíveis com o tratamento realizado, com o objetivo de
                    proteger os dados pessoais contra acessos não autorizados,
                    perda, alteração, divulgação ou outras formas de tratamento
                    inadequado.
                </p>
            </>
        ),
    },
    {
        title: 'Seus direitos e contato',
        icon: UserRound,
        content: (
            <>
                <p>
                    Nos termos da LGPD, você pode solicitar, conforme aplicável,
                    confirmação da existência de tratamento, acesso e correção
                    de dados, informações sobre compartilhamento, eliminação
                    de dados nas hipóteses legais e exercício dos demais
                    direitos previstos na legislação.
                </p>
                <p>
                    Para dúvidas ou solicitações relacionadas à privacidade
                    e à proteção de dados pessoais, entre em contato pelo
                    e-mail{' '}
                    <a
                        href="mailto:administrativo@ritterveiculos.com.br"
                        className="font-semibold text-red-700 underline underline-offset-2 transition-colors hover:text-red-800"
                    >
                        administrativo@ritterveiculos.com.br
                    </a>
                    .
                </p>
                <p>
                    As solicitações serão analisadas conforme a legislação
                    aplicável e as circunstâncias de cada caso.
                </p>
            </>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <main className="bg-gradient-to-b from-white to-gray-100 py-16 sm:py-20">
            <div className="container mx-auto px-6">
                <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
                    <p className="mb-3 font-semibold uppercase tracking-widest text-red-700">
                        Ritter Veículos
                    </p>

                    <h1 className="mb-5 text-4xl font-bold text-gray-800 sm:text-5xl">
                        Política de Privacidade
                    </h1>

                    <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                        Transparência e responsabilidade no tratamento de
                        dados pessoais durante a utilização do nosso site
                        e dos nossos canais de atendimento.
                    </p>
                </header>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
                    {sections.map(({ title, icon: Icon, content }) => (
                        <section
                            key={title}
                            className="flex flex-col items-start rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-8"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                <Icon
                                    aria-hidden="true"
                                    className="h-7 w-7 text-red-700"
                                    strokeWidth={1.8}
                                />
                            </div>

                            <h2 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">
                                {title}
                            </h2>

                            <div className="space-y-3 leading-relaxed text-gray-600">
                                {content}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
