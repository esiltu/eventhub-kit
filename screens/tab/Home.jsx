import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth, HomeDienstenDisplay, HomeLowSection } from '../../routers/Components';
import { UserProvider } from 'context/UserContent';

export default function Home() {
  return (
    <UserProvider>
      <SafeView>
        <HeaderAuth />
        <HomeDienstenDisplay />
        <HomeLowSection />
      </SafeView>
    </UserProvider>
  );
}
