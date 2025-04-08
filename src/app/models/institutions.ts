export interface Institution {
  _id?: string;
  id?: number;
  name: string;
  address: {
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    countryName: string;
  };
}
