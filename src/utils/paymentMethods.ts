const PaymentMethods = [
  {
    code: 'cash',
    title: 'Efectivo',
    description: 'El pago asociado con este contrato se realizó en efectivo.',
  },
  {
    code: 'check',
    title: 'Cheque',
    description: 'El pago asociado con este contrato se realizó mediante cheque.',
  },
  {
    code: 'wireTransfer',
    title: 'Transferencia bancaria',
    description: 'El pago asociado con este contrato se realizó mediante una transferencia bancaria.',
  },
  {
    code: 'corporateCard',
    title: 'Tarjeta corporativa',
    description: 'El pago asociado con este contrato se realizó con una tarjeta de crédito corporativa. Generalmente se utiliza para comprar bienes y servicios.',
  },
  {
    code: 'letterOfCredit',
    title: 'Carta de crédito',
    description: 'El pago asociado con este contrato se realizó mediante una carta de crédito. Las cartas de crédito garantizan el pago bajo términos estrictos.',
  },
];

export default PaymentMethods;