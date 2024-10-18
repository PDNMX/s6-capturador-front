const ContractStatus = [
  {
    code: 'pending',
    title: 'Pendiente',
    description:
      'Este contrato se propuso pero aún no entra en vigor. Puede estar esperando ser firmado.',
  },
  {
    code: 'active',
    title: 'Activo',
    description:
      'Este contrato se ha firmado por todas las partes y ahora está legalmente en proceso.',
  },
  {
    code: 'cancelled',
    title: 'Cancelado',
    description: 'Este contrato se canceló antes de ser firmado.',
  },
  {
    code: 'terminated',
    title: 'Terminado',
    description:
      'Este contrato se firmo y entro en vigor, ahora esta cerca de cerrarse. Esto puede ser debido a la terminación exitosa del contrato, o puede ser una terminación temprana debido a que no fue finalizado.',
  },
];

export default ContractStatus;
