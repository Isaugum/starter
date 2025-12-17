import { Link } from 'react-router';

interface AnchorProps {
  children: React.ReactNode;
  linkTo?: string;
  href?: string;
}

function Anchor({ linkTo, href, children }: AnchorProps) {

  if (linkTo) {
    return (
      <Link to={linkTo}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href}>
      {children}
    </a>
  );
}

export default Anchor;