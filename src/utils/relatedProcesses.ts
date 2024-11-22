const RelatedProcesses = [
  {
    code: 'framework',
    title: 'Primera etapa de un acuerdo marco',
    description:
      'Este proceso de contratación sigue un proceso relacionado para establecer un marco. Los proveedores del marco se listan en la sección de adjudicación del proceso relacionado.',
  },
  {
    code: 'planning',
    title: 'Proceso de planeación',
    description:
      'Este proceso de contratación sigue del proceso de planeación relacionado.',
  },
  {
    code: 'parent',
    title: 'Contrato principal (para sub contratos)',
    description:
      'El proceso de contrataciones puede resultar en una sub-contratación del proceso relacionado.',
  },
  {
    code: 'prior',
    title: 'Proceso previo',
    description:
      'Este proceso de contratación es la renovación o sustitución de un proceso previo relacionado.',
  },
  {
    code: 'unsuccessfulProcess',
    title: 'Proceso sin éxito',
    description:
      'Este proceso de contratación sigue un proceso previo sin éxito.',
  },
  {
    code: 'subContract',
    title: 'Sub contrato',
    description:
      'El proceso relacionado puede resultar en una sub-contratación de este contrato.',
  },
  {
    code: 'replacementProcess',
    title: 'Proceso de reemplazo',
    description:
      'El proceso relacionado puede resultar en el reemplazo de este contrato.',
  },
  {
    code: 'renewalProcess',
    title: 'Proceso de renovación',
    description:
      'El proceso relacionado puede resultar en la renovación de este contrato.',
  },
];

export default RelatedProcesses;
