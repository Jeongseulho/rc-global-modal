# rc global modal

manage modal using global state in react project

[![npm version](https://img.shields.io/npm/v/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)  
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rc-global-modal?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)  
[![npm total downloads](https://img.shields.io/npm/dt/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)
[![npm downloads](https://img.shields.io/npm/dm/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)

## Table of Contents

- [Installation](#installation)
- [Props](#props)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)

## Installation

```
npm i rc-global-modal
```

## Props

| Props | Types | Required | Default | Description |
| :-: | :-: | :-: | :-: | :-: |
| children | `React.FC` | ✅ |  | component that will be displayed inside modal |
| id | `string \| number` | ✅ |  | unique id for modal |
| closeOnOverlayClick | `boolean` | ❌ | `true` | close modal when overlay is clicked |
| modalContainerClassName | `string` | ❌ |  | class name for modal container |
| overlayClassName | `string` | ❌ |  | class name for overlay |
| modalContainerStyle | `React.CSSProperties` | ❌ |  | custom style for modal container |
| overlayStyle | `React.CSSProperties` | ❌ |  | custom style for overlay |
| closeOnEsc | `boolean` | ❌ | `true` | close modal when esc key is pressed |

## Usage

1. Wrap your app with `ModalProvider` component

```tsx
import { ModalProvider } from 'rc-global-modal';

function App() {
  return (
    <ModalProvider>
      <Home />
    </ModalProvider>
  );
}
```

2. Use `Modal` component to display modal(must be inside `ModalProvider`)

```tsx
import { Modal } from 'rc-global-modal';

const Home = () => {
  return (
      <Modal id={1}>
        <h1>IdOneModal</h1>
      </Modal>
  );
};
```

3. Use `openModal` and `closeModal` function to open and close modal(must be inside `ModalProvider`)

```tsx
import { Modal, useModal } from 'rc-global-modal';

const Home = () => {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={() => openModal(1)}>open Id One modal</button>
      <Modal id={1}>
        <h1>IdOneModal</h1>
        <button onClick={closeModal}>close modal</button>
      </Modal>
    </div>
  );
};
```

## Examples

```tsx
import { Modal, useModal } from 'rc-global-modal';

const Home = () => {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={() => openModal(1)}>open Id One modal</button>

      <button onClick={() => openModal(2)}>open Id Two modal</button>

      <Modal id={1}>
        <h1>IdOneModal</h1>
        <button onClick={closeModal}>close modal</button>
      </Modal>

      <Modal id={2}>
        <h1>IdTwoModal</h1>
        <button onClick={closeModal}>close modal</button>
      </Modal>
    </div>
  );
};

export default Home;
```

## License

MIT
