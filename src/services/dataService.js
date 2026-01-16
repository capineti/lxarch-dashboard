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
    topic: 'Coaching AI | Revisión de Metodología LXArch',
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
    },
    qualitativeAnalysis: {
        title: "EVALUACIÓN DETALLADA",
        sections: [
            { title: "1. Estructura de la Reunión (20%)", score: "15/20", content: "Lucía siguió la mayoría de las etapas del guión, comenzando con una buena conexión y encuadre. Sin embargo, la transición a la oferta y el cierre no fueron tan claros, lo que podría haber llevado a una decisión más rápida por parte de Jaime." },
            { title: "2. Filosofía de Venta (20%)", score: "16/20", content: "Lucía mostró empatía y escuchó activamente a Jaime, validando sus preocupaciones. Sin embargo, en algunos momentos, la conversación se desvió hacia anécdotas personales, lo que podría haber restado foco a la propuesta de valor." },
            { title: "3. Técnicas de Descubrimiento (20%)", score: "17/20", content: "Lucía hizo preguntas efectivas para descubrir los dolores y necesidades de Jaime. Sin embargo, podría haber profundizado más en la urgencia de su situación para motivar una decisión más rápida." },
            { title: "4. Manejo de Objeciones (15%)", score: "12/15", content: "Lucía manejó bien las objeciones relacionadas con el precio y la necesidad de tiempo, pero no abordó de manera proactiva la objeción sobre la falta de clientes, lo que podría haber reforzado su propuesta." },
            { title: "5. Presentación del Programa (15%)", score: "14/15", content: "La presentación del programa fue clara y adaptada a las necesidades de Jaime. Lucía explicó bien los beneficios y la estructura del programa, aunque podría haber enfatizado más el diferencial de PRO1." },
            { title: "6. Cierre y Próximos Pasos (10%)", score: "6/10", content: "Lucía intentó cerrar la venta, pero no fue lo suficientemente firme en la urgencia de la decisión. Aunque ofreció opciones de pago, no logró concretar el cierre en la llamada." }
        ],
        strengths: [
            { title: "Conexión inicial efectiva", content: "Lucía estableció una buena relación desde el principio, lo que generó confianza." },
            { title: "Escucha activa", content: "Mostró interés genuino en las preocupaciones de Jaime, lo que ayudó a identificar sus necesidades." },
            { title: "Presentación clara del programa", content: "Explicó bien la estructura y los beneficios del programa, alineándolos con las necesidades de Jaime." }
        ],
        improvements: [
            {
                id: 1,
                title: "Cierre más firme",
                content: {
                    missing: "Lucía no fue lo suficientemente directa en el cierre, lo que permitió que Jaime se sintiera cómodo posponiendo la decisión. No se enfatizó la urgencia de la oferta.",
                    todo: "Al final de la reunión, Lucía debe preguntar directamente: \"¿Estás listo para asegurar tu plaza y comenzar a trabajar en tu estrategia?\" y resaltar que el precio y los beneficios son limitados en el tiempo.",
                    why: "Un cierre más firme puede aumentar la tasa de conversión y reducir la posibilidad de que el cliente se lo piense demasiado.",
                    exercise: "Practicar el cierre en simulaciones de ventas, enfocándose en preguntas directas y urgentes."
                }
            },
            {
                id: 2,
                title: "Profundizar en la urgencia",
                content: {
                    missing: "Lucía no exploró suficientemente la urgencia de Jaime para resolver su situación actual, lo que podría haber motivado una decisión más rápida.",
                    todo: "Preguntar: \"¿Qué pasaría si no tomas acción ahora? ¿Cómo afectaría eso a tu negocio en los próximos meses?\"",
                    why: "Entender la urgencia puede motivar al cliente a actuar rápidamente, aumentando las posibilidades de cierre.",
                    exercise: "Crear una lista de preguntas que profundicen en la urgencia y practicar su uso en reuniones simuladas."
                }
            },
            {
                id: 3,
                title: "Enfocar la conversación en el valor del programa",
                content: {
                    missing: "Aunque Lucía presentó el programa, no enfatizó suficientemente el valor único que ofrece PRO1 en comparación con otras opciones.",
                    todo: "Incluir una sección en la presentación donde se comparen los resultados de PRO1 con otras formaciones, destacando casos de éxito específicos.",
                    why: "Resaltar el valor diferencial puede ayudar a justificar la inversión y aumentar la confianza del cliente en la decisión.",
                    exercise: "Preparar una presentación que incluya comparaciones de resultados y testimonios de clientes exitosos."
                }
            }
        ],
        conclusion: "Lucía mostró un buen desempeño en la reunión, estableciendo una conexión sólida y presentando el programa de manera efectiva. Sin embargo, debe mejorar en el cierre y en la profundización de la urgencia para maximizar las oportunidades."
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

const MOCK_CALLS = [
    { id: 101, client: 'Javier Mendez', date: '10/01/2026', status: 'Activo', nextMeeting: '15/01/2026 10:00 am', score: 85 },
    { id: 102, client: 'Constructora Norte', date: '08/01/2026', status: 'Cerrado', nextMeeting: '-', score: 92 },
    { id: 103, client: 'Estudio Alpha', date: '05/01/2026', status: 'Seguimiento', nextMeeting: '20/01/2026 04:00 pm', score: 78 },
    { id: 104, client: 'Inmobiliaria Sol', date: '02/01/2026', status: 'Activo', nextMeeting: '12/01/2026 11:30 am', score: 65 },
    { id: 105, client: 'Grupo Hexagon', date: '28/12/2025', status: 'Perdido', nextMeeting: '-', score: 40 },
    { id: 106, client: 'Arq. Luis P.', date: '20/12/2025', status: 'Activo', nextMeeting: '18/01/2026 09:00 am', score: 88 },
];

export const fetchVendorCalls = async (agentId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CALLS), 400);
    });
};
