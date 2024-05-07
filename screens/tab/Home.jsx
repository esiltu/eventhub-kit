import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth, HeaderSectorView, HomeDienstenDisplay } from '../../routers/Components';
import { UserProvider } from 'context/UserContent';

export default function Home() {
  return (
    <UserProvider>
      <SafeView>
        <HeaderAuth />
        <HomeDienstenDisplay />
        {/* <HeaderSectorView /> */}
      </SafeView>
    </UserProvider>
  );
}
