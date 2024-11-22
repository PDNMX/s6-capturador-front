const PartyRole = [
  {
    code: 'buyer',
    title: 'Entidad o Ente público que realiza el proceso de contratación',
    description:
      'Un comprador es una entidad cuyo presupuesto se utilizará para pagar bienes, obras o servicios relacionados con un contrato.',
  },
  {
    code: 'procuringEntity',
    title: 'Entidad contratante',
    description:
      'La entidad administrando la compra. Esto puede ser diferente del comprador que paga, o usa, los artículos que se están comprando.',
  },
  {
    code: 'supplier',
    title: 'Proveedor',
    description:
      'Una entidad adjudicada o contratada para dar bienes, trabajos o servicios.',
  },
  {
    code: 'tenderer',
    title: 'Licitante',
    description: 'Todas las entidades que hacen una oferta.',
  },
  {
    code: 'funder',
    title: 'Financiador',
    description:
      'El financiador es una entidad que provee dinero o financia este proceso de contratación.',
  },
  {
    code: 'enquirer',
    title: 'Persona que solicita información',
    description:
      'Una parte que ha realizado un pedido de información durante la fase de solicitudes de información de un proceso de contratación.',
  },
  {
    code: 'payer',
    title: 'Pagador',
    description: 'Una parte hace un pago de una transacción.',
  },
  {
    code: 'payee',
    title: 'Beneficiario',
    description: 'Una parte en recepción del pago de una transacción.',
  },
  {
    code: 'reviewBody',
    title: 'Órgano de revisión',
    description:
      'Una parte responsable de la revisión de este proceso de adquisición. Esta parte tiene a menudo un papel en cualquier cuestionamiento hecho a la adjudicación del contrato.',
  },
  {
    code: 'interestedParty',
    title: 'Parte interesada',
    description:
      'Una parte que ha expresado interés en el proceso de contrataciones, por ejemplo, al comprar documentos de oferta o presentar preguntas de clarificación.',
  },
];

export default PartyRole;
