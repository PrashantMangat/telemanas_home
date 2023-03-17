import { environment } from '../environments/environment';
export const baseUrl = environment.baseUrl;

// export const getFaqUrl = environment.baseUrl + 'config/getConfigDetailsByName/Tel%20FAQs';
export const getAllNewsRecord = environment.baseUrl + '/rest/getAllNewsRecord';

export const getNewsUrl = environment.baseUrl + 'config/getConfigDetailsByName/teleNews';
export const getPageViews = environment.baseUrl + 'rest/v0/getPageviews';
export const getStatesList = environment.baseUrl + '/rest/v0/getStates';
export const getServiceAvailability = environment.baseUrl + '/rest/v0/getServiceAvailability/';

export const getFaqUrl = environment.baseUrl + 'rest/getFaqList';