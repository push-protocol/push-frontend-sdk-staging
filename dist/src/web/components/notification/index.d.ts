import * as React from "react";
declare type chainNameType = "ETH_TEST_KOVAN" | "POLYGON_TEST_MUMBAI" | undefined;
export declare type NotificationItemProps = {
    notificationTitle: string | undefined;
    notificationBody: string | undefined;
    cta: string | undefined;
    app: string | undefined;
    icon: string | undefined;
    image: string | undefined;
    url: string | undefined;
    isSpam: boolean | undefined;
    subscribeFn: any;
    isSubscribedFn: any;
    theme: string | undefined;
    chainName: chainNameType;
};
declare const ViewNotificationItem: React.FC<NotificationItemProps>;
export default ViewNotificationItem;
