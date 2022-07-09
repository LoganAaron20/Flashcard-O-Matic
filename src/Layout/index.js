import { Switch, Route } from "react-router-dom";
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../components/CreateDeck";
import Home from "../components/Home";
import DeckView from "../components/DeckView";
import DeckEdit from "../components/DeckEdit";
import DeckStudy from "../components/DeckStudy";
import CardAdd from "../components/CardAdd";
import CardEdit from "../components/CardEdit";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardAdd />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
