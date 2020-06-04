export default (state = '', action) => {
    switch (action.type) {
        case 'SELECTCEDULA':
            return action.payload;
        default:
            return '';
    }
};

// export default search;