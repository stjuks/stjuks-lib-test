import * as countries from 'i18n-iso-countries';
import { getEuMembers } from 'is-eu-member';
import { arrayToMap } from './object-util';

type Country = {
  iso2Code: string;
  name: string;
};

type CountryConfig = {
  langs: string[];
  defaultLang: AvailableLangs;
};

type AvailableLangs = 'en';

let defaultLang: AvailableLangs = 'en';

export const setCountryConfig = (countryConfig: CountryConfig) => {
  countryConfig.langs.forEach(lang => {
    countries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`));
  });

  defaultLang = countryConfig.defaultLang;
};

const customCountries: {
  [iso2Code: string]: { [locale in AvailableLangs]: string };
} = {
  XI: {
    en: 'Northern Ireland',
  },
};

const sortCountriesAscending = (a: Country, b: Country): number => {
  return a.name < b.name ? -1 : 1;
};

const euMemberCodesMap = arrayToMap(
  getEuMembers()
    // transform EL (not in ISO 3166-1) to GR (Greece)
    .map(c => (c === 'EL' ? 'GR' : c))
    // add Northern Ireland to EU countries
    .concat('XI')
);

const allCountryCodesMap = {
  ...euMemberCodesMap,
  ...countries.getAlpha2Codes(),
};

export const getCountry = (
  iso2Code: string,
  locale: string = defaultLang
): Country => {
  const customCountryName =
    customCountries?.[iso2Code]?.[locale as AvailableLangs];

  return {
    iso2Code,
    name:
      customCountryName ||
      countries.getName(iso2Code, locale, { select: 'official' }),
  };
};

export const euCountries = (locale: string = defaultLang): Country[] => {
  return Object.keys(euMemberCodesMap)
    .map(c => getCountry(c, locale))
    .sort(sortCountriesAscending);
};

export const allCountries = (locale: string = defaultLang): Country[] => {
  return Object.keys(allCountryCodesMap)
    .map(c => getCountry(c, locale))
    .sort(sortCountriesAscending);
};

export const nonEuCountries = (locale: string = defaultLang): Country[] => {
  return Object.keys(allCountryCodesMap)
    .filter(c => !(c in euMemberCodesMap))
    .map(c => getCountry(c, locale))
    .sort(sortCountriesAscending);
};
