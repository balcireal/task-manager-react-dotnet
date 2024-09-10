import { Link } from 'react-router-dom';
import logo from '@/assets/images/logos/dark-logo.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
    height: '70px',
    width: '180px',
    overflow: 'hidden',
    display: 'block',
}));

const Logo = () => {
    return (
        <LinkStyled to="/">
            <img src={logo} alt="Logo" height={70} />
        </LinkStyled>
    );
};

export default Logo;
