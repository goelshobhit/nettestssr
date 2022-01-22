/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Header_1
 *
 */

import React, { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Search from 'containers/Search';
import NavLink from 'components/NavLink';
import LogoWOD from '../../images/newLogo.png';

function Header_1() {
  const [isShown, setIsShown] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top navbarHeader">
      <div className="container">
        <div className="row">
          <div className="col-md-3 boxLogos">
            <Link className="navbar-brand" href="/">
              <Image src={LogoWOD} alt="Vercel Logo" height={67} width={160} />
            </Link>
          </div>
          <div className="col-md-9">
            <div className="navbar navbarUpper" id="navbarUpper">
              <ul className="navbar-nav ml-auto mr-auto navbarExtra hideMobile">
                <li className="nav-item nav-link">
                  <NavLink href="/QuickStart" name="Quick Start" color="white" />
                </li>
                <li className="nav-item nav-link">
                  <NavLink href="/Backers" name="Backers" color="white" />
                </li>
                {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/Contributors"
                      title="Contributors"
                    >
                      Contributors
                    </a>
                  </li> */}
                <li className="nav-item nav-link">
                  <NavLink href="/SupportUs" name="Support Us" color="white" />
                </li>
              </ul>
              <ul className="navbar-nav navbarSocial">
                <li className="nav-item">
                  <a
                    className="nav-link fa fa-facebook-square"
                    href="https://www.facebook.com/ByNightStudios"
                    title="Facebook"
                  />
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fa fa-twitter-square"
                    href="https://twitter.com/ByNightStudios"
                    title="Twitter"
                  />
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fa fa-camera-retro"
                    href="https://www.instagram.com/bynightstudios/"
                    title="Instagram"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation" onClick={() => setIsShown(!isShown)}>
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse navbarBottom" id="navbarResponsive">

              <ul className="navbar-nav ml-auto">
                <li>
                  <Search />
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/clan/assamite/">
                    <span className="nav-link"> Clans</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/Disciplines/abyss%20mysticism">
                    <span className="nav-link"> Disciplines</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/Rituals/abyssal%20ichor">
                    <span className="nav-link">Rituals</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/Techniques/abrupt%20internment">
                    <span className="nav-link">Techniques</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/Skills/academics">
                    <span className="nav-link">Skills</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/Merits/absent%20sway">
                    <span className="nav-link">Merits</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/flaws/accused%20of%20heresy">
                    <span className="nav-link">Flaws</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    activeClassName="nav-link active"
                    href="/vampire/library/character%20creation%20quick%20start%20guide">
                    <span className="nav-link"> Library</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="nav-link active" href="/vampire/YearBook/anna%20dogherty">
                    <span className="nav-link">Yearbook</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`${isShown ? '' : 'collapse'} navbarBottom`} id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/vampire/clan/">
                    Clans & Bloodlines
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Disciplines">
                    Disciplines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Techniques">
                    Techniques
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Skills">
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Merits">
                    Merits
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Flaws">
                    Flaws
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Attributes">
                    Attributes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Backgrounds">
                    Backgrounds
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header_1.propTypes = {};

export default memo(Header_1);
