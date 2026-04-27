# rc global modal

manage modal using global state and Promise in react project  
[Try it out with Storybook](https://main--66193d56430d2f881d4689f4.chromatic.com/)

[![npm version](https://img.shields.io/npm/v/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)  
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rc-global-modal?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)  
[![npm total downloads](https://img.shields.io/npm/dt/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)
[![npm downloads](https://img.shields.io/npm/dm/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Options](#options)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)

## Installation

```
npm i rc-global-modal
```

## Features

1. Open and close modal from anywhere in the app(inside `ModalProvider`) using Promise API.
2. Custom CSS style for modal and overlay
3. Ref for modal container and overlay
4. Choose animation type and duration for modal

## Options

These options can be passed to the `options` property when pushing a new modal.

| Props | Types | Required | Default | Description |
| :-: | :-: | :-: | :-: | :-: |
| closeOnOverlayClick | `boolean` | ❌ | `true` | close modal when overlay is clicked |
| modalContainerClassName | `string` | ❌ |  | class name for modal container |
| overlayClassName | `string` | ❌ |  | class name for overlay |
| modalContainerStyle | `React.CSSProperties` | ❌ |  | custom style for modal container |
| overlayStyle | `React.CSSProperties` | ❌ |  | custom style for overlay |
| closeOnEsc | `boolean` | ❌ | `true` | close modal when esc key is pressed |
| modalContainerRef | `React.RefObject` | ❌ |  | ref for modal container |
| overlayRef | `React.RefObject` | ❌ |  | ref for overlay |
| animationType | `'fade' \| 'slideUp' \| 'slideDown' \| 'slideLeft' \| 'slideRight' \| 'zoom'` | ❌ | `fade` | animation type for modal
| animationDuration | `number` | ❌ | `300` | animation duration for modal |

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

2. Use `useModal` hook and `.push` method to display modal. The pushed modal acts as a Promise.

```tsx
import { useModal } from 'rc-global-modal';

const TestModal = ({ resolve, reject }) => {
  return (
    <div>
      <h1>My Modal</h1>
      <button onClick={() => resolve('Confirm!')}>Confirm</button>
      <button onClick={() => reject('Cancel!')}>Cancel</button>
    </div>
  );
};

const Home = () => {
  const modal = useModal();

  const handleOpen = async () => {
    try {
      const result = await modal.push({
        key: 'test',
        Component: TestModal,
        props: {}, // Props for TestModal
        options: {
          animationType: 'slideUp',
          closeOnOverlayClick: true,
        }
      });
      console.log('Result:', result);
    } catch (e) {
      console.log('Rejected/Closed:', e);
    }
  };

  return (
    <button onClick={handleOpen}>Open Modal</button>
  );
};
```

## Examples

```tsx
import { useModal } from 'rc-global-modal';

const ConfirmModal = ({ resolve, reject, message }) => {
  return (
    <div style={{ background: 'white', padding: 20 }}>
      <p>{message}</p>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => reject(new Error('User cancelled'))}>No</button>
    </div>
  );
};

const Home = () => {
  const modal = useModal();

  const onDelete = async () => {
    try {
      const isConfirmed = await modal.push({
        key: 'confirm-delete',
        Component: ConfirmModal,
        props: { message: 'Are you sure you want to delete this item?' },
      });
      
      if (isConfirmed) {
        // Delete logic here
        console.log('Item deleted');
      }
    } catch (error) {
      console.log('Deletion cancelled');
    }
  };

  return (
    <div>
      <button onClick={onDelete}>Delete Item</button>
    </div>
  );
};

export default Home;
```

## License

MIT
