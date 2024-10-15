document.getElementById("addBlockBtn").addEventListener("click", () => {
  const site = document.getElementById("blockSiteInput").value;
  if (site) {
    chrome.storage.sync.get({ blockedSites: [] }, function (data) {
      const sites = data.blockedSites;
      sites.push(site);
      chrome.storage.sync.set({ blockedSites: sites }, function () {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: sites.map((_, index) => index + 1),
          addRules: sites.map((site, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: "block" },
            condition: { urlFilter: site, resourceTypes: ["main_frame"] },
          })),
        });
      });
    });
  }
});
