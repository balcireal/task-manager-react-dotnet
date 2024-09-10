import {
  faTachometerAlt,
  faFont,
  faCopy,
  faSignInAlt,
  faUserPlus,
  faSmile,
  faImage,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniqueId } from 'lodash';

const iconMapper = {
  faTachometerAlt,
  faFont,
  faCopy,
  faSignInAlt,
  faUserPlus,
  faSmile,
  faImage,
  faBell
};

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Gösterge Paneli',
  },
  {
    id: uniqueId(),
    title: 'Gösterge Paneli',
    icon: <FontAwesomeIcon icon={iconMapper.faTachometerAlt} />,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Sayfa Yönetimi',
  },
  {
    id: uniqueId(),
    title: 'Görev Yönetimi',
    icon: <FontAwesomeIcon icon={iconMapper.faTachometerAlt} />,
    href: '/mission-management',
  },
  {
    id: uniqueId(),
    title: 'Yorum Yönetimi',
    icon: <FontAwesomeIcon icon={iconMapper.faFont} />,
    href: '/comment-management',
  },
  {
    id: uniqueId(),
    title: 'Bildirim Yönetimi',
    icon: <FontAwesomeIcon icon={iconMapper.faBell} />,
    href: '/notify-management',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Dosya Yönetimi',
  //   icon: <FontAwesomeIcon icon={iconMapper.faCopy} />,
  //   href: '/files',
  // },
  {
    navlabel: true,
    subheader: 'Kullanıcılar',
  },
  {
    id: uniqueId(),
    title: 'Kullanıcı Yönetimi',
    icon: <FontAwesomeIcon icon={iconMapper.faUserPlus} />,
    href: '/usermanagement',
  },
];

export default Menuitems;
