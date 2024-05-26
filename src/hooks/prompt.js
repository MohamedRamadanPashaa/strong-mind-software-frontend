import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const usePrompt = ({ shouldConfirmLeave }) => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    useState(false);
  const [nextRouterPath, setNextRouterPath] = useState();

  const Router = useRouter();

  const onRouteChangeStart = useCallback(
    (nextPath) => {
      if (!shouldConfirmLeave) {
        return;
      }

      setShouldShowLeaveConfirmDialog(true);
      setNextRouterPath(nextPath);

      throw "cancelRouteChange";
    },
    [shouldConfirmLeave]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(null);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
    removeListener();
    Router.push(nextRouterPath);
  };

  const removeListener = () => {
    Router.events.off("routeChangeStart", onRouteChangeStart);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChangeStart);

    return removeListener;
  }, [onRouteChangeStart]);

  return {
    show: shouldShowLeaveConfirmDialog,
    onConfirm: onConfirmRouteChange,
    onCancel: onRejectRouteChange,
  };
};
