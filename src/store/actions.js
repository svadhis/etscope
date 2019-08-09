export const updateLocalState = state => {
    return {
        type: 'UPDATE_LOCAL_STATE',
        roomState: state
    }
}