/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/**
 *
 * Footer_1
 *
 */

import React, { memo } from 'react';
// import ByNightStudios from '../../images/ByNightStudios.svg';
// import FooterImage1 from '../../images/footerImage.png';

function Footer_1() {
  return (
    <>
      <footer className="bg-dark footer-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 widgetLogos text-center">
              <a className="navbar-brand" href="/">
                {/* <img src={FooterImage1} alt="nightStudio" /> */}
              </a>
              {/* <a className="navbar-brand brand-section" href="/">
                <img src={VampireLogo} alt="" />
              </a> */}
            </div>
            <div className="col-lg-4 col-md-6">
              <h3>
                <span style={{ color: '#fff' }}>Quick Links</span>
              </h3>
              <ul className="navbar-nav menuFooter">
                <li className="nav-item active">
                  <a className="nav-link" href="/vampire/clan/">
                    Clans & Bloodlines
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Disciplines/">
                    Disciplines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Rituals">
                    Rituals
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
            <div className="col-lg-4 col-md-6 widgetSocial">
              <h3>
                <span style={{ color: '#fff' }}>Follow Us</span>
              </h3>
              <ul className="navbar-nav ml-auto navbarSocial">
                <li className="nav-item">
                  <a className="nav-link fa fa-facebook-square" href="#" title="Facebook" />
                </li>
                <li className="nav-item">
                  <a className="nav-link fa fa-twitter-square" href="#" title="Twitter" />
                </li>
                <li className="nav-item">
                  <a className="nav-link fa fa-camera-retro" href="#" title="Instagram" />
                </li>
              </ul>
               <a className="navbar-brand brand-company" href="https://www.bynightstudios.com">
                {/* <ByNightStudios /> */}
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="bottom-footer">
            <p className="nav-item">
              <a href="https://www.bynightstudios.com" className="nav-link" style={{ color: '#fff' }}>
                <p>BY NIGHT STUDIOS | WORLD OF DARKNESS - {new Date().getFullYear()}</p>
              </a>
            </p>

            <p>
              <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="8PUS5TKR868YA" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

Footer_1.propTypes = {};

export default memo(Footer_1);
