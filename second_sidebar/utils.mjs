export function fetchIconURL(url) {
  const uri = NetUtil.newURI(url);
  Favicons.setDefaultIconURIPreferredSize(32);

  return new Promise((resolve) => {
    Favicons.getFaviconURLForPage(uri, (faviconURI) => {
      let faviconURL = faviconURI?.spec;
      let provider = null;
      if (typeof faviconURL !== "undefined" && faviconURL !== null) {
        provider = "browser";
      } else {
        provider = "google";
        faviconURL = `https://www.google.com/s2/favicons?domain=${uri.host}&sz=32`;
      }
      console.log(`Got favicon for ${url} from ${provider}`);
      resolve(faviconURL);
    });
  });
}
