const buildVendorDashboardUrl = (vendorId, prefix = "") => {
  return `/vendor/${vendorId}${prefix}`;
};

const getVendorIdFromUrl = (router) => {
  return router.query.vendorId;
};

export { buildVendorDashboardUrl, getVendorIdFromUrl };
