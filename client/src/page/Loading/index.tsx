import React from 'react';
import BaseTemplate from 'page/BaseTemplate';
import { LoadContainer, LoadingComponent } from './style';

const LoadingPage = () => (
  <BaseTemplate>
    <LoadContainer>
      <LoadingComponent />
    </LoadContainer>
  </BaseTemplate>
);
export default LoadingPage;
