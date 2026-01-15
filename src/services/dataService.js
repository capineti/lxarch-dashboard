// Mock Data Service
// This mimics the structure we expect from n8n

const MOCK_AGENTS = [
    { id: 1, name: 'Sofía Martínez', progress: 82.3, status: 'En proceso', nextFollowUp: '10/01/2026 11:00 am', image: 'https://i.pravatar.cc/150?u=sofia' },
    { id: 2, name: 'Carlos López', progress: 88, status: 'En proceso', nextFollowUp: '02/12/2024 09:00 am', image: 'https://i.pravatar.cc/150?u=carlos' },
    { id: 3, name: 'Valeria Fernández', progress: 82.3, status: 'En proceso', nextFollowUp: '03/12/2024 11:15 am', image: 'https://i.pravatar.cc/150?u=valeria' },
    { id: 4, name: 'Miguel Pérez', progress: 88, status: 'En proceso', nextFollowUp: '06/12/2024 10:45 am', image: 'https://i.pravatar.cc/150?u=miguel' },
    { id: 5, name: 'Laura Sánchez', progress: 70.4, status: 'En proceso', nextFollowUp: '09/12/2024 04:00 pm', image: 'https://i.pravatar.cc/150?u=laura' },
    { id: 6, name: 'David Romero', progress: 90, status: 'En proceso', nextFollowUp: '10/12/2024 08:20 am', image: 'https://i.pravatar.cc/150?u=david' },
    { id: 7, name: 'Elena Ruiz', progress: 70.4, status: 'En proceso', nextFollowUp: '12/12/2024 01:10 pm', image: 'https://i.pravatar.cc/150?u=elena' },
    { id: 8, name: 'Alejandro Castro', progress: 90, status: 'En proceso', nextFollowUp: '13/12/2024 03:50 pm', image: 'https://i.pravatar.cc/150?u=alejandro' },
    { id: 9, name: 'Ana Gómez', progress: 78, status: 'En proceso', nextFollowUp: '16/12/2024 09:35 am', image: 'https://i.pravatar.cc/150?u=ana' },
    { id: 10, name: 'Pedro Díaz', progress: 68, status: 'En proceso', nextFollowUp: '18/12/2024 12:00 pm', image: 'https://i.pravatar.cc/150?u=pedro' },
    { id: 11, name: 'Pablo Vargas', progress: 78, status: 'En proceso', nextFollowUp: '20/12/2024 05:15 pm', image: 'https://i.pravatar.cc/150?u=pablo' },
    { id: 12, name: 'Sergio Gil', progress: 68, status: 'En proceso', nextFollowUp: '23/12/2024 07:55 am', image: 'https://i.pravatar.cc/150?u=sergio' },
];

const MOCK_ANALYSIS_DETAIL = {
    vendor: 'Sofía Martínez',
    client: 'Cliente',
    role: 'Vendedor',
    date: '25/12/2025',
    topic: 'Coaching IA | Revisión de Metodología LXArch',
    summary: {
        interest: 88,
        status: 'En proceso',
        nextStep: 'Próximo seguimiento',
        nextDate: '10/01/2026 11:00 am'
    },
    phases: [
        { name: 'Conexión', pct: 15, color: 'blue' },
        { name: 'Análisis', pct: 45, color: 'orange' },
        { name: 'Oferta', pct: 30, color: 'orange-red' },
        { name: 'Cierre', pct: 10, color: 'grey' }
    ],
    kpis: [
        { label: 'Duda en Oferta', value: '12 %', barValue: 12 },
        { label: 'Escucha activa', value: '0.8 seg', barValue: 30 },
        { label: 'Guión cubierto', value: '95 %', barValue: 95 }
    ],
    diagnosis: {
        result: 'Oportunidad Activa',
        topFailures: [
            '1. Ovidó: Pregunta para evitar objecciones',
            '2. Insuficiente: No profundizó en "dolores clave".',
            '3. Tono: No mantuvo el tono "experto" al final de la oferta.'
        ],
        instruction: {
            target: 'Sofía Cáceres',
            issue: 'La IA detectó una baja profundidad de dolor (55%) y un alto nivel de miedo o duda del cliente durante el cierre. Esto indica una falla en la etapa 2.',
            actions: [
                '1. Revisa la grabación entre los minutos [12:30] y [15:00]. Observa cómo el cliente menciona "la dificultad de implementar un cambio".',
                '2. Práctica: En la próxima llamada, aplica la técnica de la Doble Pregunta Profunda para descubrir el costo de no cambiar.',
                '3. Objetivo: Elevar el puntaje de Detección de Dudas Internas por encima del 70%.'
            ]
        }
    }
};

// Returns a promise to simulate async fetching
export const fetchAgents = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_AGENTS), 500); // 500ms delay to feel "real"
    });
};

export const fetchAnalysis = async (agentId) => {
    return new Promise((resolve) => {
        // In future this would fetch specific analysis for agentId
        setTimeout(() => resolve(MOCK_ANALYSIS_DETAIL), 500);
    });
};
