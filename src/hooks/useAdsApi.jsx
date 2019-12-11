import { useState, useEffect } from 'react';

import config from '../config';

const useAdsApi = (initialBody, initialAdsSearch) => {
  const [adSearch, setAdSearch] = useState(initialAdsSearch);
  const [body, setBody] = useState(initialBody);
  const [adsLoading, setAdsLoading] = useState(false);

  const bodyAsString = JSON.stringify(body);
  const initialBodyAsString = JSON.stringify(initialBody);

  useEffect(() => {
    if (bodyAsString !== initialBodyAsString) {
      const fetchAds = async () => {
        setAdsLoading(true);

        try {
          const resp = await fetch(`${config.apiUrl}${config.adsUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: bodyAsString
          });
          const respAsJson = await resp.json();
          setAdSearch(respAsJson.data);
          setAdsLoading(false);
        } catch (error) {
          setAdsLoading(false);
          setBody(null);
          console.error('⛔️🚫 Error requesting for ads: ', error);
        }
      };

      fetchAds();
    }
  }, [bodyAsString, initialBodyAsString]);

  return [{ adSearch, adsLoading }, setBody];
};

export default useAdsApi;
