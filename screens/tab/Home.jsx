import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth } from '../../routers/Components';
import HeaderSectorView from '../../components/HeaderSectorView';

export default function Home() {
  return (
    <SafeView>
      <HeaderAuth />
      <HeaderSectorView />
    </SafeView>
  );
}
