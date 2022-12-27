import React, { useEffect, useState } from 'react';
import { GlobalState } from '../../modules/core/global-state';

export default function AdminPage() {
  const [hasCompInitialized, setHasCompInitialized] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!hasCompInitialized) {
      loadData();
    }

    setHasCompInitialized(true);
  }, [hasCompInitialized])


  async function loadData() {
    const url = '/hello'
    const response = await GlobalState.instance.apiConsumer.get(url)
    console.log('response.data', response.data)
    console.log('typeof response.data', typeof response.data)
    setData(response.data)
    return response.data;
  }

  return (
    <React.Fragment>
      Admin page
    </React.Fragment>
  );
}
