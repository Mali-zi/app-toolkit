// import { error } from 'console';
import { useEffect, useState } from 'react';

export function useJsonFetch(url: string, opts: string) {
  const [data, setData] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let result = '';
    setLoading(true);
    fetch(url, {
      method: 'GET',
      signal: controller.signal,
    })
      .then(response => {
        const contentType = response.headers.get('content-type');

        if(!response.ok){
            throw new Error(`HTTP error, status = ${response.status}`); // Ошибка сети
        } else {
          if (!contentType || !contentType.includes('application/json')) {
              throw new TypeError(`TypeError, status = ${response.status}`); // Получен не JSON
          } else {
            return response.json()
          }
        }
      })
      .then(textData => setData(textData))
      .catch(e => {
        result = (e as Error).message;
        setError(result);
      })
      .finally(() => {
        setLoading(false);
        controller.abort();
      });
    }, []);
  
  return [data, loading, error];
}
