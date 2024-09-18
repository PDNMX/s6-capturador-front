const SubmissionMethod = [
  {
    code: 'electronicSubmission',
    title: 'Presentación electrónica',
    description:
      'Las ofertas se recibirán a través de una plataforma electrónica de adquisiciones.',
  },
  {
    code: 'electronicAuction',
    title: 'Subasta electrónica',
    description:
      'Las ofertas se recibirán a través de una plataforma electrónica de subasta.',
  },
  {
    code: 'written',
    title: 'Escrita',
    description:
      'Las ofertas se recibirán via documentos escritos, entregados como copias físicas, via sistemas de correo electrónico genérico o algún mecanismo similar.',
  },
  {
    code: 'inPerson',
    title: 'En persona',
    description:
      'Las ofertas sólo se recibirán si se entregan en persona en el tiempo y hora especificada en submissionMethodDetails o la documentación adjunta.',
  },
];

export default SubmissionMethod;
