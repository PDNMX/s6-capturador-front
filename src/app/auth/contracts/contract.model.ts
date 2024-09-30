export interface Contract {
  id: number;
  awardID: string;
  title: string;
  description: string;
  status: string;
  period: {
    startDate: string;
    endDate: string;
    maxExtentDate: string;
    durationInDays: number;
  };
  value: {
    amount: number;
    amountNet: number;
    currency: string;
    exchangeRates: {
      rate: number;
      currency: string;
      date: string;
      source: string;
    }[];
  };
  items: {
    _id?: string;
    id: string;
    description: string;
    classification: {
      scheme: string;
      id: string;
      description: string;
      uri: string;
    };
    additionalClassifications: {
      scheme: string;
      id: string;
      description: string;
      uri: string;
    }[];
    quantity: number;
    unit: {
      scheme: string;
      id: string;
      name: string;
      value: {
        amount: number;
        currency: string;
      };
      uri: string;
    };
    deliveryLocation: {
      geometry: {
        type: string;
        coordinates: number[];
        gazetteer: {
          scheme: string;
          identifiers: string[];
        };
      };
      description: string;
      uri: string;
    };
    deliveryAddress: {
      streetAddress: string;
      locality: string;
      region: string;
      postalCode: string;
      countryName: string;
    };
  }[];
  dateSigned: string;
  surveillanceMechanisms: string[];
  guarantees: {
    id: string;
    type: string;
    date: string;
    obligations: string;
    value: {
      amount: number;
      currency: string;
    };
    guarantor: {
      name: string;
      id: string;
    };
    period: {
      startDate: string;
      endDate: string;
      maxExtentDate: string;
      durationInDays: number;
    };
  }[];
  documents: {
    id: string;
    documentType: string;
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    format: string;
    language: string;
  }[];
  implementation: {
    status: string;
    transactions: {
      id: string;
      source: string;
      date: string;
      paymentMethod: string;
      value: {
        amount: number;
        currency: string;
      };
      payer: {
        name: string;
        id: string;
      };
      payee: {
        name: string;
        id: string;
      };
      uri: string;
    }[];
    milestones: {
      id: string;
      title: string;
      type: string;
      description: string;
      code: string;
      dueDate: string;
      dateMet: string;
      dateModified: string;
      status: string;
    }[];
    documents: {
      id: string;
      documentType: string;
      title: string;
      description: string;
      url: string;
      datePublished: string;
      dateModified: string;
      format: string;
      language: string;
    }[];
  };
  relatedProcesses: {
    id: string;
    relationship: string[];
    title: string;
    scheme: string;
    identifier: string;
    uri: string;
  }[];
  milestones: {
    id: string;
    title: string;
    type: string;
    description: string;
    code: string;
    dueDate: string;
    dateMet: string;
    dateModified: string;
    status: string;
  }[];
  amendments: {
    date: string;
    rationale: string;
    id: string;
    description: string;
    amendsReleaseID: string;
    releaseID: string;
  }[];
}

export interface Item {
  _id?: string;
  id: string;
  description: string;
  classification: {
    scheme: string;
    id: string;
    uri: string;
    description: string;
  };
  additionalClassifications: any;
  quantity: number;
  unit: {
    scheme: string;
    id: string;
    name: string;
    uri: string;
    value: {
      amount: number;
      currency: string;
    };
  };
  deliveryLocation: any;
  deliveryAddress: any;
}
