import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { connect } from 'react-redux';

import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase-utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import {connect} from 'react-redux';
// import {createStructuredSelector} from 'reselect';

// import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// import { selectCollections } from '../../redux/shop/shop.selector';

// class ShopPage extends React.Component {
//     constructor(Props) {
//         super(Props);

//         this.state = {
//             collections: SHOP_DATA
//         };
//     }

// const ShopPage = ({ collections = SHOP_DATA }) => {
    // const ShopPage = ({ match }) => (
    //         <div className="shop-page">
    //             <Route exact path={`${match.path}`} component={CollectionsOverview} />
    //             <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    //             {
    //                 collections.map(({ id, ...OtherCollectionProps }) => {
    //                     return (
    //                         <CollectionPreview key={id} {...OtherCollectionProps} />
    //                     // <div key={id}>{name}</div>
    //                     )
    //                 })
    //             }
    //         </div>
    //     );

    // const mapStateToProps = createStructuredSelector({
    //     collections: selectCollections
    // });

    // export default ShopPage;

// export default connect(mapStateToProps)(ShopPage);

/* ------------------------------- */

// const ShopPage = ({ match }) => (
//     <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// );    

/* ----------------------------- */

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component  {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
        <div className="shop-page">
            {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
            <Route exact path={`${match.path}`} 
                render={props => (
                    <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                )}
            />
            <Route path={`${match.path}/:collectionId`} 
                render={props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props} />
                )}
            />
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);