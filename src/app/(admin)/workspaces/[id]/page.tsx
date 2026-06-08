import { WorkspaceDetailPage } from "@/components/workspace/WorkspaceDetailPage";

type WorkspaceDetailRouteProps = {
  params: {
    id: string;
  };
};

export default function WorkspaceDetailRoute({
  params,
}: WorkspaceDetailRouteProps) {
  return <WorkspaceDetailPage workspaceId={params.id} />;
}