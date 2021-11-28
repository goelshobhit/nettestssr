/**
 *
 * QuickStart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'next/head';
import Backers from 'containers/Backers';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

export default function QuickStart() {
  return (
    <div>
      <Helmet>
        <title>{`Backers | World of Darkness - MET - Vampire - Backers`} </title>
        <meta
          name="description"
          content="Aaron Gomez, Adam Benton, Adam Hobbs, Adam Lake, Adam Mitchell, Adam Reha, Adam Smith, Akira Barnes, Alan Jessup, Alexander Edwards, Alexander Winfield, Andrea Beduschi , Andrew Hermann, Andrew Kempf, Andrew Savill, Ann-Kathrine Mikkelsen, Anthony Ingrao, Arianna Parrish, Austin Warner
Becca Marshall, Benjamin Bolton, Bernard Dawson, Boris Khazin, Brandon Daniels, Brenden Moran, Brett Ritter, Bruce Gray, Bryan Himebaugh, Byron McCullough
Carley Biggins, Carron Joe, Charles Allen, Charles Cannaday, Charles Rieser, Chris Burns, Chris Campione, Chris Lyden, Christon Smith, Christopher Bonnett, Christopher Gibbs, Christopher Lemanski, Christopher Rhodes, Christopher Richardson, Christopher S. Berg, Christopher Blocher, Christopher Szynkowski, Christopher Wong, Clayton Gaughran, Cody B Killebrew, Cody Shadley, Collin Lazelle
Damon Edwards, Daniel Hicks, Daniel Hughes, Daniel Peterson, Darryl Purchner, Dave Valcourt, David Barnhill, David James Alverson, David Moore, David Petro, David S. Kerven, Derrick Burbee, Devin Anthony Stewart, Devin Saverline,

Emilio Echeverria, Eric Barber, Erik Berman, Errol Logan, Esteban Colon

Gareth Owings, Geoff Scott, George Chimples, Greg Craill, Gregory Bullard"
        />
      </Helmet>
      <Header />
      <Backers />
      <Footer />
    </div>
  );
}

QuickStart.propTypes = {
  ...QuickStart,
  dispatch: PropTypes.func.isRequired,
};
