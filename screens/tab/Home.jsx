import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth, HomeDienstenDisplay, HomeLowSection } from '../../routers/Components';


export default function Home() {
  return (
    <SafeView>
      <HeaderAuth />
      <HomeDienstenDisplay />
      <HomeLowSection />
    </SafeView>
  );
}
