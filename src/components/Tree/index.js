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
import NavLink from 'components/NavLink';
import Router from 'next/router'
import { useRouter } from 'next/router'
import { toLower  } from 'lodash';
import last from 'lodash/last';
import split from 'lodash/split';
import map from 'lodash/map';
import getMatchId from './getMatchId';

const renderLink = (item, paddingLeft) => (



  <span
    style={{ paddingLeft }}
  >
    <NavLink
  href={`/vampire/library/${toLower(item)}`}
                        name={item}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
  </span>
);

function TreeData({ openMenu, setOpenMenu }) {

  const useRouter1 = useRouter();

  useEffect(() => {
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
    Router.push({pathname:`/vampire/library/${toLower(item)}`, query: {}});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ul style={{ listStyle: 'none', marginLeft:'-20px'}}>
      <li style={{ listStyle: 'none'}}>
        <span
          onClick={() => handleOnClick1('Character Creation Quick Start Guide')}
          className="caret1"
          role="button"
          style={{ marginLeft: 20 }}
        >
          {renderLink('Character Creation Quick Start Guide')}
        </span>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Combat Maneuvers')}
            id="Combat Maneuvers"
          >
            {renderLink('Combat Maneuvers')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Aerial Combat Maneuvers')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Feral Combat Maneuvers')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Dramatic Systems')}
            id="Dramatic Systems"
          >
            {renderLink('Dramatic Systems')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Blood Bond')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Diablerie')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Tracking')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Willpower')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Ghoul Rules')}
            id="Ghoul Rules"
          >
            {renderLink('Ghoul Rules')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Animal Retainers')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Influences- General')}
            id="Influences- General"
          >
            {renderLink('Influences- General')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Influence- Elite and Underworld Actions')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Optional Rules')}
            id="Optional Rules"
          >
            {renderLink('Optional Rules')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Advanced Feeding (Optional Rules)')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Blood Resonance (Optional Rules)')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Feeding Territories (Optional Rules)')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Sabbat')}
            id="Sabbat"
          >
            {renderLink('Sabbat')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ marginLeft: 20, listStyle: 'none' }}>
              {renderLink('Factions and Faction Ritae (Sabbat)')}
            </li>
            <li style={{ listStyle: 'none'}}>
              <span
                className="caret"
                onClick={() => handleOnClick1('The Auctoritas Ritae (Sabbat)')}
                id="The Auctoritas Ritae (Sabbat)"
              >
                {renderLink('The Auctoritas Ritae (Sabbat)')}
              </span>
              <ul className="nested" style={{ listStyle: 'none'}}>
                <li style={{ listStyle: 'none'}}>
                  {renderLink('Auctoritas Ritae-  The Vaulderie (Sabbat)')}
                </li>
                <li style={{ listStyle: 'none'}}>
                  {renderLink('Auctoritas Ritae- High Holidays (Sabbat)')}
                </li>
                <li style={{ listStyle: 'none'}}>{renderLink('Auctoritas Ritae- Monomancy (Sabbat)')}</li>
                <li style={{ listStyle: 'none'}}>
                  {renderLink(
                    'Auctoritas Ritae- War Party and Wild Hunt (Sabbat)',
                  )}
                </li>
              </ul>
            </li>
            <li style={{ marginLeft: 20, listStyle: 'none' }}>
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
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Stock Locations')}
            id="Stock Locations"
          >
            {renderLink('Stock Locations')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>
              {renderLink(
                'Stock Locations - Iconic and Supernatural Qualities',
              )}
            </li>
            <li style={{ listStyle: 'none'}}>{renderLink('Stock Locations - Standard Qualities')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Stock Locations- Undermining Locations')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Stock Locations- Controlling them')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Stock NPC Generation')}
            id="Stock NPC Generation"
          >
            {renderLink('Stock NPC Generation')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Hunters: Arcanum')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Hunters: Project Twilight')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Hunters: Those of Faith')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('Storytelling')}
            id="Storytelling"
          >
            {renderLink('Storytelling')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>
              {renderLink(
                'Cooperative Conflict and Advanced Narration: Expert Tools for Story Creation',
              )}
            </li>
            <li style={{ listStyle: 'none'}}>{renderLink('Platinum Rule')}</li>
          </ul>
        </li>
        <li style={{ listStyle: 'none'}}>
          <span
            className="caret"
            onClick={() => handleOnClick1('The Temptation of the Beast')}
            id="The Temptation of the Beast"
          >
            {renderLink('The Temptation of the Beast')}
          </span>
          <ul className="nested" style={{ listStyle: 'none'}}>
            <li style={{ listStyle: 'none'}}>{renderLink('Expanded Beast Trait System')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Expanded Path Mechanics')}</li>
            <li style={{ listStyle: 'none'}}>{renderLink('Frenzy')}</li>
            <li style={{ listStyle: 'none'}}>
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
