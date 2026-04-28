# rc-global-modal

Manage modals using global state and Promise API in React projects with **Full TypeScript Support**.
[Try it out with Storybook](https://main--66193d56430d2f881d4689f4.chromatic.com/)

[![npm version](https://img.shields.io/npm/v/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rc-global-modal?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)
[![npm total downloads](https://img.shields.io/npm/dt/rc-global-modal.svg?style=flat-square)](https://www.npmjs.com/package/rc-global-modal)

## Features

1. **Promise-based API**: Open modals and await results directly in your business logic.
2. **Zero Boilerplate**: No need for `isOpen` states or redundant callback props.
3. **Strict Type Safety**: Automatically infers the return type of `.push()` based on the modal's Props definition. 
4. **Flexible Animations**: Built-in support for various animation types (fade, slide, zoom).

## Installation

```bash
npm i rc-global-modal
```

## Usage

### 1. Wrap your app with `ModalProvider`
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

### 2. Define Modal Component with Types
Modals receive `resolve` and `reject` as props to communicate back to the caller. The type of the value passed to `resolve` will be the return type of the modal.

```tsx
import React from 'react';

// Define your component props including resolve and reject
interface ConfirmModalProps {
  message: string;
  resolve: (value: boolean) => void; // This determines the return type: Promise<boolean>
  reject: (reason: string) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ resolve, reject, message }) => {
  return (
    <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
      <p>{message}</p>
      <button onClick={() => resolve(true)}>Confirm</button>
      <button onClick={() => reject('User cancelled')}>Cancel</button>
    </div>
  );
};
```

### 3. Push Modal and Await Result
Use the `useModal` hook and pass the Props type as a **Generic** to the `push` method. This ensures full type safety for both props and the return value.

```tsx
import { useModal } from 'rc-global-modal';

const Home = () => {
  const modal = useModal();

  const handleOpen = async () => {
    try {
      const result = await modal.push<ConfirmModalProps>({
        key: 'confirm-delete',
        Component: ConfirmModal,
        props: { 
          message: 'Are you sure you want to delete this item?' 
        },
        options: {
          animationType: 'slideUp',
          closeOnOverlayClick: true,
        }
      });
      
      if (result) {
        console.log('Confirmed!');
      }
    } catch (error) {
      console.log('Rejected or Closed:', error);
    }
  };

  return <button onClick={handleOpen}>Delete Item</button>;
};
```

## Options

These options can be passed to the `options` property when pushing a new modal.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `closeOnOverlayClick` | `boolean` | `true` | Close modal when overlay is clicked |
| `closeOnEsc` | `boolean` | `true` | Close modal when ESC key is pressed |
| `animationType` | `AnimationType` | `'fade'` | `'fade' | 'slideUp' | 'slideDown' | 'zoom' | 'slideLeft' | 'slideRight'` |
| `animationDuration` | `number` | `300` | Duration of the animation in ms |
| `modalContainerStyle` | `CSSProperties` | - | Custom inline styles for modal container |
| `overlayStyle` | `CSSProperties` | - | Custom inline styles for overlay |

## License

MIT