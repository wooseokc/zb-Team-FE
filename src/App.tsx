import React from 'react';
import GlobalStyle from './styles/global'
import TestBox from './component/test';

function App() {

  return (
    <>
      <GlobalStyle />
      <div>
        기본 세팅 완료!
      </div>
      <TestBox/>
      </>
  );
}

export default App;
