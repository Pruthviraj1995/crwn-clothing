import hatimg from '../../images/hats.png';
import jacimg from '../../images/jackets.png';
import sneakimg from '../../images/sneakers.png';
import womenimg from '../../images/womens.png';
import menimg from '../../images/men.png';

const INITIAL_STATE = {
    sections: [
        {
            title: 'hats',
            imageUrl: hatimg,        
            id: 1,
            linkUrl: 'shop/hats'
        },
        {
            title: 'jackets',
            imageUrl: jacimg,
            id: 2,
            linkUrl: 'shop/jackets'
        },
        {
            title: 'sneakers',
            imageUrl: sneakimg,
            id: 3,
            linkUrl: 'shop/sneakers'
        },
        {
            title: 'womens',
            imageUrl: womenimg,
            size: 'large',
            id: 4, 
            linkUrl: 'shop/womens'
        },
        {
            title: 'mens',
            imageUrl: menimg,
            size: 'large',
            id: 5, 
            linkUrl: 'shop/mens'
        }]
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default directoryReducer;