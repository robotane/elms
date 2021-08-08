const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const filiereData = [
    {
        nom: 'MPI',
        description:
            "Filiere de l'UFR ST qui etudie les maths, la physique et l'informatique.",
        ufr: 'ST',
        semestres: {
            create: [
                {
                    nom: 'S1',
                    description: 'Premier semestre de MPI',
                    promotions: {
                        create: [
                            {
                                nom: 'MPI 2016',
                                annee: '2016',
                            },
                        ],
                    },
                    modules: {
                        create: [
                            {
                                nom: 'Algebre',
                                description: "Module d'algebre",
                                coefficient: 6,
                            },
                            {
                                nom: 'Analyse',
                                description: "Module d'Analyse",
                                coefficient: 6,
                            },
                            {
                                nom: 'Physique',
                                description: 'Module de physique',
                                coefficient: 6,
                            },
                            {
                                nom: 'Informatique',
                                description: "Module d'informatique",
                                coefficient: 6,
                            },
                            {
                                nom: 'Anglais',
                                description: "Module d'anglais",
                                coefficient: 2,
                            },
                            {
                                nom: 'Logique',
                                description: 'Module de logique',
                                coefficient: 2,
                            },
                        ],
                    },
                },
                {
                    nom: 'S2',
                    description: 'Deuxieme semestre de MPI',
                    promotions: {
                        create: [
                            {
                                nom: 'MPI 2015',
                                annee: '2015',
                            },
                        ],
                    },
                    modules: {
                        create: [
                            {
                                nom: 'Algebre',
                                description: "Module d'algebre",
                                coefficient: 6,
                            },
                            {
                                nom: 'Analyse',
                                description: "Module d'Analyse",
                                coefficient: 6,
                            },
                            {
                                nom: 'Mecanique Generale',
                                description: 'Module de mecanique generale',
                                coefficient: 6,
                            },
                            {
                                nom: 'Informatique',
                                description: "Module d'informatique",
                                coefficient: 6,
                            },
                            {
                                nom: 'Statistique',
                                description: 'Module de statistique',
                                coefficient: 3,
                            },
                            {
                                nom: 'Atomistique',
                                description: "Module d'atomistique",
                                coefficient: 3,
                            },
                        ],
                    },
                },
            ],
        },
    },
    {
        nom: 'SB',
        description: "Filiere de l'UFR ST qui etudie les Sciences Biologiques.",
        ufr: 'ST',
        semestres: {
            create: [
                {
                    nom: 'S1',
                    description: 'Premier semestre de SB',
                    promotions: {
                        create: [
                            {
                                nom: 'SB 2018',
                                annee: '2018',
                            },
                        ],
                    },
                    modules: {
                        create: [
                            {
                                nom: 'Algebre',
                                description: "Module d'algebre",
                                coefficient: 6,
                            },
                            {
                                nom: 'Analyse',
                                description: "Module d'Analyse",
                                coefficient: 6,
                            },
                            {
                                nom: 'Physique',
                                description: 'Module de physique',
                                coefficient: 6,
                            },
                            {
                                nom: 'Biologie',
                                description: 'Module de biologie',
                                coefficient: 6,
                            },
                            {
                                nom: 'Anglais',
                                description: "Module d'anglais",
                                coefficient: 2,
                            },
                            {
                                nom: 'Botanique',
                                description: 'Module de botanique',
                                coefficient: 2,
                            },
                        ],
                    },
                },
                {
                    nom: 'S2',
                    description: 'Deuxieme semestre de SB',
                    promotions: {
                        create: [
                            {
                                nom: 'SB 2016',
                                annee: '2016',
                            },
                        ],
                    },
                    modules: {
                        create: [
                            {
                                nom: 'Chimie Organique',
                                description: 'Module de Chimie Organique',
                                coefficient: 6,
                            },
                            {
                                nom: 'Analyse',
                                description: "Module d'Analyse",
                                coefficient: 6,
                            },
                            {
                                nom: 'Physique',
                                description: 'Module de physique',
                                coefficient: 6,
                            },
                            {
                                nom: 'Biologie',
                                description: 'Module de biologie',
                                coefficient: 6,
                            },
                            {
                                nom: 'Anglais',
                                description: "Module d'anglais",
                                coefficient: 2,
                            },
                            {
                                nom: 'Botanique',
                                description: 'Module de botanique',
                                coefficient: 2,
                            },
                        ],
                    },
                },
            ],
        },
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const f of filiereData) {
        const data = await prisma.filiere.create({
            data: f,
        });
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
