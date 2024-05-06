import React from 'react';

// Components SIGN IN PAGE😎✅
import Header from 'components/Header';
import FormSignIn from 'components/FormSignIn';
import SafeView from '../../components/SafeView';

export default function SignIn() {
  return (
    <SafeView>
      <Header />
      <FormSignIn />
    </SafeView>
  );
}
