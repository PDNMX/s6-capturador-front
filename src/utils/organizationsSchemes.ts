const OrganizationSchemes = [
  {
    code: "MX-RFC",
    description: "The Registro Federal de Contribuyentes de México assigns an RFC identifier to both individual and corporate taxpayers.\n\nRegistration takes place through Servicio de Administración Tributaria (SAT) and registrants are provided with their RFC.\n\nWhilst there is no public database of RFCs available, a web service to validate RFCs is available at https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/\n\nThe structure of an RFC encodes information about the initials and date of registration of a company\n\n",
    url: "https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/",
    deprecated: false
  },
  {
    code: "US-COA",
    description: "A government's budget (or 'Chart of Accounts') often refers to government agencies, departments and ministries with stable codes. These can be reliably used in open data publications as identifiers.\n\nThis org-id.guide entry is generated and maintained by Gov Org ID Finder [1] from Development Initiatives. Where available, Gov Org ID Finder extracts and makes Chart of Accounts codes available for the convenience of users. The authoritative source remains the government's budget or Chart of Accounts.\n\n[1] https://gov-id-finder.codeforiati.org/about",
    url: "https://gov-id-finder.codeforiati.org/countries/US/",
    deprecated: false
  },
  {
    code: "US-DOS",
    description: "This code was present in the IATI Organization Registration Agency codelist. It should no longer be used. ",
    url: "http://www.companieshouse.gov.uk/links/usaLink.shtml",
    deprecated: true
  },
  {
    code: "US-EIN",
    description: "The Internal Revenue Service (IRS) assigns companies an Employer Identification Number (EIN) upon application. However, not all corporate entities are required to have an EIN. For tax-exempt entities (non-profits, charities etc.) the IRS maintains a list of EINs. Public listed company EINs are available via the Securities and Exchange Commission (SEC). \n\nOther EINs may be available by asking the organisation concerned, and are sometimes published on their websites.\n\n\"An Employer Identification Number (EIN) is also known as a Federal Tax Identification Number, and is used to identify a business entity. Generally, businesses need an EIN. \" [1]\n\n\"An employer identification number (EIN), also called a tax ID number or taxpayer ID, is required for most business entities... A tax ID number is not required if you operate a sole proprietorship or an LLC with no employees, in which case you would simply use your own Social Security Number as a tax ID.\" [2]\n\nIn the US, corporate registration happens at the state level. The timeliness, availability, and licensing of this data varies among all 50 states. There is no federal dataset that contains all corporate registrations.\n\nAcross the states, performance varies widely and in many cases data is not available in bulk, is not machine readable, is not openly licensed etc. For more detail, see the per state summary on Open Corporates. \n\n\"The Employer Identification Number (EIN), also known as the Federal Employer Identification Number (FEIN) or the Federal Tax Identification Number, is a unique nine-digit number assigned by the Internal Revenue Service (IRS) to business entities operating in the United States for the purposes of identification. When the number is used for identification rather than employment tax reporting, it is usually referred to as a Taxpayer Identification Number (TIN), and when used for the purposes of reporting employment taxes, it is usually referred to as an EIN.\" [3] \n\n[1] https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers-eins\n[2] http://tax.findlaw.com/federal-taxes/is-a-tax-id-required-for-my-business-.html\n[3] https://en.wikipedia.org/wiki/Employer_Identification_Number",
    url: "https://apps.irs.gov/app/eos/",
    deprecated: false
  },
  {
    code: "US-SAM",
    description: "The System for Award Management (SAM) of U.S. General Services Administration (GSA). The System for Award Management website (SAM.gov) is an official website of the U.S. Government that allows users to register to do business with the U.S. Government.\nSAM.gov issues entities with a Unique Entity ID (UEI) which is used across the federal government when they apply for federal awards as a prime awardee. Previously a D-U-N-S Number was used.\nEntities must re-register annually. If registration lapses it is still possible to re-register. In all cases the UEI is persistent and is retained by the entity. \nTo apply for federal funds, and to use other functionality such as full search, requires a login through the US government's Login.gov service. https://www.login.gov/policy/rules-of-use/ states that The Login.gov service is operated within the United States, but is accessible globally for public use.",
    url: "https://sam.gov/content/entity-registration",
    deprecated: false
  },
  {
    code: "US-USAGOV",
    description: "The U.S. Government website has an index of departments and agencies. This index can be searched, and the URL paths for agencies used to construct government agency identifiers. \n\n",
    url: "https://www.usa.gov/",
    deprecated: null
  },
  {
    code: "CA-CC",
    description: "Corporations Canada are the federal company register. \n\nCA-CC should be used for the Canada Corporation Number\n\nCompanies in Canada register with their provincial authority, e.g. British Columbia. While there is currently no complete national database for companies in Canada, Corporations Canada are piloting a Business Search Registry, which allows for the search of multiple jurisdictions at once, but not all - https://www.ic.gc.ca/app/scr/ccbr/search-chercher?lang=eng\n\nCorporations Canada also provides a Federal Corporation search - https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html?locale=en_CA\n\nThis entry was imported from the Open Corporates Jurisdiction List.",
    url: "http://www.ic.gc.ca/eic/site/cd-dgc.nsf/eng/home",
    deprecated: null
  },
  {
    code: "CA-COA",
    description: "A government's budget (or 'Chart of Accounts') often refers to government agencies, departments and ministries with stable codes. These can be reliably used in open data publications as identifiers.\n\nThis org-id.guide entry is generated and maintained by Gov Org ID Finder [1] from Development Initiatives. Where available, Gov Org ID Finder extracts and makes Chart of Accounts codes available for the convenience of users. The authoritative source remains the government's budget or Chart of Accounts.\n\n[1] https://gov-id-finder.codeforiati.org/about",
    url: "https://gov-id-finder.codeforiati.org/countries/CA/",
    deprecated: false
  },
  {
    code: "CA-GOV",
    description: "The dataset includes a list of legal department names and their respective numbers. The department number is assigned by the Receiver General to an organization listed in Schedules I, 1.1 and II of the Financial Administration Act authorized to use the Consolidated Revenue Fund and interface with the central systems operated by Public Works and Government Services Canada.",
    url: "http://open.canada.ca/data/en/dataset/22090865-f8a6-4b83-9bad-e9d61f26a821",
    deprecated: false
  },
  {
    code: "GB-COH",
    description: "Companies House is the United Kingdom's register of companies.\n\nIt contains entries for many kinds of companies, including:\n\n* Public limited company (PLC)\n* Private company limited by shares (Ltd, Limited)\n* Private company limited by guarantee, typically a non-commercial membership body such as a charity\n* Private unlimited company (either with or without a share capital)\n* Limited liability partnership (LLP)\n* Limited partnership (LP)\n* Societas Europaea (SE): European Union-wide company structure\n* Companies incorporated by Royal Charter (RC)\n* Community interest company",
    url: "http://www.companieshouse.gov.uk/",
    deprecated: false
  },
  {
    code: "GB-MPR",
    description: "The Mutuals Public Register is the public record of registered mutual societies:\n\n* building societies\n* credit unions\n* friendly societies\n* registered societies\n\nIt contains:\n\n* details of societies' registered offices, contact information and services\n* public documents such as yearly returns and accounts",
    url: "https://mutuals.fca.org.uk/",
    deprecated: false
  },
  {
    code: "GB-SHPE",
    description: "A statutory register of not-for-profit (housing associations), for-profit private, and local authority social housing providers, who are registered to operate in England. The Homes and Communities Agency (HCA)[1] is the regulator for social housing providers in England and maintains the list.\n\nFields indicate the designation of the social housing provider (e.g. private, non-profit, local authority) and the legal entity type (by their inclusion on the FCA Mutual Register, the Charity Register and Companies House).\n\nA *monthly* published list also appears on the HCA website, which includes new registrations and deregistrations https://www.gov.uk/government/publications/current-registered-providers-of-social-housing\n\n[1]: https://www.gov.uk/government/organisations/homes-and-communities-agency",
    url: "https://social-housing-provider-eng.alpha.openregister.org/",
    deprecated: false
  },
  {
    code: "GB-HESA",
    description: "This is a list of all higher education providers that provide data to the Higher Education Statistics Agency (HESA). Those providers include all publicly funded universities and other higher educations institutions (HEIs) in the UK, alternative HE providers (APs) that offer HE courses but do not receive annual public funding, and further education colleges (FECs) in Wales which provide some HE level courses.\n\nThe list is maintained for statistical purposes by the Higher Education Statistics Agency. It contains institutions' names alongside the internal ID that HESA assigns them. This internal higher education provider ID is given in the INSTID field. (Higher education providers submit their UK Provider Reference Number (UKPRN) as part of the data submission process to HESA. The mapping to a HESA higher education provider identifier (INSTID) is carried out through the use of a static data lookup table [1].)\n\nUse a UKPRN identifier in preference to this list. See: http://org-id.guide/list/GB-UKPRN.\n\n[1]: See https://www.hesa.ac.uk/collection/c18052/derived/xinstid01 for more information.\n",
    url: "https://www.hesa.ac.uk/support/providers",
    deprecated: false
  },
  {
    code: "GB-UKPRN",
    description: "A UKPRN is a unique number allocated to a provider on successful registration on the UK Register of Learning Providers. ",
    url: "https://www.ukrlp.co.uk/",
    deprecated: null
  },
  {
    code: "CO-CCB",
    description: "Each region of Colombia has a Chamber of Commerce to which all corporate entities must register. Bogota Chamber of Commerce (CCB) is responsible for Bogota.\n\nUsers should refer to CO-RUE for unique identifiers for Colombia. CO-CCB has ben deprecated in favour of CO-RUE.\n \n\"We are a private, non-for-profit organization whose goal is to foster a sustainable Bogota-Region in the long term, by promoting its residents' prosperity, through services which enhance and strengthen the enterprise capabilities present in the region, and which improve the business environment with an impact over public policies.\" [1]\n\n[1] http://www.ccb.org.co/en/Clusters/20th-TCI-Global-Conference-Bogota-Colombia/Bogota-Chamber-of-Commerce",
    url: "http://www.ccb.org.co/",
    deprecated: null
  },
  {
    code: "CO-RUE",
    description: "The Unified Commercial and Social Registry (RUES) integrates multiple commercial registries, including the NIT (Número de Identificación Tributaria) which can be used as the unique identifier. \n\nThis database can be searched online for free.\n\n\"The CCB hereby informs that, in accordance with Resolution 71029 issued by the Superintendence of Industry and Commerce, starting as of November 13, 2013, entrepreneurs must fill out the new Unified Commercial and Social Registry (RUES), a form that integrates the information from the following forms and records:\n\n* Merchant's Certificate.\n* Unified Offeror Registry.\n* Non-For-Profit Organizations Registry.\n* Common Regime (Associations, Foundations and Corporations) and * Solidary Economy Institutions (Cooperatives, Precooperatives, Employee Funds and Mutual Associations).\n* Activity, games and gambling Registry.\n* Citizen Oversight Associations Registry (applicable only when registering or signing-up).\n* Solidarity Economy Registry.\" [1]\n\n[1] http://www.ccb.org.co/en/Registrations-and-renewals/Merchant-s-certificate/Unified-Commercial-and-Social-Registry-RUES",
    url: "http://www.rues.org.co/RUES_Web/",
    deprecated: null
  },
  {
    code: "GT-NIT",
    description: "The Número de Identificación Tributaria (NIT) is a number assigned by the Superintendencia de Administración Tributaria in Guatemala to every tax payer, including both companies,  and individuals.\n\nCompanies must register with the Commercial Registry (Registro Mercantil) online at https://minegocio.gt/ to be incorporated and assigned an NIT number.",
    url: "https://portal.sat.gob.gt/portal/",
    deprecated: false
  },
  {
    code: "CL-RUT",
    description: "Any company that will be subject to taxes in Chile must obtain a Rol Único Tributario (RUT).  \n\nA RUT has 7 or 8 digits, plus a check digit. Identifiers should be presented without any punctuation and including the check digit. ",
    url: "http://www.chileproveedores.cl/",
    deprecated: false
  },
  {
    code: "CL-MP",
    description: "[Mercado Público](https://www.mercadopublico.cl/Home/Contenidos/QueEsMercadoPublico?esNuevaHome=true) is an electronic platform managed by Chilecompra, part of the Ministry of Finance, which public organizations use to make purchases.\n\nOrganizations registered as buyers or suppliers on the Mercado Público platform are assigned an identifier in the system. This identifier is used in the data from the Mercado Público OCDS API.\n\nThe use of Mercado Público identifiers is considered a temporary measure. They should only be used when no other stable identifier for a government agency or company is available",
    url: "https://www.mercadopublico.cl/Home",
    deprecated: false
  },
  {
    code: "GT-NIT",
    description: "The Número de Identificación Tributaria (NIT) is a number assigned by the Superintendencia de Administración Tributaria in Guatemala to every tax payer, including both companies, and individuals.",
    url: "https://portal.sat.gob.gt/portal/",
    deprecated: false
  },
];

export default OrganizationSchemes;
