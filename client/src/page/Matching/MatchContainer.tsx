/* eslint-disable */
import React from 'react';
import { listMatchWaitQueue } from '../../graphql/matchQueries';
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
  return <MatchPresenter className={className} data={data} />;
};

export default MatchWaitQueue;
