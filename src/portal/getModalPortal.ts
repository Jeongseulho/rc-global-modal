const getModalPortal = () => {
  const modalPortal = document.getElementById('modalPortal');
  if (!modalPortal) {
    const body = document.querySelector('body');
    const modalPortal = document.createElement('div');
    modalPortal.id = 'modalPortal';
    body!.appendChild(modalPortal);
    return modalPortal;
  }
  return modalPortal;
};

export default getModalPortal;
