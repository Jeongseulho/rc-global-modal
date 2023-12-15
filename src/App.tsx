import { css } from '@emotion/react';

function App() {
  return (
    <div
      css={css({
        color: 'hotpink',
        fontSize: 50,
        border: '1px solid currentColor',
        ':hover': {
          color: 'green',
        },
      })}
    >
      Hello World
    </div>
  );
}

export default App;
