import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { gql, useQuery } from '@apollo/client';
import { getUser } from 'graphql/queries';
import * as S from './style';

const googleLoginOnClick = () => Auth.federatedSignIn({
  provider: CognitoHostedUIIdentityProvider.Google,
});

interface IBrieftItems {
  clName?: string;
  to: string;
  text: string;
}

const MenuBar = ({ className }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPath, setIsPath] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const { data: userData } = useQuery(
    gql`
      ${getUser}
    `,
  );
  const mailCheck = userData && userData.getUser.items?.length !== 0
    ? userData.getUser.items[0].mail && true
    : false;

  useEffect(() => {
    setIsPath(window.location.pathname);
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => {
        setIsLoggedIn(false);
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

    Auth.currentAuthenticatedUser().catch((e) => {
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
    await Auth.signOut().catch((err) => console.log(err));
  };

  const onClickHamburger = (): void => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  const BriefItems = ({ clName, to, text }: IBrieftItems) => (
    <S.MenuItems>
      <Link className={clName} to={to}>
        {text}
      </Link>
    </S.MenuItems>
  );

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
          <BriefItems
            clName={isPath === '/' ? 'current' : ''}
            to="/"
            text="Home"
          />
          <BriefItems
            clName={isPath === '/dashboard/personal' ? 'current' : ''}
            to="/dashboard/personal"
            text="Personal"
          />
          <BriefItems
            clName={isPath === '/dashboard/team' ? 'current' : ''}
            to="/dashboard/team"
            text="Team"
          />
          <BriefItems
            clName={isPath === '/survey' ? 'current' : ''}
            to="/survey"
            text="Survey"
          />
          <BriefItems
            clName={isPath === '/contact' ? 'current' : ''}
            to="/contact"
            text="Contact"
          />
        </S.MenuCenter>
        <S.MenuRight>
          {mailCheck && (
            <BriefItems
              clName={isPath === '/mail' ? 'current' : ''}
              to="/mail"
              text="Mail"
            />
          )}
          <S.MenuItems>
            {isLoggedIn ? (
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
          <BriefItems to="/home" text="Home" />
          <BriefItems to="/dashboard/personal" text="Personal" />
          <BriefItems to="/dashboard/team" text="Team" />
          <BriefItems to="/survey" text="Survey" />
          <BriefItems to="/contact" text="Contact" />
          {mailCheck && <BriefItems to="/mail" text="Mail" />}
          <S.MenuItems>
            {isLoggedIn ? (
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
