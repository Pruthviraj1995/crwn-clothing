import ShopActionTypes from '../../redux/shop/shop.types';

export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})