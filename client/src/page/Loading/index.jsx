import React from 'react';
import BaseTemplate from 'page/BaseTemplate';
import { LoadContainer, LoadingComponent } from './style';

const LoadComponent = () => (
  <BaseTemplate>
    <LoadContainer>
      <LoadingComponent />
    </LoadContainer>
  </BaseTemplate>
);
export default LoadComponent;
