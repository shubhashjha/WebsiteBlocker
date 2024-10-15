chrome.storage.sync.get({ blockedSites: [] }, function (data) {
  const blockedSites = data.blockedSites.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: { urlFilter: site, resourceTypes: ["main_frame"] },
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: blockedSites.map((_, index) => index + 1),
    addRules: blockedSites,
  });
});
