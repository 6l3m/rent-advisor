import { useState, useEffect } from 'react';

import config from '../config';

const useAdsApi = initialData => {
  const [adSearch, setAdSearch] = useState({});
  const [data, setData] = useState(initialData);
  const [adsLoading, setAdsLoading] = useState(false);

  useEffect(() => {
    if (data !== initialData) {
      const fetchAds = async () => {
        setAdsLoading(true);

        try {
          const resp = await fetch(`${config.apiUrl}${config.adsUrl}`, {
            method: 'POST',
            body: JSON.stringify(data)
          });
          const respAsJson = await resp.json();
          setAdSearch(respAsJson.data);
          setAdsLoading(false);
        } catch (error) {
          setAdsLoading(false);
          console.error('⛔️🚫 Error requesting for ads: ', error);
        }
      };

      fetchAds();
    }
  }, [data, initialData]);

  return [{ adSearch, adsLoading }, setData];
};

export default useAdsApi;
