
import { UserDetailPage } from "@/components/users/UserDetailPage";

type UserDetailRouteProps = {
  params: {
    id: string;
  };
};

export default function UserDetailRoute({ params }: UserDetailRouteProps) {
  return <UserDetailPage userId={params.id} />;
}