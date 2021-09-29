import React, { useEffect } from "react";
import styled from "style-components";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import { loadNemosFB } from "./redux/modules/nemo";

function App() {
  const dispatch = useDispatch();

  // App.js가 새로 렌더될 때마다(진입, 새로고침) loadWordsFB 함수를 dispatch 합니다.
  useEffect(() => {
    dispatch(loadNemosFB());
  }, [dispatch]);
  return (
    // ThemeProvider를 활용하면 theme을 사용할 수 있다고 하는데 아직 모르겠음
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/nemo/add" component={FormPage} />
            <Route path="/nemo/:id/edit" component={FormPage} />
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin-top: 40px;
  padding: 0 30px;

  ${({ theme }) => theme.device.tablet} {
    margin-top: 60px;
    padding: 0 50px;
  }
  ${({ theme }) => theme.device.desktop} {
    max-width: 1400px;
    margin: 60px auto 0 auto;
  }
`;

export default App;
