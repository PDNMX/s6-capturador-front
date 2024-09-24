const TenderStatus = [
  {
    code: 'planning',
    title: 'Planeación',
    description:
      'Un proceso de contrataciones futuro que se está considerando. Información temprana sobre el proceso se puede dar en la sección de licitación. Un proceso con este estado puede dar información sobre un compromiso temprano u oportunidades de consulta, durante los cuales los detalles de la próxima licitación pueden formarse.',
  },
  {
    code: 'planned',
    title: 'Planeado',
    description:
      'Un proceso de contratación está programado, pero aún no se ha llevado a cabo. Los detalles de las fechas anticipadas pueden proveerse en el bloque de licitación.',
  },
  {
    code: 'active',
    title: 'Activo',
    description: 'Un proceso de licitación está en proceso.',
  },
  {
    code: 'cancelled',
    title: 'Cancelado',
    description: 'El proceso de licitación ha sido cancelado.',
  },
  {
    code: 'unsuccessful',
    title: 'Sin Éxito',
    description: 'El proceso de licitación no fue exitoso.',
  },
  {
    code: 'complete',
    title: 'Completo',
    description: 'El proceso de licitación está completo.',
  },
  {
    code: 'withdrawn',
    title: 'Retirado',
    description:
      'No hay más información disponible sobre este proceso bajo este ocid.',
  },
];

export default TenderStatus;
