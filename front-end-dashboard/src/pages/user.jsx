import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <>
      <Helmet>
        <title> Students | College System </title>
      </Helmet>

      <UserView />
     
    </>
  );
}
