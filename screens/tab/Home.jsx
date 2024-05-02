import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth, HeaderSectorView, HomeDienstenDisplay } from '../../routers/Components';

export default function Home() {
  return (
    <SafeView>
      <HeaderAuth />
      <HomeDienstenDisplay />
      {/* <HeaderSectorView /> */}
    </SafeView>
  );
}
