import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route exact path="/" />
    <Route exact path="/vampire/disciplines/" />
    <Route exact path="/vampire/disciplines/:id" />
    <Route exact path="/vampire/flaws" />
    <Route exact path="/vampire/flaws/:id" />
    <Route exact path="/vampire/merits" />
    <Route exact path="/vampire/rituals" />
    <Route exact path="/vampire/rituals/:id" />
    <Route exact path="/vampire/merits/:id" />
    <Route exact path="/vampire/attributes/:id" />
    <Route exact path="/vampire/attributes" />
    <Route exact path="/vampire/backgrounds/:id" />
    <Route exact path="/vampire/backgrounds" />

    <Route exact path="/vampire/library/:id" />
    <Route exact path="/vampire/library" />

    <Route exact path="/vampire/skills" />
    <Route exact path="/vampire/skills/:id" />
    <Route exact path="/vampire/techniques" />
    <Route exact path="/vampire/techniques/:id" />
    <Route exact path="/vampire/clan/:id" />
    <Route exact path="/vampire/clan/" />
    <Route exact path="/QuickStart" />
    <Route exact path="/Backers" />
    <Route exact path="/Contributors" />
    <Route exact path="/SupportUs" />
    <Route exact path="/Search" />
  </Route>
);
