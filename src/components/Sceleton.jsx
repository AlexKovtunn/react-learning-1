import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="280" rx="9" ry="9" width="280" height="27" />
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" />
    <rect x="4" y="430" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="427" rx="30" ry="30" width="152" height="35" />
  </ContentLoader>
);

export default Sceleton;
