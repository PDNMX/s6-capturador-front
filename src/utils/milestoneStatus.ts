const MilestoneStatus = [
  {
    code: 'scheduled',
    title: 'Hitos previos a la contratación',
    description:
      'Para eventos durante la fase de planificación o pre-adquisición de un proceso, como la preparación de estudios clave.',
  },
  {
    code: 'met',
    title: 'Hitos de aprobación',
    description: 'Para eventos como la firma de un contrato o proyecto.',
  },
  {
    code: 'notMet',
    title: 'Hitos de participación',
    description:
      'Para hitos de participación, tales como una audiencia pública.',
  },
  {
    code: 'partiallyMet',
    title: 'Hitos de la evaluación',
    description:
      'Para hitos de evaluación y adjudicación, tales como la fecha de reunión de un comité.',
  },
];

export default MilestoneStatus;
