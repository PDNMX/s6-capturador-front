const AwardCriteria = [
  {
    code: 'priceOnly',
    title: 'Binario',
    description:
      'La adjudicación se otorgará a la oferta calificada con el precio más bajo.',
    obsoleto: false,
  },
/*   {
    code: 'costOnly',
    title: 'Únicamente costo',
    description:
      'La adjudicación se otorgará a la oferta calificada que demuestre el costo más bajo en general. Una evaluación de costos puede cubrir todas las implicaciones monetarias de la propuesta, incluyendo el precio pagado al proveedor y los costos actuales, cambiando costos u otros costos que no tienen que ver con el precio al elegir una opción en particular.',
    obsoleto: false,
  }, */
/*   {
    code: 'qualityOnly',
    title: 'Únicamente calidad',
    description:
      'La adjudicación se otorgará a la oferta calificada que muestra la calidad más alta contra algún método de evaluación. El precio es fijo o con un fijo máximo y sin incluir factores de precio en la evaluación.',
    obsoleto: false,
  }, */
  {
    code: 'ratedCriteria',
    title: 'Puntos y porcentajes',
    description:
      'La adjudicación se otorgará a la oferta calificada que demuestre el valor más alto contra una serie de criterios como precio, costo y calidad (incluyendo, por ejemplo, el impacto social y ambiental de la compra). Se puede proveer información estructurada sobre los criterios individuales de calificación con la extensión de requerimientos.',
    obsoleto: false,
  },
  {
    code: 'singleBidOnly',
    title: 'Única oferta',
    description:
      'La adjudicación se otorgará a la oferta calificada que demuestre el valor más alto contra una serie de criterios como precio, costo y calidad (incluyendo, por ejemplo, el impacto social y ambiental de la compra). Se puede proveer información estructurada sobre los criterios individuales de calificación con la extensión de requerimientos.',
    obsoleto: false,
  },
/*   {
    code: 'lowestCost',
    title: 'Costo más bajo',
    description:
      'Este código es obsoleto. Por favor elige alguno de los otros códigos.',
    obsoleto: true,
  }, */
/*   {
    code: 'bestProposal',
    title: 'Mejor propuesta',
    description:
      'Este código es obsoleto. Por favor elige alguno de los otros códigos.',
    obsoleto: true,
  }, */
  {
    code: 'bestValueToGovernment',
    title: 'Costo beneficio',
    description:
      'La adjudicación se otorgará a la oferta calificada que demuestre, que puede ser medible y comprobable, considerando los conceptos que serán objeto de evaluación, tales como mantenimiento, operación, consumibles, rendimiento u otros elementos, vinculados con el factor de temporalidad o volumen de consumo.',
    obsoleto: false,
  },
/*   {
    code: 'bestValueToGovernment',
    title: 'Oferta única solamente',
    description:
      'Este código es obsoleto. Por favor elige alguno de los otros códigos',
    obsoleto: true,
  }, */
];

export default AwardCriteria;
