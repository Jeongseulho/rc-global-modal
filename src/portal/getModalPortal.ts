const getModalPortal = () => {
  let modalPortal = document.getElementById('modalPortal');
  if (!modalPortal) {
    const body = document.querySelector('body');
    modalPortal = document.createElement('div');
    modalPortal.id = 'modalPortal';
    body!.appendChild(modalPortal);
  }
  return modalPortal;
};

export default getModalPortal;
