export const selectCedula = (cedula) => {
    return {
        type: 'SELECTCEDULA',
        payload: cedula,
    }
}