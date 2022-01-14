import style from './AppHeader.module.scss';

import { useAppHeaderQuery } from './AppHeader.generated';
import { AppHeaderLogin } from './components/AppHeaderLogin/AppHeaderLogin';
import { AppHeaderProfile } from './components/AppHeaderProfile/AppHeaderProfile';

export function AppHeader() {
  const { data } = useAppHeaderQuery();

  return (
    <div className={style.root}>
      <div>HappyClone</div>
      {data?.viewer ? <AppHeaderProfile viewer={data.viewer} /> : <AppHeaderLogin />}
    </div>
  );
}
