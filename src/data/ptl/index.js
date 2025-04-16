/**
 * Export all PTL KPI data
 */

import planningKpiData from './planningKpiData';
import preDispatchKpiData from './preDispatchKpiData';
import inTransitKpiData from './inTransitKpiData';
import postDeliveryKpiData from './postDeliveryKpiData';

export {
  planningKpiData,
  preDispatchKpiData,
  inTransitKpiData,
  postDeliveryKpiData
};

/**
 * Combined data for all KPI sections
 */
export const ptlKpiData = {
  planning: planningKpiData,
  preDispatch: preDispatchKpiData,
  inTransit: inTransitKpiData,
  postDelivery: postDeliveryKpiData
};

export default ptlKpiData;
