import './App.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header/>
      <main className="app__content">
        <Switch>
          <Route exact path="/">
            <SearchForm />
            <NewsCardList />
            <About />
          </Route>
          <Route path='/saved-news'>
            <SavedNews />
            <NewsCardList />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
