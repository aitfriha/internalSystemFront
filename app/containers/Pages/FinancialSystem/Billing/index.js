import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import BillingBlock from './billingBlock';

class Billing extends React.Component {
  render() {
    const title = brand.name + ' - Billing ';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Billing" icon="ios-cash" desc="">
          <BillingBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default Billing;
