const AwardStatus = [
  {
    code: 'pending',
    title: 'Pendiente',
    description:'Esta adjudicación se ha propuesto pero no ha entrado en vigor. Esto puede ser por un período de reflexión o algún otro proceso.',
  },
  {
    code: 'active',
    title: 'Activo',
    description: 'Se ha adjudicado y está en proceso.',
  },
  {
    code: 'cancelled',
    title: 'Cancelado',
    description: 'Esta adjudicación se ha cancelado.',
  },
  {
    code: 'unsuccessful',
    title: 'Sin Éxito',
    description:'Esa adjudicación no pudo realizarse exitosamente. Si los artículos o detalles del proveedor se incluyen en la sección de adjudicación, estos limitan el alcance de la licitación fallida (e.j. si la adjudicación de artículos notados o una adjudicación al proveedor notado no fue exitosa, pero puede haber otras adjudicaciones exitosas para diferentes artículos en la oferta, o para distintos proveedores).',
  },
];

export default AwardStatus;

