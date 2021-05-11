/* eslint-disable */
import React from 'react';
import { listMatchWaitQueue } from '../../graphql/queries';
import { gql, useQuery } from '@apollo/client';

import MatchPresenter from './MatchPresenter';

const MatchWaitQueue = ({ className }: any) => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      ${listMatchWaitQueue}
    `,
  );
  if (loading) {
    return <></>;
  }
  console.log(data);
  return <MatchPresenter className={className} data={data} />;
};

export default MatchWaitQueue;
