import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import * as S from './style';

const googleLoginOnClick = () => Auth.federatedSignIn({
  provider: CognitoHostedUIIdentityProvider.Google,
});

const MenuBar = ({ className }: any) => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPath, setIsPath] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    switch (window.location.pathname) {
    case '/':
      setIsPath('/');
      break;
    case '/dashboard/personal':
      setIsPath('/dashboard/personal');
      break;
    case '/dashboard/team':
      setIsPath('/dashboard/team');
      break;
    case '/survey':
      setIsPath('/survey');
      break;
    case '/contact':
      setIsPath('/contact');
      break;
    default:
      setIsPath('');
      break;
    }
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsLogined(true))
      .catch(() => {
        setIsLogined(false);
      });
  }, []);
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
      case 'signIn':
        window.location.href = '/';
        break;
      case 'signOut':
        window.location.href = '/';
        break;
      case 'customOAuthState':
        break;
      default:
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((e) => {
        console.log('Not signed in');
      });
  }, []);

  const handleSize = () => {
    const newWidth = window.innerWidth;
    setWindowWidth(newWidth);
    if (newWidth > 600) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, [window.innerWidth]);

  const onClickSignOut = async () => {
    await Auth.signOut()
      .then((data) => console.log('completed'))
      .catch((err) => console.log(err));
  };

  const onClickHamburger = (): void => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  return (
    <>
      <S.MenuBar className={className}>
        <S.MenuLeft>
          <S.MenuItems>
            <Link to="/">
              <S.MainImage></S.MainImage>
              <S.MainText>
                <p>
                  TEAM
                  <span>AUTO</span>
                  MATCHER
                </p>
                <p>FOR YOUNG PROGRAMMERS</p>
              </S.MainText>
            </Link>
          </S.MenuItems>
        </S.MenuLeft>
        <S.MenuCenter>
          <S.MenuItems>
            <Link className={isPath === '/' ? 'current' : ''} to="/">
              Home
            </Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link
              className={isPath === '/dashboard/personal' ? 'current' : ''}
              to="/dashboard/personal"
            >
              Personal
            </Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link
              className={isPath === '/dashboard/team' ? 'current' : ''}
              to="/dashboard/team"
            >
              Team
            </Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link
              className={isPath === '/survey' ? 'current' : ''}
              to="/survey"
            >
              Survey
            </Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link
              className={isPath === '/contact' ? 'current' : ''}
              to="/contact"
            >
              Contact
            </Link>
          </S.MenuItems>
        </S.MenuCenter>
        <S.MenuRight>
          {isLogined && (
            <S.MenuItems>
              <Link className="mail" to="/mail">
                Mail
              </Link>
            </S.MenuItems>
          )}
          <S.MenuItems>
            {isLogined ? (
              <S.LoginBtn
                text="LogOut"
                onLoginClick={onClickSignOut}
              ></S.LoginBtn>
            ) : (
              <S.LoginBtn
                text="LogIn"
                onLoginClick={googleLoginOnClick}
              ></S.LoginBtn>
            )}
          </S.MenuItems>
        </S.MenuRight>
        <S.Hamburger clicked={isClicked} onClick={onClickHamburger}>
          <S.HamburgerSpan></S.HamburgerSpan>
          <S.HamburgerSpan></S.HamburgerSpan>
          <S.HamburgerSpan></S.HamburgerSpan>
        </S.Hamburger>
      </S.MenuBar>
      {windowWidth < 600 && (
        <S.HamburgerMenus clicked={isClicked}>
          <S.MenuItems>
            <Link to="/dashboard/personal">Personal</Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link to="/dashboard/team">Team</Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link to="/survey">Survey</Link>
          </S.MenuItems>
          <S.MenuItems>
            <Link to="/contact">Contact</Link>
          </S.MenuItems>
          {isLogined && (
            <S.MenuItems>
              <Link to="/mail">Mail</Link>
            </S.MenuItems>
          )}
          <S.MenuItems>
            {isLogined ? (
              <div onClick={onClickSignOut}>LogOut</div>
            ) : (
              <div onClick={googleLoginOnClick}>LogIn</div>
            )}
          </S.MenuItems>
        </S.HamburgerMenus>
      )}
    </>
  );
};

export default MenuBar;
