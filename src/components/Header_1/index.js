/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Header_1
 *
 */

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from 'containers/Search';
import LogoWOD from '../../images/newLogo.png';

function Header_1() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top navbarHeader">
      <div className="container">
        <div className="row">
          <div className="col-md-3 boxLogos">
            <Link className="navbar-brand" href="/">
              <Image src={LogoWOD} alt="Vercel Logo" />
            </Link>
          </div>
          <div className="col-md-9">
            <div className="navbar navbarUpper" id="navbarUpper">
              <ul className="navbar-nav ml-auto mr-auto navbarExtra hideMobile">
                <li className="nav-item">
                  <Link href="/QuickStart" title="QuickStart">
                    <span className="nav-link">QuickStart</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Backers" title="Backers">
                    <span className="nav-link">Backers</span>
                  </Link>
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
                <li className="nav-item">
                  <Link href="/SupportUs" title="Contributors">
                    <span className="nav-link">Support Us</span>
                  </Link>
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
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse navbarBottom" id="navbarResponsive">
              <ul className="navbar-nav ml-auto mr-auto navbarExtra showMobile">
                <li className="nav-item">
                  <a className="nav-link" href="/QuickStart" title="QuickStart">
                    QuickStart
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Backers" title="Backers">
                    Backers
                  </a>
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
              </ul>
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
                {/*  <li className="nav-item">
                   <a
                     className={`nav-link ${
                       pathname === '/vampire/Backgrounds' ? 'active' : null
                     }`}
                     href="/vampire/Backgrounds"
                   >
                     Backgrounds
                   </a>
                 </li> */}
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
