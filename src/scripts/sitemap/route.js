import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route exact path="/" />
    <Route exact path="/vampire/Disciplines/" />
    <Route exact path="/vampire/Disciplines/:id" />
    <Route exact path="/vampire/Flaws" />
    <Route exact path="/vampire/Flaws/:id" />
    <Route exact path="/vampire/Merits" />
    <Route exact path="/vampire/Rituals" />
    <Route exact path="/vampire/Rituals/:id" />
    <Route exact path="/vampire/Merits/:id" />
    <Route exact path="/vampire/Attributes/:id" />
    <Route exact path="/vampire/Attributes" />
    <Route exact path="/vampire/Backgrounds/:id" />
    <Route exact path="/vampire/Backgrounds" />

    <Route exact path="/vampire/Library/:id" />
    <Route exact path="/vampire/Library" />

    <Route exact path="/vampire/Skills" />
    <Route exact path="/vampire/Skills/:id" />
    <Route exact path="/vampire/Techniques" />
    <Route exact path="/vampire/Techniques/:id" />
    <Route exact path="/vampire/clan/:id" />
    <Route exact path="/vampire/clan/" />
    <Route exact path="/QuickStart" />
    <Route exact path="/Backers" />
    <Route exact path="/Contributors" />
    <Route exact path="/SupportUs" />
    <Route exact path="/Search" />
  </Route>
);
