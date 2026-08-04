
document.addEventListener('DOMContentLoaded', () => {
    initTogglePassword();
});

/*
Habilita el botón de mostrar/ocultar contraseña
en el registro.
*/
function initTogglePassword() {
    const toggles = document.querySelectorAll('.toggle-password');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const wrapper = toggle.closest('.input-wrapper');
            const input = wrapper ? wrapper.querySelector('input') : null;
            if (!input) return;

            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            toggle.classList.toggle('is-visible', isHidden);
            toggle.setAttribute(
                'aria-label',
                isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
            );
        });
    });
}