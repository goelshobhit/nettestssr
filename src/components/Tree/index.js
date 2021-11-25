/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/**
 *
 * Tree
 *
 */

import React, { memo, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import { useRouter } from 'next/router'
import last from 'lodash/last';
import split from 'lodash/split';
import map from 'lodash/map';
import getMatchId from './getMatchId';


const renderLink = (item, paddingLeft) => (
  <Link
    href={`/vampire/Library/${item}`}
    value={item}
    onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    style={{ paddingLeft }}
  >
    {item}
  </Link>
);

function TreeData({ openMenu, setOpenMenu }) {

  const useRouter1 = useRouter();

  useEffect(() => {
    console.log(useRouter1);
    // const matchId = last(split(pathname, '/'));

    // const elements = getMatchId(matchId);
    // map(elements, item => handleOnClick(item));
  }, [useRouter1]);

  const handleOnClick = item => {
    const ele = document.getElementById(item);
    if(ele){
      ele.parentElement.querySelector('.nested').classList.toggle('active');
      ele.classList.toggle('caret-down');
    }
  };

  const handleOnClick1 = item => {
    const ele = document.getElementById(item);
    if(ele){
      ele.parentElement.querySelector('.nested').classList.toggle('active');
      ele.classList.toggle('caret-down');
    }
    Router.push({pathname:`/vampire/Library/${item}`, query: {}});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ul id="myUL">
      <li>
        <span
          onClick={() => handleOnClick1('Character Creation Quick Start Guide')}
          className="caret1"
          role="button"
          style={{ marginLeft: 20 }}
        >
          {renderLink('Character Creation Quick Start Guide')}
        </span>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Combat Maneuvers')}
            id="Combat Maneuvers"
          >
            {renderLink('Combat Maneuvers')}
          </span>
          <ul className="nested">
            <li>{renderLink('Aerial Combat Maneuvers')}</li>
            <li>{renderLink('Feral Combat Maneuvers')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Dramatic Systems')}
            id="Dramatic Systems"
          >
            {renderLink('Dramatic Systems')}
          </span>
          <ul className="nested">
            <li>{renderLink('Blood Bond')}</li>
            <li>{renderLink('Diablerie')}</li>
            <li>{renderLink('Tracking')}</li>
            <li>{renderLink('Willpower')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Ghoul Rules')}
            id="Ghoul Rules"
          >
            {renderLink('Ghoul Rules')}
          </span>
          <ul className="nested">
            <li>{renderLink('Animal Retainers')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Influences- General')}
            id="Influences- General"
          >
            {renderLink('Influences- General')}
          </span>
          <ul className="nested">
            <li>{renderLink('Influence- Elite and Underworld Actions')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Optional Rules')}
            id="Optional Rules"
          >
            {renderLink('Optional Rules')}
          </span>
          <ul className="nested">
            <li>{renderLink('Advanced Feeding (Optional Rules)')}</li>
            <li>{renderLink('Blood Resonance (Optional Rules)')}</li>
            <li>{renderLink('Feeding Territories (Optional Rules)')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Sabbat')}
            id="Sabbat"
          >
            {renderLink('Sabbat')}
          </span>
          <ul className="nested">
            <li style={{ marginLeft: 20 }}>
              {renderLink('Factions and Faction Ritae (Sabbat)')}
            </li>
            <li>
              <span
                className="caret"
                onClick={() => handleOnClick1('The Auctoritas Ritae (Sabbat)')}
                id="The Auctoritas Ritae (Sabbat)"
              >
                {renderLink('The Auctoritas Ritae (Sabbat)')}
              </span>
              <ul className="nested">
                <li>
                  {renderLink('Auctoritas Ritae-  The Vaulderie (Sabbat)')}
                </li>
                <li>
                  {renderLink('Auctoritas Ritae- High Holidays (Sabbat)')}
                </li>
                <li>{renderLink('Auctoritas Ritae- Monomancy (Sabbat)')}</li>
                <li>
                  {renderLink(
                    'Auctoritas Ritae- War Party and Wild Hunt (Sabbat)',
                  )}
                </li>
              </ul>
            </li>
            <li style={{ marginLeft: 20 }}>
              {renderLink('The Ignoblis Ritae (Sabbat)')}
            </li>
          </ul>
        </li>

        <span
          onClick={() => handleOnClick1('Spending XP')}
          className="caret1"
          role="button"
          type="button"
          style={{ marginLeft: 20 }}
          id="Spending XP"
        >
          {renderLink('Spending XP')}
        </span>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Stock Locations')}
            id="Stock Locations"
          >
            {renderLink('Stock Locations')}
          </span>
          <ul className="nested">
            <li>
              {renderLink(
                'Stock Locations - Iconic and Supernatural Qualities',
              )}
            </li>
            <li>{renderLink('Stock Locations - Standard Qualities')}</li>
            <li>{renderLink('Stock Locations- Undermining Locations')}</li>
            <li>{renderLink('Stock Locations- Controlling them')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Stock NPC Generation')}
            id="Stock NPC Generation"
          >
            {renderLink('Stock NPC Generation')}
          </span>
          <ul className="nested">
            <li>{renderLink('Hunters: Arcanum')}</li>
            <li>{renderLink('Hunters: Project Twilight')}</li>
            <li>{renderLink('Hunters: Those of Faith')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('Storytelling')}
            id="Storytelling"
          >
            {renderLink('Storytelling')}
          </span>
          <ul className="nested">
            <li>
              {renderLink(
                'Cooperative Conflict and Advanced Narration: Expert Tools for Story Creation',
              )}
            </li>
            <li>{renderLink('Platinum Rule')}</li>
          </ul>
        </li>
        <li>
          <span
            className="caret"
            onClick={() => handleOnClick1('The Temptation of the Beast')}
            id="The Temptation of the Beast"
          >
            {renderLink('The Temptation of the Beast')}
          </span>
          <ul className="nested">
            <li>{renderLink('Expanded Beast Trait System')}</li>
            <li>{renderLink('Expanded Path Mechanics')}</li>
            <li>{renderLink('Frenzy')}</li>
            <li>
              {renderLink('Vampire Sects and the Paths of Enlightenment')}
            </li>
          </ul>
        </li>
      </li>
    </ul>
  );
}

TreeData.propTypes = {};

export default memo(TreeData);
