const DocumentType = [
  {
    category: 'basic',
    section: 'planning',
    code: 'plannedProcurementNotice',
    title: 'Aviso de compra planeada',
    description:
      'Es un registro en donde se da a conocer el proceso en el que se anticipa, organiza y coordina la adquisición del bien, servicios u obra.',
  },
  {
    category: 'basic',
    section: 'planning',
    code: 'areaTechnicalAnnex',
    title: 'Anexo técnico del Área',
    description:
      'Documento que forma parte del procedimiento de licitación o contratación. Contiene especificaciones técnicas detalladas, requisitos y condiciones que los proveedores o prestadores de servicios deben cumplir para participar en el proceso de adquisición.',
  },
  {
    category: 'basic',
    section: 'planning',
    code: 'marketResearch',
    title: 'Investigación de mercado',
    description:
      'Procedimiento que realiza la unidad compradora antes de iniciar un proceso de contratación pública. Su objetivo es identificar las condiciones existentes en el mercado, tales como precios, proveedores disponibles, características técnicas de los bienes o servicios, tiempos de entrega, y demás elementos que permitan planear y sustentar adecuadamente la contratación.',
  },
  {
    category: 'basic',
    section: 'planning',
    code: 'budgetAuthorization',
    title: 'Autorización presupuestal',
    description:
      'Acto administrativo mediante el cual la unidad responsable del presupuesto verifica y aprueba que existan recursos económicos disponibles y suficientes para llevar a cabo una contratación pública. Este procedimiento garantiza que el gasto proyectado esté alineado con el presupuesto autorizado, conforme a la normatividad aplicable, y que se cuente con el respaldo financiero necesario antes de comprometer recursos del erario público.',
  },
  {
    category: 'basic',
    section: 'tender',
    code: 'tenderNotice',
    title: 'Aviso de licitación',
    description:
      'El aviso publicado por la entidad procuradora invitando a proveedores interesados a presentar una solicitud para participar, una oferta o ambas. Esto puede ser un link a un documento descargable, una página web, o una gaceta oficial en donde se encuentra el aviso.',
  },
  {
    category: 'basic',
    section: 'award',
    code: 'awardNotice',
    title: 'Aviso de adjudicación',
    description:
      'El aviso formal que da detalles sobre la adjudicación del contrato. Esto puede ser un link a un documento descargable, una página web, o una gaceta oficial en donde se encuentra el aviso.',
  },
  {
    category: 'basic',
    section: 'contract',
    code: 'contractNotice',
    title: 'Aviso de contrato',
    description:
      'El aviso formal que da detalles sobre un contrato ya firmado y válido para empezar la implementación. Esto puede ser un link a un documento descargable, una página web, o una gaceta oficial en donde se encuentra el aviso.',
  },
  {
    category: 'basic',
    section: 'implementation',
    code: 'completionCertificate',
    title: 'Certificado de terminación',
    description:
      'Un certificado de terminación emitido por una autoridad relevante que da evidencia sobre la finalización de los trabajos con cierto nivel de calidad. Los certificados de terminación pueden solo ser relevantes para procesos de contrataciones particulares.',
  },
  {
    category: 'basic',
    section: 'planning',
    code: 'procurementPlan',
    title: 'Plan de adquisiciones',
    description:
      'Documento en el que se establecen las estrategias y acciones relacionadas con la adquisición bienes, servicios y recursos humanos necesarios para llevar a cabo un proyecto.',
  },
  {
    category: 'basic',
    section: 'tender',
    code: 'biddingDocuments',
    title: 'Documentos de ofertas',
    description:
      'Documentación para proveedores potenciales, describiendo las metas del contrato (p.ej. bienes y servicios a contratar) y el proceso de envío de propuestas.',
  },
  {
    category: 'basic',
    section: 'tender',
    code: 'technicalSpecifications',
    title: 'Especificaciones técnicas',
    description:
      'Requisitos de oferta que: expliquen las características de los bienes o servicios por comprar, incluyendo calidad, rendimiento, seguridad, dimensiones, o procesos y métodos para su producción o abastecimiento; o que refieran a requisitos de terminología, símbolos, empaque, marcado o etiquetado, según se apliquen a un bien o servicio.',
  },
  {
    category: 'basic',
    section: 'tender',
    code: 'evaluationCriteria',
    title: 'Criterios de evaluación',
    description: 'Documentación sobre cómo se evaluarán las ofertas.',
  },
  {
    category: 'intermediate',
    section: 'tender',
    code: 'evaluationReports',
    title: 'Reporte de evaluación',
    description:
      'Documentación en la evaluación de ofertas y la aplicación de criterios de evaluación, incluyendo la justificación sobre la adjudicación.',
  },
  {
    category: 'intermediate',
    section: 'tender, award',
    code: 'contractDraft',
    title: 'Borrador de contrato',
    description: 'Un borrador o copia pro-forma del contrato.',
  },
  {
    category: 'intermediate',
    section: 'contract',
    code: 'contractSigned',
    title: 'Contrato firmado',
    description:
      'Una copia firmada del contrato. Considere dar una versión leíble por máquina (PDF original, Word o documentos en formato Open Document), y un documento separado para poner páginas firmadas y escaneadas cuando sea necesario.',
  },
  {
    category: 'intermediate',
    section: 'tender, award, contract',
    code: 'contractArrangements',
    title: 'Arreglos para finalizar un contrato',
    description: 'Documentación de los arreglos para terminar el contrato(s).',
  },
  {
    category: 'intermediate',
    section: 'tender, award, contract',
    code: 'contractSchedule',
    title: 'Calendario del contrato',
    description:
      'Cualquier documento que contenga términos adicionales, obligaciones o información relacionada con el contrato, tal como un calendario, apéndice, anexo, anexo o adición.',
  },
  {
    category: 'intermediate',
    section: 'implementation',
    code: 'physicalProgressReport',
    title: 'Reportes de progreso físico',
    description:
      'Documentación sobre el estado de la implementación, usualmente comparado con hitos clave.',
  },
  {
    category: 'intermediate',
    section: 'implementation',
    code: 'financialProgressReport',
    title: 'Reportes de progreso financiero',
    description:
      'Documentación que provee fechas y montos de pagos realizados (contra el monto total) y el origen de esos pagos, incluyendo excesos de costos, si los hay. Se pueden proveer versiones estructuradas de esta información a través de las transacciones de implementación del contrato.',
  },
  {
    category: 'intermediate',
    section: 'implementation',
    code: 'finalAudit',
    title: 'Auditoría final',
    description:
      'Documentación de una auditoría final llevada a cabo al final de la implementación de un contrato.',
  },
  {
    category: 'intermediate',
    section: 'tender',
    code: 'hearingNotice',
    title: 'Aviso de audiencia pública',
    description:
      'Documentación de cualquier audiencia que ocurrió como parte de la planeación de este proceso de contratación.',
  },
  {
    category: 'intermediate',
    section: 'planning',
    code: 'marketStudies',
    title: 'Estudios de mercado',
    description:
      'Es un registro del proceso sistemático de la recolección, análisis e interpretación de datos sobre un mercado (bien, producto o servicio).',
  },
  {
    category: 'intermediate',
    section: 'tender',
    code: 'eligibilityCriteria',
    title: 'Criterios de elegibilidad',
    description:
      'Documentos detallados sobre la elegibilidad de los licitantes.',
  },
  {
    category: 'intermediate',
    section: 'tender',
    code: 'clarifications',
    title: 'Aclaraciones a las preguntas de los licitantes',
    description:
      'Documentación que provee las respuestas a las cuestiones apuntadas en reuniones pre-ofertas o procesos de preguntas.',
  },
  {
    category: 'intermediate',
    section: 'tender',
    code: 'shortlistedFirms',
    title: 'Empresas preseleccionadas',
    description:
      'Documentación que provee información sobre las firmas preseleccionadas. Se pueden proveer versiones estructuradas de esta información usando la extensión de ofertas.',
  },
  {
    category: 'advanced',
    section: 'planning, implementation',
    code: 'environmentalImpact',
    title: 'Impacto medioambiental',
    description:
      'Es un expediente donde se analizan y describen las condiciones ambientales anteriores a la realización del proyecto con la finalidad de evaluar los impactos potenciales que la construcción y operación de dichas obras o la realización de las actividades podría causar al ambiente.',
  },
  {
    category: 'advanced',
    section: 'planning',
    code: 'assetAndLiabilityAssessment',
    title: 'Evaluación de los activos y responsabilidades del gobierno',
    description:
      'Es una minuta en la cual se da a conocer la planeación en la que se fijarán objetivos, metas, estrategias y prioridades; se asignarán recursos, responsabilidades y tiempos de ejecución, se coordinarán acciones y se evaluarán resultados.',
  },
  {
    category: 'advanced',
    section: 'planning',
    code: 'riskProvisions',
    title: 'Cláusulas para el manejo de riesgos y responsabilidades',
    description:
      'Clausulas para el manejo de riesgos y responsabilidades: Se asientan en el Contrato, la cuales son obligaciones contractuales entre los Actores.',
  },
  {
    category: 'advanced',
    section: 'award',
    code: 'winningBid',
    title: 'Oferta ganadora',
    description:
      'Documentación de la oferta ganadora, incluyendo, cuando aplique, una copia completa de la oferta recibida.',
  },
  {
    category: 'advanced',
    section: 'tender, award',
    code: 'complaints',
    title: 'Quejas y decisiones',
    description:
      'Documentación de cualquier queja recibida o decisiones en respuesta a dichas quejas.',
  },
  {
    category: 'advanced',
    section: 'contract',
    code: 'contractAnnexe',
    title: 'Anexos al contrato',
    description:
      'Copias de anexos y otra documentación de soporte relacionados con el contrato.',
  },
  {
    category: 'advanced',
    section: 'tender, contract',
    code: 'contractGuarantees',
    title: 'Garantías',
    description:
      'Documentación de garantías relacionadas con el proceso de contratación o el contrato.',
  },
  {
    category: 'advanced',
    section: 'contract',
    code: 'subContract',
    title: 'Subcontratos',
    description:
      'Documentación que detalla los subcontratos y/o provee una copia de los subcontratos. Donde haya datos de OCDS sobre los subcontratos, puede declararse usando el bloque de relatedProcess.',
  },
  {
    category: 'advanced',
    section: 'planning',
    code: 'needsAssessment',
    title: 'Evaluación de necesidades',
    description:
      'Evaluación de necesidades: Es un registro donde se exploran los requerimientos específicos del proyecto y las medidas que puede tomar para alcanzarlas.',
  },
  {
    category: 'advanced',
    section: 'planning',
    code: 'feasibilityStudy',
    title: 'Estudio de factibilidad',
    description:
      'Escrito donde se registra el análisis que se realiza para evaluar la viabilidad de un proyecto antes de implementarlo.',
  },
  {
    category: 'advanced',
    section: 'planning',
    code: 'projectPlan',
    title: 'Plan de proyecto',
    description:
      'Es un esquema que detalla los elementos clave necesarios para alcanzar los objetivos del proyecto, (objetivo, justificación, calendario, presupuesto, entre otros).',
  },
  {
    category: 'advanced',
    section: 'tender',
    code: 'billOfQuantity',
    title: 'Factura de cantidad',
    description:
      'Documentación que provee la información desglosada de materiales, partes y mano de obra y los términos y condiciones para su provisión, dando información que permitirá a los licitadores dar efectivamente un precio. Se pueden proveer versiones estructuradas de artículos y cantidades en la etapa de licitación, adjudicación y contrato usando las unidades dentro del bloque de artículos.',
  },
  {
    category: 'advanced',
    section: 'tender, bidder',
    code: 'bidders',
    title: 'Información de Licitante',
    description:
      'Documentación sobre ofertantes o participantes, sus documentos de validación y cualquier excepción al procedimiento para el que estén calificados.',
  },
  {
    category: 'advanced',
    section: 'tender, award, contract, implementation',
    code: 'conflictOfInterest',
    title: 'Conflicto de interés',
    description:
      'Documentación de conflictos de interés declarado o descubierto.',
  },
  {
    category: 'advanced',
    section: 'implementation',
    code: 'debarments',
    title: 'Inhabilitaciones',
    description: 'Documentación de cualquier inhabilitación efectuada.',
  },
  {
    category: 'advanced',
    section: 'tender, bid, contract, implementation',
    code: 'illustration',
    title: 'Ilustraciones',
    description:
      'Imágenes con la intención de dar información adicional. La URL de las imágenes deben de ser directas a un archivo de imagen que las aplicaciones muestren como parte de una galería de imágenes. En la etapa de licitación, las imágenes pueden ser ilustraciones de bienes, trabajos o servicios que se necesiten o estén en venta. En la etapa de implementación, las imágenes pueden ser ilustraciones o evidencia visual del progreso físico.',
  },
  {
    category: 'advanced',
    section: 'bid, award, contract',
    code: 'submissionDocuments',
    title: 'Documentos de presentación de oferta',
    description:
      'Documentación enviada por un licitante como parte de su oferta',
  },
  {
    category: 'advanced',
    section: 'contract',
    code: 'contractSummary',
    title: 'Resúmen del contrato',
    description:
      'Documentación que da una imagen general de los términos y secciones clave del contrato. Comúnmente usado para contratos largos y complejos.',
  },
  {
    category: 'advanced',
    section: 'tender, award, contract, implementation',
    code: 'cancellationDetails',
    title: 'Detalles de cancelación',
    description:
      'Documentación de los arreglos, o razones para la cancelación de un proceso de contrataciones, adjudicación o contrato específico.',
  },
];

export interface IDocumentType {
  category: string;
  section: string;
  code: string;
  title: string;
  description: string;
}

function getDocumentType(section: string): Array<IDocumentType> {
  return DocumentType.filter((d) => d.section.includes(section)).sort((a, b) =>
    a.title.localeCompare(b.title, 'es-mx')
  );
}

export default getDocumentType;
