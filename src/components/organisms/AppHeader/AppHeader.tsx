import { useAppHeaderQuery } from './AppHeader.generated';

export type AppHeaderProps = {};

export function AppHeader(props: AppHeaderProps) {
  const { data, loading } = useAppHeaderQuery();

  return <div>AppHeader</div>;
}
