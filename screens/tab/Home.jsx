import React from 'react';
import SafeView from 'components/SafeView';
import { HeaderAuth } from '../../routers/Components';

export default function Home() {
  return (
    <SafeView>
      <HeaderAuth />
    </SafeView>
  );
}
