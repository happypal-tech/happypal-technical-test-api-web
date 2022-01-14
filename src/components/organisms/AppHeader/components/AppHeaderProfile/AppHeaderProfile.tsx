import { AppHeaderProfileFragment } from './AppHeaderProfile.generated';

export type AppHeaderProfileProps = {
  viewer: AppHeaderProfileFragment;
};

export function AppHeaderProfile(props: AppHeaderProfileProps) {
  const { viewer } = props;

  return <div>{viewer.email}</div>;
}
