import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collections-overview.styles.scss';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {
            collections.map(({ id, ...OtherCollectionProps }) => (
                <CollectionPreview key={id} {...OtherCollectionProps} />
                // <div key={id}>{name}</div>
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);