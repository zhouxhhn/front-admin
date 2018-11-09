import { PageHeader } from '@sipin/siyue-admin-core';
import * as React from 'react';

const getLayout = (title, ContentComponent): any =>
  function layout(props) {
    return (
      <PageHeader {...props} title={title}>
        <ContentComponent {...props} />
      </PageHeader>
    );
  };

export default getLayout;
